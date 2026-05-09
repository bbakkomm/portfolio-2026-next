"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";
import type { BlogStatus } from "@/entities/blog/model";

export async function deleteBlogAction(
  id: number,
  slug: string
): Promise<void> {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase.from("blog_post").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath(`/blog/${slug}`);
}

export async function toggleBlogStatusAction(
  id: number,
  currentStatus: BlogStatus,
  slug: string
): Promise<void> {
  await requireAdmin();

  const supabase = await createClient();

  const nextStatus: BlogStatus =
    currentStatus === "published" ? "draft" : "published";

  const updates: Record<string, unknown> = { status: nextStatus };

  // 처음 published 전환 시 published_at 세팅
  if (nextStatus === "published") {
    const { data: current } = await supabase
      .from("blog_post")
      .select("published_at")
      .eq("id", id)
      .single();
    if (current && !current.published_at) {
      updates.published_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from("blog_post")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath(`/blog/${slug}`);
}

export async function revalidateBlogAction(): Promise<void> {
  await requireAdmin();
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
}
