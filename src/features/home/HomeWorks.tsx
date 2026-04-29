"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ProjectMeta } from "@/entities/project/model";
import CarouselOrientation from "./CarouselOrientation";

const H = { opacity: 0, y: 30, filter: "blur(8px)" };
const V = { opacity: 1, y: 0, filter: "blur(0px)" };

export default function HomeWorks({ projects }: { projects: ProjectMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="flex flex-col gap-10 pt-20">
      {/* Header */}
      <motion.div
        initial={H}
        animate={inView ? V : H}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-zinc-50 font-semibold text-5xl leading-relaxed mb-4">Projects</h2>
        <p className="text-zinc-400 break-keep leading-relaxed max-w-[600px]">
          인터랙티브 웹 퍼블리싱 경험과 React, Next.js 기반의 애플리케이션 개발 경험을 함께 담았습니다.
          기술과 사용자 경험을 함께 고민하며 작업한 결과물입니다.
        </p>
      </motion.div>

      {projects.length > 0 && (
        <motion.div
          initial={H}
          animate={inView ? V : H}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <CarouselOrientation projects={projects} />
        </motion.div>
      )}
    </div>
  );
}
