"use client";

import { cn } from "@/shared/lib/cn";
import type { BlogCategory } from "@/entities/blog/model";

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

export default function BlogCategoryFilter({
  categories,
  selectedSlug,
  onSelect,
}: BlogCategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex gap-6 border-b border-foreground/10">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "pb-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
          !selectedSlug
            ? "border-pink-500 text-foreground font-medium"
            : "border-transparent text-foreground/50 hover:text-foreground"
        )}
      >
        전체
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.slug)}
          className={cn(
            "pb-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors",
            selectedSlug === cat.slug
              ? "border-pink-500 text-foreground font-medium"
              : "border-transparent text-foreground/50 hover:text-foreground"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
