"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

const slides = [
  {
    id: 1,
    title: "Why Need The PPF Service?",
    subtitle: "Stop Chips, Swirls & Stains Before\nThey HaPPFn",
    benefits: [
      {
        title: "Stone Chips & Road Rash",
        desc: "PPF shields your car from grit, pebbles, and road debris that cause chips and scratches.",
        icon: "/ppf/icon1.png",
      },
      {
        title: "Droppings & Sap Damage",
        desc: "Bug acids, bird lime, and tree sap won't etch into your paint when protected with PPF.",
        icon: "/ppf/icon2.png",
      },
      {
        title: "Swirls & Scratches",
        desc: "PPF prevents swirl marks and micro-marring from automatic washes and dust.",
        icon: "/ppf/icon3.png",
      },
      {
        title: "Weather Protection",
        desc: "Designed for Malaysia's heat and rain, PPF stops oxidation, watermarks, and fading.",
        icon: "/ppf/icon4.png",
      },
    ],
    cta: "Explore Packages",
    image: "/ppf/slide1.png",
  },
  {
    id: 2,
    title: "Why Need The PPF Service?",
    subtitle: "Paint Protection Film—Invisible\nArmor, Daily Confidence",
    benefits: [
      {
        title: "Self-Healing Topcoat",
        desc: "Light swirls and scuffs disaPPFar with engine heat, sun or warm water—no polishing required.",
        icon: "/ppf/icon5.png",
      },
      {
        title: "Built For Our Climate",
        desc: "SGS-verified materials and construction tailored for Malaysia's heat, humidity and sudden downpours.",
        icon: "/ppf/icon6.png",
      },
      {
        title: "Super Hydrophobic Surface",
        desc: "Water and grime bead away, helping prevent watermarks and making washes quicker.",
        icon: "/ppf/icon7.png",
      },
      {
        title: "Impact & Tear Resistance",
        desc: "Quality films use high-tensile TPU to shrug off pebble strikes and daily abrasion.",
        icon: "/ppf/icon8.png",
      },
    ],
    cta: "See PPF In Action",
    image: "/ppf/slide2.png",
  },
  {
    id: 3,
    title: "Why Need The PPF Service?",
    subtitle: "Packages & Warranty—Clear\nChoices, No Guesswork",
    benefits: [
      {
        title: "Full-Front",
        desc: "Bumper, full bonnet & full fenders, lights, mirrors: most common daily-driver upgrade.",
        icon: "/ppf/icon1.png",
      },
      {
        title: "Full Car PPF",
        desc: "Complete coverage on every painted panel for maximum preservation and a factory-fresh look.",
        icon: "/ppf/icon2.png",
      },
      {
        title: "Warranty & Value",
        desc: "Up to 5-year coverage on our full-car PPF deals (yellowing, cracking, adhesive failure).",
        icon: "/ppf/icon3.png",
      },
      {
        title: "Transparent Pricing",
        desc: "We frequently run Full-Front promos and seasonal full-car bundles; ask for current offers.",
        icon: "/ppf/icon4.png",
      },
    ],
    cta: "View PPF Prices",
    image: "/ppf/slide3.png",
  },
  {
    id: 4,
    title: "Why Need The PPF Service?",
    subtitle: "Installation Excellence—Finished\nRight, The First Time",
    benefits: [
      {
        title: "Prep That Matters",
        desc: "Iron removal, clay deacon, panel wipe for a surgically clean surface.",
        icon: "/ppf/icon1.png",
      },
      {
        title: "Template + Edge-Wrap Craft",
        desc: "Pre-cut patterns plus hand finishing for cleaner seams and better protection.",
        icon: "/ppf/icon2.png",
      },
      {
        title: "Timeframes You Can Plan Around",
        desc: "Full Car PPF is targeted within 24–48 hours (vehicle size/condition dependent).",
        icon: "/ppf/icon3.png",
      },
      {
        title: "Aftercare Walkthrough",
        desc: "Safe wash technique and edge care to keep film pristine.",
        icon: "/ppf/icon4.png",
      },
    ],
    cta: "Book PPF Consultation",
    image: "/ppf/slide4.png",
  },
];

