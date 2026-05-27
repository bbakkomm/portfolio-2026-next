"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyTrendRow } from "@/entities/analytics/model";

interface Props {
  data: DailyTrendRow[];
}

export function DailyTrend({ data }: Props) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground/70 mb-4">일별 방문 추이 (PV / UV)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickFormatter={(v) => v.slice(5)}
          />
          <YAxis tick={{ fontSize: 11, fill: "#71717a" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1c1c1e", border: "1px solid #3f3f46", borderRadius: 6 }}
            labelStyle={{ color: "#a1a1aa", fontSize: 11 }}
            itemStyle={{ fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Line type="monotone" dataKey="pv" name="PV" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="uv" name="UV" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
