import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase-admin";
import {
  parseLabelRangeToMinutes,
  parseTimeToMinutes,
  rangesOverlap,
} from "@/lib/schedule-config";
import { sendAdminEmail, sendCustomerEmail } from "@/lib/email-templates";

function getRangeFromAppointment(data) {
  if (data.slotStart && data.slotEnd) {
    return {
      start: parseTimeToMinutes(data.slotStart),
      end: parseTimeToMinutes(data.slotEnd),
    };
  }
  const parsed = parseLabelRangeToMinutes(data.timeSlot);
  if (parsed) return parsed;
  return null;
}

function isAdmin(request) {
  return request.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

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
      totalPaid,
    } = body;

    if (
      !branch ||
      !service ||
      !packageName ||
      !date ||
      !timeSlot ||
      !customerName ||
      !customerEmail ||
      !customerPhone
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const selectedRange = parseLabelRangeToMinutes(timeSlot);
    if (!selectedRange) {
      return NextResponse.json(
        { success: false, error: "Invalid time slot selected" },
        { status: 400 }
      );
    }

    const appointmentData = await db.runTransaction(async (transaction) => {
      const existingQuery = db
        .collection("appointments")
        .where("branch", "==", branch)
        .where("date", "==", date)
        .where("status", "==", "confirmed");

      const existing = await transaction.get(existingQuery);
      let conflict = false;

      existing.forEach((doc) => {
        const range = getRangeFromAppointment(doc.data());
        if (!range) return;
        if (rangesOverlap(selectedRange.start, selectedRange.end, range.start, range.end)) {
          conflict = true;
        }
      });

      if (conflict) {
        throw new Error("SLOT_TAKEN");
      }

      const basePrice = Number(price) || 0;
      const normalizedPromo = String(promoCode || "").trim().toUpperCase();
      let promoDiscount = 0;

      if (normalizedPromo) {
        const promoQuery = db
          .collection("promoCodes")
          .where("code", "==", normalizedPromo)
          .where("active", "==", true)
          .limit(1);
        const promoSnap = await transaction.get(promoQuery);

        if (promoSnap.empty) {
          throw new Error("PROMO_INVALID");
        }

        const promoDoc = promoSnap.docs[0];
        const promo = promoDoc.data();
        const now = new Date();
        const validFrom = promo.validFrom?.toDate ? promo.validFrom.toDate() : null;
        const validUntil = promo.validUntil?.toDate ? promo.validUntil.toDate() : null;

        if (validFrom && validFrom > now) {
          throw new Error("PROMO_NOT_ACTIVE");
        }
        if (validUntil && validUntil < now) {
          throw new Error("PROMO_EXPIRED");
        }
        if ((promo.usageLimit || 0) > 0 && (promo.usedCount || 0) >= promo.usageLimit) {
          throw new Error("PROMO_LIMIT");
        }
        if ((promo.minOrderAmount || 0) > basePrice) {
          throw new Error("PROMO_MIN_ORDER");
        }

        if (promo.type === "percentage") {
          promoDiscount = Math.round((basePrice * Number(promo.value || 0)) / 100);
        } else {
          promoDiscount = Number(promo.value || 0);
        }
        promoDiscount = Math.max(0, Math.min(promoDiscount, basePrice));

        transaction.update(promoDoc.ref, {
          usedCount: FieldValue.increment(1),
        });
      }

      const ref = db.collection("appointments").doc();
      const payload = {
        branch,
        service,
        package: packageName,
        price: basePrice,
        date,
        timeSlot,
        slotStart: String(timeSlot).split(" - ")[0] ? convertTo24h(String(timeSlot).split(" - ")[0]) : null,
        slotEnd: String(timeSlot).split(" - ")[1] ? convertTo24h(String(timeSlot).split(" - ")[1]) : null,
        customerName,
        customerEmail,
        customerPhone,
        carModel: carModel || "",
        carPlate: carPlate || "",
        message: message || "",
        promoCode: normalizedPromo,
        discount: promoDiscount,
        totalPaid: Number(totalPaid) || basePrice - promoDiscount,
        status: "confirmed",
        reminderSent: false,
        createdAt: FieldValue.serverTimestamp(),
      };

      transaction.set(ref, payload);
      return { id: ref.id, ...payload };
    });

    await Promise.allSettled([
      sendCustomerEmail(appointmentData),
      sendAdminEmail(appointmentData),
    ]);

    return NextResponse.json({ success: true, appointmentId: appointmentData.id });
  } catch (error) {
    if (error.message === "SLOT_TAKEN") {
      return NextResponse.json(
        {
          success: false,
          error: "This slot has already been booked. Please choose another slot.",
        },
        { status: 409 }
      );
    }
    if (error.message === "PROMO_INVALID") {
      return NextResponse.json(
        { success: false, error: "Invalid promo code." },
        { status: 400 }
      );
    }
    if (error.message === "PROMO_NOT_ACTIVE") {
      return NextResponse.json(
        { success: false, error: "Promo code is not active yet." },
        { status: 400 }
      );
    }
    if (error.message === "PROMO_EXPIRED") {
      return NextResponse.json(
        { success: false, error: "Promo code has expired." },
        { status: 400 }
      );
    }
    if (error.message === "PROMO_LIMIT") {
      return NextResponse.json(
        { success: false, error: "Promo code usage limit reached." },
        { status: 400 }
      );
    }
    if (error.message === "PROMO_MIN_ORDER") {
      return NextResponse.json(
        { success: false, error: "Order does not meet promo minimum amount." },
        { status: 400 }
      );
    }
    console.error("[appointments] create error", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

function convertTo24h(input) {
  const match = String(input).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const mins = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const status = searchParams.get("status");

    let query = db.collection("appointments");

    if (branch && branch !== "all") {
      query = query.where("branch", "==", branch);
    }
    if (status && status !== "all") {
      query = query.where("status", "==", status);
    }

    const snap = await query.orderBy("createdAt", "desc").limit(300).get();

    const appointments = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
      };
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("[appointments] list error", error);
    return NextResponse.json(
      { success: false, error: "Failed to load appointments" },
      { status: 500 }
    );
  }
}
