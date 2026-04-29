import { getProjects, getPinnedProjects } from "@/features/project/api/project-queries";
import HomeHero from "@/features/home/HomeHero";
import HomeAbout from "@/features/home/HomeAbout";
import HomeStack from "@/features/home/HomeStack";
import HomeWorks from "@/features/home/HomeWorks";
import HomeContact from "@/features/home/HomeContact";

export default async function HomePage() {
  const [projects, pinnedProjects] = await Promise.all([
    getProjects(),
    getPinnedProjects(),
  ]);

  return (
    <div className="relative flex flex-col gap-10 overflow-hidden lg:overflow-visible bg-[#171717]">
      <HomeHero recentProjects={projects.slice(0, 3)} />
      <div className="grid-layout flex flex-col gap-10">
        <HomeAbout />
        <HomeStack />
        <HomeWorks projects={pinnedProjects} />
      </div>
      <HomeContact />
    </div>
  );
}
