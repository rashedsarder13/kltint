import Navbar from "@/components/Navbar/Navbar";
import GalleryContact from "@/components/Gallery/GalleryContact";
import GalleryHero from "@/components/Gallery/GalleryHero";
import VisualProofe from "@/components/Gallery/VisualProofe";
import Footer from "@/components/Footer/Footer";
import React from "react";

export const metadata = {
  title: "Gallery",
  description:
    "Browse our portfolio of automotive protection work. See real results from window tinting, PPF, ceramic coating, and car wrapping projects.",
};

const page = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0A0A0C]">
        <GalleryHero />
        <VisualProofe />
        <GalleryContact />
      </main>
    </>
  );
};

export default page;
