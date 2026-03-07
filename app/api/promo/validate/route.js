import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const { code, orderAmount } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Promo code is required" },
        { status: 400 }
      );
    }

    const snap = await db
      .collection("promoCodes")
      .where("code", "==", String(code).toUpperCase())
      .where("active", "==", true)
      .limit(1)
      .get();

    if (snap.empty) {
      return NextResponse.json({ valid: false, error: "Invalid promo code" });
    }

    const promo = snap.docs[0].data();
    const now = new Date();
    const amount = Number(orderAmount) || 0;

    const validFrom = promo.validFrom?.toDate ? promo.validFrom.toDate() : null;
    const validUntil = promo.validUntil?.toDate ? promo.validUntil.toDate() : null;

    if (validFrom && validFrom > now) {
      return NextResponse.json({ valid: false, error: "Promo code not active yet" });
    }
    if (validUntil && validUntil < now) {
      return NextResponse.json({ valid: false, error: "Promo code expired" });
    }
    if ((promo.usageLimit || 0) > 0 && (promo.usedCount || 0) >= promo.usageLimit) {
      return NextResponse.json({ valid: false, error: "Promo usage limit reached" });
    }
    if ((promo.minOrderAmount || 0) > amount) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order amount RM ${promo.minOrderAmount}`,
      });
    }

    let discount = 0;
    if (promo.type === "percentage") {
      discount = Math.round((amount * Number(promo.value || 0)) / 100);
    } else {
      discount = Number(promo.value || 0);
    }

    discount = Math.max(0, Math.min(discount, amount));

    return NextResponse.json({
      valid: true,
      code: promo.code,
      discount,
      type: promo.type,
      value: promo.value,
    });
  } catch (error) {
    console.error("[promo/validate] error", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate promo code" },
      { status: 500 }
    );
  }
}
