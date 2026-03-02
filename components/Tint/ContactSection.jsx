"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "tint",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill in Name, Email, and Mobile Number.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...formData }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", mobile: "", service: "tint", message: "" });
        toast.success("Message sent! We'll reach out to you soon.");
      } else {
        setStatus("error");
        const json = await res.json().catch(() => ({}));
        const msg = json.details?.sms || json.details?.whatsapp || json.error || "Something went wrong. Please try again.";
        toast.error(msg);
      }
    } catch (err) {
      setStatus("error");
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section
      className="contact-section relative py-24 overflow-hidden bg-[#010101]"
      style={{
        height: "1486px",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/tint/brand-strip.png"
          width={1777}
          height={1486}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="contact-wrapper relative z-10 max-w-[1777px] mx-auto px-[112px]">
        {/* Title */}
        <div
          className="title-wrap"
          style={{
            position: "relative",
            top: "62px",
            marginBottom: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            style={{
              position: "absolute",
              width: "696px",
              height: "64px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <h2
            className="contact-hero"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontStyle: "bold",
              fontSize: "72px",
              lineHeight: "72px",
              letterSpacing: "0.5%",
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
            Let's Get In Touch{" "}
          </h2>
        </div>

        {/* Form card */}
        <div
          className="mx-auto mt-24 max-w-[1116px] relative form-card"
          style={{
            border: "0.5px solid rgba(77,77,77,0.6)",
            background: "rgba(18,18,18,0.45)",
            backdropFilter: "blur(0px)",
          }}
        >
          <div
            className="form-content"
            style={{
              padding: "38px 52px 6px 52px",
            }}
          >
            <h3
              className="contact-subtitle"
              style={{
                background:
                  "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 600,
                fontSize: "36px",
                lineHeight: "48px",
                letterSpacing: "0.5%",
                textAlign: "center",
                textTransform: "capitalize",
                margin: 0,
              }}
            >
              Share your details and we'll reach out promptly
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label
                  className=" mb-2 block"
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    width: 48,
                    height: 31,
                    opacity: 1,
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: " 22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input w-full px-5 text-[14px] text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className=" mb-2 block"
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    width: 48,
                    height: 31,
                    opacity: 1,
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: " 22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="abc@xyz.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input w-full px-5 text-[14px] text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>

              {/* Mobile */}
              <div>
                <label
                  className=" mb-2 block"
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    width: 130,
                    height: 31,
                    opacity: 1,
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: " 22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                  }}
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+06 1234 56787 00"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="contact-input w-full px-5 text-[14px] text-white focus:outline-none focus:border-[#d4af37] transition-colors "
                />
              </div>

              {/* Service dropdown */}
              <div>
                <label
                  className=" mb-2 block"
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    width: 273,
                    height: 31,
                    opacity: 1,
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: " 22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                  }}
                >
                  Which Job will you applied for?
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="contact-input w-full px-5 text-[14px] text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="tint">Tint</option>
                    <option value="coating">Coating</option>
                    <option value="ppf">PPF</option>
                    <option value="wrapping">Wrapping</option>
                    <option value="combo">Combo</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 5L7 9L11 5"
                        stroke="#a9a9a9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label
                  className=" mb-2 block"
                  style={{
                    color: "rgba(255, 255, 255, 1)",
                    width: 273,
                    height: 31,
                    opacity: 1,
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontStyle: "Medium",
                    fontSize: " 22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                  }}
                >
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  placeholder="Type here your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="contact-input contact-textarea w-full px-5 text-[14px] text-white focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center send-btn">
                <button type="submit" className="relative" disabled={status === "loading"} style={{ opacity: status === "loading" ? 0.7 : 1 }}>
                  <Image
                    src="/tint/sendnowbtn.png"
                    width={484}
                    height={140}
                    alt="Send Now"
                    className="send-image hover:brightness-110 transition-all"
                  />
                </button>
              </div>
            </form>

            <style jsx>{`
              .contact-input {
                border: 1px solid rgba(77, 77, 77, 1);
                background: transparent;
                color: #ffffff;
                border-radius: 0; /* no rounded corners */
                padding: 0 20px;
                max-width: 100%;
                box-sizing: border-box;
              }

              /* Only inputs and selects should have fixed 72px height; textarea uses .contact-textarea */
              input.contact-input,
              select.contact-input {
                height: 72px;
              }

              @media (min-width: 768px) {
                .contact-input {
                  max-width: 487px;
                }

                /* Allow textarea to span full width when it uses md:col-span-2 */
                .contact-textarea {
                  max-width: 100%;
                  min-height: 200px;
                }
              }

              .contact-textarea {
                height: auto;
                min-height: 128px;
                border-radius: 0; /* match inputs */
              }

              .contact-input::placeholder,
              .contact-textarea::placeholder {
                color: rgba(77, 77, 77, 1);
                font-family: Oswald, sans-serif;
                font-weight: 500;
                font-style: normal;
                font-size: 22px;
                line-height: 31px;
                letter-spacing: 0.5%;
                text-transform: capitalize;
              }

              /* Send image default sizing (desktop) */
              .send-image {
                width: 484px;
                height: 140px;
              }

              /* Mobile responsiveness (keep desktop as-is) */
              @media (max-width: 767px) {
                .contact-wrapper {
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }

                .contact-hero {
                  font-size: 22px !important;
                  line-height: 26px !important;
                  margin-top: 0 !important;
                  margin-bottom: 4px !important;
                }

                .contact-subtitle {
                  font-size: 14px !important;
                  line-height: 18px !important;
                  margin-bottom: 6px !important;
                }

                .contact-input {
                  padding: 0 6px !important;
                }

                input.contact-input,
                select.contact-input {
                  height: 44px !important;
                }

                .contact-textarea {
                  min-height: 100px !important;
                  padding: 6px !important;
                }

                .contact-input::placeholder,
                .contact-textarea::placeholder {
                  font-size: 14px !important;
                  line-height: 18px !important;
                }

                .send-image {
                  width: 220px !important;
                  height: auto !important;
                }

                .send-btn {
                  padding-top: 4px !important;
                }

                /* Mobile spacing fixes - aggressively tightened */
                .contact-section {
                  height: auto !important;
                  padding-top: 4px !important;
                  padding-bottom: 4px !important;
                }

                .title-wrap {
                  top: 0 !important;
                  margin-bottom: 6px !important;
                }

                .form-card {
                  margin-top: 0 !important;
                  margin-left: 0 !important;
                  margin-right: 0 !important;
                }

                .form-content {
                  padding: 6px 6px 8px 6px !important;
                }

                /* Stretch the translucent card nearly full-bleed */
                .form-card {
                  margin-left: 2px !important;
                  margin-right: 2px !important;
                }

                /* Reduce outer container horizontal spacing from px-[112px] */
                .contact-wrapper {
                  padding-left: 6px !important;
                  padding-right: 0px !important;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
