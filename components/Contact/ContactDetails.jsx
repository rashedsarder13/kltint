"use client";
import Image from "next/image";
import React from "react";

const branchLinks = [
  {
    name: "Kota Damansara",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=3.1579,101.7121",
  },
  {
    name: "Maluri Cheras",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=3.1167,101.6839",
  },
  {
    name: "Setia Alam",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=3.1320,101.6775",
  },
  {
    name: "Puchong",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=3.0738,101.5183",
  },
];

const ContactDetails = () => {
  return (
    <>
      <style jsx>{`
        .contact-details-card {
          border-radius: 44px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          background: linear-gradient(165deg, #04060b 0%, #010101 44%, #04070d 100%);
          padding: 44px 38px 34px;
          overflow: hidden;
        }

        .contact-details-top {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 44px;
          align-items: start;
        }

        .contact-details-title {
          margin: 0 0 26px;
          font-family: "Oswald", sans-serif;
          font-size: clamp(28px, 2.3vw, 44px);
          line-height: 1.08;
          letter-spacing: 0.4px;
          color: #c5ac2d;
          text-transform: capitalize;
        }

        .contact-branches-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(180px, 1fr));
          gap: 20px 28px;
        }

        .contact-branch-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #eef3f8;
          text-decoration: none;
          font-family: "Oswald", sans-serif;
          font-size: clamp(20px, 1.45vw, 30px);
          font-weight: 500;
          letter-spacing: 0.25px;
          line-height: 1.15;
          transition: color 0.2s ease;
        }

        .contact-branch-link:hover {
          color: #c5d4e1;
        }

        .contact-branch-link :global(img) {
          width: 24px !important;
          height: 24px !important;
        }

        .contact-hours-sub {
          margin: 0;
          font-family: "Oswald", sans-serif;
          color: #edf1f6;
          font-size: clamp(24px, 1.75vw, 34px);
          font-weight: 500;
          line-height: 1.2;
        }

        .contact-hours-time {
          margin: 16px 0 0;
          font-family: "Oswald", sans-serif;
          color: #edf1f6;
          font-size: clamp(30px, 2.25vw, 44px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: 0.2px;
        }

        .contact-details-bottom {
          position: relative;
          min-height: 184px;
          margin-top: 52px;
          border-radius: 38px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          padding: 0 34px;
        }

        .contact-details-bottom-bg {
          object-fit: cover;
        }

        .contact-details-bottom::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.28));
          z-index: 1;
          pointer-events: none;
        }

        .contact-direct-link {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #f6fbff;
          text-decoration: none;
          font-family: "Oswald", sans-serif;
          font-size: clamp(24px, 2.35vw, 44px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.3px;
          transition: opacity 0.2s ease;
        }

        .contact-direct-link:hover {
          opacity: 0.85;
        }

        .contact-direct-icon {
          width: 54px;
          height: 54px;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(152deg, rgba(232, 241, 252, 0.98), rgba(152, 166, 185, 0.9));
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
        }

        .contact-direct-icon svg {
          width: 30px;
          height: 30px;
          color: #1a2432;
        }

        @media (max-width: 767px) {
          .exclusive-section {
            min-height: 300px !important;
          }
          .gradient-overlay {
            width: 100% !important;
            height: 400px !important;
            left: 0 !important;
            position: absolute !important;
          }

          .contact-details-card {
            border-radius: 24px;
            padding: 22px 16px 18px;
          }

          .contact-details-top {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .contact-details-title {
            margin-bottom: 14px;
            font-size: 32px;
          }

          .contact-branches-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .contact-branch-link {
            font-size: 24px;
          }

          .contact-hours-sub {
            font-size: 26px;
          }

          .contact-hours-time {
            margin-top: 10px;
            font-size: 32px;
          }

          .contact-details-bottom {
            margin-top: 24px;
            min-height: 162px;
            border-radius: 22px;
            padding: 12px 14px;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 10px;
          }

          .contact-direct-link {
            font-size: 24px;
            gap: 10px;
          }

          .contact-direct-icon {
            width: 44px;
            height: 44px;
            border-radius: 10px;
          }

          .contact-direct-icon svg {
            width: 24px;
            height: 24px;
          }

          .small-banner {
            margin-top: 56px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1150px) {
          .contact-details-top {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .contact-details-bottom {
            min-height: 168px;
            padding: 0 22px;
          }

          .contact-direct-link {
            font-size: clamp(28px, 3.4vw, 46px);
          }

          .contact-direct-icon {
            width: 54px;
            height: 54px;
          }

          .contact-direct-icon svg {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
      <section
        className="relative w-full overflow-hidden exclusive-section"
        style={{
          background: "rgba(1, 1, 1, 1)",
          position: "relative",
        }}
      >
        {/* Title */}
        <div
          className="relative z-10 pb-8"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Section decorative ellipses */}
          <div
            style={{
              position: "absolute",
              width: "432.3000793457031px",
              height: "439.8719482421875px",
              left: "-70px",
              top: "56px",
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
            style={{
              position: "absolute",
              width: "605.4274291992188px",
              height: "512.8209838867188px",
              left: "997px",
              top: "343px",
              background: "rgba(255, 0, 0, 0.15)",
              borderRadius: "50%",
              backdropFilter: "blur(200px)",
              WebkitBackdropFilter: "blur(200px)",
              filter: "blur(200px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

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
            className=" title-text relative z-10 text-center text-4xl md:text-6xl font-oswald font-extrabold tracking-wider text-white"
            style={{
              textShadow: "0 6px 30px rgba(3,46,189,0.9)",
              WebkitTextFillColor: "white",
              fontFamily: "Oswald, sans-serif",
              textTransform: "uppercase",
            }}
          >
            OUR CONTACT DETAILS
          </h2>
        </div>

        {/* Contact panel */}
        <div className="relative z-10 mx-auto mt-12 w-[95%] max-w-[1268px]">
          <div className="relative overflow-hidden contact-details-card">
            <div className="contact-details-top">
              <div>
                <h3 className="contact-details-title">Visit Our Branches</h3>
                <div className="contact-branches-grid">
                  {branchLinks.map((branch) => (
                    <a
                      key={branch.name}
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-branch-link"
                    >
                      <Image src="/map.svg" alt="Map pin" width={24} height={24} />
                      <span>{branch.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="contact-details-title">Opening Hours</h3>
                <p className="contact-hours-sub">Monday - Sunday (Everyday)</p>
                <p className="contact-hours-time">09:00 AM - 08:00 PM</p>
              </div>
            </div>

            <div className="contact-details-bottom">
              <Image
                src="/contact/below-background.png"
                alt=""
                fill
                className="contact-details-bottom-bg"
              />

              <a href="tel:+60167554178" className="contact-direct-link" aria-label="Call +60167554178">
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.62 10.79C9.06 13.62 11.38 15.94 14.21 17.38L16.41 15.18C16.68 14.91 17.08 14.82 17.43 14.94C18.55 15.31 19.76 15.51 21 15.51C21.55 15.51 22 15.96 22 16.51V20C22 20.55 21.55 21 21 21C10.51 21 2 12.49 2 2C2 1.45 2.45 1 3 1H6.5C7.05 1 7.5 1.45 7.5 2C7.5 3.25 7.7 4.45 8.07 5.57C8.18 5.92 8.1 6.31 7.82 6.59L5.62 8.79"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                +60167554178
              </a>

              <a
                href="mailto:hello@kltintstudio.com"
                className="contact-direct-link"
                aria-label="Email hello@kltintstudio.com"
              >
                <span className="contact-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                hello@kltintstudio.com
              </a>
            </div>
          </div>
        </div>

        <div
          className="small-banner relative z-10"
          style={{
            marginTop: "130px",
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
              className="object-cover w-full h-auto hidden sm:block"
            />
            {/* Mobile banner */}
            <Image
              src="/tint/mobile/small_section.png"
              alt="Package bottom banner"
              width={1268}
              height={178}
              className="object-cover w-full h-auto block sm:hidden"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetails;
