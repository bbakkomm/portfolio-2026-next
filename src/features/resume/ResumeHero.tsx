"use client";

import { motion } from "framer-motion";

const line1 = "프론트엔드 개발자,";
const line2 = "박성훈 입니다.";

export default function ResumeHero() {
  return (
    <section className="pt-6">
      <h1 className="text-[28px] md:text-[34px] font-bold tracking-[-0.02em] leading-[1.35] text-zinc-50 m-0">
        <span className="block">
          {line1.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, x: 50, filter: "blur(15px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.01, duration: 0.9, ease: "easeOut" }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </span>
        <span className="block">
          {line2.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              initial={{ opacity: 0, x: 30, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.02, duration: 1.0, ease: "easeOut" }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.div
        className="mt-6 space-y-3"
        initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-zinc-300 text-[16.5px] leading-[1.85] m-0 break-keep">
          이전 회사에서는 삼성닷컴 통합 런칭, LG ThinQ 하이브리드앱, 사내 관리 대시보드 등
          대규모 트래픽이 발생하는 서비스의 프론트엔드를 담당했습니다.
        </p>
        <p className="text-zinc-300 text-[16.5px] leading-[1.85] m-0 break-keep">
          JavaScript / jQuery 기반의 운영·유지보수 경험을 바탕으로 React 생태계로 영역을 넓혀가며,
          모듈화·코드 리팩토링·로딩 성능 개선·접근성(TalkBack/ScreenReader) 적용 등{" "}
          <span className="text-zinc-50 font-normal">유지 가능하고 견고한 프론트엔드</span>를 구축하기 위해
          꾸준히 역량을 확장하고 있습니다.
        </p>
      </motion.div>
    </section>
  );
}
