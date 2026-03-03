"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const windowTypes = [
  {
    name: "FRONT",
    activeVLT: 5,
    image: "/tint/frontvltcar.svg",
    eclipse: "/tint/fronteclipse.svg",
    carWidth: "710px",
    carHeight: "499px",
    eclipseWidth: "628px",
    eclipseHeight: "83px",
    eclipseBottom: "10px",
  },
  {
    name: "SIDE",
    activeVLT: 30,
    image: "/tint/vlt-car2.png",
    eclipse: "/tint/sideclipse.svg",
    carWidth: "892px",
    carHeight: "649px",
    eclipseWidth: "800px",
    eclipseHeight: "100px",
    eclipseBottom: "130px",
  },
  {
    name: "REAR",
    activeVLT: 50,
    image: "/tint/vlt-car3.png",
    eclipse: "/tint/rareAclipse.svg",
    carWidth: "934px",
    carHeight: "587px",
    eclipseWidth: "782px",
    eclipseHeight: "163px",
    eclipseBottom: "90px",
  },
];

const vltLevels = [5, 15, 30, 50, 70];

// Get the car image source for a given window type and VLT level
function getCarSrcFor(windowName, vlt) {
  if (windowName === "FRONT") {
    return vlt === 5
      ? "/tint/frontvltcar.svg"
      : `/tint/front/${String(vlt).padStart(2, "0")}.png`;
  }
  if (windowName === "SIDE") {
    return vlt === 30
      ? "/tint/vlt-car2.png"
      : `/tint/side/${String(vlt).padStart(2, "0")}.png`;
  }
  if (windowName === "REAR") {
    return vlt === 50
      ? "/tint/vlt-car3.png"
      : `/tint/rear/${String(vlt).padStart(2, "0")}.png`;
  }
  return "/tint/frontvltcar.svg";
}

