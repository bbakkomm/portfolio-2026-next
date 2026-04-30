"use client";

import dynamic from "next/dynamic";
import LazyImage from "@/shared/components/lazy-image";
import Link from "next/link";
import { Link2, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import imgUrlMapper from "@/shared/lib/img-url";

import type { ProjectDetailFull, STACK_TYPES } from "@/entities/project/model";
import StackIconMapper from "@/shared/components/stack-icon-mapper";
const DynamicProjectContent = dynamic(
  () => import("./DynamicProjectContent"),
  { ssr: false }
);
import { ROUTES } from "@/shared/config/routes";
import useStore from "@/shared/store/useStore";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/features/project/api/project-actions";
import { Button } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/shared/ui/alert-dialog";

// ── Utils ──────────────────────────────────────────────────────

function getDurationDays(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

function groupStacksByType(
  stacks: Array<{ project_stack: { type: STACK_TYPES; stack: string } }>
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  stacks.forEach(({ project_stack }) => {
    const { type, stack } = project_stack;
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(stack);
  });
  return grouped;
}

// ── Sub Components ─────────────────────────────────────────────

function ProjectDescription({ description }: { description: string }) {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <p className="text-sm text-zinc-400 mt-3">프로젝트 설명</p>
      <p className="text-sm text-zinc-300 leading-relaxed mb-10 max-w-[750px] break-keep">
        {description}
      </p>
    </div>
  );
}

function ProjectMeta({
  startDate,
  endDate,
  member,
  url,
}: {
  startDate: string | null;
  endDate: string | null;
  member: string;
  url: string;
}) {
  const duration = getDurationDays(startDate, endDate);

  return (
    <article className="flex flex-col gap-6 my-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-400">작업기간 &amp; 유지보수</p>
        <p className="text-sm text-zinc-100">{duration}일</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-400">투입인원</p>
        <span className="text-sm text-zinc-100">{member}</span>
      </div>
      {url && (
        <div className="flex flex-col gap-2 items-start">
          <p className="text-sm text-zinc-400 flex gap-2 items-center">Deploy URL</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-300 hover:text-pink-400"
          >
            <Link2 size={16} className="rotate-135" />
            <span className="line-clamp-1 max-w-[400px] text-sm underline">링크 바로가기</span>
          </a>
        </div>
      )}
    </article>
  );
}

function ProjectThumbnail({ title, thumbnail }: { title: string; thumbnail: string }) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-5/3 rounded-2xl overflow-hidden">
        {thumbnail && (
          <LazyImage
            src={imgUrlMapper({ thumbnail })}
            alt={`${title} 프로젝트 썸네일`}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
          />
        )}
      </div>
      <p className="ml-auto text-xs text-zinc-300 mt-2">Mock up picture</p>
    </div>
  );
}

function TechStack({
  stacks,
}: {
  stacks: Array<{ project_stack: { type: STACK_TYPES; stack: string } }>;
}) {
  const grouped = groupStacksByType(stacks);
  const allStacks = Object.values(grouped).flat();

  return (
    <article className="space-y-6 pb-15">
      <h3 className="text-sm text-zinc-400">사용 기술</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <div className={cn("gap-2 w-full")}>
          <div className="max-w-[750px] flex flex-wrap gap-2">
            {allStacks.map((stack, idx) => (
              <div
                key={idx}
                className="flex items-center p-2 bg-zinc-800/30 gap-3 rounded-lg hover:bg-zinc-50/10 transition-colors"
              >
                <StackIconMapper stackName={stack} className="size-3.5" />
                <span className="text-xs text-zinc-400">{stack}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}


// ── Main Component ─────────────────────────────────────────────

export default function ProjectDetailView({ project }: { project: ProjectDetailFull }) {
  const authentication = useStore((s: { authentication: boolean }) => s.authentication);
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteProjectAction(project.id);
      router.push(ROUTES.WORK);
    });
  };

  return (
    <section className="pt-30 grid-layout flex-col md:mt-auto pb-10 grid lg:grid-cols-[220px_1fr] lg:gap-15">
      <div>
        <div className="lg:sticky top-30">
          <Link
            href={ROUTES.WORK}
            className="flex items-center text-sm gap-2 hover:text-indigo-300 text-zinc-400"
          >
            <ChevronLeft className="w-4 h-4" />
            뒤로가기
          </Link>
          <h1 className="text-3xl md:text-3xl font-semibold text-white tracking-tight leading-relaxed pt-15 break-keep">
            {project.title}
          </h1>
          <ProjectDescription description={project.description} />
          <ProjectMeta
            startDate={project.start_date}
            endDate={project.end_date}
            member={project.project_member}
            url={project.projectUrl ?? (project as any).project_url ?? ""}
          />
          {authentication && (
            <div className="flex gap-2 mt-6">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/project/${project.id}/edit`}>수정</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isDeletePending}>
                    {isDeletePending ? <Loader2 className="size-3 animate-spin" /> : "삭제"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>프로젝트를 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                      삭제된 프로젝트는 복구할 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 lg:pt-20">
        <div className="flex flex-col gap-6 md:gap-12 mt-3">
          <ProjectThumbnail title={project.title} thumbnail={project.thumbnail} />
          {project.project_meta_stack?.length > 0 && (
            <TechStack stacks={project.project_meta_stack} />
          )}
        </div>
        {project.project_contents?.[0]?.contents && project.project_contents[0].contents.length > 10 && (
          <DynamicProjectContent contents={project.project_contents[0].contents} />
        )}
      </div>
    </section>
  );
}
