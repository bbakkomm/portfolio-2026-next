import type { Metadata } from "next";
import BlogListView from "@/features/blog/BlogListView";
import {
  getAllPublishedBlogPosts,
  getPublishedTags,
  getPublishedCategories,
} from "@/features/blog/api/blog-queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "개발 경험과 기술적 인사이트를 담은 블로그입니다.",
  openGraph: {
    title: "Blog | Psh' Portfolio",
    description: "개발 경험과 기술적 인사이트를 담은 블로그입니다.",
    images: [{ url: "/img/meta.jpg", width: 1200, height: 630, alt: "Blog" }],
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, tags, categories] = await Promise.all([
    getAllPublishedBlogPosts(),
    getPublishedTags(),
    getPublishedCategories(),
  ]);

  return <BlogListView posts={posts} tags={tags} categories={categories} />;
}
