import * as React from "react";
import { useSetShell } from "@/context/ShellContext";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/layout/BottomNav";
import { services } from "@/data/mock";
import { Tab } from "@/types";

const steps = [
  { id: "assigned", label: "Poojari assigned" },
  { id: "materials", label: "Materials dispatched" },
  { id: "enroute", label: "Poojari en route" },
  { id: "started", label: "Pooja started" },
] as const;

export function Track({
  serviceId,
  onNavigate
}: {
  serviceId: string;
  onNavigate: (tab: Tab) => void;
}) {
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const [active, setActive] = React.useState<string>("assigned");
  const activeIndex = steps.findIndex((s) => s.id === active);

  useSetShell({
    title: (
      <>
        <button
          type="button"
          onClick={() => onNavigate("bookings")}
          className="rounded-xl p-2 hover:bg-slate-900/5"
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">Live Tracking</div>
          <div className="text-xs text-slate-500 truncate">{service.title}</div>
        </div>
        <Badge variant="success">On Time</Badge>
      </>
    ),
    bottomNav: <BottomNav activeTab="tracking" onTabChange={onNavigate} />,
    footer: (
      <div className="flex flex-col gap-3 mb-14">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs text-slate-500 font-medium">Testing tool</div>
          <Badge variant="saffron" className="text-[10px] py-0 h-4">Dev Only</Badge>
        </div>
        <Button onClick={() => {
          if (activeIndex < steps.length - 1) {
            setActive(steps[activeIndex + 1].id);
          } else {
            setActive(steps[0].id); // Loop back for testing
          }
        }} className="w-full shadow-lg shadow-orange-200">
          Move Progress
        </Button>
      </div>
    ),
  });

  return (
    <div className="space-y-4">
        <Card className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">Order Status</div>
                <div className="text-xs text-slate-500">Map is a visual mock</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="neutral">ETA 18 min</Badge>
              </div>
            </div>
          </div>
          <div className="h-56 bg-[radial-gradient(circle_at_30%_20%,rgba(255,153,51,.25),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(34,197,94,.18),transparent_45%),linear-gradient(135deg,rgba(15,23,42,.03),rgba(255,255,255,.8))] relative">
            <div className="absolute left-6 top-8">
              <Pin label="Home" />
            </div>
            <div className="absolute right-10 bottom-8">
              <Pin label="Temple" tone="saffron" />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 left-8"
              style={{
                transform: `translate(${activeIndex * 70}px, -50%)`,
                transition: "transform 600ms ease",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-2xl bg-white ring-1 ring-slate-200 grid place-items-center shadow-sm">
                  <span className="text-lg">🛕</span>
                </div>
                <div className="mt-1 text-[10px] font-semibold text-slate-700">Poojari</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm font-semibold mb-4">Tracking Details</div>
            <div className="space-y-4">
              {steps.map((s, idx) => {
                const done = idx <= activeIndex;
                return (
                  <div key={s.id} className="flex items-start gap-3 mb-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={
                          "h-5 w-5 rounded-full grid place-items-center ring-1 z-10 " +
                          (done
                            ? "bg-emerald-500 ring-emerald-500 text-white"
                            : "bg-white ring-slate-200 text-slate-400")
                        }
                      >
                        {done ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <span className="text-[10px]">•</span>
                        )}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className={cn("w-0.5 h-6 -my-1", done ? "bg-emerald-500" : "bg-slate-100")} />
                      )}
                    </div>
                    <div className="flex-1 -mt-0.5">
                      <div className={done ? "text-sm font-bold text-slate-900" : "text-sm text-slate-500"}>
                        {s.label}
                      </div>
                      {idx === activeIndex && (
                        <div className="text-[11px] text-emerald-600 font-medium">In progress</div>
                      )}
                    </div>
                    {idx === activeIndex ? <Badge variant="saffron">Now</Badge> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800 tracking-wider">Service Todo List</h3>
            <Badge variant="neutral">{[...steps].length} Tasks</Badge>
          </div>
          <div className="space-y-2">
            {[
              "Prepare Prasadam",
              "Arrange deepam & flowers",
              "Keep asanam ready",
              "Clean the pooja area",
            ].map((todo, i) => (
              <div key={todo} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 ring-1 ring-slate-100 group transition-all hover:bg-white hover:shadow-sm">
                <div className="h-5 w-5 rounded-md border-2 border-slate-300 flex items-center justify-center bg-white group-hover:border-[#FF9933] transition-colors">
                  {i === 0 && <div className="h-2.5 w-2.5 rounded-sm bg-[#FF9933]" />}
                </div>
                <span className={cn("text-xs font-medium", i === 0 ? "text-slate-400 line-through" : "text-slate-700")}>
                  {todo}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-xl">
              👳
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Pandit Rajesh Sharma</div>
              <div className="text-xs text-slate-500">Premium Verified Poojari</div>
            </div>
            <div className="flex gap-2">
               <button className="p-2 rounded-full bg-orange-50 text-[#B35300] ring-1 ring-orange-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
               </button>
               <button className="p-2 rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
               </button>
            </div>
          </div>
        </Card>
      </div>
  );
}

function Pin({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "saffron" }) {
  const cls =
    tone === "saffron"
      ? "bg-[#FF9933]/15 ring-[#FF9933]/30 text-[#B35300]"
      : "bg-white ring-slate-200 text-slate-700";
  return (
    <div className="flex items-center gap-2">
      <div className={"h-9 w-9 rounded-2xl ring-1 grid place-items-center shadow-sm " + cls}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <div className="text-[11px] font-semibold text-slate-700 bg-white/70 rounded-full px-2 py-1 ring-1 ring-slate-200">
        {label}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
