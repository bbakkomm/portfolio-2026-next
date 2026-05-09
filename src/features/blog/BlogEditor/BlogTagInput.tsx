"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { FormItem, FormLabel } from "@/shared/ui/form";
import { cn } from "@/shared/lib/cn";
import type { BlogTag } from "@/entities/blog/model";
import type { BlogSchema } from "@/features/blog/schema/blog-schema";

interface BlogTagInputProps {
  allTags: BlogTag[];
}

export default function BlogTagInput({ allTags }: BlogTagInputProps) {
  const { watch, setValue } = useFormContext<BlogSchema>();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tagIds = watch("tagIds") ?? [];
  const newTags = watch("newTags") ?? [];

  const selectedExistingTags = allTags.filter((t) => tagIds.includes(t.id));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();
    addTag(inputValue.trim());
  };

  const addTag = (name: string) => {
    if (!name) return;

    const existing = allTags.find(
      (t) => t.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      if (!tagIds.includes(existing.id)) {
        setValue("tagIds", [...tagIds, existing.id]);
      }
    } else {
      const normalized = name.toLowerCase();
      if (!newTags.includes(normalized)) {
        setValue("newTags", [...newTags, normalized]);
      }
    }
    setInputValue("");
  };

  const removeExistingTag = (id: number) => {
    setValue("tagIds", tagIds.filter((tid) => tid !== id));
  };

  const removeNewTag = (name: string) => {
    setValue("newTags", newTags.filter((t) => t !== name));
  };

  const suggestions = inputValue
    ? allTags.filter(
        (t) =>
          t.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tagIds.includes(t.id)
      )
    : [];

  return (
    <FormItem className="w-full">
      <FormLabel>태그</FormLabel>

      {/* 선택된 태그 chips */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {selectedExistingTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeExistingTag(tag.id)}
              className="hover:text-white"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        {newTags.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          >
            {name} <span className="opacity-60 text-[10px]">신규</span>
            <button
              type="button"
              onClick={() => removeNewTag(name)}
              className="hover:text-white"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>

      {/* 입력 */}
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그 입력 후 Enter (없으면 신규 태그로 등록)"
          className="text-sm"
        />

        {/* 자동완성 드롭다운 */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 z-20 mt-1 bg-[#1e1e1e] border border-white/10 rounded-md shadow-lg overflow-hidden">
            {suggestions.slice(0, 8).map((tag) => (
              <li key={tag.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                  )}
                  onClick={() => {
                    setValue("tagIds", [...tagIds, tag.id]);
                    setInputValue("");
                    inputRef.current?.focus();
                  }}
                >
                  {tag.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-foreground/50 mt-1">
        기존 태그는 목록에서 선택, 없는 태그는 입력 후 Enter로 새로 추가
      </p>
    </FormItem>
  );
}
