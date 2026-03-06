"use client";

import { useState } from "react";
import Image from "next/image";
import BookingModal from "../shared/BookingModal";
import CheckoutModal from "../shared/CheckoutModal";

const comboTypes = [
  { id: "tint-coating", label: "Tint+Coating" },
  { id: "coating-ppf", label: "Coating+PPF" },
  { id: "tint-ppf", label: "Tint+PPF" },
  { id: "tint-coating-ppf", label: "Tint+Coating+PPF" },
];

const packagesData = {
  "tint-coating": [
    {
      name: "Crystal Guard",
      price: "949",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "9H • 80 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99% UV • Up To 65% IRR",
      warranty: "2y Tint • 1y Coating",
      uv: "99%",
      irr: "65%",
      hardness: "9H",
      maintenance: "1x",
      tintWarranty: "2 Year",
      coatingWarranty: "1 Year",
      particle: "80 nm",
    },
    {
      name: "Harmony Guard",
      price: "1249",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "9H • 80 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 92% IRR",
      warranty: "5y Tint • 1y Coating",
      uv: "99.9%",
      irr: "92%",
      hardness: "9H",
      maintenance: "1x",
      tintWarranty: "5 Year",
      coatingWarranty: "1 Year",
      particle: "80 nm",
    },
    {
      name: "Mystric Guard",
      price: "1849",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "9H • 70 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 95% IRR",
      warranty: "6y Tint • 2y Coating",
      uv: "99.9%",
      irr: "95%",
      hardness: "9H",
      maintenance: "2x",
      tintWarranty: "6 Year",
      coatingWarranty: "2 Year",
      particle: "70 nm",
    },
    {
      name: "Obsidian Ensemble",
      price: "2599",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "10H • 60 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 97% IRR",
      warranty: "7y Tint • 3y Coating",
      uv: "99.9%",
      irr: "97%",
      hardness: "10H",
      maintenance: "3x",
      tintWarranty: "7 Year",
      coatingWarranty: "3 Year",
      particle: "60 nm",
    },
    {
      name: "Miraze Radiance",
      price: "2999",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "10H • 60 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 98% IRR",
      warranty: "8y Tint • 3y Coating",
      uv: "99.9%",
      irr: "98%",
      hardness: "10H",
      maintenance: "3x",
      tintWarranty: "8 Year",
      coatingWarranty: "3 Year",
      particle: "60 nm",
    },
    {
      name: "Eternal Guard",
      price: "3849",
      original: "",
      filmType: "Nano Ceramic Tint + Graphene Coating",
      thickness: "10H • 60 nm",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 99% IRR",
      warranty: "10y Tint • 5y Coating",
      uv: "99.9%",
      irr: "99%",
      hardness: "10H",
      maintenance: "5x",
      tintWarranty: "10 Year",
      coatingWarranty: "5 Year",
      particle: "60 nm",
    },
  ],

  "tint-ppf": [
    {
      name: "Basic Protection",
      price: "2399",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 92% IRR",
      uv: "99.9%",
      irr: "92%",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Front / Partial",
      warranty: "",
    },
    {
      name: "Standard Protection",
      price: "2799",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 97% IRR",
      uv: "99.9%",
      irr: "97%",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Front",
      warranty: "",
    },
    {
      name: "Enhanced Protection",
      price: "3599",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "8.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 97% IRR",
      uv: "99.9%",
      irr: "97%",
      tpu: "8.5 mil",
      gloss: "93 GU",
      area: "Full Front",
      warranty: "",
    },
    {
      name: "Premium Protection",
      price: "4399",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 95% IRR",
      uv: "99.9%",
      irr: "95%",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Car",
      warranty: "",
    },
    {
      name: "Advanced Protection",
      price: "4999",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 98% IRR",
      uv: "99.9%",
      irr: "98%",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Car",
      warranty: "",
    },
    {
      name: "Elite Protection",
      price: "6799",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "8.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 98% IRR",
      uv: "99.9%",
      irr: "98%",
      tpu: "8.5 mil",
      gloss: "93 GU",
      area: "Full Car",
      warranty: "",
    },
    {
      name: "Ultimate Protection",
      price: "8499",
      original: "",
      filmType: "Nano Tint + TPU PPF",
      thickness: "8.5 mil TPU",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 99% IRR",
      uv: "99.9%",
      irr: "99%",
      tpu: "8.5 mil",
      gloss: "94 GU",
      area: "Full Car",
      warranty: "",
    },
  ],

  "coating-ppf": [
    {
      name: "Sentinel Suite",
      price: "2799",
      original: "",
      filmType: "Nano Coating + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Gloss 92",
      effectOptions: "9H Surface Hardness • 70 nm",
      hardness: "9H",
      particle: "70 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Front",
      warranty: "",
    },
    {
      name: "Zenith Armor",
      price: "3399",
      original: "",
      filmType: "Nano Coating + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Gloss 92",
      effectOptions: "10H Surface Hardness • 60 nm",
      hardness: "10H",
      particle: "60 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Front",
      warranty: "",
    },
    {
      name: "Celestial Shield Collection",
      price: "4999",
      original: "",
      filmType: "Nano Coating + TPU PPF",
      thickness: "7.5 mil TPU",
      colorOptions: "Gloss 92",
      effectOptions: "10H Surface Hardness • 60 nm",
      hardness: "10H",
      particle: "60 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      area: "Full Car",
      warranty: "",
    },
    {
      name: "Vanguard Shield Synergy",
      price: "6999",
      original: "",
      filmType: "Nano Coating + TPU PPF",
      thickness: "8.5 mil TPU",
      colorOptions: "Gloss 93",
      effectOptions: "10H Surface Hardness • 50 nm",
      hardness: "10H",
      particle: "50 nm",
      tpu: "8.5 mil",
      gloss: "93 GU",
      area: "Full Car",
      warranty: "",
    },
    {
      name: "Infinite Guard Matrix",
      price: "8999",
      original: "",
      filmType: "Nano Coating + TPU PPF",
      thickness: "8.5 mil TPU",
      colorOptions: "Gloss 95",
      effectOptions: "10H Surface Hardness • 40 nm",
      hardness: "10H",
      particle: "40 nm",
      tpu: "8.5 mil",
      gloss: "95 GU",
      area: "Full Car",
      warranty: "",
    },
  ],

  "tint-coating-ppf": [
    {
      name: "Elite Protection",
      price: "1999",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "9H • 80 nm • 7.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 84% IRR",
      uv: "99.9%",
      irr: "84%",
      hardness: "9H",
      particle: "80 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      coverage: "Full Car",
      warranty: "",
    },
    {
      name: "Advance Armor",
      price: "2699",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "9H • 80 nm • 7.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99% UV • Up To 84% IRR",
      uv: "99%",
      irr: "84%",
      hardness: "9H",
      particle: "80 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      coverage: "Front PPF",
      warranty: "",
    },
    {
      name: "Advance Guard",
      price: "3499",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "9H • 70 nm • 8.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99.9% UV • Up To 92% IRR",
      uv: "99.9%",
      irr: "92%",
      hardness: "9H",
      particle: "70 nm",
      tpu: "8.5 mil",
      gloss: "93 GU",
      coverage: "Front PPF",
      warranty: "",
    },
    {
      name: "Advanced Defense",
      price: "4399",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "9H • 70 nm • 7.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99% UV • Up To 92% IRR",
      uv: "99%",
      irr: "92%",
      hardness: "9H",
      particle: "70 nm",
      tpu: "7.5 mil",
      gloss: "92 GU",
      coverage: "Full Car",
      warranty: "",
    },
    {
      name: "Advance Shield",
      price: "5799",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "10H • 60 nm • 8.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99% UV • Up To 95% IRR",
      uv: "99%",
      irr: "95%",
      hardness: "10H",
      particle: "60 nm",
      tpu: "8.5 mil",
      gloss: "93 GU",
      coverage: "Full Car",
      warranty: "",
    },
    {
      name: "Track Dominator",
      price: "7399",
      original: "",
      filmType: "Tint + Coating + PPF",
      thickness: "10H • 40 nm • 8.5 mil",
      colorOptions: "Custom VLT Levels",
      effectOptions: "99% UV • Up To 98% IRR",
      uv: "99%",
      irr: "98%",
      hardness: "10H",
      particle: "40 nm",
      tpu: "8.5 mil",
      gloss: "94 GU",
      coverage: "Full Car",
      warranty: "",
    },
  ],
};

