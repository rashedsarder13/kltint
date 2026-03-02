import Image from "next/image";
import React from "react";

// Image-based button: render the three separate shape images (no extra styling)
const Button = ({
  text = "",
  className = "",
  style = {},
  width = 308,
  height = 63,
  ...props
}) => {
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ ...(style || {}), cursor: "pointer" }}
      {...props}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Image
          src="/blog/button.png"
          alt="Button main"
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {text && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              color: "#010101",
              whiteSpace: "nowrap",
              padding: "0 8px",
            }}
          >
            {text}
          </span>
        )}
      </div>

      {/* first rotated stripe (matches spec) */}
      <div
        style={{
          width: "40px",
          height: "70px",
          opacity: 1,
          display: "inline-block",
          marginLeft: "-22px",
        }}
      >
        <Image
          src="/blog/shape1.png"
          alt="Button stripe"
          width={40}
          height={70}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* second rotated stripe (same size/angle) */}
      <div
        style={{
          width: "40px",
          height: "70px",
          opacity: 1,
          display: "inline-block",
          marginLeft: "-20px",
        }}
      >
        <Image
          src="/blog/shape2.png"
          alt="Button stripe 2"
          width={40}
          height={70}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Button;
