"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tint", href: "/tint" },
    { name: "Coating", href: "/coating" },
    { name: "PPF", href: "/ppf" },
    { name: "Wrapping", href: "/wrapping" },
    { name: "Combo", href: "/combo" },
  ];

  const middleItems = [
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  // prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* Desktop navbar */}
      <div className="fixed top-0 md:top-3 left-0 right-0 z-50 pt-2 md:pt-0">
        <div className="max-w-360 w-full mx-auto ">
          <div
            className="w-full max-w-7xl h-22.5 mx-auto flex items-center justify-between rounded-full p-2.5"
            style={{ backgroundColor: "rgba(15, 27, 50, 0.2)" }}
          >
            <div
              className="w-full h-full flex items-center justify-between bg-[#0F1B32]/30 backdrop-blur-md rounded-full"
              style={{ border: "0.5px solid #124163" }}
            >
              <Link href="/" className="flex items-center ml-4.5">
                <Image
                  src="/logo-white-new-1.png"
                  height={500}
                  width={162}
                  alt="KL TINT"
                  className="object-contain"
                  priority
                />
              </Link>

              <nav className="hidden lg:flex">
                <ul className="flex items-center list-none p-0 m-0">
                  {navItems.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <li>
                        <Link
                          href={item.href}
                          className={`oswald-nav nav-gradient cursor-pointer hover:opacity-80 transition-opacity ${
                            pathname === item.href ? "opacity-100" : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                      {index < navItems.length - 1 && (
                        <span className="nav-divider" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </nav>

              {/* Hamburger Menu Button */}
              <button
                aria-label="Menu"
                className="flex items-center justify-center border border-[#124163]/60 bg-[#124163]/60 backdrop-blur-sm rounded-full px-3 hover:bg-[#252A3C]/70 transition-all mr-3"
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src="/jam_menu.png"
                  width={51}
                  height={51}
                  alt="Menu"
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-999">
          {/* Background */}
          <div className="absolute inset-0 bg-black" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/navbar/navbar-bg.png')" }}
          />

          {/* Close Button */}
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-30 hover:cursor-pointer"
          >
            <Image
              src="/navbar/close-circle-outline.svg"
              alt="Close"
              width={56}
              height={56}
            />
          </button>

          {/* Main Layout */}
          <div className="relative z-20 w-full h-full flex flex-col px-6 sm:px-8 md:px-20 pt-16 pb-28 overflow-y-auto">
            <div className="w-full flex flex-col lg:grid lg:grid-cols-3 lg:items-center flex-1">

              {/* Mobile: two columns side by side | Desktop: left column */}
              <div className="flex items-start gap-4 md:gap-8">
                {/* MENU vertical text + divider */}
                <div className="flex flex-col items-center shrink-0">
                  <Image
                    src="/navbar/MENU.png"
                    width={40}
                    height={40}
                    alt="Menu"
                    className="w-3 h-8 md:w-4 md:h-10 mb-6 md:mb-10"
                  />
                  <div className="w-px bg-[#1f1f1f] h-[200px] md:h-80" />
                </div>

                {/* Nav links — two columns on mobile */}
                <div className="flex gap-8 md:gap-0 md:block md:space-y-4 md:ml-10">
                  {/* Column 1: main nav */}
                  <div className="space-y-3 md:space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block oswald-nav font-bold text-[20px] md:text-[36px] lg:text-[44px] leading-tight ${
                          pathname === item.href ? "gradient-active" : "text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Column 2: middle links — visible only on mobile inline */}
                  <div className="space-y-3 lg:hidden">
                    {middleItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block oswald-nav font-bold text-[20px] leading-tight text-white/80"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Icons Row — mobile/tablet only */}
              <div className="flex lg:hidden items-center gap-6 mt-8 md:mt-10 pl-12 md:pl-20">
                {["nav-icon1.png", "nav-icon2.png", "nav-icon3.png", "nav-icon4.png"].map((icon, i) => (
                  <button key={i} className="w-9 h-9 md:w-11 md:h-11 hover:scale-110 transition-transform">
                    <Image src={`/navbar/${icon}`} width={44} height={44} alt="Social" />
                  </button>
                ))}
              </div>

              {/* Middle Column — desktop only */}
              <div className="hidden lg:flex items-start gap-8 mt-0">
                <div className="w-px h-100 bg-[#1f1f1f]" />
                <div className="space-y-4 ml-10 lg:ml-20">
                  {middleItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block oswald-nav font-bold text-[44px] leading-tight text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column (Social) — desktop only */}
              <div className="hidden lg:flex items-start gap-8 justify-end">
                <div className="w-px h-70 bg-[#1f1f1f]" />
                <div className="flex flex-col gap-8 items-center ml-20 h-fit">
                  {["nav-icon1.png", "nav-icon2.png", "nav-icon3.png", "nav-icon4.png"].map((icon, i) => (
                    <button key={i} className="w-10 h-10 hover:scale-110 transition-transform">
                      <Image src={`/navbar/${icon}`} width={40} height={40} alt="Social" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Contact Section */}
          <div className="absolute bottom-4 md:bottom-10 left-0 right-0 px-6 md:px-20">
            <div className="flex flex-row items-center justify-between gap-3 md:gap-6">
              {/* Phone */}
              <div className="flex items-center gap-2 md:gap-4">
                <Image src="/navbar/nav-icon5.png" width={32} height={32} alt="Phone" className="w-7 h-7 md:w-12 md:h-12" />
                <span className="oswald-nav font-bold text-base md:text-3xl text-white">
                  +60 167554178
                </span>
              </div>
              {/* Email */}
              <div className="oswald-nav font-bold text-sm md:text-3xl gradient-email">
                hello@kltintstudio.com
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
