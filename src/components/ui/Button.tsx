import * as React from "react";
import { cn } from "@/utils/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const styles = {
    primary:
      "bg-[#FF9933] text-white shadow-sm shadow-orange-200 hover:bg-[#ff8a14] active:bg-[#f07e00]",
    secondary:
      "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-900/5",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:pointer-events-none",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
