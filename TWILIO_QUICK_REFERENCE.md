# Twilio Integration - Quick Reference

## 📦 Available Functions

### Core Twilio Functions (`lib/twilio.js`)

```javascript
import { sendSMS, sendWhatsApp } from "@/lib/twilio";

// Send SMS
const result = await sendSMS("+60123456789", "Hello!");
// Returns: { success: true, sid: "SMxxxxx" }

// Send WhatsApp
const result = await sendWhatsApp("+60123456789", "Hello!");
// Returns: { success: true, sid: "SMxxxxx" }
```

### Appointment Notification Functions (`lib/email-templates.js`)

```javascript
import {
  sendCustomerSMS,
  sendCustomerWhatsApp,
  sendAdminSMS,
  sendAdminWhatsApp,
  sendReminderSMS,
} from "@/lib/email-templates";

// Send all to customer
await sendCustomerSMS(appointmentData);
await sendCustomerWhatsApp(appointmentData);

// Send all to admin
await sendAdminSMS(appointmentData);
await sendAdminWhatsApp(appointmentData);

// Send reminder
await sendReminderSMS(appointmentData);
```

---

## 🔑 Required Environment Variables

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+60123456789
TWILIO_WHATSAPP_FROM=whatsapp:+60123456789
ADMIN_PHONE=+60123456789
ADMIN_WHATSAPP=+60123456789
```

---

## 🧪 Test Endpoint

**POST** `/api/test-twilio`

Headers:
```
x-admin-token: your_admin_password
Content-Type: application/json
```

Body:
```json
{
  "type": "sms",  // or "whatsapp"
  "phone": "+60123456789",
  "message": "Test message"
}
```

Response:
```json
{
  "success": true,
  "sid": "SMxxxxx"
}
```

---

## 📱 Phone Number Format

✅ Correct: `+60123456789`
✅ Correct: `+1234567890`

❌ Wrong: `60123456789` (missing +)
❌ Wrong: `+6 0123456789` (space)
❌ Wrong: `whatsapp:+60123456789` (for SMS)

**WhatsApp Format:** Use `whatsapp:+60123456789` prefix only in `TWILIO_WHATSAPP_FROM`

---

## 📊 Appointment Object Structure

```javascript
{
  id: "appointment_id",
  customerName: "John Doe",
  customerPhone: "+60123456789",
  customerEmail: "john@example.com",
  service: "Window Tint",
  package: "Premium",
  date: "2025-04-15",
  timeSlot: "10:00 AM - 12:00 PM",
  carModel: "Toyota Camry",
  carPlate: "ABC123",
  message: "Customer notes",
  totalPaid: 500,
  branch: "KL Branch"
}
```

---

## 🔄 Automatic Notifications (On Appointment Creation)

When `/api/appointments` is called, automatically sends:

**To Customer:**
- ✉️ Email (HTML template)
- 📱 SMS (date, time, total)
- 💬 WhatsApp (formatted with emoji)

**To Admin:**
- ✉️ Email (HTML template)
- 📱 SMS (alert summary)
- 💬 WhatsApp (detailed info)

All sent in parallel with error tracking.

---

## 📋 Message Templates

### Customer SMS
```
Hi {name}, your appointment with KL Tint Studio is confirmed on {date} at {time}. Total: RM{price}. Thank you!
```

### Customer WhatsApp
```
Hi {name}! 🎉

Your appointment with KL Tint Studio is confirmed!

📅 Date: {date}
⏰ Time: {time}
🚗 Service: {service}
💰 Total: RM{price}

Thank you for booking with us! See you soon.
```

### Admin SMS
```
New Booking Alert! 📌
{name} - {service} ({package})
Date: {date} at {time}
Total: RM{price}
Phone: {phone}
```

### Appointment Reminder SMS
```
Reminder: Your appointment with KL Tint Studio is tomorrow at {time}. Please arrive 10 minutes early. {website}
```

---

## ⚠️ Error Handling

```javascript
const result = await sendSMS("+60123456789", "Hello");

if (result.success) {
  console.log("Sent with SID:", result.sid);
} else {
  console.error("Failed:", result.error);
}

// Possible errors:
// - "Twilio credentials not configured"
// - "Twilio phone number not configured"
// - "Missing phone number or message"
// - "[Twilio API error details]"
```

---

## 📝 Logging

All functions log to console:

```
[sendSMS] Sent successfully { to: "+60123456789", sid: "SMxxxxx", status: "queued" }
[sendSMS] Failed to send { to: "+60123456789", error: "..." }
[sendWhatsApp] Sent successfully { ... }
[sendCustomerSMS] No customer phone number
```

In production, use your logging service to capture these.

---

## 💡 Usage Examples

### Send Test SMS
```javascript
import { sendSMS } from "@/lib/twilio";

const result = await sendSMS(
  "+60123456789",
  "Hello! This is a test SMS from Twilio."
);
console.log(result);
```

### Send Test WhatsApp
```javascript
import { sendWhatsApp } from "@/lib/twilio";

const result = await sendWhatsApp(
  "+60123456789",
  "Hello! This is a test WhatsApp from Twilio."
);
console.log(result);
```

### Send Appointment Confirmation
```javascript
import { sendCustomerSMS, sendCustomerWhatsApp } from "@/lib/email-templates";

const appointment = {
  customerName: "Ahmed",
  customerPhone: "+60123456789",
  date: "2025-04-15",
  timeSlot: "10:00 AM",
  service: "Ceramic Coating",
  totalPaid: 1500,
};

await sendCustomerSMS(appointment);
await sendCustomerWhatsApp(appointment);
```

---

## 🔗 Links

- [Twilio Console](https://www.twilio.com/console)
- [Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming)
- [WhatsApp Setup](https://www.twilio.com/console/sms/whatsapp/learn)
- [Message Logs](https://www.twilio.com/console/sms/logs)

---

## ✅ Checklist for Setup

- [ ] Sign up on Twilio.com
- [ ] Get Account SID and Auth Token
- [ ] Buy or claim a phone number
- [ ] Set up WhatsApp (optional)
- [ ] Add all env variables to `.env.local`
- [ ] Test with `/api/test-twilio`
- [ ] Create a test appointment
- [ ] Verify messages received on phone

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Messages not sending | Check env vars, account credit, phone format |
| "Unauthorized" on test | Verify `x-admin-token` header |
| WhatsApp not working | Join sandbox again or set up Business Account |
| No notifications | Ensure phone numbers have + prefix |
| Timeout errors | Check internet, Twilio API status |

---

Last Updated: March 2025
