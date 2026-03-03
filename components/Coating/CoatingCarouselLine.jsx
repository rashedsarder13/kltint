"use client";

import Image from "next/image";
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

export default function CoatingCarouselLine() {
  // No carousel behaviour – render slides sequentially
  const router = useRouter();

  const handleCTAClick = (slide) => {
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
    <>
      {slides.map((slide, idx) => (
        <section
          key={slide.id}
          className="relative w-full bg-[#010101] overflow-hidden coating-carousel-section  pt-16 sm:pt-0"
          style={{ minHeight: "1081px" }}
        >
          {/* Main background car image */}
          <div className="absolute inset-0 z-0 coating-bg-car">
            <Image
              src="/tint/car-bg.png"
              width={1440}
              height={1081}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* Slide-specific car image - right side */}
          <div
            key={`image-${idx}`}
            className="hidden md:block absolute z-20 coating-slide-car animate-slide-in-right"
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
            key={`content-${idx}`}
            className="relative z-10 w-full h-full flex flex-col justify-center md:px-[112px] coating-content animate-slide-in-left"
            style={{ minHeight: "1080px", left: "32px" }}
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

            {/* mobile car image placed below subtitles - OUTSIDE max-w wrapper */}
            <div className="block md:hidden w-full coating-slide-car-mobile">
              <img
                src={`/coating/mobile/slide${slide.id}.png`}
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>

            <div className="max-w-[600px]">
              {/* Benefits list */}
              <div className="space-y-5 mb-10">
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
              <div className="relative inline-block explore-btn cursor-pointer">
                <Button
                  text={slide.cta}
                  width={400}
                  height={68}
                  className="hover:brightness-110 transition-all"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCTAClick(slide)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleCTAClick(slide);
                  }}
                />
              </div>

              {/* Mobile CTA Button and Page Counter */}
              <div className="mobile-cta-wrapper md:hidden">
                <div
                  className="mobile-cta-button cursor-pointer"
                  onClick={() => handleCTAClick(slide)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleCTAClick(slide);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={slide.cta}
                >
                  <img
                    src={
                      slide.id === 1
                        ? "/tint/explorebtn.png"
                        : slide.id === 2
                          ? "/coating/mobile/book.png"
                          : slide.id === 3
                            ? "/coating/mobile/view.png"
                            : "/coating/mobile/schedule.png"
                    }
                    alt={slide.cta}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>


              </div>
            </div>
          </div>


        </section>
      ))}

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

        @media (min-width: 768px) and (max-width: 1023px) {
          .coating-carousel-section {
            min-height: 750px !important;
          }

          .coating-content {
            padding-left: 40px !important;
            padding-right: 20px !important;
            left: 0 !important;
            min-height: 750px !important;
          }

          .coating-content h3 {
            font-size: 18px !important;
          }

          .coating-content h1 {
            width: 100% !important;
            font-size: 36px !important;
            line-height: 1.2 !important;
          }

          .coating-content .space-y-5 h4 {
            font-size: 20px !important;
            line-height: 28px !important;
          }

          .coating-content .space-y-5 p {
            font-size: 15px !important;
            line-height: 24px !important;
          }

          .coating-page-counter {
            right: 40px !important;
            bottom: 40px !important;
          }
        }

        @media (max-width: 767px) {
          .coating-carousel-section {
            height: auto !important;
            min-height: 800px !important;
            overflow: visible !important;
            margin-top: 0px !important;
            margin-bottom: 40px !important;
          }

          .coating-bg-car {
            height: 100% !important;
            opacity: 0.9 !important;
          }

          .coating-bg-car img {
            object-position: center !important;
          }

          .coating-slide-car {
            display: none !important;
          }

          .coating-slide-car-mobile {
            width: 100vw !important;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            margin-top: 36px !important;
            margin-bottom: 25px !important;
            height: auto !important;
            padding: 0 !important;
            display: block !important;
            overflow: visible !important;
            z-index: 5 !important;
          }

          .coating-slide-car-mobile img {
            object-fit: contain !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            object-position: center center !important;
            opacity: 1 !important;
            transform: scale(1.35) !important;
          }

          .coating-content {
            padding-left: 0px !important;
            padding-right: 0px !important;
            padding-top: 10px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
            position: relative !important;
            left: 0px !important;
          }

          .coating-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
            text-align: center !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .coating-content h1 {
            font-size: 32px !important;
            line-height: 40px !important;
            margin-bottom: 2px !important;
            width: 100% !important;
            text-align: center !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .coating-content .space-y-5 {
            gap: 12px !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .coating-content .space-y-5 > div {
            margin-top: 0 !important;
            margin-bottom: 12px !important;
          }

          .coating-content .space-y-5 h4 {
            font-size: 20px !important;
            line-height: 26px !important;
          }

          .coating-content .space-y-5 p {
            font-size: 18px !important;
            line-height: 22px !important;
          }

          /* Hide desktop button and counter on mobile */
          .explore-btn {
            display: none !important;
          }

          .coating-page-counter {
            display: none !important;
          }

          /* Mobile CTA and Counter Wrapper */
          .mobile-cta-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            position: fixed !important;
            margin-top: -25px !important;
            left: 15px !important;
            right: 15px !important;
            z-index: 100 !important;
            gap: 15px !important;
          }

          /* Mobile CTA Button */
          .mobile-cta-button {
            display: block !important;
            width: 100% !important;
            max-width: 280px !important;
            height: auto !important;
            flex-shrink: 0 !important;
          }

          /* Mobile Page Counter */
          .mobile-page-counter {
            display: flex !important;
            align-items: baseline !important;
            gap: 4px !important;
            flex-shrink: 0 !important;
          }

          .mobile-counter-current {
            font-family: Oswald !important;
            font-size: 38px !important;
            font-weight: 700 !important;
            line-height: 46px !important;
            color: #ffffff !important;
          }

          .mobile-counter-total {
            font-family: Oswald !important;
            font-size: 26px !important;
            font-weight: 500 !important;
            line-height: 34px !important;
            color: #a9a9a9 !important;
            margin-right: 4px !important;
          }
        }
      `}</style>
    </>
  );
}
