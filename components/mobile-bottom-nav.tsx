"use client"

import { Home, Layers, MapPin, Phone, Menu } from "lucide-react"
import { useState } from "react"

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState("home")

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#" },
    { id: "services", label: "Services", icon: Layers, href: "#features" },
    { id: "locations", label: "Locations", icon: MapPin, href: "#map" },
    { id: "contact", label: "Contact", icon: Phone, href: "#contact" },
    { id: "menu", label: "Menu", icon: Menu, href: "#" },
  ]

  const handleClick = (id: string, href: string) => {
    setActiveTab(id)
    if (href !== "#") {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id, item.href)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "text-[#d4a853] bg-[#d4a853]/10" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-[#d4a853]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
