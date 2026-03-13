import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Observation } from "../types/market";
import { ChartCard } from "./ChartCard";
import { formatDateShort, formatDateLong } from "../lib/formatDate";

interface BuildingPermitsChartProps {
  data: Observation[];
}

export function BuildingPermitsChart ({ data }: BuildingPermitsChartProps) {
  return (
    <ChartCard title="Building Permits">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={formatDateShort}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(val: number) =>
              [val.toLocaleString(), "Building Permits"]
            }
            labelFormatter={formatDateLong}
          />
          <Bar dataKey="value" fill="#1037b9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}