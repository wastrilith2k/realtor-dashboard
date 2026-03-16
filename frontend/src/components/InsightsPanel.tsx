import type { Insight } from "../types/market";
import { SERIES_NAMES } from "../lib/seriesNames";

interface InsightsPanelProps {
  insights: Insight[];
  loading: boolean;
  error: string | null;
  open: boolean;
  onClose: () => void;
}

export function InsightsPanel ({ insights, loading, error, open, onClose }: InsightsPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">
          {loading && (
            <div className="flex flex-col items-center gap-3 pt-12">
              <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Analyzing market data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
              <p className="text-red-700 text-sm font-medium">Unable to generate insights</p>
              <p className="text-red-500 text-xs mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && insights.length === 0 && (
            <p className="text-gray-400 text-sm">No insights generated yet.</p>
          )}

          <div className="flex flex-col gap-4">
            {insights.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <p className="text-sm text-gray-800 leading-relaxed">
                  {item.insight}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.series_ids.map((id) => (
                    <span
                      key={id}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                    >
                      {SERIES_NAMES[id] ?? id}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
