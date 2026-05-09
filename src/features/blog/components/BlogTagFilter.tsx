"use client";

import { cn } from "@/shared/lib/cn";
import type { BlogTag } from "@/entities/blog/model";

interface BlogTagFilterProps {
  tags: BlogTag[];
  selectedTagId: number | null;
  onSelect: (tagId: number | null) => void;
}

export default function BlogTagFilter({
  tags,
  selectedTagId,
  onSelect,
}: BlogTagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "px-3 py-1 text-xs rounded-full border transition-colors",
          !selectedTagId
            ? "bg-foreground/10 border-foreground/30 text-foreground"
            : "border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40"
        )}
      >
        전체
      </button>
      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => onSelect(selectedTagId === tag.id ? null : tag.id)}
          className={cn(
            "px-3 py-1 text-xs rounded-full border transition-colors",
            selectedTagId === tag.id
              ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
              : "border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40"
          )}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
