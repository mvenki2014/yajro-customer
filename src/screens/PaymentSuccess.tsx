import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MobileShell } from "@/components/layout/MobileShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BottomNav } from "@/components/layout/BottomNav";
import { services } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Check, Calendar, Clock, MapPin, Sparkle } from "lucide-react";
import { Tab } from "@/types";

export function PaymentSuccess({
  serviceId,
  onTrack,
  onNavigate,
}: {
  serviceId: string;
  onTrack: () => void;
  onNavigate: (tab: Tab) => void;
}) {
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const locationData = useSelector((state: RootState) => state.location.data);

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Not selected";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Format slot
  const formatSlot = (slot?: string) => {
    if (!slot) return "Not selected";
    const slots: Record<string, string> = {
      "00-04": "12 AM - 04 AM",
      "04-08": "04 AM - 08 AM",
      "08-12": "08 AM - 12 PM",
      "12-16": "12 PM - 04 PM",
      "16-20": "04 PM - 08 PM",
      "20-24": "08 PM - 12 AM",
    };
    return slots[slot] || slot;
  };

  return (
    <MobileShell
      title={
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
            <div className="truncate font-semibold">Payment Status</div>
            <div className="text-xs text-slate-500 truncate">{service.title}</div>
          </div>
          <Badge variant="success">Success</Badge>
        </>
      }
      bottomNav={<BottomNav activeTab="bookings" onTabChange={onNavigate} />}
    >
      <div className="flex flex-col h-[calc(100vh-160px)] overflow-hidden">
        <div className="flex flex-col items-center justify-center pt-4 pb-4 shrink-0">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3 relative">
              <div className="absolute inset-0 rounded-full ring-4 ring-emerald-500/20 animate-pulse" />
              <Check className="h-8 w-8 text-emerald-600" strokeWidth={3} />
              
              {/* Twinkles */}
              <Sparkle className="absolute -top-1 -right-1 h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
              <Sparkle className="absolute top-0 -left-2 h-3 w-3 text-amber-300 fill-amber-300 animate-bounce [animation-delay:200ms]" />
              <div className="absolute -bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-amber-200 animate-ping" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Payment Successful</h1>
          <p className="text-xs text-slate-500 mt-0.5">Your Booking #VS-{Math.floor(100000 + Math.random() * 900000)} has been confirmed</p>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-0.5 scrollbar-hide">
          <Card className="p-4 bg-white shadow-sm overflow-hidden relative">
            <div className="absolute right-0 top-0 h-10 w-10 bg-[#FF9933]/5 rounded-bl-full flex items-start justify-end p-1.5">
               <div className="h-1.5 w-1.5 rounded-full bg-[#FF9933]" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-orange-50 flex items-center justify-center text-lg shrink-0">
                  🙏
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service</div>
                  <div className="text-sm font-bold text-slate-900 truncate">{service.title}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="h-2.5 w-2.5 text-[#B35300]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Date</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">{formatDate(locationData?.selectedDate)}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="h-2.5 w-2.5 text-[#B35300]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Slot</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">{formatSlot(locationData?.slot)}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="h-2.5 w-2.5 text-[#B35300]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Pooja Location ({locationData?.locationType || 'Home'})</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                  {locationData?.address || "Location not found"}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-emerald-500 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live Status</div>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              Poojari will be assigned shortly.
            </p>
            <div className="mt-3">
              <Button 
                className="w-full h-10 text-xs" 
                variant="default" 
                onClick={onTrack}
              >
                Track Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </MobileShell>
  );
}
