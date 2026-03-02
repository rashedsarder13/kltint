"use client";

// no React hooks needed
import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Why Need the Tint Service?",
    subtitle: "Scorching Cabin Temperatures?\nPremium Car Tinting Near You",
    benefits: [
      {
        title: "Rapid UV Damage",
        desc: "Leather, fabrics & dashboards fade and crack in under a year.",
        icon: "/tint/icon1.png",
      },
      {
        title: "Blinding Glare & Fatigue",
        desc: "Impaired vision at dawn/dusk puts you at risk.",
        icon: "/tint/icon2.png",
      },
      {
        title: "Privacy & Compliance Risk",
        desc: "Exposed interior + non‑JPJ compliance films invite fines.",
        icon: "/tint/icon3.png",
      },
      {
        title: "Interior Temps > 50 °C",
        desc: "Within minutes—no more stepping into an oven.",
        icon: "/tint/icon4.png",
      },
    ],
    cta: "Explore Packages",
    image: "/tint/slide1.png",
  },
  {
    id: 2,
    title: "Why Need the Tint Service?",
    subtitle: "Next‑Gen Film Armor—\nNano Ceramic & Sputter Tint",
    benefits: [
      {
        title: "99.9 % UV Protection",
        desc: "Blocks nearly all harmful UV A/B rays to safeguard your skin and vehicle interior.",
        icon: "/tint/icon5.png",
      },
      {
        title: "95 % Glare Reduction",
        desc: "Advanced premium film technology for crystal‑clear vision and less eye strain, in day or night.",
        icon: "/tint/icon6.png",
      },
      {
        title: "100 % JPJ‑Approved Films",
        desc: "Every film and installation strictly adheres to JPJ regulations—ensuring your tint is fully legal and safe.",
        icon: "/tint/icon7.png",
      },
      {
        title: "99 % IRR Heat Rejection",
        desc: "Tinted IRR performance that drops cabin temps by up to 16 °C.",
        icon: "/tint/icon8.png",
      },
    ],
    cta: "Explore Packages",
    image: "/tint/slide2.png",
  },
  {
    id: 3,
    title: "Why Need the Tint Service?",
    subtitle:
      "Unmatched Quality & Ironclad\nAssurance at Best Shop in Malaysia",
    benefits: [
      {
        title: "Custom VLT Levels & JPJ Tint",
        desc: "Select your ideal shade, and maintain JPJ compliance.",
        icon: "/tint/icon9.png",
      },
      {
        title: "Super Night Vision Tech",
        desc: "Anti‑reflective finish for crystal‑clear driving despite low visibility.",
        icon: "/tint/icon10.png",
      },
      {
        title: "Meta‑Verified & OEM‑Grade",
        desc: "Scan QR to confirm genuine origin.",
        icon: "/tint/icon11.png",
      },
      {
        title: "10‑Year Bubble & Warranty",
        desc: "Covers peeling, bubbling, IRR & UV‑drop loss, and color stability.",
        icon: "/tint/icon12.png",
      },
    ],
    cta: "Easy Payment Plan!",
    image: "/tint/slide3.png",
  },
  {
    id: 4,
    title: "Why Need the Tint Service?",
    subtitle:
      "Fast, Flawless Installation,\nComplete Full CAR Tinted within 1.5 Hours",
    benefits: [
      {
        title: "Get Your Car Ready in 90 Min",
        desc: "Minimize downtime, maximize comfort.",
        icon: "/tint/icon13.png",
      },
      {
        title: "5 Klang Valley Branches",
        desc: "Kajang, Puchong, Setia Alam, Maluri, Kota Damansara.",
        icon: "/tint/icon14.png",
      },
      {
        title: "Flexible Payment Options",
        desc: "Enjoy SPay, Atome installments, and all major credit cards—no hidden fees.",
        icon: "/tint/icon15.png",
      },
      {
        title: "Certified Master Installers",
        desc: "Factory‑trained for precision and durability.",
        icon: "/tint/icon16.png",
      },
    ],
    cta: "Schedule Appointment",
    image: "/tint/slide4.png",
  },
];

