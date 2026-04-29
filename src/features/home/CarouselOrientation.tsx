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
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function CarouselOrientation({ projects }: { projects: ProjectMeta[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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

  return (
    <div className="relative lg:flex items-start gap-20">
      {/* Prev Button */}
      <button
        onClick={scrollPrev}
        className={cn(
          "z-20 p-2 rounded-full absolute top-1/2 -translate-y-1/2 -left-5 hover:border-zinc-300/30",
          !canScrollPrev && "opacity-60 pointer-events-none"
        )}
      >
        <ChevronLeft className="size-10 text-zinc-50/80" strokeWidth={1} />
      </button>

      {/* Next Button */}
      <button
        onClick={scrollNext}
        className={cn(
          "z-10 p-2 rounded-full absolute -right-20 top-1/2 -translate-y-1/2 hover:border-zinc-300/90",
          !canScrollNext && "opacity-60 pointer-events-none"
        )}
      >
        <ChevronRight className="size-10 text-zinc-50/80" strokeWidth={1} />
      </button>

      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {projects.map((project, idx) => {
            const isActive = idx === selectedIndex;
            const duration = getDurationDays(project.start_date, project.end_date);

            return (
              <div
                key={project.id}
                className="flex-none w-full"
              >
                <Link
                  href={`${ROUTES.WORK}/${project.id}`}
                  className={cn(
                    "group cursor-pointer grid md:grid-cols-[2fr_2fr] gap-10 w-full rounded-xl transition-all duration-500",
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
                      "flex flex-col gap-2 md:py-15 transition-all",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <h3 className="text-3xl font-semibold tracking-tight text-zinc-50">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 my-2 leading-relaxed line-clamp-2 max-w-[400px] break-keep">
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

      {/* Counter */}
      <div className="absolute top-0 right-0 text-base font-montserrat text-zinc-50">
        {selectedIndex + 1} / {projects.length}
      </div>
    </div>
  );
}
