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

const RAW_TEMPLATE_KEYS = new Set(["promo_rows_customer", "promo_rows_admin"]);

function applyTemplate(template, vars) {
  return Object.entries(vars).reduce((acc, [key, value]) => {
    const safeValue = RAW_TEMPLATE_KEYS.has(key) ? String(value ?? "") : esc(value);
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
<body style="margin:0; padding:0; background:#f3f5f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 10px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
<tr>
<td style="padding:22px 24px; background:linear-gradient(135deg, #0f172a, #1f2937);">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="left">
<img src="{{logo_url}}" alt="KL Tint Studio" style="height:42px; display:block;">
</td>
<td align="right" style="color:#d1d5db; font-size:12px; letter-spacing:0.3px;">
APPOINTMENT CONFIRMATION
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 24px 18px 24px;">
<h1 style="margin:0 0 8px 0; font-size:22px; color:#111827;">Booking Confirmed</h1>
<p style="margin:0 0 16px 0; font-size:14px; color:#4b5563; line-height:1.6;">
Hi {{customer_name}}, your appointment with KL Tint Studio has been successfully scheduled.
</p>
</td>
</tr>

<tr>
<td style="padding:0 24px 18px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
<tr>
<td colspan="2" style="padding:12px 14px; background:#f9fafb; font-size:13px; font-weight:700; color:#111827; letter-spacing:0.2px;">APPOINTMENT DETAILS</td>
</tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Service</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px; font-weight:600;">{{service}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Package</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px; font-weight:600;">{{package}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Date</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px; font-weight:600;">{{date}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Time</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px; font-weight:600;">{{time}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Branch</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px; font-weight:600;">{{branch}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Subtotal</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px;">RM {{subtotal}}</td></tr>
{{promo_rows_customer}}
<tr><td style="padding:12px 14px; border-top:1px solid #e5e7eb; color:#111827; font-size:14px; font-weight:700;">Total Paid</td><td align="right" style="padding:12px 14px; border-top:1px solid #e5e7eb; color:#b45309; font-size:14px; font-weight:700;">RM {{total_paid}}</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:0 24px 18px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
<tr>
<td colspan="2" style="padding:12px 14px; background:#f9fafb; font-size:13px; font-weight:700; color:#111827; letter-spacing:0.2px;">VEHICLE & CONTACT</td>
</tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Car Model</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px;">{{car_model}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Plate Number</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px;">{{plate_number}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Email</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px;">{{customer_email}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Phone</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#111827; font-size:13px;">{{customer_phone}}</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:0 24px 22px 24px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right:6px;">
<a href="{{google_map_link}}" style="display:block; text-align:center; background:#111827; color:#ffffff; text-decoration:none; font-size:13px; font-weight:600; padding:12px 10px; border-radius:8px;">View Branch Location</a>
</td>
<td style="padding-left:6px;">
<a href="{{calendar_link}}" style="display:block; text-align:center; background:#d97706; color:#ffffff; text-decoration:none; font-size:13px; font-weight:600; padding:12px 10px; border-radius:8px;">Add To Calendar</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:16px 24px; background:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">
<p style="margin:0 0 4px 0; color:#6b7280; font-size:12px;">KL Tint Studio © {{year}}</p>
<p style="margin:0; color:#6b7280; font-size:12px;">{{branch_address}}</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

const adminTemplate = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Appointment</title>
</head>
<body style="margin:0; padding:0; background:#f3f5f8; font-family:Arial, Helvetica, sans-serif; color:#111827;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 10px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
<tr>
<td style="padding:20px 24px; background:linear-gradient(135deg, #1f2937, #111827);">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<img src="{{logo_url}}" alt="KL Tint Studio" style="height:40px; display:block;">
</td>
<td align="right" style="color:#d1d5db; font-size:12px; letter-spacing:0.3px;">ADMIN NOTIFICATION</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px;">
<h1 style="margin:0 0 8px 0; font-size:20px; color:#111827;">New Appointment Booked</h1>
<p style="margin:0 0 16px 0; font-size:14px; color:#4b5563; line-height:1.6;">A new customer appointment has been created. Details are listed below.</p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
<tr>
<td colspan="2" style="padding:12px 14px; background:#f9fafb; font-size:13px; font-weight:700; color:#111827; letter-spacing:0.2px;">BOOKING SUMMARY</td>
</tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Customer</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px; font-weight:600;">{{customer_name}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Phone</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{customer_phone}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Service</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{service}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Package</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{package}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Date</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{date}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Time</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{time}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Branch</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{branch}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Car Model</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{car_model}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Plate Number</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{plate_number}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Subtotal</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">RM {{subtotal}}</td></tr>
{{promo_rows_admin}}
<tr><td style="padding:12px 14px; border-top:1px solid #e5e7eb; color:#111827; font-size:14px; font-weight:700;">Total Paid</td><td align="right" style="padding:12px 14px; border-top:1px solid #e5e7eb; color:#b45309; font-size:14px; font-weight:700;">RM {{total_paid}}</td></tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

const reminderTemplate = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Reminder</title>
</head>
<body style="margin:0; padding:0; background:#f3f5f8; font-family:Arial, Helvetica, sans-serif; color:#111827;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 10px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
<tr>
<td style="padding:20px 24px; background:linear-gradient(135deg, #0f172a, #1d4ed8);">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td>
<img src="{{logo_url}}" alt="KL Tint Studio" style="height:40px; display:block;">
</td>
<td align="right" style="color:#dbeafe; font-size:12px; letter-spacing:0.3px;">APPOINTMENT REMINDER</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px;">
<h1 style="margin:0 0 8px 0; font-size:20px; color:#111827;">Your Appointment Is Coming Up</h1>
<p style="margin:0 0 16px 0; font-size:14px; color:#4b5563; line-height:1.6;">Hi {{customer_name}}, this is a reminder for your upcoming appointment with KL Tint Studio.</p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
<tr>
<td colspan="2" style="padding:12px 14px; background:#f9fafb; font-size:13px; font-weight:700; color:#111827; letter-spacing:0.2px;">REMINDER DETAILS</td>
</tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Service</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{service}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Date</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{date}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Time</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{time}}</td></tr>
<tr><td style="padding:10px 14px; border-top:1px solid #f1f5f9; color:#6b7280; font-size:13px;">Branch</td><td align="right" style="padding:10px 14px; border-top:1px solid #f1f5f9; font-size:13px;">{{branch}}</td></tr>
</table>

<p style="margin:16px 0 18px 0; font-size:13px; color:#6b7280;">Please arrive at least 10 minutes early for a smoother check-in.</p>
<a href="{{google_map_link}}" style="display:inline-block; background:#1d4ed8; color:#ffffff; text-decoration:none; font-size:13px; font-weight:600; padding:12px 16px; border-radius:8px;">Get Directions</a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;

function buildTemplateVars(appointment) {
  const branch = getBranchByName(appointment.branch);
  const appliedDiscount = Number(appointment.discount || 0);
  const hasAppliedPromo = Boolean(appointment.promoCode) && appliedDiscount > 0;

  const promoRowsCustomer = hasAppliedPromo
    ? `<tr><td style="padding:9px 0; color:#9ca3af;">Promo Code</td><td align="right" style="padding:9px 0; color:#ffffff;">${esc(appointment.promoCode)}</td></tr><tr><td style="padding:9px 0; color:#9ca3af;">Discount</td><td align="right" style="padding:9px 0; color:#ffffff;">RM ${appliedDiscount.toFixed(2)}</td></tr>`
    : "";

  const promoRowsAdmin = hasAppliedPromo
    ? `<tr><td style="color:#9ca3af;">Promo Code</td><td align="right">${esc(appointment.promoCode)}</td></tr><tr><td style="color:#9ca3af;">Discount</td><td align="right">RM ${appliedDiscount.toFixed(2)}</td></tr>`
    : "";

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
    subtotal: Number(appointment.price || appointment.totalPaid || 0).toFixed(2),
    promo_rows_customer: promoRowsCustomer,
    promo_rows_admin: promoRowsAdmin,
    total_paid: Number(appointment.totalPaid || appointment.price || 0).toFixed(2),
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
