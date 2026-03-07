# KL Tint Studio — Appointment Booking System Implementation Guide

> **Implementation-ready technical documentation for AI agent execution**

---

## 1. FEASIBILITY ASSESSMENT

### Verdict: ✅ FULLY FEASIBLE WITH FIREBASE + NEXT.JS

| Requirement | Firebase Solution | Feasibility |
|---|---|---|
| Appointment CRUD | Firestore collections | ✅ Native |
| Real-time slot blocking | Firestore real-time queries + transactions | ✅ Native |
| Branch-based scheduling | Firestore document structure keyed by branch | ✅ Native |
| Promo code system | Firestore collection with validation | ✅ Native |
| Admin authentication | Firebase Auth (email/password) | ✅ Native |
| Admin dashboard | Next.js `/admin` route + Firestore queries | ✅ Native |
| Email notifications (customer + admin) | Resend API (already in project) | ✅ Already integrated |
| Reminder emails (30 min before) | Firebase Cloud Functions (scheduled) OR Vercel Cron Jobs | ✅ Feasible |
| Slot availability per branch/date/time | Firestore queries with compound indexes | ✅ Native |

### Why Firebase (and not alternatives)?

- **Free tier** covers ~50K reads/day, 20K writes/day — more than enough for an appointment system
- **Real-time listeners** prevent double-booking race conditions via Firestore transactions
- **No separate server needed** — works directly from Next.js API routes via Firebase Admin SDK
- **Authentication built-in** — no need for JWT/session libraries
- **Scales automatically** if business grows

### Architecture Decision: Firebase Admin SDK (Server-Side Only)

We will use **Firebase Admin SDK** exclusively in Next.js API routes (server-side). No Firebase client SDK will be exposed to the browser. This ensures:
- Firestore security rules are bypassed (admin SDK has full access)
- No Firebase credentials leak to the client
- All database operations happen in API routes

---

## 2. TECHNOLOGY STACK ADDITIONS

### New Dependencies to Install

```bash
npm install firebase-admin
```

### Environment Variables to Add (`.env.local`)

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Admin Login Credentials (fixed)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password

# Existing (already in use)
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=admin@kltintstudio.com
```

---

## 3. FIREBASE SETUP INSTRUCTIONS

### Step 3.1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" → Name it `kltint-studio`
3. Disable Google Analytics (not needed)
4. Click "Create project"

### Step 3.2: Enable Firestore

1. In Firebase Console → Build → Firestore Database
2. Click "Create database"
3. Select production mode
4. Choose region: `asia-southeast1` (Singapore — closest to Malaysia)

### Step 3.3: Generate Service Account Key

1. Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values for `.env.local`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

---

## 4. FIRESTORE DATA STRUCTURE

### Collection: `appointments`

```
appointments/
  {auto-id}/
    branch: "Kota Damansara"          // string
    service: "tint"                    // string: tint|coating|ppf|wrapping|combo
    package: "Gold"                    // string
    price: 599                         // number
    date: "2026-03-15"                // string (YYYY-MM-DD)
    timeSlot: "09:00-10:30"           // string
    customerName: "John Doe"          // string
    customerEmail: "john@example.com" // string
    customerPhone: "+60123456789"     // string
    carModel: "Toyota Camry"          // string
    carPlate: "WKL 1234"             // string
    message: ""                       // string (optional)
    promoCode: "SAVE10"              // string (optional)
    discount: 50                      // number
    totalPaid: 549                    // number
    status: "confirmed"               // string: confirmed|completed|cancelled
    reminderSent: false               // boolean
    createdAt: Timestamp              // Firestore Timestamp
```

### Collection: `promoCodes`

```
promoCodes/
  {auto-id}/
    code: "SAVE10"                   // string (uppercase, unique)
    type: "percentage"               // string: percentage|fixed
    value: 10                        // number (10 = 10% or RM10)
    active: true                     // boolean
    usageLimit: 100                  // number (0 = unlimited)
    usedCount: 5                     // number
    minOrderAmount: 0                // number
    validFrom: Timestamp             // Firestore Timestamp
    validUntil: Timestamp            // Firestore Timestamp
    createdAt: Timestamp             // Firestore Timestamp
```

### Firestore Indexes Required

Create these composite indexes in Firestore Console → Indexes:

1. **Slot availability check:**
   - Collection: `appointments`
   - Fields: `branch` (Asc), `date` (Asc), `timeSlot` (Asc), `status` (Asc)

2. **Admin dashboard queries:**
   - Collection: `appointments`
   - Fields: `branch` (Asc), `createdAt` (Desc)

3. **Reminder query:**
   - Collection: `appointments`
   - Fields: `date` (Asc), `reminderSent` (Asc), `status` (Asc)

---

## 5. STEP-BY-STEP IMPLEMENTATION PLAN

### Phase 1: Firebase Foundation

| Step | File | Action |
|------|------|--------|
| 1.1 | `lib/firebase-admin.js` | Create Firebase Admin SDK singleton |
| 1.2 | `lib/schedule-config.js` | Create service schedule configuration |
| 1.3 | `lib/branches.js` | Create branch constants |

### Phase 2: API Routes

| Step | File | Action |
|------|------|--------|
| 2.1 | `app/api/appointments/route.js` | POST: Create appointment, GET: Fetch appointments |
| 2.2 | `app/api/appointments/slots/route.js` | GET: Check available slots for branch/date/service |
| 2.3 | `app/api/promo/validate/route.js` | POST: Validate promo code |
| 2.4 | `app/api/promo/route.js` | CRUD: Admin promo code management |
| 2.5 | `app/api/admin/login/route.js` | POST: Admin authentication |
| 2.6 | `app/api/notify/route.js` | UPDATE: Integrate HTML email templates |
| 2.7 | `app/api/cron/reminders/route.js` | GET: Send reminder emails (Vercel Cron) |

### Phase 3: Frontend Updates

| Step | File | Action |
|------|------|--------|
| 3.1 | `components/shared/BookingModal.jsx` | Update locations, dynamic time slots per service, slot availability |
| 3.2 | `components/shared/CheckoutModal.jsx` | Add promo code API validation, submit to appointments API |
| 3.3 | All service page components | Pass `service` type to BookingModal |

### Phase 4: Admin Dashboard

| Step | File | Action |
|------|------|--------|
| 4.1 | `app/admin/page.js` | Admin login page |
| 4.2 | `app/admin/dashboard/page.js` | Dashboard layout with appointments table |
| 4.3 | `app/admin/dashboard/promo/page.js` | Promo code management page |
| 4.4 | `components/Admin/AdminLayout.jsx` | Shared admin layout with sidebar |

### Phase 5: Email Templates & Cron

| Step | File | Action |
|------|------|--------|
| 5.1 | `lib/email-templates.js` | Customer + Admin + Reminder HTML templates |
| 5.2 | `vercel.json` | Configure cron job for reminders |

---

## 6. COMPLETE IMPLEMENTATION CODE

### 6.1 — `lib/firebase-admin.js`

```javascript
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
};

