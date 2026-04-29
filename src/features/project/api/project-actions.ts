"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";

export async function togglePinAction(
  projectId: number,
  currentlyPinned: boolean
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("권한이 없습니다.");

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("권한이 없습니다.");

  const { error } = await supabase
    .from("project_meta")
    .delete()
    .eq("id", projectId);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
}
