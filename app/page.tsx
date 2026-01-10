import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import WhyWeShineSection from "@/components/why-we-shine-section"
import PartnersSection from "@/components/partners-section"
import MapSection from "@/components/map-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import PaymentSection from "@/components/payment-section"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <FeaturesSection />
      <WhyWeShineSection />
      <PartnersSection />
      <MapSection />
      <FAQSection />
      <ContactSection />
      <PaymentSection />
      <Footer />
      <MobileBottomNav />
    </main>
  )
}
