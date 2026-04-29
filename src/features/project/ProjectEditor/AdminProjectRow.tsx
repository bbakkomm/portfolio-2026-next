"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { ProjectMeta } from "@/entities/project/model";

export default function AdminProjectRow({ project }: { project: ProjectMeta }) {
  const router = useRouter();
  const isPinned = !!(project as any).project_pin?.length;
  const [pinned, setPinned] = useState(isPinned);
  const [loading, setLoading] = useState(false);

  const togglePin = async () => {
    if (loading) return;
    setLoading(true);
    const supabase = createClient();
    if (!pinned) {
      await supabase.from("project_pin").insert({ fk_project_id: project.id });
    } else {
      await supabase.from("project_pin").delete().eq("fk_project_id", project.id);
    }
    setPinned((v) => !v);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between border border-border rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{project.title}</span>
        <span className="text-sm text-foreground/50">{project.company}</span>
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={togglePin}
          disabled={loading}
          className="p-1.5 rounded-md text-zinc-400 hover:text-yellow-400 transition-colors disabled:opacity-50"
          aria-label={pinned ? "핀 해제" : "핀 추가"}
        >
          <Star
            size={16}
            className={pinned ? "fill-yellow-400 text-yellow-400" : ""}
          />
        </button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/project/${project.id}/edit`}>편집</Link>
        </Button>
      </div>
    </div>
  );
}
