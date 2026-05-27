import type { DailyTrendRow } from "@/entities/analytics/model";

interface Props {
  data: DailyTrendRow[];
}

export function DailyTrend({ data }: Props) {
  const maxPv = Math.max(...data.map((d) => d.pv), 1);

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/70 mb-3">일별 방문 추이 (PV / UV)</h3>
      <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
        {data.map((row) => (
          <div key={row.date} className="flex items-center gap-2 text-xs">
            <span className="w-24 shrink-0 text-foreground/50 tabular-nums">{row.date}</span>
            <div className="flex-1 flex items-center gap-1">
              <div
                className="h-3 rounded-sm bg-indigo-500/80 transition-all"
                style={{ width: `${(row.pv / maxPv) * 100}%`, minWidth: row.pv > 0 ? "2px" : "0" }}
              />
              <div
                className="h-3 rounded-sm bg-emerald-500/60 transition-all"
                style={{ width: `${(row.uv / maxPv) * 100}%`, minWidth: row.uv > 0 ? "2px" : "0" }}
              />
            </div>
            <span className="w-16 shrink-0 tabular-nums text-right text-foreground/70">
              {row.pv} / {row.uv}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-xs text-foreground/40">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm bg-indigo-500/80" /> PV</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm bg-emerald-500/60" /> UV</span>
      </div>
    </div>
  );
}
