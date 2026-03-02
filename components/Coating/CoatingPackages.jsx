"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";

const packages = [
  {
    name: "BASIC",
    hardness: "9 H",
    thickness: "10-15",
    maintenance: "1x",
    nano: "80 nm",
    body: true,
    light: true,
    glasses: false,
    dashboard: false,
    leather: false,
    tire: false,
    engine: false,
    warranty: "1 year",
    price: "699",
    original: "1299",
    color: "from-[#6b7280] to-[#9ca3af]",
  },
  {
    name: "SILVER",
    hardness: "9 H",
    thickness: "10-15",
    maintenance: "2x",
    nano: "70 nm",
    body: true,
    light: true,
    glasses: true,
    dashboard: false,
    leather: false,
    tire: false,
    engine: false,
    warranty: "2 year",
    price: "999",
    original: "1999",
    color: "from-[#a8b2bd] to-[#e2e8f0]",
  },
  {
    name: "GOLD",
    hardness: "10 H",
    thickness: "15-20",
    maintenance: "3x",
    nano: "60 nm",
    body: true,
    light: true,
    glasses: true,
    dashboard: true,
    leather: false,
    tire: false,
    engine: false,
    warranty: "3 year",
    price: "1599",
    original: "3199",
    color: "from-[#d4af37] to-[#f5d0ab]",
  },
  {
    name: "DIAMOND",
    hardness: "10 H",
    thickness: "15-20",
    maintenance: "5x",
    nano: "50 nm",
    body: true,
    light: true,
    glasses: true,
    dashboard: true,
    leather: true,
    tire: true,
    engine: false,
    warranty: "5 year",
    price: "2199",
    original: "4399",
    color: "from-[#7dd3fc] to-[#bae6fd]",
  },
  {
    name: "PLATINUM",
    hardness: "10 H",
    thickness: "15-20",
    maintenance: "6x",
    nano: "40 nm",
    body: true,
    light: true,
    glasses: true,
    dashboard: true,
    leather: true,
    tire: true,
    engine: true,
    warranty: "6 year",
    price: "2999",
    original: "6199",
    color: "from-[#c4b5fd] to-[#e9d5ff]",
  },
  {
    name: "SIGNATURE",
    hardness: "10 H",
    thickness: "15-20",
    maintenance: "8x",
    nano: "20 nm",
    body: true,
    light: true,
    glasses: true,
    dashboard: true,
    leather: true,
    tire: true,
    engine: true,
    warranty: "8 year",
    price: "3999",
    original: "6999",
    color: "from-[#f87171] to-[#fca5a5]",
  },
];

