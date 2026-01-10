"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GoldButton from "./ui/gold-button"

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(2)

  const partners = [
    { id: 1, name: "ATMOS SHIELD", logo: "/images/partner-logo-1.png" },
    { id: 2, name: "VViViD", logo: "/images/partner-logo-2.png" },
    { id: 3, name: "3M", logo: "/images/partner-logo-3.png" },
    { id: 4, name: "ORACAL", logo: "/images/partner-logo-4.png" },
    { id: 5, name: "TECKWRAP", logo: "/images/partner-logo-5.png" },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? partners.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === partners.length - 1 ? 0 : prev + 1))
  }

  const getVisiblePartners = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + partners.length) % partners.length
      visible.push({ ...partners[index], offset: i })
    }
    return visible
  }

  return (
    <section
      className="relative w-full bg-black bg-cover bg-center py-16 md:py-24"
      style={{
        backgroundImage: `url(/images/section-4-background.png)`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-center font-black text-2xl md:text-3xl lg:text-4xl text-white italic mb-10 md:mb-16 tracking-wide relative">
          <span className="relative inline-block">
            Our Exclusive Partner Network
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-blue-600/50 -z-10 rounded-full w-60 md:w-80 h-16 md:h-20" />
          </span>
        </h2>

        {/* Partners Carousel */}
        <div className="flex items-center justify-center gap-2 md:gap-8 mb-8 md:mb-12">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 p-1.5 md:p-2 rounded-full border border-gray-600 hover:border-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} className="text-white md:w-6 md:h-6" />
          </button>

          {/* Carousel */}
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-grow max-w-5xl overflow-hidden">
            {getVisiblePartners().map((partner) => {
              const isCenter = partner.offset === 0
              const hiddenOnMobile = Math.abs(partner.offset) > 1
              return (
                <div
                  key={`${partner.id}-${partner.offset}`}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isCenter ? "scale-100 md:scale-110" : "scale-75 md:scale-90 opacity-60"
                  } ${hiddenOnMobile ? "hidden md:block" : ""}`}
                >
                  <div
                    className={`flex items-center justify-center h-16 w-24 md:h-24 md:w-40 rounded-lg ${
                      isCenter ? "bg-white" : "bg-gray-700"
                    }`}
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      width={150}
                      height={80}
                      className={`object-contain ${isCenter ? "w-20 h-10 md:w-32 md:h-16" : "w-16 h-8 md:w-24 md:h-12"}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 p-1.5 md:p-2 rounded-full border border-gray-600 hover:border-white transition-colors cursor-pointer"
          >
            <ChevronRight size={20} className="text-white md:w-6 md:h-6" />
          </button>
        </div>

        {/* Join With Us Button */}
        <div className="flex justify-center pt-4 md:pt-8">
          <GoldButton text="Join With Us" onClick={() => console.log("Join With Us clicked")} />
        </div>
      </div>
    </section>
  )
}
