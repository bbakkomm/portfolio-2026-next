"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

const MY_LINKS = [
  {
    to: "https://open.kakao.com/o/sq4skkTf",
    src: "/svg/kakao.svg",
    label: "오픈 카카오톡",
  },
  {
    to: "https://github.com/bbakkomm",
    src: "/svg/giticon.svg",
    label: "GitHub",
  },
];

export default function SubNav() {
  return (
    <div className="flex gap-2">
      {MY_LINKS.map((btn) => (
        <TooltipProvider key={btn.label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={btn.to}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 rounded-lg border border-zinc-50/10 hover:border-zinc-50/30 transition-all"
              >
                <img
                  src={btn.src}
                  alt={btn.label}
                  width={14}
                  height={14}
                  className="opacity-50 group-hover:opacity-100 transition-all filter-[brightness(0)_invert(1)]"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-pink-400 text-zinc-50 border border-pink-300"
              arrowClassName="bg-pink-400 fill-pink-400"
            >
              <p>{btn.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
