"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";

export async function togglePinAction(
  projectId: number,
  currentlyPinned: boolean
): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  if (currentlyPinned) {
    const { error } = await supabase
      .from("project_pin")
      .delete()
      .eq("fk_project_id", projectId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("project_pin")
      .insert({ fk_project_id: projectId });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
}

export async function deleteProjectAction(projectId: number): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("project_meta")
    .delete()
    .eq("id", projectId);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
}

export async function revalidateProjectAction(_projectId?: number): Promise<void> {
  revalidatePath("/", "layout");
}
