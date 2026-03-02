"use client";

import { useState } from "react";
import Image from "next/image";

const colors = [
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "ash", label: "Ash", hex: "#B8B8B8" },
  { value: "blue", label: "Blue", hex: "#0047AB" },
  { value: "green", label: "Green", hex: "#00FF00" },
];

const effects = [
  { value: "matte", label: "Matte" },
  { value: "satin", label: "Satin" },
  { value: "gloss", label: "Gloss" },
];

const WrappingOption = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedEffects, setSelectedEffects] = useState(["matte"]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleEffectToggle = (effect) => {
    if (selectedEffects.includes(effect)) {
      setSelectedEffects(selectedEffects.filter((e) => e !== effect));
    } else {
      setSelectedEffects([...selectedEffects, effect]);
    }
  };

  const handleReset = () => {
    setSelectedColor("red");
    setSelectedEffects(["matte"]);
  };

  // Get the first selected effect for display, default to matte
  const displayEffect = selectedEffects[0] || "matte";

  // Construct image path based on selections
  const imagePath = `/wrapping/${selectedColor}/${selectedColor}_${displayEffect}.png`;

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
                      alt={`${selectedColor} ${displayEffect} car wrap`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Buttons & Effect Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
              {/* Left - Color Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange(color.value)}
                    className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-xs md:text-sm transition-all tracking-wide ${
                      selectedColor === color.value
                        ? "text-white"
                        : "text-gray-400 bg-transparent"
                    }`}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      borderWidth: "2px",
                      borderColor: color.hex,
                      backgroundColor:
                        selectedColor === color.value
                          ? color.hex
                          : "transparent",
                    }}
                  >
                    {color.label}
                  </button>
                ))}
              </div>

              {/* Right - Effect Checkboxes */}
              <div className="flex flex-wrap gap-2 md:gap-6">
                {effects.map((effect) => (
                  <label
                    key={effect.value}
                    className="flex items-center gap-2 md:gap-3 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedEffects.includes(effect.value)}
                        onChange={() => handleEffectToggle(effect.value)}
                        className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-gray-600 bg-transparent
                                 checked:bg-[#C9A962] checked:border-[#C9A962]
                                 focus:ring-2 focus:ring-[#C9A962]/50 cursor-pointer
                                 appearance-none transition-all"
                        style={{
                          backgroundImage: selectedEffects.includes(
                            effect.value,
                          )
                            ? "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E\")"
                            : "none",
                          backgroundSize: "100% 100%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                    <span
                      className="text-white group-hover:text-[#C9A962] transition-colors tracking-wide text-sm md:text-base"
                      style={{ fontFamily: "Oswald, sans-serif" }}
                    >
                      {effect.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chosen Color & Effect Input Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
              {/* Chosen Color */}
              <div>
                <label
                  className="block text-white text-xs md:text-sm mb-2 tracking-wide"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  Chosen Color :
                </label>
                <div
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#1C1C1E] text-white rounded-lg border border-[#2C2C2E] text-sm md:text-base"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {colors.find((c) => c.value === selectedColor)?.label}
                </div>
              </div>

              {/* Chosen Effect */}
              <div>
                <label
                  className="block text-white text-xs md:text-sm mb-2 tracking-wide"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  Chosen Effect :
                </label>
                <div
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#1C1C1E] text-white rounded-lg border border-[#2C2C2E] text-sm md:text-base"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {selectedEffects.length > 0
                    ? selectedEffects
                        .map((e) => effects.find((ef) => ef.value === e)?.label)
                        .join(", ")
                    : "None"}
                </div>
              </div>
            </div>

            {/* Film Type, Thickness & Warranty - Single Row */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 text-center pt-2 border-t border-[#2C2C2E]">
              <div className="py-2 md:py-3">
                <div
                  className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  FILM TYPE
                </div>
                <div
                  className="text-white text-xs md:text-base font-semibold"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  Super Film
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div
                  className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  THICKNESS
                </div>
                <div
                  className="text-white text-xs md:text-base font-semibold"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  10nm
                </div>
              </div>
              <div className="py-2 md:py-3">
                <div
                  className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  WARRANTY
                </div>
                <div
                  className="text-white text-xs md:text-base font-semibold"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  5 Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WrappingOption;
