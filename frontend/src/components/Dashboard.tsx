import { useMarketData } from "../hooks/useMarketData";
import { filterByDateRange } from "../lib/filterByDateRange";
import { MedianPriceChart } from "./MedianPriceChart";
import { ActiveInventoryChart } from "./ActiveInventoryChart";
import { DaysOnMarketChart } from "./DaysOnMarketChart";
import { PriceReductionChart } from "./PriceReductionChart";
import { BuildingPermitsChart } from "./BuildingPermitsChart";
import { MortgageRatesChart } from "./MortgageRatesChart";
import { DashboardSkeleton } from "./ChartSkeleton";

interface DashboardProps {
  from: string;
  to: string;
}

export function Dashboard ({ from, to }: DashboardProps) {
  const { marketData, loading, error } = useMarketData();

  if (loading) return <DashboardSkeleton chartCount={6} />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!marketData) return null;

  const filter = (seriesId: string) =>
    filterByDateRange(marketData[seriesId] ?? [], from, to);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MedianPriceChart data={filter("MEDLISPRI38900")} />
      <ActiveInventoryChart data={filter("ACTLISCOU38900")} />
      <DaysOnMarketChart data={filter("MEDDAYONMAR38900")} />
      <PriceReductionChart data={filter("PRIREDCOU38900")} />
      <BuildingPermitsChart data={filter("PORT941BPPRIVSA")} />
      <MortgageRatesChart data={filter("MORTGAGE30US")} />
    </div>
  );
}