const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
```

### 6.2 — `lib/branches.js`

```javascript
export const BRANCHES = [
  {
    id: "kota-damansara",
    name: "Kota Damansara",
    address: "Kota Damansara, Petaling Jaya, Selangor",
    googleMapLink: "https://maps.google.com/?q=3.1579,101.7121",
  },
  {
    id: "maluri-cheras",
    name: "Maluri Cheras",
    address: "Maluri, Cheras, Kuala Lumpur",
    googleMapLink: "https://maps.google.com/?q=3.1167,101.6839",
  },
  {
    id: "setia-alam",
    name: "Setia Alam",
    address: "Setia Alam, Shah Alam, Selangor",
    googleMapLink: "https://maps.google.com/?q=3.1320,101.6775",
  },
  {
    id: "puchong",
    name: "Puchong",
    address: "Puchong, Selangor",
    googleMapLink: "https://maps.google.com/?q=3.0738,101.5183",
  },
];
```

### 6.3 — `lib/schedule-config.js`

```javascript
/**
 * Service schedule time slots configuration.
 * Each service type has its own set of available time slots.
 * Branch is the root factor — all branches share the same slot structure,
 * but availability is tracked per branch + date + slot.
 */

export const SERVICE_TIME_SLOTS = {
  tint: [
    { id: "tint-1", label: "09:00 AM - 10:30 AM", start: "09:00", end: "10:30" },
    { id: "tint-2", label: "10:30 AM - 12:00 PM", start: "10:30", end: "12:00" },
    { id: "tint-3", label: "12:00 PM - 01:30 PM", start: "12:00", end: "13:30" },
    { id: "tint-4", label: "01:30 PM - 03:00 PM", start: "13:30", end: "15:00" },
    { id: "tint-5", label: "03:00 PM - 04:30 PM", start: "15:00", end: "16:30" },
    { id: "tint-6", label: "04:30 PM - 06:00 PM", start: "16:30", end: "18:00" },
    { id: "tint-7", label: "06:00 PM - 07:30 PM", start: "18:00", end: "19:30" },
  ],
  coating: [
    { id: "coating-1", label: "09:00 AM - 01:30 PM", start: "09:00", end: "13:30" },
    { id: "coating-2", label: "01:30 PM - 06:00 PM", start: "13:30", end: "18:00" },
  ],
  ppf: [
    { id: "ppf-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" },
  ],
  wrapping: [
    { id: "wrapping-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" },
  ],
  combo: [
    { id: "combo-1", label: "09:00 AM - 07:30 PM", start: "09:00", end: "19:30" },
  ],
};

/**
 * Returns the appropriate time slots for a given service type.
 * For combo services, returns the combo slot configuration.
 */
export function getTimeSlotsForService(service) {
  const normalizedService = service?.toLowerCase().replace(/\s+/g, "");

  // Handle combo sub-types (tint+coating, tint+ppf, etc.)
  if (normalizedService?.includes("+") || normalizedService?.includes("combo")) {
    return SERVICE_TIME_SLOTS.combo;
  }

  return SERVICE_TIME_SLOTS[normalizedService] || SERVICE_TIME_SLOTS.tint;
}
```

### 6.4 — `app/api/appointments/slots/route.js`

```javascript
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { getTimeSlotsForService } from "@/lib/schedule-config";

