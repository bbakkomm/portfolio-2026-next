import SectionLabel from "./components/SectionLabel";
import CompanyBlock from "./components/CompanyBlock";
import ProjList from "./components/ProjList";
import { EXPERIENCE } from "./constants/experience";

const ResumeExperience = () => (
  <section>
    <SectionLabel>Projects &amp; Experience</SectionLabel>

    <div className="space-y-16">
      {EXPERIENCE.map((exp, ei) => (
        <div key={ei}>
          <CompanyBlock
            company={exp.company}
            meta={exp.meta}
            role={exp.role}
            stack={exp.stack}
          />

          <div className="space-y-8">
            {exp.groups.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-zinc-50 mb-1.5 mt-0">
                    {group.title}
                  </h3>
                )}
                {group.summary && (
                  <p className="text-[13.5px] text-zinc-400 leading-[1.7] mb-2 break-keep">
                    {group.summary}
                  </p>
                )}
                <ProjList items={group.projects} className="mt-2" />
              </div>
            ))}
          </div>

          {ei < EXPERIENCE.length - 1 && (
            <hr className="border-0 border-t border-zinc-800 mt-14" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export default ResumeExperience;
