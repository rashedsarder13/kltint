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
            from: process.env.RESEND_FROM || "KL Tint Studio <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject,
            text,
          }),
          // Confirmation to subscriber
          resend.emails.send({
            from: process.env.RESEND_FROM || "KL Tint Studio <noreply@kltintstudio.com>",
            to: data.email,
            subject: "You're subscribed to KL Tint Studio!",
            text: `Hi there!\n\nThank you for subscribing to KL Tint Studio news & offers.\n\nWe'll keep you updated with the latest promotions and news.\n\nBest regards,\nKL Tint Studio Team`,
          }),
        ]);
      }
      return NextResponse.json({ success: true });
    }

    // For other types: send admin notification + customer confirmation
    if (hasResend) {
      const customerConfirmationTexts = {
        booking: `Hi ${data.name}!\n\nThank you for booking with KL Tint Studio!\n\nBooking Details:\nPackage: ${data.package}\nPrice: RM ${data.price}\nLocation: ${data.location || "N/A"}\nDate: ${data.date || "N/A"}\nTime: ${data.time || "N/A"}\n\nWe'll contact you soon to confirm your appointment.\n\nBest regards,\nKL Tint Studio Team`,
        contact: `Hi ${data.name}!\n\nThank you for reaching out to KL Tint Studio!\n\nWe have received your inquiry and will get back to you as soon as possible.\n\nBest regards,\nKL Tint Studio Team`,
        career: `Hi ${data.name}!\n\nThank you for applying to KL Tint Studio!\n\nWe have received your application for the ${data.job || "position"} and will review it shortly.\n\nBest regards,\nKL Tint Studio Team`,
      };

      const customerSubjects = {
        booking: "Your Booking Confirmation - KL Tint Studio",
        contact: "We Received Your Inquiry - KL Tint Studio",
        career: "Application Received - KL Tint Studio",
      };

      await Promise.allSettled([
        // Notify admin
        resend.emails.send({
          from: process.env.RESEND_FROM || "KL Tint Studio <noreply@kltintstudio.com>",
          to: process.env.ADMIN_EMAIL,
          subject,
          text,
        }),
        // Confirmation to customer
        resend.emails.send({
          from: process.env.RESEND_FROM || "KL Tint Studio <noreply@kltintstudio.com>",
          to: data.email,
          subject: customerSubjects[type] || "Confirmation - KL Tint Studio",
          text: customerConfirmationTexts[type] || `Thank you for contacting KL Tint Studio!`,
        }),
      ]);
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
