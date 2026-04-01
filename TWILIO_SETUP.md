# Twilio Integration Setup Guide

## Overview
Twilio enables SMS and WhatsApp notifications for appointment confirmations, reminders, and admin alerts.

---

## Step 1: Create Twilio Account

1. Go to [Twilio.com](https://www.twilio.com/try-twilio)
2. Sign up with your email
3. Verify your email
4. Verify your phone number (used to test the account)

---

## Step 2: Get Account Credentials

1. Go to [Twilio Console](https://www.twilio.com/console)
2. Copy your **Account SID** and **Auth Token**
3. Add them to `.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
```

⚠️ **IMPORTANT:** Keep your Auth Token secret! Never commit to version control.

---

## Step 3: Get a Phone Number for SMS

1. Go to [Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming)
2. Click **Buy a Number** or use a Trial Number
3. Choose a number in Malaysia (if available) or your preferred region
4. Once purchased, copy the number
5. Add to `.env.local`:

```env
TWILIO_PHONE_NUMBER=+60123456789
```

---

## Step 4: Set Up WhatsApp (Optional but Recommended)

### For Development/Testing (WhatsApp Sandbox):

1. Go to [WhatsApp Sandbox](https://www.twilio.com/console/sms/whatsapp/learn)
2. Follow the setup wizard
3. Send a message to the provided WhatsApp number with code: `join <code>`
4. Copy your sandbox WhatsApp number (e.g., `whatsapp:+14155238886`)
5. Add to `.env.local`:

```env
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

### For Production (WhatsApp Business Account):

1. Apply for WhatsApp Business Account through Twilio
2. This requires approval and verification
3. Once approved, you'll get a dedicated WhatsApp number
4. Add to `.env.local`:

```env
TWILIO_WHATSAPP_FROM=whatsapp:+60123456789
```

---

## Step 5: Configure Admin Notifications

Add your admin contact details:

```env
ADMIN_PHONE=+60123456789
ADMIN_WHATSAPP=+60123456789
```

---

## Step 6: Test the Integration

### Test SMS:

```bash
curl -X POST http://localhost:3000/api/test-twilio \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sms",
    "phone": "+60123456789",
    "message": "Test SMS from Twilio"
  }'
```

### Test WhatsApp:

```bash
curl -X POST http://localhost:3000/api/test-twilio \
  -H "Content-Type: application/json" \
  -d '{
    "type": "whatsapp",
    "phone": "+60123456789",
    "message": "Test WhatsApp from Twilio"
  }'
```

---

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| `TWILIO_ACCOUNT_SID` | Your Twilio account ID | `ACxxxxxxxx...` |
| `TWILIO_AUTH_TOKEN` | Your Twilio auth token | `your_token...` |
| `TWILIO_PHONE_NUMBER` | SMS phone number | `+60123456789` |
| `TWILIO_WHATSAPP_FROM` | WhatsApp number with prefix | `whatsapp:+60123456789` |
| `ADMIN_PHONE` | Admin SMS phone | `+60123456789` |
| `ADMIN_WHATSAPP` | Admin WhatsApp | `+60123456789` |

---

## Pricing

**SMS:**
- Sending: $0.0075/msg (Malaysia)
- Receiving: $0.0075/msg

**WhatsApp:**
- Outbound: $0.0627/msg (customer-initiated) or $0.1181/msg (business-initiated)
- Inbound: Free

**Free Trial:** $15 credit for testing

---

## Available Notification Types

### 1. Customer Appointment Confirmation
- **SMS:** Brief confirmation with date, time, and total
- **WhatsApp:** Formatted message with all details and emoji

### 2. Admin New Booking Alert
- **SMS:** Quick alert with customer name, service, and total
- **WhatsApp:** Detailed alert including car model and customer message

### 3. Appointment Reminder (24 hours before)
- **SMS:** Reminder with time and note to arrive early

---

## Troubleshooting

### Issue: "Twilio credentials not configured"
- **Solution:** Check that all required env variables are set
- Verify credentials in Twilio Console

### Issue: "Invalid phone number"
- **Solution:** Ensure phone number format is correct: `+country_code + number`
- Example: `+60123456789` (Malaysia), `+1234567890` (USA)

### Issue: WhatsApp sandbox expired
- **Solution:** Re-join the sandbox by sending the code to the Twilio WhatsApp number

### Issue: SMS not delivered
- **Solution:** 
  - Check phone number is correct
  - Verify account has credit
  - Check Twilio logs in console

---

## Code Integration

Files updated:
- `lib/twilio.js` - Twilio SMS/WhatsApp functions
- `lib/email-templates.js` - Added SMS/WhatsApp notification functions
- `app/api/appointments/route.js` - Integrated notifications into appointment creation

Functions available:
- `sendSMS(phoneNumber, message)` - Send SMS
- `sendWhatsApp(phoneNumber, message)` - Send WhatsApp
- `sendCustomerSMS(appointment)` - Customer confirmation SMS
- `sendCustomerWhatsApp(appointment)` - Customer confirmation WhatsApp
- `sendAdminSMS(appointment)` - Admin alert SMS
- `sendAdminWhatsApp(appointment)` - Admin alert WhatsApp
- `sendReminderSMS(appointment)` - Appointment reminder SMS

---

## Next Steps

1. Sign up for Twilio
2. Get credentials and phone numbers
3. Add to `.env.local`
4. Test with curl or appointment booking
5. Monitor Twilio console for message status

For support: [Twilio Support](https://support.twilio.com/)
