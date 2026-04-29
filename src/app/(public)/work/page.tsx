import { getProjects, getPinnedProjects } from "@/features/project/api/project-queries";
import ProjectListView from "@/features/project/ProjectListView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "React·Next.js 기반 프론트엔드 프로젝트 포트폴리오입니다. 삼성, LG 등 다양한 도메인의 작업물을 확인하세요.",
  openGraph: {
    title: "Work | Psh' Portfolio",
    description: "React·Next.js 기반 프론트엔드 프로젝트 포트폴리오입니다.",
    images: [{ url: "/img/meta.jpg", width: 1200, height: 630, alt: "Psh' Portfolio Work" }],
  },
};
export const revalidate = 3600;

export default async function WorkPage() {
  const [projects, pinnedProjects] = await Promise.all([
    getProjects(),
    getPinnedProjects(),
  ]);
  return <ProjectListView projects={projects} pinnedProjects={pinnedProjects} />;
}
