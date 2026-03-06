"use client";

import Image from "next/image";
import { useState } from "react";

const windowTypes = [
  {
    key: "front",
    name: "FRONT",
  },
  {
    key: "front-side",
    name: "Front-Side",
  },
  {
    key: "back-side",
    name: "Back Side",
  },
  {
    key: "rear",
    name: "REAR",
  },
];

const vltLevels = [5, 15, 30, 50, 70];

function getTintNewCarSrc(windowKey, vlt) {
  return `/tint-new/${windowKey}/${vlt}.png`;
}

export default function VLTLevels() {
  const [selectedVLTByWindow, setSelectedVLTByWindow] = useState({
    front: 5,
    "front-side": 30,
    "back-side": 50,
    rear: 30,
  });

  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0C] pt-24 sm:pt-0"
      style={{
        width: "100%",
        height: "1080px",
        opacity: 1,
      }}
    >
      {/* Desktop background */}
      <div className="absolute inset-0 z-0 vlt-bg">
        <Image
          src="/tint/vltbg.svg"
          alt="VLT Background"
          width={1440}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mobile background */}
      <div className="absolute inset-0 z-0 vlt-bg-mobile">
        <Image
          src="/tint/mobile/vltbg.png"
          alt="VLT Background"
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* ========== MOBILE LAYOUT: All 3 cars stacked + grid ========== */}
      <div className="relative z-10 px-4 pt-6 pb-4 flex-col items-center vlt-mobile-layout">
        {/* Mobile Header */}
        <div className="vlt-mobile-header">
          <div className="mobile-header-glow" />
          <h2
            className="vlt-mobile-title"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "32px",
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
            Optimal VLT Levels
          </h2>
        </div>

        {/* 2x2 car grid on mobile */}
        <div className="w-full max-w-[380px] mx-auto grid grid-cols-2 gap-3 mb-4 pt-10">
          {windowTypes.map((wt) => (
            <div
              key={wt.key}
              className="w-full flex flex-col items-center justify-end"
            >
              <img
                src={getTintNewCarSrc(wt.key, selectedVLTByWindow[wt.key])}
                alt={`${wt.name} car view`}
                className="mobile-car-img"
                style={{ display: "block", transition: "opacity 0.25s ease" }}
              />
              <span className="mt-1 text-[12px] font-oswald text-[#A9A9A9]">
                {wt.name}
              </span>
            </div>
          ))}
        </div>

        {/* VLT Grid Table */}
        <div className="w-full max-w-[360px] mx-auto">
          <div className="flex flex-col gap-2">
            {windowTypes.map((wt) => {
              return (
                <div key={wt.name} className="flex items-center gap-3">
                  <div
                    className="vlt-window-btn-mobile font-oswald tracking-wider flex items-center justify-center shrink-0"
                    style={{
                      background: "#1A1A1A",
                      border: "1px solid transparent",
                      color: "#A9A9A9",
                    }}
                  >
                    {wt.name}
                  </div>

                  {/* VLT Percentage Options */}
                  <div className="flex-1 flex items-center justify-between">
                    {vltLevels.map((vlt) => {
                      const isActive = selectedVLTByWindow[wt.key] === vlt;
                      return (
                        <button
                          key={vlt}
                          onClick={() =>
                            setSelectedVLTByWindow((prev) => ({
                              ...prev,
                              [wt.key]: vlt,
                            }))
                          }
                          type="button"
                          aria-pressed={isActive}
                          className={`font-oswald font-semibold transition-colors focus:outline-none ${
                            isActive ? "text-[#D4AF37]" : "text-[#666]"
                          }`}
                          style={{
                            cursor: "pointer",
                            touchAction: "manipulation",
                            fontSize: "14px",
                            padding: "4px 2px",
                          }}
                        >
                          {String(vlt).padStart(2, "0")}%
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px] mt-10 h-full flex flex-col justify-center vlt-desktop-layout">
        {/* 4 car images in 2x2 */}
        <div
          className="relative w-full max-w-[1200px] mx-auto vlt-stage vlt-car-grid"
          style={{ minHeight: "420px" }}
        >
          {windowTypes.map((wt) => {
            return (
              <div
                key={wt.key}
                className="relative flex flex-col items-center justify-end"
              >
                <img
                  src={getTintNewCarSrc(wt.key, selectedVLTByWindow[wt.key])}
                  alt={`${wt.name} car view`}
                  className="desktop-car-img"
                  style={{
                    display: "block",
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* VLT Grid Table */}
        <div className="max-w-[900px] mx-auto w-full vlt-controls">
          <div className="flex flex-col gap-3">
            {windowTypes.map((window) => (
              <div key={window.name} className="flex items-center gap-6">
                <div
                  className="vlt-window-btn font-oswald tracking-wider transition-all flex items-center"
                  style={{
                    background: "#1A1A1A",
                    width: "159px",
                    height: "64px",
                    gap: "10px",
                    borderRadius: "5px",
                    paddingTop: "16px",
                    paddingRight: "24px",
                    paddingBottom: "16px",
                    paddingLeft: "24px",
                    opacity: 1,
                    justifyContent: "center",
                    color: "#A9A9A9",
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "28px",
                    lineHeight: "40px",
                    letterSpacing: "0.5%",
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {window.name}
                </div>

                {/* VLT Percentage Options */}
                <div className="flex-1 flex items-center gap-4 vlt-perc">
                  {vltLevels.map((vlt) => {
                    const isActive = selectedVLTByWindow[window.key] === vlt;
                    return (
                      <button
                        key={vlt}
                        onClick={() =>
                          setSelectedVLTByWindow((prev) => ({
                            ...prev,
                            [window.key]: vlt,
                          }))
                        }
                        type="button"
                        aria-pressed={isActive}
                        className={`flex-1 text-center font-oswald font-semibold text-[24px] transition-colors focus:outline-none ${
                          isActive ? "text-[#D4AF37]" : "text-[#666]"
                        }`}
                        style={{
                          cursor: "pointer",
                          touchAction: "manipulation",
                        }}
                      >
                        {String(vlt).padStart(2, "0")}%
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .vlt-window-btn {
          border-radius: 5px;
          transition:
            background-color 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        button {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Default: hide mobile, show desktop */
        .vlt-mobile-layout {
          display: none;
        }
        .vlt-desktop-layout {
          display: flex;
        }
        .vlt-bg-mobile {
          display: none;
        }

        .vlt-car-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: end;
          justify-items: center;
        }

        .desktop-car-img {
          width: 100%;
          max-width: 470px;
          height: 185px;
          object-fit: contain;
        }

        .vlt-mobile-header {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        /* Blue glow under mobile header */
        .mobile-header-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 590px;
          height: 38px;
          border-radius: 50%;
          background: #032ebd;
          filter: blur(40px);
          opacity: 0.8;
          z-index: 0;
        }

        /* Mobile car images */
        .mobile-car-img {
          width: 100%;
          max-width: 180px;
          height: 95px;
          object-fit: contain;
          will-change: opacity;
        }

        /* Mobile window type button */
        .vlt-window-btn-mobile {
          width: 70px;
          height: 36px;
          border-radius: 5px;
          font-family: Oswald, sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          text-transform: capitalize;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
          transition: background-color 200ms ease;
        }

        /* MOBILE: show mobile layout, hide desktop layout */
        @media (max-width: 640px) {
          .vlt-mobile-layout {
            display: flex !important;
          }
          .vlt-desktop-layout {
            display: none !important;
          }
          .vlt-bg {
            display: none !important;
          }
          .vlt-bg-mobile {
            display: block !important;
          }
          section {
            height: auto !important;
            min-height: 0 !important;
          }
          .vlt-mobile-title {
            font-size: 30px !important;
            line-height: 40px !important;
          }
          .mobile-header-glow {
            width: 360px;
          }
        }

        /* large mobile / small tablet (641px - 767px) */
        @media (min-width: 641px) and (max-width: 767px) {
          .vlt-window-btn {
            width: 100% !important;
            max-width: 360px !important;
            height: 44px !important;
            padding: 8px 16px !important;
            font-size: 18px !important;
            line-height: 22px !important;
          }
          .vlt-row {
            gap: 8px !important;
          }
          .vlt-perc button {
            font-size: 18px !important;
          }
        }

        /* small tablets (768px - 900px) */
        @media (min-width: 768px) and (max-width: 900px) {
          .vlt-car-grid {
            gap: 8px;
          }
          .desktop-car-img {
            max-width: 360px;
            height: 145px;
          }
          .vlt-window-btn {
            width: 140px !important;
            height: 56px !important;
            padding: 12px 28px !important;
            font-size: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
