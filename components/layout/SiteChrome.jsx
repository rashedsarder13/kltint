"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppFloating from "@/components/shared/WhatsAppFloating";

export default function SiteChrome({ children }) {
  const pathname = usePathname() || "";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloating
        phone="60167554178"
        message="Tell me how can I help you?"
      />
    </>
  );
}
