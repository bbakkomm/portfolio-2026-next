"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import imgUrlMapper from "@/shared/lib/img-url";
import type { ProjectMeta } from "@/entities/project/model";
import { ROUTES } from "@/shared/config/routes";
import { Skeleton } from "@/shared/ui/skeleton";

const PAGE_SIZE = 6;

function getDurationDays(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function ProjectCard({ project, index }: { project: ProjectMeta; index: number }) {
  const duration = getDurationDays(project.start_date, project.end_date);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link
        href={`${ROUTES.WORK}/${project.id}`}
        className="group relative flex flex-col gap-3 transition-all duration-500 hover:opacity-95"
      >
        <div className="flex flex-col justify-center gap-2 mb-10">
          {project.thumbnail && (
            <div className="lg:block hidden relative aspect-5/3 w-full overflow-hidden rounded-sm mb-3">
              <Image
                src={imgUrlMapper({ thumbnail: project.thumbnail })}
                alt={`${project.title} 프로젝트 썸네일`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          )}
          <h3 className="text-xl group-hover:underline flex items-center gap-5 font-semibold tracking-tight text-zinc-50 leading-tight line-clamp-2">
            <span>{project.title}</span>
          </h3>
          <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1">
            <span className="whitespace-nowrap">{project.project_member}</span>
            <span className="opacity-40">•</span>
            <span className="text-zinc-500">{duration}일</span>
          </div>
          <p className="mb-3 text-sm max-w-[800px] mt-2 text-zinc-300 leading-relaxed opacity-80 line-clamp-2 break-keep">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.li>
  );
}

export default function ProjectListView({ projects }: { projects: ProjectMeta[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 사용 가능한 스택 목록 추출 (hashtag 기반)
  const availableStacks = useMemo(() => {
    const stackSet = new Set<string>();
    projects.forEach((p) => p.hashtag?.forEach((h) => stackSet.add(h)));
    return Array.from(stackSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const hashtags = project.hashtag?.map((h) => h.toLowerCase()) ?? [];

      if (selectedStack && !hashtags.includes(selectedStack.toLowerCase())) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = project.title?.toLowerCase().includes(q);
        const inDesc = project.description?.toLowerCase().includes(q);
        const inHashtag = hashtags.some((h) => h.includes(q));
        if (!inTitle && !inDesc && !inHashtag) return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedStack]);

  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
    setIsLoadingMore(false);
  }, [searchQuery, selectedStack]);

  const handleScroll = useCallback(() => {
    if (displayCount >= filteredProjects.length) return;
    if (isLoadingMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop <= 0) return;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      setIsLoadingMore(true);
    }
  }, [displayCount, filteredProjects.length, isLoadingMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isLoadingMore) return;
    const timer = setTimeout(() => {
      setDisplayCount((c) => Math.min(c + PAGE_SIZE, filteredProjects.length));
      setIsLoadingMore(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoadingMore, filteredProjects.length]);

  return (
    <div className="relative bg-[#171717] overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url(/img/heros/rt_03.webp)" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#171717]/70 to-[#171717]" />
      </div>

      <div className="relative flex flex-col grid-layout pt-50 md:pt-60 z-5">
        {/* 헤더 */}
        <section className="grid grid-cols-1 pb-8 items-start">
          <h1 className="text-zinc-50 text-5xl lg:text-6xl leading-14 mb-10 font-bold">Projects</h1>
          <div className="text-zinc-400 leading-relaxed mb-12 flex flex-col items-start">
            <p className="text-base max-w-[620px] mt-5 mb-2">
              React·Next 기반의 최신 프로젝트부터 초기 퍼블리싱 작업까지 포함한 전체 작업
              목록입니다. 비공개 또는 협업 정책에 따라 공유가 제한된 작업은 게시하지 않습니다.
            </p>
          </div>
        </section>

        <section className="w-full mt-10 pt-8">
          <div className="mb-5">
            <div className="mb-6">
              <h2 className="text-zinc-50 text-3xl flex gap-2 items-center font-semibold">
                All Projects
              </h2>
              <p className="text-base leading-relaxed text-zinc-400">
                전체 프로젝트 목록입니다.
              </p>
            </div>

            {/* 검색창 */}
            <div className="relative max-w-sm">
              <label htmlFor="project-search" className="sr-only">
                프로젝트 검색
              </label>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500 pointer-events-none"
              />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="프로젝트, 스택, 태그 검색..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus-visible:border-pink-400 focus-visible:ring-2 focus-visible:ring-pink-400/40 transition-colors [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              )}
            </div>

            {/* 스택 필터 */}
            {availableStacks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {availableStacks.map((stack) => {
                  const isActive = selectedStack?.toLowerCase() === stack.toLowerCase();
                  return (
                    <button
                      key={stack}
                      onClick={() => setSelectedStack(isActive ? null : stack)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors",
                        isActive
                          ? "border-pink-400 text-pink-400 bg-pink-400/10"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                      )}
                    >
                      {stack}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <ul className="py-4">
            <div className="grid lg:grid-cols-3 gap-5 lg:gap-10">
              {filteredProjects.length > 0 ? (
                <>
                  {filteredProjects.slice(0, displayCount).map((project, idx) => (
                    <ProjectCard key={`${project.id}:${idx}`} project={project} index={idx} />
                  ))}
                  {isLoadingMore && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <li key={`sk:${i}`}>
                          <Skeleton className="aspect-5/3 w-full rounded-sm mb-3" />
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </li>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <li className="col-span-full text-center text-zinc-500 py-10">
                  {searchQuery || selectedStack ? "검색 결과가 없습니다." : "등록된 프로젝트가 없습니다."}
                </li>
              )}
            </div>
          </ul>
        </section>
      </div>
    </div>
  );
}
