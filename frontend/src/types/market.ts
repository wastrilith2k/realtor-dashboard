export interface Observation {
  date: string;
  value: number;
}

export interface MarketData {
  [seriesId: string]: Observation[];
}

export interface Insight {
  insight: string;
  series_ids: string[];
  dates: string[];
}