export default function PPFCarousel() {
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
      cta.includes("price") ||
      cta.includes("view")
    ) {
      if (
        typeof window !== "undefined" &&
        (window.location.pathname === "/ppf" ||
          window.location.pathname === "/ppf/")
      ) {
        const el = document.getElementById("ppf-options");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/ppf#ppf-options");
        setTimeout(() => {
          const el = document.getElementById("ppf-options");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      return;
    }

    router.push("/contact");
  };

  return (
    <section
      className="relative w-full bg-[#010101] overflow-hidden ppf-carousel-section"
      style={{
        height: "1033px",
      }}
    >
      {/* Main background car image */}
      <div className="absolute inset-0 z-0 ppf-bg-car">
        <Image
          src="/ppf/car-bg.png"
          width={1440}
          height={1080}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slide-specific car image - right side */}
      <div
        key={`image-${current}`}
        className="absolute z-20 ppf-slide-car animate-slide-in-right"
        style={{
          width: "1900px",
          height: "792px",
          left: "695px",
          top: "200px",
          right: 0,
        }}
      >
        <Image
          src={slide.image}
          width={1901}
          height={792}
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
        className="relative z-10 w-full h-full flex flex-col justify-center px-[112px] ppf-content animate-slide-in-left"
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
              {slide.title}
            </h3>
          </div>

          {/* Main subtitle */}
          <h1
            className="text-[52px] lg:text-[60px] font-bold font-oswald uppercase text-transparent bg-clip-text leading-[1.1] tracking-[0.06em] mb-6 whitespace-pre-line"
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

          {/* Benefits list */}
          <div className="space-y-5 mb-10">
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
                      className="w-7 h-7 object-contain"
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
          <div className="relative inline-block explore-btn">
            <Button
              text={slide.cta}
              width={361}
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

      {/* Page counter */}
      <div className="absolute bottom-16 right-[112px] z-10 flex items-baseline gap-1 ppf-page-counter">
        <span className="text-[64px] font-bold font-oswald text-transparent bg-gradient-to-r from-[#7aa5ac] via-[#fff] to-[#7aa5ac] bg-clip-text leading-[76px]">
          {current + 1}
        </span>
        <span className="text-[32px] font-semibold font-oswald text-[#383d4b] leading-[48px]">
          |4
        </span>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 ppf-nav-dots">
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
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors ppf-arrow-left"
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
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors ppf-arrow-right"
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
          .ppf-carousel-section {
            height: auto !important;
            min-height: 600px !important;
          }

          .ppf-bg-car {
            height: 600px !important;
          }

          .ppf-bg-car img {
            object-position: center !important;
          }

          .ppf-slide-car {
            width: 100% !important;
            height: 300px !important;
            top: auto !important;
            bottom: 100px !important;
            right: 0 !important;
            left: 0 !important;
            z-index: 5 !important;
          }

          .ppf-content {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 60px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
          }

          .ppf-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
          }

          .ppf-content h1 {
            font-size: 28px !important;
            line-height: 1.2 !important;
            margin-bottom: 16px !important;
            width: 100% !important;
          }

          .ppf-content .space-y-5 {
            gap: 12px !important;
          }

          .ppf-content .space-y-5 > div {
            margin-top: 0 !important;
            margin-bottom: 12px !important;
          }

          .ppf-content .space-y-5 h4 {
            font-size: 18px !important;
            line-height: 26px !important;
          }

          .ppf-content .space-y-5 p {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          .ppf-content button img {
            width: 240px !important;
            height: 62px !important;
          }

          .ppf-page-counter {
            bottom: 70px !important;
            right: 20px !important;
          }

          .ppf-page-counter span:first-child {
            font-size: 40px !important;
            line-height: 48px !important;
          }

          .ppf-page-counter span:last-child {
            font-size: 24px !important;
            line-height: 32px !important;
          }

          .ppf-nav-dots {
            bottom: 20px !important;
          }

          .ppf-arrow-left {
            left: 12px !important;
            width: 36px !important;
            height: 36px !important;
          }

          .ppf-arrow-right {
            right: 12px !important;
            width: 36px !important;
            height: 36px !important;
          }

          .ppf-arrow-left svg,
          .ppf-arrow-right svg {
            width: 14px !important;
            height: 14px !important;
          }

          .explore-btn {
            bottom: -6px !important;
            left: 0px !important;
          }
        }
      `}</style>
    </section>
  );
}
