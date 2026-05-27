"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PRESETS = [
  { label: "7일", days: 7 },
  { label: "30일", days: 30 },
  { label: "90일", days: 90 },
] as const;


export function RangeFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("days") ?? "30";

  function select(days: number) {
    const p = new URLSearchParams(params.toString());
    p.set("days", String(days));
    router.push(`?${p.toString()}`);
  }

  return (
    <div className="flex items-center gap-1">
      {PRESETS.map(({ label, days }) => (
        <button
          key={days}
          onClick={() => select(days)}
          className={`px-3 py-1 text-xs rounded-md border transition-colors ${
            current === String(days)
              ? "border-indigo-500 text-foreground bg-indigo-500/10"
              : "border-zinc-700 text-foreground/50 hover:text-foreground"
          }`}
        >
          최근 {label}
        </button>
      ))}
    </div>
  );
}

