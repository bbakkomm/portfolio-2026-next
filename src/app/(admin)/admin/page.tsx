import Link from "next/link";
import { getProjects } from "@/features/project/api/project-queries";
import { Button } from "@/shared/ui/button";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-[900px] mx-auto px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Admin</h1>
        <Button asChild>
          <Link href="/admin/project/new">+ 새 프로젝트 추가</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {projects.length === 0 && (
          <p className="text-foreground/50 text-sm">
            등록된 프로젝트가 없습니다.
          </p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between border border-border rounded-lg p-4"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{project.title}</span>
              <span className="text-sm text-foreground/50">{project.company}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/project/${project.id}/edit`}>편집</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
