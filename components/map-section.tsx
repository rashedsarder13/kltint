"use client"

import { useState } from "react"
import Image from "next/image"
import { GoldButton } from "./ui/gold-button"

const branches = [
  {
    id: 1,
    name: "KL Tint Studio Kota Damansara",
    rating: 4.9,
    reviews: 30,
    image: "/white-car-tinting-service.jpg",
    mapLink: "https://maps.app.goo.gl/oNVsZuGUnHNfdXBR9",
    position: { top: "35%", left: "60%" },
  },
  {
    id: 2,
    name: "KL Tint Studio Maluri Cheras",
    rating: 4.8,
    reviews: 25,
    image: "/luxury-car-tinting.jpg",
    mapLink: "https://maps.app.goo.gl/MbR8dK7CW7fBFbv97",
    position: { top: "55%", left: "65%" },
  },
  {
    id: 3,
    name: "KL Tint Studio Setia Alam",
    rating: 4.9,
    reviews: 28,
    image: "/car-window-tinting-studio.jpg",
    mapLink: "https://maps.app.goo.gl/QDavfcU4ADJAbFEX6",
    position: { top: "30%", left: "25%" },
  },
  {
    id: 4,
    name: "KL Tint Studio Puchong",
    rating: 4.7,
    reviews: 22,
    image: "/professional-car-tinting.jpg",
    mapLink: "https://maps.app.goo.gl/TpdQF1NJQwfBoEfH8",
    position: { top: "65%", left: "45%" },
  },
]

export default function MapSection() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])

  const handleVisitNow = () => {
    window.open(selectedBranch.mapLink, "_blank")
  }

  const getPlaceName = (branchName: string) => {
    return branchName.replace("KL Tint Studio ", "")
  }

  return (
    <section id="map" className="relative min-h-screen bg-black py-12 md:py-16 px-4 md:px-8 lg:px-16">
      {/* Title with glow */}
      <div className="mb-10 md:mb-16 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-3xl bg-blue-600/40 -z-10 rounded-full w-72 md:w-96 h-20 md:h-24" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Find Your Nearest KL Studio</h2>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12">
        <div className="relative h-[450px] md:h-96 lg:h-[500px] bg-cover bg-center rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/50 z-5" />
          <Image
            src="/malaysia-map-google-maps-satellite-view.jpg"
            alt="Map showing KL Tint Studio locations"
            fill
            className="object-cover"
          />

          {/* Branch Pins with labels - All visible on mobile */}
          {branches.map((branch) => (
            <div key={branch.id}>
              {/* Label - Now visible on all screen sizes */}
              <div
                className="absolute transform -translate-x-1/2 z-10"
                style={{
                  top: `calc(${branch.position.top} - 30px)`,
                  left: branch.position.left,
                }}
              >
                <div className="bg-black/70 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <span className="text-white text-[8px] md:text-xs font-semibold">{getPlaceName(branch.name)}</span>
                </div>
              </div>

              {/* Pin button */}
              <button
                onClick={() => setSelectedBranch(branch)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                  selectedBranch.id === branch.id ? "scale-100 md:scale-125 z-20" : "scale-75 md:scale-100 z-10"
                }`}
                style={{
                  top: branch.position.top,
                  left: branch.position.left,
                }}
              >
                <div className="relative w-6 h-6 md:w-12 md:h-12">
                  <Image
                    src="/images/section-5-map-pin.png"
                    alt={`${branch.name} location`}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </button>
            </div>
          ))}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-8 md:right-8 bg-red-900/95 backdrop-blur-sm rounded-lg p-2 md:p-6 w-[90%] md:w-80 shadow-2xl z-30">
            <div className="flex md:block gap-2">
              <div className="flex-shrink-0 md:mb-4">
                <Image
                  src={selectedBranch.image || "/placeholder.svg"}
                  alt={selectedBranch.name}
                  width={300}
                  height={180}
                  className="w-20 h-16 md:w-full md:h-32 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-xs md:text-lg mb-1 md:mb-2">{selectedBranch.name}</h3>

                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                  <span className="text-yellow-400 text-[10px] md:text-base">{"★".repeat(5)}</span>
                  <span className="text-white font-semibold text-[10px] md:text-base">{selectedBranch.rating}</span>
                  <span className="text-gray-300 text-[8px] md:text-sm">({selectedBranch.reviews})</span>
                </div>

                <GoldButton text="Visit Now" onClick={handleVisitNow} className="text-xs md:text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="flex justify-center">
        <GoldButton
          text="Visit Nearest Area"
          onClick={() => window.open(selectedBranch.mapLink, "_blank")}
          className="text-sm md:text-lg"
        />
      </div>
    </section>
  )
}
