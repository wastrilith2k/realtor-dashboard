function Bone ({ className }: { className: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

function ChartSkeleton () {
  return (
    <div className="bg-white rounded-lg p-5 md:p-7 shadow-md overflow-hidden">
      <Bone className="h-5 w-40 mb-2" />
      <Bone className="h-3 w-28 mb-5" />
      <div className="flex gap-3 h-[300px]">
        {/* Y-axis */}
        <div className="flex flex-col justify-between py-2">
          <Bone className="h-2.5 w-8" />
          <Bone className="h-2.5 w-8" />
          <Bone className="h-2.5 w-8" />
          <Bone className="h-2.5 w-8" />
        </div>
        {/* Chart body */}
        <div className="flex-1 flex flex-col">
          <Bone className="flex-1 rounded-lg opacity-40" />
          {/* X-axis */}
          <div className="flex justify-between mt-3">
            <Bone className="h-2.5 w-10" />
            <Bone className="h-2.5 w-10" />
            <Bone className="h-2.5 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton ({ chartCount = 6 }: { chartCount?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: chartCount }, (_, i) => (
        <ChartSkeleton key={i} />
      ))}
    </div>
  );
}
