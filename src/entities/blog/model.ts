export type BlogStatus = "draft" | "published";

export interface BlogTag {
  id: number;
  name: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

// DB row 1:1 (blog_post 테이블)
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnail: string | null;
  contents: string;
  status: BlogStatus;
  img_key: string;
  category_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// 목록용 (contents 제외, tags + category join 포함)
export interface BlogPostListItem extends Omit<BlogPost, "contents"> {
  blog_post_tag?: Array<{ blog_tag: BlogTag }>;
  blog_category: BlogCategory;
}

// 상세용 (tags + category join 포함)
export interface BlogPostDetail extends BlogPost {
  blog_post_tag: Array<{ blog_tag: BlogTag }>;
  blog_category: BlogCategory;
}

// 편집 폼 초기값용
export interface BlogPostForEdit extends BlogPost {
  blog_post_tag: Array<{ blog_tag: BlogTag }>;
  blog_category: BlogCategory;
}

// 폼 입력값
export interface BlogPostFormValue {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  contents: string;
  status: BlogStatus;
  categoryId: number;
  tagIds: number[];
  newTags: string[];
}
