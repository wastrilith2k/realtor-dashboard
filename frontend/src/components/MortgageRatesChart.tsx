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

interface MortgageRatesChartProps {
  data: Observation[];
}

export function MortgageRatesChart ({ data }: MortgageRatesChartProps) {
  return (
    <ChartCard title="Mortgage Rates">
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
            tickFormatter={(val: number) => `${val}%`}
          />
          <Tooltip
            formatter={(val) =>
              [`${val}%`, "Mortgage Rates"]
            }
            labelFormatter={(label) => formatDateLong(String(label))}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0a087d"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
