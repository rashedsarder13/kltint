"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";

const packages = {
  silver: {
    name: "SILVER",
    filmType: "PVC",
    thickness: "5nm",
    colorOptions: "1500",
    warranty: "2 year",
    price: "288",
    originalPrice: "576",
    highlight: true,
  },
  platinum: {
    name: "PLATINUM",
    filmType: "Super Film",
    thickness: "10nm",
    colorOptions: "2500",
    warranty: "5 year",
    price: "999",
    originalPrice: "1999",
  },
};

const specs = [
  { key: "colorOptions", label: "Colors" },
];

const colorSwatches = [
  "#FF3B30",
  "#FF9500",
  "#FFCC00",
  "#34C759",
  "#00C7BE",
  "#32ADE6",
  "#007AFF",
  "#5856D6",
  "#AF52DE",
  "#FF2D55",
  "#8E8E93",
  "#636366",
  "#1C1C1E",
  "#A2845E",
  "#E5E5EA",
  "#FFFFFF",
];

const visibleDesktopSwatches = 6;
const visibleMobileSwatches = 4;

export default function ExploreOptionsSection() {
  const mobileTableRef = useRef(null);
  
  const scrollMobileTable = () => {
    if (mobileTableRef.current) {
      const el = mobileTableRef.current;
      const step = el.offsetWidth * 0.5;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft + step >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }
  };

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [swatchStartIndex, setSwatchStartIndex] = useState({
    silver: 0,
    platinum: 0,
  });

  const slideSwatches = (packageKey, direction, isMobile = false) => {
    const visibleCount = isMobile
      ? visibleMobileSwatches
      : visibleDesktopSwatches;
    const maxStart = Math.max(0, colorSwatches.length - visibleCount);

    setSwatchStartIndex((previous) => {
      const current = previous[packageKey] ?? 0;
      const nextValue =
        direction === "next"
          ? current >= maxStart
            ? 0
            : current + 1
          : current <= 0
            ? maxStart
            : current - 1;

      return {
        ...previous,
        [packageKey]: nextValue,
      };
    });
  };

  const getVisibleSwatches = (packageKey, isMobile = false) => {
    const visibleCount = isMobile
      ? visibleMobileSwatches
      : visibleDesktopSwatches;
    const start = swatchStartIndex[packageKey] ?? 0;
    return colorSwatches.slice(start, start + visibleCount);
  };

  const handleBookClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  const handleContinue = (formData) => {
    setBookingData(formData);
    setShowBookingModal(false);
    setShowCheckoutModal(true);
  };

  const handleBack = () => {
    setShowCheckoutModal(false);
    setShowBookingModal(true);
  };

  const handleCloseAll = () => {
    setShowBookingModal(false);
    setShowCheckoutModal(false);
    setBookingData(null);
    setSelectedPackage(null);
  };

  return (
    <section className="relative py-16 bg-[#010101] overflow-hidden">
      {/* Red glow effect - right side */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[600px] bg-[#FF0000]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-360 mx-auto px-2 md:px-28">
        {/* Title */}
        <div
          style={{
            marginBottom: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            style={{
              position: "absolute",
              width: "590px",
              height: "38px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <h2
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "72px",
              letterSpacing: "0.24px",
              textAlign: "center",
              textTransform: "capitalize",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Explore Our Wrapping Options
          </h2>
        </div>

        <style jsx>{`
          .wrap-table-wrapper {
            position: relative;
            max-width: 563px; /* full table width */
            margin: 0 auto 40px;
            padding: 0.5px;
            border-radius: 45px;
            background: hsla(0, 0%, 14%, 0.29);
            box-shadow: 0px 4px 4px 0px hsla(0, 0%, 0%, 0.25);
            border: 0.5px solid;
            border-image-source: linear-gradient(
              101.69deg,
              #121214 -8.24%,
              #505256 16.16%,
              #94999f 44.2%,
              #212124 59.99%,
              #5d6064 71.74%,
              #555555 82.14%
            );
          }

          .wrap-table-inner {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.45),
              rgba(0, 0, 0, 0.25)
            );
            border-radius: 45px;
            padding: 34px;
            backdrop-filter: blur(10px);
            width: 100%; /* fill wrapper */
            height: 628px; /* fixed table height */
            transform: rotate(0deg);
            opacity: 1;
            position: relative;
            left: 0; /* reset offset */
            overflow: hidden;
          }

          .wrap-table-grid {
            display: grid;
            grid-template-columns: 240px repeat(2, 132px); /* increased left column width to avoid wrapping */
            gap: 37px; /* requested gap */
            width: 100%; /* fill wrapper */
            margin: 0 auto;
            align-items: start;
          }

          .wrap-labels-column {
            display: flex;
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
          }
          .wrap-header-space {
            height: 73px;
            width: 100%;
          }
          .wrap-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px 20px;
            width: 100%;
          }

          .wrap-label-text {
            background: linear-gradient(
              137.95deg,
              #7a96ac 2.28%,
              #eaeff3 19.8%,
              #c2d4e1 32.94%,
              #ffffff 50.16%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            font-family: Oswald, sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 31px;
            letter-spacing: 0.5px;
            text-transform: capitalize;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .wrap-package-column {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            border-radius: 15px; /* requested */
            padding: 0;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02),
              rgba(255, 255, 255, 0)
            );
            height: 570px; /* requested */
            transform: rotate(0deg);
            opacity: 1;
            box-sizing: border-box;
          }

          .wrap-package-column::before {
            content: "";
            position: absolute;
            inset: -1px;
            border-radius: 12px;
            padding: 1px;
            background: transparent;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition:
              opacity 0.24s ease,
              box-shadow 0.24s ease;
            pointer-events: none;
          }

          .wrap-package-column:hover::before,
          .wrap-package-column.highlight::before {
            background: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 30.62%,
              #f6d0ab 47.37%,
              #9d774e 62.96%,
              #c99b70 82.05%,
              #795f52 93.35%
            );
            opacity: 1;
          }

          .wrap-package-column:hover {
            box-shadow: 0px 30px 20px 20px hsla(0, 0%, 0%, 0.38);
          }

          .wrap-package-header {
            width: 100%;
            height: 73px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              283.14deg,
              #2d2d29 9.54%,
              #0d0e0e 90.46%
            );
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
          }

          .wrap-header-text {
            font-family: Oswald, sans-serif;
            font-weight: 500;
            font-size: 28px;
            line-height: 40px;
            background: linear-gradient(
              137.95deg,
              #7a96ac 2.28%,
              #eaeff3 19.8%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: background 0.24s ease;
          }

          .wrap-package-column:hover .wrap-header-text,
          .wrap-package-column.highlight .wrap-header-text {
            background: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 30.62%,
              #f6d0ab 47.37%,
              #9d774e 62.96%,
              #c99b70 82.05%,
              #795f52 93.35%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .wrap-book-btn {
            padding: 8px 18px;
            background: linear-gradient(to right, #d4af37, #f5d0ab);
            border-radius: 8px;
            font-family: Oswald, sans-serif;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #010101;
            transition: all 0.28s ease;
            border: 2px solid transparent;
            cursor: pointer;
            margin-bottom: 20px;
          }

          .wrap-package-column:hover .wrap-book-btn,
          .wrap-package-column.highlight .wrap-book-btn {
            border-radius: 999px;
            background: linear-gradient(
              114.31deg,
              #151000 -20.74%,
              #2c2405 55.8%,
              #634d05 106.02%
            );
            color: #f6d0ab;
            border: 3px solid transparent;
            position: relative;
          }

          .wrap-book-btn::before {
            content: "";
            position: absolute;
            inset: -3px;
            border-radius: 999px;
            padding: 3px;
            background: transparent;
            z-index: -1;
          }

          .wrap-package-column:hover .wrap-book-btn::before,
          .wrap-package-column.highlight .wrap-book-btn::before {
            background: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 30.62%,
              #f6d0ab 47.37%,
              #9d774e 62.96%,
              #c99b70 82.05%,
              #795f52 93.35%
            );
          }

          .wrap-package-value {
            width: 100%;
            padding: 18px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px dashed rgba(255, 255, 255, 0.03);
            font-family: Montserrat, sans-serif;
            font-weight: 500;
            font-size: 18px;
            background: linear-gradient(
              137.95deg,
              #7a96ac 2.28%,
              #eaeff3 19.8%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }

          .wrap-color-slider {
            width: 100%;
            padding: 20px 8px;
            border-top: 1px dashed rgba(255, 255, 255, 0.03);
          }

          .wrap-color-slider-track {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .wrap-color-nav {
            width: 24px;
            height: 24px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            font-size: 14px;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .wrap-color-swatches {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 22px;
          }

          .wrap-color-dot {
            width: 20px;
            height: 20px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            flex-shrink: 0;
          }

          .wrap-price {
            display: flex;
            gap: 8px;
            align-items: baseline;
            justify-content: center;
            margin-top: 12px;
          }
          .wrap-price-current {
            font-family: Montserrat, sans-serif;
            font-weight: 700;
            font-size: 18px;
            background: linear-gradient(
              137.95deg,
              #7a96ac 2.28%,
              #eaeff3 19.8%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }
          .wrap-price-original {
            font-family: Montserrat, sans-serif;
            font-weight: 400;
            font-size: 12px;
            color: rgba(107, 114, 128, 0.9);
            text-decoration: line-through;
          }

          .wrap-book-btn {
            padding: 8px 18px;
            background: linear-gradient(to right, #d4af37, #f5d0ab);
            border-radius: 8px;
            font-family: Oswald, sans-serif;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            color: #010101;
            border: 2px solid transparent;
            cursor: pointer;
            margin-bottom: 20px;
          }

          /* small eclipse glows */
          .wrap-glow-tl,
          .wrap-glow-br {
            display: block;
          }

          /* small dot icon */
          .dot {
            margin-left: 8px;
            color: #6b7280;
            font-size: 12px;
          }

          .wrap-mobile {
            display: none;
          }

            @media (max-width: 640px) {
            section {
              padding-top: 60px !important;
              padding-bottom: 60px !important;
            }

            h2 {
              font-family: Oswald, sans-serif !important;
              font-weight: 500 !important;
              font-size: 32px !important;
              line-height: 48px !important;
              letter-spacing: 0.16px !important;
              padding: 0 20px !important;
              background: linear-gradient(
                137.95deg,
                #7a96ac 2.28%,
                #eaeff3 19.8%,
                #c2d4e1 32.94%,
                #ffffff 50.16%,
                #d4dee5 62.15%,
                #abbdc8 78.69%,
                #bccad7 95.24%
              ) !important;
              -webkit-background-clip: text !important;
              -webkit-text-fill-color: transparent !important;
            }

            .wrap-table-wrapper {
              display: none !important;
            }

            .wrap-table-inner {
              padding: 8px !important;
              width: 100% !important;
              height: auto !important;
              border-radius: 16px !important;
            }

            .mobile-scroll-wrapper {
              position: relative;
              overflow-x: hidden;
            }

            .wrap-mobile {
              display: flex !important;
              gap: 12px;
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
              padding: 0 6px;
              scroll-snap-type: x mandatory;
            }

            .labels-mobile {
              display: flex;
              flex-direction: column;
              gap: 0;
              width: 120px;
              padding: 0;
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background: transparent;
              z-index: 10;
            }

            .mobile-label {
              display: flex;
              align-items: center;
              padding: 18px 20px;
            }

            .scroll-content {
              display: flex;
              overflow-x: auto;
              flex: 1;
            }

            /* glow animation */
            @keyframes scrollGlow {
              0%, 100% {
                box-shadow: 0 0 6px 3px rgba(212, 175, 55, 0.4);
              }
              50% {
                box-shadow: 0 0 12px 5px rgba(212, 175, 55, 0.6);
              }
            }

            .scroll-btn {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              background: transparent;
              border: none;
              padding: 0;
              z-index: 20;
              cursor: pointer;
              animation: scrollGlow 1.5s infinite alternate;
              border-radius: 50%;
            }

            .scroll-btn img {
              display: block;
              width: 40px;
              height: auto;
            }

            .wrap-mobile-card {
              padding: 0 12px 12px;
            }

            /* golden header text on mobile */
            .wrap-mobile-card .wrap-header-text {
              background: linear-gradient(
                135.31deg,
                #9e8976 15.43%,
                #7a5e50 30.62%,
                #f6d0ab 47.37%,
                #9d774e 62.96%,
                #c99b70 82.05%,
                #795f52 93.35%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .wrap-mobile::-webkit-scrollbar {
              height: 10px;
            }

            .wrap-mobile::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.02);
              border-radius: 999px;
            }

            .wrap-mobile::-webkit-scrollbar-thumb {
              background: linear-gradient(90deg, #d4af37, #f5d0ab);
              border-radius: 999px;
              min-height: 6px;
            }

            .wrap-mobile-card {
              background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.02),
                rgba(255, 255, 255, 0)
              );
              border-radius: 16px;
              padding: 0 12px 12px !important;
              flex: 0 0 50%;
              min-width: 50%;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
              scroll-snap-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 0;
            }

            .wrap-mobile-card .mobile-value {
              padding: 22px 0;
              font-family: "Montserrat", sans-serif;
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              color: transparent;
              background: linear-gradient(
                137.95deg,
                #7a96ac 2.28%,
                #eaeff3 19.8%,
                #c2d4e1 32.94%,
                #ffffff 50.16%,
                #d4dee5 62.15%,
                #abbdc8 78.69%,
                #bccad7 95.24%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .wrap-mobile-card .wrap-package-header {
              height: auto;
              padding: 8px 0;
              margin-bottom: 8px;
            }

            .wrap-mobile-card .wrap-header-text {
              font-size: 20px;
              line-height: 28px;
              letter-spacing: 0.12px;
              background: linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%);
              -webkit-background-clip: text;
            }

            .wrap-mobile-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 0;
              border-top: 1px dashed rgba(255, 255, 255, 0.03);
              font-family: "Montserrat", sans-serif;
              font-size: 16px;
              line-height: 24px;
            }

            .wrap-mobile-row .wrap-label-text {
              font-family: "Oswald", sans-serif;
              font-size: 16px;
              color: transparent;
              background: linear-gradient(
                137.95deg,
                #7a96ac 2.28%,
                #eaeff3 19.8%,
                #c2d4e1 32.94%,
                #ffffff 50.16%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .wrap-mobile-row .wrap-mobile-value {
              font-family: "Montserrat", sans-serif;
              font-weight: 500;
              font-size: 16px;
              color: transparent;
              background: linear-gradient(
                137.95deg,
                #7a96ac 2.28%,
                #eaeff3 19.8%,
                #c2d4e1 32.94%,
                #ffffff 50.16%
              );
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .wrap-mobile-color-slider {
              width: 100%;
              padding: 14px 0;
              border-top: 1px dashed rgba(255, 255, 255, 0.03);
            }

            .wrap-mobile-color-slider .wrap-color-dot {
              width: 18px;
              height: 18px;
            }

            .wrap-mobile-price {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              gap: 8px;
              padding-top: 12px;
            }

            .wrap-mobile-cta .wrap-book-btn {
              width: 100%;
              padding: 10px 16px;
              border-radius: 999px;
              margin-top: 14px;
            }

            .wrap-glow-tl,
            .wrap-glow-br {
              display: none;
            }
          }
        `}</style>

        <div className="wrap-table-wrapper" style={{ position: "relative" }}>
          <div
            className="wrap-glow-tl"
            style={{
              position: "absolute",
              left: "-60px",
              top: "-60px",
              width: "320px",
              height: "320px",
              background:
                "radial-gradient(ellipse at 20% 60%, rgba(3,46,189,0.12), rgba(3,46,189,0.04) 70%, rgba(0,0,0,0) 90%)",
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            className="wrap-glow-br"
            style={{
              position: "absolute",
              right: "-80px",
              bottom: "-80px",
              width: "380px",
              height: "380px",
              background:
                "radial-gradient(ellipse at 80% 80%, rgba(212,80,80,0.18), rgba(212,80,80,0.06) 65%, rgba(0,0,0,0) 90%)",
              filter: "blur(80px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <div
            className="wrap-table-inner"
            style={{ overflow: "visible", position: "relative", zIndex: 2 }}
          >
            <div className="wrap-table-grid">
              <div className="wrap-labels-column">
                <div className="wrap-header-space">
                  <div className="wrap-header-text ml-4">Package</div>
                </div>
                {specs.map((spec) => (
                  <div className="wrap-label" key={spec.key}>
                    <span className="wrap-label-text">{spec.label}</span>
                  </div>
                ))}
                <div className="wrap-label">
                  <div className="wrap-header-text ">Price</div>
                </div>
              </div>

              {Object.entries(packages).map(([packageKey, pkg]) => (
                <div
                  key={packageKey}
                  className={`wrap-package-column ${pkg.highlight ? "highlight" : ""}`}
                >
                  <div className="wrap-package-header">
                    <span className="wrap-header-text">{pkg.name}</span>
                  </div>

                  <div className="wrap-color-slider">
                    <div className="wrap-color-slider-track">
                      <button
                        type="button"
                        className="wrap-color-nav"
                        onClick={() => slideSwatches(packageKey, "prev")}
                        aria-label="Previous colors"
                      >
                        ‹
                      </button>
                      <div className="wrap-color-swatches">
                        {getVisibleSwatches(packageKey).map((colorHex) => (
                          <span
                            key={`${packageKey}-${colorHex}`}
                            className="wrap-color-dot"
                            style={{ backgroundColor: colorHex }}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="wrap-color-nav"
                        onClick={() => slideSwatches(packageKey, "next")}
                        aria-label="Next colors"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="wrap-price">
                    <span className="wrap-price-current">{pkg.price}</span>
                    <span className="wrap-price-original">
                      {pkg.originalPrice}
                    </span>
                  </div>

                  <div className="wrap-cta">
                    <button
                      className="wrap-book-btn"
                      onClick={() => handleBookClick(pkg)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* Mobile layout (visible only on small screens) */}
        <div className="mobile-scroll-wrapper relative md:hidden">
          {/* fixed labels column */}
          <div className="labels-mobile">
            <div className="mobile-label">
              <span className="wrap-label-text">Package</span>
            </div>
            {specs.map((spec) => (
              <div className="mobile-label" key={spec.key}>
                <span className="wrap-label-text">{spec.label}</span>
              </div>
            ))}
            <div className="mobile-label">
              <span className="wrap-label-text">Price</span>
            </div>
          </div>
          
          {/* scrollable content shifted right to clear labels */}
          <div className="scroll-content flex ml-[140px] md:ml-[120px]">
            <div className="wrap-mobile" ref={mobileTableRef}>
              {Object.entries(packages).map(([packageKey, pkg]) => (
                <div className="wrap-mobile-card" key={packageKey}>
                  <div className="wrap-package-header">
                    <span className="wrap-header-text">{pkg.name}</span>
                  </div>

                  <div className="wrap-mobile-color-slider">
                    <div className="wrap-color-slider-track">
                      <button
                        type="button"
                        className="wrap-color-nav"
                        onClick={() => slideSwatches(packageKey, "prev", true)}
                        aria-label="Previous colors"
                      >
                        ‹
                      </button>
                      <div className="wrap-color-swatches">
                        {getVisibleSwatches(packageKey, true).map((colorHex) => (
                          <span
                            key={`mobile-${packageKey}-${colorHex}`}
                            className="wrap-color-dot"
                            style={{ backgroundColor: colorHex }}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="wrap-color-nav"
                        onClick={() => slideSwatches(packageKey, "next", true)}
                        aria-label="Next colors"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="wrap-mobile-price">
                    <div className="wrap-price-current">{pkg.price}</div>
                    <div className="wrap-price-original">{pkg.originalPrice}</div>
                  </div>

                  <div className="wrap-mobile-cta">
                    <button
                      className="wrap-book-btn"
                      onClick={() => handleBookClick(pkg)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn"
              onClick={scrollMobileTable}
              aria-label="Scroll options"
            >
              <img src="/tint/mobile/tintOptionBtn.png" alt="" />
            </button>
          </div>
        </div>
        <div className="scroll-hint right" aria-hidden="true" />

        <div className="text-center mt-8">
          <p className="text-[16px] text-gray-400">
            Custom offer or Any questions?{" "}
            <Link href="/contact" className="text-white hover:text-[#d4af37] transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: selectedPackage?.name,
          film: selectedPackage?.filmType,
          thickness: selectedPackage?.thickness,
          colorOptions: selectedPackage?.colorOptions,
          warranty: selectedPackage?.warranty,
          price: selectedPackage?.price,
          original: selectedPackage?.originalPrice,
        }}
        onContinue={handleContinue}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseAll}
        onBack={handleBack}
        packageData={{
          name: selectedPackage?.name,
          price: selectedPackage?.price,
          original: selectedPackage?.originalPrice,
        }}
        bookingData={bookingData}
      />
    </section>
  );
}
