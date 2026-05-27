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

const bodySchema = z.discriminatedUnion("action", [enterSchema, leaveSchema]);

function cookieHeader(cookies: { name: string; value: string; maxAge: number }[]): string {
  return cookies
    .map(
      (c) =>
        `${c.name}=${c.value}; Path=/; Max-Age=${c.maxAge}; HttpOnly; SameSite=Lax`,
    )
    .join(", ");
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";

  // 봇 요청 무시 (200 반환, insert 스킵)
  if (isbot(ua)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

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

  if (data.action === "enter") {
    const { visitorId, sessionId, setCookies } = await resolveVisitor();
    const { device, browser, os } = parseUA(ua);

    const siteHost = process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
      : "localhost";
    const referrerSource = classifyReferrer(data.referrer ?? null, siteHost);

    const country = req.headers.get("x-vercel-ip-country") ?? null;
    const region = req.headers.get("x-vercel-ip-country-region") ?? null;
    const rawCity = req.headers.get("x-vercel-ip-city") ?? null;
    const city = rawCity ? decodeURIComponent(rawCity) : null;

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
    });

    const res = NextResponse.json({ ok: true });
    if (setCookies.length > 0) {
      res.headers.set("Set-Cookie", cookieHeader(setCookies));
    }
    return res;
  }

  // action === "leave"
  await supabase
    .from("page_view")
    .update({ duration_ms: data.durationMs })
    .eq("id", data.viewId)
    .is("duration_ms", null); // 최초 leave만 기록

  return NextResponse.json({ ok: true });
}
