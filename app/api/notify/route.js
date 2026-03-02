import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_1234567890abcdef"); // Placeholder to prevent errors if env var is missing

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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

    // Basic server-side validation
    if (!type || !data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { subject, text } = buildMessages(type, data);

    const hasResend = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("your_");

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

    const [emailResult, smsResult, waResult] = await Promise.allSettled([
      // Email via Resend (optional — never blocks success)
      hasResend
        ? resend.emails.send({
            from: "KL Tint Studio <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject,
            text,
          })
        : Promise.resolve("email_skipped"),
      // SMS via Twilio
      twilioClient.messages.create({
        body: text,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE,
      }),

      // WhatsApp via Twilio
      twilioClient.messages.create({
        body: text,
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${process.env.ADMIN_WHATSAPP}`,
      }),
    ]);

    if (emailResult.status === "rejected") {
      console.error("[notify] Email failed:", emailResult.reason?.message);
    }
    if (smsResult.status === "rejected") {
      console.error("[notify] SMS failed:", smsResult.reason?.message, "| code:", smsResult.reason?.code);
    }
    if (waResult.status === "rejected") {
      console.error("[notify] WhatsApp failed:", waResult.reason?.message, "| code:", waResult.reason?.code);
    }

    // Only SMS + WhatsApp count — email is optional
    const allFailed = smsResult.status === "rejected" && waResult.status === "rejected";
    if (allFailed) {
      return NextResponse.json(
        {
          success: false,
          error: "All notifications failed",
          details: {
            email: emailResult.reason?.message,
            sms: smsResult.reason?.message,
            whatsapp: waResult.reason?.message,
          },
        },
        { status: 500 }
      );
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
