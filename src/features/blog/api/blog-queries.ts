import { createClient } from "@/shared/lib/supabase/server";
import type {
  BlogPost,
  BlogPostListItem,
  BlogPostDetail,
  BlogPostForEdit,
  BlogTag,
  BlogCategory,
} from "@/entities/blog/model";

const PER_PAGE_DEFAULT = 12;

const LIST_SELECT = `
  id, slug, title, excerpt, thumbnail, status, img_key, published_at, created_at, updated_at, category_id,
  blog_post_tag ( blog_tag ( id, name ) ),
  blog_category ( id, name, slug )
`;

export async function getPublishedBlogList({
  page = 1,
  perPage = PER_PAGE_DEFAULT,
  tagId,
  categorySlug,
  q,
}: {
  page?: number;
  perPage?: number;
  tagId?: number;
  categorySlug?: string;
  q?: string;
}): Promise<{ items: BlogPostListItem[]; total: number }> {
  const supabase = await createClient();

  let targetIds: number[] | null = null;

  if (tagId) {
    const { data, error } = await supabase
      .from("blog_post_tag")
      .select("post_id")
      .eq("tag_id", tagId);
    if (error) throw new Error(error.message);
    targetIds = (data ?? []).map((r: { post_id: number }) => r.post_id);
    if (targetIds.length === 0) return { items: [], total: 0 };
  }

  let categoryId: number | null = null;
  if (categorySlug) {
    const { data: cat } = await supabase
      .from("blog_category")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();
    if (!cat) return { items: [], total: 0 };
    categoryId = cat.id;
  }

  let query = supabase
    .from("blog_post")
    .select(LIST_SELECT, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (targetIds !== null) {
    query = query.in("id", targetIds);
  }

  if (categoryId !== null) {
    query = query.eq("category_id", categoryId);
  }

  if (q) {
    query = query.or(`title.ilike.%${q}%,contents.ilike.%${q}%`);
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return { items: (data ?? []) as unknown as BlogPostListItem[], total: count ?? 0 };
}

export async function getBlogBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select(`*, blog_post_tag ( blog_tag ( id, name ) ), blog_category ( id, name, slug )`)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data as BlogPostDetail;
}

export async function getBlogListForAdmin(): Promise<BlogPostListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select(LIST_SELECT)
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as BlogPostListItem[];
}

export async function getBlogByIdForEdit(
  id: number
): Promise<BlogPostForEdit | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select(`*, blog_post_tag ( blog_tag ( id, name ) ), blog_category ( id, name, slug )`)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data as BlogPostForEdit;
}

export async function getAllTags(): Promise<BlogTag[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_tag")
    .select("id, name")
    .order("name");

  if (error) throw new Error(error.message);

  return (data ?? []) as BlogTag[];
}

export async function getPublishedTags(): Promise<BlogTag[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post_tag")
    .select("blog_tag ( id, name ), blog_post!inner ( status )")
    .eq("blog_post.status", "published");

  if (error) throw new Error(error.message);

  const seen = new Set<number>();
  const tags: BlogTag[] = [];
  for (const row of data ?? []) {
    const tag = (row as unknown as { blog_tag: BlogTag }).blog_tag;
    if (tag && !seen.has(tag.id)) {
      seen.add(tag.id);
      tags.push(tag);
    }
  }
  tags.sort((a, b) => a.name.localeCompare(b.name));

  return tags;
}

export async function getAllPublishedBlogPosts(): Promise<BlogPostListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select(LIST_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []) as unknown as BlogPostListItem[];
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_category")
    .select("id, name, slug")
    .order("name");

  if (error) throw new Error(error.message);

  return (data ?? []) as BlogCategory[];
}

export async function getPublishedCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_post")
    .select("blog_category!inner( id, name, slug )")
    .eq("status", "published");

  if (error) throw new Error(error.message);

  const seen = new Set<number>();
  const categories: BlogCategory[] = [];
  for (const row of data ?? []) {
    const cat = (row as unknown as { blog_category: BlogCategory }).blog_category;
    if (cat && !seen.has(cat.id)) {
      seen.add(cat.id);
      categories.push(cat);
    }
  }
  categories.sort((a, b) => a.name.localeCompare(b.name));

  return categories;
}
