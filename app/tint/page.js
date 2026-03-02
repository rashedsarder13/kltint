import TintHero from "@/components/Tint/TintHero";
import TintCarousel from "@/components/Tint/TintCarousel";
import FAQSection from "@/components/Tint/FAQSection";
import VLTLevels from "@/components/Tint/VLTLevels";
import PackageSection from "@/components/Tint/PackageSection";
import TintOptions from "@/components/Tint/TintOptions";
import FilmTypes from "@/components/Tint/FilmTypes";
import PayInInstallments from "@/components/Tint/PayInInstallments";
import ContactSection from "@/components/shared/ContactSection";
import TintCarouselLine from "@/components/Tint/TintCarouselLine";

export const metadata = {
  title: "Window Tinting",
  description:
    "Professional automotive window tinting services with premium films. UV protection, heat rejection, and enhanced privacy for your vehicle.",
};

export default function TintPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <TintHero />
      {/* <TintCarousel /> */}
      <TintCarouselLine />
      <VLTLevels />
      <PackageSection />
      <TintOptions />
      <FilmTypes />
      <FAQSection />
      {/* <PayInInstallments /> */}
      <ContactSection />
    </main>
  );
}
