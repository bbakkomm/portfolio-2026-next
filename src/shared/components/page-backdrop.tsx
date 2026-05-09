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
  imageOpacity?: number;
}

export default function PageBackdrop({
  imageSrc = "/img/heros/bbt_38_1920.webp",
  imageOpacity = 60,
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
        className="absolute inset-0 bg-cover bg-center will-change-transform transform-gpu"
        style={{ backgroundImage: `url(${imageSrc})`, opacity: imageOpacity / 50 }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#171717]/70 to-[#171717]" />
    </div>
  );
}