const comboPackageImageByName = {
  "tint-coating": {
    "Crystal Guard": "/combo/package/tint-coating/crystal-guard.jpg",
    "Harmony Guard": "/combo/package/tint-coating/harmony-guard.png",
    "Mystric Guard": "/combo/package/tint-coating/mystric-guard.png",
    "Obsidian Ensemble": "/combo/package/tint-coating/obsidian-ensemble.png",
    "Miraze Radiance": "/combo/package/tint-coating/miraze-radiance.png",
    "Eternal Guard": "/combo/package/tint-coating/eternal-guard.png",
  },
  "tint-ppf": {
    "Basic Protection": "/combo/package/tint-ppf/basic-protection.jpg",
    "Standard Protection": "/combo/package/tint-ppf/standard-protection.png",
    "Enhanced Protection": "/combo/package/tint-ppf/enhanced-protection.png",
    "Premium Protection": "/combo/package/tint-ppf/premium-protection.png",
    "Advanced Protection": "/combo/package/tint-ppf/advanced-protection.png",
    "Elite Protection": "/combo/package/tint-ppf/elite-protection.png",
    "Ultimate Protection": "/combo/package/tint-ppf/ultimate-protection.png",
  },
  "coating-ppf": {
    "Sentinel Suite": "/combo/package/coating-ppf/sentinel-suite.jpg",
    "Zenith Armor": "/combo/package/coating-ppf/zenith-armor.png",
    "Celestial Shield Collection": "/combo/package/coating-ppf/celestial-shield-collection.png",
    "Vanguard Shield Synergy": "/combo/package/coating-ppf/vanguard-shield-synergy.png",
    "Infinite Guard Matrix": "/combo/package/coating-ppf/infinite-guard-matrix.png",
  },
  "tint-coating-ppf": {
    "Elite Protection": "/combo/package/tint-coating-ppf/elite-protection.jpg",
    "Advance Armor": "/combo/package/tint-coating-ppf/advance-armor.png",
    "Advance Guard": "/combo/package/tint-coating-ppf/advance-gurd.png",
    "Advanced Defense": "/combo/package/tint-coating-ppf/advance-defence.png",
    "Advance Shield": "/combo/package/tint-coating-ppf/advance-shield.png",
    "Track Dominator": "/combo/package/tint-coating-ppf/track-dominator.png",
  },
};

