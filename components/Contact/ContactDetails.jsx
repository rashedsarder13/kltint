"use client";
import Image from "next/image";
import React from "react";

const ContactDetails = () => {
  return (
    <>
      <style jsx>{`
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
          <div className="relative    overflow-hidden">
            <Image
              src="/contact/contactdetails.svg"
              alt="Decorative waves"
              width={1268}
              height={260}
              className="object-cover w-full h-auto"
            />
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
              className="object-cover w-full h-auto banner-img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetails;
