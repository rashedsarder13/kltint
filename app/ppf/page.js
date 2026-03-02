import PPFHero from "@/components/PPF/PPFHero";
import PPFCarousel from "@/components/PPF/PPFCarousel";
import PPFPackageSection from "@/components/PPF/PPFPackageSection";
import PPFOptions from "@/components/PPF/PPFOptions";
import PPFFAQSection from "@/components/PPF/PPFFAQSection";
import ContactSection from "@/components/shared/ContactSection";
import PPFCarouselLine from "@/components/PPF/PPFCarouselLine";

export const metadata = {
  title: "Expert PPF Installation",
  description:
    "Premium paint protection film services to shield your vehicle from scratches, chips, and damage. Self-healing PPF technology for lasting protection.",
};

export default function PPFPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <PPFHero />
      {/* <PPFCarousel /> */}
      <PPFCarouselLine />
      <PPFPackageSection />
      <PPFOptions />
      <PPFFAQSection />
      <ContactSection />
    </main>
  );
}
