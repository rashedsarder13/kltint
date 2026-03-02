"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const faqData = {
  General: [
    {
      id: 1,
      question: " Why should I choose KL Tint Studio? ",
      answer:
        "We use premium, lab-tested materials, certified installers, and transparent pricing—backed by real warranties and thousands of satisfied customers across Klang Valley. ",
    },
    {
      id: 2,
      question: "Are your services safe for my car? ",
      answer:
        "Yes. All our films, coatings, and installation methods are paint-safe and designed to preserve your vehicle’s original condition.",
    },
    {
      id: 3,
      question: " How long does installation take? ",
      answer:
        "Most services are completed the same day. Tinting typically takes under 2 hours, while coating, PPF, and wrapping depend on package and coverage.",
    },
    {
      id: 4,
      question: " Do you offer warranty? ",
      answer:
        "Absolutely. Each service comes with manufacturer-backed warranties covering performance, durability, and workmanship. ",
    },
    {
      id: 5,
      question: " Can I pay in installments? ",
      answer:
        "Yes. We offer flexible payment options including SPay, Atome, and major credit cards. ",
    },
  ],
  Tint: [
    {
      id: 1,
      question: "How much heat does your tint really block?",
      answer:
        "Our premium films block up to 99% infrared heat and 99.9% UV rays, significantly reducing cabin temperature.",
    },
    {
      id: 2,
      question: "Are your tint films JPJ approved?",
      answer:
        "Yes. All our tint options comply fully with JPJ regulations for legal and worry-free driving.",
    },
    {
      id: 3,
      question: "Will dark tint affect night visibility?",
      answer:
        "No. Our advanced films provide high clarity and anti-glare technology for safe night driving.",
    },
    {
      id: 4,
      question: "How long will the tint last?",
      answer:
        "With proper care, our tint films last up to 10 years and are covered by bubble and performance warranties.",
    },
    {
      id: 5,
      question: "Will tint affect GPS or mobile signal?",
      answer:
        "Not at all. Our films are signal-friendly and won't interfere with GPS, Bluetooth, or mobile networks.",
    },
  ],
  Coating: [
    {
      id: 1,
      question: "What is ceramic coating and how does it work?",
      answer:
        "Ceramic coating bonds with your paint to create a protective layer that enhances gloss and resists dirt, UV, and chemicals.",
    },
    {
      id: 2,
      question: "How long does ceramic coating last?",
      answer:
        "Depending on the package, our coatings last from 1 to 5 years with proper maintenance.",
    },
    {
      id: 3,
      question: "Can coating prevent scratches?",
      answer:
        "It resists light swirls and micro-scratches but won't stop deep scratches or heavy impact.",
    },
    {
      id: 4,
      question: "Do I still need to wash my car?",
      answer:
        "Yes, but much less frequently. Dirt and water won't stick easily, making washing faster and easier.",
    },
    {
      id: 5,
      question: "Is ceramic coating better than wax?",
      answer:
        "Yes. Coating lasts years, while wax lasts weeks and offers far less protection.",
    },
  ],
  PPF: [
    {
      id: 1,
      question: "What is Paint Protection Film (PPF)?",
      answer:
        "PPF is a clear, durable TPU film that protects paint from stone chips, scratches, stains, and UV damage.",
    },
    {
      id: 2,
      question: "Is PPF visible on the car?",
      answer:
        "No. Our films are ultra-clear or matte, preserving your car's original look.",
    },
    {
      id: 3,
      question: "Does PPF really self-heal?",
      answer:
        "Yes. Light scratches disappear with heat from sunlight, warm water, or engine warmth.",
    },
    {
      id: 4,
      question: "How long does PPF last?",
      answer:
        "Our premium PPF lasts up to 5 years and includes warranty against yellowing and cracking.",
    },
    {
      id: 5,
      question: "Can PPF be removed later?",
      answer: "Yes. It's fully removable without damaging your original paint.",
    },
  ],
  Wrapping: [
    {
      id: 1,
      question: "Is car wrapping better than repainting?",
      answer:
        "Yes. Wrapping is reversible, cost-effective, and protects your original paint—unlike permanent repainting.",
    },
    {
      id: 2,
      question: "Will wrapping damage my paint?",
      answer:
        "No. Wraps actually protect OEM paint when installed and removed correctly.",
    },
    {
      id: 3,
      question: "How long does a car wrap last?",
      answer:
        "Typically 3-5 years, depending on film quality, exposure, and maintenance.",
    },
    {
      id: 4,
      question: "Can I wrap only certain parts of my car?",
      answer:
        "Yes. We offer partial wraps for roofs, bonnets, mirrors, trims, and accents.",
    },
    {
      id: 5,
      question: "Can wraps be used for business branding?",
      answer:
        "Absolutely. Vehicle wraps are one of the most effective mobile advertising tools.",
    },
  ],
  Combo: [
    {
      id: 1,
      question: "What is included in a combo package?",
      answer:
        "Combo packages combine tinting, coating, and PPF into one complete vehicle protection solution.",
    },
    {
      id: 2,
      question: "Is combo pricing cheaper than individual services?",
      answer:
        "Yes. Bundled packages offer better value compared to booking each service separately.",
    },
    {
      id: 3,
      question: "Are all combo services installed together?",
      answer:
        "Yes. We sequence installations properly to ensure perfect compatibility and finish.",
    },
    {
      id: 4,
      question: "Do combo packages include warranty?",
      answer:
        "Yes. Each service in the combo retains its original warranty coverage.",
    },
    {
      id: 5,
      question: "Who should choose a combo package?",
      answer:
        "Combo packages are ideal for new cars, high-value vehicles, and owners who want maximum long-term protection.",
    },
  ],
};

