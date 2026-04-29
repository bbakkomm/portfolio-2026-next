"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const METEOR_COUNT = 12;
const STAR_COUNT = 55;

const meteors = Array.from({ length: METEOR_COUNT }, (_, i) => ({
  id: i,
  angle: 15 + Math.floor(Math.random() * 25),
}));

const bgStars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 85,
  size: 0.5 + Math.random() * 1.8,
  opacity: 0.2 + Math.random() * 0.6,
}));

export default function FallingStarsEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;
      const { offsetWidth, offsetHeight } = container;

      container.querySelectorAll<HTMLElement>(".meteor").forEach((el, idx) => {
        const angle = parseFloat(el.dataset.angle ?? "20");
        const angleRad = (angle * Math.PI) / 180;

        const resetAndAnimate = () => {
          const startX = Math.random() * offsetWidth * 1.1;
          const startY = -150;
          const travelDist = offsetHeight + 250;
          const endX = startX + travelDist * Math.sin(angleRad);
          const endY = startY + travelDist * Math.cos(angleRad);
          const duration = 1.5 + Math.random() * 2.5;

          gsap.set(el, { x: startX, y: startY, opacity: 0, rotation: angle });
          gsap
            .timeline({
              onComplete: () =>
                gsap.delayedCall(2 + Math.random() * 6, resetAndAnimate),
            })
            .to(el, { opacity: 1, duration: 0.2 })
            .to(el, { x: endX, y: endY, duration, ease: "none" }, 0)
            .to(
              el,
              { opacity: 0, duration: 0.5, ease: "power1.in" },
              duration * 0.6
            );
        };

        gsap.delayedCall(idx * 0.5 + Math.random() * 4, resetAndAnimate);
      });

      container.querySelectorAll<HTMLElement>(".bg-star").forEach((el) => {
        const initOpacity = parseFloat(el.dataset.opacity ?? "0.3");
        gsap.to(el, {
          opacity: initOpacity * 0.15,
          duration: 1 + Math.random() * 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-[15] pointer-events-none"
    >
      {bgStars.map((star) => (
        <div
          key={`bgstar_${star.id}`}
          className="bg-star absolute rounded-full bg-white"
          data-opacity={star.opacity}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      {meteors.map((m) => (
        <div
          key={`meteor_${m.id}`}
          className="meteor absolute"
          data-angle={m.angle}
          style={{ opacity: 0 }}
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "white",
              boxShadow:
                "0 0 6px 2px rgba(200, 230, 255, 0.95), 0 0 14px 5px rgba(150, 200, 255, 0.5)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
