"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";
import Button from "../shared/Button";

const packages = [
  {
    name: "Silver Package",
    uv: "up to 99%",
    irr: "up to 70%",
    tser: "up to 48%",
    film: "Standard Film",
    tech: "Standard",
    warranty: "2 Years",
    price: "249",
    original: "576",
    color: "from-[#a8b2bd] to-[#e2e8f0]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Hot Deal",
    uv: "up to 99%",
    irr: "up to 85%",
    tser: "up to 60%",
    film: "Nano Carbon",
    tech: "Sputter",
    warranty: "3 Years",
    price: "399",
    original: "889",
    color: "from-[#60a5fa] to-[#93c5fd]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Gold Package",
    uv: "up to 99%",
    irr: "up to 92%",
    tser: "up to 68%",
    film: "Ceramic HD",
    tech: "Sputter",
    warranty: "5 Years",
    price: "599",
    original: "889",
    color: "from-[#d4af37] to-[#f5d0ab]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Diamond Package",
    uv: "up to 99%",
    irr: "up to 95%",
    tser: "up to 76%",
    film: "Nano Ceramic",
    tech: "HD",
    warranty: "5 Years",
    price: "799",
    original: "1599",
    color: "from-[#7dd3fc] to-[#bae6fd]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Platinum Package",
    uv: "up to 99%",
    irr: "up to 97%",
    tser: "up to 80%",
    film: "Nano Ceramic UHD",
    tech: "UHD",
    warranty: "6 Years",
    price: "999",
    original: "1999",
    color: "from-[#c4b5fd] to-[#e9d5ff]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Titanium Package",
    uv: "up to 99%",
    irr: "up to 99%",
    tser: "up to 87%",
    film: "Multi Layer Sputter UHD",
    tech: "UHD+",
    warranty: "7 Years",
    price: "1599",
    original: "3199",
    color: "from-[#34d399] to-[#6ee7b7]",
    compliance: "100% JPJ Compliance",
  },
  {
    name: "Elegance Signature",
    uv: "up to 99%",
    irr: "up to 99%",
    tser: "up to 93%",
    film: "Multi-layer nano Ceramic UHD",
    tech: "UHD Max",
    warranty: "10 Years",
    price: "1999",
    original: "4199",
    color: "from-[#f87171] to-[#fca5a5]",
    compliance: "100% JPJ Compliance",
  },
];

