import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

function buildMessages(type, data) {
  if (type === "contact") {
    const subject = `New Contact Inquiry - KL Tint Studio`;
    const text = `New Contact Inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nService: ${data.service || "N/A"}\nMessage: ${data.message || "N/A"}`;
    return { subject, text };
  }

  if (type === "booking") {
    const subject = `New Booking Confirmed - KL Tint Studio`;
    const text = `New Booking Confirmed\n\nPackage: ${data.package}\nPrice: RM ${data.price}\n\nCustomer Details:\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile}\nCar Model: ${data.carModel || "N/A"}\nCar Plate: ${data.carPlate || "N/A"}\n\nBooking Details:\nLocation: ${data.location || "N/A"}\nDate: ${data.date || "N/A"}\nTime: ${data.time || "N/A"}\nMessage: ${data.message || "N/A"}`;
    return { subject, text };
  }

  if (type === "career") {
    const subject = `New Job Application - KL Tint Studio`;
    const text = `New Job Application\n\nPosition: ${data.job || "N/A"}\nName: ${data.name}\nEmail: ${data.email}\nMobile: ${data.mobile || "N/A"}\nMessage: ${data.message || "N/A"}`;
    return { subject, text };
  }

  if (type === "subscribe") {
    const subject = `New Newsletter Subscriber - KL Tint Studio`;
    const text = `New Newsletter Subscriber\n\nEmail: ${data.email}`;
    return { subject, text };
  }

  return { subject: "New Notification - KL Tint Studio", text: JSON.stringify(data) };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Type-specific server-side validation
    if (!type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "subscribe" && !data.email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (type === "booking" && (!data.name || !data.email || !data.mobile)) {
      return NextResponse.json(
        { success: false, error: "Name, email and mobile are required" },
        { status: 400 }
      );
    }

    if (type === "contact" && (!data.name || !data.email || !data.mobile)) {
      return NextResponse.json(
        { success: false, error: "Name, email and mobile are required" },
        { status: 400 }
      );
    }

    if (type === "career" && (!data.name || !data.email)) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { subject, text } = buildMessages(type, data);

    const hasResend = Boolean(process.env.RESEND_API_KEY);

    // For subscribe: send confirmation to subscriber + notify admin via email only (no SMS/WhatsApp)
    if (type === "subscribe") {
      if (hasResend) {
        await Promise.allSettled([
          // Notify admin
          resend.emails.send({
            from: "KL Tint Studio <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject,
            text,
          }),
          // Confirmation to subscriber
          resend.emails.send({
            from: "KL Tint Studio <onboarding@resend.dev>",
            to: data.email,
            subject: "You're subscribed to KL Tint Studio!",
            text: `Hi there!\n\nThank you for subscribing to KL Tint Studio news & offers.\n\nWe'll keep you updated with the latest promotions and news.\n\nBest regards,\nKL Tint Studio Team`,
          }),
        ]);
      }
      return NextResponse.json({ success: true });
    }

    const [emailResult] = await Promise.allSettled([
      hasResend
        ? resend.emails.send({
            from: process.env.RESEND_FROM || "KL Tint Studio <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject,
            text,
          })
        : Promise.resolve("email_skipped"),
      // Twilio SMS/WhatsApp will be re-enabled later.
      // twilioClient.messages.create({
      //   body: text,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: process.env.ADMIN_PHONE,
      // }),
      // twilioClient.messages.create({
      //   body: text,
      //   from: process.env.TWILIO_WHATSAPP_FROM,
      //   to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
      // }),
    ]);

    if (emailResult.status === "rejected") {
      console.error("[notify] Email failed:", emailResult.reason?.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
