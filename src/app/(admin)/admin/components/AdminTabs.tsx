"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";

const TABS = [
  { id: "project", label: "프로젝트" },
  { id: "blog", label: "블로그" },
  { id: "analytics", label: "통계" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminTabs({
  projectContent,
  blogContent,
  analyticsContent,
}: {
  projectContent: React.ReactNode;
  blogContent: React.ReactNode;
  analyticsContent: React.ReactNode;
}) {
  const [active, setActive] = useState<TabId>("project");

  return (
    <div>
      <div className="flex border-b border-zinc-700">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-5 py-2.5 text-sm border-b-2 -mb-px transition-colors",
              active === tab.id
                ? "border-indigo-500 text-foreground font-medium"
                : "border-transparent text-foreground/50 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={active === "project" ? "" : "hidden"}>{projectContent}</div>
      <div className={active === "blog" ? "" : "hidden"}>{blogContent}</div>
      <div className={active === "analytics" ? "" : "hidden"}>{analyticsContent}</div>
    </div>
  );
}
