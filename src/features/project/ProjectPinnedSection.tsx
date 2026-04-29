import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import imgUrlMapper from "@/shared/lib/img-url";
import type { ProjectMeta } from "@/entities/project/model";
import { ROUTES } from "@/shared/config/routes";

function getDurationDays(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export default function ProjectPinnedSection({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="grid lg:grid-cols-[2fr_5fr] mt-10">
      <div className="pr-15">
        <aside className="lg:sticky lg:top-40 flex flex-col items-start">
          <div className="leading-relaxed max-w-[360px] mb-6 items-start flex flex-col">
            <h2 className="pb-1 text-zinc-200 text-2xl font-semibold">Pinned Project</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              React·Next.js 기반으로 진행한 주요 프로젝트입니다. 최신 스택을
              사용하며 기술적 완성도를 높이는 데 집중했습니다.
            </p>
          </div>
        </aside>
      </div>

      <section className="flex flex-col gap-10 lg:pt-0 pt-5">
        {projects.map((project) => {
          const duration = getDurationDays(project.start_date, project.end_date);

          return (
            <Link
              key={project.id}
              href={`${ROUTES.WORK}/${project.id}`}
              className={cn(
                "group grid grid-cols-[1fr_2fr] lg:grid-cols-[2fr_2fr] gap-10 w-full rounded-xl transition-all duration-500"
              )}
            >
              <div className="lg:aspect-8/5 rounded-lg relative overflow-hidden transition-all">
                {project.thumbnail && (
                  <Image
                    src={imgUrlMapper({ thumbnail: project.thumbnail })}
                    alt={`${project.title} 프로젝트 썸네일`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 md:py-5">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 my-2 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="hidden lg:flex items-center gap-4 text-[0.85rem] text-zinc-400 mt-3">
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
          );
        })}
      </section>
    </section>
  );
}
