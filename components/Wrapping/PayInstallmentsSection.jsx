"use client";

export default function PayInstallmentsSection() {
  return (
    <section className="relative py-8 bg-[#010101]">
      <div className="max-w-360 mx-auto px-28">
        {/* Dark card with gradient border */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Border gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#333] via-[#555] to-[#333]" />

          {/* Inner content */}
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
    </section>
  );
}