const getDefaultAccordionId = (category) => {
  const items = faqData[category] || [];
  return items[1] ? items[1].id : items[0] ? items[0].id : null;
};

const Accordion = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openAccordion, setOpenAccordion] = useState(
    getDefaultAccordionId("General"),
  );
  const mobileCategoriesRef = useRef(null);

  useEffect(() => {
    // when the active category changes, update the open accordion
    setOpenAccordion(getDefaultAccordionId(activeCategory));
  }, [activeCategory]);

  // Mobile detection: render a mobile-only layout (no desktop changes)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = ["General", "Tint", "Coating", "PPF", "Wrapping", "Combo"];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const scrollMobileCategories = (direction) => {
    if (!mobileCategoriesRef.current) return;
    const amount = 140;
    mobileCategoriesRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Mobile-only rendering: keep background image and blue ellipse, leave desktop untouched
  if (isMobile) {
    return (
      <>
        <section
          className="relative w-full overflow-hidden accordion-section-mobile pb-10"
          style={{
            background: "#010101",
            minHeight: "auto",
            position: "relative",
          }}
        >
          {/* Background image with reduced opacity */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/accordion.svg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.4,
              zIndex: 0,
            }}
          />
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              padding: "16px 20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Blue ellipse shadow behind text */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "280px",
                height: "48px",
                background: "#032EBD",
                borderRadius: "50%",
                filter: "blur(70px)",
                opacity: 0.8,
                zIndex: 0,
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <h2
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "40px",
                  color: "#FFFFFF",
                  marginBottom: "6px",
                  textAlign: "center",
                }}
              >
                Everything
              </h2>
              <h2
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "40px",
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                You Want To Know
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => scrollMobileCategories("left")}
                  aria-label="Scroll categories left"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M10 2L2 10L10 18" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  ref={mobileCategoriesRef}
                  style={{
                    display: "flex",
                    gap: "12px",
                    overflowX: "auto",
                    paddingTop: "16px",
                    paddingBottom: "8px",
                    // marginBottom: "20px",
                  }}
                >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                    }}
                    style={{
                      flex: "0 0 auto",
                      padding: "8px 12px",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: activeCategory === cat ? 700 : 600,
                      fontSize: "16px",
                      color: activeCategory === cat ? "#FFFFFF" : "#A9A9A9",
                      background:
                        activeCategory === cat ? "#111" : "transparent",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.04)",
                      cursor: "pointer",
                    }}
                  >
                    {cat}
                  </button>
                ))}
                </div>
                <button
                  type="button"
                  onClick={() => scrollMobileCategories("right")}
                  aria-label="Scroll categories right"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M2 2L10 10L2 18" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                  padding: "12px",
                  borderRadius: "8px",
                }}
              >
                {faqData[activeCategory].map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #1F2937",
                      padding: "12px 6px",
                    }}
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
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
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#FFFFFF",
                        }}
                      >
                        {item.question}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#FFFFFF",
                          transition: "transform 0.3s ease",
                          transform:
                            openAccordion === item.id
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {openAccordion === item.id && (
                      <div
                        style={{
                          padding: "8px 0 0 0",
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 400,
                          fontSize: "17px",
                          lineHeight: "26px",
                          color: "#D4DEE5",
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <style jsx>{`
          /* Mobile: ensure heading sizing */
          .accordion-section-mobile h2 {
            font-size: 28px;
            line-height: 36px;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "#010101",
          minHeight: "1080px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Content Container */}
        <div
          className="relative"
          style={{
            width: "1442px",
            height: "1080px",
            position: "relative",
          }}
        >
          {/* Tle */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "120px",
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
                width: "450px",
                height: "72px",
                background: "#032EBD",
                borderRadius: "50%",
                filter: "blur(70px)",
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "60px",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              Everything
            </h2>
            <h2
              style={{
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "60px",
                color: "#FFFFFF",
              }}
            >
              You Want To Know
            </h2>
          </div>
          {/* Left Side - Category Tabs */}
          <div
            style={{
              position: "absolute",
              top: "280px",
              left: "120px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                style={{
                  width: "376px",
                  height: "48px",
                  padding: "10px 28px 10px 28px",
                  textAlign: "left",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: activeCategory === category ? 700 : 700,
                  fontSize: "18px",
                  lineHeight: "28px",
                  color:
                    activeCategory === category
                      ? "linear-gradient(269.91deg, #FFFFFF 0.06%, #C0C0C0 99.91%)"
                      : "#A9A9A9",
                  background:
                    activeCategory === category
                      ? "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)"
                      : "transparent",
                  boxShadow:
                    activeCategory === category
                      ? "0px 24px 24px -12px var(--ShadowL6), 0px 12px 12px -6px var(--shadowL5), 0px 6px 6px -3px var(--shadowL4), 0px 3px 3px -1.5px var(--shadowL3), 0px 1px 1px -0.5px var(--ShadowL2), 0px 0px 0px 1px var(--shadowL1)"
                      : "none",
                  border:
                    activeCategory === category
                      ? "none"
                      : "1px solid transparent",
                  borderImageSource:
                    activeCategory === category
                      ? "none"
                      : "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)",
                  borderImageSlice: activeCategory === category ? 0 : 1,
                  borderRadius: "0px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category) {
                    e.target.style.background = "#111827";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "28px",
                    color:
                      activeCategory === category
                        ? "transparent"
                        : "rgba(169, 169, 169, 1)",
                    background:
                      activeCategory === category
                        ? "linear-gradient(269.91deg, #FFFFFF 0.06%, #C0C0C0 99.91%)"
                        : "none",
                    WebkitBackgroundClip:
                      activeCategory === category ? "text" : "initial",
                    WebkitTextFillColor:
                      activeCategory === category ? "transparent" : "initial",
                    backgroundClip:
                      activeCategory === category ? "text" : "initial",
                  }}
                >
                  {category}
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              width: 840,
              height: 481,
              top: "346px",
              left: "600px",
              opacity: 1,
            }}
          >
            {/* Image Gradient Shape (Bottom) */}
            <div
              style={{
                position: "absolute",
                width: "670px",
                height: "550px",
                top: "246px",
                left: "770px",
                opacity: 1,
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 70%, #000000 95%)",
                pointerEvents: "none",
                zIndex: 2,
                borderRadius: "16px",
              }}
            />
            {/* Image Container */}
            <div
              style={{
                position: "absolute",
                width: "670px",
                height: "550px",
                top: "246px",
                left: "770px",
                opacity: 1,
                borderRadius: "16px",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              <Image
                src="/accordion.svg"
                alt="Car Detail"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>{" "}
            {/* Image Right Side Small Gradient Shape */}
            <div
              style={{
                position: "absolute",
                width: "80px",
                height: "408px",
                top: "246px",
                right: "0px",
                opacity: 1,
                background:
                  "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                pointerEvents: "none",
                zIndex: 3,
                borderRadius: "0 16px 16px 0",
              }}
            />
            {/* Accordion Container */}
            <div
              className="accordion"
              style={{
                position: "absolute",
                width: "649px",
                height: "350px",
                top: "280px",
                left: "617px",
                padding: "18px",
                opacity: 1,
                borderRadius: "0px",
                overflowY: "auto",
                overflowX: "hidden",
                background: "rgba(0, 0, 0, 0.7)",
                zIndex: 5,
                background:
                  "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
              }}
            >
              {/* Category Label */}
              <div
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#9CA3AF",
                  marginBottom: "16px",
                }}
              >
                {activeCategory}
              </div>

              {/* Accordion Items */}
              {faqData[activeCategory].map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #1F2937",
                    padding: "8px 18px",
                    marginBottom: "12px",
                    background:
                      openAccordion === item.id
                        ? "rgba(77, 77, 77, 0.30)"
                        : "transparent",
                  }}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
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
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "28px",
                        color: "#FFFFFF",
                        maxWidth: "90%",
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        color: "#FFFFFF",
                        transition: "transform 0.3s ease",
                        transform:
                          openAccordion === item.id
                            ? "rotate(45deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer */}
                  {openAccordion === item.id && (
                    <div
                      style={{
                        padding: "0 0 16px 0",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "28px",
                        color: "#A9A9A9",
                        fontStyle: "medium",
                        letterSpacing: "0.2%",
                      }}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .accordion {
          scrollbar-width: thin;
          scrollbar-color: #ffffff #1f2937;
        }
        .accordion::-webkit-scrollbar {
          width: 8px;
        }
        .accordion::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .accordion::-webkit-scrollbar-thumb {
          background: #6155ee;
          border-radius: 9999px;
          border: 2px solid rgba(0, 0, 0, 0);
        }
        .accordion::-webkit-scrollbar-thumb:hover {
          background: #6155ee;
        }

        /* Mobile styling improvements for the new responsive layout */
        @media (max-width: 767px) {
          .accordion-section-mobile h2 {
            font-size: 28px;
            line-height: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default Accordion;
