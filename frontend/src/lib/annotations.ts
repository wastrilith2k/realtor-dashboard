export interface ChartAnnotation {
  date: string;
  label: string;
}

export const MARKET_EVENTS: ChartAnnotation[] = [
  { date: "2020-03", label: "COVID-19" },
  { date: "2022-03", label: "Fed rate hikes begin" },
  { date: "2023-10", label: "Rates hit 8%" },
];
