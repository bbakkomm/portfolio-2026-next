import SectionLabel from "./components/SectionLabel";
import { TECH_STACK } from "./constants/tech-stack";
import StackIconMapper from "@/shared/components/stack-icon-mapper";

const ResumeStack = () => (
  <section>
    <SectionLabel>Tech Stack</SectionLabel>

    <div className="space-y-10">
      {TECH_STACK.map((cat, ci) => (
        <div key={ci}>
          <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-zinc-50 mb-2 mt-0">
            {cat.title}
          </h3>
          <p className="text-zinc-300 text-[14.5px] leading-[1.85] mb-0 break-keep">
            {cat.desc}
          </p>

          <div className="flex flex-wrap gap-2 my-4">
            {cat.badges.map((badge, bi) => (
              <span
                key={bi}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border border-zinc-700 text-zinc-400"
              >
                <StackIconMapper stackName={badge.label as any} className="size-3.5" />
                {badge.label}
              </span>
            ))}
          </div>

          <ul className="list-none p-0 m-0">
            {cat.points.map((pt, pi) => (
              <li key={pi} className="text-[13.5px] text-zinc-400 py-0.5">
                {pt}
              </li>
            ))}
          </ul>

          {ci < TECH_STACK.length - 1 && (
            <hr className="border-0 border-t border-zinc-800 mt-8" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default ResumeStack;
