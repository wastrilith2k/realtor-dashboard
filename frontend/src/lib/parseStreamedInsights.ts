export interface ParsedInsight {
  text: string;
  seriesIds: string[];
}

export interface StreamingParseResult {
  finished: ParsedInsight[];
  activeText: string;
}

function parseBlock (block: string): ParsedInsight {
  const seriesIds = [...block.matchAll(/\[([A-Z0-9]+)\]/g)].map((m) => m[1]);
  const text = block.replaceAll(/\s*\[[A-Z0-9]+\]/g, "").trim();
  return { text, seriesIds };
}

/**
 * Parses a growing completion string in real-time.
 * - Completed blocks (before the last `---`) become finished insight cards
 * - The trailing block (after the last `---`) is still streaming
 */
export function parseStreamingCompletion (completion: string): StreamingParseResult {
  const parts = completion.split("---");

  // Everything except the last segment is a finished insight
  const finishedBlocks = parts.slice(0, -1).map((s) => s.trim()).filter(Boolean);
  const finished = finishedBlocks.map(parseBlock);

  // The last segment is either actively streaming or the final block
  const activeText = parts[parts.length - 1]?.trim() ?? "";

  return { finished, activeText };
}

/**
 * Final parse when stream is complete — all blocks are finished.
 */
export function parseStreamedInsights (raw: string): ParsedInsight[] {
  return raw
    .split("---")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseBlock);
}
