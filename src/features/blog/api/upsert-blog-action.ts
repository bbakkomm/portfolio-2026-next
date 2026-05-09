"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";
import type { BlogStatus } from "@/entities/blog/model";

export interface UpsertBlogPayload {
  mode: "add" | "edit";
  postId?: number;
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  contents: string;
  status: BlogStatus;
  img_key: string;
  categoryId: number;
  tagIds: number[];
  newTags: string[];
}

export async function upsertBlogAction(
  payload: UpsertBlogPayload
): Promise<{ postId: number }> {
  await requireAdmin();

  const supabase = await createClient();

  // slug 중복 체크 (edit 모드에서 다른 글이 같은 slug 사용 중인지)
  if (payload.mode === "edit" && payload.postId) {
    const { data: existing } = await supabase
      .from("blog_post")
      .select("id")
      .eq("slug", payload.slug)
      .neq("id", payload.postId)
      .maybeSingle();

    if (existing) {
      throw new Error("이미 사용 중인 slug입니다. 다른 slug를 입력해주세요.");
    }
  }

  // published_at 처리 — 처음 published 전환 시에만 now() 세팅
  let publishedAt: string | null | undefined = undefined;
  if (payload.status === "published" && payload.mode === "add") {
    publishedAt = new Date().toISOString();
  } else if (payload.status === "published" && payload.mode === "edit" && payload.postId) {
    const { data: current } = await supabase
      .from("blog_post")
      .select("published_at, status")
      .eq("id", payload.postId)
      .single();
    if (current && !current.published_at) {
      publishedAt = new Date().toISOString();
    }
  }

  const metaPayload = {
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt || null,
    thumbnail: payload.thumbnail,
    contents: payload.contents,
    status: payload.status,
    img_key: payload.img_key,
    category_id: payload.categoryId,
    ...(publishedAt !== undefined ? { published_at: publishedAt } : {}),
  };

  let resolvedPostId: number;

  if (payload.mode === "add") {
    const { data: inserted, error } = await supabase
      .from("blog_post")
      .insert(metaPayload)
      .select("id")
      .single();
    if (error) {
      if (error.code === "23505") {
        throw new Error("이미 사용 중인 slug입니다. 다른 slug를 입력해주세요.");
      }
      throw new Error(error.message);
    }
    resolvedPostId = inserted.id;
  } else {
    const { error } = await supabase
      .from("blog_post")
      .update(metaPayload)
      .eq("id", payload.postId!);
    if (error) throw new Error(error.message);
    resolvedPostId = payload.postId!;
  }

  // 신규 태그 생성 (unique 충돌 시 기존 것 조회)
  const createdTagIds: number[] = [];
  for (const name of payload.newTags) {
    const trimmed = name.trim();
    if (!trimmed) continue;

    const { data: inserted, error } = await supabase
      .from("blog_tag")
      .insert({ name: trimmed })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabase
          .from("blog_tag")
          .select("id")
          .eq("name", trimmed)
          .single();
        if (existing) createdTagIds.push(existing.id);
      } else {
        throw new Error(error.message);
      }
    } else {
      createdTagIds.push(inserted.id);
    }
  }

  // blog_post_tag: 삭제 후 재삽입 (project_meta_stack 패턴)
  const { error: delError } = await supabase
    .from("blog_post_tag")
    .delete()
    .eq("post_id", resolvedPostId);
  if (delError) throw new Error(delError.message);

  const allTagIds = [...new Set([...payload.tagIds, ...createdTagIds])];
  if (allTagIds.length > 0) {
    const { error: insertError } = await supabase
      .from("blog_post_tag")
      .insert(allTagIds.map((tag_id) => ({ post_id: resolvedPostId, tag_id })));
    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath(`/blog/${payload.slug}`);

  return { postId: resolvedPostId };
}
