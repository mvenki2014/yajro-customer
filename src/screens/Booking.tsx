import * as React from "react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { shubhDaysISO } from "@/data/mock";

function toISO(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const timeSlots = [
  { id: "morning", label: "Morning", sub: "6:00 AM – 11:00 AM" },
  { id: "afternoon", label: "Afternoon", sub: "11:00 AM – 4:00 PM" },
  { id: "evening", label: "Evening", sub: "4:00 PM – 9:00 PM" },
] as const;

export function Booking({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = React.useState(toISO(today));
  const [slot, setSlot] = React.useState<string>(
    "morning"
  );
  const [address, setAddress] = React.useState("Plot 12, Lakshmi Nagar, Hyderabad");
  const [pinned, setPinned] = React.useState(false);

  const next7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = toISO(d);
    const shubh = shubhDaysISO.includes(iso);
    return { iso, d, shubh };
  });

  return (
    <MobileShell
      title={
        <>
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl p-2 hover:bg-slate-900/5"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold">Booking & scheduling</div>
            <div className="text-xs text-slate-500 truncate">Pick shubh date, time & location</div>
          </div>
          <Badge tone="success">Shubh din</Badge>
        </>
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-500">Next</div>
            <div className="text-sm font-semibold">Checkout & tracking</div>
          </div>
          <Button onClick={onConfirm}>Continue</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Choose date</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {next7.map(({ iso, d, shubh }) => {
              const active = iso === selectedDate;
              const day = d.toLocaleDateString(undefined, { weekday: "short" });
              const date = d.getDate();
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelectedDate(iso)}
                  className={
                    "min-w-[84px] rounded-2xl p-3 text-left ring-1 transition " +
                    (active
                      ? "bg-[#FF9933]/12 ring-[#FF9933]/35"
                      : "bg-white ring-slate-200 hover:bg-slate-50")
                  }
                >
                  <div className="text-xs font-semibold text-slate-600">{day}</div>
                  <div className="mt-1 text-lg font-bold">{date}</div>
                  <div className="mt-1">
                    {shubh ? <Badge tone="success">Shubh</Badge> : <Badge tone="neutral">Ok</Badge>}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            * Green dates are marked as auspicious (mock data).
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Choose time slot</h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {timeSlots.map((t) => {
              const active = t.id === slot;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSlot(t.id)}
                  className={
                    "rounded-2xl p-3 text-left ring-1 transition " +
                    (active
                      ? "bg-[#FF9933]/12 ring-[#FF9933]/35"
                      : "bg-white ring-slate-200 hover:bg-slate-50")
                  }
                >
                  <div className="text-sm font-semibold">{t.label}</div>
                  <div className="mt-1 text-xs text-slate-500 leading-snug">{t.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Location</h2>
          <Card className="mt-3 overflow-hidden">
            <div className="p-4">
              <label className="text-xs font-semibold text-slate-600">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full rounded-xl bg-white px-3 py-2.5 text-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#FF9933]/45"
              />
            </div>
            <div className="h-44 bg-[linear-gradient(135deg,rgba(255,153,51,.18),rgba(251,191,36,.10),rgba(255,255,255,.6))] relative">
              <div className="absolute inset-0 p-4">
                <div className="flex items-start justify-between">
                  <div className="text-xs font-semibold text-slate-700">Map preview (mock)</div>
                  <Badge tone="neutral">Google Maps</Badge>
                </div>
                <div className="mt-3 grid place-items-center h-[110px]">
                  <div className="rounded-2xl bg-white/80 ring-1 ring-slate-200 px-4 py-3 text-center">
                    <div className="text-sm font-semibold">Drop a pin</div>
                    <div className="text-xs text-slate-600">Simulated map interaction</div>
                    <div className="mt-2">
                      <Button
                        variant={pinned ? "secondary" : "primary"}
                        onClick={() => setPinned((v) => !v)}
                      >
                        {pinned ? "Pin placed" : "Place pin"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobileShell>
  );
}
