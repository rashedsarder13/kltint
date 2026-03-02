"use client";

import { useState } from "react";

const labels = [
  "Film Type",
  "Thickness",
  "Color Options",
  "Effect Options",
  "Warranty",
];
const specKeys = [
  "filmType",
  "thickness",
  "colorOptions",
  "effectOptions",
  "warranty",
];

const packages = [
  {
    name: "BASIC",
    filmType: "PVC",
    thickness: "5mm",
    colorOptions: "1500",
    effectOptions: "3",
    warranty: "2 year",
    price: "1299",
    original: "1999",
  },
  {
    name: "SILVER",
    filmType: "Ceramic",
    thickness: "6mm",
    colorOptions: "2000",
    effectOptions: "4",
    warranty: "3 year",
    price: "1899",
    original: "2699",
  },
  {
    name: "GOLD",
    filmType: "Premium",
    thickness: "7mm",
    colorOptions: "2500",
    effectOptions: "5",
    warranty: "4 year",
    price: "2599",
    original: "3499",
    highlight: true,
  },
  {
    name: "PLATINUM",
    filmType: "Ultra",
    thickness: "8mm",
    colorOptions: "3000",
    effectOptions: "6",
    warranty: "5 year",
    price: "3299",
    original: "4499",
  },
  {
    name: "SIGNATURE",
    filmType: "Supreme",
    thickness: "9mm",
    colorOptions: "3500",
    effectOptions: "7",
    warranty: "7 year",
    price: "4599",
    original: "6299",
  },
];

export default function ExploreOptionsSection() {
  const [activeCol, setActiveCol] = useState(2); // highlight GOLD by default
  return (
    <section className="relative py-24 overflow-hidden bg-[#0A0A0C]">
      <style jsx>{`
        .combo-table-wrapper {
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

        .combo-table-inner {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.25)
          );
          border-radius: 45px;
          padding: 34px;
          backdrop-filter: blur(10px);
          width: 1224px;
          height: 580px;
          overflow: hidden;
        }

        .combo-table-grid {
          display: grid;
          grid-template-columns: 200px repeat(5, 132px);
          gap: 18px;
          width: 1224px;
          margin: 0 auto;
          align-items: start;
        }

        .combo-labels-column {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: transparent;
          align-items: flex-start;
        }

        .combo-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 20px;
          background: transparent;
          width: 100%;
        }

        .combo-label-text {
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
        }

        .combo-package-column {
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 12px;
          overflow: visible;

          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0)
          );
          height: 542px;
          box-sizing: border-box;
        }

        .combo-package-column::before {
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

        .combo-package-column:hover::before,
        .combo-package-column.active::before {
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

        .combo-package-column:hover,
        .combo-package-column.active {
          box-shadow: 0px 30px 20px 20px hsla(0, 0%, 0%, 0.38);
        }

        .combo-package-header {
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

        .combo-header-text {
          font-family: "Oswald", sans-serif;
          font-weight: 500;
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

        .combo-package-value {
          width: 100%;
          padding: 18px 0;
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
          color: transparent;
        }

        .combo-book-btn {
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
          margin-top: 6px;
          margin-bottom: 15px;
        }

        .combo-package-column:hover .combo-book-btn,
        .combo-package-column.active .combo-book-btn {
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

        .combo-price {
          display: flex;
          gap: 8px;
          align-items: baseline;
          justify-content: center;
          margin-top: 12px;
        }

        .combo-price-current {
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

        .combo-price-original {
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: rgba(107, 114, 128, 0.9);
          text-decoration: line-through;
          margin-top: 0;
        }

        .dot {
          margin-left: 8px;
          color: #6b7280;
          font-size: 12px;
        }

        .combo-table-mobile {
          display: none;
        }

        @media (max-width: 640px) {
          .combo-table-wrapper {
            display: none !important;
          }

          .combo-table-mobile {
            display: flex !important;
            gap: 12px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding: 0 6px;
            scroll-snap-type: x mandatory;
          }

          .combo-table-container {
            padding-left: 8px !important;
            padding-right: 8px !important;
            max-width: 100% !important;
          }

          .combo-table-inner {
            padding: 8px !important;
            width: 100% !important;
            height: auto !important;
            border-radius: 16px !important;
          }

          .combo-glow-tl,
          .combo-glow-br {
            display: none !important;
          }

          .combo-table-mobile .mobile-card {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.02),
              rgba(255, 255, 255, 0)
            );
            border-radius: 16px;
            padding: 12px;
            flex: 0 0 calc(50% - 6px);
            min-width: calc(50% - 6px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            scroll-snap-align: center;
          }

          .combo-mobile-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-top: 1px dashed rgba(255, 255, 255, 0.03);
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
            line-height: 24px;
          }

          .combo-mobile-row .label-text {
            font-family: "Oswald", sans-serif;
            font-size: 16px;
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
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00BFFF]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px] combo-table-container">
        <div
          style={{
            marginBottom: "60px",
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
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
