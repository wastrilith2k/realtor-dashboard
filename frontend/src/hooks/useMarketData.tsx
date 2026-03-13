import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchMarketData } from "../lib/api";
import type { MarketData } from "../types/market";

interface MarketDataContextValue {
  marketData: MarketData | null;
  loading: boolean;
  error: string | null;
}

const MarketDataContext = createContext<MarketDataContextValue | null>(null);

export function MarketDataProvider ({ children }: { children: ReactNode }) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData()
      .then(setMarketData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MarketDataContext.Provider value={{ marketData, loading, error }}>
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData () {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error("useMarketData must be used within MarketDataProvider");
  }
  return context;
}
