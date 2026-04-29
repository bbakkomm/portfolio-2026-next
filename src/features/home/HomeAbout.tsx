"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollFadeIn } from "@/shared/hooks/useScrollFadeIn";
import { SquareMousePointer, Code2, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import HomeSectionTitle from "./HomeSectionTitle";

const aboutData = [
  {
    title: "2019",
    targetValue: 2019,
    description:
      "2019년 웹 퍼블리싱으로 입문한 뒤 React와 Next.js로 전향하며 프론트엔드 역량을 꾸준히 확장해왔습니다.",
    suffix: "~",
  },
  {
    title: "25",
    targetValue: 25,
    description:
      "삼성닷컴, LG ThinQ 하이브리드앱, 병원·기업 사이트 등 다양한 도메인에서 25개 이상의 프로젝트를 설계·개발·런칭했습니다.",
    suffix: "+",
  },
];

const about_cont = [
  {
    title: "프론트엔드 개발",
    description:
      "기획부터 디자인·개발·배포까지 경험하며, React와 Next.js의 구조 설계와 렌더링 원리를 깊이 이해합니다.",
    Icon: Code2,
  },
  {
    title: "사용자 중심의 UI·UX",
    description:
      "최신 디자인 시스템을 활용해 일관된 퍼블리싱과 접근성 높은 인터랙티브 UI를 고려합니다.",
    Icon: SquareMousePointer,
  },
  {
    title: "지속적인 성장",
    description: "새로운 기술을 학습하고 강의를 통해 지식과 경험을 쌓고 있습니다.",
    Icon: TrendingUp,
  },
];

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
    let start: number | null = null;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // power2 easing
      const eased = 1 - Math.pow(1 - progress, 2);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <>{value.toLocaleString()}</>;
}

const H = { opacity: 0, y: 30, filter: "blur(8px)" };
const V = { opacity: 1, y: 0, filter: "blur(0px)" };

export default function HomeAbout({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useScrollFadeIn(sectionRef, "0px 0px -10% 0px");

  return (
    <div ref={sectionRef} className="flex flex-col z-11 relative">
      <div className="text-zinc-900 relative grid lg:gap-16">
        {/* 상단 인트로 */}
        <motion.div
          initial={H}
          animate={inView ? V : H}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 items-start"
        >
          <HomeSectionTitle>
            안녕하세요! <br /> <span>프론트엔드 개발자</span>&nbsp;Psh&apos; 입니다.
          </HomeSectionTitle>
        </motion.div>

        {/* 메인 레이아웃 */}
        <div className="grid lg:grid-cols-[1fr_3fr] gap-20 md:gap-15">
          <div className="relative">
            <div className="lg:sticky top-40">
              <motion.div
                initial={H}
                animate={inView ? V : H}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="max-w-[800px] text-base mb-10 leading-relaxed text-zinc-400">
                  에이전시 경험을 기반으로 사용자 중심의 직관적인 인터페이스 설계와
                  UI/UX와 기술을 아우르는 하이브리드 전문가로 성장하고 있습니다.
                </p>
                <Link
                  href={ROUTES.RESUME}
                  className="inline-flex items-center gap-2 border border-zinc-600 text-zinc-300 hover:border-zinc-300 hover:text-zinc-50 rounded-lg px-5 py-4 text-sm transition-colors"
                >
                  About me
                  <ChevronRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col gap-20">
            {/* 숫자 카드 */}
            <motion.div
              initial={H}
              animate={inView ? V : H}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid md:grid-cols-2 gap-8 md:gap-10 w-full"
            >
              {aboutData.map((e, idx) => (
                <div key={`${e.title}:${idx}`} className={cn("relative rounded-2xl group flex flex-col")}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-zinc-500 tracking-wider">value 0{idx + 1}</span>
                  </div>
                  <div className="items-center gap-20">
                    <div className="flex flex-col">
                      <h3 className="text-5xl grid grid-cols-[auto_3fr] font-semibold gap-3 items-center text-zinc-100">
                        <span className="inline-block">
                          <CountUp target={e.targetValue} inView={inView} />
                        </span>
                        {e.suffix}
                      </h3>
                    </div>
                    <p className="text-base pt-5 text-zinc-400 leading-relaxed break-keep max-w-[500px]">
                      {e.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 기타 카드 */}
            <motion.div
              initial={H}
              animate={inView ? V : H}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full"
            >
              {about_cont.map((e, idx) => (
                <div key={`${e.title}:${idx}`} className="relative rounded-2xl group">
                  <div className="relative h-full z-10">
                    <div className="flex items-start justify-between mb-2 pb-2">
                      <span className="text-xs text-zinc-500 tracking-wider">value 0{idx + 1}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-semibold flex gap-3 items-center text-zinc-100 pb-1">
                        <span className="text-xl">{e.title}</span>
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed break-keep">{e.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
