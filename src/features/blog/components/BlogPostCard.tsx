import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { BlogPostListItem, BlogTag, BlogCategory } from "@/entities/blog/model";

export default function BlogPostCard({ post }: { post: BlogPostListItem }) {
  const tags: BlogTag[] = (post.blog_post_tag ?? []).map(
    (r) => (r as { blog_tag: BlogTag }).blog_tag
  );
  const category = post.blog_category as BlogCategory | undefined;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-zinc-900 border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/30 transition-colors"
    >
      {/* 썸네일 */}
      <div className="relative aspect-video bg-foreground/5 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/20 text-xs">
            No image
          </div>
        )}
      </div>

      {/* 내용 */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {category && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 w-fit">
            {category.name}
          </span>
        )}
        <h2 className="text-base font-semibold tracking-tight text-zinc-50 leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-zinc-400 opacity-80 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto pt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs px-1.5 py-0.5 rounded-full bg-foreground/5 text-foreground/50 border border-foreground/10"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="text-xs text-zinc-500"
          >
            {format(new Date(post.published_at), "yyyy. MM. dd")}
          </time>
        )}
      </div>
    </Link>
  );
}
