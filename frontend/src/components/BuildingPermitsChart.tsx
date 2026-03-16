import {
  BarChart,
  Bar,
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

interface BuildingPermitsChartProps {
  data: Observation[];
}

export function BuildingPermitsChart ({ data }: BuildingPermitsChartProps) {
  const dates = new Set(data.map((d) => d.date.slice(0, 7)));

  return (
    <ChartCard title="Building Permits" subtitle="Portland-Vancouver-Hillsboro MSA">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray={GRID_DASH} stroke={GRID_STROKE} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={formatDateShort}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            separator=": "
            formatter={(val) =>
              [Number(val).toLocaleString(), "Building Permits"]
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
          <Bar dataKey="value" fill={CHART_COLORS.buildingPermits} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