/**
 * GET /api/appointments/slots?branch=Kota Damansara&date=2026-03-15&service=tint
 *
 * Returns available time slots for a given branch, date, and service.
 * Slots that already have a confirmed appointment are marked as unavailable.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const date = searchParams.get("date");
    const service = searchParams.get("service");

    if (!branch || !date || !service) {
      return NextResponse.json(
        { error: "branch, date, and service are required" },
        { status: 400 }
      );
    }

    // Get all confirmed appointments for this branch + date
    const snapshot = await db
      .collection("appointments")
      .where("branch", "==", branch)
      .where("date", "==", date)
      .where("status", "in", ["confirmed"])
      .get();

    const bookedSlots = new Set();
    snapshot.forEach((doc) => {
      bookedSlots.add(doc.data().timeSlot);
    });

    // Get the time slots for this service type
    const allSlots = getTimeSlotsForService(service);

    const slots = allSlots.map((slot) => ({
      ...slot,
      available: !bookedSlots.has(slot.label),
    }));

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Slots API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}
```

### 6.5 — `app/api/appointments/route.js`

```javascript
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendCustomerEmail, sendAdminEmail } from "@/lib/email-templates";

/**
 * POST /api/appointments
 * Create a new appointment with slot locking via Firestore transaction.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      branch,
      service,
      packageName,
      price,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      carModel,
      carPlate,
      message,
      promoCode,
      discount,
      totalPaid,
    } = body;

    // Validate required fields
    if (!branch || !service || !packageName || !date || !timeSlot || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use a Firestore transaction to prevent double-booking
    const result = await db.runTransaction(async (transaction) => {
      // Check if the slot is already booked
      const existingQuery = db
        .collection("appointments")
        .where("branch", "==", branch)
        .where("date", "==", date)
        .where("timeSlot", "==", timeSlot)
        .where("status", "==", "confirmed");

      const existingSnapshot = await transaction.get(existingQuery);

      if (!existingSnapshot.empty) {
        throw new Error("SLOT_TAKEN");
      }

      // Create the appointment
      const appointmentRef = db.collection("appointments").doc();
      const appointmentData = {
        branch,
        service,
        package: packageName,
        price: Number(price) || 0,
        date,
        timeSlot,
        customerName,
        customerEmail,
        customerPhone,
        carModel: carModel || "",
        carPlate: carPlate || "",
        message: message || "",
        promoCode: promoCode || "",
        discount: Number(discount) || 0,
        totalPaid: Number(totalPaid) || Number(price) || 0,
        status: "confirmed",
        reminderSent: false,
        createdAt: FieldValue.serverTimestamp(),
      };

      transaction.set(appointmentRef, appointmentData);

      // If promo code was used, increment usage count
      if (promoCode) {
        const promoSnapshot = await db
          .collection("promoCodes")
          .where("code", "==", promoCode.toUpperCase())
          .limit(1)
          .get();

        if (!promoSnapshot.empty) {
          const promoDoc = promoSnapshot.docs[0];
          transaction.update(promoDoc.ref, {
            usedCount: FieldValue.increment(1),
          });
        }
      }

      return { id: appointmentRef.id, ...appointmentData };
    });

    // Send emails (non-blocking)
    try {
      await Promise.allSettled([
        sendCustomerEmail(result),
        sendAdminEmail(result),
      ]);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    return NextResponse.json({ success: true, appointment: { id: result.id } });
  } catch (error) {
    if (error.message === "SLOT_TAKEN") {
      return NextResponse.json(
        { error: "This time slot has already been booked. Please choose another slot." },
        { status: 409 }
      );
    }
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appointments?branch=all&status=confirmed
 * Admin endpoint to fetch appointments. Requires admin authentication.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const status = searchParams.get("status");
    const adminToken = request.headers.get("x-admin-token");

    // Validate admin token
    if (adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = db.collection("appointments").orderBy("createdAt", "desc");

    if (branch && branch !== "all") {
      query = query.where("branch", "==", branch);
    }
    if (status && status !== "all") {
      query = query.where("status", "==", status);
    }

    const snapshot = await query.limit(200).get();
    const appointments = [];
    snapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
```

### 6.6 — `app/api/promo/validate/route.js`

```javascript
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

/**
 * POST /api/promo/validate
 * Validates a promo code and returns the discount details.
 */
