export const SERVICE_TIME_SLOTS = {
  tint: [
    { id: "tint-1", label: "09:00 AM - 10:30 AM", start: "09:00", end: "10:30" },
    { id: "tint-2", label: "10:30 AM - 12:00 PM", start: "10:30", end: "12:00" },
    { id: "tint-3", label: "12:00 PM - 01:30 PM", start: "12:00", end: "13:30" },
    { id: "tint-4", label: "01:30 PM - 03:00 PM", start: "13:30", end: "15:00" },
    { id: "tint-5", label: "03:00 PM - 04:30 PM", start: "15:00", end: "16:30" },
    { id: "tint-6", label: "04:30 PM - 06:00 PM", start: "16:30", end: "18:00" },
    { id: "tint-7", label: "06:00 PM - 07:30 PM", start: "18:00", end: "19:30" },
  ],
  coating: [
    { id: "coating-1", label: "09:00 AM - 01:30 PM", start: "09:00", end: "13:30" },
    { id: "coating-2", label: "01:30 PM - 06:00 PM", start: "13:30", end: "18:00" },
  ],
  ppf: [{ id: "ppf-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" }],
  wrapping: [
    { id: "wrapping-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" },
  ],
  combo: [{ id: "combo-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" }],
};

export function normalizeService(service) {
  const value = String(service || "").toLowerCase();
  if (value.includes("combo") || value.includes("+")) return "combo";
  if (value.includes("coat")) return "coating";
  if (value.includes("wrap")) return "wrapping";
  if (value.includes("ppf")) return "ppf";
  return "tint";
}

export function getTimeSlotsForService(service) {
  return SERVICE_TIME_SLOTS[normalizeService(service)] || SERVICE_TIME_SLOTS.tint;
}

export function parseTimeToMinutes(time24h) {
  const [h, m] = String(time24h).split(":").map(Number);
  return h * 60 + m;
}

export function parseLabelRangeToMinutes(label) {
  const parts = String(label || "").split(" - ");
  if (parts.length !== 2) return null;
  return {
    start: parseMeridiemTimeToMinutes(parts[0]),
    end: parseMeridiemTimeToMinutes(parts[1]),
  };
}

function parseMeridiemTimeToMinutes(value) {
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const mins = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + mins;
}

export function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}
