"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import imgUrlMapper from "@/shared/lib/img-url";
import type { ProjectMeta } from "@/entities/project/model";
import { ROUTES } from "@/shared/config/routes";

function getDurationDays(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

export default function CarouselOrientation({ projects }: { projects: ProjectMeta[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi, isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Counter — mobile: badge, PC: plain text */}
      <div className="absolute top-2 right-2 z-10 lg:top-0 lg:right-0 font-montserrat text-zinc-50 bg-black/60 lg:bg-transparent px-2.5 py-0.5 lg:px-0 lg:py-0 rounded-full lg:rounded-none text-xs lg:text-base">
        {selectedIndex + 1} / {projects.length}
      </div>

      {/* PC-only: prev/next absolute buttons outside the viewport */}
      <button
        onClick={scrollPrev}
        className={cn(
          "hidden lg:block z-20 p-2 rounded-full absolute top-1/2 -translate-y-1/2 -left-14",
          !canScrollPrev && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronLeft className="size-10 text-zinc-50/80" strokeWidth={1} />
      </button>
      <button
        onClick={scrollNext}
        className={cn(
          "hidden lg:block z-20 p-2 rounded-full absolute top-1/2 -translate-y-1/2 -right-14",
          !canScrollNext && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronRight className="size-10 text-zinc-50/80" strokeWidth={1} />
      </button>

      {/* Embla viewport */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, idx) => {
            const isActive = idx === selectedIndex;
            const duration = getDurationDays(project.start_date, project.end_date);

            return (
              <div key={project.id} className="flex-none w-full">
                <Link
                  href={`${ROUTES.WORK}/${project.id}`}
                  className={cn(
                    "group cursor-pointer grid md:grid-cols-[2fr_2fr] md:items-center gap-10 w-full rounded-xl transition-all duration-500",
                    isActive ? "opacity-100 grayscale-0" : "opacity-50 grayscale"
                  )}
                >
                  <div className="lg:aspect-8/5 aspect-9/8 rounded-lg relative overflow-hidden transition-all">
                    {project.thumbnail && (
                      <Image
                        src={imgUrlMapper({ thumbnail: project.thumbnail })}
                        alt={`${project.title} 프로젝트 썸네일`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-2 transition-all",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <h3 className="text-3xl font-semibold tracking-tight text-zinc-50">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 my-2 leading-relaxed line-clamp-2 max-w-100 break-keep">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-[0.85rem] text-zinc-400 mt-3">
                      <span>{project.project_member}</span>
                      <span className="opacity-40">•</span>
                      <span>{duration}일</span>
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                      View Project
                      <ChevronRight className="size-4" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
