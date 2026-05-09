"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, type BlogSchema } from "@/features/blog/schema/blog-schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogThumbnailUploader from "./BlogThumbnailUploader";
import BlogTagInput from "./BlogTagInput";
import type { BlogPostForEdit, BlogCategory } from "@/entities/blog/model";
import type { BlogTag } from "@/entities/blog/model";
import dynamic from "next/dynamic";
import { ROUTES } from "@/shared/config/routes";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { upsertBlogAction } from "@/features/blog/api/upsert-blog-action";

const BlogDynamicEditor = dynamic(() => import("./BlogDynamicEditor"), {
  ssr: false,
});

interface BlogFormProps {
  mode: "add" | "edit";
  postId?: number;
  initialData?: BlogPostForEdit | null;
  allTags: BlogTag[];
  allCategories: BlogCategory[];
}

export default function BlogForm({
  mode,
  postId,
  initialData,
  allTags,
  allCategories,
}: BlogFormProps) {
  const router = useRouter();
  const [imgKey] = useState<string>(() =>
    mode === "edit" && initialData?.img_key ? initialData.img_key : uuidv4()
  );

  const form = useForm({
    defaultValues: {
      slug: initialData?.slug ?? "",
      title: initialData?.title ?? "",
      excerpt: initialData?.excerpt ?? "",
      thumbnail: initialData?.thumbnail ?? "",
      contents: initialData?.contents ?? "",
      status: (initialData?.status ?? "draft") as BlogSchema["status"],
      categoryId: (initialData?.category_id ?? 0) as number,
      tagIds: (initialData?.blog_post_tag ?? []).map((r) => r.blog_tag.id) as number[],
      newTags: [] as string[],
    },
    resolver: zodResolver(blogSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (body: BlogSchema) => {
      await upsertBlogAction({
        mode,
        postId,
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt ?? "",
        thumbnail: body.thumbnail,
        contents: body.contents,
        status: body.status,
        img_key: imgKey,
        categoryId: body.categoryId,
        tagIds: body.tagIds,
        newTags: body.newTags,
      });
    },
    onSuccess: () => {
      toast.success(
        mode === "add" ? "글이 등록되었습니다." : "글이 수정되었습니다."
      );
      form.reset();
      router.push(ROUTES.ADMIN);
    },
    onError: (error: Error) => {
      toast.error(`오류가 발생했습니다: ${error.message}`);
    },
  });

  const slugValue = form.watch("slug");

  return (
    <section className="max-w-[800px] mx-auto mb-20 pt-30 px-4">
      <Link
        href={ROUTES.ADMIN}
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-50 transition-colors mb-6"
      >
        <ChevronLeft size={14} />
        Admin으로
      </Link>
      <h1 className="border-foreground/40 text-4xl pb-3 mb-10">
        {mode === "add" ? "블로그 글 작성" : "블로그 글 수정"}
      </h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-10 items-start"
          onSubmit={form.handleSubmit(
            (data) => mutate(data),
            () => window.scrollTo({ top: 0, behavior: "smooth" })
          )}
        >
          {/* 제목 + slug */}
          <div className="grid w-full gap-6 grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-2"
                      placeholder="글 제목을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-2"
                      placeholder="my-post-slug"
                    />
                  </FormControl>
                  {slugValue && (
                    <p className="text-xs text-foreground/50">
                      /blog/{slugValue}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 카테고리 */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <Select
                  onValueChange={(v) => field.onChange(Number(v))}
                  value={field.value ? String(field.value) : ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 발행 상태 */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>발행 상태</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">임시저장</SelectItem>
                    <SelectItem value="published">공개</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 요약 */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>요약 (선택)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder="글 목록에 표시될 요약을 입력해주세요"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 썸네일 */}
          <BlogThumbnailUploader blogKey={imgKey} />

          {/* 태그 */}
          <BlogTagInput allTags={allTags} />

          {/* 본문 에디터 */}
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>본문</FormLabel>
                <FormControl>
                  <BlogDynamicEditor
                    imgKey={imgKey}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={!!form.formState.errors.contents}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full py-7"
            type="submit"
            disabled={isPending || isSuccess}
          >
            {isPending && "저장 중.."}
            {isSuccess && "저장 완료"}
            {!(isPending || isSuccess) &&
              (mode === "add" ? "글 등록" : "글 수정")}
          </Button>
        </form>
      </Form>
    </section>
  );
}
