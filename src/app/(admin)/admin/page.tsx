import Link from "next/link";
import { getProjectsForAdmin } from "@/features/project/api/project-queries";
import { Button } from "@/shared/ui/button";
import AdminProjectRow from "@/features/project/ProjectEditor/AdminProjectRow";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const projects = await getProjectsForAdmin();

  return (
    <div className="grid-layout pt-50 pb-20">
      <h1 className="text-4xl font-bold mb-10">Admin Page</h1>

      <div className="pt-10">
        <div className="flex items-center justify-between border-b border-zinc-500 pb-2 mb-0">
          <h2 className="text-xl">고정콘텐츠 설정</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/project/new">+ 새 프로젝트 추가</Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <p className="text-foreground/50 text-sm py-4">
            등록된 프로젝트가 없습니다.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {projects.map((project) => (
              <AdminProjectRow key={project.id} project={project} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
