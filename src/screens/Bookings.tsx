import { MobileShell } from "@/components/layout/MobileShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/layout/BottomNav";
import { services } from "@/data/mock";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Tab } from "@/types";

export function Bookings({
                           onNavigate,
                           onTrackService,
                           onViewDetail,
                         }: {
  onNavigate: (tab: Tab) => void;
  onTrackService: (serviceId: string) => void;
  onViewDetail: (bookingId: string) => void;
}) {
  const sampleBookings = [
    {
      id: "BK-882731",
      serviceId: "satyanarayana-vratam",
      date: "2026-02-10",
      slot: "08-12",
      status: "In Progress",
      address: "Plot 12, Lakshmi Nagar, Hyderabad",
      price: 2299,
    },
    {
      id: "BK-771209",
      serviceId: "griha-pravesh",
      date: "2026-01-15",
      slot: "04-08",
      status: "Completed",
      address: "Flat 401, Sri Krishna Residency, Banjara Hills",
      price: 4299,
    },
    {
      id: "BK-665412",
      serviceId: "car-pooja",
      date: "2025-12-20",
      slot: "12-16",
      status: "Completed",
      address: "Kondapur, Hyderabad",
      price: 1199,
    },
  ];

  const getService = (id: string) => services.find((s) => s.id === id) ?? services[0];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatSlot = (slot: string) => {
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
            onClick={() => onNavigate("home")}
            className="rounded-xl p-2 hover:bg-slate-900/5"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold">My Bookings</div>
            <div className="text-xs text-slate-500 truncate">History of your spiritual services</div>
          </div>
          <Badge variant="saffron">3 Bookings</Badge>
        </>
      }
      bottomNav={<BottomNav activeTab="bookings" onTabChange={onNavigate} />}
    >
      <div className="space-y-3 pb-4">
        {sampleBookings.map((booking) => {
          const service = getService(booking.serviceId);
          const isInProgress = booking.status === "In Progress";

          return (
            <Card key={booking.id} className="px-4 pt-3 pb-2 relative overflow-hidden group border-slate-100 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white via-white to-orange-50/50">
              {isInProgress && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
              )}

              <div className="flex justify-between items-start mb-3 gap-3">
                <div 
                  className="flex items-center gap-3 min-w-0 cursor-pointer"
                  onClick={() => onViewDetail(booking.id)}
                >
                  <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {booking.serviceId === 'car-pooja' ? '🚗' : booking.serviceId === 'griha-pravesh' ? '🏠' : '🙏'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate mb-0.5">{booking.id}</div>
                    <div className="text-base font-bold text-slate-900 truncate leading-tight">{service.title}</div>
                  </div>
                </div>
                <Badge variant={isInProgress ? "success" : "neutral"} className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  {isInProgress && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />}
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-1 pb-2 border-y border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-50">
                    <Calendar className="h-3.5 w-3.5 text-[#FF9933]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Date</span>
                    <span className="text-[11px] font-bold text-slate-700">{formatDate(booking.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-50">
                    <Clock className="h-3.5 w-3.5 text-[#FF9933]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Slot</span>
                    <span className="text-[11px] font-bold text-slate-700">{formatSlot(booking.slot)}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 col-span-2">
                  <div className="p-1.5 rounded-lg bg-orange-50 shrink-0">
                    <MapPin className="h-3.5 w-3.5 text-[#FF9933]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Location</span>
                    <span className="text-[11px] font-bold text-slate-600 truncate">{booking.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-1">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Amount Paid</span>
                  <div className="text-lg font-black text-[#B35300]">₹{booking.price}</div>
                </div>
                {isInProgress ? (
                  <Button
                    onClick={() => onTrackService(booking.serviceId)}
                    className="h-8 text-[10px] px-4 font-bold shadow-orange-200/50 uppercase tracking-wider"
                  >
                    Track Live
                  </Button>
                ) : (
                  <button 
                    onClick={() => onViewDetail(booking.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#B35300] hover:text-[#FF9933] transition-colors shrink-0"
                  >
                    View Details <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </Card>
          );
        })}

        {sampleBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-orange-50 flex items-center justify-center text-4xl mb-4">
              📔
            </div>
            <h3 className="text-lg font-bold text-slate-900">No bookings yet</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-[200px]">Your spiritual journey starts here. Book your first pooja today!</p>
            <Button className="mt-6" onClick={() => onNavigate('home')}>Explore Services</Button>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
