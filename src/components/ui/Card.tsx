import * as React from "react";
import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
