"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const serviceTypes = [
  { id: "tint", label: "Tint" },
  { id: "coating", label: "Coating" },
  { id: "ppf", label: "PPF" },
  { id: "wrapping", label: "Wrapping" },
];

const blogPosts = [
  {
    id: 1,
    image: "/blog/post1img.svg",
    title: "Tinting, Wrapping, Coating & Paint Protection Film",
    slug: "tinting-wrapping-coating-ppf",
  },
  {
    id: 2,
    image: "/blog/post2img.svg",
    title: "Drive In Style – Expert Car Care & Protection Blog",
    slug: "drive-in-style-expert-car-care",
  },
  {
    id: 3,
    image: "/blog/post3img.svg",
    title: "Car Styling & Protection Blog | Tips, Trends & Guides",
    slug: "car-styling-protection-tips",
  },
];

const servicePostMapping = {
  tint: [1, 2, 3], // Show all three posts
  coating: [1, 3], // Show 1st and 3rd
  ppf: [1, 3], // Show 1st and 3rd
  wrapping: [2, 3], // Show 2nd and 3rd
};

export default function BlogPost() {
  const [activeService, setActiveService] = useState("tint");

  const visiblePostIds = servicePostMapping[activeService];
  const currentPosts = blogPosts.filter((post) =>
    visiblePostIds.includes(post.id),
  );

  return (
    <section
      className="relative py-24 bg-[#0A0A0C] overflow-hidden"
      style={{
        minHeight: "900px",
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#010101] rounded-full  pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[112px]">
        {/* Service Type Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {serviceTypes.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-8 py-3 rounded-full text-[16px] font-oswald transition-all ${
                activeService === service.id
                  ? "bg-gradient-to-r from-[#9E8976] via-[#F6D0AB] to-[#9E8976] text-black font-semibold shadow-lg"
                  : "bg-[#1a1a1a] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-12 mx-auto max-w-[1227px]">
          {currentPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block cursor-pointer group"
            >
              <div
                className="relative overflow-hidden flex items-center"
                style={{
                  width: "100%",
                  maxWidth: "1227px",
                  height: "372px",
                  flexDirection: index % 2 === 1 ? "row-reverse" : "row",
                }}
              >
                {/* Image Side */}
                <div className="relative w-1/2 h-full ">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Side */}
                <div className="w-1/2 h-full flex flex-col justify-center px-6 pb-8 -mt-12">
                  <p
                    className="text-xl md:text-4xl font-bold font-oswald mb-8 transition-all group-hover:text-white"
                    style={{
                      color: "#FFFFFF",
                      lineHeight: "1.2",
                    }}
                  >
                    {post.title}
                  </p>

                  <button
                    className="relative w-fit"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src="/blog/readmore.png"
                      alt="Read More"
                      width={361}
                      height={78}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
      </div>

      <style jsx>{`
        @media (max-width: 1280px) {
          .grid > a > div {
            width: 100% !important;
            height: auto !important;
            min-height: 300px !important;
          }
        }

        @media (max-width: 768px) {
          .grid > a > div {
            flex-direction: column !important;
            height: auto !important;
          }

          .grid > a > div > div:first-child {
            width: 100% !important;
            height: 100px !important;
          }

          .grid > a > div > div:last-child {
            width: 100% !important;
            padding: 24px !important;
          }

          /* mobile typography tweaks */
          .grid h3 {
            font-size: 24px !important;
            line-height: 1.3 !important;
            margin-bottom: 12px !important;
          }

          /* enlarge read more button for touch */
          .grid button {
            transform: scale(2) !important;
          }

          /* ensure image covers properly */
          .grid img {
            width: 100px !important;
            height: 180px !important;
            object-fit: cover !important;
          }
        }
      `}</style>
    </section>
  );
}
