import { createHash } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isbot } from "isbot";
import { createServiceClient } from "@/shared/lib/supabase/admin-client";
import { resolveVisitor } from "@/features/analytics/lib/resolve-visitor";
import { parseUA } from "@/features/analytics/lib/ua";
import { classifyReferrer } from "@/features/analytics/lib/referrer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const enterSchema = z.object({
  action: z.literal("enter"),
  viewId: z.string().uuid(),
  path: z.string().max(1000).startsWith("/"),
  referrer: z.string().max(2000).nullable().optional(),
});

const leaveSchema = z.object({
  action: z.literal("leave"),
  viewId: z.string().uuid(),
  durationMs: z.number().int().min(0).max(86_400_000),
});

const eventSchema = z.object({
  action: z.literal("event"),
  eventId: z.string().uuid(),
  path: z.string().max(1000).startsWith("/"),
  name: z.string().min(1).max(100),
  properties: z.record(z.string(), z.unknown()).optional(),
});

const bodySchema = z.discriminatedUnion("action", [enterSchema, leaveSchema, eventSchema]);

function hashIP(ip: string): string {
  const day = new Date().toISOString().slice(0, 10); // 일별 salt — 역추적 불가
  return createHash("sha256").update(`${day}:${ip}`).digest("hex").slice(0, 16);
}

function getIP(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

function cookieHeader(cookies: { name: string; value: string; maxAge: number }[]): string {
  return cookies
    .map((c) => `${c.name}=${c.value}; Path=/; Max-Age=${c.maxAge}; HttpOnly; SameSite=Lax`)
    .join(", ");
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";

  if (isbot(ua)) return NextResponse.json({ ok: true });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const data = parsed.data;
  const supabase = createServiceClient();
  const { visitorId, sessionId, setCookies } = await resolveVisitor();

  // ── enter ────────────────────────────────────────────────
  if (data.action === "enter") {
    const { device, browser, os } = parseUA(ua);

    const siteHost = process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
      : "localhost";
    const referrerSource = classifyReferrer(data.referrer ?? null, siteHost);

    const country = req.headers.get("x-vercel-ip-country") ?? null;
    const region = req.headers.get("x-vercel-ip-country-region") ?? null;
    const rawCity = req.headers.get("x-vercel-ip-city") ?? null;
    const city = rawCity ? decodeURIComponent(rawCity) : null;

    const rawIP = getIP(req);
    const ip_hash = rawIP ? hashIP(rawIP) : null;

    await supabase.from("page_view").insert({
      id: data.viewId,
      visitor_id: visitorId,
      session_id: sessionId,
      path: data.path,
      referrer: data.referrer ?? null,
      referrer_source: referrerSource,
      country,
      region,
      city,
      device_type: device,
      browser,
      os,
      ip_hash,
    });

    const res = NextResponse.json({ ok: true });
    if (setCookies.length > 0) res.headers.set("Set-Cookie", cookieHeader(setCookies));
    return res;
  }

  // ── leave ────────────────────────────────────────────────
  if (data.action === "leave") {
    await supabase
      .from("page_view")
      .update({ duration_ms: data.durationMs })
      .eq("id", data.viewId)
      .is("duration_ms", null);

    return NextResponse.json({ ok: true });
  }

  // ── event ────────────────────────────────────────────────
  await supabase.from("event").insert({
    id: data.eventId,
    visitor_id: visitorId,
    session_id: sessionId,
    path: data.path,
    name: data.name,
    properties: data.properties ?? null,
  });

  const res = NextResponse.json({ ok: true });
  if (setCookies.length > 0) res.headers.set("Set-Cookie", cookieHeader(setCookies));
  return res;
}
