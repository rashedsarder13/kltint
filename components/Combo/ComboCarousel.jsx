"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

const slides = [
  {
    id: 1,
    badge: "Why Need the combo package?",
    title: "All-in-One Vehicle Protection: Tint, Coating, & PPF in One Package",
    cta: "Explore Combo Deals",
    image: "/combo/slide1.png",
    benefits: [
      {
        icon: "/combo/icon1.png",
        title: "One-stop service",
        desc: "No more juggling multiple shops—we handle everything.",
      },
      {
        icon: "/combo/icon2.png",
        title: "Seamless results",
        desc: "Films, coatings, and PPFs installed together for perfect synergy.",
      },
      {
        icon: "/combo/icon3.png",
        title: "Long-term assurance",
        desc: "Backed by multi-year warranties across all services",
      },
      {
        icon: "/combo/icon4.png",
        title: "Save more",
        desc: "Bundled pricing gives you premium protection at the best value.",
      },
    ],
  },
  {
    id: 2,
    badge: "Why Need the combo package?",
    title: "What's Inside Our Combo Packages?",
    cta: "See Package Options",
    image: "/combo/slide2.png",
    benefits: [
      {
        icon: "/combo/icon5.png",
        title: "Nano Ceramic Coating",
        desc: "Multi-layer gloss & hydrophobic protection for a showroom shine.",
      },
      {
        icon: "/combo/icon6.png",
        title: "Paint Protection Film (PPF)",
        desc: "Self-healing TPU film guards against chips, scratches & stains.",
      },
      {
        icon: "/combo/icon7.png",
        title: "Long-lasting Durability",
        desc: "Safeguard your car's exterior from daily wear and tear.",
      },
      {
        icon: "/combo/icon8.png",
        title: "Premium Window Tinting",
        desc: "Heat rejection up to 99%, UV protection, JPJ-compliant shades.",
      },
    ],
  },
];

