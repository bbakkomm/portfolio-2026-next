import type { Metadata } from "next";
import { getProjectEdit } from "@/features/project/api/project-queries";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";

export const metadata: Metadata = { title: "프로젝트 편집" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectEdit(Number(id));

  return (
    <ProjectForm mode="edit" projectId={Number(id)} initialData={project} />
  );
}
