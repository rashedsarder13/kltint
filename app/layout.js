import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppFloating from "@/components/shared/WhatsAppFloating";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "KL Tint Studio | Premium Automotive Protection Services",
    template: "%s | KL Tint Studio",
  },
  description:
    "Malaysia's leading automotive protection service provider. Specializing in window tinting, PPF, ceramic coating, and car wrapping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloating
          phone="60167554178"
          message="Tell me how can I help you?"
        />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
