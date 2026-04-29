import { getProjects } from "@/features/project/api/project-queries";
import HomeHero from "@/features/home/HomeHero";
import HomeAbout from "@/features/home/HomeAbout";
import HomeWorks from "@/features/home/HomeWorks";
import HomeContact from "@/features/home/HomeContact";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="relative flex flex-col gap-10 overflow-hidden lg:overflow-visible bg-[#171717]">
      <HomeHero />
      <div className="grid-layout flex flex-col gap-10">
        <HomeAbout />
        <HomeWorks projects={projects} />
      </div>
      <HomeContact />
    </div>
  );
}
