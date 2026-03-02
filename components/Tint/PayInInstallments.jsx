"use client";

export default function PayInInstallments() {
  return (
    <section className="relative py-16 overflow-hidden bg-[#0A0A0C]">
      {/* Brand-strip background image */}
      <div className="absolute inset-0">
        <img src="/tint/brand-strip.png" alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/70 to-[#0A0A0C]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px]">
        <div className="max-w-[900px] mx-auto bg-[#0F1B32]/60 rounded-2xl p-8 lg:p-10 border border-white/8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left – logo + text */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                <img src="/tint/brand-logo-kl.png" alt="KL Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-[28px] font-bold font-oswald text-white leading-tight">
                  PAY IN <span className="text-[#FFB800]">3</span>
                </h3>
                <p className="text-[13px] text-[#a9a9a9] uppercase tracking-wider font-oswald">
                  Installments
                </p>
              </div>
            </div>

            {/* Right – payment provider logos */}
            <div className="flex items-center gap-3">
              {["/tint/pkg-logo1.png", "/tint/pkg-logo2.png", "/tint/pkg-logo3.png"].map((src, i) => (
                <div key={i} className="w-20 h-12 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
                  <img src={src} alt="Payment provider" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Bottom info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[15px] text-[#a9a9a9]">
              Split your payment into 3 interest-free installments
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-[#FFB800] to-[#FF6B00] rounded-full text-[14px] font-semibold font-oswald text-white uppercase tracking-[0.06em] hover:shadow-lg hover:shadow-[#FFB800]/40 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
