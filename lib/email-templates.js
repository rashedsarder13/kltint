import { Resend } from "resend";
import { getBranchByName } from "@/lib/branches";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyTemplate(template, vars) {
  return Object.entries(vars).reduce((acc, [key, value]) => {
    const safeValue = esc(value);
    return acc.split(`{{${key}}}`).join(safeValue);
  }, template);
}

const appointmentTemplate = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Confirmation</title>
</head>
<body style="margin:0; padding:0; background:#eef1f6; font-family:Arial, Helvetica, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" align="center" style="padding:20px 10px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; background:#0f172a; border-radius:16px; overflow:hidden; box-shadow:0 10px 35px rgba(0,0,0,0.15);">
<tr><td style="background:#1e3a8a; padding:22px 24px;"><img src="{{logo_url}}" alt="KL Tint Studio" style="height:42px; display:block;"></td></tr>
<tr><td style="padding:28px;">
<p style="color:#e5e7eb; font-size:15px; margin:0 0 14px;">Dear <strong style="color:#ffffff;">{{customer_name}}</strong>,</p>
<p style="color:#9ca3af; font-size:14px; line-height:1.7; margin:0 0 22px;">Your appointment has been successfully scheduled with <strong style="color:#ffffff;">KL Tint Studio</strong>. Please find your booking details below.</p>
<h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">Appointment Details</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr><td style="padding:9px 0; color:#9ca3af;">Service</td><td align="right" style="padding:9px 0; color:#ffffff;">{{service}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Package</td><td align="right" style="padding:9px 0; color:#ffffff;">{{package}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Date</td><td align="right" style="padding:9px 0; color:#ffffff;">{{date}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Time</td><td align="right" style="padding:9px 0; color:#ffffff;">{{time}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Branch</td><td align="right" style="padding:9px 0; color:#ffffff;">{{branch}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Estimated Price</td><td align="right" style="padding:9px 0; color:#fbbf24; font-weight:700;">RM {{price}}</td></tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr>
<td align="center" style="padding:8px;"><a href="{{google_map_link}}" style="background:#1f2937; color:#ffffff; padding:12px 18px; border-radius:8px; font-size:13px; text-decoration:none; display:inline-block;">View Branch Location</a></td>
<td align="center" style="padding:8px;"><a href="{{calendar_link}}" style="background:#f59e0b; color:#111827; padding:12px 18px; border-radius:8px; font-size:13px; text-decoration:none; font-weight:700; display:inline-block;">Add to Calendar</a></td>
</tr></table>
</td></tr>
<tr><td style="padding:0 28px;"><hr style="border:none; border-top:1px solid #1f2937;"></td></tr>
<tr><td style="padding:24px 28px;"><h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">Vehicle Details</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr><td style="padding:9px 0; color:#9ca3af;">Car Model</td><td align="right" style="padding:9px 0; color:#ffffff;">{{car_model}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Plate Number</td><td align="right" style="padding:9px 0; color:#ffffff;">{{plate_number}}</td></tr>
</table></td></tr>
<tr><td style="padding:0 28px;"><hr style="border:none; border-top:1px solid #1f2937;"></td></tr>
<tr><td style="padding:24px 28px;"><h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">Customer Information</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr><td style="padding:9px 0; color:#9ca3af;">Full Name</td><td align="right" style="padding:9px 0; color:#ffffff;">{{customer_name}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Email</td><td align="right" style="padding:9px 0; color:#ffffff;">{{customer_email}}</td></tr>
<tr><td style="padding:9px 0; color:#9ca3af;">Phone</td><td align="right" style="padding:9px 0; color:#ffffff;">{{customer_phone}}</td></tr>
</table></td></tr>
<tr><td style="background:#0b1220; padding:22px; text-align:center;"><p style="color:#6b7280; font-size:12px; margin:0 0 6px;">KL Tint Studio © {{year}}</p><p style="color:#6b7280; font-size:12px; margin:0;">{{branch_address}}</p></td></tr>
</table></td></tr></table>
</body>
</html>`;

const adminTemplate = `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" align="center" style="padding:20px;"><tr><td align="center">
<table width="100%" style="max-width:620px; background:#111827; border-radius:12px; overflow:hidden;">
<tr><td style="background:#7c3aed; padding:18px 22px; color:#fff; font-size:16px; font-weight:bold;">New Appointment Booked</td></tr>
<tr><td style="padding:22px; color:#e5e7eb; font-size:14px;">
<p style="margin-top:0;">A new customer appointment has been scheduled.</p>
<table width="100%" cellpadding="6" cellspacing="0">
<tr><td style="color:#9ca3af;">Customer</td><td align="right">{{customer_name}}</td></tr>
<tr><td style="color:#9ca3af;">Phone</td><td align="right">{{customer_phone}}</td></tr>
<tr><td style="color:#9ca3af;">Service</td><td align="right">{{service}}</td></tr>
<tr><td style="color:#9ca3af;">Package</td><td align="right">{{package}}</td></tr>
<tr><td style="color:#9ca3af;">Date</td><td align="right">{{date}}</td></tr>
<tr><td style="color:#9ca3af;">Time</td><td align="right">{{time}}</td></tr>
<tr><td style="color:#9ca3af;">Branch</td><td align="right">{{branch}}</td></tr>
<tr><td style="color:#9ca3af;">Car Model</td><td align="right">{{car_model}}</td></tr>
<tr><td style="color:#9ca3af;">Plate No</td><td align="right">{{plate_number}}</td></tr>
<tr><td style="color:#9ca3af;">Price</td><td align="right" style="color:#fbbf24; font-weight:bold;">RM {{price}}</td></tr>
</table>
</td></tr></table>
</td></tr></table>
</body>
</html>`;

const reminderTemplate = `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#eef2ff; font-family:Arial, sans-serif;">
<table width="100%" align="center" cellpadding="0" cellspacing="0" style="padding:20px;"><tr><td align="center">
<table width="100%" style="max-width:620px; background:#0f172a; border-radius:14px; overflow:hidden;">
<tr><td style="background:#1e40af; padding:20px; color:white; font-weight:bold;">Appointment Reminder</td></tr>
<tr><td style="padding:24px; color:#e5e7eb; font-size:14px;">
<p>Hi <strong>{{customer_name}}</strong>,</p>
<p>This is a friendly reminder of your upcoming appointment with KL Tint Studio.</p>
<table width="100%" cellpadding="6">
<tr><td style="color:#9ca3af;">Service</td><td align="right">{{service}}</td></tr>
<tr><td style="color:#9ca3af;">Date</td><td align="right">{{date}}</td></tr>
<tr><td style="color:#9ca3af;">Time</td><td align="right">{{time}}</td></tr>
<tr><td style="color:#9ca3af;">Branch</td><td align="right">{{branch}}</td></tr>
</table>
<p style="margin-top:20px;">Please arrive 10 minutes earlier for a smoother service experience.</p>
<div style="text-align:center; margin-top:20px;"><a href="{{google_map_link}}" style="background:#2563eb; color:white; padding:12px 20px; border-radius:8px; text-decoration:none;">Get Directions</a></div>
</td></tr></table>
</td></tr></table>
</body>
</html>`;

function buildTemplateVars(appointment) {
  const branch = getBranchByName(appointment.branch);
  return {
    logo_url: process.env.NEXT_PUBLIC_EMAIL_LOGO_URL || "https://kltintstudio.com/logo-white-new-1.png",
    customer_name: appointment.customerName,
    customer_email: appointment.customerEmail,
    customer_phone: appointment.customerPhone,
    service: appointment.service,
    package: appointment.package,
    date: appointment.date,
    time: appointment.timeSlot,
    branch: appointment.branch,
    car_model: appointment.carModel || "-",
    plate_number: appointment.carPlate || "-",
    price: Number(appointment.totalPaid || appointment.price || 0).toFixed(2),
    google_map_link: branch?.googleMapLink || "https://maps.google.com",
    calendar_link: appointment.calendarLink || "#",
    year: new Date().getFullYear(),
    branch_address: branch?.address || "",
  };
}

export async function sendCustomerEmail(appointment) {
  if (!process.env.RESEND_API_KEY || !appointment?.customerEmail) return;
  const html = applyTemplate(appointmentTemplate, buildTemplateVars(appointment));
  return resend.emails.send({
    from: process.env.RESEND_FROM || "KL Tint Studio <onboarding@resend.dev>",
    to: appointment.customerEmail,
    subject: "Appointment Confirmation - KL Tint Studio",
    html,
  });
}

export async function sendAdminEmail(appointment) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return;
  const html = applyTemplate(adminTemplate, buildTemplateVars(appointment));
  return resend.emails.send({
    from: process.env.RESEND_FROM || "KL Tint Studio <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: `New Appointment Booked - ${appointment.customerName}`,
    html,
  });
}

export async function sendReminderEmail(appointment) {
  if (!process.env.RESEND_API_KEY || !appointment?.customerEmail) return;
  const html = applyTemplate(reminderTemplate, buildTemplateVars(appointment));
  return resend.emails.send({
    from: process.env.RESEND_FROM || "KL Tint Studio <onboarding@resend.dev>",
    to: appointment.customerEmail,
    subject: "Appointment Reminder - KL Tint Studio",
    html,
  });
}
