import { getProjectDetail } from "@/features/project/api/project-queries";
import ProjectDetailView from "@/features/project/ProjectDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectDetail(Number(id));
  return { title: project?.title ?? "Project" };
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectDetail(Number(id));

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
