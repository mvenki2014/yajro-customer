import * as React from "react";
import { cn } from "@/utils/cn";

export function Badge({
  children,
  className,
  tone = "saffron",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "saffron" | "gold" | "neutral" | "success";
}) {
  const tones = {
    saffron: "bg-[#FF9933]/15 text-[#B35300] ring-1 ring-[#FF9933]/30",
    gold: "bg-amber-400/20 text-amber-900 ring-1 ring-amber-400/35",
    neutral: "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10",
    success: "bg-emerald-500/15 text-emerald-800 ring-1 ring-emerald-500/25",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
