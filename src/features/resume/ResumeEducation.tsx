"use client";

import { useState } from "react";
import SectionLabel from "./components/SectionLabel";
import { CERTIFICATIONS, EDUCATIONS } from "./constants/education";

const CERT_INITIAL = 7;

const ResumeEducation = () => {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = CERTIFICATIONS.length - CERT_INITIAL;
  const visible = expanded
    ? CERTIFICATIONS
    : (CERTIFICATIONS.slice(0, CERT_INITIAL) as readonly string[]);

  return (
    <section>
      <SectionLabel>Education &amp; Certification</SectionLabel>

      {/* 자격증 칩 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {visible.map((cert, i) => (
          <span
            key={i}
            className="bg-zinc-800/60 border border-zinc-800 text-zinc-300 text-[12.5px] font-medium px-3 py-1.5 rounded-full"
          >
            {cert}
          </span>
        ))}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-zinc-500 text-[12.5px] py-1.5 px-1 cursor-pointer hover:text-pink-400 transition-colors bg-transparent border-none"
          >
            {expanded ? "접기" : `외 ${hiddenCount}더보기`}
          </button>
        )}
      </div>

      {/* 학력 / 교육 */}
      <ul className="list-none p-0 mt-3.5 m-0">
        {EDUCATIONS.map((edu, i) => (
          <li
            key={i}
            className="relative text-zinc-300 text-[13.5px] py-1.5 pl-[18px] before:content-['※'] before:absolute before:left-0 before:top-[6px] before:text-zinc-500 before:text-[11px]"
          >
            {edu}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ResumeEducation;
