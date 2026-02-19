import { services } from "@/data/mock";

export interface Slot {
  id: string;
  label: string;
  sub: string;
}

const timeSlots: Slot[] = [
  { id: "00-04", label: "00 - 04", sub: "Early Morning" },
  { id: "04-08", label: "04 - 08", sub: "Dawn" },
  { id: "08-12", label: "08 - 12", sub: "Morning" },
  { id: "12-16", label: "12 - 16", sub: "Afternoon" },
  { id: "16-20", label: "16 - 20", sub: "Evening" },
  { id: "20-24", label: "20 - 24", sub: "Night" },
];

const slotLabels: Record<string, string> = {
  "00-04": "12 AM - 04 AM",
  "04-08": "04 AM - 08 AM",
  "08-12": "08 AM - 12 PM",
  "12-16": "12 PM - 04 PM",
  "16-20": "04 PM - 08 PM",
  "20-24": "08 PM - 12 AM",
};

/**
 * Simulates fetching available time slots from an API.
 */
export async function fetchTimeSlots(): Promise<Slot[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...timeSlots];
}

/**
 * Formats a slot ID into a human-readable display string.
 */
export function formatSlotLabel(slotId: string): string {
  return slotLabels[slotId] || slotId;
}

/**
 * Helper to get service details by ID (mimicking an API fetch).
 */
export async function fetchServiceById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return services.find((s) => s.id === id) ?? services[0];
}
