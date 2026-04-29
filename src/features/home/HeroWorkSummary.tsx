import Link from "next/link";
import type { ProjectMeta } from "@/entities/project/model";
import { ROUTES } from "@/shared/config/routes";

export default function HeroWorkSummary({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="h-full rounded-lg flex flex-col gap-1 md:w-1/2 md:max-w-none">
      <div className="text-sm opacity-50 mb-1 flex gap-2 items-center pb-2">
        <span>Projects</span>
      </div>

      <div className="text-xs flex flex-col gap-3 mt-1 pl-4 border-l border-zinc-700">
        {projects.slice(0, 3).map((p, idx) => (
          <Link
            key={`${p.id}:${idx}`}
            href={`${ROUTES.WORK}/${p.id}`}
            className="hover:underline flex flex-col gap-1"
          >
            <p className="inline-flex items-center">
              <span className="line-clamp-1 text-sm md:text-xs max-w-[calc(100%-20px)] text-zinc-200">
                {p.title}
              </span>
            </p>
            <p className="line-clamp-1 text-zinc-400 text-xs max-w-[70%] md:max-w-none">
              {p.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
