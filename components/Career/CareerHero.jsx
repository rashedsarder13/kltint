"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CareerHero() {
  const router = useRouter();

  const handleSeeOpenPositions = (e) => {
    // If user is on a different route, navigate to /career first so the target exists
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/career"
    ) {
      router.push("/career#open-positions");
      return;
    }

    // quick debug trace (will show in browser console)
    console.debug("CareerHero: explore CTA clicked");

    // try immediate scroll
    const el = document.getElementById("open-positions");

    // update URL hash (no jump) so linkability works
    if (typeof history !== "undefined")
      history.replaceState(null, "", "#open-positions");

    if (el) {
      console.debug("CareerHero: target found, scrolling now");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // nudge up slightly for sticky header
      window.scrollBy({ top: -88, behavior: "smooth" });
      return;
    }

    // fallback: retry after a short delay (handles hydration/timing)
    console.debug("CareerHero: target not found, scheduling retry");
    setTimeout(() => {
      const retry = document.getElementById("open-positions");
      if (retry) {
        console.debug("CareerHero: retry found target, scrolling now");
        retry.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollBy({ top: -88, behavior: "smooth" });
        return;
      }
      // final fallback: set location.hash which forces a jump
      console.debug("CareerHero: retry failed, setting location.hash fallback");
      if (typeof window !== "undefined")
        window.location.hash = "#open-positions";
    }, 120);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0C] career-hero-section"
      style={{ minHeight: "648px", height: "648px" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat career-hero-bg"
        style={{
          width: "100%",
          height: "100%", // fill parent section
          backgroundImage: "url('/career/hero.svg')",
        }}
      />

      {/* Background shapes - Top and Bottom */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: "url('/combo/combo-bg-shape1.png')" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/combo/combo-bg-shape2.png')" }}
      />

      {/* Main content container */}
      <div className="relative z-10 h-full flex justify-center pt-24 md:pt-20 lg:pt-24 xl:pt-32 px-4 md:px-8 lg:px-12 career-hero-content">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-3  mb-24 md:mb-48">
          {/* Main Content */}
          <div className="max-w-4xl text-center">
            <h1
              className=""
              style={{
                background:
                  "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
                fontStyle: "bold",
                fontSize: "72px",
                lineHeight: "76px",
                letterSpacing: "0.5%",
                textAlign: "center",
                textTransform: "uppercase",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Lucrative Career Opportunities Await
            </h1>
          </div>
          {/* CTA removed from absolute context, now flows beneath title */}
          <div
            className="career-hero-cta"
            style={{
              width: "484px",
              maxWidth: "100%",
              height: "78px",
              opacity: 1,
              zIndex: 20,
            }}
          >
            <a
              href="#open-positions"
              onClick={handleSeeOpenPositions}
              role="button"
              style={{
                display: "inline-block",
                width: "100%",
                height: "100%",
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Image
                src="/contact/exploreopportunities.png"
                alt="Explore Opportunities"
                width={484}
                height={78}
                className="object-cover opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Desktop styles */
        .career-hero-section {
          width: 100%;
          height: 648px;
          opacity: 1;
        }

        .career-hero-bg {
          width: 1440px;
          max-width: 100%;
          height: 648px;
          margin: 0 auto;
          left: 50%;
          transform: translateX(-50%);
          background-size: cover;
          background-position: center;
          opacity: 1;
        }

        .gradient-title {
          background: linear-gradient(
            92.6deg,
            #f2f2f2 16.14%,
            #ffffff 39.21%,
            #d4d2d2 56.82%,
            #ffffff 78.04%,
            #bab8b8 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .description-text {
          background: linear-gradient(
            294.32deg,
            #a8a8a6 29.58%,
            #f9f8f6 48.13%,
            #d4d4d4 61.6%,
            #7f7f7f 86.45%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 767px) {
          /* Section adjustments */
          .career-hero-section {
            width: 100% !important;
            height: auto !important;
            min-height: 480px !important;
          }

          /* Background image sizing and position */
          .career-hero-bg {
            background-position: center !important;
            /* stretch fully to show entire banner without cropping */
            background-size: 100% 100% !important;
            background-repeat: no-repeat !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important; /* fill section height */
            min-height: 480px !important;
            top: 0 !important;
            bottom: auto !important;
          }

          /* Content area padding reduction */
          .career-hero-content {
            padding-top: 120px !important; /* make room for sticky navbar */
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          /* Title scale */
          .career-hero-content h1,
          h1 {
            font-size: 28px !important;
            line-height: 36px !important;
            margin-bottom: 12px !important;
          }

          /* CTA container repositioned and resized */
          .career-hero-cta,
          div[style*="top: 324px"] {
            position: static !important;
            margin-top: -40px !important;
            width: auto !important;
            left: auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