export default function ComboPackageSection() {
  const [activeCombo, setActiveCombo] = useState("tint-coating");
  const [activeFilm, setActiveFilm] = useState(
    packagesData["tint-coating"][0].name,
  );
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const currentPackages = packagesData[activeCombo];
  const selected =
    currentPackages.find((f) => f.name === activeFilm) || currentPackages[0];
  const selectedPackageImage =
    comboPackageImageByName[activeCombo]?.[selected.name] ??
    (() => {
      // warn if mapping is missing so we can spot typos or missing files
      console.warn(
        `combo image missing for combo="${activeCombo}" package="${selected.name}"`
      );
      return "/combo/package/tint-coating/crystal-guard.jpg"; // generic fallback
    })();
  const activeIndex = currentPackages.findIndex((p) => p.name === activeFilm);

  // Build a dynamic, ordered list of specs to show in the preview —
  // only items with a truthy value will render.
  const specsKV = [
    { label: "UV", value: selected.uv || null },
    { label: "IRR", value: selected.irr || null },
    { label: "Thickness", value: selected.thickness || selected.tpu || null },
    {
      label: "Warranty",
      value:
        selected.warranty ||
        [selected.tintWarranty, selected.coatingWarranty].filter(Boolean).join(" / ") ||
        null,
    },
    { label: "Hardness", value: selected.hardness || null },
    { label: "Gloss", value: selected.gloss || null },
  ].filter((s) => s.value);

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleContinue = (formData) => {
    setBookingData(formData);
    setShowBookingModal(false);
    setShowCheckoutModal(true);
  };

  const handleBack = () => {
    setShowCheckoutModal(false);
    setShowBookingModal(true);
  };

  const handleCloseAll = () => {
    setShowBookingModal(false);
    setShowCheckoutModal(false);
    setBookingData(null);
  };

  const handlePrevPackage = () => {
    const nextIndex =
      activeIndex <= 0 ? currentPackages.length - 1 : Math.max(0, activeIndex - 1);
    setActiveFilm(currentPackages[nextIndex].name);
  };

  const handleNextPackage = () => {
    const nextIndex =
      activeIndex >= currentPackages.length - 1
        ? 0
        : Math.min(currentPackages.length - 1, activeIndex + 1);
    setActiveFilm(currentPackages[nextIndex].name);
  };

  return (
    <section
      id="combo-options"
      className="relative py-24 bg-[#0A0A0C] overflow-hidden"
      style={{
        height: "1080px",
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#00BFFF]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-2 md:px-[112px]">
        {/* Title */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "80px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Blue ellipse shadow behind text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "590px",
              height: "38px",
              background: "#032EBD",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          <h2 className="pick-header"
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "72px",
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
            Pick The Best Package
          </h2>
        </div>

        {/* Combo Type Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {comboTypes.map((combo) => (
            <button
              key={combo.id}
              onClick={() => {
                setActiveCombo(combo.id);
                setActiveFilm(packagesData[combo.id][0].name);
              }}
              className={`px-8 py-3 rounded-full text-[16px] font-oswald transition-all ${
                activeCombo === combo.id
                  ? "bg-gradient-to-r from-[#9E8976] via-[#F6D0AB] to-[#9E8976] text-black font-semibold shadow-lg"
                  : "bg-[#1a1a1a] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {combo.label}
            </button>
          ))}
        </div>

        {/* Layout: left package list, right preview box */}
        <div className="flex gap-[29px] items-start relative ppf-layout">
          {/* right-bottom mixed gold + red glow behind preview */}
          <div
            style={{
              position: "absolute",
              right: "-100px",
              bottom: "-110px",
              width: "235px",
              height: "420px",
              background:
                "radial-gradient(ellipse at 100% 100%, rgba(212,175,55,0.23) 0%, rgba(212,80,80,0.08) 30%, rgba(0,0,0,0) 60%)",
              filter: "blur(120px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* top-left glow near the package list */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "-20px",
              width: "220px",
              height: "120px",
              background:
                "radial-gradient(ellipse at 20% 20%, rgba(201,78,78,0.32), rgba(201,78,78,0.08) 40%, rgba(0,0,0,0) 70%)",
              filter: "blur(48px)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Left - Package List */}
          <div
            className="ppf-package-list"
            style={{
              width: "235px",
              height: "420px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              zIndex: 3,
              opacity: 1,
            }}
          >
            {currentPackages.map((film) => {
              const active = activeFilm === film.name;
              return (
                <button
                  key={film.name}
                  onClick={() => setActiveFilm(film.name)}
                  aria-pressed={active}
                  className="ppf-package-button"
                  style={{
                    width: "235px",
                    height: "48px",
                    padding: "10px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "24px",
                    cursor: "pointer",
                    transition: "all 0.28s cubic-bezier(.2,.9,.2,1)",
                    background: active
                      ? "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)"
                      : "transparent",
                    border: "1px solid",
                    borderImageSource: active
                      ? "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)"
                      : "linear-gradient(283.14deg, #0A0A0A 9.54%, #1A1A1A 90.46%)",
                    borderImageSlice: 1,
                    borderRadius: "0px",
                    opacity: 1,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: active ? 700 : 500,
                      fontSize: "18px",
                      lineHeight: "28px",
                      letterSpacing: "0.2%",
                      textAlign: "left",
                      width: "100%",
                      ...(active
                        ? {
                            background:
                              "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : {
                            color: "rgba(169, 169, 169, 1)",
                          }),
                    }}
                  >
                    {film.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right - Package Detail */}
          <div
            className="ppf-preview"
            style={{
              width: "904px",
              height: "420px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              backdropFilter: "blur(4px)",
              borderImageSource:
                "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
              borderImageSlice: 1,
              opacity: 1,
            }}
          >
            {/* Background SVG */}
            <Image
              src="/tint/pickThePackage.svg"
              alt="Package background"
              fill
              className="object-contain package-bg hidden md:block"
              style={{ zIndex: 1 }}
            />

            {/* preview eclipses (desktop only): bottom-right red + top-left purple */}
            <div
              className="preview-eclipse-br"
              style={{
                position: "absolute",
                left: "40px",
                bottom: "-40px",
                width: "277px",
                height: "276px",
                background: "rgba(255, 0, 0, 0.15)",
                filter: "blur(200px)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 1,
              }}
            />

            <div
              className="preview-eclipse-tl"
              style={{
                position: "absolute",
                left: "-90px",
                top: "-60px",
                width: "417px",
                height: "404px",
                background: "rgba(136, 0, 255, 0.08)",
                filter: "blur(200px)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 1,
              }}
            />

            {/* Package Detail Text - Top Left */}
            <div
              className="ppf-info"
              style={{
                position: "absolute",
                top: "50px",
                left: "40px",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                gap: "17px",
              }}
            >
              {/* Coverage and Coating row */}
              <div style={{ display: "flex", gap: "88px" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Film Type:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.filmType}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Thickness:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.thickness}
                  </span>
                </div>
              </div>

              {/* Color Options and Effect Options row */}
              <div style={{ display: "flex", gap: "36px" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Color Options:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.colorOptions}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Effect Options:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.effectOptions}
                  </span>
                </div>
              </div>

              {/* Warranty row */}
              <div style={{ display: "flex" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Warranty:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      lineHeight: "31px",
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 74.48%, #795F52 99.02%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {selected.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic stacked specs (shows only available fields) */}
            <div
              className="ppf-info-dynamic"
              style={{
                position: "absolute",
                top: "50px",
                left: "40px",
                zIndex: 2,
                width: "420px",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  width: "100%",
                }}
              >
                {specsKV.map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "22px",
                        color: "#DDE6EE",
                        marginBottom: "6px",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        lineHeight: "28px",
                        maxWidth: "100%",
                        overflowWrap: "break-word",
                        background:
                          "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Car Image - Top Right */}
            <div
              className="ppf-car"
              style={{
                position: "absolute",
                top: "26px",
                right: "0px",
                zIndex: 2,
                width: "600px",
                height: "400px",
                opacity: 1,
              }}
            >
              <Image
                src={selectedPackageImage}
                alt={`${selected.name} package car`}
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>

            {/* Price - left bottom */}
            <div
              className="ppf-footer"
              style={{
                position: "absolute",
                bottom: "40px",
                left: "40px",
                right: "40px",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {/* Price */}
              <div
                className="price"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "32px",
                    lineHeight: "40px",
                    letterSpacing: "0.5%",
                    color: "#FFFFFF",
                  }}
                >
                  RM{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 700,
                    }}
                  >
                    {selected.price}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    fontSize: "28px",
                    lineHeight: "40px",
                    letterSpacing: "0.5%",
                    textTransform: "capitalize",
                    textDecoration: "line-through",
                    background:
                      "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {selected.original}
                </span>
              </div>
            </div>

            {/* Book Button - positioned inside preview (desktop) */}
            <button
              onClick={handleBookNow}
              className="ppf-bookbtn"
              style={{
                position: "absolute",
                top: "330px",
                left: "483px",
                zIndex: 4,
                width: "395px",
                height: "63px",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135.31deg, #9E8976 15.43%, #7A5E50 30.62%, #F6D0AB 47.37%, #9D774E 62.96%, #C99B70 82.05%, #795F52 93.35%)",
                borderRadius: "45px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: 1,
                boxShadow:
                  "0 10px 30px rgba(157,119,78,0.18), 0 2px 8px rgba(0,0,0,0.6)",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(180deg, rgba(12,10,8,0.9), rgba(24,18,12,0.75))",
                  padding: "0 18px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    lineHeight: "31px",
                    letterSpacing: "0.5%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    textTransform: "capitalize",
                    background:
                      "linear-gradient(135.31deg, #F6D0AB 10%, #C99B70 60%, #9E8976 95%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    WebkitTextStroke: "0.5px rgba(0,0,0,0.2)",
                  }}
                >
                  Book This Package Now
                </span>
              </div>
            </button>

            <div className="ppf-mobile-arrows" aria-label="Package navigation">
              <button type="button" onClick={handlePrevPackage} aria-label="Previous package">
                ←
              </button>
              <button type="button" onClick={handleNextPackage} aria-label="Next package">
                →
              </button>
            </div>
          </div>
        </div>
        <div
          className="small-banner"
          style={{
            marginTop: "100px",
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
            {/* Desktop banner */}
            <Image
              src="/tint/tinitSmalllSection.svg"
              alt="Package bottom banner"
              width={1268}
              height={178}
              className="object-cover w-full h-auto hidden sm:block"
            />
            {/* Mobile banner */}
            <Image
              src="/tint/mobile/small_section.png"
              alt="Package bottom banner"
              width={1268}
              height={178}
              className="object-cover w-full h-auto block sm:hidden"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile-specific adjustments inside component */
        .ppf-package-list::-webkit-scrollbar {
          height: 6px;
        }
        .ppf-package-list {
          -webkit-overflow-scrolling: touch;
        }

        /* hide old static preview info, use dynamic stacked specs instead */
        .ppf-info {
          display: none !important;
        }
        .ppf-info-dynamic {
          display: block;
        }

        .ppf-info-dynamic > div {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }

        .ppf-info-dynamic > div > div:nth-child(n + 5) {
          display: none;
        }

        /* desktop should not be affected by .ppf-car; mobile-only rules appear in the
           @media (max-width: 640px) section */

        .ppf-mobile-arrows {
          display: none;
        }

        @media (max-width: 640px) {
          section {
            height: auto !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }

          .pick-header{
          margin-top: 32px !important;
          }

          h2 {
            font-size: 32px !important;
            line-height: 40px !important;
            padding: 0 20px !important;
            margin-bottom: 40px !important;
          }

          /* Combo type tabs */
          div:has(> button[class*="rounded-full"]) {
            gap: 8px !important;
            margin-bottom: 24px !important;
            padding: 0 16px;
          }

          div:has(> button[class*="rounded-full"]) button {
            padding: 10px 16px !important;
            font-size: 14px !important;
            white-space: nowrap;
          }

          .ppf-layout {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
            padding: 0;
          }

          /* 2-column grid of package buttons */
          .ppf-package-list {
            width: 100% !important;
            height: auto !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            display: flex !important;
            overflow-x: visible !important;
            gap: 10px !important;
            padding: 0 !important;
          }

          .ppf-package-button {
            min-width: calc(50% - 5px) !important;
            width: calc(50% - 5px) !important;
            flex: 0 0 calc(50% - 5px) !important;
            justify-content: flex-start !important;
            padding: 10px 14px !important;
            height: 52px !important;
          }

          .ppf-package-button span {
            text-align: left !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }

          /* Preview card */
          .ppf-preview {
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            padding: 12px !important;
            position: relative !important;
            display: block !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            border: 1px solid !important;
            border-image-source: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 30.62%,
              #f6d0ab 47.37%,
              #9d774e 62.96%,
              #c99b70 82.05%,
              #795f52 93.35%
            ) !important;
            border-image-slice: 1 !important;
            overflow: hidden !important;
            backdrop-filter: none !important;
            border-radius: 0 !important;
          }

          /* Car image — top right */
          .ppf-car {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            bottom: auto !important;
            order: 1 !important;
            width: 100% !important;
            height: 170px !important;
            border: none !important;
            border-image-source: none !important;
            z-index: 2 !important;
            opacity: 1 !important;
            overflow: hidden !important;
            border-radius: 0 !important;
            background: transparent !important;
            order: unset !important;
          }

          .ppf-car img {
            object-fit: contain !important;
          }

          .ppf-car::after {
            display: none !important;
          }

          /* Dynamic specs info — top left */
          .ppf-info-dynamic {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            order: 2 !important;
            z-index: 3 !important;
            display: flex !important;
            flex-direction: column;
            gap: 0;
            width: 100% !important;
            padding: 0 !important;
            opacity: 1 !important;
          }

          .ppf-info-dynamic > div {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          .ppf-info-dynamic > div > div > div:first-child {
            font-size: 10px !important;
            line-height: 13px !important;
            margin-bottom: 1px !important;
            color: #a0afbb !important;
          }

          .ppf-info-dynamic > div > div > div:last-child {
            font-size: 11px !important;
            line-height: 15px !important;
          }

          /* Price — bottom left, clear of book button */
          .ppf-footer {
            display: none !important;
          }

          .ppf-footer .price {
            display: flex;
            gap: 6px;
            align-items: baseline;
            opacity: 1 !important;
          }

          .ppf-footer .price span {
            font-size: 20px !important;
            line-height: 26px !important;
            opacity: 1 !important;
            font-weight: 700 !important;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
            filter: none !important;
          }

          /* Book button — full width at bottom of card */
          .ppf-bookbtn {
            position: relative !important;
            order: 3 !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            width: 100% !important;
            max-width: none !important;
            height: 48px !important;
            padding: 3px !important;
            border-radius: 45px !important;
            opacity: 1 !important;
          }

          .ppf-mobile-arrows {
            display: flex;
            justify-content: center;
            gap: 14px;
            order: 4;
            margin-top: 2px;
          }

          .ppf-mobile-arrows button {
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            border: 1px solid #3f3f46;
            color: #d4dee5;
            background: rgba(10, 10, 12, 0.85);
            font-size: 20px;
            line-height: 1;
          }

          .ppf-bookbtn span {
            font-size: 15px !important;
            line-height: 22px !important;
            opacity: 1 !important;
            background: linear-gradient(
              135.31deg,
              #9e8976 15.43%,
              #7a5e50 20.62%,
              #f6d0ab 37.37%,
              #9d774e 42.96%,
              #c99b70 52.05%,
              #795f52 73.35%
            ) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }

          .ppf-preview .package-bg {
            display: none !important;
          }

          .ppf-preview .preview-eclipse-br,
          .ppf-preview .preview-eclipse-tl {
            display: none !important;
          }

          .small-banner {
            margin-top: 40px !important;
          }
        }
      `}</style>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseAll}
        packageData={{
          name: selected.name,
          warranty: selected.warranty,
          filmType: selected.filmType,
          thickness: selected.thickness,
          price: selected.price,
          original: selected.original,
          area: selected.area,
          tpu: selected.tpu,
          gloss: selected.gloss,
          uv: selected.uv,
          irr: selected.irr,
          hardness: selected.hardness,
          particle: selected.particle,
          maintenance: selected.maintenance,
          tintWarranty: selected.tintWarranty,
          coatingWarranty: selected.coatingWarranty,
          coverage: selected.coverage,
        }}
        onContinue={handleContinue}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseAll}
        onBack={handleBack}
        packageData={{
          name: selected.name,
          price: selected.price,
          original: selected.original,
        }}
        bookingData={bookingData}
      />
    </section>
  );
}
