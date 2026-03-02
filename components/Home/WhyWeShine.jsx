"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";

const WhyWeShine = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <>
      <section
        className="luxury-tinting w-full overflow-hidden min-h-[600px] md:min-h-[1080px]"
        style={{
          background: "#010101",
          position: "relative",
        }}
      >
        {/* Desktop Layout */}
        <div
          className="mx-auto flex justify-center items-center h-[600px] md:h-[1080px]"
          style={{ maxWidth: "1440px", position: "relative" }}
        >
          {/* Title */}
          <div
            className="absolute top-[40px] md:top-[126px] left-1/2 -translate-x-1/2 w-[90%] max-w-[812px] flex items-center justify-center"
            style={{
              height: "72px",
            }}
          >
            {/* Blue ellipse shadow behind text */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[590px] h-[20px] md:h-[38px]"
              style={{
                background: "#032EBD",
                borderRadius: "50%",
                filter: "blur(40px)",
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            <h2
              className="text-[32px] md:text-[48px] leading-[48px] md:leading-[72px]"
              style={{
                position: "relative",
                zIndex: 1,
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
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
              Why We Shine
            </h2>
          </div>
          {/* horizontal line - left */}
          <div
            className="absolute top-[80px] md:top-[162px] left-[5%] md:left-[60%]"
            style={{
              transform:
                "translateX(0) md:translateX(calc(-406px - 15px - 118px))",
            }}
          >
            <Image
              src="/Line1.svg"
              alt="line"
              width={80}
              height={0}
              className="md:w-[118px]"
            />
          </div>
          {/* horizontal line - right */}
          <div
            className="absolute top-[80px] md:top-[162px] right-[5%] md:right-auto md:left-[32%]"
            style={{
              transform: "translateX(0) md:translateX(calc(406px + 15px))",
            }}
          >
            <Image
              src="/Line2.svg"
              alt="line"
              width={80}
              height={0}
              className="md:w-[118px]"
            />
          </div>

          {/* Video Section */}
          <div className="absolute top-[120px] md:top-[272px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] h-[400px] md:h-[750px] rounded-[16px] md:rounded-[24px] overflow-hidden">
            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/whyWeShine.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Button */}
            <div
              onClick={togglePlayPause}
              className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            >
              {/* Big Ellipse */}
              <div
                className="w-[80px] h-[80px] md:w-[125px] md:h-[125px] rounded-full flex items-center justify-center relative"
                style={{
                  background: "#D9D9D926",
                }}
              >
                {/* Small Ellipse */}
                <div
                  className="w-[50px] h-[50px] md:w-[79px] md:h-[79px] rounded-full flex items-center justify-center"
                  style={{
                    background: "#D9D9D973",
                  }}
                >
                  {/* Play Icon */}
                  {!isPlaying ? (
                    <svg
                      className="w-[17px] h-[18px] md:w-[27px] md:h-[29px] ml-[2px] md:ml-[3px]"
                      viewBox="0 0 27 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.915 14.167L0 28.334V0L26.915 14.167Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-[15px] h-[18px] md:w-[24px] md:h-[28px]"
                      viewBox="0 0 24 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="8" height="28" fill="#FFFFFF" />
                      <rect x="16" width="8" height="28" fill="#FFFFFF" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Gradient Overlay */}
            <div
              className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) -8.18%, #010101 64.46%)",
              }}
            />

            {/* Text Overlay */}
            <div className="absolute bottom-[60px] md:bottom-[208px] left-1/2 -translate-x-1/2 w-[90%] max-w-[663px] text-center z-[2] px-4">
              <Link
                href="/gallery"
                className="text-[14px] md:text-[20px] leading-[24px] md:leading-[32px] m-0"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.04px",
                  color: "#A9A9A9",
                }}
              >
                See the KL Tint Studio Difference
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyWeShine;
