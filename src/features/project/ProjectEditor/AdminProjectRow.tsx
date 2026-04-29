"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pin, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { togglePinAction, deleteProjectAction } from "@/features/project/api/project-actions";
import type { ProjectMeta } from "@/entities/project/model";

export default function AdminProjectRow({
  project,
  pinOrder,
}: {
  project: ProjectMeta;
  pinOrder?: number | null;
}) {
  const projectPin = (project as any).project_pin;
  const isPinned = Array.isArray(projectPin) ? projectPin.length > 0 : !!projectPin;
  const [pinned, setPinned] = useState(isPinned);
  const [isPinPending, startPinTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleTogglePin = () => {
    startPinTransition(async () => {
      await togglePinAction(project.id, pinned);
      setPinned((v) => !v);
    });
  };

  const handleDelete = () => {
    if (!confirm("삭제하시겠습니까?")) return;
    startDeleteTransition(async () => {
      await deleteProjectAction(project.id);
    });
  };

  return (
    <li className="py-3 px-3 flex items-center justify-between">
      <span
        className="cursor-pointer hover:underline"
      >
        {project.title}
      </span>

      <div className="flex gap-2">
        <Button
          onClick={handleTogglePin}
          className={cn("text-xs", pinned && "border-indigo-300! text-indigo-200")}
          variant="outline"
          size="sm"
          disabled={isPinPending}
        >
          {isPinPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : pinned ? (
            <>
              <Pin className="size-3" /> 고정 중{pinOrder != null ? ` #${pinOrder}` : ""}
            </>
          ) : (
            "고정"
          )}
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/admin/project/${project.id}/edit`}>수정</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeletePending}
          className="text-xs"
        >
          {isDeletePending ? <Loader2 className="size-3 animate-spin" /> : "삭제"}
        </Button>
      </div>
    </li>
  );
}
