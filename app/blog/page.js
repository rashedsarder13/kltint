import Navbar from "@/components/Navbar/Navbar";
import BlogHero from "@/components/Blog/BlogHero";
import BlogPost from "@/components/Blog/BlogPost";
import GalleryContact from "@/components/Gallery/GalleryContact";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Blog",
  description: "Latest news and insights on automotive protection services",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogPost />
      <GalleryContact />
    </>
  );
}
