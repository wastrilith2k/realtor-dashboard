import { SERIES_NAMES } from "../lib/seriesNames";
import { parseStreamingCompletion, parseStreamedInsights } from "../lib/parseStreamedInsights";
import type { ParsedInsight } from "../lib/parseStreamedInsights";

interface InsightsPanelProps {
  completion: string;
  loading: boolean;
  error: string | null;
  open: boolean;
  onClose: () => void;
}

function InsightCard ({ insight }: { insight: ParsedInsight }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 animate-fade-in-up">
      <p className="text-sm text-gray-800 leading-relaxed">
        {insight.text}
      </p>
      {insight.seriesIds.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {insight.seriesIds.map((id) => (
            <span
              key={id}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
            >
              {SERIES_NAMES[id] ?? id}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function InsightsPanel ({ completion, loading, error, open, onClose }: InsightsPanelProps) {
  // Derive display state from the completion string on every render.
  // During streaming: finished blocks become cards, trailing block is raw text.
  // After streaming: all blocks are finished cards.
  const { finished, activeText } = loading
    ? parseStreamingCompletion(completion)
    : { finished: parseStreamedInsights(completion), activeText: "" };

  const hasContent = completion.length > 0;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

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
          {/* Spinner before first chunk arrives */}
          {loading && !hasContent && !error && (
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

          {/* Finished insight cards */}
          {finished.length > 0 && (
            <div className="flex flex-col gap-4">
              {finished.map((item, i) => (
                <InsightCard key={i} insight={item} />
              ))}

              {/* Actively streaming text below finished cards */}
              {loading && activeText && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 border-dashed">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {activeText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Streaming but no delimiter yet — first insight still arriving */}
          {loading && hasContent && finished.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 border-dashed">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {activeText}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && !hasContent && (
            <p className="text-gray-400 text-sm">No insights generated yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
