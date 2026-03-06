"use client";

import { useState } from "react";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";

const packages = [
  {
    name: "PPF Essentials",
    area: "Full Front",
    tpu: "7.5",
    adhesive: "1.2 mil",
    cap: "1.5 mil",
    gloss: "92",
    warranty: "5 Years",
    price: "1599",
    original: "2399",
    color: "from-[#a8b2bd] to-[#e2e8f0]",
  },
  {
    name: "PPF Pro",
    area: "Full Front",
    tpu: "8.5",
    adhesive: "1.3 mil",
    cap: "1.8 mil",
    gloss: "93",
    warranty: "5 Years",
    price: "1999",
    original: "2799",
    color: "from-[#60a5fa] to-[#93c5fd]",
  },
  {
    name: "PPF Plus",
    area: "Full Car",
    tpu: "7.5",
    adhesive: "1.2 mil",
    cap: "1.5 mil",
    gloss: "92",
    warranty: "5 Years",
    price: "3799",
    original: "4599",
    color: "from-[#d4af37] to-[#f5d0ab]",
  },
  {
    name: "PPF Premium",
    area: "Full Car",
    tpu: "8.5",
    adhesive: "1.3 mil",
    cap: "1.8 mil",
    gloss: "93",
    warranty: "5 Years",
    price: "4599",
    original: "5599",
    color: "from-[#7dd3fc] to-[#bae6fd]",
  },
  {
    name: "PPF Luxury",
    area: "Full Car",
    tpu: "8.5",
    adhesive: "1.4 mil",
    cap: "1.9 mil",
    gloss: "94",
    warranty: "6 Years",
    price: "5999",
    original: "7499",
    color: "from-[#c4b5fd] to-[#e9d5ff]",
  },
  {
    name: "PPF Legendary",
    area: "Full Car",
    tpu: "9.5",
    adhesive: "1.5 mil",
    cap: "2.0 mil",
    gloss: "95",
    warranty: "7 Years",
    price: "6999",
    original: "8999",
    color: "from-[#34d399] to-[#6ee7b7]",
  },
  {
    name: "MATTE PPF",
    area: "Full Car",
    tpu: "7.5",
    gloss: "Matte",
    warranty: "5 Years",
    price: "3999",
    original: "4999",
    color: "from-[#f87171] to-[#fca5a5]",
  },
  {
    name: "COLOUR PPF",
    area: "Full Car",
    tpu: "7.5",
    gloss: "Colour",
    warranty: "5 Years",
    price: "3999",
    original: "4999",
    color: "from-[#f87171] to-[#fca5a5]",
  },
];

const packageImageByName = {
  "PPF Essentials": "/ppf/package/ppf-essential.jpg",
  "PPF Pro": "/ppf/package/ppf-pro.jpg",
  "PPF Plus": "/ppf/package/ppf-plus.jpg",
  "PPF Premium": "/ppf/package/ppf-premium.jpg",
  "PPF Luxury": "/ppf/package/ppf-luxary.jpg",
  "PPF Legendary": "/ppf/package/ppf-legendary.jpg",
  "MATTE PPF": "/ppf/package/matte-ppf.jpg",
  "COLOUR PPF": "/ppf/package/colour-ppf.jpg",
};

import Image from "next/image";

