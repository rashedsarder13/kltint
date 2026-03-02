import ContactDetails from "@/components/Contact/ContactDetails";
import ContactHero from "@/components/Contact/ContactHero";
import GalleryContact from "@/components/Gallery/GalleryContact";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with KL Tint Studio for all your automotive protection needs",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <GalleryContact />
      {/* Add more contact components here (contact form, map, etc.) */}
    </>
  );
}
