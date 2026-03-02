"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";

const slides = [
  {
    id: 1,
    badge: "Why Need the combo package?",
    title: "All-in-One Vehicle Protection: Tint, Coating, & PPF in One Package",
    cta: "Explore Combo Deals",
    image: "/combo/slide1.png",
    mobileImage: "/combo/mobile/slide1.jpg",
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
    mobileImage: "/combo/mobile/slide2.png",
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

export default function ComboCarouselLine() {
  // No carousel behaviour – render slides sequentially
  const router = useRouter();

  const handleCTAClick = (slide) => {
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
    <>
      {slides.map((slide, idx) => (
        <section
          key={slide.id}
          className="relative w-full bg-[#010101] overflow-hidden combo-carousel-section"
          style={{
            minHeight: "1033px",
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
            key={`image-${idx}`}
            className="hidden md:block absolute z-20 combo-slide-car animate-slide-in-right"
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
            key={`content-${idx}`}
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

              {/* mobile car image placed below subtitles - OUTSIDE max-w wrapper */}
              <div className="block md:hidden w-full combo-slide-car-mobile">
                <img
                  src={slide.mobileImage}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center center" }}
                />
              </div>

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
              <div className="relative inline-block explore-btn mt-10 cursor-pointer">
                <Button
                  text={slide.cta}
                  width={420}
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
                        ? "/combo/mobile/explore.png"
                        : "/wrapping/mobile/book.png"
                    }
                    alt={slide.cta}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>

                <div className="mobile-page-counter md:hidden">
                  <span className="mobile-counter-current">{idx + 1}</span>
                  <span className="mobile-counter-total">/{slides.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Counter - Bottom Right */}
          <div
            className="absolute z-30 combo-page-counter"
            style={{
              bottom: "80px",
              right: "112px",
              display: "flex",
              alignItems: "baseline",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "Oswald",
                fontSize: "60px",
                fontWeight: 700,
                lineHeight: "68px",
                color: "#FFFFFF",
              }}
            >
              {idx + 1}
            </span>
            <span
              style={{
                fontFamily: "Oswald",
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "40px",
                color: "#A9A9A9",
              }}
            >
              /{slides.length}
            </span>
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
          .combo-carousel-section {
            min-height: 750px !important;
          }

          .combo-content {
            padding-left: 40px !important;
            padding-right: 20px !important;
            min-height: 750px !important;
          }

          .combo-content h3 {
            font-size: 18px !important;
          }

          .combo-content h1 {
            width: 100% !important;
            font-size: 36px !important;
            line-height: 1.2 !important;
          }

          .combo-content .space-y-5 h4 {
            font-size: 20px !important;
            line-height: 28px !important;
          }

          .combo-content .space-y-5 p {
            font-size: 15px !important;
            line-height: 24px !important;
          }

          .combo-page-counter {
            right: 40px !important;
            bottom: 40px !important;
          }
        }

        @media (max-width: 767px) {
          .combo-carousel-section {
            height: auto !important;
            min-height: 800px !important;
            overflow: visible !important;
            margin-top: 10px !important;
            margin-bottom: 140px !important;
          }

          .combo-bg-car {
            height: 100% !important;
            display: block !important;
            opacity: 0.9 !important;
          }

          .combo-bg-car img {
            object-position: center !important;
          }

          .combo-slide-car {
            display: none !important;
          }

          .combo-slide-car-mobile {
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

          .combo-slide-car-mobile img {
            object-fit: contain !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            object-position: center center !important;
            opacity: 1 !important;
            transform: scale(1.35) !important;
          }

          .combo-content {
            padding-left: 0px !important;
            padding-right: 0px !important;
            padding-top: 10px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
            position: relative !important;
          }

          .combo-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
            text-align: center !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .combo-content h1 {
            font-size: 32px !important;
            line-height: 40px !important;
            margin-bottom: 2px !important;
            width: 100% !important;
            text-align: center !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .combo-content .space-y-5 {
            gap: 12px !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
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

          /* Hide desktop button and counter on mobile */
          .explore-btn {
            display: none !important;
          }

          .combo-page-counter {
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
            max-width: 260px !important;
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
