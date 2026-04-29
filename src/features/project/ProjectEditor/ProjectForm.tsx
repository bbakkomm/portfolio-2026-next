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
import { projectSchema } from "../schema/project-schema";
import ProjectStackHandler from "./ProjectStackHandler";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { z } from "zod";
import { DatePickerWithRange } from "./ProjectDatePicker";
import ProjectSummary from "./ProjectSummary";
import { cn } from "@/shared/lib/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectThumbnailUploader from "./ProjectThumbnailUploader";
import { createClient } from "@/shared/lib/supabase/client";
import type { ProjectPostProps } from "@/entities/project/model";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { ROUTES } from "@/shared/config/routes";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { normalizeContentHtml } from "@/shared/lib/normalize-content-html";
import { revalidateProjectAction } from "@/features/project/api/project-actions";

const DynamicEditor = dynamic(() => import("./DynamicEditor"), { ssr: false });

interface ProjectFormProps {
  mode: "add" | "edit";
  projectId?: number;
  initialData?: ProjectPostProps | null;
}

export default function ProjectForm({
  mode,
  projectId,
  initialData,
}: ProjectFormProps) {
  const router = useRouter();
  const [imgKey, setImgKey] = useState<string>(() => uuidv4());
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      title: "",
      company: "",
      members: "",
      url: "",
      contents: "",
      useStack: [],
      description: "",
      surmmry: [],
      workRange: {
        start: null,
        end: null,
      },
    },
    resolver: zodResolver(projectSchema),
  });

  // 편집 모드: 초기 데이터 적용
  useEffect(() => {
    if (mode === "edit" && initialData) {
      const stacks = (initialData.project_meta_stack ?? []).map(
        (e: { project_stack: { type: string; stack: string; id?: number } }) =>
          (e.project_stack as any).id as number
      );

      const surmmryList = ((initialData as any).project_surmmry ?? []).map(
        (e: { id?: number; title?: string; summary?: string; contents?: string }) => ({
          id: e.id,
          title: e.title ?? "",
          contents: e.summary ?? e.contents ?? "",
        })
      );

      form.reset({
        title: initialData.title ?? "",
        company: initialData.company ?? "",
        members: (initialData as any).project_member ?? "",
        thumbnail: initialData.thumbnail ?? "",
        url: (initialData as any).projectUrl ?? (initialData as any).project_url ?? "",
        useStack: stacks,
        surmmry: surmmryList,
        description: initialData.description ?? "",
        workRange: {
          start: initialData.start_date
            ? new Date(initialData.start_date as string)
            : null,
          end: initialData.end_date
            ? new Date(initialData.end_date as string)
            : null,
        },
        contents: normalizeContentHtml(
          (initialData as any).project_contents?.[0]?.contents ?? ""
        ),
      });

      if ((initialData as any).img_key) {
        setImgKey((initialData as any).img_key);
      }
    }
  }, [mode, initialData, form]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (body: z.infer<typeof projectSchema>) => {
      const supabase = createClient();

      const metaPayload = {
        title: body.title,
        company: body.company,
        description: body.description,
        project_member: body.members,
        project_url: body.url ?? "",
        start_date: body.workRange.start
          ? format(body.workRange.start, "yyyy. MM. dd")
          : null,
        end_date: body.workRange.end
          ? format(body.workRange.end, "yyyy. MM. dd")
          : null,
        thumbnail: body.thumbnail,
        img_key: imgKey,
      };

      let resolvedProjectId: number;

      if (mode === "add") {
        const { data: inserted, error } = await supabase
          .from("project_meta")
          .insert(metaPayload)
          .select("id")
          .single();
        if (error) throw new Error(error.message);
        resolvedProjectId = inserted.id;
      } else {
        const { error } = await supabase
          .from("project_meta")
          .update(metaPayload)
          .eq("id", projectId!);
        if (error) throw new Error(error.message);
        resolvedProjectId = projectId!;
      }

      // project_contents upsert
      const { error: contentsError } = await supabase
        .from("project_contents")
        .upsert({
          project_id: resolvedProjectId,
          contents: body.contents,
        });
      if (contentsError) throw new Error(contentsError.message);

      // project_surmmry: 삭제 후 재삽입
      await supabase
        .from("project_surmmry")
        .delete()
        .eq("project_id", resolvedProjectId);

      if (body.surmmry.length > 0) {
        const { error } = await supabase.from("project_surmmry").insert(
          body.surmmry.map((s) => ({
            project_id: resolvedProjectId,
            summary: s.contents,
          }))
        );
        if (error) throw new Error(error.message);
      }

      // project_meta_stack: 삭제 후 stack_id로 직접 삽입
      await supabase
        .from("project_meta_stack")
        .delete()
        .eq("project_id", resolvedProjectId);

      if (body.useStack.length > 0) {
        const { error } = await supabase.from("project_meta_stack").insert(
          body.useStack.map((stackId) => ({
            project_id: resolvedProjectId,
            stack_id: stackId,
          }))
        );
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: async () => {
      toast.success(
        mode === "add"
          ? "프로젝트가 등록 되었습니다."
          : "프로젝트가 수정 되었습니다."
      );
      form.reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["project-list"] }),
        queryClient.invalidateQueries({
          queryKey: [`PROJECT_DETAIL:${projectId}`],
        }),
        revalidateProjectAction(projectId),
      ]);
      router.push(ROUTES.ADMIN);
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(`오류가 발생했습니다: ${error.message}`);
    },
  });

  const onSubmitHandler = (e: z.infer<typeof projectSchema>) => {
    mutate(e);
  };

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
        {mode === "add" ? "프로젝트 등록하기" : "프로젝트 수정하기"}
      </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-10 items-start"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          {/* 기본 정보 */}
          <div className="grid w-full gap-10 grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트 제목</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-2"
                      placeholder="프로젝트 제목을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>프로젝트 기관</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-2"
                      placeholder="프로젝트 기관을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>참여자 구성원</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="p-2"
                      placeholder="참여 구성원을 기재해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 설명 */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full"
                    placeholder="내용을 입력해주세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL + 작업기간 */}
          <div className="w-full grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      className="p-2 w-full border border-foreground/50"
                      placeholder="공개 된 url을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>작업기간</FormLabel>
              <DatePickerWithRange />
            </FormItem>
          </div>

          {/* 썸네일 업로더 */}
          <ProjectThumbnailUploader projectKey={imgKey} />

          {/* 스택 */}
          <ProjectStackHandler />

          {/* 요약 항목 */}
          <FormItem className="w-full">
            <FormLabel>작업 Summary</FormLabel>
            <ProjectSummary />
          </FormItem>

          {/* 에디터 */}
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DynamicEditor
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
            {isPending && "작성중.."}
            {isSuccess && "반영 완료"}
            {!(isPending || isSuccess) &&
              (mode === "add" ? "프로젝트 등록" : "프로젝트 수정")}
          </Button>
        </form>
      </Form>
    </section>
  );
}
