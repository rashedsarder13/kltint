"use client";

import { useState } from "react";
import Image from "next/image";

// Extended color list - shown as circular swatches with arrow navigation
const allColors = [
  { value: "red", hex: "#FF3B30", imageColor: "red" },
  { value: "ash", hex: "#B8B8B8", imageColor: "ash" },
  { value: "blue", hex: "#007AFF", imageColor: "blue" },
  { value: "green", hex: "#34C759", imageColor: "green" },
  { value: "orange", hex: "#FF9500", imageColor: "red" },
  { value: "yellow", hex: "#FFCC00", imageColor: "ash" },
  { value: "teal", hex: "#00C7BE", imageColor: "blue" },
  { value: "purple", hex: "#5856D6", imageColor: "blue" },
  { value: "pink", hex: "#FF2D55", imageColor: "red" },
  { value: "lavender", hex: "#AF52DE", imageColor: "blue" },
  { value: "charcoal", hex: "#3A3A3C", imageColor: "ash" },
  { value: "graphite", hex: "#636366", imageColor: "ash" },
  { value: "ivory", hex: "#F7F5EE", imageColor: "ash" },
  { value: "bronze", hex: "#A2845E", imageColor: "red" },
  { value: "cobalt", hex: "#0047AB", imageColor: "blue" },
  { value: "lime", hex: "#A4DE02", imageColor: "green" },
  { value: "mint", hex: "#98FF98", imageColor: "green" },
  { value: "maroon", hex: "#800000", imageColor: "red" },
  { value: "sky", hex: "#87CEEB", imageColor: "blue" },
  { value: "snow", hex: "#FFFFFF", imageColor: "ash" },
];

const COLORS_PER_PAGE = 4;

const WrappingOption = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [colorPage, setColorPage] = useState(0);

  const totalPages = Math.ceil(allColors.length / COLORS_PER_PAGE);
  const visibleColors = allColors.slice(
    colorPage * COLORS_PER_PAGE,
    colorPage * COLORS_PER_PAGE + COLORS_PER_PAGE
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    setSelectedColor("red");
    setColorPage(0);
  };

  const nextColorPage = () => {
    setColorPage((prev) => (prev + 1) % totalPages);
  };

  const prevColorPage = () => {
    setColorPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentColor = allColors.find((c) => c.value === selectedColor);
  const selectedImageColor = currentColor?.imageColor || "red";

  // Use matte as default effect since effects are removed from UI
  const imagePath = `/wrapping/${selectedImageColor}/${selectedImageColor}_matte.png`;

  return (
    <section className="relative py-12 md:py-16 bg-[#0A0A0C] overflow-hidden mt-10 d:mt-0">
      {/* Background glow - elliptical vignette effect */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1200px",
          maxHeight: "800px",
          background:
            "radial-gradient(ellipse, rgba(201, 169, 98, 0.15) 0%, rgba(201, 169, 98, 0.08) 30%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Title */}
      <div className="mb-12  relative flex items-center justify-center">
        <div
          className="absolute w-[590px] h-[38px] bg-[#032EBD] rounded-full opacity-80"
          style={{ filter: "blur(40px)" }}
        />
        <h2
          className="relative font-bold text-3xl md:text-4xl leading-tight text-center"
          style={{
            fontFamily: "Oswald, sans-serif",
            letterSpacing: "0.02em",
            background:
              "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Explore Our Wrapping Options
        </h2>
      </div>

      <div className="relative z-10 mx-auto px-0 md:px-4" style={{ maxWidth: "913px" }}>
        {/* Main Card */}
        <div
          className="relative rounded-[30px] md:rounded-[40px] overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(20, 20, 25, 0.98) 0%, rgba(10, 10, 15, 0.98) 100%)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            maxHeight: "700px",
          }}
        >
          {/* Header with PLATINUM and Close Button */}
          <div className="relative flex items-center justify-center p-4  pb-0">
            <h3
              className="font-medium"
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "28px",
                lineHeight: "40px",
                letterSpacing: "0.5%",
                textTransform: "capitalize",
                height: "40px",
                background:
                  "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PLATINUM
            </h3>
            <button
              onClick={handleReset}
              className="absolute right-4 md:right-6 top-4 md:top-6 flex items-center justify-center
                       rounded-full transition-all group hover:scale-110"
              style={{
                width: "20px",
                height: "20px",
                background:
                  "linear-gradient(269.91deg, #FFF6D2 0.06%, #D4AF37 99.91%)",
                opacity: 1,
              }}
              aria-label="Reset"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="transition-transform"
              >
                <path
                  d="M1 1L9 9M9 1L1 9"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="px-6 md:px-10 pb-4">
            {/* Car Image Area */}
            <div className="relative mb-6 md:mb-8">
              {/* Circular glow platform */}
              <div
                className="relative mx-auto"
                style={{ maxWidth: "600px", height: "220px" }}
              >
                {/* Platform ellipse shadow */}
                <div
                  className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: "80%",
                    height: "80px",
                    background:
                      "radial-gradient(ellipse, rgba(201, 169, 98, 0.25) 0%, rgba(201, 169, 98, 0.1) 40%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(20px)",
                  }}
                />

                {/* Car Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={imagePath}
                      alt={`${selectedColor} car wrap`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      style={{ transition: "opacity 0.4s ease-in-out" }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Color Display */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white/30"
                  style={{ backgroundColor: currentColor?.hex || "#FF0000" }}
                />
                <span
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {currentColor?.hex || "#FF0000"}
                </span>
              </div>
            </div>

            {/* Color Buttons with Navigation Arrows */}
            <div className="flex items-center justify-center gap-3 mb-5">
              {/* Left Arrow */}
              <button
                onClick={prevColorPage}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors shrink-0"
                aria-label="Previous colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Circular Color Buttons */}
              <div className="flex gap-2 md:gap-3 transition-all duration-300 ease-in-out">
                {visibleColors.map((color, idx) => (
                  <button
                    key={`${color.value}-${colorPage}-${idx}`}
                    onClick={() => handleColorChange(color.value)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-300"
                    style={{
                      borderWidth: "2px",
                      borderColor:
                        selectedColor === color.value
                          ? "#F6D0AB"
                          : "rgba(255,255,255,0.35)",
                      backgroundColor: color.hex,
                      boxShadow:
                        selectedColor === color.value
                          ? "0 0 0 2px rgba(246, 208, 171, 0.28), 0 0 16px rgba(246, 208, 171, 0.35)"
                          : "none",
                    }}
                    aria-label={`Select color ${idx + 1}`}
                  >
                    <span className="sr-only">{color.hex}</span>
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextColorPage}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors shrink-0"
                aria-label="Next colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Page indicator dots */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setColorPage(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === colorPage
                        ? "w-6 h-2 bg-gradient-to-r from-[#d4af37] to-[#ffebb1]"
                        : "w-2 h-2 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WrappingOption;
