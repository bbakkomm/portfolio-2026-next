"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/shared/lib/cn";
import { useRef } from "react";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useUploader } from "@/features/project/hooks/useUploader";
import Image from "next/image";
import imgUrlMapper from "@/shared/lib/img-url";

interface ProjectThumbnailUploaderProps {
  projectKey: string;
}

const ProjectThumbnailUploader: React.FC<ProjectThumbnailUploaderProps> = ({
  projectKey,
}) => {
  const { watch, setValue, trigger, formState } =
    useFormContext<z.infer<typeof projectSchema>>();

  const ref = useRef<HTMLInputElement>(null);
  const { handler } = useUploader(projectKey);

  const fileFiler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handler(file);
    setValue("thumbnail", url, { shouldValidate: true });
  };

  const thumbnailValue = watch("thumbnail");
  const thumbnailUrl = thumbnailValue
    ? /^https?:\/\//.test(thumbnailValue)
      ? thumbnailValue
      : imgUrlMapper({ thumbnail: thumbnailValue })
    : null;

  return (
    <>
      <FormItem
        className={cn(
          "w-full p-5 border border-foreground/20 rounded-lg",
          !!formState.errors.thumbnail?.message && "border-destructive"
        )}
      >
        <FormLabel>메인 이미지</FormLabel>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="input-file"
          onChange={(e) => fileFiler(e)}
          ref={ref}
        />
        <div
          className={cn(
            "bg-foreground/5 min-h-[200px] rounded-xl hover:border-indigo-400 overflow-hidden cursor-pointer flex items-center justify-center aspect-video"
          )}
          onClick={() => ref.current?.click()}
        >
          {thumbnailUrl ? (
            <div className="relative w-full h-full min-h-[200px]">
              <Image
                src={thumbnailUrl}
                alt="업로드한 메인 이미지 미리보기"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span className="opacity-60">이미지 파일을 선택해주세요</span>
          )}
        </div>

        <div className="flex flex-col justify-between">
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
        </div>
        {!!formState.errors.thumbnail?.message && (
          <FormMessage>{formState.errors.thumbnail?.message}</FormMessage>
        )}
      </FormItem>
    </>
  );
};

export default ProjectThumbnailUploader;
