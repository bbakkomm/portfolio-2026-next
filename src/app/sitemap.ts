import type { MetadataRoute } from "next";
import { createClient } from "@/shared/lib/supabase/server";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    const supabase = await createClient();
    const { data: projects } = await supabase
      .from("project_meta")
      .select("id, title")
      .order("id", { ascending: false });

    const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
      url: `${siteUrl}/work/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
