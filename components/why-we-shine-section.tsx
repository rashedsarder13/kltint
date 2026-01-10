"use client"

import Image from "next/image"
import { Play } from "lucide-react"

export default function WhyWeShineSection() {
  return (
    <section className="relative w-full py-12 md:py-20 bg-black">
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
        {/* Title Section with arrows */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          <Image
            src="/images/section-3-title-arrow.png"
            alt="Arrow"
            width={60}
            height={12}
            className="opacity-70 w-12 md:w-20"
          />
          <h2 className="text-white font-black text-2xl md:text-3xl lg:text-4xl tracking-tight text-center italic relative">
            <span className="relative inline-block">
              Why We Shine
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-blue-500/40 -z-10 rounded-full w-48 md:w-72 h-16 md:h-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl bg-blue-400/20 -z-10 rounded-full w-full h-20 md:h-28 scale-150" />
            </span>
          </h2>
          <Image
            src="/images/section-3-title-arrow.png"
            alt="Arrow"
            width={60}
            height={12}
            className="opacity-70 rotate-180 w-12 md:w-20"
          />
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            {/* Outer frame with gradient border */}
            <div className="relative rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-zinc-500/40 via-zinc-600/20 to-transparent">
              {/* Inner container */}
              <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900">
                <Image
                  src="/images/section-3-background-image.png"
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <Play className="w-5 h-5 md:w-7 md:h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shadow effect below */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-full" />
          </div>
        </div>

        {/* Caption */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-white/60 text-sm md:text-base tracking-wide px-4">
            Precision Coating. Exceptional Shine. A KL Studio Experience.
          </p>
        </div>
      </div>
    </section>
  )
}
