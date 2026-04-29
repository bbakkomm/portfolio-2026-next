import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProjectsForAdmin } from "@/features/project/api/project-queries";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config/routes";
import AdminProjectRow from "@/features/project/ProjectEditor/AdminProjectRow";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const projects = await getProjectsForAdmin();

  return (
    <div className="max-w-[900px] mx-auto px-4 pt-20 pb-20">
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-50 transition-colors mb-6"
      >
        <ChevronLeft size={14} />
        홈으로
      </Link>
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
          <AdminProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