export async function POST(request) {
  try {
    const { code, orderAmount } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Promo code is required" },
        { status: 400 }
      );
    }

    const snapshot = await db
      .collection("promoCodes")
      .where("code", "==", code.toUpperCase())
      .where("active", "==", true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ valid: false, error: "Invalid promo code" });
    }

    const promo = snapshot.docs[0].data();
    const now = new Date();

    // Check validity period
    if (promo.validFrom && promo.validFrom.toDate() > now) {
      return NextResponse.json({ valid: false, error: "Promo code is not yet active" });
    }
    if (promo.validUntil && promo.validUntil.toDate() < now) {
      return NextResponse.json({ valid: false, error: "Promo code has expired" });
    }

    // Check usage limit
    if (promo.usageLimit > 0 && promo.usedCount >= promo.usageLimit) {
      return NextResponse.json({ valid: false, error: "Promo code usage limit reached" });
    }

    // Check minimum order amount
    if (promo.minOrderAmount > 0 && orderAmount < promo.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order amount is RM ${promo.minOrderAmount}`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (promo.type === "percentage") {
      discount = Math.round((orderAmount * promo.value) / 100);
    } else {
      discount = promo.value;
    }

    // Ensure discount doesn't exceed order amount
    discount = Math.min(discount, orderAmount);

    return NextResponse.json({
      valid: true,
      code: promo.code,
      type: promo.type,
      value: promo.value,
      discount,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate promo code" },
      { status: 500 }
    );
  }
}
```

### 6.7 — `app/api/promo/route.js`

```javascript
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

function isAdmin(request) {
  const token = request.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

/**
 * GET /api/promo — List all promo codes (admin only)
 */
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await db.collection("promoCodes").orderBy("createdAt", "desc").get();
  const promos = [];
  snapshot.forEach((doc) => promos.push({ id: doc.id, ...doc.data() }));

  return NextResponse.json({ promos });
}

/**
 * POST /api/promo — Create a new promo code (admin only)
 */
export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code, type, value, usageLimit, minOrderAmount, validFrom, validUntil } = body;

    if (!code || !type || value === undefined) {
      return NextResponse.json({ error: "code, type, and value are required" }, { status: 400 });
    }

    // Check for duplicate code
    const existing = await db
      .collection("promoCodes")
      .where("code", "==", code.toUpperCase())
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ error: "Promo code already exists" }, { status: 409 });
    }

    const promoData = {
      code: code.toUpperCase(),
      type, // "percentage" or "fixed"
      value: Number(value),
      active: true,
      usageLimit: Number(usageLimit) || 0,
      usedCount: 0,
      minOrderAmount: Number(minOrderAmount) || 0,
      validFrom: validFrom ? Timestamp.fromDate(new Date(validFrom)) : null,
      validUntil: validUntil ? Timestamp.fromDate(new Date(validUntil)) : null,
      createdAt: FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("promoCodes").add(promoData);

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Create promo error:", error);
    return NextResponse.json({ error: "Failed to create promo code" }, { status: 500 });
  }
}

/**
 * DELETE /api/promo — Delete a promo code (admin only)
 */
export async function DELETE(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Promo code ID is required" }, { status: 400 });
    }

    await db.collection("promoCodes").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete promo error:", error);
    return NextResponse.json({ error: "Failed to delete promo code" }, { status: 500 });
  }
}

/**
 * PATCH /api/promo — Toggle promo code active status (admin only)
 */
export async function PATCH(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, active } = await request.json();
    if (!id || active === undefined) {
      return NextResponse.json({ error: "id and active status are required" }, { status: 400 });
    }

    await db.collection("promoCodes").doc(id).update({ active });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update promo error:", error);
    return NextResponse.json({ error: "Failed to update promo code" }, { status: 500 });
  }
}
```

### 6.8 — `app/api/admin/login/route.js`

```javascript
import { NextResponse } from "next/server";

/**
 * POST /api/admin/login
 * Authenticates admin with fixed credentials.
 * Returns the admin token (password) for subsequent API calls.
 */
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({
        success: true,
        token: validPassword, // Used as x-admin-token header for subsequent requests
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
```

### 6.9 — `lib/email-templates.js`

```javascript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Builds the customer confirmation email HTML.
 * Uses the custom Appoint-Email.html template design.
 */
function buildCustomerEmailHtml(appointment) {
  const year = new Date().getFullYear();
  const branch = appointment.branch || "";
  
  // Find branch details
  const branchAddresses = {
    "Kota Damansara": "Kota Damansara, Petaling Jaya, Selangor",
    "Maluri Cheras": "Maluri, Cheras, Kuala Lumpur",
    "Setia Alam": "Setia Alam, Shah Alam, Selangor",
    "Puchong": "Puchong, Selangor",
  };
  const branchMaps = {
    "Kota Damansara": "https://maps.google.com/?q=3.1579,101.7121",
    "Maluri Cheras": "https://maps.google.com/?q=3.1167,101.6839",
    "Setia Alam": "https://maps.google.com/?q=3.1320,101.6775",
    "Puchong": "https://maps.google.com/?q=3.0738,101.5183",
  };

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Confirmation</title>
</head>
<body style="margin:0; padding:0; background:#eef1f6; font-family:Arial, Helvetica, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" align="center" style="padding:20px 10px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; background:#0f172a; border-radius:16px; overflow:hidden; box-shadow:0 10px 35px rgba(0,0,0,0.15);">
<tr>
<td style="background:#1e3a8a; padding:22px 24px;">
<img src="https://kltintstudio.com/logo-white-new-1.png" alt="KL Tint Studio" style="height:42px; display:block;">
</td>
</tr>
<tr>
<td style="padding:28px;">
<p style="color:#e5e7eb; font-size:15px; margin:0 0 14px;">
Dear <strong style="color:#ffffff;">${appointment.customerName}</strong>,
</p>
<p style="color:#9ca3af; font-size:14px; line-height:1.7; margin:0 0 22px;">
Your appointment has been successfully scheduled with <strong style="color:#ffffff;">KL Tint Studio</strong>.  
Please find your booking details below.
</p>
<h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">
📅 Appointment Details
</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr>
<td style="padding:9px 0; color:#9ca3af;">Service</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.service}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Package</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.package}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Date</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.date}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Time</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.timeSlot}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Branch</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${branch}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Estimated Price</td>
<td align="right" style="padding:9px 0; color:#fbbf24; font-weight:700;">RM ${appointment.totalPaid}</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
<tr>
<td align="center" style="padding:8px;">
<a href="${branchMaps[branch] || "#"}" style="background:#1f2937; color:#ffffff; padding:12px 18px; border-radius:8px; font-size:13px; text-decoration:none; display:inline-block;">
📍 View Branch Location
</a>
</td>
<td align="center" style="padding:8px;">
<a href="#" style="background:#f59e0b; color:#111827; padding:12px 18px; border-radius:8px; font-size:13px; text-decoration:none; font-weight:700; display:inline-block;">
📅 Add to Calendar
</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 28px;">
<hr style="border:none; border-top:1px solid #1f2937;">
</td>
</tr>
<tr>
<td style="padding:24px 28px;">
<h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">
🚗 Vehicle Details
</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr>
<td style="padding:9px 0; color:#9ca3af;">Car Model</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.carModel}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Plate Number</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.carPlate}</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 28px;">
<hr style="border:none; border-top:1px solid #1f2937;">
</td>
</tr>
<tr>
<td style="padding:24px 28px;">
<h2 style="color:#ffffff; font-size:16px; margin:0 0 16px; font-weight:600;">
👤 Customer Information
</h2>
<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
<tr>
<td style="padding:9px 0; color:#9ca3af;">Full Name</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.customerName}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Email</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.customerEmail}</td>
</tr>
<tr>
<td style="padding:9px 0; color:#9ca3af;">Phone</td>
<td align="right" style="padding:9px 0; color:#ffffff;">${appointment.customerPhone}</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background:#0b1220; padding:22px; text-align:center;">
<p style="color:#6b7280; font-size:12px; margin:0 0 6px;">
KL Tint Studio © ${year}
</p>
<p style="color:#6b7280; font-size:12px; margin:0;">
${branchAddresses[branch] || ""}
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/**
 * Builds the admin notification email HTML.
 */
function buildAdminEmailHtml(appointment) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" align="center" style="padding:20px;">
<tr><td align="center">
<table width="100%" style="max-width:620px; background:#111827; border-radius:12px; overflow:hidden;">
<tr>
<td style="background:#7c3aed; padding:18px 22px; color:#fff; font-size:16px; font-weight:bold;">
📅 New Appointment Booked
</td>
</tr>
<tr>
<td style="padding:22px; color:#e5e7eb; font-size:14px;">
<p style="margin-top:0;">A new customer appointment has been scheduled.</p>
<table width="100%" cellpadding="6" cellspacing="0">
<tr><td style="color:#9ca3af;">Customer</td><td align="right">${appointment.customerName}</td></tr>
<tr><td style="color:#9ca3af;">Phone</td><td align="right">${appointment.customerPhone}</td></tr>
<tr><td style="color:#9ca3af;">Email</td><td align="right">${appointment.customerEmail}</td></tr>
<tr><td style="color:#9ca3af;">Service</td><td align="right">${appointment.service}</td></tr>
<tr><td style="color:#9ca3af;">Package</td><td align="right">${appointment.package}</td></tr>
<tr><td style="color:#9ca3af;">Date</td><td align="right">${appointment.date}</td></tr>
<tr><td style="color:#9ca3af;">Time</td><td align="right">${appointment.timeSlot}</td></tr>
<tr><td style="color:#9ca3af;">Branch</td><td align="right">${appointment.branch}</td></tr>
<tr><td style="color:#9ca3af;">Car Model</td><td align="right">${appointment.carModel}</td></tr>
<tr><td style="color:#9ca3af;">Plate No</td><td align="right">${appointment.carPlate}</td></tr>
<tr><td style="color:#9ca3af;">Promo Code</td><td align="right">${appointment.promoCode || "None"}</td></tr>
<tr><td style="color:#9ca3af;">Discount</td><td align="right">RM ${appointment.discount || 0}</td></tr>
<tr><td style="color:#9ca3af;">Price</td><td align="right" style="color:#fbbf24; font-weight:bold;">RM ${appointment.totalPaid}</td></tr>
</table>
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/**
 * Builds the reminder email HTML.
 */
function buildReminderEmailHtml(appointment) {
  const branchMaps = {
    "Kota Damansara": "https://maps.google.com/?q=3.1579,101.7121",
    "Maluri Cheras": "https://maps.google.com/?q=3.1167,101.6839",
    "Setia Alam": "https://maps.google.com/?q=3.1320,101.6775",
    "Puchong": "https://maps.google.com/?q=3.0738,101.5183",
  };

  return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#eef2ff; font-family:Arial, sans-serif;">
<table width="100%" align="center" cellpadding="0" cellspacing="0" style="padding:20px;">
<tr><td align="center">
<table width="100%" style="max-width:620px; background:#0f172a; border-radius:14px; overflow:hidden;">
<tr>
<td style="background:#1e40af; padding:20px; color:white; font-weight:bold;">
⏰ Appointment Reminder
</td>
</tr>
<tr>
<td style="padding:24px; color:#e5e7eb; font-size:14px;">
<p>Hi <strong>${appointment.customerName}</strong>,</p>
<p>This is a friendly reminder of your upcoming appointment with KL Tint Studio.</p>
<table width="100%" cellpadding="6">
<tr><td style="color:#9ca3af;">Service</td><td align="right">${appointment.service}</td></tr>
<tr><td style="color:#9ca3af;">Date</td><td align="right">${appointment.date}</td></tr>
<tr><td style="color:#9ca3af;">Time</td><td align="right">${appointment.timeSlot}</td></tr>
<tr><td style="color:#9ca3af;">Branch</td><td align="right">${appointment.branch}</td></tr>
</table>
<p style="margin-top:20px;">
Please arrive 10 minutes earlier for a smoother service experience.
</p>
<div style="text-align:center; margin-top:20px;">
<a href="${branchMaps[appointment.branch] || "#"}" style="background:#2563eb; color:white; padding:12px 20px; border-radius:8px; text-decoration:none;">
📍 Get Directions
</a>
</div>
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/**
 * Send appointment confirmation email to customer.
 */
export async function sendCustomerEmail(appointment) {
  if (!process.env.RESEND_API_KEY) return;

  return resend.emails.send({
    from: "KL Tint Studio <onboarding@resend.dev>",
    to: appointment.customerEmail,
    subject: "Appointment Confirmation - KL Tint Studio",
    html: buildCustomerEmailHtml(appointment),
  });
}

/**
 * Send new appointment notification email to admin.
 */
export async function sendAdminEmail(appointment) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return;

  return resend.emails.send({
    from: "KL Tint Studio <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: `New Appointment: ${appointment.customerName} — ${appointment.service}`,
    html: buildAdminEmailHtml(appointment),
  });
}

/**
 * Send reminder email to customer (30 min before appointment).
 */
export async function sendReminderEmail(appointment) {
  if (!process.env.RESEND_API_KEY) return;

  return resend.emails.send({
    from: "KL Tint Studio <onboarding@resend.dev>",
    to: appointment.customerEmail,
    subject: "Reminder: Your Appointment Today - KL Tint Studio",
    html: buildReminderEmailHtml(appointment),
  });
}
```

### 6.10 — `app/api/cron/reminders/route.js`

```javascript
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { sendReminderEmail } from "@/lib/email-templates";

/**
 * GET /api/cron/reminders
 *
 * Called by Vercel Cron every 10 minutes.
 * Finds appointments that are within 30 minutes and haven't been reminded yet.
 * Sends reminder emails and marks them as reminded.
 */
export async function GET(request) {
  // Verify cron secret (Vercel sends this automatically)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0]; // "2026-03-15"

    // Current time in HH:MM format (Malaysia timezone UTC+8)
    const malaysiaTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const currentHour = malaysiaTime.getUTCHours();
    const currentMinute = malaysiaTime.getUTCMinutes();
    const currentMinutes = currentHour * 60 + currentMinute;

    // Find today's confirmed appointments that haven't been reminded
    const snapshot = await db
      .collection("appointments")
      .where("date", "==", todayStr)
      .where("status", "==", "confirmed")
      .where("reminderSent", "==", false)
      .get();

    let sentCount = 0;

    for (const doc of snapshot.docs) {
      const appointment = doc.data();

      // Parse the start time from the timeSlot (e.g., "09:00 AM - 10:30 AM")
      const startTimeMatch = appointment.timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!startTimeMatch) continue;

      let hours = parseInt(startTimeMatch[1]);
      const minutes = parseInt(startTimeMatch[2]);
      const period = startTimeMatch[3].toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const appointmentMinutes = hours * 60 + minutes;
      const minutesUntilAppointment = appointmentMinutes - currentMinutes;

      // Send reminder if appointment is within 30-40 minutes from now
      // (10-minute buffer because cron runs every 10 min)
      if (minutesUntilAppointment > 0 && minutesUntilAppointment <= 40) {
        try {
          await sendReminderEmail({ id: doc.id, ...appointment });
          await doc.ref.update({ reminderSent: true });
          sentCount++;
        } catch (emailError) {
          console.error(`Reminder failed for ${doc.id}:`, emailError);
        }
      }
    }

    return NextResponse.json({ success: true, remindersSent: sentCount });
  } catch (error) {
    console.error("Cron reminders error:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
```

### 6.11 — `vercel.json` (Cron Configuration)

```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

---

## 7. FRONTEND COMPONENT UPDATES

### 7.1 — Updated `components/shared/BookingModal.jsx`

The BookingModal needs these changes:
1. Replace location dropdown with 4 branches
2. Accept `service` prop to determine time slots
3. Fetch available slots from API when branch + date are selected
4. Disable booked slots
5. Add form validation

**Key changes to make:**

```jsx
// OLD location options:
<option value="Kuala Lumpur">Kuala Lumpur</option>
<option value="Selangor">Selangor</option>
<option value="Penang">Penang</option>
<option value="Johor Bahru">Johor Bahru</option>
<option value="Malacca">Malacca</option>

// NEW location options:
<option value="Kota Damansara">Kota Damansara</option>
<option value="Maluri Cheras">Maluri Cheras</option>
<option value="Setia Alam">Setia Alam</option>
<option value="Puchong">Puchong</option>
```

```jsx
// OLD time options (static):
<option value="">09:00-10:00 AM</option>
<option value="10:00-11:00">10:00-11:00 AM</option>
...

// NEW time options (dynamic, fetched from API):
// Render based on `availableSlots` state
{availableSlots.map((slot) => (
  <option key={slot.id} value={slot.label} disabled={!slot.available}>
    {slot.label} {!slot.available ? "(Booked)" : ""}
  </option>
))}
```

**New state and effects to add:**

```jsx
const [availableSlots, setAvailableSlots] = useState([]);
const [loadingSlots, setLoadingSlots] = useState(false);

// Fetch slots when branch + date change
useEffect(() => {
  if (formData.location && formData.date) {
    setLoadingSlots(true);
    fetch(`/api/appointments/slots?branch=${encodeURIComponent(formData.location)}&date=${formData.date}&service=${service}`)
      .then(res => res.json())
      .then(data => setAvailableSlots(data.slots || []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false));
  }
}, [formData.location, formData.date, service]);
```

### 7.2 — Updated `components/shared/CheckoutModal.jsx`

The CheckoutModal needs these changes:
1. Replace hardcoded promo logic with API call
2. Submit to `/api/appointments` instead of `/api/notify`
3. Handle slot-taken errors gracefully

**Key changes:**

```jsx
// OLD promo logic:
const handleApplyPromo = () => {
  if (promoCode.toUpperCase() === "APPLY") {
    setDiscount(0);
  }
};

// NEW promo logic:
const handleApplyPromo = async () => {
  if (!promoCode.trim()) return;
  setPromoLoading(true);
  try {
    const res = await fetch("/api/promo/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promoCode, orderAmount: packagePrice }),
    });
    const data = await res.json();
    if (data.valid) {
      setDiscount(data.discount);
      setPromoError("");
      toast.success(`Promo applied! RM ${data.discount} off`);
    } else {
      setDiscount(0);
      setPromoError(data.error);
    }
  } catch {
    setPromoError("Failed to validate promo code");
  } finally {
    setPromoLoading(false);
  }
};
```

```jsx
// OLD confirm:
await fetch("/api/notify", { ... });
toast.success("Booking Confirmed!");

