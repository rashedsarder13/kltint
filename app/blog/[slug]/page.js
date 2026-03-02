import BlogDetailsPage from "@/components/Blog/BlogDetailsPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Convert slug to title format (e.g., "window-tinting-guide" -> "Window Tinting Guide")
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: title,
    description: `Read our article about ${title.toLowerCase()} - Expert insights and tips from KL Tint Studio.`,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  return <BlogDetailsPage slug={slug} />;
}
