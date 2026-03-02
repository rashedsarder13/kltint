"use client";
import Image from "next/image";
import React, { useState } from "react";

const PaymentExperience = () => {
  const [activeTab, setActiveTab] = useState(null);

  const tabs = ["Card", "Online", "E-Wallet", "Instalment", "Book Pay Later"];

  // Categorize payment methods by type
  // Adjust these image numbers based on your actual bank/payment provider logos:
  // Look at each image (3.png, 4.png, etc.) and assign them to the correct category
  const paymentCategories = {
    Card: {
      first: [3, 4, 5, 6, 7, 8, 9], // Card payment providers (e.g., Visa, Mastercard, AMEX)
      second: [4, 5, 7, 8, 9],
    },
    Online: {
      first: [10, 12], // Online banking (e.g., Maybank2u, CIMB Clicks, Public Bank)
      second: [6, 7, 8, 12],
    },
    "E-Wallet": {
      first: [9, 10], // E-wallets (e.g., Touch 'n Go, GrabPay, Boost)
      second: [9, 10],
    },
    Instalment: {
      first: [12], // Instalment providers (e.g., Atome, SPayLater)
      second: [4, 7, 8, 9, 10],
    },
    "Book Pay Later": {
      first: [12], // Book now pay later services
      second: [12],
    },
  };

  // Get all images organized by category
  const getAllCategorizedImages = (rowType) => {
    const allImages = [];
    const categories = [
      "Card",
      "Online",
      "E-Wallet",
      "Instalment",
      "Book Pay Later",
    ];

    categories.forEach((category) => {
      const images = paymentCategories[category][rowType].map((num) => ({
        src: `/home/cardPayment/${rowType}/${num}.png`,
        category: category,
        isActive: activeTab === null || category === activeTab,
      }));
      allImages.push(...images);
    });

    return allImages;
  };

  const firstRowImages = getAllCategorizedImages("first");
  const secondRowImages = getAllCategorizedImages("second");

  // Calculate transform to center active images when a filter is selected
  const getCenterTransform = (images) => {
    if (activeTab === null) return 0;

    // Find the first active image in the original array
    const firstActiveIndex = images.findIndex((img) => img.isActive);
    if (firstActiveIndex === -1) return 0;

    // We duplicate images 3 times, so calculate position in the MIDDLE set
    const singleSetLength = images.length;
    const activeIndexInMiddleSet = singleSetLength + firstActiveIndex;

    // Calculate the position to center the active images
    // Each image is 146px + 16px margin = 162px
    const itemWidth = 162;
    const screenCenter = 720; // Approximate center of 1440px screen

    // Offset to bring first active image toward center
    const offset = activeIndexInMiddleSet * itemWidth;
    const centerOffset = screenCenter - offset - 73; // 73 is half of image width

    return centerOffset;
  };

  const firstRowTransform = getCenterTransform(firstRowImages);
  const secondRowTransform = getCenterTransform(secondRowImages);

  return (
    <section
      id="payment-experience"
      className="relative w-full overflow-hidden payment-section"
      style={{
        height: "722px",
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="absolute gradient-overlay"
        style={{
          background:
            "linear-gradient(180deg, #010101 2.32%, rgba(0, 0, 0, 0) 29.24%, #010101 83.57%)",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          zIndex: 5,
          opacity: 1,
        }}
      />
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content Container */}
      <div
        className="relative z-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          paddingTop: "60px",
        }}
      >
        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: "-55px",
            left: "50%",
            transform: "translateX(-50%) rotate(0deg)",
            width: "703px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 1,
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "590px",
              height: "52px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 1,
              zIndex: 0,
            }}
          />
          <h2
            className="md:text-[48px] md:leading-[72px] title-text"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "52px",
              letterSpacing: "0.5%",
              textAlign: "center",
              textTransform: "capitalize",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              padding: "0 16px",
            }}
          >
            Your Safe Payment Experience
          </h2>

          {/* Mobile-only blue ellipse under the title */}
          <div className="payment-mobile-ellipse" />
        </div>

        {/* Payment Method Tabs */}
        <div
          className="tabs-container "
          style={{
            display: "flex",
            marginTop: "10px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                className="single-tab"
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: "133px",
                  height: "48px",
                  borderRadius: "45px",
                  padding: isActive ? "1px" : "0px",
                  background: isActive
                    ? "linear-gradient(138.8deg, #CCE8FE 5.7%, #CDA0FF 27.03%, #8489F5 41.02%, #CDF1FF 68.68%, #B591E9 94%)"
                    : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "44px",
                    padding: "10px",
                    background: isActive
                      ? "rgba(2, 46, 159, 0.38)"
                      : "#0331A730",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 1,
                  }}
                >
                  <span
                    className="tab-text"
                    style={{
                      background:
                        "linear-gradient(269.91deg, #FFFFFF 0.06%, #C0C0C0 99.91%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "16px",
                      lineHeight: "28px",
                      letterSpacing: "0.036px",
                      textAlign: "center",
                      opacity: isActive ? 1 : 0.6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Logos Container */}
        <div
          className="payment-logos-container"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "40px",
            width: "100%",
          }}
        >
          {/* Left Shadow Overlay */}
          <div
            className="left-shadow"
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              width: "297px",
              height: "300px",
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
              backdropFilter: "blur(2px)",
              opacity: 1,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          {/* Right Shadow Overlay */}
          <div
            className="right-shadow"
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              width: "297px",
              height: "300px",
              background:
                "linear-gradient(270deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
              backdropFilter: "blur(2px)",
              opacity: 1,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* First Row of Payment Logos */}
          <div className="scroll-wrapper" style={{ width: "100%" }}>
            <div
              className={`scroll-track ${activeTab === null ? "row-1" : ""}`}
              style={{
                transform:
                  activeTab !== null
                    ? `translateX(${firstRowTransform}px)`
                    : undefined,
                transition: activeTab !== null ? "transform 0.5s ease" : "none",
              }}
            >
              {/* Triple duplicate for seamless infinite effect */}
              {[...firstRowImages, ...firstRowImages, ...firstRowImages].map(
                (img, idx) => (
                  <div
                    key={`first-${idx}`}
                    className="payment-item"
                    style={{
                      width: "146px",
                      height: "70px",
                      flex: "0 0 auto",
                      marginRight: "16px",
                      opacity: img.isActive ? 1 : 0.3,
                      filter: img.isActive
                        ? "none"
                        : "blur(3px) grayscale(80%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={
                        idx < firstRowImages.length
                          ? `${img.category} payment method`
                          : ""
                      }
                      width={146}
                      height={70}
                      style={{
                        objectFit: "contain",
                        width: "146px",
                        height: "70px",
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Second Row of Payment Logos */}
          <div className="scroll-wrapper" style={{ width: "100%" }}>
            <div
              className={`scroll-track ${activeTab === null ? "row-2" : ""}`}
              style={{
                transform:
                  activeTab !== null
                    ? `translateX(${secondRowTransform}px)`
                    : undefined,
                transition: activeTab !== null ? "transform 0.5s ease" : "none",
              }}
            >
              {/* Triple duplicate for seamless infinite effect */}
              {[...secondRowImages, ...secondRowImages, ...secondRowImages].map(
                (img, idx) => (
                  <div
                    key={`second-${idx}`}
                    className="payment-item"
                    style={{
                      width: "146px",
                      height: "70px",
                      flex: "0 0 auto",
                      marginRight: "16px",
                      opacity: img.isActive ? 1 : 0.3,
                      filter: img.isActive
                        ? "none"
                        : "blur(3px) grayscale(80%)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={
                        idx < secondRowImages.length
                          ? `${img.category} payment method`
                          : ""
                      }
                      width={146}
                      height={70}
                      style={{
                        objectFit: "contain",
                        width: "146px",
                        height: "70px",
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hide mobile ellipse by default (desktop) */
        .payment-mobile-ellipse {
          display: none;
        }

        .scroll-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .scroll-track {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .payment-item {
          flex-shrink: 0;
        }

        /* Desktop + global tab border & accessibility styles */
        .single-tab {
          /* stronger border for better visibility */
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 45px;
          background-clip: padding-box;
          transition:
            border-color 150ms ease,
            box-shadow 150ms ease,
            transform 120ms ease;
        }
        .single-tab > div {
          background-clip: padding-box;
        }
        .single-tab:focus-visible {
          outline: 2px solid #6155ee;
          outline-offset: 2px;
          border-color: rgba(97, 85, 238, 0.85);
          box-shadow: 0 6px 18px rgba(97, 85, 238, 0.12);
        }

        /* Scrolling animations - different speeds for visual interest */
        .scroll-track.row-1 {
          animation: scroll-left 25s linear infinite;
        }

        .scroll-track.row-2 {
          animation: scroll-left 30s linear infinite reverse;
        }

        /* Pause on hover */
        .scroll-wrapper:hover .scroll-track {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .payment-section {
            height: 600px !important;
            padding-top: 100px !important;
            justify-content: flex-start !important;
          }

          .gradient-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            opacity: 0.4 !important;
            z-index: 5 !important;
          }

          /* Background image positioning - fill entire section */
          .payment-section > div:nth-child(2) {
            background-size: cover !important;
            background-position: top center !important;
            background-repeat: no-repeat !important;
            width: 100% !important;
            height: 100% !important;
            left: 0 !important;
            right: 0 !important;
            padding: 10px 20px !important;
          }

          /* Content wrapper adjustments */
          .payment-section > div:last-of-type {
            padding-top: 0 !important;
            gap: 16px !important;
          }

          /* Title adjustments for mobile */
          .payment-section > div:last-of-type > div:first-child {
            position: relative !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin-bottom: 16px !important;
          }

          /* Mobile ellipse */
          .payment-mobile-ellipse {
            display: block !important;
            position: absolute !important;
            top: 8px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 280px !important;
            height: 48px !important;
            background: #032ebd !important;
            border-radius: 50% !important;
            filter: blur(40px) !important;
            opacity: 0.8 !important;
            z-index: 0 !important;
          }

          .title-text {
            font-size: 38px !important;
            position: relative !important;
            z-index: 2 !important;
            line-height: 38px !important;
          }

          .tabs-container {
            flex-wrap: wrap !important;
            gap: 6px !important;
            margin-top: 0 !important;
            padding: 0 12px !important;
            justify-content: center !important;
            max-width: 100% !important;
          }

          .single-tab {
            width: 100px !important;
            height: 36px !important;
            padding: 1px !important;
            /* make mobile borders more visible as well */
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 45px !important;
            background-clip: padding-box !important;
          }

          .single-tab > div {
            padding: 6px 4px !important;
          }

          /* stronger focus visible for mobile tabs */
          .single-tab:focus-visible {
            outline: 2px solid rgba(97, 85, 238, 0.9) !important;
            outline-offset: 2px !important;
          }

          .tab-text {
            font-size: 10px !important;
            line-height: 16px !important;
            letter-spacing: 0.02px !important;
          }

          .payment-logos-container {
            gap: 12px !important;
            margin-top: 20px !important;
          }

          .payment-item {
            width: 90px !important;
            height: 48px !important;
            margin-right: 8px !important;
            opacity: 1 !important;
            filter: none !important;
          }

          .payment-item img {
            width: 90px !important;
            height: 48px !important;
          }

          /* Hide shadows completely on mobile for cleaner look */
          .left-shadow,
          .right-shadow {
            display: none !important;
          }

          /* Adjust scroll animation speed for mobile */
          .scroll-track.row-1 {
            animation: scroll-left 18s linear infinite !important;
          }

          .scroll-track.row-2 {
            animation: scroll-left 22s linear infinite reverse !important;
          }
        }

        /* Tablet breakpoint */
        @media (min-width: 768px) and (max-width: 1023px) {
          .payment-section {
            height: 680px !important;
          }

          .tabs-container {
            gap: 8px !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            padding: 0 20px !important;
          }

          .single-tab {
            width: 120px !important;
            height: 44px !important;
          }

          .tab-text {
            font-size: 14px !important;
          }

          .payment-item {
            width: 130px !important;
            height: 65px !important;
          }

          .payment-item img {
            width: 130px !important;
            height: 65px !important;
          }

          .left-shadow,
          .right-shadow {
            width: 150px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PaymentExperience;
