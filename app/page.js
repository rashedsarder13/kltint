import Banner from "@/components/Home/Banner";
import About from "@/components/Home/About";
import WhyWeShine from "@/components/Home/WhyWeShine";
import ExclusivePartner from "@/components/Home/ExclusivePartner";
import NearestArea from "@/components/Home/NearestArea";
import Accordion from "@/components/Home/Accordion";
import PaymentExperience from "@/components/Home/PaymentExperience";
import NeedHelp from "@/components/Home/NeedHelp";

export const metadata = {
  title: {
    absolute: "KL Tint Studio",
  },
  description:
    "Welcome to KL Tint Studio - Malaysia's premier automotive protection service. Professional window tinting, PPF, ceramic coating, and car wrapping.",
};

export default function Home() {
  return (
    <main>
      <Banner />
      <About />
      <WhyWeShine />
      <ExclusivePartner />
      <NearestArea />
      <Accordion />
      <NeedHelp />
      <PaymentExperience />
    </main>
  );
}
