"use client";

import Link from "next/link";

export default function PayInstallmentsSection() {
  return (
    <section className="relative py-8 md:py-12 bg-[#010101]">
      {/* Desktop Layout */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-28">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#333] via-[#555] to-[#333]" />
          <div className="relative m-[1px] bg-[#0f0f0f] rounded-2xl p-6">
            <div className="flex items-center justify-between">
              {/* Left - KL Logo */}
              <div className="flex flex-col">
                <img src="/wrapping/kl-logo.png" alt="KL Tint Studio" className="h-14 object-contain" />
                <span className="text-[14px] text-gray-400 mt-1">Tint, Coating, PPF & Wrapping Services</span>
              </div>

              {/* Center - Pay in 3 */}
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-[72px] font-bold font-oswald text-white leading-none">PAY IN</span>
                  <span className="text-[72px] font-bold font-oswald text-[#d4af37] leading-none">3</span>
                </div>
                <span className="text-[36px] font-oswald text-white tracking-[0.3em]">INSTALLMENTS</span>
              </div>

              {/* Right - Payment logos */}
              <div className="flex items-center gap-4">
                <div className="px-5 py-3 bg-[#e63946] rounded-lg flex items-center justify-center">
                  <img src="/wrapping/boost-logo.png" alt="Boost" className="h-10 object-contain brightness-0 invert" />
                </div>
                <div className="px-5 py-3 bg-white rounded-lg flex items-center justify-center">
                  <img src="/wrapping/cimb-logo.png" alt="CIMB" className="h-10 object-contain" />
                </div>
                <div className="px-5 py-3 bg-[#db0011] rounded-lg flex items-center justify-center">
                  <img src="/wrapping/hsbc-logo.png" alt="HSBC" className="h-10 object-contain brightness-0 invert" />
                </div>
              </div>

              {/* Website */}
              <div className="text-[18px] text-gray-400">
                www.kltintstudio.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Two divisions */}
      <div className="md:hidden px-5">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#333] via-[#444] to-[#333]" />
          <div className="relative m-[1px] bg-[#0f0f0f] rounded-2xl p-6">
            {/* Upper Division - Text */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <img src="/wrapping/kl-logo.png" alt="KL Tint Studio" className="h-12 object-contain" />
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-[40px] font-bold font-oswald text-white leading-none">PAY IN</span>
                <span className="text-[40px] font-bold font-oswald text-[#d4af37] leading-none">3</span>
              </div>
              <span className="text-[20px] font-oswald text-white tracking-[0.25em]">INSTALLMENTS</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#555] to-transparent mb-6" />

            {/* Lower Division - Logos (significantly enlarged) */}
            <div className="flex items-center justify-center gap-5 mb-6">
              <div className="px-5 py-4 bg-[#e63946] rounded-xl flex items-center justify-center">
                <img src="/wrapping/boost-logo.png" alt="Boost" className="h-14 object-contain brightness-0 invert" />
              </div>
              <div className="px-5 py-4 bg-white rounded-xl flex items-center justify-center">
                <img src="/wrapping/cimb-logo.png" alt="CIMB" className="h-14 object-contain" />
              </div>
              <div className="px-5 py-4 bg-[#db0011] rounded-xl flex items-center justify-center">
                <img src="/wrapping/hsbc-logo.png" alt="HSBC" className="h-14 object-contain brightness-0 invert" />
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block w-full py-3 rounded-full text-center font-oswald font-semibold text-[16px] tracking-wider uppercase transition-all"
                style={{
                  background: "linear-gradient(114.31deg, #151000 -20.74%, #2C2405 55.8%, #634D05 106.02%)",
                  color: "#f6d0ab",
                  border: "2px solid",
                  borderImage: "linear-gradient(135.34deg, #856220 15.43%, #F4E683 34.91%, #BF923D 50.85%, #4E341B 68.56%, #F1EA82 86.26%) 1",
                }}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
