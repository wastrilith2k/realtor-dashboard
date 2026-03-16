import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ChartCard ({ title, subtitle, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 md:p-7 shadow-md overflow-hidden animate-fade-in-up">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-gray-400 mb-4">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}
