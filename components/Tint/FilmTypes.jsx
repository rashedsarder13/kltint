"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const filmTypes = [
  {
    id: "nano-carbon",
    name: "Nano Carbon Film",
    tag: "Cost-effective tinting option",
    features: [
      "Heat Rejection & UV Protection",
      "Affordable Entry Point",
      "Deep & Darker Tint",
    ],
    image: "/tint/filetype.svg",
  },
  {
    id: "ceramic-hd",
    name: "Ceramic HD Film",
    tag: "High performance heat rejection",
    features: [
      "Superior heat rejection",
      "High VLT control",
      "Durable, long-lasting look",
    ],
    image: "/tint/filetype.png",
  },
  {
    id: "sputter-hd",
    name: "Sputter HD Metallic Film",
    tag: "Metallic finish with good rejection",
    features: ["Deeper, darker tint", "UV protection", "Metallic sheen"],
    image: "/tint/filetype.png",
  },
  {
    id: "nano-ceramic",
    name: "Nano Ceramic Film",
    tag: "Premium ceramic tint with max heat rejection",
    features: [
      "Excellent heat rejection",
      "99% UV blocking",
      "Clarity and durability",
    ],
    image: "/tint/filetype.png",
  },
  {
    id: "12l-sputter",
    name: "12 Layer Sputter UHD Film",
    tag: "12-layer sputter for depth & clarity",
    features: [
      "Multi-layer construction",
      "Enhanced durability",
      "Deeper tint",
    ],
    image: "/tint/filetype.svg",
  },
];

