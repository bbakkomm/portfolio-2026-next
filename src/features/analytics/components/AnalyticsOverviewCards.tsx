import type { AnalyticsOverview } from "@/entities/analytics/model";

function fmtDuration(ms: number): string {
  if (ms < 1000) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

interface Props {
  data: AnalyticsOverview;
}

export function AnalyticsOverviewCards({ data }: Props) {
  const cards = [
    { label: "페이지뷰", value: data.pageViews.toLocaleString() },
    { label: "순방문자", value: data.uniqueVisitors.toLocaleString() },
    { label: "세션", value: data.sessions.toLocaleString() },
    { label: "평균 체류시간", value: fmtDuration(data.avgDurationMs) },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3">
          <p className="text-xs text-foreground/50 mb-1">{c.label}</p>
          <p className="text-2xl font-semibold tabular-nums">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
