"use client";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const NeedHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in Name, Email, and Phone.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          service: formData.subject || "General Inquiry",
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
      className="relative w-full overflow-hidden need-help-section"
      style={{
        height: "880px",
        opacity: 1,
        backgroundColor: "rgba(1, 1, 1, 1)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 background-image"
        style={{
          backgroundImage: "url('/home/needHelp.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "880px",
        }}
      />

      {/* Title */}
      <div
        className="title-container"
        style={{
          position: "absolute",
          top: "13px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1195px",
          paddingLeft: "44px",
          textAlign: "left",
          zIndex: 20,
        }}
      >
        {/* Blue ellipse shadow behind text */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            top: "50%",
            left: "44px",
            transform: "translateY(-50%)",
            width: "457px",
            height: "44px",
            background: "#032EBD",
            borderRadius: "50%",
            filter: "blur(40px)",
            opacity: 0.8,
            zIndex: 0,
          }}
        />
        <h2
          className="title-text"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "60px",
            color: "#FFFFFF",
            marginBottom: "8px",
            textAlign: "left",
          }}
        >
          Need Help?
        </h2>
        <p
          className="subtitle-text"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 500,
            fontSize: "22px",
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: "24px",
            margin: 0,
            textAlign: "left",
          }}
        >
          Share Your Details And We&apos;ll Reach Out Promptly.
        </p>

        {/* Mobile-only blue ellipse under the title */}
        <div className="mobile-ellipse" />
      </div>

      {/* Content Container */}
      <div
        className="content-container"
        style={{
          backgroundImage: "url('/home/needhelpcontainerbg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          border: "1px solid rgba(27, 27, 27, 1)",
          background: "rgba(0, 0, 0, 0.13)",
          width: "1195px",
          height: "620px",
          top: "186px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "45px",
          display: "flex",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Left - Form Section */}
        <div
          className="form-section"
          style={{
            flex: 1,
            padding: "22px 80px 27px 44px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="help-form"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              width: "100%",
              height: "442px",
              maxWidth: "488px",
            }}
          >
            {/* Name Input */}
            <div
              className="input-group"
              style={{
                height: "50px",
                width: "488px",
              }}
            >
              <label
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(169, 169, 169, 1)",
                  display: "block",
                  lineHeight: "31px",
                  letterSpacing: "0.5%",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "Oswald, sans-serif",
                  outline: "none",
                }}
              />
            </div>

            {/* Email Input */}
            <div
              className="input-group"
              style={{
                height: "50px",
                width: "488px",
              }}
            >
              <label
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(169, 169, 169, 1)",
                  display: "block",
                  lineHeight: "31px",
                  letterSpacing: "0.5%",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "Oswald, sans-serif",
                  outline: "none",
                }}
              />
            </div>

            {/* Phone Input */}
            <div
              className="input-group"
              style={{
                height: "50px",
                width: "488px",
              }}
            >
              <label
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(169, 169, 169, 1)",
                  display: "block",
                  lineHeight: "31px",
                  letterSpacing: "0.5%",
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "Oswald, sans-serif",
                  outline: "none",
                }}
              />
            </div>

            {/* Subject Select */}
            <div className="input-group" style={{ position: "relative" }}>
              <label
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(169, 169, 169, 1)",
                  display: "block",
                  lineHeight: "31px",
                  letterSpacing: "0.5%",
                }}
              >
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "Oswald, sans-serif",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage:
                    'url(\'data:image/svg+xml;utf8,<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>\')',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0 center",
                  paddingLeft: "4px",
                  paddingRight: "20px",
                }}
              >
                <option value="" style={{ background: "#000" }}></option>
                <option value="general" style={{ background: "#000" }}>
                  General Inquiry
                </option>
                <option value="booking" style={{ background: "#000" }}>
                  Booking
                </option>
                <option value="support" style={{ background: "#000" }}>
                  Support
                </option>
              </select>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(169, 169, 169, 1)",
                  display: "block",
                  lineHeight: "31px",
                  letterSpacing: "0.5%",
                  marginBottom: "10px",
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                style={{
                  width: "100%",
                  height: "115px",
                  background: "transparent",
                  border: "none",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "8px 0",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "Oswald, sans-serif",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={status === "loading"} style={{ opacity: status === "loading" ? 0.7 : 1 }}>
              <Image
                src="/home/sendMsg.png"
                alt="Send Icon"
                width={500}
                height={76}
                style={{ marginTop: "-12px", cursor: "pointer" }}
              />
            </button>
          </form>
        </div>

        {/* Right - Illustration Section */}
        <div
          className="illustration-section"
          style={{
            width: "582px",
            height: "620px",
            background: "rgba(0, 0, 0, 0.5)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "30px 30px 30px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "620px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/needHelpConnection.svg"
              alt="Need Help Connection"
              width={582}
              height={620}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hide mobile ellipse by default (desktop) */
        .mobile-ellipse {
          display: none;
        }

        @media (max-width: 767px) {
          .need-help-section {
            height: auto !important;
            min-height: 100vh !important;
            padding: 20px 0 40px !important;
          }

          .background-image {
            height: 100% !important;
            background-size: cover !important;
          }

          .title-container {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            padding: 0 20px !important;
            width: 100% !important;
            margin-bottom: 24px !important;
          }

          .title-text {
            font-size: 32px !important;
            line-height: 40px !important;
            margin-bottom: 8px !important;
          }

          .subtitle-text {
            font-size: 16px !important;
            line-height: 22px !important;
          }

          /* Show the blurred ellipse under the title on mobile */
          .mobile-ellipse {
            display: block !important;
            position: absolute !important;
            top: 8px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 280px !important;
            height: 48px !important;
            background: #032ebd !important;
            border-radius: 50% !important;
            filter: blur(40px) !important;
            opacity: 0.8 !important;
            z-index: 0 !important;
          }

          /* Ensure headings sit above the blur */
          .title-text,
          .subtitle-text {
            position: relative !important;
            z-index: 2 !important;
          }

          .content-container {
            position: relative !important;
            width: calc(100% - 32px) !important;
            height: auto !important;
            top: 0 !important;
            left: 16px !important;
            right: 16px !important;
            transform: none !important;
            border-radius: 20px !important;
            flex-direction: column !important;
            padding: 0 !important;
          }

          .form-section {
            padding: 32px 20px 28px !important;
            width: 100% !important;
          }

          .help-form {
            gap: 20px !important;
            height: auto !important;
            max-width: 100% !important;
          }

          .input-group {
            width: 100% !important;
            height: auto !important;
          }

          .input-group label {
            font-size: 18px !important;
            line-height: 26px !important;
          }

          .input-group input,
          .input-group select,
          .input-group textarea {
            font-size: 15px !important;
          }

          /* Submit button - make it responsive */
          .submit-btn {
            width: 100% !important;
            max-width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 0 !important;
          }

          .submit-btn img {
            width: 100% !important;
            max-width: 280px !important;
            height: auto !important;
            margin-top: 0 !important;
          }

          .illustration-section {
            width: 100% !important;
            height: 280px !important;
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 0 0 20px 20px !important;
            padding: 24px 20px !important;
          }

          .illustration-section > div {
            height: 100% !important;
          }

          .illustration-section img {
            width: 100% !important;
            height: 100% !important;
          }
        }

        /* Tablet breakpoint */
        @media (min-width: 768px) and (max-width: 1023px) {
          .need-help-section {
            height: auto !important;
            min-height: 880px !important;
          }

          .title-container {
            width: 90% !important;
            max-width: 800px !important;
            padding-left: 32px !important;
          }

          .content-container {
            width: 90% !important;
            max-width: 900px !important;
            height: auto !important;
          }

          .form-section {
            padding: 32px 40px !important;
          }

          .input-group {
            width: 100% !important;
          }

          .illustration-section {
            width: 100% !important;
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NeedHelp;
