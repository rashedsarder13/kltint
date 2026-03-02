"use client";

import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative h-screen lg:h-[130vh] overflow-hidden bg-[#0A0A0C]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/blog/blogherobg.svg')" }}
      />

      {/* Background shapes - Top and Bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/combo/combo-bg-shape1.png')" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/combo/combo-bg-shape2.png')" }}
      />

      {/* Main content container */}
      <div className="relative z-10 h-full flex items-start pt-24 md:pt-20 lg:pt-24 xl:pt-32 px-4 md:px-8 lg:px-12 blog-hero-content">
        <div className="w-full max-w-7xl mx-auto flex items-start gap-3 md:gap-6 lg:gap-8 mt-4 md:mt-8 lg:mt-10">
          {/* Vertical accent line with dot */}
          <div className="flex flex-col items-center shrink-0 blog-accent-line">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white" />
            <div className="w-0.5 h-8 md:h-16 lg:h-20 xl:h-26 bg-linear-to-b from-white via-[#c0c0c0] to-[#c0c0c0]" />
            <div className="w-0.5 h-20 md:h-36 lg:h-40 xl:h-44 bg-[#1a1a1a]" />
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold font-oswald leading-[1.2] mb-3 md:mb-4 lg:mb-5 gradient-title">
              Learn How to Protect & Upgrade Your Car
            </h1>
          </div>
        </div>
      </div>

      {/* Social Media Strip - Right Side */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 md:right-6 lg:right-10 flex-col items-center gap-4 z-10">
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
        <div className="w-px h-10 bg-linear-to-b from-white/50 to-white/20" />
        <span
          className="text-white/70 text-[14px] font-oswald tracking-[0.15em] uppercase"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Contact
        </span>
      </div>

      {/* Bottom Arrow */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src="/combo/bottom-arrow.png"
          width={104}
          height={104}
          alt="Scroll Down"
          className="animate-bounce h-16 w-16 md:h-20 md:w-20 lg:h-26 lg:w-26"
        />
      </div>

      <style jsx>{`
        .gradient-title {
          background: linear-gradient(
            92.6deg,
            #f2f2f2 16.14%,
            #ffffff 39.21%,
            #d4d2d2 56.82%,
            #ffffff 78.04%,
            #bab8b8 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .description-text {
          background: linear-gradient(
            294.32deg,
            #a8a8a6 29.58%,
            #f9f8f6 48.13%,
            #d4d4d4 61.6%,
            #7f7f7f 86.45%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 767px) {
          section {
            height: auto !important;
            min-height: 480px !important;
          }

          .blog-hero-content {
            padding-top: 80px !important;
            padding-left: 10px !important;
            padding-right: 16px !important;
            justify-content: center !important;
            align-items: center !important;
          }

          /* Hide vertical accent line on mobile */
          .blog-accent-line {
            display: none !important;
          }

          .gradient-title {
            font-size: 32px !important;
            line-height: 42px !important;
            text-align: center !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
