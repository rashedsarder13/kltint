"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";

const labels = [
  "Package",
  "UV",
  "IRR",
  "TSER",
  "Film",
  "Technology",
  "Warranty",
  "Price",
];

const packages = [
  {
    name: "SILVER",
    uv: "99.9%",
    irr: "65%",
    tser: "48%",
    film: "48%",
    tech: "48%",
    warranty: "2 year",
    price: "288",
    original: "576",
    color: "from-[#a8b2bd] to-[#e2e8f0]",
  },
  {
    name: "PRO",
    uv: "99.9%",
    irr: "60%",
    tser: "84%",
    film: "48%",
    tech: "48%",
    warranty: "3 year",
    price: "449",
    original: "889",
    color: "from-[#60a5fa] to-[#93c5fd]",
  },
  {
    name: "GOLD",
    uv: "99.9%",
    irr: "60%",
    tser: "84%",
    film: "48%",
    tech: "48%",
    warranty: "3 year",
    price: "449",
    original: "889",
    color: "from-[#d4af37] to-[#f5d0ab]",
  },
  {
    name: "DIAMOND",
    uv: "99.9%",
    irr: "95%",
    tser: "76%",
    film: "48%",
    tech: "48%",
    warranty: "5 year",
    price: "799",
    original: "1599",
    color: "from-[#7dd3fc] to-[#bae6fd]",
  },
  {
    name: "PLATINUM",
    uv: "99.9%",
    irr: "97%",
    tser: "80%",
    film: "80%",
    tech: "80%",
    warranty: "6 year",
    price: "999",
    original: "1999",
    color: "from-[#c4b5fd] to-[#e9d5ff]",
  },
  {
    name: "TITANIUM",
    uv: "99.9%",
    irr: "98%",
    tser: "87%",
    film: "48%",
    tech: "48%",
    warranty: "7 year",
    price: "1599",
    original: "3199",
    color: "from-[#34d399] to-[#6ee7b7]",
  },
  {
    name: "SIGNATURE",
    uv: "99.9%",
    irr: "99%",
    tser: "93%",
    film: "48%",
    tech: "48%",
    warranty: "10 year",
    price: "2199",
    original: "4199",
    color: "from-[#f87171] to-[#fca5a5]",
  },
];

