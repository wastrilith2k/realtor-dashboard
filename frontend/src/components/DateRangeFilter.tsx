interface DateRangeFilterProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function DateRangeFilter ({ from, to, onFromChange, onToChange }: DateRangeFilterProps) {

  console.log('DateRangeFilter rendered with from:', from, 'to:', to);
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-gray-600">
        From
        <input
          type="month"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        To
        <input
          type="month"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </label>
    </div>
  );
}
