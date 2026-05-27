import type { BreakdownRow } from "@/entities/analytics/model";

interface Props {
  title: string;
  data: BreakdownRow[];
}

export function BreakdownTable({ title, data }: Props) {
  const total = data.reduce((s, r) => s + r.count, 0);

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/70 mb-3">{title}</h3>
      <div className="space-y-1.5">
        {data.slice(0, 8).map((row) => {
          const pct = total > 0 ? (row.count / total) * 100 : 0;
          return (
            <div key={row.label}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-foreground/80 capitalize">{row.label}</span>
                <span className="tabular-nums text-foreground/50">
                  {row.count} ({pct.toFixed(1)}%)
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        {data.length === 0 && (
          <p className="text-xs text-foreground/30 py-2">데이터 없음</p>
        )}
      </div>
    </div>
  );
}
