"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/shared/Button";

export default function About() {
  const benefits = [
    {
      id: 1,
      title: "Heat & Glare Reduction",
      description: "Cooler, more comfortable interior",
    },
    {
      id: 2,
      title: "Advanced UV Protection",
      description: "Shields from harmful UV rays",
    },
    {
      id: 3,
      title: "Privacy & Protection",
      description: "Boosted vehicle privacy & security",
    },
    {
      id: 4,
      title: "Sleek & Stylish",
      description: "Elevates car's aesthetic",
    },
  ];

  /* service-specific content shown when a side-menu item is active */
  const services = {
    Tint: {
      mainHeading: "Luxury Tinting For A Crystal-Clear Future",
      panels: [
        {
          title: "Heat & Glare Reduction",
          desc: "Cooler cabin. Stress-free driving.",
        },
        {
          title: "Advanced UV Protection",
          desc: "Blocks 99.9% harmful UV rays.",
        },
        {
          title: "Privacy & Security",
          desc: "Protects passengers and valuables.",
        },
        {
          title: "Sleek, Premium Finish",
          desc: "Enhances style without darkening at all.",
        },
      ],
      cta: "View Tint Packages",
    },
    Coating: {
      mainHeading: "Mirror-Gloss Protection That Lasts For Years",
      panels: [
        {
          title: "Deep Gloss Enhancement",
          desc: "Showroom shine, day after day.",
        },
        {
          title: "Scratch & Swirl Resistance",
          desc: "Defends wash marks & micro scratches.",
        },
        {
          title: "Hydrophobic Shield",
          desc: "Water, dirt, and stains slide off easily.",
        },
        {
          title: "UV & Oxidation Protection",
          desc: "Prevents fading under harsh sunlight.",
        },
      ],
      cta: "See Coating Packages",
    },
    PPF: {
      mainHeading: "Invisible Armor For Ultimate Paint Protection",
      panels: [
        {
          title: "Stone Chip Defense",
          desc: "Absorbs impact before paint damage.",
        },
        {
          title: "Self-Healing Technology",
          desc: "Light scratches vanish with heat.",
        },
        {
          title: "High-Gloss or Stealth Finish",
          desc: "Preserve OEM look or go matte.",
        },
        {
          title: "Long-Term Value Protection",
          desc: "Keeps resale value intact.",
        },
      ],
      cta: "Explore PPF Options",
    },
    Wrapping: {
      mainHeading: "Redefine Your Car’s Identity Instantly",
      panels: [
        {
          title: "2,500+ Premium Colors",
          desc: "Unlimited styles. Total freedom.",
        },
        {
          title: "Paint-Safe Application",
          desc: "Original paint fully protected.",
        },
        {
          title: "Removable & Reversible",
          desc: "Change looks anytime, risk-free.",
        },
        {
          title: "Personal or Business Branding",
          desc: "Turn heads or turn traffic into leads.",
        },
      ],
      cta: "View Wrap Styles",
    },
  };

  const [activeSide, setActiveSide] = useState("Tint");
  const current = services[activeSide] || services.Tint;

  return (
    <section
      className="luxury-tinting w-full overflow-hidden about-section"
      style={{
        background: "#010101",
        minHeight: "1080px",
        position: "relative",
      }}
    >
      {/* Desktop Layout */}
      <div
        className="hidden lg:block mx-auto"
        style={{ maxWidth: "1440px", height: "1080px", position: "relative" }}
      >
        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: "165px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "1200px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "590px",
              height: "38px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 1,
            }}
          />
          <h2
            style={{
              position: "relative",
              zIndex: 10,
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
            {current.mainHeading}
          </h2>
        </div>

        {/* Benefits Container - shapes-based design */}
        <div
          style={{
            position: "absolute",
            width: "385px",
            height: "455px",
            top: "332px",
            left: "80px",
            zIndex: 20,
          }}
        >
          <div
            className="benefits-stack"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              pointerEvents: "none",
            }}
          >
            {current.panels.map((p, i) => (
              <div
                key={i}
                className={`benefit-shape ${i === 1 ? "alt" : ""}`}
                style={{ pointerEvents: "auto" }}
              >
                {/* use actual shape image files per index (1-based): 1,3,4 -> shape1.png ; 2 -> shape2.png */}
                <Image
                  src={i === 1 ? "/home/shape2.png" : "/home/shape1.png"}
                  alt={`shape-${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />

                <div className="benefit-shape-content">
                  <div className="benefit-title">{p.title}</div>
                  <div className="benefit-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Tint Service Button - reusable SVG Button */}
        <div
          style={{
            position: "absolute",
            top: "822px",
            left: "80px",
            cursor: "pointer",
          }}
        >
          <Button text={current.cta} width={331} height={68} />
        </div>

        {/* Main Image */}
        <div
          style={{
            position: "absolute",
            width: "737px",
            height: "737px",
            top: "236px",
            left: "482px",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <Image
            src="/home/about.svg"
            alt="Luxury Car"
            width={737}
            height={737}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Connector line pointing from benefits to car (positioned above car so it's visible) */}
        <div
          style={{
            position: "absolute",
            left: 394,
            top: 504,
            height: 30.5,
            width: 156,
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/home/line.svg"
            alt="Connector"
            width={156}
            height={30.5}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Side Menu — interactive (keeps SVG design, adds accessible buttons) */}
        <div
          className="about-side-menu"
          style={{
            position: "absolute",
            width: "124px",
            height: "250px",
            top: "463px",
            left: "1233px",
          }}
        >
          <Image
            src="home/aboutsidemenu.svg"
            alt="Side Menu"
            width={124}
            height={250}
          />

          {/* Interactive buttons over the SVG (visible indicator dot on active) */}
          <div
            className="about-side-menu-buttons"
            aria-label="About side navigation"
          >
            <button
              className={`sidemenu-btn ${activeSide === "Tint" ? "active" : ""}`}
              onClick={() => setActiveSide("Tint")}
              aria-pressed={activeSide === "Tint"}
              aria-label="Tint"
              style={{ top: 33 }}
            >
              <span className="sidemenu-dot" aria-hidden />
            </button>

            <button
              className={`sidemenu-btn ${activeSide === "Coating" ? "active" : ""}`}
              onClick={() => setActiveSide("Coating")}
              aria-pressed={activeSide === "Coating"}
              aria-label="Coating"
              style={{ top: 79 }}
            >
              <span className="sidemenu-dot" aria-hidden />
            </button>

            <button
              className={`sidemenu-btn ${activeSide === "PPF" ? "active" : ""}`}
              onClick={() => setActiveSide("PPF")}
              aria-pressed={activeSide === "PPF"}
              aria-label="PPF"
              style={{ top: 125 }}
            >
              <span className="sidemenu-dot" aria-hidden />
            </button>

            <button
              className={`sidemenu-btn ${activeSide === "Wrapping" ? "active" : ""}`}
              onClick={() => setActiveSide("Wrapping")}
              aria-pressed={activeSide === "Wrapping"}
              aria-label="Wrapping"
              style={{ top: 171 }}
            >
              <span className="sidemenu-dot" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className="block lg:hidden px-4 py-4 mx-auto max-w-[768px] about-mobile-container">
        {/* Mobile side menu — lets users switch services on small screens */}
        <div
          className="about-mobile-side-menu"
          role="tablist"
          aria-label="Service selector"
        >
          <button
            role="tab"
            aria-selected={activeSide === "Tint"}
            className={`mobile-sidemenu-btn ${activeSide === "Tint" ? "active" : ""}`}
            onClick={() => setActiveSide("Tint")}
          >
            Tint
          </button>

          <button
            role="tab"
            aria-selected={activeSide === "Coating"}
            className={`mobile-sidemenu-btn ${activeSide === "Coating" ? "active" : ""}`}
            onClick={() => setActiveSide("Coating")}
          >
            Coating
          </button>

          <button
            role="tab"
            aria-selected={activeSide === "PPF"}
            className={`mobile-sidemenu-btn ${activeSide === "PPF" ? "active" : ""}`}
            onClick={() => setActiveSide("PPF")}
          >
            PPF
          </button>

          <button
            role="tab"
            aria-selected={activeSide === "Wrapping"}
            className={`mobile-sidemenu-btn ${activeSide === "Wrapping" ? "active" : ""}`}
            onClick={() => setActiveSide("Wrapping")}
          >
            Wrapping
          </button>
        </div>

        {/* Title */}
        <h2
          className="text-center mb-0"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 6vw, 48px)",
            lineHeight: "1.5",
            letterSpacing: "0.5%",
            textTransform: "capitalize",
            background:
              "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {current.mainHeading}
        </h2>

        {/* Mobile-only blue ellipse under the title */}
        <div className="about-mobile-ellipse" />

        {/* Main Image */}
        <div
          className="w-full max-w-[500px] mx-auto mb-0"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <Image
            src="/home/about.svg"
            alt="Luxury Car"
            width={737}
            height={737}
            className="w-full h-auto"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Mobile Benefits — stacked shapes */}
        <div className="w-full max-w-[345px] mx-auto mb-4">
          <div
            className="benefits-stack-mobile"
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            {current.panels.map((p, i) => (
              <div key={i} className={`benefit-shape ${i === 1 ? "alt" : ""}`}>
                <Image
                  src={i === 1 ? "/home/shape2.png" : "/home/shape1.png"}
                  alt={`shape-mobile-${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="benefit-shape-content">
                  <div className="benefit-title">{p.title}</div>
                  <div className="benefit-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Book Tint Service Button (mobile) - reusable SVG Button */}
        <div
          className="relative w-full max-w-[361px] mx-auto mb-8"
          style={{ height: "78px" }}
        >
          <Button
            text={current.cta}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <style jsx>{`
        /* Mobile: override large minHeight set via inline style */
        @media (max-width: 767px) {
          .about-section {
            min-height: auto !important;
          }
        }

        /* Mobile-only: show blue blurred ellipse under the title */
        @media (max-width: 767px) {
          .about-mobile-container {
            position: relative;
          }

          .about-mobile-ellipse {
            display: block;
            position: absolute;
            top: 80px; /* offset to sit behind the title (tabs now above title) */
            left: 50%;
            transform: translateX(-50%);
            width: 320px;
            height: 44px;
            background: #032ebd;
            border-radius: 50%;
            filter: blur(36px);
            opacity: 0.8;
            z-index: 100;
            pointer-events: none;
          }

          .about-mobile-container h2 {
            position: relative;
            z-index: 1;
          }

          /* Mobile side-menu */
          .about-mobile-side-menu {
            display: flex;
            gap: 8px;
            justify-content: center;
            margin: 0 0 12px;
            z-index: 2;
          }
          .mobile-sidemenu-btn {
            appearance: none;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: transparent;
            color: #a9a9a9;
            padding: 6px 10px;
            border-radius: 9999px;
            font-family: Inter, sans-serif;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            transition:
              background 140ms ease,
              color 140ms ease,
              transform 120ms ease;
          }
          .mobile-sidemenu-btn.active {
            background: linear-gradient(180deg, #ffffff 0%, #a9a9a9 100%);
            color: #000000;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
          }
          .mobile-sidemenu-btn:focus-visible {
            outline: 2px solid #6155ee;
            outline-offset: 2px;
          }

          /* reduce vertical gaps inside mobile layout */
          .benefits-stack-mobile {
            gap: 12px;
          }
        }

        /* Desktop side-menu overlays (interactive — shows active dot) */
        .about-side-menu {
          position: absolute;
        }
        .about-side-menu-buttons {
          position: absolute;
          inset: 0;
          pointer-events: none; /* allow individual buttons to receive pointer events */
        }
        .sidemenu-btn {
          position: absolute;
          left: 14;
          width: 124px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 14px;
          background: transparent;
          border: none;
          margin: 0;
          cursor: pointer;
          pointer-events: auto;
        }
        .sidemenu-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: transparent;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          transition:
            transform 120ms ease,
            background 160ms ease,
            box-shadow 160ms ease;
          transform: scale(0.88);
        }
        .sidemenu-btn.active .sidemenu-dot {
          /* white → gray linear gradient when active */
          background: linear-gradient(180deg, #ffffff 0%, #a9a9a9 100%);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
          transform: scale(1);
        }
        .sidemenu-btn:hover .sidemenu-dot {
          transform: scale(1.05);
        }
        .sidemenu-btn:focus-visible {
          outline: 2px solid #6155ee;
          outline-offset: 2px;
          border-radius: 6px;
        }

        /* Benefit panels (desktop overlay + mobile list) */
        .benefit-panel {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .benefit-title {
          font-family: Oswald, sans-serif;
          font-weight: 500;
          font-size: 28px;
          line-height: 40px;
          color: #a9a9a9;
        }
        .benefit-desc {
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 18px;
          color: #a9a9a9;
        }
        .benefit-list-mobile {
          padding: 0 6px;
        }
        .benefit-panel-mobile {
          margin-bottom: 14px;
        }
        .benefit-title-mobile {
          font-family: Montserrat, sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #ffffff;
        }
        .benefit-desc-mobile {
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #a9a9a9;
          margin-top: 6px;
        }

        /* NEW: shapes stack for benefits (desktop + mobile) */
        .benefits-stack,
        .benefits-stack-mobile {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .benefit-shape {
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 385px;
          height: 145px;
          padding: 8px 0 1px 18px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: transparent; /* use provided shape images only */
          opacity: 1;
          transform: rotate(0deg);
          pointer-events: auto;
        }
        .benefit-shape.alt {
          background: transparent;
        }
        .benefit-shape img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .benefit-shape .benefit-shape-content {
          position: relative;
          z-index: 2;
        }

        /* TITLES */
        .benefit-shape .benefit-title {
          font-family: Oswald, sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 28px;
          line-height: 40px;
          letter-spacing: 0.5%;
          text-transform: capitalize;
          width: 100%;
          max-width: 322px;
          height: 41px;
          margin: 0;
          opacity: 1;
          display: block;
        }
        /* shape 1,3,4 */
        .benefit-shape:not(.alt) .benefit-title {
          color: #a9a9a9;
        }
        /* shape 2 (alt) — gradient text */
        .benefit-shape.alt .benefit-title {
          color: transparent;
          background-image: linear-gradient(
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
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* DESCRIPTIONS */
        .benefit-shape .benefit-desc {
          font-family: Montserrat, sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: 0.2%;
          width: 100%;
          max-width: 322px;
          height: 32px;
          margin-top: 6px;
          opacity: 1;
        }
        /* shape 1,3,4 */

        /* Desktop: keep title single-line and prevent wrapping */
        @media (min-width: 1024px) {
          .benefit-shape .benefit-title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .benefit-shape:not(.alt) .benefit-desc {
          color: #a9a9a9;
        }
        /* shape 2 */
        .benefit-shape.alt .benefit-desc {
          color: #477579;
        }
      `}</style>
    </section>
  );
}
