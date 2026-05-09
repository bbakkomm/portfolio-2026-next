import BlogForm from "@/features/blog/BlogEditor/BlogForm";
import { getAllTags, getAllCategories } from "@/features/blog/api/blog-queries";

export default async function AdminBlogNewPage() {
  const [allTags, allCategories] = await Promise.all([
    getAllTags(),
    getAllCategories(),
  ]);

  return <BlogForm mode="add" allTags={allTags} allCategories={allCategories} />;
}
