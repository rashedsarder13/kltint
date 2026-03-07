import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import {
  getTimeSlotsForService,
  parseLabelRangeToMinutes,
  parseTimeToMinutes,
  rangesOverlap,
} from "@/lib/schedule-config";

function getRangeFromAppointment(data) {
  if (data.slotStart && data.slotEnd) {
    return {
      start: parseTimeToMinutes(data.slotStart),
      end: parseTimeToMinutes(data.slotEnd),
    };
  }
  const parsed = parseLabelRangeToMinutes(data.timeSlot);
  if (parsed) return parsed;
  return null;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const date = searchParams.get("date");
    const service = searchParams.get("service");

    if (!branch || !date || !service) {
      return NextResponse.json(
        { error: "branch, date and service are required" },
        { status: 400 }
      );
    }

    const slots = getTimeSlotsForService(service);

    const snap = await db
      .collection("appointments")
      .where("branch", "==", branch)
      .where("date", "==", date)
      .where("status", "==", "confirmed")
      .get();

    const existingRanges = [];
    snap.forEach((doc) => {
      const range = getRangeFromAppointment(doc.data());
      if (range) existingRanges.push(range);
    });

    const response = slots.map((slot) => {
      const currentStart = parseTimeToMinutes(slot.start);
      const currentEnd = parseTimeToMinutes(slot.end);
      const blocked = existingRanges.some((range) =>
        rangesOverlap(currentStart, currentEnd, range.start, range.end)
      );

      return {
        ...slot,
        available: !blocked,
      };
    });

    return NextResponse.json({ slots: response });
  } catch (error) {
    console.error("[appointments/slots] error", error);
    return NextResponse.json(
      { error: "Failed to load slots" },
      { status: 500 }
    );
  }
}
