"use client"

import { useState } from "react"
import Image from "next/image"

export default function PaymentSection() {
  const [activeTab, setActiveTab] = useState("online")

  const tabs = [
    { id: "card", label: "Card" },
    { id: "online", label: "Online" },
    { id: "ewallet", label: "E-Wallet" },
    { id: "instalment", label: "Instalment" },
    { id: "book-later", label: "Book Pay Later" },
  ]

  const bankLogos = [
    { id: 1, name: "CIMB", src: "/cimb-bank-logo.jpg" },
    { id: 2, name: "Citi", src: "/citi-bank-logo.jpg" },
    { id: 3, name: "Deutsche Bank", src: "/deutsche-bank-logo.jpg" },
    { id: 4, name: "OCBC", src: "/ocbc-bank-logo.png" },
    { id: 5, name: "CIMB Clicks", src: "/cimb-clicks-logo.jpg" },
    { id: 6, name: "HSBC", src: "/hsbc-bank-logo.jpg" },
    { id: 7, name: "Rakyat", src: "/rakyat-bank-logo.jpg" },
    { id: 8, name: "PBe2", src: "/pbe2-logo.jpg" },
    { id: 9, name: "AEON Bank", src: "/aeon-bank-logo.jpg" },
    { id: 10, name: "AGRO BANK", src: "/agro-bank-logo.jpg" },
    { id: 11, name: "Alliance Online", src: "/alliance-online-logo.jpg" },
    { id: 12, name: "AmBank", src: "/ambank-logo.jpg" },
    { id: 13, name: "Bank Muamalat", src: "/bank-muamalat-logo.jpg" },
    { id: 14, name: "Bank Islam", src: "/bank-islam-logo.jpg" },
  ]

  const extendedLogos = [...bankLogos, ...bankLogos, ...bankLogos, ...bankLogos]

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-8-background.png"
          alt="Earth background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 md:py-20">
        {/* Title */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 relative inline-block">
            Your Safe Payment Experience
            <div
              className="absolute inset-0 blur-3xl bg-blue-600/50 -z-10 rounded-full"
              style={{ width: "100%", height: "100%" }}
            />
          </h2>
        </div>

        <div className="grid grid-cols-3 md:flex gap-2 md:gap-4 justify-center mb-10 md:mb-16 w-full max-w-xl md:max-w-none px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300 border text-[10px] md:text-base ${
                activeTab === tab.id
                  ? "bg-blue-600/20 border-blue-500 text-white"
                  : "border-gray-600 text-gray-300 hover:border-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full overflow-hidden">
          {/* First Row - scrolls left */}
          <div className="mb-4 md:mb-8 relative">
            <div className="flex gap-3 md:gap-6 pb-4 md:pb-6 animate-scroll-left" style={{ width: "max-content" }}>
              {extendedLogos.map((logo, idx) => (
                <div
                  key={`row1-${logo.id}-${idx}`}
                  className="flex-shrink-0 h-14 w-28 md:h-20 md:w-40 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 hover:border-white/20 transition-all"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="object-contain w-20 md:w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - scrolls right */}
          <div className="relative">
            <div className="flex gap-3 md:gap-6 animate-scroll-right" style={{ width: "max-content" }}>
              {extendedLogos.map((logo, idx) => (
                <div
                  key={`row2-${logo.id}-${idx}`}
                  className="flex-shrink-0 h-14 w-28 md:h-20 md:w-40 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 hover:border-white/20 transition-all"
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="object-contain w-20 md:w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 90s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 90s linear infinite;
        }
      `}</style>
    </section>
  )
}
