"use client";
import Image from "next/image";
import React from "react";
import Button from "@/components/shared/Button";

const ExclusivePartner = () => {
  return (
    <>
      <style jsx>{`
        @media (max-width: 767px) {
          .exclusive-section {
            min-height: 500px !important;
            padding: 40px 0 60px !important;
          }

          /* Mobile-only blue ellipse under the title */
          .nearest-mobile-ellipse {
            display: block !important;
            position: absolute !important;
            top: 12px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 280px !important;
            height: 40px !important;
            background: #032ebd !important;
            border-radius: 50% !important;
            filter: blur(36px) !important;
            opacity: 0.8 !important;
            z-index: 0 !important;
            pointer-events: none !important;
          }

          /* responsive adjustments for the hero wrapper */
          .exclusive-hero-wrapper {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            width: 100% !important;
            padding: 0 20px !important;
            gap: 30px !important;
            margin-top: 30px !important;
          }

          /* Heading container responsive */
          .exclusive-hero-wrapper > div:first-child {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
          }

          /* Title text responsive */
          .title-text {
            font-size: 29px !important;
            line-height: 48px !important;
            padding: 0 4px !important;
          }

          /* Partner logos image container */
          .exclusive-hero-wrapper > div:nth-child(2) {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
          }

          .exclusive-hero-wrapper img {
            width: 100% !important;
            height: auto !important;
          }

          /* Button adjustments */
          .exclusive-hero-wrapper a {
            width: 100% !important;
            max-width: 220px !important;
            display: flex !important;
            justify-content: center !important;
          }

          /* override Button's inline wrapper size */
          .exclusive-hero-wrapper a > div {
            width: 100% !important;
            max-width: 220px !important;
          }

          .exclusive-hero-wrapper a > div > div:first-child {
            width: 100% !important;
            max-width: 220px !important;
            height: 48px !important;
          }

          /* make decorative stripes match button height */
          .exclusive-hero-wrapper a > div > div:nth-child(2),
          .exclusive-hero-wrapper a > div > div:nth-child(3) {
            width: 18px !important;
            height: 48px !important;
            margin-left: -9px !important;
          }

          /* button label size */
          .exclusive-hero-wrapper a > div > div:first-child span {
            font-size: 12px !important;
            padding: 0 6px !important;
            white-space: nowrap !important;
          }
        }

        /* Tablet breakpoint */
        @media (min-width: 768px) and (max-width: 1023px) {
          .exclusive-section {
            min-height: 650px !important;
            padding: 60px 0 !important;
          }

          .exclusive-hero-wrapper {
            width: 90% !important;
            max-width: 900px !important;
            top: 80px !important;
            gap: 35px !important;
          }

          /* Heading container */
          .exclusive-hero-wrapper > div:first-child {
            width: 90% !important;
            max-width: 600px !important;
            height: auto !important;
          }

          /* Title text */
          .title-text {
            font-size: 40px !important;
            line-height: 60px !important;
          }

          /* Partner logos container */
          .exclusive-hero-wrapper > div:nth-child(2) {
            width: 90% !important;
            max-width: 900px !important;
            height: auto !important;
          }

          .exclusive-hero-wrapper img {
            width: 100% !important;
            height: auto !important;
          }

          /* Button adjustments */
          .exclusive-hero-wrapper a > div {
            width: 340px !important;
          }

          .exclusive-hero-wrapper a > div > div:first-child {
            width: 340px !important;
            height: 64px !important;
          }

          .exclusive-hero-wrapper a > div > div:nth-child(2),
          .exclusive-hero-wrapper a > div > div:nth-child(3) {
            height: 64px !important;
          }
        }

        /* default styles for hero wrapper */
        .exclusive-hero-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .exclusive-hero-wrapper > div {
          width: 100%;
          max-width: 1213px;
        }
      `}</style>
      <section
        className="relative w-full overflow-hidden exclusive-section"
        style={{
          background: "rgba(1, 1, 1, 1)",
          backgroundImage: "url('/home/exclusivepartenerbg.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "780px",
          position: "relative",
        }}
      >
        {/* Centered content wrapper */}
        <div
          className="exclusive-hero-wrapper"
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1213px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
            zIndex: 2,
          }}
        >
          {/* Section heading */}
          <div
            style={{
              width: "705px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
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
              className="md:text-[48px] md:leading-[72px] title-text"
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "72px",
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
              Our Exclusive Partner Network
            </h2>

            {/* Mobile-only blue ellipse under the title */}
            <div className="nearest-mobile-ellipse" />
          </div>

          <div
            style={{
              width: "1213px",
              height: "200px",
              position: "relative",
            }}
          >
            <Image
              src="/home/ExclusivePartnerNetwork.png"
              alt="Exclusive partner"
              width={1213}
              height={200}
              priority
              quality={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 1,
              }}
            />
          </div>

          <a
            href="tel:+8801731346372"
            aria-label="Call +8801731346372"
            style={{ textDecoration: "none" }}
          >
            <Button
              text="Ask About Our Materials"
              width={318}
              height={66}
              className="mt-0"
            />
          </a>
        </div>
      </section>
    </>
  );
};

export default ExclusivePartner;
