import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Observation } from "../types/market";
import { ChartCard } from "./ChartCard";
import { formatDateShort, formatDateLong } from "../lib/formatDate";

interface PriceReductionChartProps {
  data: Observation[];
}

export function PriceReductionChart ({ data }: PriceReductionChartProps) {
  return (
    <ChartCard title="Price Reduced Listings">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={formatDateShort}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(val: number) =>
              [val.toLocaleString(), "Price Reductions"]
            }
            labelFormatter={formatDateLong}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
