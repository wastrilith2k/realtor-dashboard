import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { MarketDataProvider, useMarketData } from "./hooks/useMarketData";
import { Dashboard } from "./components/Dashboard";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { InsightsPanel } from "./components/InsightsPanel";
import { filterByDateRange } from "./lib/filterByDateRange";
import type { MarketData } from "./types/market";
import { SERIES_NAMES } from "./lib/seriesNames";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AppContent () {
  const [from, setFrom] = useState("2020-01");
  const [to, setTo] = useState("2026-03");
  const [panelOpen, setPanelOpen] = useState(false);

  const { marketData } = useMarketData();

  const { completion, isLoading, error, complete } = useCompletion({
    api: `${API_BASE_URL}/api/insight/stream`,
    streamProtocol: "text",
  });

  const handleGetInsights = async () => {
    if (!marketData) return;

    setPanelOpen(true);

    // Filter data to the visible date range before sending
    const filtered: MarketData = {};
    for (const [seriesId, observations] of Object.entries(marketData)) {
      filtered[seriesId] = filterByDateRange(observations, from, to);
    }

    await complete("analyze", {
      body: {
        market_data: filtered,
        series_names: SERIES_NAMES,
        date_range: { from_date: from, to_date: to },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-white shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Portland Real Estate Dashboard
        </h1>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <DateRangeFilter
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
          <button
            onClick={handleGetInsights}
            disabled={isLoading || !marketData}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Analyzing..." : "Get Insights"}
          </button>
        </div>
      </header>
      <main className="p-8">
        <Dashboard from={from} to={to} />
      </main>
      <InsightsPanel
        completion={completion}
        loading={isLoading}
        error={error?.message ?? null}
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
