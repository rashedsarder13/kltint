"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

const slides = [
  {
    id: 1,
    title: "Why Need the Coating Service?",
    subtitle: "Paint Losing Its Shine? Protect It with\nAdvanced Car Coating",
    benefits: [
      {
        title: "Environmental etching",
        desc: "Bird droppings, sap, and acid rain leave permanent marks.",
        icon: "/coating/icon1.png",
      },
      {
        title: "Swirls & fine scratches",
        desc: "Automatic washes and dust cause micro-abrasions that kill gloss.",
        icon: "/coating/icon2.png",
      },
      {
        title: "Water spots & mineral stains",
        desc: "Hard water creates etchings that won't polish away.",
        icon: "/coating/icon3.png",
      },
      {
        title: "UV fading & oxidation",
        desc: "Sunlight weakens clear coat, dulling your paint.",
        icon: "/coating/icon4.png",
      },
    ],
    cta: "Explore Packages",
    image: "/coating/slide1-img.png",
  },
  {
    id: 2,
    title: "Why Need the Coating Service?",
    subtitle: "Nano-Ceramic & Graphene\nCoating Armor",
    benefits: [
      {
        title: "Multi-layer defense",
        desc: "Up to five layers for depth, durability, and shine.",
        icon: "/coating/icon9.png",
      },
      {
        title: "Hydrophobic surface",
        desc: "Water, dirt, and mud bead off—cleaning becomes effortless.",
        icon: "/coating/icon10.png",
      },
      {
        title: "Chemical barrier",
        desc: "Stops acid rain, road salts, and industrial fallout from bonding to paint.",
        icon: "/coating/icon11.png",
      },
      {
        title: "Extreme hardness protection",
        desc: "Defends against micro-scratches and wash swirls.",
        icon: "/coating/icon12.png",
      },
    ],
    cta: "Book Your Free Gloss Demo",
    image: "/coating/slide3-img.png",
  },
  {
    id: 3,
    title: "Why Need the Coating Service?",
    subtitle: "Guaranteed Quality &\nTransparent Pricing",
    benefits: [
      {
        title: "Warranty up to 5 years",
        desc: "Covers fading, peeling, and water-repellency.",
        icon: "/coating/icon5.png",
      },
      {
        title: "Straightforward pricing",
        desc: "From entry-level nano protection to advanced graphene & diamond packages.",
        icon: "/coating/icon6.png",
      },
      {
        title: "Free aftercare kit included",
        desc: "pH-neutral shampoo & microfiber cloth for easy upkeep.",
        icon: "/coating/icon7.png",
      },
      {
        title: "Lab-certified formulas",
        desc: "Tested for hardness, UV resistance, and hydrophobic effect.",
        icon: "/coating/icon8.png",
      },
    ],
    cta: "View All Packages",
    image: "/coating/slide1-img.png",
  },
  {
    id: 4,
    title: "Why Need the Coating Service?",
    subtitle: "Flawless Application\nin Just 4 Hours",
    benefits: [
      {
        title: "Complete surface prep",
        desc: "Iron removal, clay bar, and polishing before coating.",
        icon: "/coating/icon13.png",
      },
      {
        title: "Same-day service",
        desc: "Full car coating is targeted within 24–48 hours (vehicle size dependent).",
        icon: "/coating/icon14.png",
      },
      {
        title: "Free yearly checks included",
        desc: "Keep your coating at peak performance with scheduled inspections.",
        icon: "/coating/icon15.png",
      },
      {
        title: "Certified technicians",
        desc: "Trained for seamless application and perfect curing.",
        icon: "/coating/icon16.png",
      },
    ],
    cta: "Schedule Coating Appointment",
    image: "/coating/slide2-img.png",
  },
];