export default function TintCarouselLine() {
  // No carousel behaviour – render slides sequentially
  // CTAs still use same handler logic per slide below

  // CTA handler: route or scroll depending on active slide
  const router = useRouter();
  const handleCTAClick = (slide) => {
    const cta = (slide?.cta || "").toLowerCase();

    if (cta.includes("schedule appointment")) {
      router.push("/contact");
      return;
    }

    if (cta.includes("easy payment plan")) {
      // same-page scroll if already on home, otherwise navigate there then attempt scroll
      if (
        typeof window !== "undefined" &&
        (window.location.pathname === "/" || window.location.pathname === "")
      ) {
        const el = document.getElementById("payment-experience");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/#payment-experience");
        setTimeout(() => {
          const el = document.getElementById("payment-experience");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      return;
    }

    if (cta.includes("explore packages")) {
      if (
        typeof window !== "undefined" &&
        (window.location.pathname === "/tint" ||
          window.location.pathname === "/tint/")
      ) {
        const el = document.getElementById("tint-options");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push("/tint#tint-options");
        setTimeout(() => {
          const el = document.getElementById("tint-options");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      return;
    }

    // fallback
    router.push("/contact");
  };

  return (
    <>
      {slides.map((slide, idx) => (
        <section
          key={slide.id}
          className="relative w-full bg-[#010101] overflow-hidden tint-carousel-section"
          style={{
            minHeight: "1000px",
          }}
        >
          {/* Main background car image */}
          <div className="absolute inset-0 z-0 tint-bg-car">
            <Image
              src="/tint/car-bg.png"
              alt=""
              width={1440}
              height={1080}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slide-specific car image - right side (desktop) */}
          <div
            key={`image-${idx}`}
            className="hidden md:block absolute z-20 tint-slide-car animate-slide-in-right"
            style={{
              width: "836px",
              height: "690px",
              top: "350px",
              right: 0,
            }}
          >
            <img
              src={slide.image}
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
            className="relative z-10 w-full h-full flex flex-col justify-center px-[112px] tint-content animate-slide-in-left"
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
            </div>

            {/* mobile car image placed below subtitles - OUTSIDE max-w wrapper */}
            <div className="block md:hidden w-full tint-slide-car-mobile">
              <img
                src={`/tint/mobile/slide${slide.id}.png`}
                alt=""
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>

            <div className="max-w-[600px] relative z-20">
              {/* Benefits list */}
              <div className="space-y-5 mb-10">
                {slide.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="relative flex-shrink-0 w-[66px] h-[66px]">
                      <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-gray-600" />
                      <div className="absolute top-[5.78px] left-[5.78px] w-[54.45px] h-[54.45px] rounded-full bg-[#070205] flex items-center justify-center overflow-hidden">
                        <img
                          src={b.icon}
                          alt={b.title}
                          className="w-9 h-9 object-contain"
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
              <div className="relative inline-block explore-btn cursor-pointer">
                <Button
                  text={slide.cta}
                  width={341}
                  height={68}
                  className="hover:brightness-110 transition-all"
                  aria-label={slide.cta}
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
                      slide.id === 1 || slide.id === 2
                        ? "/tint/explorebtn.png"
                        : slide.id === 3
                          ? "/tint/easy_payment.png"
                          : "/tint/schedule_apointment.png"
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



          {/* end of mapped slide content */}
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
          .tint-carousel-section {
            min-height: 750px !important;
          }

          .tint-content {
            padding-left: 40px !important;
            padding-right: 20px !important;
            min-height: 750px !important;
          }

          .tint-content h3 {
            font-size: 18px !important;
          }

          .tint-content h1 {
            width: 100% !important;
            font-size: 36px !important;
            line-height: 1.2 !important;
          }

          .tint-content .space-y-5 h4 {
            font-size: 20px !important;
            line-height: 28px !important;
          }

          .tint-content .space-y-5 p {
            font-size: 15px !important;
            line-height: 24px !important;
          }

          .tint-page-counter {
            right: 40px !important;
            bottom: 40px !important;
          }
        }

        @media (max-width: 767px) {
          .tint-carousel-section {
            height: auto !important;
            min-height: 800px !important;
            overflow: visible !important; /* permit image to extend beyond */
            margin-top: 0px !important; /* reduced gap between sections */
            margin-bottom: 40px !important; /* reduced gap between sections */
          }

          .tint-bg-car {
            height: 100% !important;
            display: block !important; /* show background car image on mobile */
            opacity: 0.9 !important;
          }

          .tint-bg-car img {
            object-position: center !important;
          }

          /* reposition slide car under the heading on mobile */
          /* hide desktop version on mobile and style mobile image */
          .tint-slide-car {
            display: none !important;
          }

          .tint-slide-car-mobile {
            /* break out to full viewport width */
            width: 100vw !important;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            margin-top: 36px !important;
            margin-bottom: 25px !important;
            height: 220px !important;
            min-height: 220px !important;
            max-height: 220px !important;
            padding: 0 !important;
            display: block !important;
            overflow: hidden !important;
            z-index: 5 !important; /* behind content */
          }

          /* show entire car image without any cropping */
          .tint-slide-car-mobile img {
            object-fit: contain !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            object-position: center center !important;
            opacity: 1 !important;
            transform: scale(1.35) !important;
            transition: opacity 0.5s ease-in-out !important;
          }

          .tint-content {
            padding-left: 0px !important;
            padding-right: 0px !important;
            padding-top: 10px !important;
            min-height: 600px !important;
            justify-content: flex-start !important;
            z-index: 25 !important;
            position: relative !important;
          }

          .tint-content h3 {
            font-size: 16px !important;
            line-height: 24px !important;
            margin-bottom: 12px !important;
            text-align: center !important; /* center heading */
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .tint-content h1 {
            font-size: 32px !important;
            line-height: 40px !important;
            margin-bottom: 2px !important;
            width: 100% !important;
            text-align: center !important; /* center subheading */
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .tint-content .space-y-5 {
            gap: 12px !important;
            padding: 0 20px !important;
            position: relative !important;
            z-index: 30 !important;
          }

          .tint-content .space-y-5 > div {
            margin-top: 0 !important;
            margin-bottom: 12px !important;
          }

          .tint-content .space-y-5 h4 {
            font-size: 18px !important;
            line-height: 26px !important;
          }

          .tint-content .space-y-5 p {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          /* Hide desktop button and counter on mobile */
          .explore-btn {
            display: none !important;
          }

          .tint-page-counter {
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
