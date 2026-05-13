import SectionLabel from "./components/SectionLabel";
import CompanyBlock from "./components/CompanyBlock";
import GroupAccordion from "./components/GroupAccordion";
import { EXPERIENCE } from "./constants/experience";

const ResumeExperience = () => (
  <section>
    <SectionLabel>Projects &amp; Experience</SectionLabel>

    <div className="space-y-16">
      {EXPERIENCE.map((exp, ci) => (
        <div key={ci}>
          <CompanyBlock
            company={exp.company}
            meta={exp.meta}
            role={exp.role}
            stack={exp.stack}
          />
          {exp.summary && (
            <blockquote className="border-l-2 border-zinc-700 pl-4 mt-5 mb-10 text-[15px] text-zinc-400 leading-[1.8] break-keep">
              {exp.summary}
            </blockquote>
          )}

          <div className="space-y-12">
            {exp.groups.map((group, gi) => (
              <GroupAccordion key={gi} group={group} defaultExpanded={ci === 0} />
            ))}
          </div>

          {ci < EXPERIENCE.length - 1 && (
            <hr className="border-0 border-t border-zinc-800 mt-14" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default ResumeExperience;
