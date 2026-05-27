export interface PageView {
  id: string;
  visitor_id: string;
  session_id: string;
  path: string;
  referrer: string | null;
  referrer_source: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  duration_ms: number | null;
  created_at: string;
}

// ─── 집계 DTO ───────────────────────────────────────────────

export interface AnalyticsOverview {
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  avgDurationMs: number;
}

export interface DailyTrendRow {
  date: string; // YYYY-MM-DD
  pv: number;
  uv: number;
}

export interface TopPathRow {
  path: string;
  pv: number;
}

export interface BreakdownRow {
  label: string;
  count: number;
}