export default function PPFPackageSection() {
  const [activeFilm, setActiveFilm] = useState("PPF Essentials");
  const selected = packages.find((f) => f.name === activeFilm) || packages[0];
  const selectedPackageImage =
    packageImageByName[selected.name] || "/ppf/package/ppf-essential.jpg";
  const activeIndex = packages.findIndex((p) => p.name === activeFilm);
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

  const handlePrevPackage = () => {
    const nextIndex =
      activeIndex <= 0 ? packages.length - 1 : Math.max(0, activeIndex - 1);
    setActiveFilm(packages[nextIndex].name);
  };

  const handleNextPackage = () => {
    const nextIndex =
      activeIndex >= packages.length - 1 ? 0 : Math.min(packages.length - 1, activeIndex + 1);
    setActiveFilm(packages[nextIndex].name);
  };

  return (
    <section
      className="relative py-24 bg-[#0A0A0C] overflow-hidden"
      style={{
        height: "1080px",
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
          <h2 className="pick-header"
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
            Pick the best package
          </h2>
        </div>

        {/* Layout: left package list, right preview box */}
        <div className="flex gap-[29px] items-start relative ppf-layout">
          {/* right-bottom mixed gold + red glow behind preview */}
          <div
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

          {/* top-left glow near the package list */}
          <div
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

          {/* Left - Package List */}
          <div
            className="ppf-package-list"
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
                  className="ppf-package-button"
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
                              "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
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
                </button>
              );
            })}
          </div>

          {/* Right - Package Detail */}
          <div
            className="ppf-preview"
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

            {/* Package Detail Text - Top Left (match Tint: stacked label/value) */}
            <div
              className="ppf-info"
              style={{
                position: "absolute",
                top: "50px",
                left: "40px",
                zIndex: 2,
                width: "420px",
                display: "flex",
                flexDirection: "column",
                gap: "17px",
              }}
            >
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
                    Area
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
                    {selected.area}
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
                    TPU
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
                    {selected.tpu}
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
                    Gloss
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
                    {selected.gloss}
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
              className="ppf-car"
              style={{
                position: "absolute",
                top: "26px",
                right: "0px",
                zIndex: 2,
                width: "600px",
                height: "400px",
                opacity: 1,
              }}
            >
              <Image
                src={selectedPackageImage}
                alt={`${selected.name} package car`}
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>

            {/* Price - left bottom */}
            <div
              className="ppf-footer"
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
                className="price mb-20 md:mb-0"
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
              className="ppf-bookbtn"
              style={{
                position: "absolute",
                top: "330px",
                left: "483px",
                zIndex: 4,
                width: "395px",
                height: "63px",
                padding: "4px",
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

            <div className="ppf-mobile-arrows" aria-label="Package navigation">
              <button type="button" onClick={handlePrevPackage} aria-label="Previous package">
                ←
              </button>
              <button type="button" onClick={handleNextPackage} aria-label="Next package">
                →
              </button>
            </div>
          </div>
        </div>
        <div
          className="small-banner"
          style={{
            marginTop: "140px",
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

      <style jsx>{`
        /* Mobile-specific adjustments inside component */
        .ppf-package-list::-webkit-scrollbar {
          height: 6px;
        }
        .ppf-package-list {
          -webkit-overflow-scrolling: touch;
        }

        .ppf-info > div {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }

        /* .ppf-car rules now live inside the media query so desktop is unaffected */

        .ppf-mobile-arrows {
          display: none;
        }

        @media (max-width: 640px) {
          section {
            height: auto !important;
            min-height: auto !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }

          .ppf-layout {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
            padding: 0;
          }

          /* 2-column grid of package buttons */
          .ppf-package-list {
            width: 100% !important;
            height: auto !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            display: flex !important;
            overflow-x: visible !important;
            gap: 10px !important;
            padding: 0 !important;
          }

          .ppf-package-button {
            min-width: calc(50% - 5px) !important;
            width: calc(50% - 5px) !important;
            flex: 0 0 calc(50% - 5px) !important;
            justify-content: flex-start !important;
            padding: 10px 14px !important;
            height: 52px !important;
          }

          .ppf-package-button span {
            text-align: left !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }

          /* Preview card */
          .ppf-preview {
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            padding: 12px !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
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
          .ppf-car {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            bottom: auto !important;
            order: 1 !important;
            width: 100% !important;
            height: 170px !important;
            border: none !important;
            border-image-source: none !important;
            z-index: 2 !important;
            opacity: 1 !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            background: transparent !important;
          }

          .ppf-car img {
            object-fit: contain !important;
          }

          .ppf-car::after {
            display: none !important;
          }

          /* Features info — top left */
          .ppf-info {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            order: 2 !important;
            z-index: 3 !important;
            display: flex !important;
            flex-direction: column;
            gap: 0;
            width: 100% !important;
            padding: 0;
            opacity: 1 !important;
          }

          .pick-header{
          font-size: 32px !important;
          line-height: 40px !important;
          }

          .ppf-info > div {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 12px 34px !important;
            justify-items: start !important;
            align-items: start !important;
          }

          .ppf-info > div > div > div:first-child {
            font-size: 18px !important;
            line-height: 22px !important;
            margin-bottom: 6px !important;
            color: #a0afbb !important;
          }

          .ppf-info > div > div > div:last-child {
            font-size: 20px !important;
            line-height: 28px !important;
          }

          /* Price — bottom left, clear of book button */
          .ppf-footer {
            display: none !important;
          }

          .ppf-footer .price {
            display: flex;
            gap: 6px;
            align-items: baseline;
            opacity: 1 !important;
            margin-bottom: 0 !important;
          }

          .ppf-footer .price span {
            font-size: 20px !important;
            line-height: 26px !important;
            opacity: 1 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
            filter: none !important;
          }

          /* Book button — full width at bottom of card */
          .ppf-bookbtn {
            position: relative !important;
            order: 3 !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            height: 48px !important;
            padding: 3px !important;
            border-radius: 45px !important;
            opacity: 1 !important;
          }

          .ppf-mobile-arrows {
            display: flex;
            justify-content: center;
            gap: 14px;
            order: 4;
            margin-top: 2px;
          }

          .ppf-mobile-arrows button {
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            border: 1px solid #3f3f46;
            color: #d4dee5;
            background: rgba(10, 10, 12, 0.85);
            font-size: 20px;
            line-height: 1;
          }

          .ppf-bookbtn span {
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

          .ppf-preview .package-bg {
            display: none !important;
          }

          .ppf-preview .preview-eclipse-br,
          .ppf-preview .preview-eclipse-tl {
            display: none !important;
          }

          .small-banner {
            margin-top: 40px !important;
          }
        }
      `}</style>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: selected.name,
          area: selected.area,
          tpu: selected.tpu,
          gloss: selected.gloss,
          warranty: selected.warranty,
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