export default function CoatingCarousel() {
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

    if (cta.includes("book") || cta.includes("schedule")) {
      router.push("/contact");
      return;
    }

    if (
      cta.includes("explore") ||
      cta.includes("package") ||
      cta.includes("view")
    ) {
      if (
        typeof window !== "undefined" &&
        (window.location.pathname === "/coating" ||
          window.location.pathname === "/coating/")
      ) {
        const el = document.getElementById("coating-packages");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/coating#coating-packages");
        setTimeout(() => {
          const el = document.getElementById("coating-packages");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      return;
    }

    router.push("/contact");
  };

  return (
    <section
      className="relative w-full bg-[#010101] overflow-hidden coating-carousel-section"
      style={{ height: "1081px" }}
    >
      {/* Main background car image */}
      <div className="absolute inset-0 z-0 coating-bg-car">
        <Image
          src="/coating/car-bg.png"
          width={1440}
          height={1081}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slide-specific car image - right side */}
      <div
        key={`image-${current}`}
        className="absolute z-20 coating-slide-car animate-slide-in-right"
        style={{
          width: "900px",
          height: "650px",
          top: "360px",
          right: 0,
        }}
      >
        <Image
          src={slide.image}
          alt=""
          width={1000}
          height={700}
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Bottom gradient shape */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          top: "auto",
          width: "1440px",
          height: "267px",
          background:
            "linear-gradient(180deg, rgba(5, 5, 8, 0) 11.61%, rgba(10, 10, 10, 0.48) 60.01%, #010101 78.7%)",
        }}
      />

      {/* Left-to-right gradient overlay (dark on left, transparent on right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010101] via-[#010101]/85 to-[#010101]/30" />
      {/* Top & bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-transparent to-[#010101]" />

      {/* Content */}
      <div
        key={`content-${current}`}
        className="relative z-10 w-full h-full flex flex-col justify-center md:px-[112px] coating-content animate-slide-in-left"
        style={{ minHeight: "1080px", left: "112px" }}
      >
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
            {slide.title}
          </h3>
        </div>

        {/* Main subtitle */}
        <h1
          className="text-[32px] md:text-[56px] lg:text-[64px] font-bold font-oswald uppercase text-transparent  bg-clip-text leading-[1.1] tracking-[0.08em] mb-6 md:mb-8 whitespace-pre-line"
          style={{
            width: "1152px",
            backgroundImage:
              "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {slide.subtitle}
        </h1>
        <div className="max-w-[600px]">
          {/* Small title with blue glow */}

          {/* Benefits list */}
          <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
            {slide.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-5">
                {/* Icon circle */}
                <div className="relative flex-shrink-0 w-[66px] h-[66px]">
                  <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-gray-600" />
                  <div className="absolute top-[5.78px] left-[5.78px] w-[54.45px] h-[54.45px] rounded-full bg-[#070205] flex items-center justify-center overflow-hidden">
                    <img
                      src={b.icon}
                      alt={b.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
                {/* Text */}
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
          <div className="relative inline-block explore-btn">
            <Button
              text={slide.cta}
              width={400}
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

      {/* Page counter – bottom right */}
      <div className="absolute bottom-12 md:bottom-16 right-4 md:right-[112px] z-10 flex items-baseline gap-1 coating-page-counter">
        <span className="text-[40px] md:text-[64px] font-bold font-oswald text-transparent bg-gradient-to-r from-[#7aa5ac] via-[#fff] to-[#7aa5ac] bg-clip-text leading-[48px] md:leading-[76px]">
          {current + 1}
        </span>
        <span className="text-[24px] md:text-[32px] font-semibold font-oswald text-[#383d4b] leading-[32px] md:leading-[48px]">
          |4
        </span>
      </div>

      {/* Navigation dots – bottom center */}
      <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 coating-nav-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 md:w-8 h-2 md:h-2.5 bg-gradient-to-r from-[#d4af37] to-[#ffebb1] shadow-md shadow-[#d4af37]/40"
                : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors coating-arrow-left"
        style={{ pointerEvents: "auto" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          className="md:w-[18px] md:h-[18px]"
        >
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
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors coating-arrow-right"
        style={{ pointerEvents: "auto" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          className="md:w-[18px] md:h-[18px]"
        >
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
          .coating-carousel-section {
            height: auto !important;
            min-height: 600px !important;
          }

          .coating-bg-car {
            height: 600px !important;
          }

          .coating-bg-car img {
            object-position: center !important;
          }

          .coating-slide-car {
            width: 100% !important;
            height: 300px !important;
            top: auto !important;
            bottom: 100px !important;
            right: 0 !important;
            left: 0 !important;
            z-index: 5 !important;
            opacity: 0.9 !important;
          }

          .coating-content {
            padding-left: 0px !important;
            padding-right: 0px !important;
            padding-top: 60px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
            left: 8px !important; /* remove inherited left offset on mobile */
          }

          .coating-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
          }

          .coating-content h1 {
            font-size: 28px !important;
            line-height: 1.2 !important;
            margin-bottom: 16px !important;
            width: 100% !important;
          }

          .coating-content .space-y-4 {
            gap: 12px !important;
          }

          .coating-content .space-y-4 > div {
            margin-top: 0 !important;
            margin-bottom: 12px !important;
          }

          .coating-content .space-y-4 h4 {
            font-size: 18px !important;
            line-height: 26px !important;
          }

          .coating-content .space-y-4 p {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          .coating-content button img {
            width: 240px !important;
            height: 62px !important;
          }

          .coating-page-counter {
            bottom: 60px !important;
            right: 20px !important;
          }

          .coating-page-counter span:first-child {
            font-size: 40px !important;
            line-height: 48px !important;
          }

          .coating-page-counter span:last-child {
            font-size: 24px !important;
            line-height: 32px !important;
          }

          .coating-nav-dots {
            bottom: 20px !important;
          }

          .coating-arrow-left {
            left: 12px !important;
            width: 36px !important;
            height: 36px !important;
            z-index: 30 !important;
            pointer-events: auto !important;
          }

          .coating-arrow-right {
            right: 12px !important;
            width: 36px !important;
            height: 36px !important;
            z-index: 30 !important;
            pointer-events: auto !important;
          }

          .coating-arrow-left svg,
          .coating-arrow-right svg {
            width: 14px !important;
            height: 14px !important;
          }

          .explore-btn {
            top: 10px !important;
            height: 60px !important;
            width: 390px !important;
            bottom: 20px !important;
            font-size: 12px !important;
            line-height: 16px !important;
            left: 0px !important;
          }
        }
      `}</style>
    </section>
  );
}
