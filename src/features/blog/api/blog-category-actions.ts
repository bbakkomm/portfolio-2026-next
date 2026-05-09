"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";
import type { BlogCategory } from "@/entities/blog/model";

export async function createCategoryAction(
  name: string,
  slug: string
): Promise<BlogCategory> {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_category")
    .insert({ name, slug })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") throw new Error("이미 사용 중인 slug입니다.");
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  return data as BlogCategory;
}

export async function updateCategoryAction(
  id: number,
  name: string,
  slug: string
): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_category")
    .update({ name, slug })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") throw new Error("이미 사용 중인 slug입니다.");
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
}

export async function deleteCategoryAction(id: number): Promise<void> {
  await requireAdmin();
  const supabase = await createClient();

  // 연결된 글의 category_id를 null로 먼저 해제
  await supabase
    .from("blog_post")
    .update({ category_id: null })
    .eq("category_id", id);

  const { error } = await supabase
    .from("blog_category")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/blog");
}
