import { useState } from "react";
import { MarketDataProvider, useMarketData } from "./hooks/useMarketData";
import { Dashboard } from "./components/Dashboard";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { InsightsPanel } from "./components/InsightsPanel";
import { fetchInsights } from "./lib/api";
import { filterByDateRange } from "./lib/filterByDateRange";
import type { Insight, MarketData } from "./types/market";

function AppContent () {
  const [from, setFrom] = useState("2020-01");
  const [to, setTo] = useState("2026-03");
  const [panelOpen, setPanelOpen] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [insightLoading, setInsightLoading] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);

  const { marketData } = useMarketData();

  const handleGetInsights = async () => {
    if (!marketData) return;

    setPanelOpen(true);
    setInsightLoading(true);
    setInsightError(null);

    // Filter data to the visible date range before sending
    const filtered: MarketData = {};
    for (const [seriesId, observations] of Object.entries(marketData)) {
      filtered[seriesId] = filterByDateRange(observations, from, to);
    }

    try {
      const result = await fetchInsights(filtered, from, to);
      setInsights(result);
    } catch (err) {
      setInsightError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setInsightLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow-sm px-8 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Portland Real Estate Dashboard
        </h1>
        <div className="flex items-center gap-6">
          <DateRangeFilter
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
          <button
            onClick={handleGetInsights}
            disabled={insightLoading || !marketData}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {insightLoading ? "Analyzing..." : "Get Insights"}
          </button>
        </div>
      </header>
      <main className="p-8">
        <Dashboard from={from} to={to} />
      </main>
      <InsightsPanel
        insights={insights}
        loading={insightLoading}
        error={insightError}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}

function App () {
  return (
    <MarketDataProvider>
      <AppContent />
    </MarketDataProvider>
  );
}

export default App;
