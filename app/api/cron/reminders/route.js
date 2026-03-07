import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { sendReminderEmail } from "@/lib/email-templates";
import { parseLabelRangeToMinutes } from "@/lib/schedule-config";

function inMalaysiaNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const now = inMalaysiaNow();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const snap = await db
      .collection("appointments")
      .where("date", "==", today)
      .where("status", "==", "confirmed")
      .where("reminderSent", "==", false)
      .get();

    let remindersSent = 0;

    for (const doc of snap.docs) {
      const data = doc.data();
      const range = parseLabelRangeToMinutes(data.timeSlot);
      if (!range) continue;

      const minsUntilStart = range.start - nowMinutes;

      // Cron runs every 10 mins, so use 30..39 minute window.
      if (minsUntilStart >= 30 && minsUntilStart < 40) {
        try {
          await sendReminderEmail({ id: doc.id, ...data });
          await doc.ref.update({ reminderSent: true });
          remindersSent += 1;
        } catch (emailError) {
          console.error("[cron/reminders] reminder failed", emailError);
        }
      }
    }

    return NextResponse.json({ success: true, remindersSent });
  } catch (error) {
    console.error("[cron/reminders] error", error);
    return NextResponse.json(
      { success: false, error: "Reminder cron failed" },
      { status: 500 }
    );
  }
}
