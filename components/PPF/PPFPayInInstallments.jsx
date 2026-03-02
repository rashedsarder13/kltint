"use client";

export default function PPFPayInInstallments() {
  return (
    <section className="relative py-10 overflow-hidden bg-[#0A0A0C]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px]">
        {/* Single horizontal strip card */}
        <div className="relative bg-[#0F1B32]/50 border border-white/8 rounded-xl overflow-hidden">
          {/* Subtle bg texture */}
          <div className="absolute inset-0">
            <img src="/ppf/car-bg.png" alt="" className="w-full h-full object-cover opacity-10" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-8 py-6">
            {/* Left — KL logo + services */}
            <div className="flex items-center gap-4">
              <img src="/ppf/brand-logo-kl.png" alt="KL Tint Studio" className="h-14 w-auto object-contain" />
              <div>
                <p className="text-[13px] text-[#a9a9a9] font-oswald">Tint, Coating, PPF & Wrapping Services</p>
              </div>
            </div>

            {/* Center — PAY IN 3 INSTALLMENTS */}
            <div className="text-center">
              <p className="text-[28px] font-bold font-oswald text-white uppercase leading-tight">
                PAY IN <span className="text-[36px] text-[#FFB800]">3</span>
              </p>
              <p className="text-[14px] text-[#a9a9a9] uppercase tracking-[0.2em] font-oswald">
                Installments
              </p>
            </div>

            {/* Right — bank logos + url */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                {["/ppf/pkg-logo1.png", "/ppf/pkg-logo2.png", "/ppf/pkg-logo3.png"].map((src, i) => (
                  <div key={i} className="w-24 h-10 bg-white rounded-md overflow-hidden flex items-center justify-center">
                    <img src={src} alt="Payment provider" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#6b7280] font-oswald">www.kltintstudio.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
