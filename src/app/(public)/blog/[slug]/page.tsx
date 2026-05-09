import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug } from "@/features/blog/api/blog-queries";
import type { BlogTag, BlogCategory } from "@/entities/blog/model";
import { format } from "date-fns";
import DynamicBlogContent from "@/features/blog/DynamicBlogContent";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Blog" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";

  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      url: `${siteUrl}/blog/${slug}`,
      images: post.thumbnail
        ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }]
        : [],
      type: "article",
      ...(post.published_at && { publishedTime: post.published_at }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? post.title,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";

  const tags: BlogTag[] = (post.blog_post_tag ?? []).map(
    (r) => (r as { blog_tag: BlogTag }).blog_tag
  );
  const category = post.blog_category as BlogCategory | undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.title,
    url: `${siteUrl}/blog/${slug}`,
    ...(post.thumbnail && { image: post.thumbnail }),
    ...(post.published_at && { datePublished: post.published_at }),
    ...(post.updated_at && { dateModified: post.updated_at }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="grid-layout pt-30 pb-20">
        <Link
          href={ROUTES.BLOG}
          className="flex items-center text-sm gap-2 hover:text-indigo-300 text-zinc-400 mb-10"
        >
          <ChevronLeft className="w-4 h-4" />
          뒤로가기
        </Link>

        {/* 헤더 */}
        <header className="mb-10">
          {category && (
            <div className="mb-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                {category.name}
              </span>
            </div>
          )}

          <h1 className="text-3xl font-semibold leading-snug mb-3">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-sm text-foreground/50 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}

          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-xs text-foreground/30"
            >
              {format(new Date(post.published_at), "yyyy. MM. dd")}
            </time>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/50 border border-foreground/10"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 본문 */}
        <DynamicBlogContent contents={post.contents} />
      </article>
    </>
  );
}
