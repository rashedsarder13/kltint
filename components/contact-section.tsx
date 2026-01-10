"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const testimonials = [
  { id: 1, name: "Sarah Johnson", text: "Exceptional service! The tinting job looks flawless." },
  { id: 2, name: "Michael Chen", text: "Professional team with amazing attention to detail." },
  { id: 3, name: "Emma Davis", text: "Best car coating service I've ever experienced." },
  { id: 4, name: "James Wilson", text: "Outstanding PPF installation. Perfectly protected." },
  { id: 5, name: "Lisa Anderson", text: "Amazing wrapping work! Quality exceeds expectations." },
  { id: 6, name: "David Martinez", text: "Incredible service from start to finish." },
]

const avatarColors = ["bg-yellow-400", "bg-pink-400", "bg-blue-400", "bg-purple-400", "bg-red-400", "bg-green-400"]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", subject: "General Inquiry", message: "" })
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: "", phone: "", subject: "General Inquiry", message: "" })
  }

  const getAvatarPosition = (index: number) => {
    const angle = (index / testimonials.length) * Math.PI * 2 - Math.PI / 2
    const radius = 100
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    return { x, y }
  }

  return (
    <section id="contact" className="relative w-full py-12 md:py-20 px-4 md:px-6 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 relative">
            <span className="relative inline-block">
              Need Help?
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-blue-600/50 -z-10 rounded-full w-32 md:w-40 h-10 md:h-12" />
            </span>
          </h2>
          <p className="text-gray-300 text-sm md:text-lg">Share Your Details And We'll Reach Out Promptly.</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition text-sm md:text-base"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition text-sm md:text-base"
                  required
                />
              </div>

              {/* Subject Dropdown */}
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-white appearance-none focus:outline-none focus:border-blue-500/50 transition cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white text-sm md:text-base"
                >
                  <option value="General Inquiry">Subject</option>
                  <option value="Tint">Tint</option>
                  <option value="Coating">Coating</option>
                  <option value="PPF">PPF</option>
                  <option value="Wrapping">Wrapping</option>
                  <option value="Combo">Combo</option>
                </select>
                <ChevronDown className="absolute right-3 md:right-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 text-gray-500 pointer-events-none" />
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition resize-none text-sm md:text-base"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-600/40 hover:bg-gray-600/60 text-white font-semibold rounded-lg transition duration-300 text-sm md:text-base"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Testimonials - Hidden on small mobile, shown on tablet+ */}
          <div className="hidden sm:flex items-center justify-center relative h-full min-h-72 md:min-h-96">
            <div className="absolute w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-yellow-400/50">
                ❤️
              </div>
            </div>

            <svg className="absolute w-60 h-60 md:w-80 md:h-80 opacity-30" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="110" fill="none" stroke="white" strokeDasharray="10,10" />
            </svg>

            {testimonials.map((testimonial, index) => {
              const position = getAvatarPosition(index)
              return (
                <div
                  key={testimonial.id}
                  className="absolute pointer-events-none"
                  style={{
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  }}
                  onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                >
                  <div
                    className={`w-10 h-10 md:w-14 md:h-14 ${avatarColors[index]} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition transform shadow-lg relative group pointer-events-auto`}
                  >
                    <span className="text-base md:text-lg">{testimonial.name.charAt(0)}</span>

                    {hoveredTestimonial === testimonial.id && (
                      <div className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 md:px-4 md:py-3 w-36 md:w-48 text-white text-xs md:text-sm z-[9999] animate-fadeIn pointer-events-none">
                        <p className="font-semibold mb-1">{testimonial.text}</p>
                        <p className="text-gray-400 text-[10px] md:text-xs">{testimonial.name}</p>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-r border-b border-gray-700 rotate-45" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </section>
  )
}
