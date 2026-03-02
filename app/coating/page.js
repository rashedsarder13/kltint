import CoatingHero from "@/components/Coating/CoatingHero";
import CoatingCarousel from "@/components/Coating/CoatingCarousel";
import CoatingFAQ from "@/components/Coating/CoatingFAQ";
import CoatingPackages from "@/components/Coating/CoatingPackages";
import ContactSection from "@/components/shared/ContactSection";
import CoatingPackageSection from "@/components/Coating/CoatingPackageSection";
import CoatingCarouselLine from "@/components/Coating/CoatingCarouselLine";

export const metadata = {
  title: "Coating",
  description:
    "Professional ceramic coating services for superior paint protection, enhanced gloss, and long-lasting shine. Protect your vehicle with premium coating.",
};

export default function CoatingPage() {
  return (
    <main className="bg-[#010101] min-h-screen">
      <CoatingHero />
      <CoatingCarouselLine />
      {/* <CoatingCarousel /> */}
      <CoatingPackageSection />
      <CoatingPackages />
      <CoatingFAQ />
      <ContactSection />
    </main>
  );
}
