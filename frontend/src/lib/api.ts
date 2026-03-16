import type { MarketData, Insight } from "../types/market";
import { SERIES_NAMES } from "./seriesNames";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchMarketData(): Promise<MarketData> {
  const response = await fetch(`${BASE_URL}/api/market`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

export async function fetchInsights(
  marketData: MarketData,
  fromDate: string,
  toDate: string,
): Promise<Insight[]> {

  const response = await fetch(`${BASE_URL}/api/insight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      market_data: marketData,
      date_range: { from_date: fromDate, to_date: toDate },
      series_names: SERIES_NAMES,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const json = await response.json();
  return json.data.insights;
}
