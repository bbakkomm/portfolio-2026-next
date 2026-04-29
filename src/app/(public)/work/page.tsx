import { getProjects, getPinnedProjects } from "@/features/project/api/project-queries";
import ProjectListView from "@/features/project/ProjectListView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Work" };
export const revalidate = 3600;

export default async function WorkPage() {
  const [projects, pinnedProjects] = await Promise.all([
    getProjects(),
    getPinnedProjects(),
  ]);
  return <ProjectListView projects={projects} pinnedProjects={pinnedProjects} />;
}
