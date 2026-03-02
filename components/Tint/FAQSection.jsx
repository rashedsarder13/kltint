"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What is Ceramic Coating and how does it work?",
    answer:
      "Ceramic coating is a liquid polymer applied to your car's exterior that bonds at a molecular level, creating a hard protective layer that repels water, resists UV damage, and shields against scratches and environmental contaminants.",
  },
  {
    question: "What are the starting prices for tinting services?",
    answer:
      "Our tinting packages start from RM 288 for the Silver plan. Pricing varies based on vehicle type, film grade, and package tier. Contact us for a personalised quote.",
  },
  {
    question: "How do I choose the right tint for my vehicle?",
    answer:
      "Consider your privacy needs, heat rejection requirements, and budget. Our team will assess your vehicle and recommend the best film and VLT level during a free consultation.",
  },
  {
    question: "Why choose KL Tint Studio over other tint shops?",
    answer:
      "KL Tint Studio prides itself on high-quality workmanship, superior tinting materials, and consistency. The studio focuses on delivering excellence—making your car’s comfort and protection a top priority.",
  },
  {
    question: "What types of tint does KL Tint Studio offer?",
    answer:
      "We offer Nano Carbon Film, Ceramic HD Film, Sputter HD Metallic Film, Nano Ceramic Film, and our premium 12 Layer Sputter UHD Film—each designed for different performance and aesthetic needs.",
  },
  {
    question: "How long does the tinting process take?",
    answer:
      "A full car tint typically takes 1.5 to 3 hours depending on the vehicle type and number of windows. Sedans usually take around 1.5 hours, while SUVs and MPVs may take 2–3 hours.",
  },
  {
    question: "What types of tinting options are available?",
    answer:
      "We offer packages from Silver through Signature, covering a range of UV, IRR, and TSER performance levels. Each package includes a different film technology and warranty period.",
  },
  {
    question: "Is the tinting process reversible?",
    answer:
      "Window tint film can be professionally removed without damaging the glass. However, DIY removal is not recommended as it can scratch or scratch the window surface.",
  },
  {
    question: "What maintenance is required after tinting?",
    answer:
      "Avoid washing your car for the first 3–5 days. When you do wash, use a soft cloth and avoid abrasive cleaners near window edges. Do not roll down windows for the first week.",
  },
  {
    question: "Why choose KL Tint Studio over other tint shops?",
    answer:
      "KL Tint Studio prides itself on high-quality workmanship, superior tinting materials, and consistency. The studio focuses on delivering excellence—making your car's comfort and protection a top priority.",
  },
];

export default function FAQSection() {
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
