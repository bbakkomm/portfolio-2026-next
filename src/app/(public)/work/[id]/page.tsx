import { getProjectDetail } from "@/features/project/api/project-queries";
import ProjectDetailView from "@/features/project/ProjectDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectDetail(Number(id));
  if (!project) return { title: "Project" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";
  const imageUrl = project.thumbnail
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${project.thumbnail}`
    : undefined;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/work/${id}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: project.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectDetail(Number(id));

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
