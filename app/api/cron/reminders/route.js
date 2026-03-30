import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { sendReminderEmail } from "@/lib/email-templates";

/**
 * GET /api/cron/reminders
 *
 * Called by the scheduler (Firebase Cloud Function Pub/Sub or equivalent) every 10 minutes.
 * For direct HTTP hits, this expects the `Authorization: Bearer ${process.env.CRON_SECRET}` header.
 *
 * Finds appointments that are within 30 minutes and haven't been reminded yet.
 * Sends reminder emails and marks them as reminded.
 */
export async function GET(request) {
  // Verify cron secret headers from scheduler.
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0]; // "2026-03-15"

    // Current time in HH:MM format (Malaysia timezone UTC+8)
    const malaysiaTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const currentHour = malaysiaTime.getUTCHours();
    const currentMinute = malaysiaTime.getUTCMinutes();
    const currentMinutes = currentHour * 60 + currentMinute;

    // Find today's confirmed appointments that haven't been reminded
    const snapshot = await db
      .collection("appointments")
      .where("date", "==", todayStr)
      .where("status", "==", "confirmed")
      .where("reminderSent", "==", false)
      .get();

    let sentCount = 0;

    for (const doc of snapshot.docs) {
      const appointment = doc.data();

      // Parse the start time from the timeSlot (e.g., "09:00 AM - 10:30 AM")
      const startTimeMatch = appointment.timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!startTimeMatch) continue;

      let hours = parseInt(startTimeMatch[1]);
      const minutes = parseInt(startTimeMatch[2]);
      const period = startTimeMatch[3].toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const appointmentMinutes = hours * 60 + minutes;
      const minutesUntilAppointment = appointmentMinutes - currentMinutes;

      // Send reminder if appointment is within 30-40 minutes from now
      // (10-minute buffer because cron runs every 10 min)
      if (minutesUntilAppointment > 0 && minutesUntilAppointment <= 40) {
        try {
          await sendReminderEmail({ id: doc.id, ...appointment });
          await doc.ref.update({ reminderSent: true });
          sentCount++;
        } catch (emailError) {
          console.error(`Reminder failed for ${doc.id}:`, emailError);
        }
      }
    }

    return NextResponse.json({ success: true, remindersSent: sentCount });
  } catch (error) {
    console.error("Cron reminders error:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
