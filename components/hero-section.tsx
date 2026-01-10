"use client"

import Image from "next/image"
import { MapPin, Mail, Facebook } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image src="/images/hero-background.png" alt="Hero background" fill className="object-cover" priority />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between rounded-full bg-black/20 backdrop-blur-md border border-white/10 px-4 md:px-6 py-2 md:py-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/kl-white-logo.png"
                alt="KL TINT STUDIO"
                width={40}
                height={40}
                className="h-6 md:h-8 w-auto"
              />
            </div>

            {/* Center Nav Items - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {["Tint", "Coating", "PPF", "Wrapping", "Combo"].map((item) => (
                <button
                  key={item}
                  className="text-white text-xs lg:text-sm font-medium hover:text-orange-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="text-white hover:text-orange-400 transition-colors">
              <Image
                src="/images/hamburger-menu.png"
                alt="Menu"
                width={24}
                height={24}
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:pt-32 z-10 px-4">
        <div className="text-center">
          <p className="text-white/60 text-sm md:text-lg font-light tracking-widest mb-2 md:mb-4">
            YOUR CAR IS NOW SUPER
          </p>
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            ENHANCE
          </h1>
        </div>
      </div>

      {/* Social Icons - Right Side Vertical - Hidden on small mobile */}
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-4 md:gap-6">
        {/* WhatsApp */}
        <button className="text-white/60 hover:text-white transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>

        <button className="text-white/60 hover:text-white transition-colors">
          <Facebook className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button className="text-white/60 hover:text-white transition-colors">
          <Mail className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Location */}
        <button className="text-white/60 hover:text-white transition-colors">
          <MapPin className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Vertical Line */}
        <div className="w-px h-8 md:h-12 bg-white/30 my-1 md:my-2" />

        {/* Contact Text - Upside Down Vertical */}
        <div
          className="text-white/60 text-[10px] md:text-xs font-light tracking-wider"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          Contact
        </div>
      </div>
    </section>
  )
}
