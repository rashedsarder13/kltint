"use client"

import Image from "next/image"

interface GoldButtonProps {
  text: string
  onClick?: () => void
  className?: string
}

export default function GoldButton({ text, onClick, className = "" }: GoldButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative inline-block cursor-pointer transition-opacity hover:opacity-80 active:opacity-60"
    >
      <Image src="/images/reusable-button-image.png" alt="Button" width={220} height={50} className="w-auto" />
      <span
        className={`absolute inset-0 flex items-center justify-center text-black font-bold tracking-wide pointer-events-none ${className}`}
      >
        {text}
      </span>
    </button>
  )
}

export { GoldButton }
