"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageBackdropProps {
  imageSrc?: string;
}

export default function PageBackdrop({
  imageSrc = "/img/heros/bbt_38_1920.webp",
}: PageBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current || !containerRef.current) return;
      gsap.to(imgRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-lvh overflow-hidden pointer-events-none z-0"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center opacity-60 will-change-transform transform-gpu"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#171717]/70 to-[#171717]" />
    </div>
  );
}
