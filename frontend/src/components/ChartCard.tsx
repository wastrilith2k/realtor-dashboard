import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export function ChartCard ({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
