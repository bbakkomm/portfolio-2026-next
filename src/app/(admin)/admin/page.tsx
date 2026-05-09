import Link from "next/link";
import { getProjectsForAdmin } from "@/features/project/api/project-queries";
import { getBlogListForAdmin, getAllCategories } from "@/features/blog/api/blog-queries";
import { Button } from "@/shared/ui/button";
import AdminProjectRow from "@/features/project/ProjectEditor/AdminProjectRow";
import AdminBlogRow from "@/features/blog/BlogEditor/AdminBlogRow";
import AdminCategoryManager from "@/features/blog/BlogEditor/AdminCategoryManager";
import AdminTabs from "./components/AdminTabs";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const [projects, blogPosts, categories] = await Promise.all([
    getProjectsForAdmin(),
    getBlogListForAdmin(),
    getAllCategories(),
  ]);

  const pinOrderMap = new Map(
    projects
      .filter((p) => (p as any).project_pin != null)
      .sort((a, b) => ((a as any).project_pin.id ?? 0) - ((b as any).project_pin.id ?? 0))
      .map((p, i) => [p.id, i + 1])
  );

  return (
    <div className="grid-layout pt-50 pb-20">
      <h1 className="text-4xl font-bold mb-10">Admin Page</h1>

      <AdminTabs
        projectContent={
          <div className="pt-6">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-0">
              <h2 className="text-xl">고정콘텐츠 설정</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/project/new">+ 새 프로젝트 추가</Link>
              </Button>
            </div>
            {projects.length === 0 ? (
              <p className="text-foreground/50 text-sm py-4">등록된 프로젝트가 없습니다.</p>
            ) : (
              <ul className="divide-y divide-border">
                {projects.map((project) => (
                  <AdminProjectRow
                    key={project.id}
                    project={project}
                    pinOrder={pinOrderMap.get(project.id) ?? null}
                  />
                ))}
              </ul>
            )}
          </div>
        }
        blogContent={
          <div className="pt-6 flex flex-col gap-8">
            <AdminCategoryManager initialCategories={categories} />

            <div>
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2 mb-0">
                <h2 className="text-xl">블로그 포스트</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/admin/blog/new">+ 새 글 추가</Link>
                </Button>
              </div>
              {blogPosts.length === 0 ? (
                <p className="text-foreground/50 text-sm py-4">등록된 글이 없습니다.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {blogPosts.map((post) => (
                    <AdminBlogRow key={post.id} post={post} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}
