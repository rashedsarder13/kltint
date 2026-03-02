"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ApplyModal from "./ApplyModal";

export default function OpenPosition() {
  const tabs = [
    { id: "tint", label: "Tint" },
    { id: "coating", label: "Coating" },
    { id: "ppf", label: "PPF" },
    { id: "wrapping", label: "Wrapping" },
    { id: "others", label: "Others" },
  ];

  const content = {
    tint: {
      responsibilities: [
        "Advise clients on the best tint options for comfort and safety.",
        "Create accurate film patterns using advanced cutting tools.",
        "Apply tint films with precision for a flawless finish.",
        "Educate clients on benefits and proper care.",
        "Maintain a clean, safe, and professional workspace.",
      ],
      whyJoin: [
        "Competitive pay with performance-based incentives.",
        "Ongoing training to grow your expertise.",
        "Work with premium films and advanced technology.",
        "Supportive, fast-paced team environment.",
        "Career growth in a leading automotive care company.",
      ],
    },
    coating: {
      responsibilities: [
        "Prepare surfaces and apply ceramic coatings as per specs.",
        "Polish and correct paint to achieve showroom finish.",
        "Mask and protect non-treated areas during application.",
        "Perform quality checks and maintenance routines.",
        "Document work and communicate with the team.",
      ],
      whyJoin: [
        "Access to advanced coating products and tools.",
        "Specialist training and certification opportunities.",
        "Attractive benefits and performance bonuses.",
        "Work on premium vehicles in a professional team.",
        "Opportunities to lead projects and grow internally.",
      ],
    },
    ppf: {
      responsibilities: [
        "Measure and cut PPF patterns accurately for panels.",
        "Apply self-healing paint protection films with care.",
        "Ensure bubble-free and aligned installations.",
        "Coordinate with paint/detailing teams for prep.",
        "Maintain tools and inventory for PPF applications.",
      ],
      whyJoin: [
        "Work with the latest PPF technologies and products.",
        "Skills development through hands-on training.",
        "Competitive compensation and job stability.",
        "Be part of a team that values quality and precision.",
        "Exposure to high-end vehicle projects.",
      ],
    },
    wrapping: {
      responsibilities: [
        "Prepare and apply vinyl wraps with precision.",
        "Match and align wrap patterns to vehicle lines.",
        "Perform finishing and post-install checks.",
        "Repair and maintain wrap installations when required.",
        "Assist with color and finish consultations for clients.",
      ],
      whyJoin: [
        "Creative work with a range of finishes and colors.",
        "Training in advanced wrapping techniques.",
        "Performance incentives and recognition programs.",
        "Opportunity to build a portfolio of wrap projects.",
        "Collaborative environment with skilled installers.",
      ],
    },
    others: {
      responsibilities: [
        "Customer service and booking coordination.",
        "Assist with parts and inventory management.",
        "Support marketing and outreach initiatives.",
        "General assistance across service teams.",
      ],
      whyJoin: [
        "Varied roles with opportunities to learn different skills.",
        "Friendly team environment and growth pathways.",
        "Competitive salaries and staff benefits.",
      ],
    },
  };

  const [active, setActive] = useState("tint");
  const activeContent = content[active];

  const [showApplyModal, setShowApplyModal] = useState(false);

  const openApplyModal = () => {
    setShowApplyModal(true);
  };

  const handleModalContinue = (formData) => {
    // handle the submitted form data (send to API or show success)
    console.log("Application submitted:", formData);
    setShowApplyModal(false);
  };

  return (
    <section
      id="open-positions"
      className="relative py-12 bg-[#0A0A0C] flex justify-center items-center flex-col overflow-hidden"
    >
      <div
        className="open-positions-wrapper"
        style={{
          width: "1218px",
          height: "704px",
          borderRadius: "54px",
          background: "rgba(31,31,31,0.51)",
          opacity: 0.8,
          padding: "88px 93px 69px 75px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            display: "block",
            margin: "0 auto",
            fontWeight: 700,
            background:
              "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Inter, sans-serif",
            fontSize: "64px",
            lineHeight: "100%",
            textAlign: "center",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          OPEN POSITIONS
        </h2>

        {/* Tabs */}
        <div
          style={{ marginTop: "8px" }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                active === tab.id
                  ? "bg-gradient-to-r from-[#9E8976] via-[#F6D0AB] to-[#9E8976] text-black font-semibold shadow-lg"
                  : "bg-[#1a1a1a] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card Content */}
        <div style={{ paddingTop: 0, marginTop: "78px" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            style={{ columnGap: "138px" }}
          >
            <div>
              <h3 className="text-lg font-semibold text-[#c9ad1e] mb-4">
                KEY RESPONSIBILITIES
              </h3>
              <ul className="list-disc pl-5 text-white/80 space-y-2 mt-6">
                {activeContent.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#c9ad1e] mb-4">
                WHY JOIN US
              </h3>
              <ul className="list-disc pl-5 text-white/80 space-y-2 mt-6">
                {activeContent.whyJoin.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={openApplyModal}
              style={{ background: "transparent", border: "none", padding: 0 }}
            >
              <Image
                src="/career/apply.png"
                alt="Apply Now"
                width={484}
                height={78}
                className="object-cover opacity-100 transition-opacity mt-6 mb-5 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>

      <ApplyModal
        key={tabs.find((t) => t.id === active).label}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        job={tabs.find((t) => t.id === active).label}
        onSubmit={handleModalContinue}
      />

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
          <Image
            src="/tint/tinitSmalllSection.svg"
            alt="Package bottom banner"
            width={1268}
            height={178}
            className="object-cover w-full h-auto banner-img"
          />
        </div>
      </div>
      {/* Decorative Ellipses */}

      <div
        className="ellipse ellipse-left"
        style={{
          position: "absolute",
          width: "484px",
          height: "410px",
          left: "80px",
          top: "20px",
          background: "rgba(255, 0, 0, 0.15)",
          borderRadius: "50%",
          backdropFilter: "blur(200px)",
          WebkitBackdropFilter: "blur(200px)",
          filter: "blur(200px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        className="ellipse ellipse-right"
        style={{
          position: "absolute",
          width: "484px",
          height: "410px",
          left: "1080px",
          top: "280px",
          background: "rgba(255, 0, 0, 0.15)",
          borderRadius: "50%",
          backdropFilter: "blur(200px)",
          WebkitBackdropFilter: "blur(200px)",
          filter: "blur(200px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <style jsx>{`
        @media (max-width: 767px) {
          .open-positions-wrapper {
            width: calc(100% - 40px) !important;
            height: auto !important;
            padding: 32px !important;
            border-radius: 24px !important;
          }
          .open-positions-wrapper h2 {
            font-size: 28px !important;
            line-height: 1.1 !important;
          }
          .grid.grid-cols-1.md\:grid-cols-2 {
            grid-template-columns: 1fr !important;
            column-gap: 0 !important;
          }
          .grid.grid-cols-1.md\:grid-cols-2 > div {
            width: 100% !important;
          }
          .small-banner {
            margin-top: 24px !important;
          }
          .small-banner img.banner-img {
            height: auto !important;
          }
          button img[alt="Apply Now"] {
            width: 320px !important;
            height: auto !important;
          }
          .ellipse {
            width: 220px !important;
            height: 180px !important;
            filter: blur(100px) !important;
          }
          .ellipse-left {
            left: 16px !important;
            top: 16px !important;
          }
          .ellipse-right {
            right: 16px !important;
            left: auto !important;
            top: 180px !important;
          }
        }
      `}</style>
    </section>
  );
}
