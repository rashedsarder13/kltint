"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
export default function BlogDetailsPage({ slug }) {
  // Blog data with full content
  const blogData = {
    "tinting-wrapping-coating-ppf": {
      title: "Tinting, Wrapping, Coating & Paint Protection Film",
      image: "/blog/post1img.svg",
      content: [
        "Welcome to the KL Tint Studio Blog – your trusted source for everything about car care, styling, and protection. Here, we share expert tips, guides, and insights on services like window tinting, vinyl wrapping, ceramic coating, and paint protection film (PPF). Whether you're looking to enhance your car's style, protect it from daily wear, or learn the latest trends in automotive detailing, our articles are designed to help you make the best decisions for your vehicle.",
        "Window tinting, wrapping, coating, and PPF are more than just upgrades – they are investments in your car's appearance, comfort, and long-term value. Our goal is to break down each service in simple terms, so you can understand how they work, what benefits they bring, and which option is best for your lifestyle. From reducing heat with premium tint to preserving your paintwork with protective films, we provide insights that matter to everyday drivers and car enthusiasts alike.",
        "We also cover the latest trends, technologies, and innovations in the automotive protection industry. Whether it's new ceramic coating formulas, advanced self-healing PPF, or stylish vinyl wrap finishes, we keep you updated with what's new and effective. Our blog is designed not just to inform, but to inspire – helping you discover creative ways to enhance your car's look while keeping it shielded from scratches, UV rays, and harsh weather conditions.",
        "At KL Tint Studio, we believe car care should be both practical and stylish. That's why our blog brings you real-world advice, expert recommendations, and customer stories that showcase the value of professional automotive services. Whether you're a first-time car owner or a long-time enthusiast, you'll find valuable information here to keep your car protected, stylish, and ready for the road ahead.",
        "They are investments in your car's appearance, comfort, and long-term value. Our goal is to break down each service in simple terms, so you can understand how they work, what benefits they bring, and which option is best for your lifestyle. From reducing heat with premium tint to preserving your paintwork with protective films, we provide insights that matter to everyday drivers and car enthusiasts alike.",
      ],
    },
    "drive-in-style-expert-car-care": {
      title: "Drive In Style – Expert Car Care & Protection Blog",
      image: "/blog/post2img.svg",
      content: [
        "At KL Tint Studio, we believe car care should be both practical and stylish. That's why our blog brings you real-world advice, expert recommendations, and customer stories that showcase the value of professional automotive services. Whether you're a first-time car owner or a long-time enthusiast, you'll find valuable information here to keep your car protected, stylish, and ready for the road ahead.",
        "Expert tips on car care and protection are essential for maintaining your vehicle's appearance and value. Our comprehensive guides cover everything from basic maintenance to advanced protection techniques that will keep your car looking brand new for years to come.",
        "Window tinting, wrapping, coating, and PPF are more than just upgrades – they are investments in your car's appearance, comfort, and long-term value. Understanding these services will help you make informed decisions about protecting your investment.",
        "We also cover the latest trends, technologies, and innovations in the automotive protection industry. Stay updated with cutting-edge solutions that provide maximum protection while enhancing your vehicle's aesthetic appeal.",
        "From reducing heat with premium tint to preserving your paintwork with protective films, we provide insights that matter to everyday drivers and car enthusiasts alike. Our goal is to empower you with knowledge that translates into better care for your vehicle.",
      ],
    },
    "car-styling-protection-tips": {
      title: "Car Styling & Protection Blog | Tips, Trends & Guides",
      image: "/blog/post3img.svg",
      content: [
        "Latest tips, trends, and guides for car styling and protection. Discover how to transform your vehicle's appearance while ensuring it stays protected from the elements and everyday wear and tear.",
        "Comprehensive information about automotive styling and protection techniques that professionals use. Learn the secrets behind achieving that showroom finish and maintaining it for the long term.",
        "At KL Tint Studio, we believe car care should be both practical and stylish. Our expert team shares insider knowledge and proven techniques that deliver outstanding results for every type of vehicle.",
        "Whether it's new ceramic coating formulas, advanced self-healing PPF, or stylish vinyl wrap finishes, we keep you updated with what's new and effective in the automotive protection industry.",
        "They are investments in your car's appearance, comfort, and long-term value. Make informed decisions with our detailed guides and real-world examples that showcase the transformative power of proper car care.",
      ],
    },
  };

  const relatedPosts = [
    {
      title: "Tinting, Wrapping, Coating & Paint Protection Film",
      image: "/blog/post1img.svg",
      slug: "tinting-wrapping-coating-ppf",
    },
    {
      title: "Drive In Style – Expert Car Care & Protection Blog",
      image: "/blog/post2img.svg",
      slug: "drive-in-style-expert-car-care",
    },
    {
      title: "Car Styling & Protection Blog | Tips, Trends & Guides",
      image: "/blog/post3img.svg",
      slug: "car-styling-protection-tips",
    },
  ];

  const post = blogData[slug] || blogData["tinting-wrapping-coating-ppf"];

  return (
    <>
      <main
        className="min-h-screen bg-[#0A0A0C] relative"
        style={{
          height: "1900px",
        }}
      >
        {/* Background Hero Image as top banner */}
        <div
          className="relative w-full"
          style={{
            height: "548px", // fixed banner height
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "rotate(0deg)", // explicit angle
            // opacity is intentionally left at 1 (fully visible)
          }}
        >
          {/* Content Container (no dark overlay; image is fully visible) */}
          <div
            className="relative z-10 w-full max-w-360 mx-auto px-4 md:px-8 lg:px-28 pt-32 pb-24"
            style={{
              top: "448px",
            }}
          >
            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left Column - Title and Content */}
              <div className="flex-1" style={{ maxWidth: "800px" }}>
                {/* Title */}
                <h1
                  className="font-oswald font-bold mb-8"
                  style={{
                    fontSize: "48px",
                    lineHeight: "1.2",
                    letterSpacing: "0.005em",
                    color: "#FFFFFF",
                  }}
                >
                  {post.title}
                </h1>

                {/* Content */}
                <div className="space-y-4">
                  {post.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="leading-relaxed"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        textAlign: "justify",
                        lineHeight: "24px",
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share Button */}
                <button
                  className="mt-8 flex items-center gap-2 hover:text-white transition-colors"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.7)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                      fill="currentColor"
                    />
                  </svg>
                  Share
                </button>
              </div>

              {/* Right Column - Related Posts */}
              <div style={{ width: "380px", flexShrink: 0 }}>
                <h3
                  className="text-2xl font-bold font-oswald mb-8"
                  style={{
                    background:
                      "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Recent Post
                </h3>

                <div className="space-y-8">
                  {relatedPosts
                    .filter((relatedPost) => relatedPost.slug !== slug)
                    .slice(0, 2)
                    .map((relatedPost, index) => (
                      <div key={index} className="group">
                        {/* Post Image */}
                        <div
                          className="relative w-full overflow-hidden mb-4 rounded-lg"
                          style={{ height: "220px" }}
                        >
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Post Title */}
                        <h4
                          className="text-lg font-bold font-oswald mb-5"
                          style={{
                            color: "#FFFFFF",
                            lineHeight: "1.3",
                          }}
                        >
                          {relatedPost.title}
                        </h4>

                        {/* Read More Button */}
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            <Image
                              src="/blog/readmore.png"
                              alt="Read More"
                              width={200}
                              height={55}
                              className="transition-transform duration-300 group-hover:translate-x-2"
                            />
                          </button>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div
              className="small-banner "
              style={{
                marginTop: "60px",
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
                  className="object-cover w-full h-auto banner-img hidden md:block"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 767px) {
          main {
            height: auto !important;
            min-height: 100vh !important;
            padding-bottom: 40px !important;
          }

          .relative.w-full {
            height: auto !important;
          }

          /* Banner adjustments */
          .relative.w-full > div:first-child {
            height: 200px !important;
            background-position: center !important;
          }

          /* Content container */
          .relative.z-10.w-full.max-w-360.mx-auto.px-4.md\:px-8.lg\:px-28.pt-32.pb-24 {
            top: 180px !important;
            padding-top: 20px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 20px !important;
          }

          /* Two-column -> single column with proper order */
          .flex.flex-col.lg\:flex-row.gap-16 {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }

          /* Left column (description) - show first */
          .flex.flex-col.lg\:flex-row.gap-16 > div:first-child {
            width: 100% !important;
            max-width: 100% !important;
            order: 1 !important;
            display: block !important;
          }

          /* Right column (related posts) - show second */
          .flex.flex-col.lg\:flex-row.gap-16 > div:last-child {
            width: 100% !important;
            max-width: 100% !important;
            order: 2 !important;
            display: block !important;
            flex-shrink: 1 !important;
          }

          /* Title styling */
          h1 {
            font-size: 28px !important;
            line-height: 1.3 !important;
            margin-bottom: 20px !important;
          }

          /* Paragraph styling */
          p {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          /* Content spacing */
          .space-y-4 {
            margin-bottom: 20px !important;
          }

          /* Share button */
          button.flex.items-center {
            margin-top: 24px !important;
            margin-bottom: 32px !important;
          }

          /* Related posts section title */
          h3.text-2xl {
            font-size: 24px !important;
            margin-top: 0 !important;
            margin-bottom: 20px !important;
          }

          /* Related posts container */
          .space-y-8 {
            display: block !important;
          }

          /* Related post card */
          .group {
            display: block !important;
            margin-bottom: 20px !important;
          }

          /* Related post images */
          .relative.w-full.overflow-hidden.mb-4.rounded-lg {
            height: 160px !important;
            display: block !important;
          }

          /* Related post titles */
          h4.text-lg {
            font-size: 18px !important;
            margin-bottom: 12px !important;
          }

          /* Read more buttons */
          .group button {
            display: inline-block !important;
          }

          .group button img {
            width: 180px !important;
            height: auto !important;
            display: block !important;
          }

          /* Small banner positioning - after everything */
          .small-banner {
            margin-top: 40px !important;
            order: 3 !important;
            display: flex !important;
          }

          /* Banner image sizing */
          .banner-img {
            height: auto !important;
            min-height: 80px !important;
          }
        }
      `}</style>
    </>
  );
}
