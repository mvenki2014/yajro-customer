import * as React from "react";
import { useSetShell } from "@/context/ShellContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { services } from "@/data/mock";

export function CheckoutTracking({
  serviceId,
  tierId,
  onBack,
  onConfirm,
}: {
  serviceId: string;
  tierId: string;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const tierObj = service.packages.find((p) => p.id === tierId) ?? service.packages[0];

  const cost = {
    dakshina: tierObj.price,
    samagri: tierObj.includesSamagri ? 650 : 0,
    convenience: 49,
  };
  const total = cost.dakshina + cost.samagri + cost.convenience;

  useSetShell({
    title: (
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
          <div className="truncate font-semibold">Summary & Tracking</div>
          <div className="text-xs text-slate-500 truncate">{service.title}</div>
        </div>
        <Badge variant="saffron">₹{total}</Badge>
      </>
    ),
  });

  return (
    <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Plan Details</h3>
            <Badge variant="saffron">{tierObj.name}</Badge>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</div>
              <div className="text-sm font-bold text-slate-800">{service.title}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What's Included</div>
              <div className="mt-2 space-y-2">
                {tierObj.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm text-slate-700">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF9933]" />
                    <span>{h}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF9933]" />
                  <span>{tierObj.includesSamagri ? "Full Pooja Samagri included" : "Pooja only (Bring your own samagri)"}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-orange-50/30 border-orange-100">
          <div className="text-lg font-bold text-slate-800">Items to keep ready</div>
          <div className="mt-1 text-xs text-slate-500">Please have these items ready before the Poojari arrives.</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Deepam", "Flowers", "Asanam", "Fruits", "Water pot", "Camphor"].map((it) => (
              <div key={it} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-medium border border-orange-100 shadow-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {it}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-600">Payable amount</div>
              <div className="mt-1 text-2xl font-extrabold">₹{total}</div>
              <div className="mt-1 text-xs text-slate-500">Includes taxes & platform fee</div>
            </div>
            <Badge variant="success">Secure</Badge>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Dakshina (fees)" value={`₹${cost.dakshina}`} />
            <Row label="Samagri" value={`₹${cost.samagri}`} />
            <Row label="Convenience" value={`₹${cost.convenience}`} />
            <div className="h-px bg-slate-200 my-2" />
            <Row label={<span className="font-semibold">Total</span>} value={<span className="font-semibold">₹{total}</span>} />
          </div>
          <div className="mt-4">
            <Button className="w-full" onClick={onConfirm}>Pay & confirm</Button>
            <div className="mt-2 text-xs text-slate-500 text-center">
              Mock checkout. No real payments.
            </div>
          </div>
        </Card>

      </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-slate-600">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}
