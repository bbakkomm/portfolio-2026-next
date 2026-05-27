import type { EventBreakdownRow } from "@/entities/analytics/model";

interface Props {
  data: EventBreakdownRow[];
}

export function EventBreakdownTable({ data }: Props) {
  const total = data.reduce((s, r) => s + r.count, 0);

  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/70 mb-3">이벤트 트래킹</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-zinc-700 text-foreground/40">
            <th className="py-1 text-left font-normal">이벤트</th>
            <th className="py-1 text-right font-normal w-16">횟수</th>
            <th className="py-1 text-right font-normal w-16">비율</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-zinc-800">
              <td className="py-1.5 font-mono text-foreground/80">{row.name}</td>
              <td className="py-1.5 text-right tabular-nums">{row.count}</td>
              <td className="py-1.5 text-right tabular-nums text-foreground/50">
                {total > 0 ? `${((row.count / total) * 100).toFixed(1)}%` : "-"}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-foreground/30">
                이벤트 없음 — data-track 속성을 추가하거나 trackEvent()를 호출하세요
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
