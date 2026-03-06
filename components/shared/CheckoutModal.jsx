"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function CheckoutModal({
  isOpen,
  onClose,
  onBack,
  packageData,
  bookingData,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  if (!isOpen) return null;

  const packagePrice = parseFloat(packageData.price);
  const subtotal = packagePrice;
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    // Simple promo code logic - you can customize this
    if (promoCode.toUpperCase() === "APPLY") {
      setDiscount(0);
    }
    // Add more promo codes as needed
  };

  const handleConfirm = async () => {
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          package: packageData.name,
          price: packageData.price,
          ...(bookingData || {}),
        }),
      });
    } catch {
      // Silently fail — still confirm booking
    }
    toast.success("Booking Confirmed! We will contact you soon.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-3xl p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6 mt-8">
          <div className="relative w-38 h-12">
            <Image
              src="/logo-white-new-1.png"
              alt="KL TINT"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Package Price */}
        <div className="mb-8">
          <h3 className="text-white text-sm mb-2">Package Price</h3>
          <div className="flex items-baseline gap-3">
            <span className="text-white text-4xl font-bold">
              RM {packagePrice}
            </span>
            {packageData.original && (
              <span className="text-gray-500 text-2xl line-through">
                {packageData.original}
              </span>
            )}
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <span className="text-gray-400 uppercase">
              {packageData.name} Package
            </span>
            <span className="text-white font-semibold">RM {packagePrice}</span>
          </div>

          {(packageData.uv ||
            packageData.irr ||
            packageData.tser ||
            packageData.film ||
            packageData.tech ||
            packageData.warranty) && (
            <div className="grid grid-cols-2 gap-3 pt-4 pb-4 border-b border-gray-700 text-sm">
              {packageData.uv && (
                <>
                  <div className="text-gray-400">UV</div>
                  <div className="text-white">{packageData.uv}</div>
                </>
              )}
              {packageData.irr && (
                <>
                  <div className="text-gray-400">IRR</div>
                  <div className="text-white">{packageData.irr}</div>
                </>
              )}
              {packageData.tser && (
                <>
                  <div className="text-gray-400">TSER</div>
                  <div className="text-white">{packageData.tser}</div>
                </>
              )}
              {packageData.film && (
                <>
                  <div className="text-gray-400">Film</div>
                  <div className="text-white">{packageData.film}</div>
                </>
              )}
              {packageData.tech && (
                <>
                  <div className="text-gray-400">Technology</div>
                  <div className="text-white">{packageData.tech}</div>
                </>
              )}
              {packageData.warranty && (
                <>
                  <div className="text-gray-400">Warranty</div>
                  <div className="text-white">{packageData.warranty}</div>
                </>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <span className="text-gray-400">Sub total</span>
            <span className="text-white font-semibold">
              RM {subtotal.toFixed(2)}
            </span>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2 pb-4 border-b border-gray-700">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Add promotion code APPLY"
              className="flex-1 bg-[#252525] text-white border-none rounded px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
            />
            <span className="text-white font-semibold min-w-[80px] text-right py-2">
              RM {discount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-white text-xl font-bold">Total</span>
          <span className="text-white text-xl font-bold">
            RM {total.toFixed(2)}
          </span>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f5d0ab] transform transition-transform group-hover:scale-105" />
          <div className="absolute top-0 right-0 w-32 h-full bg-black/20 transform skew-x-[-20deg] translate-x-8" />
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex gap-1">
            <div className="w-8 h-0.5 bg-black/30 transform -rotate-45 origin-right" />
            <div className="w-8 h-0.5 bg-black/30" />
            <div className="w-8 h-0.5 bg-black/30 transform rotate-45 origin-left" />
          </div>
          <span className="relative block text-black font-bold text-lg py-4 tracking-wide">
            Confirm Now
          </span>
        </button>
      </div>
    </div>
  );
}
