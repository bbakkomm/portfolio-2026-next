"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";

export interface UpsertProjectPayload {
  mode: "add" | "edit";
  projectId?: number;
  title: string;
  company: string;
  description: string;
  project_member: string;
  project_url: string;
  start_date: string | null;
  end_date: string | null;
  thumbnail: string;
  img_key: string;
  contents: string;
  surmmry: Array<{ contents: string }>;
  useStack: number[];
}

export async function upsertProjectAction(
  payload: UpsertProjectPayload
): Promise<{ projectId: number }> {
  await requireAdmin();

  const supabase = await createClient();

  const metaPayload = {
    title: payload.title,
    company: payload.company,
    description: payload.description,
    project_member: payload.project_member,
    project_url: payload.project_url,
    start_date: payload.start_date,
    end_date: payload.end_date,
    thumbnail: payload.thumbnail,
    img_key: payload.img_key,
  };

  let resolvedProjectId: number;

  if (payload.mode === "add") {
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
      .eq("id", payload.projectId!);
    if (error) throw new Error(error.message);
    resolvedProjectId = payload.projectId!;
  }

  // project_contents
  if (payload.mode === "add") {
    const { error } = await supabase
      .from("project_contents")
      .insert({ project_id: resolvedProjectId, contents: payload.contents });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("project_contents")
      .update({ contents: payload.contents })
      .eq("project_id", resolvedProjectId);
    if (error) throw new Error(error.message);
  }

  // project_surmmry: 삭제 후 재삽입
  const { error: delSurmmryError } = await supabase
    .from("project_surmmry")
    .delete()
    .eq("project_id", resolvedProjectId);
  if (delSurmmryError) throw new Error(delSurmmryError.message);

  if (payload.surmmry.length > 0) {
    const { error } = await supabase.from("project_surmmry").insert(
      payload.surmmry.map((s) => ({
        project_id: resolvedProjectId,
        summary: s.contents,
      }))
    );
    if (error) throw new Error(error.message);
  }

  // project_meta_stack: 삭제 후 재삽입
  const { error: delStackError } = await supabase
    .from("project_meta_stack")
    .delete()
    .eq("project_id", resolvedProjectId);
  if (delStackError) throw new Error(delStackError.message);

  if (payload.useStack.length > 0) {
    const { error } = await supabase.from("project_meta_stack").insert(
      payload.useStack.map((stackId) => ({
        project_id: resolvedProjectId,
        stack_id: stackId,
      }))
    );
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");

  return { projectId: resolvedProjectId };
}
