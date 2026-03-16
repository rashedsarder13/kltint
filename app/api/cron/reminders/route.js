import { NextResponse } from "next/server";

export async function GET(request) {
  void request;
  // Reminder scheduling is intentionally disabled for now.
  // Re-enable this route when cron-based reminder emails are ready to ship.
  return NextResponse.json({
    success: false,
    disabled: true,
    message: "Reminder scheduler is disabled for now.",
  });
}
