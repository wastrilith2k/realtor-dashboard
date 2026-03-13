import type { Observation } from "../types/market";

export function filterByDateRange (
  data: Observation[],
  from: string | null,
  to: string | null,
): Observation[] {
  return data.filter((obs) => {
    if (from && obs.date < from) return false;
    if (to && obs.date > to) return false;
    return true;
  });
}
