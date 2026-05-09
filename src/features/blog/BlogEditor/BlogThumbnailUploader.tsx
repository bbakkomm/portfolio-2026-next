"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { useRef } from "react";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useUploader } from "@/features/blog/hooks/useUploader";
import Image from "next/image";
import type { BlogSchema } from "@/features/blog/schema/blog-schema";

interface BlogThumbnailUploaderProps {
  blogKey: string;
}

export default function BlogThumbnailUploader({
  blogKey,
}: BlogThumbnailUploaderProps) {
  const { watch, setValue, trigger, formState } =
    useFormContext<BlogSchema>();

  const ref = useRef<HTMLInputElement>(null);
  const { handler } = useUploader(blogKey);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handler(file);
    setValue("thumbnail", url, { shouldValidate: true });
  };

  const thumbnailValue = watch("thumbnail");

  return (
    <FormItem
      className={cn(
        "w-full p-5 border border-foreground/20 rounded-lg",
        !!formState.errors.thumbnail?.message && "border-destructive"
      )}
    >
      <FormLabel>썸네일 이미지</FormLabel>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="blog-thumbnail-input"
        onChange={handleFileChange}
        ref={ref}
      />
      <div
        className={cn(
          "bg-foreground/5 min-h-[200px] rounded-xl hover:border-indigo-400 overflow-hidden cursor-pointer flex items-center justify-center aspect-video"
        )}
        onClick={() => ref.current?.click()}
      >
        {thumbnailValue ? (
          <div className="relative w-full h-full min-h-[200px]">
            <Image
              src={thumbnailValue}
              alt="썸네일 미리보기"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <span className="opacity-60">이미지 파일을 선택해주세요</span>
        )}
      </div>

      <Button
        variant="ghost"
        type="button"
        className="border border-foreground/50 text-xs"
        onClick={() => {
          setValue("thumbnail", "");
          trigger("thumbnail");
        }}
      >
        <Trash2 /> 이미지 삭제
      </Button>

      {!!formState.errors.thumbnail?.message && (
        <FormMessage>{formState.errors.thumbnail.message}</FormMessage>
      )}
    </FormItem>
  );
}