export default function PackageSection() {
  const [activeFilm, setActiveFilm] = useState("Silver Package");

  const selected = packages.find((f) => f.name === activeFilm) || packages[0];
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleBookNow = () => {
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

  // Programmatic scroll to the Tint options section (uses same idea as TintCarousel)
  const router = useRouter();
  const handleSeeCombo = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const elId = "tint-options";

    const doScroll = () => {
      const el = document.getElementById(elId);
      if (!el) return;
      // primary scroll (section has scroll-margin-top set in `TintOptions`)
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // small extra nudge so the content isn't flush with the header
      window.setTimeout(() => {
        window.scrollBy({ top: 40, behavior: "smooth" });
      }, 160);
    };

    if (
      typeof window !== "undefined" &&
      (window.location.pathname === "/tint" ||
        window.location.pathname === "/tint/")
    ) {
      doScroll();
    } else {
      router.push("/tint#tint-options");
      // wait for navigation + hydration, then nudge
      setTimeout(doScroll, 450);
    }
  };

  // Build a simple features list from the package data (packages don't include `tag`/`features`)
  const features = [
    `UV: ${selected.uv}`,
    `IRR: ${selected.irr}`,
    `TSER: ${selected.tser}`,
    `Film: ${selected.film}`,
    `Tech: ${selected.tech}`,
    `Warranty: ${selected.warranty}`,
    selected.price ? `Price: ₹${selected.price}` : null,
  ].filter(Boolean);

  // Structured key/value features for two-column layout (label / value)
  const featuresKV = [
    { label: "UV", value: selected.uv },
    { label: "IRR", value: selected.irr },
    { label: "TSER", value: selected.tser },
    { label: "Film", value: selected.film },
    { label: "Technology", value: selected.tech },
    { label: "Warranty", value: selected.warranty },
  ];

  return (
    <section
      className="relative py-24 bg-[#0A0A0C] overflow-hidden"
      style={{
        height: "px",
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#00BFFF]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-2 md:px-[112px]">
        {/* Title */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "80px",
            marginLeft: "auto",
            marginRight: "auto",
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
              zIndex: 0,
            }}
          />
          <h2
            className="tint-packages-title"
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
            Tint Packages
          </h2>
        </div>

        {/* Layout: left film list, right preview box */}
        <div className="flex gap-[29px] items-start relative filmtypes-layout">
          {/* right-bottom mixed gold + red glow behind preview */}
          <div
            className="filmtypes-glow-right"
            style={{
              position: "absolute",
              right: "-100px",
              bottom: "-110px",
              width: "235px",
              height: "420px",
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

          {/* extra eclipse glows */}
          <div
            className="filmtypes-glow-eclipse1"
            style={{
              position: "absolute",
              top: "565px",
              left: "542px",
              width: "277px",
              height: "276px",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 80%)",
              filter: "blur(200px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
              opacity: 1,
              transform: "rotate(0deg)",
            }}
          />

          <div
            className="filmtypes-glow-eclipse2"
            style={{
              position: "absolute",
              top: "307px",
              left: "143px",
              width: "417px",
              height: "404px",
              background: "rgba(136, 0, 255, 0.08)",
              filter: "blur(200px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
              opacity: 1,
              transform: "rotate(0deg)",
            }}
          />

          {/* Left - Film List */}
          <div
            className="filmtypes-film-list"
            style={{
              width: "235px",
              height: "420px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              zIndex: 3,
              opacity: 1,
            }}
          >
            {packages.map((film) => {
              const active = activeFilm === film.name;
              return (
                <button
                  key={film.name}
                  onClick={() => setActiveFilm(film.name)}
                  aria-pressed={active}
                  className="filmtypes-film-button"
                  style={{
                    width: "235px",
                    height: "48px",
                    padding: "10px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "24px",
                    cursor: "pointer",
                    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
                    background: active
                      ? "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)"
                      : "transparent",
                    border: "1px solid",
                    borderImageSource: active
                      ? "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)"
                      : "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)",
                    borderImageSlice: 1,
                    borderRadius: "0px",
                    opacity: 1,
                  }}
                >
                  <span
                    className="filmtypes-film-name"
                    style={{
                      display: "inline-block",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: active ? 700 : 500,
                      fontSize: "18px",
                      lineHeight: "28px",
                      letterSpacing: "0.2%",
                      textAlign: "left",
                      width: "100%",
                      ...(active
                        ? {
                            background:
                              "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : {
                            color: "rgba(169, 169, 169, 1)",
                          }),
                    }}
                  >
                    {film.name}
                  </span>
                  {active && (
                    <span
                      className="filmtypes-active-arrow"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "28px",
                        flexShrink: 0,
                        background:
                          "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        display: "none",
                      }}
                    >
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right - Package Detail */}
          <div
            className="filmtypes-preview"
            style={{
              width: "904px",
              height: "420px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              backdropFilter: "blur(4px)",
              borderImageSource:
                "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
              borderImageSlice: 1,
              opacity: 1,
            }}
          >
            {/* Background SVG */}
            <Image
              src="/tint/pickThePackage.svg"
              alt="Package background"
              fill
              className="object-contain package-bg hidden md:block"
              style={{ zIndex: 1 }}
            />

            {/* preview eclipses (desktop only): bottom-right red + top-left purple */}
            <div
              className="preview-eclipse-br"
              style={{
                position: "absolute",
                left: "40px",
                bottom: "-40px",
                width: "277px",
                height: "276px",
                background: "rgba(255, 0, 0, 0.15)",
                filter: "blur(200px)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 1,
              }}
            />

            <div
              className="preview-eclipse-tl"
              style={{
                position: "absolute",
                left: "-90px",
                top: "-60px",
                width: "417px",
                height: "404px",
                background: "rgba(136, 0, 255, 0.08)",
                filter: "blur(200px)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 1,
              }}
            />

            {/* Package Detail Text - Top Left */}
            {/* Package Detail Text - Top Left */}
            <div
              className="filmtypes-info"
              style={{
                position: "absolute",
                top: "50px",
                left: "40px",
                zIndex: 2,
                width: "420px", // keep content clear of the right-side image
                display: "flex",
                flexDirection: "column",
                gap: "17px",
              }}
            >
              {/* Feature grid - stacked label above value (two-column) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  width: "100%",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    UV
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.uv}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    TSER
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.tser}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    IRR
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.irr}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    Film Type
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.film}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    Technology
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.tech}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      lineHeight: "22px",
                      color: "#DDE6EE",
                      marginBottom: "6px",
                    }}
                  >
                    Warranty
                  </div>
                  <div
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.warranty}
                  </div>
                </div>
              </div>
            </div>

            {/* Car Image - Top Right */}
            <div
              className="filmtypes-car"
              style={{
                position: "absolute",
                top: "26px",
                right: "0px",
                zIndex: 2,
                width: "430px",
                height: "278px",
                border: "1px solid",
                borderImageSource:
                  "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                borderImageSlice: 1,
                opacity: 1,
              }}
            >
              <Image
                src="/tint/pkg-detail.png"
                alt={`${selected.name} package car`}
                fill
                className="object-cover"
              />
            </div>

            {/* Price - left bottom */}
            <div
              className="filmtypes-footer"
              style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                right: "40px",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {/* Price */}
              <div
                className="price mb-20 md:mb-0 mr-30 md:mr-0"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "40px",
                    letterSpacing: "0.5%",
                    color: "#FFFFFF",
                  }}
                >
                  RM{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 700,
                    }}
                  >
                    {selected.price}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontSize: "28px",
                    lineHeight: "40px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                    textDecoration: "line-through",
                    background:
                      "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {selected.original}
                </span>
              </div>
            </div>

            {/* Book Button - positioned inside preview (desktop) */}
            <button
              onClick={handleBookNow}
              className="filmtypes-bookbtn"
              style={{
                position: "absolute",
                top: "330px",
                left: "483px",
                zIndex: 4,
                width: "395px",
                height: "63px",
                padding: "4px", // outer gradient border thickness
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                borderRadius: "45px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: 1,
                boxShadow:
                  "0 10px 30px rgba(157,119,78,0.18), 0 2px 8px rgba(0,0,0,0.6)",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(180deg, rgba(12,10,8,0.9), rgba(24,18,12,0.75))",
                  padding: "0 18px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    textTransform: "capitalize",
                    background:
                      "linear-gradient(135.31deg, #F6D0AB 10%, #C99B70 60%, #9E8976 95%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    WebkitTextStroke: "0.5px rgba(0,0,0,0.2)",
                  }}
                >
                  Book This Package Now
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom CTA Section - centered and responsive like the design */}
        <div style={{ marginTop: "76px", textAlign: "center" }}>
          <h2
            className="all_in_one_heading"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "72px",
              letterSpacing: "0.5%",
              textTransform: "capitalize",
              margin: "0 auto",
              maxWidth: "889px",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            We Are Provide All In One Package
          </h2>

          <div style={{ marginTop: "16px" }}>
            <Link
              href="/tint#tint-options"
              className="inline-block"
              aria-label="See tint options"
              onClick={(e) => handleSeeCombo(e)}
            >
              <Button
                className="lets_see_the_combo_btn pb-"
                text={"LET'S SEE THE COMBO"}
                width={331}
                height={68}
              />
            </Link>
          </div>

          <div
            style={{
              marginTop: "76px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "95%",
                maxWidth: "1268px",
                border: "1px solid rgba(148,163,184,0.12)",
                borderRadius: "0px",
                overflow: "hidden",
              }}
            >
              {/* Desktop banner */}
              <Image
                src="/tint/tinitSmalllSection.svg"
                alt="Package bottom banner"
                width={1268}
                height={178}
                className="object-cover w-full h-auto hidden sm:block"
              />
              {/* Mobile banner */}
              <Image
                src="/tint/mobile/small_section.png"
                alt="Package bottom banner"
                width={1268}
                height={178}
                className="object-cover w-full h-auto block sm:hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Mobile-specific adjustments inside component */
        .filmtypes-film-list::-webkit-scrollbar {
          height: 6px;
        }
        .filmtypes-film-list {
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 640px) {
          section {
            height: auto !important;
            min-height: auto !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }

          .tint-packages-title {
            font-size: 32px !important;
            line-height: 40px !important;
            margin-bottom: 0 !important;
          }

          .filmtypes-layout {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
            padding: 0;
          }

          /* 2-column grid of package buttons */
          .filmtypes-film-list {
            width: 100% !important;
            height: auto !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            display: flex !important;
            overflow-x: visible !important;
            gap: 10px !important;
            padding: 0 !important;
          }

          .filmtypes-film-button {
            min-width: calc(50% - 5px) !important;
            width: calc(50% - 5px) !important;
            flex: 0 0 calc(50% - 5px) !important;
            justify-content: space-between !important;
            padding: 10px 14px !important;
            height: 52px !important;
          }

          .filmtypes-film-name {
            text-align: left !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }

          /* Show the arrow only on mobile */
          .filmtypes-active-arrow {
            display: inline !important;
          }

          /* Preview card */
          .filmtypes-preview {
            width: 100% !important;
            height: 310px !important;
            padding: 0 !important;
            position: relative !important;
            border: 1px solid !important;
            border-image-source: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 30.62%,
              #f6d0ab 47.37%,
              #9d774e 62.96%,
              #c99b70 82.05%,
              #795f52 93.35%
            ) !important;
            border-image-slice: 1 !important;
            overflow: hidden !important;
            backdrop-filter: none !important;
            border-radius: 0 !important;
          }

          /* Car image — top right */
          .filmtypes-car {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            left: auto !important;
            bottom: auto !important;
            width: 58% !important;
            height: 185px !important;
            border: none !important;
            border-image-source: none !important;
            z-index: 2 !important;
            opacity: 1 !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            background: transparent !important;
          }

          .filmtypes-car img {
            object-fit: contain !important;
          }

          /* Features info — top left */
          .filmtypes-info {
            position: absolute !important;
            top: 14px !important;
            left: 14px !important;
            z-index: 3 !important;
            display: flex !important;
            flex-direction: column;
            gap: 0;
            width: 38% !important;
            padding: 0;
            opacity: 1 !important;
          }

          .filmtypes-info > div {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          /* Hide Film Type (4th) and Technology (5th) — keep UV, TSER, IRR, Warranty */
          .filmtypes-info > div > div:nth-child(4),
          .filmtypes-info > div > div:nth-child(5) {
            display: none !important;
          }

          .filmtypes-info > div > div > div:first-child {
            font-size: 10px !important;
            line-height: 13px !important;
            margin-bottom: 1px !important;
            color: #a0afbb !important;
          }

          .filmtypes-info > div > div > div:last-child {
            font-size: 12px !important;
            line-height: 16px !important;
          }

          /* Price — bottom left, clear of book button */
          .filmtypes-footer {
            position: absolute !important;
            bottom: 72px !important;
            left: 14px !important;
            right: auto !important;
            display: flex !important;
            flex-direction: row;
            gap: 6px;
            align-items: baseline;
            width: auto !important;
            z-index: 3 !important;
            opacity: 1 !important;
          }

          .filmtypes-footer .price {
            display: flex;
            gap: 6px;
            align-items: baseline;
            opacity: 1 !important;
            margin-bottom: 0 !important;
            margin-right: 0 !important;
          }

          .filmtypes-footer .price span {
            font-size: 20px !important;
            line-height: 26px !important;
            opacity: 1 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
            filter: none !important;
          }

          /* Book button — full width at bottom of card */
          .filmtypes-bookbtn {
            position: absolute !important;
            bottom: 12px !important;
            left: 12px !important;
            right: 12px !important;
            top: auto !important;
            width: calc(100% - 24px) !important;
            max-width: none !important;
            height: 48px !important;
            padding: 3px !important;
            border-radius: 45px !important;
            opacity: 1 !important;
          }

          .filmtypes-bookbtn span {
            font-size: 15px !important;
            line-height: 22px !important;
            opacity: 1 !important;
            background: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 20.62%,
              #f6d0ab 37.37%,
              #9d774e 42.96%,
              #c99b70 52.05%,
              #795f52 73.35%
            ) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }

          .filmtypes-preview .package-bg {
            display: none !important;
          }

          .filmtypes-preview .preview-eclipse-br,
          .filmtypes-preview .preview-eclipse-tl,
          .filmtypes-preview .filmtypes-preview-eclipse-br,
          .filmtypes-preview .filmtypes-preview-eclipse-tl {
            display: none !important;
          }

          .filmtypes-glow-right,
          .filmtypes-glow-left-top,
          .filmtypes-glow-left-bottom,
          .filmtypes-glow-eclipse1,
          .filmtypes-glow-eclipse2 {
            display: none !important;
          }

          .all_in_one_heading {
            font-size: 32px !important;
            line-height: 40px !important;
            padding-bottom: 10px !important;
            margin-bottom: 20px !important;
          }

        }
      `}</style>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: selected.name,
          warranty: selected.warranty,
          uv: selected.uv,
          irr: selected.irr,
          tser: selected.tser,
          film: selected.film,
          price: selected.price,
          original: selected.original,
        }}
        onContinue={handleContinue}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseAll}
        onBack={handleBack}
        packageData={{
          name: selected.name,
          price: selected.price,
          original: selected.original,
        }}
        bookingData={bookingData}
      />
    </section>
  );
}
