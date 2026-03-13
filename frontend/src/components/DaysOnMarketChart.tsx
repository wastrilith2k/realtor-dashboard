import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Observation } from "../types/market";
import { ChartCard } from "./ChartCard";
import { formatDateShort, formatDateLong } from "../lib/formatDate";

interface DaysOnMarketChartProps {
  data: Observation[];
}

export function DaysOnMarketChart ({ data }: DaysOnMarketChartProps) {
  return (
    <ChartCard title="Median Days on Market">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={formatDateShort}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(val: number) => `${val}d`}
          />
          <Tooltip
            formatter={(val: number) =>
              [`${val} days`, "Days on Market"]
            }
            labelFormatter={formatDateLong}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
