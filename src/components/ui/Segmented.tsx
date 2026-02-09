import { cn } from "@/utils/cn";

export function Segmented({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; sub?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-xl px-3 py-2 text-left ring-1 transition",
              active
                ? "bg-[#FF9933]/10 ring-[#FF9933]/35"
                : "bg-white hover:bg-slate-50 ring-slate-200"
            )}
          >
            <div className="text-sm font-semibold text-slate-900">{o.label}</div>
            {o.sub ? (
              <div className="text-xs text-slate-500 leading-snug">{o.sub}</div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