export default function VLTLevels() {
  const [activeWindow, setActiveWindow] = useState("FRONT");
  const [selectedVLTs, setSelectedVLTs] = useState({
    FRONT: 5,
    SIDE: 30,
    REAR: 50,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVLTs, setMobileVLTs] = useState({
    FRONT: 5,
    SIDE: 5,
    REAR: 5,
  });
  const [mobileActiveRow, setMobileActiveRow] = useState("FRONT");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentWindow = windowTypes.find((w) => w.name === activeWindow);

  const getCarSrc = () => {
    // FRONT uses user-provided per-percent images stored in public/tint/front
    if (activeWindow === "FRONT") {
      const v = selectedVLTs.FRONT ?? 5;
      return v === 5
        ? "/tint/frontvltcar.svg"
        : `/tint/front/${String(v).padStart(2, "0")}.png`;
    }

    // SIDE: default/active level is 30% (uses `currentWindow.image`); other levels use files in public/tint/side
    if (activeWindow === "SIDE") {
      const v = selectedVLTs.SIDE ?? 30;
      return v === 30
        ? currentWindow.image
        : `/tint/side/${String(v).padStart(2, "0")}.png`;
    }

    // REAR: default is 50% (currentWindow.image); other levels use files in public/tint/rear
    if (activeWindow === "REAR") {
      const v = selectedVLTs.REAR ?? 50;
      return v === 50
        ? currentWindow.image
        : `/tint/rear/${String(v).padStart(2, "0")}.png`;
    }

    return currentWindow.image;
  };

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

        {/* All 3 cars stacked */}
        <div className="w-full flex flex-col items-center gap-2 mb-4 pt-24">
          {windowTypes.map((wt) => (
            <div key={wt.name} className="w-full flex justify-center">
              <img
                src={getCarSrcFor(wt.name, mobileVLTs[wt.name])}
                alt={`${wt.name} car view`}
                className={`mobile-car-img ${wt.name !== "FRONT" ? "mobile-car-img-large" : ""}`}
                style={{ display: "block", transition: "opacity 0.25s ease" }}
              />
            </div>
          ))}
        </div>

        {/* VLT Grid Table */}
        <div className="w-full max-w-[360px] mx-auto">
          <div className="flex flex-col gap-2">
            {windowTypes.map((wt) => {
              const isActiveRow = mobileActiveRow === wt.name;
              return (
                <div key={wt.name} className="flex items-center gap-3">
                  {/* Window Type Button */}
                  <button
                    onClick={() => setMobileActiveRow(wt.name)}
                    type="button"
                    className="vlt-window-btn-mobile font-oswald tracking-wider flex items-center justify-center shrink-0"
                    style={
                      isActiveRow
                        ? {
                            background:
                              "linear-gradient(114.31deg, #151000 -20.74%, #2C2405 55.8%, #634D05 106.02%)",
                            border: "1px solid transparent",
                            borderImageSource:
                              "linear-gradient(135.34deg, #856220 15.43%, #F4E683 34.91%, #BF923D 50.85%, #4E341B 68.56%, #F1EA82 86.26%)",
                            borderImageSlice: 1,
                            color: "#FFFFFF",
                          }
                        : {
                            background: "#1A1A1A",
                            border: "1px solid transparent",
                            color: "#A9A9A9",
                          }
                    }
                  >
                    {wt.name}
                  </button>

                  {/* VLT Percentage Options */}
                  <div className="flex-1 flex items-center justify-between">
                    {vltLevels.map((vlt) => {
                      const isActive = mobileVLTs[wt.name] === vlt;
                      return (
                        <button
                          key={vlt}
                          onClick={() => {
                            setMobileActiveRow(wt.name);
                            setMobileVLTs((prev) => ({
                              ...prev,
                              [wt.name]: vlt,
                            }));
                          }}
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
        {/* All 3 Car Images shown side by side */}
        <div
          className="relative w-full max-w-[1200px] mx-auto vlt-stage flex items-end justify-center gap-4"
          style={{ minHeight: "450px" }}
        >
          {windowTypes.map((wt) => {
            const isActive = activeWindow === wt.name;
            const carSrc = getCarSrcFor(wt.name, selectedVLTs[wt.name] ?? wt.activeVLT);
            return (
              <div
                key={wt.name}
                className="relative flex flex-col items-center transition-all duration-500 ease-in-out cursor-pointer"
                style={{
                  flex: isActive ? "1.4" : "0.8",
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? "none" : "brightness(0.7)",
                  transition: "flex 0.5s ease, opacity 0.5s ease, filter 0.5s ease",
                }}
                onClick={() => setActiveWindow(wt.name)}
              >
                {/* Eclipse Background */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 z-0"
                  style={{
                    width: "80%",
                    height: "60px",
                    bottom: "0px",
                    opacity: isActive ? 1 : 0.4,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <Image
                    src={wt.eclipse}
                    alt="Eclipse effect"
                    width={parseInt(wt.eclipseWidth)}
                    height={parseInt(wt.eclipseHeight)}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Car Image with smooth crossfade */}
                <div
                  className="relative z-10 w-full"
                  style={{
                    height: isActive ? "380px" : "280px",
                    transition: "height 0.5s ease",
                  }}
                >
                  <img
                    src={carSrc}
                    alt={`${wt.name} car view`}
                    className="w-full h-full object-contain"
                    style={{
                      display: "block",
                      transition: "opacity 0.4s ease-in-out",
                    }}
                  />
                </div>
                {/* Window type label */}
                <span
                  className="mt-2 font-oswald text-center"
                  style={{
                    fontSize: isActive ? "18px" : "14px",
                    color: isActive ? "#D4AF37" : "#666",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                  }}
                >
                  {wt.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* VLT Grid Table */}
        <div className="max-w-[900px] mx-auto w-full vlt-controls">
          <div className="flex flex-col gap-3">
            {windowTypes.map((window) => (
              <div key={window.name} className="flex items-center gap-6">
                {/* Window Type Button */}
                <button
                  onClick={() => {
                    setActiveWindow(window.name);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setActiveWindow(window.name);
                  }}
                  type="button"
                  className={`vlt-window-btn font-oswald tracking-wider transition-all flex items-center ${
                    activeWindow === window.name ? "" : ""
                  }`}
                  style={
                    activeWindow === window.name
                      ? {
                          background:
                            "linear-gradient(114.31deg, #151000 -20.74%, #2C2405 55.8%, #634D05 106.02%)",
                          border: "1px solid transparent",
                          borderImageSource:
                            "linear-gradient(135.34deg, #856220 15.43%, #F4E683 34.91%, #BF923D 50.85%, #4E341B 68.56%, #F1EA82 86.26%)",
                          borderImageSlice: 1,
                          width: "159px",
                          height: "64px",
                          gap: "10px",
                          borderRadius: "5px",
                          paddingTop: "16px",
                          paddingRight: "61px",
                          paddingBottom: "16px",
                          paddingLeft: "61px",
                          opacity: 1,
                          justifyContent: "center",
                          color: "#FFFFFF",
                          fontFamily: "Oswald, sans-serif",
                          fontWeight: 500,
                          fontStyle: "normal",
                          fontSize: "28px",
                          lineHeight: "40px",
                          letterSpacing: "0.5%",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }
                      : {
                          background: "#1A1A1A",
                          width: "159px",
                          height: "64px",
                          gap: "10px",
                          borderRadius: "5px",
                          paddingTop: "16px",
                          paddingRight: "61px",
                          paddingBottom: "16px",
                          paddingLeft: "61px",
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
                        }
                  }
                >
                  {window.name}
                </button>

                {/* VLT Percentage Options */}
                <div className="flex-1 flex items-center gap-4 vlt-perc">
                  {vltLevels.map((vlt) => {
                    const isActive =
                      (selectedVLTs[window.name] ?? window.activeVLT) === vlt;
                    return (
                      <button
                        key={vlt}
                        onClick={() => {
                          setSelectedVLTs((prev) => ({
                            ...prev,
                            [window.name]: vlt,
                          }));
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          setSelectedVLTs((prev) => ({
                            ...prev,
                            [window.name]: vlt,
                          }));
                        }}
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
        .vlt-car-container {
          position: relative;
        }

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
          width: 80%;
          max-width: 300px;
          height: 130px;
          object-fit: contain;
          will-change: opacity;
        }
        .mobile-car-img-large {
          width: 95%;
          max-width: 360px;
          height: 150px;
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
        }

        /* large mobile / small tablet (641px - 767px) */
        @media (min-width: 641px) and (max-width: 767px) {
          .vlt-section {
            padding: 2px !important;
          }
          .vlt-frame {
            max-width: calc(var(--car-mobile-width, 540px) * 1.2) !important;
          }
          .vlt-car-container {
            max-width: min(96vw, 820px) !important;
            max-height: 480px !important;
            min-height: 340px !important;
            height: auto !important;
          }
          .vlt-eclipse {
            display: none !important;
          }
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
          .vlt-controls {
            margin-top: -8px !important;
          }
        }

        /* small tablets (768px - 900px) */
        @media (min-width: 768px) and (max-width: 900px) {
          .vlt-frame {
            max-width: calc(var(--car-mobile-width, 540px) * 1.4) !important;
          }
          .vlt-eclipse {
            max-width: calc(
              var(--eclipse-mobile-width, 300px) * 1.4
            ) !important;
          }

          .vlt-car-container {
            max-width: min(96vw, 820px) !important;
            max-height: 480px !important;
            height: auto !important;
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
