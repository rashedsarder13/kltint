import CareerHero from "@/components/Career/CareerHero";
import OpenPosition from "@/components/Career/OpenPosition";
import Reward from "@/components/Career/Reward";
import GalleryContact from "@/components/Gallery/GalleryContact";

export const metadata = {
  title: "Careers",
  description:
    "Join our team and grow your career with Malaysia's #1 automotive protection service",
};

export default function CareerPage() {
  return (
    <>
      <CareerHero />
      <Reward />
      <OpenPosition />
      <GalleryContact />
      {/* Add more career components here (job listings, benefits, etc.) */}
    </>
  );
}
