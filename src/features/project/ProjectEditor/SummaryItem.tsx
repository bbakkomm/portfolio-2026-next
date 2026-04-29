"use client";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { X, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { projectSchema } from "../schema/project-schema";
import { z } from "zod";
import { useState, useRef } from "react";

export default function SummaryItem({
  idx,
  onDelete,
  error,
}: {
  idx: number;
  onDelete: (idx: number) => void;
  error: boolean;
}) {
  const { register } = useFormContext<z.infer<typeof projectSchema>>();
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState(3);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    ref,
    onChange: rhfOnChange,
    ...rest
  } = register(`surmmry.${idx}.contents`);

  const handleToggleExpand = () => {
    const content = textareaRef.current!.value;
    const lineCount = (content.match(/\n/g) || []).length + 1;
    setRows(Math.max(lineCount, 3));
    setExpanded(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && expanded) {
      setRows((prev) => prev + 1);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] p-4 rounded-lg border divide-foreground/50 group border-foreground/50",
        error && "border-destructive"
      )}
    >
      <div className="flex flex-col justify-between">
        <span className="text-2xl mr-5">
          {(idx + 1).toString().padStart(2, "0")}
        </span>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onDelete(idx)}
          className="size-8 opacity-0 group-hover:opacity-100 border rounded-sm"
        >
          <X />
        </Button>
      </div>

      <div className="divide-y divide-foreground/40">
        <div className="pb-2">
          <input
            type="text"
            className="w-full placeholder:text-foreground/60"
            placeholder="항목의 제목을 입력하세요"
            {...register(`surmmry.${idx}.title`)}
          />
        </div>

        <div className="pt-3 flex flex-col gap-2">
          <textarea
            className="w-full placeholder:text-foreground/60 resize-y p-4 bg-muted/30 leading-relaxed text-sm"
            placeholder="해당 항목 내용을 입력해주세요"
            rows={rows}
            onChange={rhfOnChange}
            onKeyDown={handleKeyDown}
            ref={(e) => {
              ref(e);
              textareaRef.current = e;
            }}
            {...rest}
          />

          {!expanded && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleToggleExpand}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="size-3" /> 더보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
