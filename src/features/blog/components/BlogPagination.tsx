"use client";

import { cn } from "@/shared/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1 justify-center mt-12">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-1.5 rounded hover:bg-foreground/10 transition-colors",
          currentPage === 1 && "pointer-events-none opacity-30"
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={cn(
            "w-8 h-8 flex items-center justify-center text-sm rounded transition-colors",
            page === currentPage
              ? "bg-foreground/15 text-foreground font-medium"
              : "text-foreground/50 hover:text-foreground hover:bg-foreground/10"
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-1.5 rounded hover:bg-foreground/10 transition-colors",
          currentPage === totalPages && "pointer-events-none opacity-30"
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
