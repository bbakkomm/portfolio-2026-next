"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { BlogPostListItem, BlogTag, BlogCategory } from "@/entities/blog/model";
import BlogPostCard from "./components/BlogPostCard";
import BlogTagFilter from "./components/BlogTagFilter";
import BlogCategoryFilter from "./components/BlogCategoryFilter";
import BlogPagination from "./components/BlogPagination";
import PageBackdrop from "@/shared/components/page-backdrop";

const PER_PAGE = 12;

interface BlogListViewProps {
  posts: BlogPostListItem[];
  tags: BlogTag[];
  categories: BlogCategory[];
}

export default function BlogListView({ posts, tags, categories }: BlogListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategorySlug) {
        const cat = post.blog_category as BlogCategory | undefined;
        if (cat?.slug !== selectedCategorySlug) return false;
      }

      if (selectedTagId) {
        const tagIds = (post.blog_post_tag ?? []).map(
          (r) => (r as { blog_tag: BlogTag }).blog_tag.id
        );
        if (!tagIds.includes(selectedTagId)) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title.toLowerCase().includes(q);
        const inExcerpt = (post.excerpt ?? "").toLowerCase().includes(q);
        if (!inTitle && !inExcerpt) return false;
      }

      return true;
    });
  }, [posts, selectedCategorySlug, selectedTagId, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategorySlug(slug);
    setCurrentPage(1);
  };

  const handleTagSelect = (tagId: number | null) => {
    setSelectedTagId(tagId);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="relative bg-[#171717] overflow-clip min-h-screen">
      <PageBackdrop imageSrc="/img/heros/rt_001_11zon.webp" />

      <div className="relative flex flex-col grid-layout pt-50 md:pt-60 z-5 pb-20">
        {/* 헤더 */}
        <section className="grid grid-cols-1 pb-8 items-start">
          <h1 className="text-zinc-50 text-5xl lg:text-6xl leading-14 mb-5 font-bold">Blog</h1>
          <div className="text-zinc-400 leading-relaxed flex flex-col items-start">
            <p className="text-base max-w-[620px] mt-0 lg:mt-5 mb-2">
              개발하면서 배운 것들, 문제를 풀어낸 과정, 그리고 생각들을 기록합니다.
            </p>
          </div>
        </section>

        {/* 필터 영역 */}
        <div className="flex flex-col gap-3 mb-8 mt-10">
          <BlogCategoryFilter
            categories={categories}
            selectedSlug={selectedCategorySlug}
            onSelect={handleCategorySelect}
          />

          <div className="relative w-full max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="제목 또는 요약 검색"
              className="w-full pl-9 pr-8 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus-visible:border-pink-400 focus-visible:ring-2 focus-visible:ring-pink-400/40 transition-colors [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="검색어 지우기"
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <BlogTagFilter
            tags={tags}
            selectedTagId={selectedTagId}
            onSelect={handleTagSelect}
          />
        </div>

        {/* 포스트 목록 */}
        {paginated.length === 0 ? (
          <p className="text-sm text-foreground/50 py-20 text-center">
            {searchQuery || selectedTagId || selectedCategorySlug
              ? "검색 결과가 없습니다."
              : "등록된 글이 없습니다."}
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((post) => (
              <li key={post.id}>
                <BlogPostCard post={post} />
              </li>
            ))}
          </ul>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
