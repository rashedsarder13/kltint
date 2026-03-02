"use client";
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
// FloatingWhatsApp component to display a WhatsApp chat button
// with a floating animation and a default message.
const WhatsAppFloating = ({
  phoneNumber = "+60 167554178",
  message = "Hello! I have a query.",
  position = { bottom: 80, right: 20 },
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // sanitize phone number (remove spaces, +, dashes) so wa.me receives digits only
  const sanitizedNumber = String(phoneNumber).replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(
    message,
  )}`;

  const styleTag = `
    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.95); }
    }
  `;

  return (
    <>
      <style>{styleTag}</style>
      <div
        style={{
          position: "fixed",
          bottom: position.bottom,
          right: position.right,
          zIndex: 50,
        }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp (${sanitizedNumber})`}
          title={`Chat on WhatsApp (${sanitizedNumber})`}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#25D366",
            color: "white",
            borderRadius: "50px",
            padding: isHovered ? "10px 15px 10px 10px" : "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            overflow: "hidden",
            width: isHovered ? "auto" : "40px",
            height: "40px",
            textDecoration: "none",
            animation: "blink 1.5s ease-in-out infinite",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              animation: "gentleFloat 3s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              flexShrink: 0,
            }}
          >
            <FaWhatsapp style={{ fontSize: "20px" }} />
          </div>

          {isHovered && (
            <span
              style={{
                marginLeft: "8px",
                fontSize: "14px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                paddingRight: "4px",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              Chat with us
            </span>
          )}
        </a>
      </div>
    </>
  );
};

export default WhatsAppFloating;
