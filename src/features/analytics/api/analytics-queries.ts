import "server-only";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";
import { createServiceClient } from "@/shared/lib/supabase/admin-client";
import type {
  AnalyticsOverview,
  DailyTrendRow,
  TopPathRow,
  BreakdownRow,
  PageView,
} from "@/entities/analytics/model";

export interface AnalyticsRange {
  from: string; // ISO date "YYYY-MM-DD"
  to: string;
}

async function fetchRows(range: AnalyticsRange): Promise<PageView[]> {
  await requireAdmin();
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("page_view")
    .select("*")
    .gte("created_at", `${range.from}T00:00:00Z`)
    .lte("created_at", `${range.to}T23:59:59Z`)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as PageView[];
}

export async function getAnalyticsOverview(range: AnalyticsRange): Promise<AnalyticsOverview> {
  const rows = await fetchRows(range);

  const uniqueVisitors = new Set(rows.map((r) => r.visitor_id)).size;
  const sessions = new Set(rows.map((r) => r.session_id)).size;
  const durations = rows.map((r) => r.duration_ms).filter((d): d is number => d !== null);
  const avgDurationMs =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

  return { pageViews: rows.length, uniqueVisitors, sessions, avgDurationMs };
}

export async function getDailyTrend(range: AnalyticsRange): Promise<DailyTrendRow[]> {
  const rows = await fetchRows(range);

  const byDay = new Map<string, { pv: number; visitors: Set<string> }>();
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, { pv: 0, visitors: new Set() });
    const entry = byDay.get(day)!;
    entry.pv++;
    entry.visitors.add(row.visitor_id);
  }

  // 날짜 범위 전체를 채워서 빈 날도 0으로 표시
  const result: DailyTrendRow[] = [];
  const cur = new Date(range.from);
  const end = new Date(range.to);
  while (cur <= end) {
    const day = cur.toISOString().slice(0, 10);
    const entry = byDay.get(day);
    result.push({ date: day, pv: entry?.pv ?? 0, uv: entry?.visitors.size ?? 0 });
    cur.setDate(cur.getDate() + 1);
  }

  return result;
}

export async function getTopPaths(range: AnalyticsRange, limit = 10): Promise<TopPathRow[]> {
  const rows = await fetchRows(range);

  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.path, (counts.get(row.path) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([path, pv]) => ({ path, pv }));
}

export async function getReferrerBreakdown(range: AnalyticsRange): Promise<BreakdownRow[]> {
  const rows = await fetchRows(range);
  return aggregateBreakdown(rows, (r) => r.referrer_source ?? "direct");
}

export async function getGeoBreakdown(range: AnalyticsRange): Promise<BreakdownRow[]> {
  const rows = await fetchRows(range);
  return aggregateBreakdown(rows, (r) => r.country ?? "Unknown");
}

export async function getDeviceBreakdown(range: AnalyticsRange): Promise<BreakdownRow[]> {
  const rows = await fetchRows(range);
  return aggregateBreakdown(rows, (r) => r.device_type ?? "Unknown");
}

export async function getBrowserBreakdown(range: AnalyticsRange): Promise<BreakdownRow[]> {
  const rows = await fetchRows(range);
  return aggregateBreakdown(rows, (r) => r.browser ?? "Unknown");
}

function aggregateBreakdown(
  rows: PageView[],
  key: (r: PageView) => string,
): BreakdownRow[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const k = key(row);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }));
}