export default function FilmTypes() {
  const [activeFilm, setActiveFilm] = useState("nano-carbon");

  const selected = filmTypes.find((f) => f.id === activeFilm) || filmTypes[0];

  return (
    <section className="relative py-24 overflow-hidden bg-[#0A0A0C]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/tint/filmtype-bg.png"
          width={1535}
          height={744}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/55 to-[#0A0A0C]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[112px] filmtypes-container">
        {/* Title */}
        <div
          className="filmtypes-title-wrapper"
          style={{
            marginBottom: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            className="filmtypes-title-ellipse"
            style={{
              position: "absolute",
              width: "390px",
              height: "38px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <h2
            className="filmtypes-heading"
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
            Film Types
          </h2>
        </div>

        {/* Layout: left film list, right preview box */}
        <div className="flex gap-23 items-start relative filmtypes-layout">
          {/* right-bottom mixed gold + red glow behind preview */}
          <div
            className="filmtypes-glow-right"
            style={{
              position: "absolute",
              right: "-100px",
              bottom: "-110px",
              width: "840px",
              height: "560px",
              background:
                "radial-gradient(ellipse at 100% 100%, rgba(212,175,55,0.23) 0%, rgba(212,80,80,0.08) 30%, rgba(0,0,0,0) 60%)",
              filter: "blur(120px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* top-left glow near the film list */}
          <div
            className="filmtypes-glow-left-top"
            style={{
              position: "absolute",
              left: "20px",
              top: "-20px",
              width: "220px",
              height: "120px",
              background:
                "radial-gradient(ellipse at 20% 20%, rgba(201,78,78,0.32), rgba(201,78,78,0.08) 40%, rgba(0,0,0,0) 70%)",
              filter: "blur(48px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* small left shadow under the film list */}
          <div
            className="filmtypes-glow-left-bottom"
            style={{
              position: "absolute",
              left: "40px",
              top: "420px",
              width: "240px",
              height: "60px",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 80%)",
              filter: "blur(30px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Left - Film List */}
          <div
            className="filmtypes-film-list"
            style={{
              width: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              position: "relative",
              zIndex: 3,
            }}
          >
            {filmTypes.map((film) => {
              const active = activeFilm === film.id;
              return (
                <button
                  key={film.id}
                  onClick={() => setActiveFilm(film.id)}
                  aria-pressed={active}
                  className="filmtypes-film-button"
                  style={{
                    width: "376px",
                    height: "48px",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "14px",
                    cursor: "pointer",
                    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
                    background: active
                      ? "linear-gradient(90deg, #914949 0%, #2b1a1a 70%)"
                      : "transparent",
                    boxShadow: active
                      ? "0px 18px 30px -12px rgba(137,42,42,0.6)"
                      : "none",
                    border: "1px solid transparent",
                    borderImage: active
                      ? "none"
                      : "linear-gradient(90deg, rgba(145,73,73,0.7), rgba(200,200,200,0.04)) 1",
                    borderRadius: "0px",
                    paddingLeft: "20px",
                    opacity: 1,
                  }}
                >
                  <span
                    className="filmtypes-film-name"
                    style={{
                      display: "inline-block",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: active ? 700 : 500,
                      fontSize: "15px",
                      lineHeight: "22px",
                      letterSpacing: "0.2%",
                      textAlign: "start",
                      width: "100%",
                      color: active ? "#FFFFFF" : "#A9A9A9",
                    }}
                  >
                    {film.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right - Preview Card */}
          <div
            className="filmtypes-preview-wrapper"
            style={{
              width: "680px",
              height: "350px",
              position: "relative",
              zIndex: 5,
            }}
          >
            <div
              className="filmtypes-preview-card"
              style={{
                width: "728px",
                height: "350px",
                background:
                  "linear-gradient(180deg, rgba(22,22,22,0.92), rgba(12,12,12,0.65))",
                borderRadius: "2px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.02)",
              }}
            >
              {/* Gradient shadow overlay - left to right across entire card */}
              <div
                className="filmtypes-gradient-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(45,8,8,0.4) 40%, rgba(45,8,8,0.8) 100%)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* right-side maroon panel overlay (soft) */}
              <div
                className="filmtypes-maroon-panel"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  height: "100%",
                  width: "320px",
                  background:
                    "linear-gradient(90deg, rgba(52,12,12,0.95) 0%, rgba(68,18,18,0.85) 30%, rgba(68,18,18,0.55) 60%, rgba(0,0,0,0) 100%)",
                  boxShadow: "inset 0 10px 30px rgba(0,0,0,0.6)",
                  pointerEvents: "none",
                  zIndex: 1.05,
                }}
              />

              {/* content wrapper sits above overlay */}
              <div
                className="filmtypes-content-wrapper"
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "start",
                  gap: "16px",
                  padding: "20px 28px",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                {/* Left content (tag) */}
                <div
                  className="filmtypes-left-content"
                  style={{ width: "380px" }}
                >
                  <h3
                    className="filmtypes-tag"
                    style={{
                      background:
                        "linear-gradient(90deg, #FFD54A 0%, #D4AF37 100%)",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      fontSize: "28px",
                      lineHeight: "36px",
                      letterSpacing: "0.5%",
                      textTransform: "capitalize",
                      margin: 0,
                    }}
                  >
                    {selected.tag}
                  </h3>

                  <div
                    className="filmtypes-features"
                    style={{ marginTop: "16px" }}
                  >
                    {/* features as simple dots */}
                    {selected.features.map((f, i) => (
                      <div
                        key={i}
                        className="filmtypes-feature-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: i === 0 ? 6 : 4,
                        }}
                      >
                        <div
                          className="filmtypes-feature-dot"
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "9999px",
                            background: "#FFFFFF",
                          }}
                        />
                        <div
                          className="filmtypes-feature-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontStyle: "semibold",
                            fontSize: "16px",
                            lineHeight: "24px",
                            letterSpacing: "0.2%",
                            color: "#FFFFFF",
                          }}
                        >
                          {f}
                        </div>
                      </div>
                    ))}

                    <div
                      className="filmtypes-cta-wrapper"
                      style={{
                        position: "relative",
                        top: "52px",
                        width: 292,
                      }}
                    >
                      {/* yellow radial glow behind CTA */}
                      <div
                        className="filmtypes-cta-glow"
                        style={{
                          position: "absolute",
                          left: "-10px",
                          top: "10px",
                          width: "202px",
                          height: "80px",
                          background:
                            "radial-gradient(ellipse at 20% 50%, rgba(255,210,90,0.28), rgba(255,210,90,0.06) 40%, rgba(0,0,0,0) 70%)",
                          filter: "blur(28px)",
                          borderRadius: 0,
                          pointerEvents: "none",
                          zIndex: 0,
                        }}
                      />

                      <Link href="/contact#contact">
                        <Image
                          src="/tint/getthisfilm.png"
                          alt="Get This Film"
                          width={292}
                          height={78}
                          className="filmtypes-cta-image"
                          style={{
                            display: "block",
                            height: 78,
                            width: 292,
                            objectFit: "contain",
                            position: "relative",
                            zIndex: 1,
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right image area styled as maroon info box */}
                <div
                  className="filmtypes-diagram-container"
                  style={{
                    width: 277,
                    height: 262,
                    flexShrink: 0,
                    overflow: "hidden",
                    marginLeft: "auto",
                    pointerEvents: "none",
                    alignSelf: "center",
                    background: "transparent",
                    boxShadow: "none",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Base diagram image only */}
                  <Image
                    src="/tint/filetype.svg"
                    alt=""
                    width={277}
                    height={262}
                    className="filmtypes-diagram-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 4,
                      filter: "drop-shadow(0 0 30px rgba(255,0,0,0.15))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA - Only visible on mobile */}
        <div className="filmtypes-mobile-cta">
          <Link href="/contact#contact">
            <Image
              src="/tint/mobile/filmtype.png"
              alt="Let's see the combo"
              width={280}
              height={70}
            />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          /* Container */
          .filmtypes-container {
            padding: 0 20px !important;
          }

          /* Title section */
          .filmtypes-title-wrapper {
            margin-bottom: 32px !important;
            margin-top: -26px !important;
          }

          .filmtypes-title-ellipse {
            width: 200px !important;
            height: 30px !important;
            filter: blur(40px) !important;
          }

          .filmtypes-heading {
            font-size: 32px !important;
            line-height: 40px !important;
          }

          /* Layout - Stack vertically with reordered content */
          .filmtypes-layout {
            flex-direction: column !important;
            gap: 0px !important;
          }

          /* Hide decorative glows on mobile */
          .filmtypes-glow-right,
          .filmtypes-glow-left-top,
          .filmtypes-glow-left-bottom {
            display: none !important;
          }

          /* Film list - move to bottom, before CTA */
          .filmtypes-film-list {
            width: 100% !important;
            order: 4 !important;
            margin-top: -18px !important;
          }

          .filmtypes-film-button {
            width: 100% !important;
            height: 44px !important;
            padding: 8px 16px !important;
          }

          .filmtypes-film-name {
            font-size: 14px !important;
            line-height: 20px !important;
          }

          /* Preview wrapper - reorder children */
          .filmtypes-preview-wrapper {
            width: 100% !important;
            height: auto !important;
            order: 1 !important;
            display: flex !important;
            flex-direction: column !important;
          }

          .filmtypes-preview-card {
            width: 100% !important;
            height: auto !important;
            min-height: auto !important;
            padding: 20px 16px !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
          }

          /* Hide gradient overlays on mobile */
          .filmtypes-gradient-overlay,
          .filmtypes-maroon-panel {
            display: none !important;
          }

          /* Content wrapper - column layout */
          .filmtypes-content-wrapper {
            flex-direction: column !important;
            gap: 0px !important;
            padding: 0 !important;
            display: flex !important;
          }

          /* Diagram container - move to top */
          .filmtypes-diagram-container {
            width: 100% !important;
            height: 280px !important;
            margin: 0 !important;
            order: 1 !important;
            margin-bottom: 24px !important;
            /* no extra pseudo shadow, apply on image */
          }

          /* remove pseudo-element shadow (desktop/mobile) */
          .filmtypes-diagram-container::before {
            display: none !important;
          }

          .filmtypes-diagram-image {
            max-width: 280px !important;
            max-height: 240px !important;
          }

          /* Left content - tag and features */
          .filmtypes-left-content {
            width: 100% !important;
            order: 2 !important;
          }

          .filmtypes-tag {
            font-size: 28px !important;
            line-height: 40px !important;
            text-align: center !important;
            margin-bottom: 16px !important;
          }

          .filmtypes-features {
            margin-top: 0 !important;
            margin-bottom: 24px !important;
          }

          .filmtypes-feature-item {
            gap: 8px !important;
            margin-top: 8px !important;
          }

          .filmtypes-feature-dot {
            width: 5px !important;
            height: 5px !important;
          }

          .filmtypes-feature-text {
            font-size: 18px !important;
            line-height: 22px !important;
          }

          /* Hide desktop CTA */
          .filmtypes-cta-wrapper {
            display: none !important;
          }

          /* Mobile CTA - outside the card, at the very bottom */
          .filmtypes-mobile-cta {
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 0px !important;
            order: 5 !important;
          }

          .filmtypes-mobile-cta img {
            max-width: 280px !important;
            width: 100% !important;
            height: auto !important;
          }
        }

        /* Desktop - hide mobile CTA */
        @media (min-width: 768px) {
          .filmtypes-mobile-cta {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
