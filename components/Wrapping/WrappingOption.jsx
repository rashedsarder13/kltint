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

  const nextColorPage = () => {
    setColorPage((prev) => (prev + 1) % totalPages);
  };

  const prevColorPage = () => {
    setColorPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentColor = allColors.find((c) => c.value === selectedColor);
  const selectedImageColor = currentColor?.imageColor || "red";
  const displayColorName = currentColor?.value
    ? currentColor.value.charAt(0).toUpperCase() + currentColor.value.slice(1)
    : "Red";
  const displayColorHex = currentColor?.hex || "#FF3B30";

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
          <div className="relative flex items-center justify-center p-4 pb-0" />

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

            {/* Static color details above slider */}
            <div
              className="mb-4 flex items-center justify-center gap-8"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <div className="min-w-[160px] flex items-center gap-3">
                <p
                  className="text-sm md:text-base whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(90.29deg, #9e8976 -48.84%, #7a5e50 -9.49%, #c6a488 17.07%, #f6d0ab 33.9%, #9d774e 64.26%, #c99b70 74.48%, #795f52 99.02%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 16px rgba(198, 164, 136, 0.2)",
                  }}
                >
                  Color Name:
                </p>
                <div className="px-3 py-2 rounded-md border border-white/25 bg-black/20">
                  <span className="text-base md:text-lg font-semibold text-gray-100">
                    {displayColorName}
                  </span>
                </div>
              </div>

              <div className="min-w-[180px] flex items-center gap-3">
                <p
                  className="text-sm md:text-base whitespace-nowrap"
                  style={{
                    background:
                      "linear-gradient(90.29deg, #9e8976 -48.84%, #7a5e50 -9.49%, #c6a488 17.07%, #f6d0ab 33.9%, #9d774e 64.26%, #c99b70 74.48%, #795f52 99.02%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 16px rgba(198, 164, 136, 0.2)",
                  }}
                >
                  Color Code:
                </p>
                <div className="px-3 py-2 rounded-md border border-white/25 bg-black/20">
                  <span className="text-base md:text-lg font-semibold text-gray-100">
                    {displayColorHex}
                  </span>
                </div>
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