// NEW confirm:
const res = await fetch("/api/appointments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    branch: bookingData.location,
    service: service,
    packageName: packageData.name,
    price: packagePrice,
    date: bookingData.date,
    timeSlot: bookingData.time,
    customerName: bookingData.name,
    customerEmail: bookingData.email,
    customerPhone: bookingData.mobile,
    carModel: bookingData.carModel,
    carPlate: bookingData.carPlate,
    message: bookingData.message,
    promoCode: promoCode || "",
    discount,
    totalPaid: total,
  }),
});
const data = await res.json();
if (data.success) {
  toast.success("Booking Confirmed! Check your email for confirmation.");
  onClose();
} else if (res.status === 409) {
  toast.error(data.error); // Slot already taken
} else {
  toast.error("Booking failed. Please try again.");
}
```

### 7.3 — Service Pages: Pass `service` prop

Each service page must pass the `service` type to BookingModal:

```jsx
// In Tint PackageSection:
<BookingModal service="tint" ... />
<CheckoutModal service="tint" ... />

// In Coating CoatingPackageSection:
<BookingModal service="coating" ... />
<CheckoutModal service="coating" ... />

// In PPF PPFPackageSection:
<BookingModal service="ppf" ... />
<CheckoutModal service="ppf" ... />

// In Wrapping WrappingPackage:
<BookingModal service="wrapping" ... />
<CheckoutModal service="wrapping" ... />

