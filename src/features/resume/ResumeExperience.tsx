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
          {exp.summary && (
            <blockquote className="border-l-2 border-zinc-700 pl-4 mt-5 mb-10 text-[15px] text-zinc-400 leading-[1.8] break-keep">
              {exp.summary}
            </blockquote>
          )}

          <div className="space-y-8">
            {exp.groups.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-zinc-50 mb-1.5 mt-0">
                    {group.title}
                  </h3>
                )}
                {group.summary && (
                  <p className="text-[15.5px] text-zinc-400 leading-[1.7] mb-2 break-keep">
                    {group.summary}
                  </p>
                )}
                <ProjList items={group.projects} className="mt-2" />
                {group.link && (
                  <a
                    href={group.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[13px] text-pink-400/60 border-b border-dashed border-pink-400/40 hover:text-pink-400 hover:border-pink-400 transition-colors"
                  >
                    {group.link.label} ↗
                  </a>
                )}
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
