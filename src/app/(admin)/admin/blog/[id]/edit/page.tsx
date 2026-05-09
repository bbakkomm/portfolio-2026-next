import { notFound } from "next/navigation";
import BlogForm from "@/features/blog/BlogEditor/BlogForm";
import {
  getBlogByIdForEdit,
  getAllTags,
  getAllCategories,
} from "@/features/blog/api/blog-queries";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  const [post, allTags, allCategories] = await Promise.all([
    getBlogByIdForEdit(Number(id)),
    getAllTags(),
    getAllCategories(),
  ]);

  if (!post) notFound();

  return (
    <BlogForm
      mode="edit"
      postId={post.id}
      initialData={post}
      allTags={allTags}
      allCategories={allCategories}
    />
  );
}
