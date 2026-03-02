"use client";

import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative w-full h-screen lg:h-[130vh] overflow-hidden bg-[#0A0A0C] banner-section">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat banner-bg h-110 md:h-auto"
        style={{ backgroundImage: "url('/home/BG.png')" }}
      />

      {/* Main content - above the car */}
      <div className="relative z-10 h-full flex flex-col items-center pt-28 md:pt-36 lg:pt-40 px-4 banner-title">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium font-oswald capitalize text-center leading-10 tracking-[0.005em] gradient-title">
          YOUR CAR IS NOW SUPER
        </h3>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[84px] font-bold font-oswald uppercase text-center leading-19 tracking-[0.005em] mt-4.5 gradient-title">
          ENHANCE
        </h1>
      </div>

      {/* Social Media Strip - Right Side */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 md:right-6 lg:right-10 flex-col items-center gap-4 z-10 social-strip">
        <div className="w-px h-10 bg-linear-to-b from-transparent via-white/30 to-white/50" />
        <a
          href="https://wa.me/60167554178"
          aria-label="WhatsApp to +60 167554178"
          title="WhatsApp"
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/whatsapp.svg"
            width={24}
            height={24}
            alt="WhatsApp"
            className="w-5 h-5 lg:w-6 lg:h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>

        <a
          href="https://www.facebook.com/Kltintstudio"
          aria-label="Facebook - Kltintstudio"
          title="Facebook"
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/facebook.svg"
            width={24}
            height={24}
            alt="Facebook"
            className="w-5 h-5 lg:w-6 lg:h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>

        <a
          href="mailto:hello@kltintstudio.com"
          aria-label="Email - hello@kltintstudio.com"
          title="Email"
          className="p-2"
        >
          <Image
            src="/email.svg"
            width={24}
            height={24}
            alt="Email"
            className="w-5 h-5 lg:w-6 lg:h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>

        <a
          href="tel:+60167554178"
          aria-label="Call +60 167554178"
          title="Call"
          className="p-2"
        >
          <Image
            src="/map.svg"
            width={24}
            height={24}
            alt="Call"
            className="w-5 h-5 lg:w-6 lg:h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Instagram (additional) */}
        <a
          href="https://www.instagram.com/kltintstudio/"
          aria-label="Instagram - kltintstudio"
          title="Instagram"
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram.svg"
            width={24}
            height={24}
            alt="Instagram"
            className="w-5 h-5 lg:w-6 lg:h-6 opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>
        {/* Vertical line */}
        <div className="w-px h-10 bg-linear-to-b from-white/50 to-white/20" />
        {/* Contact text - vertical */}
        <span
          className="text-white/70 text-[14px] font-oswald tracking-[0.15em] uppercase"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Contact
        </span>
      </div>

      {/* Bottom Arrow */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 banner-arrow">
        <Image
          src="/home/down-arrow-home.png"
          width={104}
          height={104}
          alt="Scroll Down"
          className="animate-bounce h-16 w-16 md:h-20 md:w-20 lg:h-26 lg:w-26"
        />
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .banner-section {
            height: auto !important;
            min-height: 440px !important;
          }

          .banner-bg {
            background-position: top center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            height: 440px !important;
            top: 0 !important;
            bottom: auto !important;
          }

          .banner-title {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .banner-title h3 {
            font-size: 18px !important;
          }
          .banner-title h1 {
            font-size: 44px !important;
            line-height: 1.05 !important;
            margin-top: -6px !important;
          }

          .social-strip {
            display: flex !important;
            right: 6px !important;
            top: 85% !important;
            transform: translateY(-50%) !important;
            flex-direction: column !important;
            gap: 3px !important;
            z-index: 25 !important;
          }

          /* Smaller icon sizes on mobile */
          .social-strip img,
          .social-strip a img {
            width: 20px !important;
            height: 20px !important;
          }

          /* Slightly smaller vertical contact label */
          .social-strip span {
            font-size: 11px !important;
            margin-top: 4px !important;
          }

          .banner-arrow {
            bottom: 16px !important;
          }
          .banner-arrow img {
            width: 56px !important;
            height: 56px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