export default function TintOptions() {
  const [activeCol, setActiveCol] = useState(4); // default active: PLATINUM

  // ref for mobile scroll container
  const mobileTableRef = useRef(null);

  const scrollMobileTable = () => {
    if (mobileTableRef.current) {
      const el = mobileTableRef.current;
      const step = el.offsetWidth * 0.5; // two cards visible at once
      const maxScroll = el.scrollWidth - el.clientWidth;
      // wrap back to start if scrolling past the end
      if (el.scrollLeft + step >= maxScroll) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }
  };

  // Booking modal state (same flow as PackageSection)
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
    <section
      id="tint-options"
      className="relative py-24 overflow-hidden bg-[#0A0A0C]"
      style={{ scrollMarginTop: "190px" }}
    >
      <style jsx>{`
        .table-wrapper {
          position: relative;
          max-width: 1224px;
          margin: 0 auto;
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

        .table-inner {
          /* slightly darker inner background for stronger contrast */
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.25)
          );
          border-radius: 45px;
          padding: 34px; /* exact padding requested */
          backdrop-filter: blur(10px);
          width: 1224px;
          height: 702px; /* full table height */
          overflow: hidden;
        }

        .package-column {
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; /* header on top, CTA near bottom */
          border-radius: 12px;
          overflow: visible;
          padding: 0 8px; /* horizontal padding only */
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0)
          );
          height: 636px; /* fixed column height */
          box-sizing: border-box;
        }

        .package-column::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          padding: 1px;
          background: transparent;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
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

        .table-grid {
          display: grid;
          grid-template-columns: 120px repeat(7, 132px);
          gap: 18px; /* no other gaps inside table */
          width: 1224px;
          margin: 0 auto;
          align-items: start;
        }

        .labels-column {
          display: flex;
          flex-direction: column;
          gap: 0; /* no gaps inside labels column */
          background: transparent; /* no extra bg as requested */
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
          padding: 22px 20px; /* top/bottom 22px */
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
          color: transparent; /* text uses gradient */
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 22px;
          line-height: 31px;
          letter-spacing: 0.5px;
          text-transform: capitalize;
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
          padding: 22px 0; /* aligns vertically within header-space */
        }

        .package-column {
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; /* header on top, CTA near bottom */
          border-radius: 12px;
          overflow: visible;
          padding: 0 0px; /* horizontal padding only */
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0)
          );
          height: 636px; /* fixed column height */
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

        .package-header {
          width: 100%;
          height: 70px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          padding: 0; /* remove all padding so header bg touches body and text has no inset */
          gap: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(283.14deg, #2d2d29 9.54%, #0d0e0e 90.46%);
          color: white;
          padding-left: 0px; /* offset header padding so it aligns with labels column */
        }

        /* Header text */
        .header-text {
          margin: 0;
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 28px;
          line-height: 40px;
          letter-spacing: 0.14px; /* ~0.5% */
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

        /* Header hover changes to golden text gradient */
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

        /* Keep column highlight active until another column is hovered */
        .package-column.active::before,
        .package-column:hover::before {
          opacity: 1;
        }

        .package-column.active,
        .package-column:hover {
          box-shadow: 0px 30px 20px 20px hsla(0, 0%, 0%, 0.38);
        }

        .package-column.active .book-btn,
        .package-column:hover .book-btn {
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

        .package-column.active .book-btn::before,
        .package-column:hover .book-btn::before {
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

        /* small ◎ symbol for certain labels */
        .dot {
          margin-left: 8px;
          color: #6b7280;
          font-size: 12px;
        }

        .package-value {
          width: 100%;
          padding: 22px 0; /* top/bottom padding 22px */
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
          margin-bottom: 25px; /* spacing below the button */
        }

        /* When hovering column, also apply button hover state */
        .package-column:hover .book-btn {
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

        .package-column:hover .book-btn::before {
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

        /* Staggered button positions to match reference (left higher, right lower) */
        .book-top {
          margin-top: 20px;
        }

        .book-bottom {
          margin-top: 16px;
        }

        /* Price styles */
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

        /* Override: make each column slightly lighter for better contrast */
        .package-column {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.02)
          ) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
        }

        .table-mobile {
          display: none;
        }

        /* Mobile-only responsive layout (<=640px). Desktop unchanged. */
        @media (max-width: 640px) {
          .table-wrapper {
            display: none !important;
          }

          .table-inner {
            padding: 8px !important; /* reduced outer padding for mobile */
            width: 100% !important;
            height: auto !important;
            border-radius: 16px !important;
          }

          /* adjust heading for mobile devices */
          .section-title {
            font-size: 32px !important;
            line-height: 40px !important;
            font-family: "Oswald", sans-serif !important;
            font-weight: 500 !important;
            letter-spacing: 0px !important;
            color:  linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)
 !important;
            /* keep same weight/color/gradient as desktop */
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
          }

          .scroll-btn img {
            display: block;
            width: 40px;
            height: auto;
          }

          /* pulsing glow to draw attention */
          @keyframes scrollGlow {
            0%, 100% {
              box-shadow: 0 0 6px 3px rgba(212, 175, 55, 0.4);
            }
            50% {
              box-shadow: 0 0 12px 5px rgba(212, 175, 55, 0.6);
            }
          }

          .scroll-btn {
            animation: scrollGlow 1.5s infinite alternate;
            border-radius: 50%;
          }

          .scroll-content {
            display: flex;
            overflow-x: auto;
            flex: 1;
          }

          /* ensure outer page container doesn't add big horizontal gutters */
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

          /* make the inner container positioned so overlay can be absolute */
          .table-inner {
            position: relative;
          }

          /* right-side gradient hint to indicate more content */
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

          .labels-mobile {
            display: flex;
            flex-direction: column;
            gap: 0;
            width: 120px;
            padding: 12px 0;
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

          .mobile-card {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02),
              rgba(255, 255, 255, 0)
            );
            border-radius: 16px;
            /* remove top padding so header touches card edge */
            padding: 0 12px px !important;
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

          /* mobile cards should use same header styling as desktop, so no overrides here */

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
            color: transparent; /* Uses gradient with background-clip */
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
            padding: 10px 16px;
            border-radius: 999px;
            margin-top: 18px;
          }
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00BFFF]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px] table-container">
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
          className="section-title -mt-4"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "72px",
            letterSpacing: "0.24px",
            textAlign: "center",
            textTransform: "capitalize",
            background: "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Explore Our Tint Options
        </h2>
      </div>

        {/* Table (column-based) */}
        <div className="table-wrapper">
          <div className="table-inner" style={{ overflow: "visible" }}>
            <div className="table-grid">
              <div className="labels-column">
                <div className="header-space">
                  <div className="header-label ml-4">Package</div>
                </div>
                {labels.slice(1, 7).map((lbl, li) => (
                  <div className="label" key={li}>
                    <span className="label-text">{lbl}</span>
                    {["UV", "IRR", "TSER"].includes(lbl) && (
                      <span className="dot">◎</span>
                    )}
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

                  <div className="package-value">{pkg.uv}</div>
                  <div className="package-value">{pkg.irr}</div>
                  <div className="package-value">{pkg.tser}</div>
                  <div className="package-value">{pkg.film}</div>
                  <div className="package-value">{pkg.tech}</div>
                  <div className="package-value">{pkg.warranty}</div>

                  <div className="package-price">
                    <span className="price-current">{pkg.price}</span>
                    <span className="price-original">{pkg.original}</span>
                  </div>

                  <div className="package-cta">
                    <button
                      onClick={() => handleBookClick(pkg)}
                      className={`book-btn ${i < 4 ? "book-top" : "book-bottom"}`}
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
              <span className="label-text">Package</span>
            </div>
            {labels.slice(1, 7).map((lbl, li) => (
              <div className="mobile-label" key={li}>
                <span className="label-text">{lbl}</span>
                {['UV','IRR','TSER'].includes(lbl) && <span className="dot">◎</span>}
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

                  <div className="mobile-value">{pkg.uv}</div>
                  <div className="mobile-value">{pkg.irr}</div>
                  <div className="mobile-value">{pkg.tser}</div>
                  <div className="mobile-value">{pkg.film}</div>
                  <div className="mobile-value">{pkg.tech}</div>
                  <div className="mobile-value">{pkg.warranty}</div>

                  <div className="mobile-price">
                    <div className="price-current">{pkg.price}</div>
                    <div className="price-original">{pkg.original}</div>
                  </div>

                  <div className="mobile-cta">
                    <button
                      className="book-btn"
                      onClick={() => handleBookClick(pkg)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="scroll-btn md:hidden"
              onClick={scrollMobileTable}
              aria-label="Scroll options"
            >
              <img src="/tint/mobile/tintOptionBtn.png" alt="" />
            </button>
          </div>
        </div>
        <div className="scroll-hint right" aria-hidden="true" />

        <p className="text-[16px] text-[#a9a9a9] mt-8 text-center Montserrat">
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

      {/* Modals (Booking -> Checkout) */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: selectedPackage?.name,
          warranty: selectedPackage?.warranty,
          uv: selectedPackage?.uv,
          irr: selectedPackage?.irr,
          tser: selectedPackage?.tser,
          film: selectedPackage?.film,
          price: selectedPackage?.price,
          original: selectedPackage?.original,
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
          original: selectedPackage?.original,
        }}
        bookingData={bookingData}
      />
    </section>
  );
}
