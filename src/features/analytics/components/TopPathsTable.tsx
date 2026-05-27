import type { TopPathRow } from "@/entities/analytics/model";

interface Props {
  data: TopPathRow[];
  total: number;
}

export function TopPathsTable({ data, total }: Props) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/70 mb-3">인기 페이지 Top 10</h3>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-zinc-700 text-foreground/40">
            <th className="py-1 text-left font-normal">경로</th>
            <th className="py-1 text-right font-normal w-16">PV</th>
            <th className="py-1 text-right font-normal w-16">비율</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.path} className="border-b border-zinc-800">
              <td className="py-1.5 text-foreground/80 break-all">{row.path}</td>
              <td className="py-1.5 text-right tabular-nums">{row.pv}</td>
              <td className="py-1.5 text-right tabular-nums text-foreground/50">
                {total > 0 ? `${((row.pv / total) * 100).toFixed(1)}%` : "-"}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-foreground/30">
                데이터 없음
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