export default function ComboCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const router = useRouter();
  const handleCTAClick = () => {
    const cta = (slide?.cta || "").toLowerCase();
    if (cta.includes("book")) {
      router.push("/contact");
      return;
    }

    if (
      cta.includes("explore") ||
      cta.includes("package") ||
      cta.includes("option")
    ) {
      if (
        typeof window !== "undefined" &&
        (window.location.pathname === "/combo" ||
          window.location.pathname === "/combo/")
      ) {
        const el = document.getElementById("combo-options");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/combo#combo-options");
        setTimeout(() => {
          const el = document.getElementById("combo-options");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      return;
    }

    router.push("/contact");
  };

  return (
    <section
      className="relative w-full bg-[#010101] overflow-hidden combo-carousel-section"
      style={{
        height: "1033px",
      }}
    >
      {/* Main background car image */}
      <div className="absolute inset-0 z-0 combo-bg-car">
        <Image
          src="/tint/car-bg.png"
          width={1440}
          height={1080}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slide-specific car image - right side */}
      <div
        key={`image-${current}`}
        className="absolute z-20 combo-slide-car animate-slide-in-right"
        style={{
          width: "1000px",
          height: "692px",
          left: "895px",
          top: "240px",
          right: 0,
        }}
      >
        <Image
          src={slide.image}
          width={1000}
          height={692}
          alt=""
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-5 bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/40 to-transparent" />
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-[#0A0A0C]/20 via-transparent to-transparent" />

      {/* Bottom gradient shape */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: "1440px",
          height: "267px",
          background:
            "linear-gradient(180deg, rgba(5, 5, 8, 0) 11.61%, rgba(10, 10, 10, 0.48) 60.01%, #010101 78.7%)",
        }}
      />

      {/* Content */}
      <div
        key={`content-${current}`}
        className="relative z-10 w-full h-full flex flex-col justify-center px-[112px] combo-content animate-slide-in-left"
        style={{ minHeight: "1080px" }}
      >
        <div className="max-w-[600px]">
          {/* Small title with blue glow */}
          <div className="relative mb-5">
            {/* Blue ellipse shadow behind text */}
            <div
              className="absolute"
              style={{
                width: "457px",
                height: "34px",
                background: "#032EBD",
                borderRadius: "50%",
                filter: "blur(40px)",
                opacity: 0.8,
                zIndex: 0,
                top: "50%",
                left: "0",
                transform: "translateY(-30%)",
              }}
            />
            <h3 className="text-[22px] font-medium font-oswald text-transparent bg-gradient-to-r from-[#CCE8FE] via-[#8489F5] to-[#B591E9] bg-clip-text capitalize tracking-[0.005em] leading-[31px] relative z-10">
              {slide.badge}
            </h3>
          </div>

          {/* Main subtitle */}
          <h1
            className="text-[52px] lg:text-[60px] font-bold font-oswald uppercase text-transparent bg-clip-text leading-[1.1] tracking-[0.06em] mb-16 whitespace-pre-line"
            style={{
              width: "1152px",
              backgroundImage:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {slide.title}
          </h1>

          {/* Benefits list */}
          <div className="space-y-5 ">
            {slide.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="relative flex-shrink-0 w-[66px] h-[66px]">
                  <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-gray-600" />
                  <div className="absolute top-[5.78px] left-[5.78px] w-[54.45px] h-[54.45px] rounded-full bg-[#070205] flex items-center justify-center overflow-hidden">
                    <Image
                      src={b.icon}
                      width={66}
                      height={66}
                      alt={b.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4
                    className="text-[28px] font-medium font-oswald text-transparent bg-clip-text capitalize leading-[40px] mb-1"
                    style={{
                      backgroundImage:
                        "linear-gradient(90.29deg, #9E8976 -48.84%, #7A5E50 -9.49%, #C6A488 17.07%, #F6D0AB 33.9%, #9D774E 64.26%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "0.5%",
                    }}
                  >
                    {b.title}
                  </h4>
                  <p
                    className="text-[18px] font-medium leading-[28px] max-w-[440px]"
                    style={{
                      color: "#A9A9A9",
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      letterSpacing: "0.2%",
                    }}
                  >
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative inline-block explore-btn mt-10">
            <Button
              text={slide.cta}
              width={420}
              height={68}
              className="hover:brightness-110 transition-all"
              role="button"
              tabIndex={0}
              onClick={handleCTAClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCTAClick();
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 combo-nav-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-gradient-to-r from-[#d4af37] to-[#ffebb1] shadow-md shadow-[#d4af37]/40"
                : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors combo-arrow-left"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 4L6 9L11 14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors combo-arrow-right"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4L12 9L7 14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        @media (max-width: 767px) {
          .combo-carousel-section {
            height: auto !important;
            min-height: 600px !important;
          }

          .combo-bg-car {
            height: 600px !important;
          }

          .combo-bg-car img {
            object-position: center !important;
          }

          .combo-slide-car {
            width: 100% !important;
            height: 300px !important;
            top: auto !important;
            bottom: 100px !important;
            right: 0 !important;
            left: 0 !important;
            z-index: 5 !important;
          }

          .combo-content {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 60px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
          }

          .combo-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
          }

          .combo-content h1 {
            font-size: 28px !important;
            line-height: 1.2 !important;
            margin-bottom: 16px !important;
            width: 100% !important;
          }

          .combo-content .space-y-5 {
            gap: 12px !important;
          }

          .combo-content .space-y-5 > div {
            margin-top: 0 !important;
            margin-bottom: 12px !important;
          }

          .combo-content .space-y-5 h4 {
            font-size: 18px !important;
            line-height: 26px !important;
          }

          .combo-content .space-y-5 p {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          .combo-content button img {
            width: 240px !important;
            height: 62px !important;
          }

          .combo-page-counter {
            bottom: 60px !important;
            right: 20px !important;
          }

          .combo-page-counter span:first-child {
            font-size: 40px !important;
            line-height: 48px !important;
          }

          .combo-page-counter span:last-child {
            font-size: 24px !important;
            line-height: 32px !important;
          }

          .combo-nav-dots {
            bottom: 20px !important;
          }

          .combo-arrow-left {
            left: 12px !important;
            width: 36px !important;
            height: 36px !important;
          }

          .combo-arrow-right {
            right: 12px !important;
            width: 36px !important;
            height: 36px !important;
          }

          .combo-arrow-left svg,
          .combo-arrow-right svg {
            width: 14px !important;
            height: 14px !important;
          }

          .explore-btn {
            bottom: 10px !important;
            left: -20px !important;
            right: 2px !important;
          }
        }
      `}</style>
    </section>
  );
}
