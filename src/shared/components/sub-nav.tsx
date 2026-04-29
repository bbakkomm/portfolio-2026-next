"use client";

import { Github, MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

const MY_LINKS = [
  {
    to: "https://open.kakao.com/o/sq4skkTf",
    Icon: MessageCircle,
    label: "오픈 카카오톡",
  },
  {
    to: "https://github.com/bbakkomm",
    Icon: Github,
    label: "git",
  },
];

export default function SubNav() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {MY_LINKS.map((btn) => (
          <TooltipProvider key={btn.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => window.open(btn.to)}
                  className="bg-transparent transition-all duration-100 group p-2 h-auto rounded-lg border border-zinc-50/10 hover:border-indigo-200/50"
                >
                  <div className="relative">
                    <btn.Icon className="size-4 md:size-3.5 opacity-50 group-hover:opacity-100 group-hover:text-indigo-200 transition-all" />
                    <div className="absolute -inset-1 scale-0 group-hover:scale-100 bg-indigo-400/20 blur-md rounded-full -z-10 transition-all duration-300" />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-pink-400">
                <p>{btn.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
