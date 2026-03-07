import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

function isAdmin(request) {
  return request.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const snap = await db.collection("promoCodes").orderBy("createdAt", "desc").get();
    const promos = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        validFrom: data.validFrom?.toDate?.()?.toISOString?.() || null,
        validUntil: data.validUntil?.toDate?.()?.toISOString?.() || null,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
      };
    });

    return NextResponse.json({ success: true, promos });
  } catch (error) {
    console.error("[promo] list error", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch promo codes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      code,
      type,
      value,
      usageLimit,
      minOrderAmount,
      validFrom,
      validUntil,
    } = body;

    if (!code || !type || value === undefined || value === "") {
      return NextResponse.json(
        { success: false, error: "code, type and value are required" },
        { status: 400 }
      );
    }

    const normalizedCode = String(code).toUpperCase().trim();
    const existing = await db
      .collection("promoCodes")
      .where("code", "==", normalizedCode)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { success: false, error: "Promo code already exists" },
        { status: 409 }
      );
    }

    const payload = {
      code: normalizedCode,
      type: type === "fixed" ? "fixed" : "percentage",
      value: Number(value),
      active: true,
      usageLimit: Number(usageLimit) || 0,
      usedCount: 0,
      minOrderAmount: Number(minOrderAmount) || 0,
      validFrom: validFrom ? Timestamp.fromDate(new Date(validFrom)) : null,
      validUntil: validUntil ? Timestamp.fromDate(new Date(validUntil)) : null,
      createdAt: FieldValue.serverTimestamp(),
    };

    const ref = await db.collection("promoCodes").add(payload);
    return NextResponse.json({ success: true, id: ref.id });
  } catch (error) {
    console.error("[promo] create error", error);
    return NextResponse.json(
      { success: false, error: "Failed to create promo" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, active } = await request.json();
    if (!id || typeof active !== "boolean") {
      return NextResponse.json(
        { success: false, error: "id and active are required" },
        { status: 400 }
      );
    }

    await db.collection("promoCodes").doc(id).update({ active });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[promo] update error", error);
    return NextResponse.json(
      { success: false, error: "Failed to update promo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "id is required" },
        { status: 400 }
      );
    }

    await db.collection("promoCodes").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[promo] delete error", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete promo" },
      { status: 500 }
    );
  }
}
