"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Footer() {
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");

  const handleSubscribe = async () => {
    if (!subEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "subscribe",
          email: subEmail,
          name: "Subscriber",
        }),
      });
      if (res.ok) {
        toast.success("Subscribed! Check your email for confirmation.");
        setSubEmail("");
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubStatus("idle");
    }
  };

  const services = [
    { label: "Tint Services", href: "/tint" },
    { label: "Ceramic Coating", href: "/coating" },
    { label: "Paint Protection Film", href: "/ppf" },
    { label: "Wrapping", href: "/wrapping" },
    { label: "Combo", href: "/combo" },
  ];

  const locations = [
    { label: "Cheras Branch", href: "/contact" },
    { label: "Kota Damansara", href: "/contact" },
    { label: "Setia Alam Branch", href: "/contact" },
    { label: "Puchong Branch", href: "/contact" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden footer-container"
      style={{
        height: "529px",
        opacity: 1,
        position: "relative",
        marginTop: "-100px",
        zIndex: 50,
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 footer-bg"
        style={{
          backgroundImage: "url('/Footer.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 45,
        }}
      />

      {/* Content Container */}
      <div
        className="relative footer-content"
        style={{
          width: "1440px",
          height: "529px",
          margin: "0 auto",
          position: "relative",
          zIndex: 50,
        }}
      >
        {/* Left Section - Company Info */}
        <div
          className="footer-left-section"
          style={{
            position: "absolute",
            width: "255px",
            height: "251px",
            top: "46px",
            left: "113px",
            display: "flex",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          {/* Logo */}
          <div style={{ width: "255px", height: "70px" }}>
            <Image
              src="/logo-white-new-1.png"
              alt="KL Tint Studio"
              width={1000}
              height={1000}
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* #01 in Malaysia */}
          <div>
            <h2
              style={{
                width: "226px",
                height: "48px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "48px",
                letterSpacing: "0.18px",
                textTransform: "capitalize",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              #01 in Malaysia
            </h2>

            {/* Services Description */}
            <p
              style={{
                width: "255px",
                height: "21px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0.07px",
                textTransform: "capitalize",
                color: "#4D4D4D",
                marginTop: "10px",
              }}
            >
              Tint, Coating, PPF & Wrapping services
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-contact" style={{ width: "167px", height: "58px" }}>
            {/* Phone Number */}
            <div
              className="footer-contact-phone"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div style={{ width: "18px", height: "18px", flexShrink: 0 }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.33 14.9 16.22 14.88 16.12 14.88C15.86 14.88 15.61 14.98 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.58C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "#FFFFFF",
                }}
              >
                +60 167554178
              </span>
            </div>

            {/* Email */}
            <div
              className="footer-contact-email"
              style={{
                width: "167px",
                height: "48px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0.028px",
                textAlign: "center",
                color: "#4D4D4D",
              }}
            >
              <div>
                <a href="mailto:hello@kltintstudio.com">
                  hello@kltintstudio.com
                </a>
              </div>
              <div>
                <a href="mailto:appoinment@kltintstudio.com">
                  appoinment@kltintstudio.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div
          className="footer-newsletter"
          style={{
            position: "absolute",
            width: "448px",
            height: "91px",
            left: "476px",
            top: "-6px",
          }}
        >
          <h3
            className="newsletter-hidden"
            style={{
              width: "147px",
              height: "31px",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 500,
              fontSize: "22px",
              lineHeight: "31px",
              letterSpacing: "0.11px",
              textTransform: "capitalize",
              color: "#FFFFFF",
              marginBottom: "10px",
            }}
          >
            Get news & Offer
          </h3>

          <div
            className="newsletter-hidden"
            style={{
              position: "relative",
              width: "448px",
              height: "50px",
              background: "#131313",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "inset 0px 1px 0px 0px rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              padding: "12px",

              gap: "8px",
            }}
          >
            <input
              type="email"
              placeholder="your_email_address@mail.com"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              disabled={subStatus === "loading"}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14px",
              }}
            />
            <div
              style={{
                cursor: subStatus === "loading" ? "not-allowed" : "pointer",
                opacity: subStatus === "loading" ? 0.6 : 1,
              }}
              onClick={handleSubscribe}
            >
              <Image
                src="/Group 106.png"
                alt="Subscribe"
                width={100}
                height={50}
              />
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div
          className="footer-social"
          style={{
            position: "absolute",
            width: "320px",
            height: "24px",
            top: "41px",
            left: "1056px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <a
            href={`https://wa.me/60167554178`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", width: "24px", height: "24px" }}
          >
            <Image src="/whatsapp.svg" alt="whatsapp" width={24} height={24} />
          </a>
          <a
            href="https://www.facebook.com/Kltintstudio"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", width: "24px", height: "24px" }}
          >
            <Image src="/facebook.svg" alt="facebook" width={24} height={24} />
          </a>
          <a
            href="https://www.instagram.com/kltint/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", width: "24px", height: "24px" }}
          >
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.threads.com/@kltint"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            title="Threads"
            style={{ display: "inline-block", width: 24, height: 24 }}
          >
            {/* Threads (inline SVG) - white to match other icons */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3.5C8.41015 3.5 5.5 6.41015 5.5 10C5.5 13.5899 8.41015 16.5 12 16.5C15.5899 16.5 18.5 13.5899 18.5 10C18.5 6.41015 15.5899 3.5 12 3.5Z"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V12"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13.5C13.2 13.5 14 14.3 14 15.5C14 16.7 13.2 17.5 12 17.5C10.8 17.5 10 16.7 10 15.5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="https://x.com/kl_tint"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            title="X"
            style={{ display: "inline-block", width: 24, height: 24 }}
          >
            {/* X icon (inline SVG) - white to match other icons */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5L19 19"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 5L5 19"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="https://www.pinterest.com/kltint"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
            title="Pinterest"
            style={{ display: "inline-block", width: 24, height: 24 }}
          >
            {/* Pinterest (inline SVG) - white to match other icons */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <path
                d="M11.5 9.5C11.5 8.7 12.1 8 13 8C14.1 8 14.6 8.8 14.6 9.6C14.6 10.8 13.8 11.9 13 13C12.7 13.4 12.9 14 13.4 14C14.3 14 15.6 13.6 16.2 12.3"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/kltintstudio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={{ display: "inline-block", width: 24, height: 24 }}
          >
            {/* LinkedIn (inline SVG) - white to match other icons */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <rect x="7" y="10" width="2" height="7" fill="#FFFFFF" />
              <path
                d="M10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5Z"
                fill="#FFFFFF"
              />
              <path
                d="M15 12.5V17"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15 9.5C15 10.3284 14.3284 11 13.5 11C12.6716 11 12 10.3284 12 9.5C12 8.67157 12.6716 8 13.5 8C14.3284 8 15 8.67157 15 9.5Z"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
            </svg>
          </a>
        </div>

        {/* Our Services, Locations, Quick Links Section */}
        <div
          className="footer-links-section"
          style={{
            position: "absolute",
            width: "723px",
            height: "236px",
            top: "143px",
            left: "444px",
            display: "flex",
            gap: "132px",
          }}
        >
          {/* Our Services */}
          <div style={{ width: "189px", height: "236px" }}>
            <h4
              style={{
                width: "109px",
                height: "31px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "31px",
                letterSpacing: "0.11px",
                textTransform: "capitalize",
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Our Services
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {services.map((service, index) => (
                <Link key={index} href={service.href} passHref>
                  <div
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "-8px",
                      cursor: "pointer",
                      height: "28px",
                    }}
                  >
                    {/* Arrow Icon 1 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredService === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-service-1)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-service-1"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Arrow Icon 2 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredService === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-service-2)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-service-2"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Text */}
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "28px",
                        letterSpacing: "0.032px",
                        whiteSpace: "nowrap",
                        marginLeft: "4px",
                        background:
                          "linear-gradient(294.32deg, #A8A8A6 29.58%, #F9F8F6 48.13%, #D4D4D4 61.6%, #7F7F7F 86.45%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter:
                          hoveredService === index
                            ? "drop-shadow(0 0 4px rgba(255,255,255,0.6))"
                            : "none",
                      }}
                    >
                      {service.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div style={{ width: "189px", height: "236px" }}>
            <h4
              style={{
                width: "109px",
                height: "31px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "31px",
                letterSpacing: "0.11px",
                textTransform: "capitalize",
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Locations
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {locations.map((location, index) => (
                <Link key={index} href={location.href} passHref>
                  <div
                    onMouseEnter={() => setHoveredLocation(index)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "-8px",
                      cursor: "pointer",
                      height: "28px",
                    }}
                  >
                    {/* Arrow Icon 1 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredLocation === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-location-1)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-location-1"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Arrow Icon 2 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredLocation === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-location-2)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-location-2"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Text */}
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "28px",
                        letterSpacing: "0.032px",
                        whiteSpace: "nowrap",
                        marginLeft: "4px",
                        background:
                          "linear-gradient(294.32deg, #A8A8A6 29.58%, #F9F8F6 48.13%, #D4D4D4 61.6%, #7F7F7F 86.45%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter:
                          hoveredLocation === index
                            ? "drop-shadow(0 0 4px rgba(255,255,255,0.6))"
                            : "none",
                      }}
                    >
                      {location.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ width: "189px", height: "236px" }}>
            <h4
              style={{
                width: "109px",
                height: "31px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "31px",
                letterSpacing: "0.11px",
                textTransform: "capitalize",
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              Quick Links
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <div
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "-8px",
                      cursor: "pointer",
                      height: "28px",
                    }}
                  >
                    {/* Arrow Icon 1 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredLink === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-link-1)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-link-1"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Arrow Icon 2 */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        position: "relative",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          filter:
                            hoveredLink === index
                              ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                              : "none",
                        }}
                      >
                        <path
                          d="M4 9L8 5L4 1"
                          stroke="url(#gradient-link-2)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient-link-2"
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="13.34%" stopColor="#121214" />
                            <stop offset="52.62%" stopColor="#505256" />
                            <stop offset="97.75%" stopColor="#94999F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    {/* Text */}
                    <span
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "28px",
                        letterSpacing: "0.032px",
                        whiteSpace: "nowrap",
                        background:
                          "linear-gradient(294.32deg, #A8A8A6 29.58%, #F9F8F6 48.13%, #D4D4D4 61.6%, #7F7F7F 86.45%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginLeft: "4px",
                        filter:
                          hoveredLink === index
                            ? "drop-shadow(0 0 4px rgba(255,255,255,0.6))"
                            : "none",
                      }}
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile-only More section inside the links grid (hidden on desktop) */}
          <div className="footer-terms-mobile" style={{ display: "none" }}>
            <h4
              style={{
                width: "109px",
                height: "31px",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "31px",
                letterSpacing: "0.11px",
                textTransform: "capitalize",
                color: "#FFFFFF",
                marginBottom: "24px",
              }}
            >
              More
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Terms */}
              <Link href="/terms" passHref>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "-8px",
                    cursor: "pointer",
                    height: "28px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9L8 5L4 1"
                        stroke="url(#gradient-mobile-terms-1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-mobile-terms-1"
                          x1="0"
                          y1="0"
                          x2="10"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="13.34%" stopColor="#121214" />
                          <stop offset="52.62%" stopColor="#505256" />
                          <stop offset="97.75%" stopColor="#94999F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9L8 5L4 1"
                        stroke="url(#gradient-mobile-terms-2)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-mobile-terms-2"
                          x1="0"
                          y1="0"
                          x2="10"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="13.34%" stopColor="#121214" />
                          <stop offset="52.62%" stopColor="#505256" />
                          <stop offset="97.75%" stopColor="#94999F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "28px",
                      letterSpacing: "0.032px",
                      whiteSpace: "nowrap",
                      marginLeft: "4px",
                      background:
                        "linear-gradient(294.32deg, #A8A8A6 29.58%, #F9F8F6 48.13%, #D4D4D4 61.6%, #7F7F7F 86.45%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Terms
                  </span>
                </div>
              </Link>

              {/* Privacy Policy */}
              <Link href="/privacy-policy" passHref>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "-8px",
                    cursor: "pointer",
                    height: "28px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9L8 5L4 1"
                        stroke="url(#gradient-mobile-privacy-1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-mobile-privacy-1"
                          x1="0"
                          y1="0"
                          x2="10"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="13.34%" stopColor="#121214" />
                          <stop offset="52.62%" stopColor="#505256" />
                          <stop offset="97.75%" stopColor="#94999F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      position: "relative",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9L8 5L4 1"
                        stroke="url(#gradient-mobile-privacy-2)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-mobile-privacy-2"
                          x1="0"
                          y1="0"
                          x2="10"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="13.34%" stopColor="#121214" />
                          <stop offset="52.62%" stopColor="#505256" />
                          <stop offset="97.75%" stopColor="#94999F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "28px",
                      letterSpacing: "0.032px",
                      whiteSpace: "nowrap",
                      marginLeft: "4px",
                      background:
                        "linear-gradient(294.32deg, #A8A8A6 29.58%, #F9F8F6 48.13%, #D4D4D4 61.6%, #7F7F7F 86.45%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Privacy Policy
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="footer-bottom"
          style={{
            position: "absolute",
            width: "1440px",
            height: "73px",
            top: "431px",
            borderTop: "1px solid",
            borderImage:
              "linear-gradient(138.57deg, #121214 12.3%, #505256 36.76%, #94999F 64.85%, #212124 80.68%, #5D6064 92.45%, #9599A0 102.86%) 1",
          }}
        >
          {/* Footer Arrow */}
          <div
            style={{
              position: "absolute",
              top: "-31px",
              left: "0",
              width: "60px",
              height: "31px",
            }}
          >
            <Image src="/footerarrow.svg" alt="arrow" width={60} height={31} />
          </div>

          {/* Terms and Privacy (desktop) */}
          <div
            className="footer-terms"
            style={{
              position: "absolute",
              top: "25px",
              left: "113px",
              display: "flex",
              gap: "24px",
            }}
          >
            <Link href="/terms" passHref>
              <div
                style={{ display: "flex", alignItems: "center", gap: "-2px" }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9L8 5L4 1"
                    stroke="url(#gradient-terms-1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-terms-1"
                      x1="0"
                      y1="0"
                      x2="10"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="13.34%" stopColor="#121214" />
                      <stop offset="52.62%" stopColor="#505256" />
                      <stop offset="97.75%" stopColor="#94999F" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9L8 5L4 1"
                    stroke="url(#gradient-terms-2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-terms-2"
                      x1="0"
                      y1="0"
                      x2="10"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="13.34%" stopColor="#121214" />
                      <stop offset="52.62%" stopColor="#505256" />
                      <stop offset="97.75%" stopColor="#94999F" />
                    </linearGradient>
                  </defs>
                </svg>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    background:
                      "linear-gradient(298.59deg, #121214 1.67%, #505256 24.89%, #94999F 51.56%, #212124 66.59%, #5D6064 77.77%, #9599A0 87.66%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    cursor: "pointer",
                  }}
                >
                  Terms
                </span>
              </div>
            </Link>
            <Link href="/privacy-policy" passHref>
              <div
                style={{ display: "flex", alignItems: "center", gap: "-2px" }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9L8 5L4 1"
                    stroke="url(#gradient-privacy-1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-privacy-1"
                      x1="0"
                      y1="0"
                      x2="10"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="13.34%" stopColor="#121214" />
                      <stop offset="52.62%" stopColor="#505256" />
                      <stop offset="97.75%" stopColor="#94999F" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 9L8 5L4 1"
                    stroke="url(#gradient-privacy-2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-privacy-2"
                      x1="0"
                      y1="0"
                      x2="10"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="13.34%" stopColor="#121214" />
                      <stop offset="52.62%" stopColor="#505256" />
                      <stop offset="97.75%" stopColor="#94999F" />
                    </linearGradient>
                  </defs>
                </svg>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "22px",
                    background:
                      "linear-gradient(298.59deg, #121214 1.67%, #505256 24.89%, #94999F 51.56%, #212124 66.59%, #5D6064 77.77%, #9599A0 87.66%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    cursor: "pointer",
                  }}
                >
                  Privacy Policy
                </span>
              </div>
            </Link>
          </div>

          {/* Copyright */}
          <div
            className="footer-copyright"
            style={{
              position: "absolute",
              width: "281px",
              height: "22px",
              top: "25px",
              left: "1047px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "22px",
              letterSpacing: "0.028px",
              textAlign: "center",
              background:
                "linear-gradient(298.59deg, #121214 1.67%, #505256 24.89%, #94999F 51.56%, #212124 66.59%, #5D6064 77.77%, #9599A0 87.66%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            © 2025 KL Tint Studio | Design by Zenos IT Solutions
          </div>
        </div>
      </div>

      <style jsx>{`
        .newsletter-hidden {
          visibility: hidden !important;
          pointer-events: none !important;
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-container {
            height: auto !important;
            min-height: 800px !important;
            margin-top: 0px !important;
            padding-top: 0px !important;
            z-index: 10 !important;
            background-color: #0a0a0a !important;
          }

          /* Replace the SVG (designed for 1440px desktop) with a solid dark background */
          .footer-bg {
            background-image: none !important;
            background-color: #0a0a0a !important;
          }

          .footer-content {
            width: 100% !important;
            height: fit-content !important;
            padding: 0px 32px 32px 32px !important;
          }

          .footer-left-section {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            margin-bottom: 0px !important;
            margin-top: 40px !important;
            align-items: center !important;
            text-align: center !important;
          }

          /* Fix contact info block — remove fixed pixel dimensions */
          .footer-contact {
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 10px !important;
          }

          .footer-contact-phone {
            justify-content: center !important;
            margin-bottom: 0 !important;
          }

          .footer-contact-email {
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
          }

          .footer-newsletter {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            margin-bottom: 0px !important;
            margin-top: 28px !important;
          }

          .footer-newsletter h3 {
            text-align: center !important;
            width: 100% !important;
          }

          .footer-newsletter > div {
            width: 100% !important;
          }

          .footer-social {
            position: static !important;
            width: 100% !important;
            justify-content: center !important;
            margin-bottom: 24px !important;
            margin-top: 16px !important;
          }

          .footer-links-section {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
            margin-bottom: 40px !important;
            align-items: start !important;
          }

          /* Hide mobile-only terms column on tablet — desktop terms column shows */
          .footer-terms-mobile {
            display: none !important;
          }

          .footer-links-section > div {
            width: auto !important;
            height: fit-content !important;
          }

          .footer-bottom {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            padding: 20px 0 !important;
          }

          .footer-terms {
            position: static !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
          }

          .footer-copyright {
            position: static !important;
            width: 100% !important;
            text-align: center !important;
          }
        }

        @media (max-width: 767px) {
          .footer-container {
            height: auto !important;
            min-height: 700px !important;
            margin-top: 0px !important;
            padding-top: 0px !important;
            z-index: 10 !important;
            background-color: #0a0a0a !important;
          }

          /* Replace the SVG (designed for 1440px desktop) with a solid dark background */
          .footer-bg {
            background-image: none !important;
            background-color: #0a0a0a !important;
          }

          .footer-content {
            width: 100% !important;
            height: fit-content !important;
            padding: 0px 20px 20px 20px !important;
          }

          .footer-left-section {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            margin-bottom: 0px !important;
            margin-top: 40px !important;
            align-items: center !important;
            text-align: center !important;
          }

          /* Fix contact info block — remove fixed pixel dimensions */
          .footer-contact {
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 10px !important;
          }

          .footer-contact-phone {
            justify-content: center !important;
            margin-bottom: 0 !important;
          }

          .footer-contact-email {
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
          }

          .footer-newsletter {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            margin-bottom: 0px !important;
            margin-top: 20px !important;
          }

          .footer-newsletter h3 {
            text-align: center !important;
            width: 100% !important;
          }

          .footer-newsletter > div {
            width: 100% !important;
          }

          .footer-social {
            position: static !important;
            width: 100% !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
            margin-top: 10px !important;
          }

          .footer-links-section {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px !important;
            margin-bottom: 40px !important;
            align-items: start !important;
          }

          /* Mobile-only footer terms placed as the second column in the grid */
          .footer-terms-mobile {
            display: block !important;
          }
          .footer-terms-mobile > div {
            justify-content: center;
          }

          /* Hide desktop footer terms on mobile to avoid duplication */
          .footer-terms {
            display: none !important;
          }

          .footer-links-section > div {
            width: auto !important;
            height: fit-content !important;
          }

          .footer-bottom {
            position: static !important;
            width: 100% !important;
            height: fit-content !important;
            padding: 20px 0 !important;
          }

          .footer-terms {
            position: static !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
          }

          .footer-copyright {
            position: static !important;
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
