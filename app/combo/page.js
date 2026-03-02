import ComboHero from "@/components/Combo/ComboHero";
import ComboCarousel from "@/components/Combo/ComboCarousel";
import ComboExploreOptionsSection from "@/components/Combo/ComboExploreOptionsSection";
import ComboFAQ from "@/components/Combo/ComboFAQ";
import ContactSection from "@/components/shared/ContactSection";
import ComboPackageSection from "@/components/Combo/ComboPackageSection";
import ComboCarouselLine from "@/components/Combo/ComboCarouselLine";

export const metadata = {
  title: "Combo Packages",
  description:
    "Save more with our combo packages combining window tinting, PPF, ceramic coating, and wrapping services. Best value automotive protection bundles.",
};

export default function ComboPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <ComboHero />
      {/* <ComboCarousel /> */}
      <ComboCarouselLine />
      <ComboPackageSection />
      <ComboExploreOptionsSection />
      <ComboFAQ />
      <ContactSection />
    </main>
  );
}
