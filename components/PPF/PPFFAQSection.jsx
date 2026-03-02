"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What is PPF (Paint Protection Film)?",
    answer:
      "PPF is a transparent polyurethane film that protects your paint from stone chips, scratches, stains and UV damage while preserving gloss.",
  },
  {
    question: "How long does PPF typically last?",
    answer:
      "High-quality PPF can last 5–10 years depending on the film, climate, and maintenance; warranties vary by package.",
  },
  {
    question: "Is PPF removable without damaging paint?",
    answer:
      "Yes — professional removal safely lifts the film without harming the original paint when the paint is in good condition.",
  },
  {
    question: "Does PPF self-heal minor scratches?",
    answer:
      "Many modern PPFs have a self-healing topcoat that reduces the appearance of light swirl marks when exposed to heat or sunlight.",
  },
  {
    question: "What areas of the car can I cover with PPF?",
    answer:
      "Coverage ranges from full-front (bumper, hood, fenders, mirrors) to full-car packages depending on your protection needs.",
  },
  {
    question: "How long does installation take?",
    answer:
      "A full-front install usually takes several hours; a full-car PPF can take 24–48 hours depending on vehicle size and prep.",
  },
  {
    question: "How do I care for PPF after installation?",
    answer:
      "Avoid high-pressure washers near edges for the first week, use gentle car soaps, and follow our aftercare recommendations to maximise life and clarity.",
  },
  {
    question: "Can PPF discolour or yellow over time?",
    answer:
      "Quality films with proper warranties resist yellowing; lower grade films can discolour faster—choose reputable materials and installations.",
  },
  {
    question: "Can PPF be coloured or wrapped?",
    answer:
      "Colour PPF options exist but require specialist handling. For significant colour changes, paint wraps or vinyl remain alternatives.",
  },
];

export default function PPFFAQSection() {
  const [openIdx, setOpenIdx] = useState(3); // "Why choose KL..." open by default

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#010101] faq-mobile"
        style={{ height: 1080 }}
      >
        {/* Background image */}
        <div className="absolute inset-0 opacity-30 faq-bg-overlay">
          <Image
            src="/ppf/faq-bg.png"
            width={1585}
            height={1057}
            alt=""
            className="w-full h-full object-cover object-center "
          />
        </div>

        <div className="relative z-20 max-w-[1440px] mx-auto px-[112px] grid grid-cols-12 gap-8 items-start mt-12 faq-inner">
          {/* Left column: big heading */}
          <div className="col-span-5 pr-8 relative faq-left">
            {/* Blue ellipse shadow behind text */}
            <div
              className="faq-ellipse"
              style={{
                position: "absolute",
                top: "40%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                width: "406px",
                height: "59px",
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
                fontStyle: "normal",
                fontSize: "48px",
                lineHeight: "72px",
                letterSpacing: "0.5%",
                textTransform: "capitalize",
                background:
                  "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: 0,
              }}
              className="select-none"
            >
              Frequently
              <br />
              Asked Questions
            </h2>

            <p className="text-[22px] text-[#a9a9a9] mt-6 text-start Montserrat">
              Still need help?{" "}
              <Link href="/contact">
                <span
                  className="font-semibold cursor-pointer"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontStyle: "SemiBold",
                  fontSize: "22px",
                  lineHeight: "28px",
                  letterSpacing: "0.2%",
                  background:
                    "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Contact us
                </span>
              </Link>
            </p>
          </div>

          {/* Right column: centered accordion */}
          <div className="col-span-7 flex justify-center faq-right">
            <div className="w-full max-w-[623px] faq-accordion">
              {faqs.map((faq, i) => {
                const open = openIdx === i;
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid #1F2937",
                      padding: "12px 0 2px 0",
                      marginBottom: "0px",
                      background: open
                        ? "rgba(77, 77, 77, 0.30)"
                        : "transparent",
                    }}
                  >
                    <button className="md:px-[24px] md:py-[18px] px-[24px] py-[8px] "
                      onClick={() => setOpenIdx(open ? -1 : i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        className="text-[20px] font-semibold font-montserrat max-w-[90%] leading-[32px]"
                        style={{ color: "#ffffff" }}
                      >
                        {faq.question}
                      </span>
                      <span
                        style={{
                          fontSize: "28px",
                          color: "#FFFFFF",
                          transition: "transform 0.3s ease",
                          transform: open ? "rotate(45deg)" : "rotate(0deg)",
                          flexShrink: 0,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {open && (
                      <div className="px-6 pb-2 md:pb-4">
                        <p
                          className="text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#D4DEE5] md:text-[#A9A9A9] font-medium font-montserrat pt-2 pl-2 pr-0.5 -mt-3"
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 767px) {
          .faq-inner {
            grid-template-columns: 1fr !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
            .faq-mobile{
            height:auto !important;
            min-height:800px;
            padding-top:40px;
            padding-bottom:40px;
            }

          .faq-left {
            padding-right: 0 !important;
            margin-bottom: 0px;
          }

          .faq-ellipse {
            display: none !important;
          }

          .faq-left h2 {
            font-size: 40px !important;
            line-height: 48px !important;
          }

          .faq-left p {
            font-size: 22px !important;
            line-height: 31px !important;
          }

          .faq-right {
            justify-content: flex-start !important;
          }

          /* Question */
          .faq-accordion button span:first-child {
            font-size: 16px !important;
            line-height: 24px !important;
          }

          /* Toggle icon */
          .faq-accordion button span:last-child {
            font-size: 24px !important;
          }

          /* Accordion item padding */
          .faq-accordion > div {
            padding-top: 0px !important;
            padding-bottom: 0px !important;
          }

          /* Answer */
          .faq-accordion > div > div {
            font-size: 16px !important;
            line-height: 26px !important;
            color: #d4dee5 !important;
            padding-left: 17px !important;
            padding-right: 0 !important;
          }

          /* reduce background opacity on mobile */
          .faq-bg-overlay {
            opacity: 10% !important;
          }
        }
      `}</style>
    </>
  );
}
