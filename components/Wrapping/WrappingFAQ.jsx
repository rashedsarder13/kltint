"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What is vehicle wrapping and how does it work?",
    answer:
      "Vehicle wrapping involves applying a thin vinyl film over your car's original paint. The film is carefully stretched and heated to conform to the body panels, creating a seamless finish that looks like a professional paint job. It protects the original paint underneath while completely transforming your car's appearance.",
  },
  {
    question: "How long does a car wrap last?",
    answer:
      "A high-quality car wrap from premium brands like 3M or Avery typically lasts 5-7 years with proper care. The lifespan depends on factors like sun exposure, washing habits, and the quality of installation. We provide warranties ranging from 2-7 years depending on the package.",
  },
  {
    question: "Will wrapping damage my car's original paint?",
    answer:
      "No, a professionally applied vinyl wrap actually protects your original paint from UV rays, minor scratches, and stone chips. When removed properly, it leaves the paint underneath in pristine condition. This is why wrapping is popular for leased vehicles and those wanting to preserve resale value.",
  },
  {
    question: "How long does the wrapping process take?",
    answer:
      "A full vehicle wrap typically takes 2-3 business days for sedans and 3-4 days for larger vehicles like SUVs and MPVs. Partial wraps or accent pieces can often be completed in a single day. We recommend leaving your vehicle with us to ensure proper curing time.",
  },
  {
    question: "What types of wrap finishes are available?",
    answer:
      "We offer a wide range of finishes including gloss, matte, satin, metallic, chrome, carbon fiber, brushed metal, color-shift, and custom printed graphics. With over 1500 color options, you can achieve virtually any look you desire.",
  },
  {
    question: "How do I care for my wrapped vehicle?",
    answer:
      "Wash your wrapped car by hand or use a touchless car wash. Avoid high-pressure washers close to edges. Use a mild automotive soap and soft microfiber cloths. For stubborn contaminants, use isopropyl alcohol. Avoid waxing—use a wrap-specific sealant if desired.",
  },
  {
    question: "Can I wrap just part of my car?",
    answer:
      "Absolutely! Partial wraps are very popular. Common options include roof wraps, hood wraps, mirror caps, roof rails, and accent pieces. Partial wraps are a cost-effective way to add style without committing to a full color change.",
  },
  {
    question: "What's the difference between wrap and respray?",
    answer:
      "Wrapping is reversible, faster (2-3 days vs weeks), often cheaper, and protects the original paint. Respraying is permanent, takes longer, and can affect resale value if not factory-matched. Wrapping also offers textures and finishes impossible with paint.",
  },
  {
    question: "Why choose KL Tint Studio for wrapping?",
    answer:
      "KL Tint Studio uses only premium 3M and Avery films installed by factory-trained technicians. We offer 5 convenient Klang Valley locations, competitive pricing, flexible payment options, and comprehensive warranties. Our attention to detail ensures flawless results every time.",
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
                className="font-semibold"
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
                          className="text-[12px] md:text-[18px] leading-[28px] font-medium font-montserrat pr-0.5 -mt-3"
                          style={{ color: "#A9A9A9" }}
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
            height:800px !important;
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
            font-size: 12px !important;
            line-height: 28px !important;
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
            font-size: 12px !important;
            line-height: 28px !important;
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
