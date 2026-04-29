import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

export default function HomeSectionTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-zinc-50 font-semibold leading-relaxed break-keep mb-5",
        "text-[clamp(1.7rem,2vw,1.9rem)] md:max-w-none",
        className
      )}
    >
      {children}
    </h2>
  );
}
