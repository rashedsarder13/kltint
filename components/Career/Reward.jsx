"use client";

import Image from "next/image";
import { useState } from "react";

export default function Reward() {
  return (
    <section
      className="contact-section relative py-24 overflow-hidden bg-[#010101]"
      style={{
        height: "1339px",
      }}
    >
      <div className="contact-wrapper relative z-10 max-w-[1777px] mx-auto px-[112px]">
        {/* Title */}
        <div
          className="title-wrap"
          style={{
            position: "relative",
            marginBottom: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            style={{
              position: "absolute",
              width: "696px",
              height: "64px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <h2
            className="contact-hero"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "72px",
              lineHeight: "72px",
              letterSpacing: "0.5%",
              textAlign: "center",
              textTransform: "uppercase",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Rewarding Excellence
          </h2>
        </div>
        <p
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: "28px",
            lineHeight: "40px",
            letterSpacing: "0.5%",
            textAlign: "center",
            maxWidth: "1113px",
            margin: "0 auto",
            color: "#FFFFFF",
            opacity: 1,
          }}
        >
          At KL Tint Studio, we believe in recognizing and rewarding outstanding
          talent. From performance bonuses and career growth opportunities to
          continuous training and recognition programs, we make sure our team’s
          hard work never goes unnoticed.
        </p>
      </div>
      <div
        className="reward-image-wrapper"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "468px",
          display: "flex",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="reward-image-container"
          style={{ width: "1152px", height: "640px" }}
        >
          <Image
            src="/career/reward.svg"
            alt="Reward Background"
            width={1152}
            height={640}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          /* Section adjustments */
          section.contact-section {
            padding: 60px 20px !important;
            height: auto !important;
            min-height: auto !important;
          }

          /* Wrapper padding */
          .contact-wrapper {
            padding: 0 !important;
            max-width: 100% !important;
          }

          /* Title wrapper spacing */
          .title-wrap {
            margin-bottom: 32px !important;
          }

          /* Blue ellipse shadow - scaled for mobile */
          div[style*="position: absolute"][style*="696px"] {
            width: 280px !important;
            height: 40px !important;
            filter: blur(30px) !important;
          }

          /* Title text sizing */
          .contact-hero {
            font-size: 32px !important;
            line-height: 38px !important;
            letter-spacing: 0.5px !important;
          }

          /* Description paragraph */
          p {
            font-size: 14px !important;
            line-height: 22px !important;
            max-width: 100% !important;
            padding: 0 !important;
            text-align: center !important;
          }

          /* Background reward image - show and scale for mobile */
          .reward-image-wrapper {
            position: static !important;
            margin-top: 40px !important;
            display: flex !important;
            justify-content: center !important;
          }

          /* Image container sizing */
          .reward-image-container {
            width: 100% !important;
            max-width: 360px !important;
            height: auto !important;
          }

          .reward-image-container img {
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </section>
  );
}
