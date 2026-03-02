"use client";

import { useState } from "react";
import Image from "next/image";

const serviceTypes = [
  { id: "tint", label: "Tint" },
  { id: "coating", label: "Coating" },
  { id: "ppf", label: "PPF" },
  { id: "wrapping", label: "Wrapping" },
];

const galleryImages = {
  tint: "/gallery/tint.png",
  coating: "/gallery/coat.png",
  ppf: "/gallery/ppf.png",
  wrapping: "/gallery/wrapping.png",
};

export default function VisualProofe() {
  const [activeService, setActiveService] = useState("tint");

  const currentImage = galleryImages[activeService];

  return (
    <section
      className="relative py-24 bg-[#0A0A0C] overflow-hidden"
      style={{
        minHeight: "900px",
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#0A0A0C]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[112px]">
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
            Visual Proof of Quality
          </h2>
        </div>

        {/* Service Type Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {serviceTypes.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-8 py-3 rounded-full text-[16px] font-oswald transition-all ${
                activeService === service.id
                  ? "bg-gradient-to-r from-[#9E8976] via-[#F6D0AB] to-[#9E8976] text-black font-semibold shadow-lg"
                  : "bg-[#1a1a1a] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Image Gallery - Single Image */}
        <div
          className="flex justify-center  mx-auto"
          style={{
            width: "1216px",
            height: "736px",
          }}
        >
          <div
            className="relative w-full aspect-video overflow-hidden rounded-lg border border-white/10 group"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,30,30,0.8), rgba(10,10,10,0.9))",
            }}
          >
            <Image
              src={currentImage}
              alt={`${activeService} service`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 32px !important;
            line-height: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
