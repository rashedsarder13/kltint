import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SiteChrome from "@/components/layout/SiteChrome";

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
        <SiteChrome>{children}</SiteChrome>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