const labels = [
  { key: "hardness", label: "Surface Hardness" },
  { key: "thickness", label: "Micron Thickness" },
  { key: "maintenance", label: "Free Maintenance" },
  { key: "nano", label: "Nano Particles size" },
  { key: "body", label: "Body coating" },
  { key: "light", label: "Light coating" },
  { key: "glasses", label: "Glasses coating" },
  { key: "dashboard", label: "Dashboard coating" },
  { key: "leather", label: "Leather / Fabric" },
  { key: "tire", label: "Tire, Rim coating" },
  { key: "engine", label: "Engine coating" },
  { key: "warranty", label: "Warranty" },
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="mx-auto"
    >
      <circle cx="10" cy="10" r="10" fill="#026ee7" fillOpacity="0.2" />
      <path
        d="M6 10.5L8.5 13L14 7"
        stroke="#7dd3fc"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="mx-auto"
    >
      <circle cx="10" cy="10" r="10" fill="#374151" fillOpacity="0.6" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="#6b7280"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CellValue({ pkg, field }) {
  const val = pkg[field];
  if (typeof val === "boolean") return val ? <CheckIcon /> : <CrossIcon />;
  return (
    <span className="text-[14px] text-white/80 text-center block">{val}</span>
  );
}

export default function CoatingPackages() {
  const [activeCol, setActiveCol] = useState(4); // default active: DIAMOND

  // ref for mobile scroll container
  const mobileTableRef = useRef(null);

  const scrollMobileTable = () => {
    if (mobileTableRef.current) {
      const el = mobileTableRef.current;
      const step = el.offsetWidth * 0.5; // two cards visible at once
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft + step >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }
  };

  // Modal state + booking flow handlers (same UX as Tint/PPF)
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleBookNow = (pkg) => {
    setBookingData(pkg);
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
  };

  return (
    <section className="relative py-44 overflow-hidden bg-[#0A0A0C] coating-packages-section">
      <style jsx>{`
        .table-wrapper {
          position: relative;
          max-width: 1224px;
          margin: 0 auto 90px; /* add spacing below table so content after sits visibly below */
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

        .coating-packages-section {
          height: 1487px;
        }

        .table-inner {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.25)
          );
          border-radius: 45px;
          padding: 34px;
          backdrop-filter: blur(10px);
          width: 1224px;
          height: 1024px; /* match package column height so content after table sits below */
          overflow: hidden;
        }

        /* ensure section keeps full height on mobile too */
        @media (max-width: 640px) {
          .coating-packages-section {
            height: 1387px;
          }
        }

        .package-column {
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 12px;
          overflow: visible;
          padding: 0 0px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.02)
          ) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
          height: 1024px;
          box-sizing: border-box;
        }

        .package-column::before {
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

        .package-column:hover::before {
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

        .package-column:hover {
          box-shadow: 0px 30px 20px 20px hsla(0, 0%, 0%, 0.38);
        }

        .package-column.active::before,
        .package-column:hover::before {
          opacity: 1;
        }

        .package-column.active,
        .package-column:hover {
          box-shadow: 0px 30px 20px 20px hsla(0, 0%, 0%, 0.38);
        }

        .package-header {
          width: 100%;
          height: 73px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          padding: 10px 0;
          gap: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(283.14deg, #2d2d29 9.54%, #0d0e0e 90.46%);
          color: white;
        }

        .header-text {
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 28px;
          line-height: 40px;
          letter-spacing: 0.14px;
          text-transform: capitalize;
          display: inline-block;
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
          background-clip: text;
        }

        .package-column:hover .header-text,
        .package-column.active .header-text {
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

        .table-grid {
          display: grid;
          grid-template-columns: 240px repeat(6, 133px);
          gap: 18px;
          width: 1224px;
          margin: 0 auto;
          align-items: start;
        }

        .labels-column {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: transparent;
          align-items: flex-start;
        }

        .labels-column .header-space {
          height: 73px;
          width: 100%;
        }

        .label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 17px 20px;
          background: transparent;
          width: 100%;
        }

        .label-text {
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
          color: transparent;
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 22px;
          line-height: 31px;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .header-label {
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
          color: transparent;
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 22px;
          line-height: 31px;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          padding: 22px 0;
        }

        /* small ◎ symbol for certain labels */
        .dot {
          margin-left: 8px;
          color: #6b7280;
          font-size: 12px;
        }

        .package-value {
          width: 100%;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px dashed rgba(255, 255, 255, 0.03);
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: 0.2px;
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
          background-clip: text;
          color: transparent;
        }

        .package-cta {
          margin-top: 12px;
        }

        .book-btn {
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
          margin-bottom: 25px;
        }

        .package-column:hover .book-btn,
        .package-column.active .book-btn {
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

        .book-btn::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          padding: 3px;
          background: transparent;
          z-index: -1;
        }

        .package-column:hover .book-btn::before,
        .package-column.active .book-btn::before {
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

        .book-top {
          margin-top: 20px;
        }

        .book-bottom {
          margin-top: 6px;
        }

        .package-price {
          display: flex;
          gap: 8px;
          align-items: baseline;
          justify-content: center;
          margin-top: 12px;
        }

        .price-current {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
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
          color: transparent;
        }

        .price-original {
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: rgba(107, 114, 128, 0.9);
          text-decoration: line-through;
          margin-top: 0;
        }

        .table-mobile {
          display: none;
        }

        @media (max-width: 640px) {
          h2 {
            font-weight: 500 !important;
            font-size: 32px !important;
            line-height: 40px !important;
          }

          .table-wrapper {
            display: none !important;
          }

          .table-inner {
            padding: 8px !important;
            width: 100% !important;
            height: auto !important;
            border-radius: 16px !important;
          }

          .table-container {
            padding-left: 8px !important;
            padding-right: 8px !important;
            max-width: 100% !important;
          }

          .table-mobile {
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
            padding: 12px 0;
            position: absolute;
            left: 0;
            top: -24px;
            bottom: 0;
            background: transparent;
            z-index: 10;
          }

          .mobile-label {
            display: flex;
            align-items: center;
            padding: 17px 20px;
          }

          .scroll-content {
            display: flex;
            overflow-x: auto;
            flex: 1;
          }

          /* pulsing glow */
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

          .mobile-card {
            padding: 0 12px 12px; /* remove top pad so header flush */
          }

          .table-mobile::-webkit-scrollbar {
            height: 10px;
          }

          .table-mobile::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 999px;
          }

          .table-mobile::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #d4af37, #f5d0ab);
            border-radius: 999px;
            min-height: 6px;
          }

          .table-inner {
            position: relative;
          }

          .coating-glow-tl,
          .coating-glow-br {
            display: none !important;
          }

          .scroll-hint {
            display: none;
          }

          .scroll-hint::after {
            content: "›";
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.65);
            font-size: 20px;
            font-weight: 600;
            pointer-events: none;
          }

          .mobile-card {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02),
              rgba(255, 255, 255, 0)
            );
            border-radius: 16px;
            /* remove top padding so header touches card edge */
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

          .mobile-card .mobile-value {
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

          .mobile-card .package-header {
            height: auto;
            padding: 12px 0;
            margin-bottom: 8px;
          }

          .mobile-card .header-text {
            font-size: 20px;
            line-height: 28px;
            letter-spacing: 0.12px;
          }

          /* header text gradient on mobile */
          .mobile-card .header-text {
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

          .mobile-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-top: 1px dashed rgba(255, 255, 255, 0.03);
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            line-height: 24px;
          }

          .mobile-row .label-text {
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .mobile-row .mobile-value {
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

          .mobile-price {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 8px;
            padding-top: 12px;
          }

          .mobile-cta .book-btn {
            width: 100%;
            padding: 10px 18px;
            border-radius: 999px;
            margin-top: 12px;
          }
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#026ee7]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-0 md:px-[112px] table-container">
        {/* Title */}
        <div
          style={{
            marginTop: "-40px",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "590px",
              height: "38px",
              background: "#026ee7",
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
            Explore Our Coating Options
          </h2>
        </div>

        {/* Table (column-based) */}
        <div className="table-wrapper" style={{ position: "relative" }}>
          {/* Top-left eclipse glow */}
          <div
            className="coating-glow-tl"
            style={{
              position: "absolute",
              left: "-60px",
              top: "-60px",
              width: "432px",
              height: "672px",
              background:
                "radial-gradient(ellipse at 20% 60%, rgba(212, 80, 80, 0.18), rgba(212, 80, 80, 0.06) 70%, rgba(0, 0, 0, 0) 90%)",
              filter: "blur(60px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Bottom-right eclipse glow */}
          <div
            className="coating-glow-br"
            style={{
              position: "absolute",
              right: "-80px",
              bottom: "-80px",
              width: "605px",
              height: "800px",
              background:
                "radial-gradient(ellipse at 80% 80%, rgba(212, 80, 80, 0.18), rgba(212, 80, 80, 0.06) 65%, rgba(0, 0, 0, 0) 90%)",
              filter: "blur(80px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <div className="table-inner" style={{ overflow: "visible" }}>
            <div className="table-grid">
              <div className="labels-column">
                <div className="header-space">
                  <div className="header-label ml-4">Package</div>
                </div>
                {labels.slice(0, 12).map((lbl, li) => (
                  <div className="label" key={li}>
                    <span className="label-text">
                      {lbl.label}
                      {lbl.key !== "warranty" && <span className="dot">◎</span>}
                    </span>
                  </div>
                ))}
                <div className="label">
                  <div className="header-label -mt-8">Price</div>
                </div>
              </div>

              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`package-column ${activeCol === i ? "active" : ""}`}
                  onMouseEnter={() => setActiveCol(i)}
                  onFocus={() => setActiveCol(i)}
                  tabIndex={0}
                >
                  <div className="package-header">
                    <span className="header-text">{pkg.name}</span>
                  </div>

                  <div className="package-value">{pkg.hardness}</div>
                  <div className="package-value">{pkg.thickness}</div>
                  <div className="package-value">{pkg.maintenance}</div>
                  <div className="package-value">{pkg.nano}</div>
                  <div className="package-value">
                    {pkg.body ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.light ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.glasses ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.dashboard ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.leather ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.tire ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="package-value">
                    {pkg.engine ? <CheckIcon /> : <CrossIcon />}
                  </div>

                  <div className="package-value">{pkg.warranty}</div>

                  <div className="package-price">
                    <span className="price-current">{pkg.price}</span>
                    <span className="price-original">{pkg.original}</span>
                  </div>

                  <div className="package-cta">
                    <button
                      type="button"
                      onClick={() => handleBookNow(pkg)}
                      aria-label={`Book ${pkg.name} coating package`}
                      className={`book-btn ${i < 3 ? "book-top" : "book-bottom"}`}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="mobile-scroll-wrapper relative md:hidden">
          {/* fixed labels column */}
          <div className="labels-mobile">
            <div className="mobile-label">
              <span className="label-text">Package</span>
            </div>
            {labels.map((lbl) => (
              <div className="mobile-label" key={lbl.key}>
                <span className="label-text">{lbl.label}</span>
                {['hardness','thickness','maintenance'].includes(lbl.key) && (
                  <span className="dot">◎</span>
                )}
              </div>
            ))}
            <div className="mobile-label">
              <span className="label-text">Price</span>
            </div>
          </div>
          
          {/* scrollable content shifted right to clear labels */}
          <div className="scroll-content flex ml-[120px]">
            <div className="table-mobile" ref={mobileTableRef}>
              {packages.map((pkg, i) => (
                <div className="mobile-card" key={i}>
                  <div className="package-header">
                    <span className="header-text">{pkg.name}</span>
                  </div>

                  <div className="mobile-value">{pkg.hardness}</div>
                  <div className="mobile-value">{pkg.thickness}</div>
                  <div className="mobile-value">{pkg.maintenance}</div>
                  <div className="mobile-value">{pkg.nano}</div>
                  <div className="mobile-value">
                    {pkg.body ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.light ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.glasses ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.dashboard ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.leather ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.tire ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">
                    {pkg.engine ? <CheckIcon /> : <CrossIcon />}
                  </div>
                  <div className="mobile-value">{pkg.warranty}</div>

                  <div className="mobile-price">
                    <div className="price-current">{pkg.price}</div>
                    <div className="price-original">{pkg.original}</div>
                  </div>

                  <div className="mobile-cta md:hidden">
                    <button
                      type="button"
                      onClick={() => handleBookNow(pkg)}
                      aria-label={`Book ${pkg.name} coating package`}
                      className="book-btn"
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

        <p className="text-[16px] text-[#a9a9a9] mt-12 text-center Montserrat">
          Custom offer or Any questions? {" "}
          <Link href="/contact">
            <span
              className="font-semibold cursor-pointer"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontStyle: "SemiBold",
              fontSize: "16px",
              lineHeight: "28px",
              letterSpacing: "0.2%",
              background:
                "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact us
            </span>
          </Link>
        </p>
      </div>

      {/* Booking + Checkout modals (wired to Book buttons above) */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: bookingData?.name,
          warranty: bookingData?.warranty,
          hardness: bookingData?.hardness || bookingData?.hardness,
          thickness: bookingData?.thickness || bookingData?.thickness,
          price: bookingData?.price,
          original: bookingData?.original,
          nano: bookingData?.nano,
          maintenance: bookingData?.maintenance,
        }}
        onContinue={handleContinue}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseAll}
        onBack={handleBack}
        packageData={{
          name: bookingData?.name,
          price: bookingData?.price,
          original: bookingData?.original,
        }}
        bookingData={bookingData}
      />
    </section>
  );
}
