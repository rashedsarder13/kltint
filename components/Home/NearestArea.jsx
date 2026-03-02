"use client";
import React from "react";
import Image from "next/image";

const NearestArea = () => {
  const handleVisitClick = () => {
    const el = document.querySelector(".container-main");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const offset = 24; // small nudge upward
    const target = Math.max(0, top - offset);
    window.scrollTo({ top: target, behavior: "smooth" });
  };
  return (
    <>
      <style jsx>{`
        @keyframes mapIconPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        .map-icon-animated {
          animation: mapIconPulse 2s ease-in-out infinite;
        }

        .map-icon-animated:hover {
          animation-play-state: paused;
          transform: scale(1.2);
        }

        @media (max-width: 767px) {
          section {
            min-height: 820px !important;
          }
          .container-main {
            min-height: 820px !important;
          }
          .gradient-bg {
            height: 100% !important;
            left: 0 !important;
          }
          .title-text {
            font-size: 28px !important;
            line-height: 36px !important;
            padding: 0 16px !important;
            position: relative !important;
            z-index: 2 !important;
          }

          /* Mobile-only blue ellipse under the title */
          .nearest-mobile-ellipse {
            display: block !important;
            position: absolute !important;
            top: 22px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 320px !important;
            height: 44px !important;
            background: #032ebd !important;
            border-radius: 50% !important;
            filter: blur(36px) !important;
            opacity: 0.8 !important;
            z-index: 0 !important;
            pointer-events: none !important;
          }
          .map-container {
            top: 280px !important;
            left: 5% !important;
            width: 90% !important;
            height: calc(90vw * 570 / 1213) !important;
            max-height: 190px !important;
          }
          .map-icon-1 {
            top: 315px !important;
            left: calc(50% - 30px) !important;
            width: 60px !important;
            height: 60px !important;
          }
          .map-icon-2 {
            top: 355px !important;
            left: calc(20% - 30px) !important;
            width: 60px !important;
            height: 60px !important;
          }
          .map-icon-3 {
            top: 352px !important;
            left: calc(63% - 30px) !important;
            width: 60px !important;
            height: 60px !important;
          }
          .map-icon-4 {
            top: 380px !important;
            left: calc(55% - 30px) !important;
            width: 60px !important;
            height: 60px !important;
          }
          .info-card {
            top: 370px !important;
            left: calc(50% + 80px) !important;
            width: 60px !important;
            height: auto !important;
          }
          .visit-button {
            top: 510px !important;
            left: 48% !important;
            transform: translateX(-50%) !important;
            width: 260px !important;
            height: auto !important;
            margin-bottom: 40px !important;
          }
          .mobile-subtitle {
            display: block !important;
          }
          .mobile-arrow-hint {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .title-text {
            font-size: 48px !important;
            line-height: 72px !important;
            padding: 0 !important;
          }
          .mobile-subtitle {
            top: 250px !important;
            font-size: 20px !important;
            line-height: 30px !important;
            padding: 0 160px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          section {
            min-height: 700px !important;
          }

          .container-main {
            min-height: 700px !important;
          }

          .gradient-bg {
            height: 700px !important;
          }

          .map-container {
            width: calc(100% - 40px) !important;
            left: 20px !important;
            height: auto !important;
            top: 220px !important;
          }

          .map-icon-1 {
            top: 270px !important;
            left: 42% !important;
          }

          .map-icon-2 {
            top: 340px !important;
            left: 22% !important;
          }

          .map-icon-3 {
            top: 330px !important;
            left: 68% !important;
          }

          .map-icon-4 {
            top: 470px !important;
            left: 47% !important;
          }

          .info-card {
            top: 350px !important;
            left: 62% !important;
            width: 160px !important;
            height: auto !important;
          }

          .visit-button {
            top: 610px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 280px !important;
            height: auto !important;
          }
        }
      `}</style>
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "rgba(1, 1, 1, 1)",
          minHeight: "1080px",
          position: "relative",
        }}
      >
        {/*main Content Container */}
        <div
          className="relative mx-auto flex flex-col items-center justify-center container-main"
          style={{
            maxWidth: "1440px",
            minHeight: "1080px",
            position: "relative",
          }}
        >
          <div
            className="absolute left-0 w-full z-20 gradient-bg"
            style={{
              height: 1080,
              opacity: 1,
              left: -2,
              background:
                "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 11.95%, rgba(0, 0, 0, 0) 87.79%, #000000 96.69%)",
              pointerEvents: "none", // allow clicks through this overlay
            }}
          />
          {/* Title */}
          <div
            style={{
              position: "absolute",
              top: "162px",
              width: "602px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            <h2
              className="md:text-[48px] md:leading-18 title-text"
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "36px",
                letterSpacing: "0.24px",
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
              Find Your Nearest KL Studio
            </h2>

            {/* Mobile-only blue ellipse under the title */}
            <div className="nearest-mobile-ellipse" />
          </div>

          {/* Mobile subtitle - visible only on mobile */}
          <p
            className="mobile-subtitle"
            style={{
              display: "block",
              position: "absolute",
              top: "225px",
              width: "100%",
              padding: "0 24px",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "20px",
              color: "#A9A9A9",
              zIndex: 5,
            }}
          >
            Select a glowing branch icon to find the exact address and plan your visit today.
          </p>

          {/* Green Backdrop Filter Blur - Behind Map for Glow Effect */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: "358px",
              left: "337px",
              width: "766px",
              height: "526px",
              borderRadius: "30px",
              backdropFilter: "blur(100px)",
              background: "rgba(22, 255, 30, 0.13)",
              opacity: 1,
              zIndex: 1,
            }}
          />

          {/* Map SVG Image - Base Layer */}
          <div
            className="map-container"
            style={{
              position: "absolute",
              top: "324px",
              left: "114px",
              width: "1213px",
              height: "570px",
              borderRadius: "15px",
              opacity: 1,
              zIndex: 2,
            }}
          >
            <Image
              src="/home/map.svg"
              alt="Map"
              width={1213}
              height={570}
              quality={100}
              priority
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "15px",
              }}
            />
          </div>

          {/* Linear Gradient Overlay - Left and Right Sides */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: "324px",
              left: "0",
              width: "1440px",
              height: "572px",
              background:
                "linear-gradient(90deg, #010101 8.78%, rgba(1, 1, 1, 0.64) 17.08%, rgba(5, 5, 5, 0.03) 49.68%, rgba(0, 0, 0, 0.737843) 81.64%, #000000 92.28%)",
              opacity: 1,
              zIndex: 3,
              pointerEvents: "none",
            }}
          />

          {/* Map Icon 1 - Top Center (KLCC) */}
          <a
            className="map-icon-1 map-icon-animated"
            href="https://www.google.com/maps/search/?api=1&query=3.1579,101.7121"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open KLCC on Google Maps"
            style={{
              position: "absolute",
              top: "374px",
              left: "578px",
              width: "59px",
              height: "59px",
              opacity: 1,
              zIndex: 4,
              cursor: "pointer",
              display: "block",
            }}
          >
            <Image
              src="/home/mapicon.svg"
              alt="KLCC map icon"
              width={59}
              height={59}
              quality={100}
            />
          </a>

          {/* Map Icon 2 - Left (Bangsar) */}
          <a
            className="map-icon-2 map-icon-animated"
            href="https://www.google.com/maps/search/?api=1&query=3.1320,101.6775"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Bangsar on Google Maps"
            style={{
              position: "absolute",
              top: "442px",
              left: "324px",
              width: "59px",
              height: "59px",
              opacity: 1,
              zIndex: 4,
              cursor: "pointer",
              display: "block",
            }}
          >
            <Image
              src="/home/mapicon.svg"
              alt="Bangsar map icon"
              width={59}
              height={59}
              quality={100}
            />
          </a>

          {/* Map Icon 3 - Right (Petaling Jaya) */}
          <a
            className="map-icon-3 map-icon-animated"
            href="https://www.google.com/maps/search/?api=1&query=3.1167,101.6839"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Mid Valley / Petaling Jaya on Google Maps"
            style={{
              position: "absolute",
              top: "433px",
              left: "900px",
              width: "59px",
              height: "59px",
              opacity: 1,
              zIndex: 4,
              cursor: "pointer",
              display: "block",
            }}
          >
            <Image
              src="/home/mapicon.svg"
              alt="Petaling Jaya map icon"
              width={59}
              height={59}
              quality={100}
            />
          </a>

          {/* Map Icon 4 - Bottom (Shah Alam) */}
          <a
            className="map-icon-4 map-icon-animated"
            href="https://www.google.com/maps/search/?api=1&query=3.0738,101.5183"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Shah Alam on Google Maps"
            style={{
              position: "absolute",
              top: "621px",
              left: "651px",
              width: "59px",
              height: "59px",
              opacity: 1,
              zIndex: 4,
              cursor: "pointer",
              display: "block",
            }}
          >
            <Image
              src="/home/mapicon.svg"
              alt="Shah Alam map icon"
              width={59}
              height={59}
              quality={100}
            />
          </a>

          {/* Above Map Image - Info Card */}
          <div
            className="info-card"
            style={{
              position: "absolute",
              top: "496px",
              left: "823px",
              width: "242px",
              height: "293px",
              opacity: 1,
              zIndex: 5,
            }}
          >
            <Image
              src="/home/aboveMap.svg"
              alt="Location Info"
              width={242}
              height={293}
              quality={100}
            />
          </div>

          {/* Visit Nearest Area Button */}
          <button
            type="button"
            onClick={handleVisitClick}
            className="visit-button"
            style={{
              position: "absolute",
              top: "902px",
              left: "539px",
              width: "361px",
              height: "116px",
              opacity: 1,
              cursor: "pointer",
              zIndex: 4,
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <Image
              src="/contact/book.png"
              alt="Visit Nearest Area Button"
              width={361}
              height={116}
              quality={100}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default NearestArea;
