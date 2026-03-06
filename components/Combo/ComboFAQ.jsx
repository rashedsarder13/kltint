"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "What is a Combo Package?",
    answer:
      "A Combo Package bundles multiple services like tinting, coating, and PPF into one convenient and cost-effective solution. It saves you time and money compared to booking each service separately.",
  },
  {
    question: "Can I customize the combo to my car type?",
    answer:
      "Absolutely! We tailor every combo package to fit your specific vehicle make and model, ensuring perfect coverage and optimal protection.",
  },
  {
    question: "How much can I save with a Combo Package?",
    answer:
      "Depending on the services you choose, you can save up to 30-40% compared to booking individual services. Our combo pricing is designed to give you premium protection at the best value.",
  },
  {
    question: "Will combining services take longer?",
    answer:
      "Not much—our certified installers work in a climate-controlled bay with dedicated teams. Most full combos are completed within 1–3 days, depending on scope.",
  },
  {
    question: "Can I mix finishes and levels of protection?",
    answer:
      "Yes! You can choose different levels of tint, coating, and PPF protection based on your needs and budget. Our team will help you find the perfect combination.",
  },
  {
    question: "Do Combo Packages include warranty?",
    answer:
      "Yes, all our combo packages come with comprehensive warranties ranging from 2-5 years depending on the package tier you choose.",
  },
  {
    question: "How do I maintain my car after a Combo Package?",
    answer:
      "We provide detailed aftercare instructions with every service. Generally, wait 48-72 hours before washing, avoid harsh chemicals, and regular maintenance will keep your protection looking great.",
  },
  {
    question: "Can I upgrade later if I start small?",
    answer:
      "Of course! You can always add more services or upgrade your protection level. We offer special rates for returning customers looking to enhance their package.",
  },
];

export default function ComboFAQ() {
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
                        className="text-[20px] font-semibold font-montserrat max-w-[90%] leading-[32px] faq-question-text"
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
        .faq-question-text {
          background: linear-gradient(90.29deg, #9e8976 -48.84%, #7a5e50 -9.49%, #c6a488 17.07%, #f6d0ab 33.9%, #9d774e 64.26%, #c99b70 74.48%, #795f52 99.02%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent !important;
          text-shadow: 0 0 16px rgba(198, 164, 136, 0.2);
        }

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
            font-size: 32px !important;
            line-height: 40px !important;
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
            font-size: 20px !important;
            line-height: 26px !important;
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
          .faq-accordion > div > div p {
            font-size: 18px !important;
            line-height: 22px !important;
            color: #d4dee5 !important;
            padding-left: 0 !important;
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
