"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProjList from "./ProjList";
import type { Group } from "../constants/experience";

interface Props {
  group: Group;
  defaultExpanded?: boolean;
}

const GroupAccordion = ({ group, defaultExpanded = false }: Props) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-start justify-between gap-3 text-left focus-visible:outline focus-visible:outline-pink-400/40 rounded-sm"
      >
        {group.title && (
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-zinc-50 mt-0 mb-0">
            {group.title}
          </h3>
        )}
        <ChevronDown
          size={18}
          className={`shrink-0 mt-1 text-zinc-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="mt-1.5">
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
      )}
    </div>
  );
};

export default GroupAccordion;
