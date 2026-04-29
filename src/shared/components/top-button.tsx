"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export default function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-10 bottom-5 z-100 pointer-events-none transition-all opacity-0 duration-150 size-10 rounded-full cursor-pointer bg-zinc-800 [&>svg]:text-white flex items-center justify-center",
        show && "bottom-10 opacity-100 pointer-events-auto"
      )}
    >
      <ChevronUp aria-hidden="true" />
    </button>
  );
}
