import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { Observation } from "../types/market";
import { ChartCard } from "./ChartCard";
import { formatDateShort, formatDateLong } from "../lib/formatDate";
import { CHART_COLORS, GRID_STROKE, GRID_DASH, ANNOTATION_STROKE } from "../lib/chartColors";
import { MARKET_EVENTS } from "../lib/annotations";

interface MortgageRatesChartProps {
  data: Observation[];
}

export function MortgageRatesChart ({ data }: MortgageRatesChartProps) {
  const dates = new Set(data.map((d) => d.date.slice(0, 7)));

  return (
    <ChartCard title="30-Year Fixed Mortgage Rate" subtitle="National Average">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray={GRID_DASH} stroke={GRID_STROKE} />
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
            separator=": "
            formatter={(val) =>
              [`${val}%`, "30-Yr Fixed"]
            }
            labelFormatter={(label) => formatDateLong(String(label))}
          />
          {MARKET_EVENTS.filter((e) => dates.has(e.date)).map((event) => (
            <ReferenceLine
              key={event.date}
              x={`${event.date}-01`}
              stroke={ANNOTATION_STROKE}
              strokeDasharray="4 4"
              label={{ value: event.label, position: "top", fontSize: 10, fill: "#6b7280" }}
            />
          ))}
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.mortgageRates}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
