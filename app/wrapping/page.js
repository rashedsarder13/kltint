import WrappingHero from "@/components/Wrapping/WrappingHero";
import WrappingCarousel from "@/components/Wrapping/WrappingCarousel";
import WrappingPackage from "@/components/Wrapping/WrappingPackage";
import ExploreOptionsSection from "@/components/Wrapping/ExploreOptionsSection";
import WrappingFAQ from "@/components/Wrapping/WrappingFAQ";
import ContactSection from "@/components/shared/ContactSection";
import WrappingOption from "@/components/Wrapping/WrappingOption";
import WrappingCarouselLine from "@/components/Wrapping/WrappingCarouselLine";
import PayInstallmentsSection from "@/components/Wrapping/PayInstallmentsSection";

export const metadata = {
  title: "Matte,Gloss,Satin Wrapping",
  description:
    "Transform your vehicle with professional car wrapping. Custom colors, finishes, and designs. Protection meets style with premium vinyl wraps.",
};

export default function WrappingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <WrappingHero />
      <WrappingCarouselLine />
      {/* <WrappingCarousel /> */}
      <WrappingOption />
      <WrappingPackage />
      <PayInstallmentsSection />
      <ExploreOptionsSection />
      <WrappingFAQ />
      <ContactSection />
    </main>
  );
}
