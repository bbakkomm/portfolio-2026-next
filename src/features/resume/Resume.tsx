import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ResumeHero from "./ResumeHero";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeStack from "./ResumeStack";
import { ROUTES } from "@/shared/config/routes";

const Resume = () => {
  return (
    <div className="relative bg-[#171717] overflow-hidden">
      {/* 배경 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/img/heros/rt_01.jpg)" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#171717]/60 to-[#171717]" />
      </div>

      <div className="flex-1 grid-layout pt-28 md:pt-36 pb-24 text-base leading-relaxed break-keep">
        <div className="relative z-10 max-w-[1100px]">
          <section className="flex flex-col items-start mb-30">
            <ResumeHero />
          </section>

          <section className="space-y-30">
            <section>
              <ResumeEducation />
            </section>
            <section>
              <ResumeExperience />
            </section>
            <section>
              <ResumeStack />
            </section>

            <div className="flex justify-end">
              <Link
                href={ROUTES.WORK}
                className="text-sm px-5 py-3 flex gap-2 items-center underline text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                프로젝트 리스트 보기 <ChevronRight size={12} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
