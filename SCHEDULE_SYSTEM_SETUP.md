# Schedule System Setup Guide - Firebase Appointment Reminders

## ✅ What Has Been Activated

The appointment reminder scheduler is now **ACTIVE**. The system will:
- Check every 10 minutes for appointments happening within 30 minutes
- Send automated reminder emails to customers
- Mark reminders as sent to avoid duplicates
- Use Firestore queries to find eligibile appointments

### Files Activated
- ✅ `app/api/cron/reminders/route.js` — Full reminder implementation (was disabled)
- ✅ `functions/index.js` — Firebase Cloud Function scheduler
- ✅ `lib/firebase-admin.js` — Firebase Admin SDK
- ✅ `.env.local` — Environment variables configured

---

## 📋 Prerequisites - Already Completed

Your environment already has:
- ✅ `firebase-admin` package installed (v13.7.0)
- ✅ `firebase-functions` package installed (v6.4.0)
- ✅ Firebase credentials in `.env.local`
- ✅ `CRON_SECRET` environment variable
- ✅ `ADMIN_EMAIL` configured
- ✅ `RESEND_API_KEY` for sending emails

---

## 🚀 Steps to Activate on Firebase

### Step 1: Set Firebase Project Secrets (Before First Deploy)

The `Runtime secrets` option only appears after the first deployment. Set secrets using the CLI first:

```bash
firebase secrets:set CRON_SECRET
# Paste: 0Shf+I3uS9iEl2VqkAobRd/Pi4l5V5dx+U2IFpG/zLc=
# Press Enter twice after pasting

firebase secrets:set REMINDER_BASE_URL
# Paste: https://kltint.vercel.app
# Press Enter twice after pasting
```

**Verify secrets are set:**
```bash
firebase secrets:list
```

### Step 2: Deploy Firebase Cloud Function

Navigate to your Firebase functions directory and deploy:

```bash
cd functions
firebase deploy --only functions:sendAppointmentReminders
```

**Expected Output:**
```
✔  Deploy complete!

Function URL (sendAppointmentReminders): https://asia-southeast1-kl-tint-studio.cloudfunctions.net/sendAppointmentReminders
```

### Step 3: Verify Secrets in Firebase Console

Once deployed, you can view/manage the secrets:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `kl-tint-studio`
3. Navigate to **Functions** → **Runtime secrets** (now available)
4. You should see:
   - `CRON_SECRET` ✅
   - `REMINDER_BASE_URL` ✅

### Step 4: Update REMINDER_BASE_URL After Vercel Deployment

Once your Next.js app is deployed to Vercel:

```bash
firebase secrets:set REMINDER_BASE_URL
# Paste: https://your-vercel-deployment-url.vercel.app
# Press Enter twice after pasting

# Redeploy function with updated secret
firebase deploy --only functions:sendAppointmentReminders
```

---

## 🧪 Test the Schedule System Locally

### Without Firebase Scheduler (Quick Test)

```bash
# Test the reminder endpoint directly
curl -X GET "http://localhost:3000/api/cron/reminders" \
  -H "Authorization: Bearer 0Shf+I3uS9iEl2VqkAobRd/Pi4l5V5dx+U2IFpG/zLc="
```

Expected Response:
```json
{
  "success": true,
  "remindersSent": 0
}
```

### With Firebase Local Emulator

```bash
# Start Firebase emulator
firebase emulators:start --only functions

# In another terminal, deploy locally
firebase deploy --only functions:sendAppointmentReminders
```

---

## 🔧 Environment Variables Checklist

All required variables are already in `.env.local`:

```env
# ✅ REQUIRED - Firebase Admin SDK
FIREBASE_PROJECT_ID=kl-tint-studio
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@kl-tint-studio.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ✅ REQUIRED - Cron Authentication
CRON_SECRET=0Shf+I3uS9iEl2VqkAobRd/Pi4l5V5dx+U2IFpG/zLc=

# ✅ REQUIRED - Firebase Cloud Function Configuration
REMINDER_BASE_URL=https://kltint.vercel.app

# ✅ REQUIRED - Email Service
RESEND_API_KEY=re_P7J1rmHf_5eMj6hotE4wo6QzNGdVzHwMc
ADMIN_EMAIL=kltintwebredesign@gmail.com

# ✅ REQUIRED - Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@2026
```

---

## 📊 How It Works

### Reminder Scheduling Flow

```
1. Firebase Cloud Function (Pub/Sub)
   ↓
2. Triggered Every 10 Minutes (Asia/Kuala_Lumpur timezone)
   ↓
3. Calls: GET /api/cron/reminders
   ↓
4. Checks Firestore for today's appointments with:
   - date == TODAY
   - status == "confirmed"
   - reminderSent == false
   ↓
5. Sends reminder emails to customers within 30 min window
   ↓
6. Updates reminderSent = true to prevent duplicates
```

### Example: Appointment at 10:00 AM

| Time | Action |
|------|--------|
| 09:20 AM | ⏳ Cron runs, appointment not yet in 30-min window |
| 09:30 AM | ⏳ Cron runs, appointment in 30-min window |
| **09:35 AM** | **✉️ REMINDER EMAIL SENT** |
| 09:45 AM | ⏳ Cron runs, but reminderSent=true, skips |
| 10:00 AM | 📌 Appointment time |

---

## 🐛 Troubleshooting

### Issue: "Unauthorized" when testing endpoint

**Error:** `401 Unauthorized` response

**Solution:** Verify CRON_SECRET matches:
```bash
# Check your .env.local
grep CRON_SECRET .env.local

# Use the exact value in the Authorization header
curl -X GET "http://localhost:3000/api/cron/reminders" \
  -H "Authorization: Bearer EXACT_VALUE_FROM_ENV"
```

### Issue: No reminders being sent

**Checklist:**
1. ✅ Confirmed appointments exist in Firestore with `status="confirmed"`
2. ✅ `reminderSent=false` for those appointments
3. ✅ `RESEND_API_KEY` is valid in `.env.local`
4. ✅ Firebase Cloud Function is deployed
5. ✅ `REMINDER_BASE_URL` points to your deployed Next.js app
6. ✅ Time calculation is correct (Malaysia timezone UTC+8)

### Issue: Firebase Function deployment fails

**Solution:**
```bash
# Check for errors
firebase deploy --only functions:sendAppointmentReminders --debug

# Verify functions are installed
npm install -g firebase-tools

# Login to Firebase
firebase login
```

---

## 📱 Testing with Real Appointment

1. **Create an appointment** through the booking modal for ~10 minutes from now
2. **Wait for the cron trigger** (runs every 10 minutes)
3. **Check your email** for a reminder message
4. **Verify in Firestore** that the appointment's `reminderSent` field is now `true`

---

## 🎯 Production Deployment Checklist

Before going live:

- [ ] Deploy Next.js app to Vercel
- [ ] Update `REMINDER_BASE_URL` in `.env.local` with Vercel URL
- [ ] Deploy Firebase functions: `firebase deploy --only functions`
- [ ] Set secrets in Firebase Console or CLI
- [ ] Test with a real appointment
- [ ] Monitor Firebase Function logs: `firebase functions:log`
- [ ] Verify reminders are being sent in your email inbox

---

## 📞 Support

For issues or questions about the schedule system, check:
- Firestore Query Indexes (may need to be created if missing)
- Firebase Cloud Function Logs in Firebase Console
- Email delivery status in Resend dashboard
- Next.js API Route logs locally: `npm run dev`

