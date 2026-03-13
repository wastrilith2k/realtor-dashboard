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

interface MedianPriceChartProps {
  data: Observation[];
}

export function MedianPriceChart ({ data }: MedianPriceChartProps) {
  return (
    <ChartCard title="Median Listing Price">
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
            tickFormatter={(val: number) =>
              `$${(val / 1000).toFixed(0)}k`
            }
          />
          <Tooltip
            formatter={(val: number) =>
              [`$${val.toLocaleString()}`, "Median Price"]
            }
            labelFormatter={formatDateLong}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
