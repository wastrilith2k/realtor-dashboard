function toLocalDate (dateStr: string): Date {
  return new Date(dateStr + "T08:00:00");
}

export function formatDateShort (date: string): string {
  return toLocalDate(date).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

export function formatDateLong (date: string): string {
  return toLocalDate(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
