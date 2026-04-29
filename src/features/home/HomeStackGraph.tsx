"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/shared/lib/cn";

type GraphItem = {
  name: string;
  label: string;
  percent: number;
  description: string;
  color: string;
  textColor: string;
};

const graphData: GraphItem[] = [
  {
    name: "Front-end",
    label: "전문 분야",
    percent: 50,
    description: "전문 영역으로, 최신 React 생태계를 활용한 사용자 경험 구현",
    color: "bg-zinc-200",
    textColor: "text-zinc-200",
  },
  {
    name: "Back-end",
    label: "협업 이해",
    percent: 20,
    description: "협업 시야 확장을 위한 API 설계 및 서버 로직 이해",
    color: "bg-zinc-500",
    textColor: "text-zinc-400",
  },
  {
    name: "Infra & Design",
    label: "운영 경험",
    percent: 15,
    description: "배포부터 디자인까지, 서비스의 전체 생명주기 이해",
    color: "bg-zinc-600",
    textColor: "text-zinc-400",
  },
  {
    name: "Python & AI",
    label: "도구 활용",
    percent: 15,
    description: "Claude Code·Python 기반 AI 도구 활용 및 자동화",
    color: "bg-zinc-700",
    textColor: "text-zinc-400",
  },
];

export default function HomeStackGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -10% 0px" });

  return (
    <div className="flex flex-col gap-6 text-sm w-full">
      {/* 통합 프로그레스 바 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>기술 스택 활용 비중</span>
          <span>100%</span>
        </div>

        {/* 단일 프로그레스 바 */}
        <div
          ref={ref}
          className="relative w-full h-13 bg-zinc-800/50 rounded-lg overflow-hidden flex"
        >
          {graphData.map((e, idx) => (
            <div
              key={idx}
              className={cn(
                "h-full transition-all duration-700 relative group cursor-pointer",
                "hover:opacity-90"
              )}
              style={{ width: `${e.percent}%` }}
            >
              {/* progress bar */}
              <motion.div
                className={cn("w-full h-full", e.color)}
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
              />

              {/* 텍스트 표시 */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 + 0.5 }}
              >
                {e.percent >= 15 ? (
                  <>
                    <span
                      className={cn(
                        "text-sm leading-none md:block hidden",
                        e.textColor,
                        idx === 0 ? "text-zinc-800" : "text-zinc-50"
                      )}
                    >
                      {e.name}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-bold leading-none",
                        e.textColor,
                        idx === 0 && "text-zinc-800"
                      )}
                    >
                      {e.percent}%
                    </span>
                  </>
                ) : (
                  <span className={cn("text-[10px] font-bold", e.textColor)}>
                    {e.percent}%
                  </span>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* 범례 */}
        <div className="flex items-center gap-4 text-xs">
          {graphData.map((e, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-sm", e.color)} />
              <span className={e.textColor}>
                {e.name}
                <span className="text-zinc-500 ml-1">({e.label})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
