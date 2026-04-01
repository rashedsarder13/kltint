import { NextResponse } from "next/server";
import { sendSMS, sendWhatsApp } from "@/lib/twilio";

export async function POST(request) {
  try {
    // Check admin token
    const adminToken = request.headers.get("x-admin-token");
    if (adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, phone, message } = body;

    if (!type || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: type, phone, message",
        },
        { status: 400 }
      );
    }

    if (!["sms", "whatsapp"].includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid type. Use 'sms' or 'whatsapp'" },
        { status: 400 }
      );
    }

    let result;
    if (type === "sms") {
      result = await sendSMS(phone, message);
    } else {
      result = await sendWhatsApp(phone, message);
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        type,
        phone,
        sid: result.sid,
        message: "Message sent successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[test-twilio]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