// In Combo ComboPackageSection:
<BookingModal service="combo" ... />
<CheckoutModal service="combo" ... />
```

---

## 8. ADMIN DASHBOARD

### 8.1 — `app/admin/page.js` (Login Page)

```jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#d4af37] mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37]"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4af37]"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-lg hover:bg-[#c4a030] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### 8.2 — `app/admin/dashboard/page.js` (Appointments Dashboard)

```jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const getToken = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("adminToken");
    }
    return null;
  };

  const fetchAppointments = useCallback(async () => {
    const token = getToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (branchFilter) params.set("branch", branchFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/appointments?${params}`, {
        headers: { "x-admin-token": token },
      });

      if (res.status === 401) {
        sessionStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch {
      console.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }, [branchFilter, statusFilter, router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#d4af37]">KL Tint Studio — Admin</h1>
        <div className="flex gap-4 items-center">
          <Link href="/admin/dashboard" className="text-white hover:text-[#d4af37]">
            Appointments
          </Link>
          <Link href="/admin/dashboard/promo" className="text-gray-400 hover:text-[#d4af37]">
            Promo Codes
          </Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="all">All Branches</option>
            <option value="Kota Damansara">Kota Damansara</option>
            <option value="Maluri Cheras">Maluri Cheras</option>
            <option value="Setia Alam">Setia Alam</option>
            <option value="Puchong">Puchong</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#252525] text-white border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={fetchAppointments}
            className="bg-[#d4af37] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#c4a030]"
          >
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold">{appointments.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <p className="text-gray-400 text-sm">Confirmed</p>
            <p className="text-2xl font-bold text-green-400">
              {appointments.filter((a) => a.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-blue-400">
              {appointments.filter((a) => a.status === "completed").length}
            </p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <p className="text-gray-400 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-red-400">
              {appointments.filter((a) => a.status === "cancelled").length}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-400">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-400">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Time</th>
                  <th className="text-left py-3 px-2">Branch</th>
                  <th className="text-left py-3 px-2">Customer</th>
                  <th className="text-left py-3 px-2">Service</th>
                  <th className="text-left py-3 px-2">Package</th>
                  <th className="text-left py-3 px-2">Car</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-800 hover:bg-[#1a1a1a]">
                    <td className="py-3 px-2">{apt.date}</td>
                    <td className="py-3 px-2 text-xs">{apt.timeSlot}</td>
                    <td className="py-3 px-2">{apt.branch}</td>
                    <td className="py-3 px-2">
                      <div>{apt.customerName}</div>
                      <div className="text-gray-500 text-xs">{apt.customerPhone}</div>
                    </td>
                    <td className="py-3 px-2 capitalize">{apt.service}</td>
                    <td className="py-3 px-2">{apt.package}</td>
                    <td className="py-3 px-2">
                      <div>{apt.carModel}</div>
                      <div className="text-gray-500 text-xs">{apt.carPlate}</div>
                    </td>
                    <td className="py-3 px-2 text-right text-[#d4af37] font-bold">
                      RM {apt.totalPaid}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          apt.status === "confirmed"
                            ? "bg-green-900 text-green-300"
                            : apt.status === "completed"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 8.3 — `app/admin/dashboard/promo/page.js` (Promo Code Management)

```jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PromoDashboardPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    usageLimit: "",
    minOrderAmount: "",
    validFrom: "",
    validUntil: "",
  });
  const router = useRouter();

  const getToken = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("adminToken");
    }
    return null;
  };

  const fetchPromos = useCallback(async () => {
    const token = getToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/promo", {
        headers: { "x-admin-token": token },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setPromos(data.promos || []);
    } catch {
      console.error("Failed to fetch promos");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ code: "", type: "percentage", value: "", usageLimit: "", minOrderAmount: "", validFrom: "", validUntil: "" });
        fetchPromos();
      }
    } catch {
      console.error("Failed to create promo");
    }
  };

  const handleToggle = async (id, currentActive) => {
    const token = getToken();
    try {
      await fetch("/api/promo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ id, active: !currentActive }),
      });
      fetchPromos();
    } catch {
      console.error("Failed to toggle promo");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this promo code?")) return;
    const token = getToken();
    try {
      await fetch("/api/promo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({ id }),
      });
      fetchPromos();
    } catch {
      console.error("Failed to delete promo");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#d4af37]">KL Tint Studio — Admin</h1>
        <div className="flex gap-4 items-center">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#d4af37]">
            Appointments
          </Link>
          <Link href="/admin/dashboard/promo" className="text-white hover:text-[#d4af37]">
            Promo Codes
          </Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Promo Codes</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#d4af37] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#c4a030]"
          >
            {showForm ? "Cancel" : "+ New Promo Code"}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <form onSubmit={handleCreate} className="bg-[#1a1a1a] rounded-xl p-6 mb-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. SAVE10"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (RM)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Value</label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g. 10"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Usage Limit (0 = unlimited)</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="0"
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Valid From</label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Valid Until</label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full bg-[#252525] text-white border border-gray-700 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-500"
            >
              Create Promo Code
            </button>
          </form>
        )}

        {/* Promo Table */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : promos.length === 0 ? (
          <p className="text-gray-400">No promo codes yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="text-left py-3 px-2">Code</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-left py-3 px-2">Value</th>
                  <th className="text-left py-3 px-2">Used / Limit</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Valid Period</th>
                  <th className="text-right py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((promo) => (
                  <tr key={promo.id} className="border-b border-gray-800 hover:bg-[#1a1a1a]">
                    <td className="py-3 px-2 font-mono font-bold text-[#d4af37]">{promo.code}</td>
                    <td className="py-3 px-2 capitalize">{promo.type}</td>
                    <td className="py-3 px-2">
                      {promo.type === "percentage" ? `${promo.value}%` : `RM ${promo.value}`}
                    </td>
                    <td className="py-3 px-2">
                      {promo.usedCount} / {promo.usageLimit || "∞"}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          promo.active ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {promo.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-xs text-gray-400">
                      {promo.validFrom ? new Date(promo.validFrom.seconds ? promo.validFrom.seconds * 1000 : promo.validFrom).toLocaleDateString() : "—"}{" "}
                      → {promo.validUntil ? new Date(promo.validUntil.seconds ? promo.validUntil.seconds * 1000 : promo.validUntil).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => handleToggle(promo.id, promo.active)}
                        className="text-yellow-400 hover:text-yellow-300 text-xs mr-3"
                      >
                        {promo.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 9. FILES TO CREATE (Ordered)

| # | File Path | Description |
|---|-----------|-------------|
| 1 | `lib/firebase-admin.js` | Firebase Admin SDK singleton |
| 2 | `lib/branches.js` | Branch constants |
| 3 | `lib/schedule-config.js` | Service time slot configuration |
| 4 | `lib/email-templates.js` | Email HTML builders + send functions |
| 5 | `app/api/appointments/slots/route.js` | Available slot checker |
| 6 | `app/api/appointments/route.js` | Appointment CRUD |
| 7 | `app/api/promo/validate/route.js` | Promo code validation |
| 8 | `app/api/promo/route.js` | Promo code CRUD (admin) |
| 9 | `app/api/admin/login/route.js` | Admin login |
| 10 | `app/api/cron/reminders/route.js` | Reminder cron job |
| 11 | `app/admin/page.js` | Admin login page |
| 12 | `app/admin/dashboard/page.js` | Appointments dashboard |
| 13 | `app/admin/dashboard/promo/page.js` | Promo code dashboard |
| 14 | `vercel.json` | Cron configuration |

## 10. FILES TO MODIFY

| # | File Path | Changes |
|---|-----------|---------|
| 1 | `components/shared/BookingModal.jsx` | Replace locations, add dynamic slots, add `service` prop, add validation |
| 2 | `components/shared/CheckoutModal.jsx` | Add promo API validation, submit to appointments API, add `service` prop |
| 3 | `components/Tint/PackageSection.jsx` | Pass `service="tint"` to modals |
| 4 | `components/Coating/CoatingPackageSection.jsx` | Pass `service="coating"` to modals |
| 5 | `components/PPF/PPFPackageSection.jsx` | Pass `service="ppf"` to modals |
| 6 | `components/Wrapping/WrappingPackage.jsx` | Pass `service="wrapping"` to modals |
| 7 | `components/Combo/ComboPackageSection.jsx` | Pass `service="combo"` to modals |
| 8 | `components/Home/NearestArea.jsx` | Update branches to 4 locations |
| 9 | `components/Footer/Footer.jsx` | Update footer location list |
| 10 | `package.json` | Add `firebase-admin` dependency |

---

## 11. ENVIRONMENT VARIABLES CHECKLIST

```env
# Firebase (required)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Admin credentials (required)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=

# Email (required for notifications)
RESEND_API_KEY=
ADMIN_EMAIL=

# Cron (required for reminders on Vercel)
CRON_SECRET=

# Existing (optional - Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
TWILIO_WHATSAPP_FROM=
ADMIN_PHONE=
ADMIN_WHATSAPP=
```

---

## 12. DEPLOYMENT NOTES

### Vercel Cron Jobs
- Vercel free tier supports cron jobs running once per day minimum
- **Vercel Pro plan** supports `*/10 * * * *` (every 10 minutes) — required for 30-minute reminders
- Alternative: Use a free external cron service (cron-job.org) to hit the endpoint every 10 minutes

### Firestore Security Rules (Production)
Since we use Admin SDK (server-side only), Firestore rules can be locked down:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // Only Admin SDK can access
    }
  }
}
```

### Resend Email Domain
- Default `onboarding@resend.dev` works for testing
- For production, verify your domain in Resend dashboard and update the `from` address to `noreply@kltintstudio.com`

---

## 13. IMPLEMENTATION EXECUTION ORDER (FOR AI AGENT)

Execute these steps in exact order:

1. **Install dependency:** `npm install firebase-admin`
2. **Create** `lib/firebase-admin.js`
3. **Create** `lib/branches.js`
4. **Create** `lib/schedule-config.js`
5. **Create** `lib/email-templates.js`
6. **Create** `app/api/appointments/slots/route.js`
7. **Create** `app/api/appointments/route.js`
8. **Create** `app/api/promo/validate/route.js`
9. **Create** `app/api/promo/route.js`
10. **Create** `app/api/admin/login/route.js`
11. **Create** `app/api/cron/reminders/route.js`
12. **Create** `vercel.json`
13. **Modify** `components/shared/BookingModal.jsx` — Replace locations, add dynamic time slot fetching, add `service` prop, add form validation
14. **Modify** `components/shared/CheckoutModal.jsx` — Add promo code API validation, submit to `/api/appointments`, add `service` prop, handle errors
15. **Modify** `components/Tint/PackageSection.jsx` — Pass `service="tint"` to BookingModal and CheckoutModal
16. **Modify** `components/Coating/CoatingPackageSection.jsx` — Pass `service="coating"` to BookingModal and CheckoutModal
17. **Modify** `components/PPF/PPFPackageSection.jsx` — Pass `service="ppf"` to BookingModal and CheckoutModal
18. **Modify** `components/Wrapping/WrappingPackage.jsx` — Pass `service="wrapping"` to BookingModal and CheckoutModal
19. **Modify** `components/Combo/ComboPackageSection.jsx` — Pass `service="combo"` to BookingModal and CheckoutModal
20. **Modify** `components/Home/NearestArea.jsx` — Update branches to 4 locations
21. **Modify** `components/Footer/Footer.jsx` — Update location list
22. **Create** `app/admin/page.js`
23. **Create** `app/admin/dashboard/page.js`
24. **Create** `app/admin/dashboard/promo/page.js`
25. **Set environment variables** in Vercel dashboard / `.env.local`
26. **Create Firestore indexes** in Firebase Console
27. **Test** full flow: Book → Email → Admin Dashboard → Promo Code

---

*End of Implementation Guide*
