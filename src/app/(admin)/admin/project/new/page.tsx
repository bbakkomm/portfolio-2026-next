import type { Metadata } from "next";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";

export const metadata: Metadata = { title: "새 프로젝트" };

export default function NewProjectPage() {
  return <ProjectForm mode="add" />;
}
