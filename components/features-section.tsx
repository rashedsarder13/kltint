"use client"

import Image from "next/image"
import GoldButton from "@/components/ui/gold-button"

const features = [
  {
    title: "Heat & Glare Reduction",
    description: "Cooler, more comfortable interior",
    active: false,
  },
  {
    title: "Advanced UV Protection",
    description: "Shields from harmful UV rays",
    active: true,
  },
  {
    title: "Privacy & Protection",
    description: "Boosted vehicle privacy & security",
    active: false,
  },
  {
    title: "Sleek & Stylish",
    description: "Elevates car's aesthetic",
    active: false,
  },
]

const services = [
  { name: "Tint", active: true },
  { name: "Coating", active: false },
  { name: "PPF", active: false },
  { name: "Wrapping", active: false },
]

export default function FeaturesSection() {
  const handleBookTint = () => {
    console.log("Book Tint Service clicked")
  }

  return (
    <section id="features" className="relative w-full py-12 md:py-20 bg-black">
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
        <h2 className="text-center font-black text-2xl md:text-3xl lg:text-4xl text-white italic mb-8 md:mb-12 relative">
          <span className="relative inline-block">
            Luxury Tinting For A Crystal-Clear Future
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-blue-600/50 -z-10 rounded-full w-60 md:w-80 h-16 md:h-20" />
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Side - Feature Cards */}
          <div className="flex flex-col gap-2 md:gap-3 w-full lg:w-64 order-2 lg:order-1">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all ${
                  feature.active
                    ? "bg-teal-600/40 border-l-4 border-teal-400"
                    : "bg-zinc-800/80 border-l-4 border-transparent"
                }`}
              >
                <h3 className="text-white font-semibold text-xs md:text-sm">{feature.title}</h3>
                <p className="text-white/50 text-[10px] md:text-xs">{feature.description}</p>
              </div>
            ))}

            <div className="mt-3 md:mt-4 w-full">
              <GoldButton text="Book Tint Service" onClick={handleBookTint} />
            </div>
          </div>

          {/* Center - Car Image */}
          <div className="flex-1 flex justify-center items-center h-60 md:h-80 lg:h-96 order-1 lg:order-2">
            <div className="relative w-full max-w-xs md:max-w-md">
              <Image
                src="/images/section-2-background.png"
                alt="Luxury car"
                width={500}
                height={400}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Side - Service Navigation - Hidden on mobile */}
          <div className="hidden lg:flex flex-col items-end gap-2 w-full lg:w-32 order-3">
            {/* Top dots */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="w-1 h-1 bg-white/40 rounded-full" />
            </div>

            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={`text-sm ${service.active ? "text-white font-semibold" : "text-white/50"}`}>
                  {service.name}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full ${service.active ? "bg-amber-400" : "bg-white/30"}`} />
              </div>
            ))}

            {/* Bottom dots */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="w-1 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
