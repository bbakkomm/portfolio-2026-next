"use client";

import { createClient } from "@/shared/lib/supabase/client";
import type { ProjectPostProps } from "@/entities/project/model";

/**
 * 프로젝트 생성(add) 또는 수정(edit)
 * - project_meta: INSERT / UPDATE
 * - project_contents: INSERT / UPDATE
 * - project_surmmry: 삭제 후 재삽입
 * - project_meta_stack: 삭제 후 재삽입
 */
export async function upsertProject(
  data: ProjectPostProps,
  type: "add" | "edit"
): Promise<void> {
  const supabase = createClient();

  const metaPayload = {
    title: data.title,
    company: data.company,
    description: data.description,
    projectDescription: data.projectDescription,
    project_member: data.project_member,
    projectUrl: data.projectUrl,
    start_date: data.start_date,
    end_date: data.end_date,
    thumbnail: data.thumbnail,
    img_key: (data as any).img_key ?? "",
    hashtag: data.hashtag,
    skill: data.skill,
  };

  let projectId: number;

  if (type === "add") {
    const { data: inserted, error } = await supabase
      .from("project_meta")
      .insert(metaPayload)
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    projectId = inserted.id;
  } else {
    const id = Number(data.id);
    const { error } = await supabase
      .from("project_meta")
      .update(metaPayload)
      .eq("id", id);

    if (error) throw new Error(error.message);
    projectId = id;
  }

  // project_contents upsert
  const contentsData = (data as any).project_contents;
  if (contentsData?.content !== undefined) {
    const { error } = await supabase
      .from("project_contents")
      .upsert({ project_id: projectId, content: contentsData.content });

    if (error) throw new Error(error.message);
  }

  // project_surmmry 삭제 후 재삽입
  const surmmryList: Array<{ summary: string }> =
    (data as any).project_surmmry ?? [];

  const { error: delSurmmryError } = await supabase
    .from("project_surmmry")
    .delete()
    .eq("project_id", projectId);

  if (delSurmmryError) throw new Error(delSurmmryError.message);

  if (surmmryList.length > 0) {
    const { error } = await supabase.from("project_surmmry").insert(
      surmmryList.map((s) => ({ project_id: projectId, summary: s.summary }))
    );
    if (error) throw new Error(error.message);
  }

  // project_meta_stack 삭제 후 재삽입
  const stackList: Array<{ project_stack: { type: string; stack: string } }> =
    data.project_meta_stack ?? [];

  const { error: delStackError } = await supabase
    .from("project_meta_stack")
    .delete()
    .eq("project_id", projectId);

  if (delStackError) throw new Error(delStackError.message);

  if (stackList.length > 0) {
    // project_stack에서 id 조회 후 연결
    const stackNames = stackList.map((s) => s.project_stack.stack);
    const { data: stacks, error: stackFetchError } = await supabase
      .from("project_stack")
      .select("id, stack")
      .in("stack", stackNames);

    if (stackFetchError) throw new Error(stackFetchError.message);

    const metaStackRows = (stacks ?? []).map((s) => ({
      project_id: projectId,
      stack_id: s.id,
    }));

    if (metaStackRows.length > 0) {
      const { error } = await supabase
        .from("project_meta_stack")
        .insert(metaStackRows);
      if (error) throw new Error(error.message);
    }
  }
}

/**
 * 프로젝트 삭제
 * project_meta 삭제 시 FK cascade로 연관 테이블도 삭제됩니다.
 */
export async function deleteProject(id: number): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("project_meta")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
