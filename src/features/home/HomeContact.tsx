"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HomeContact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -10% 0px" });

  return (
    <div className="flex items-center relative w-full">
      <motion.div
        ref={ref}
        className="absolute grayscale inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/heros/bbt_52_1920.webp)" }}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className="absolute bottom-0 w-full left-0 h-full z-0 bg-linear-to-b from-transparent via-[#171717]/20 to-[#171717]" />
        <div className="absolute bottom-0 w-full left-0 h-1/2 top-0 z-0 bg-linear-to-b to-transparent via-[#171717]/80 from-[#171717]" />
        <div className="absolute bottom-0 w-full left-0 h-full top-0 z-0 bg-linear-to-l to-transparent via-[#171717]/50 from-[#171717]" />
      </motion.div>

      <div className="grid-layout mb-5 grid md:grid-cols-2 py-25 relative">
        <motion.div
          className="z-2 w-full flex flex-col gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <h2 className="text-zinc-50 text-3xl font-semibold leading-relaxed">
            프로젝트의 목표를 <br />
            함께 완성해 나갈 동료가 되겠습니다
          </h2>
          <p className="text-zinc-400 max-w-[500px] leading-relaxed">
            단순히 코드를 작성하는 것을 넘어, 비즈니스의 성공을 함께 고민하는
            동료를 찾으신다면, 기꺼이 그 여정에 함께하고 싶습니다.
          </p>
          <div className="inline-block relative">
            <div className="flex divide-x divide-zinc-50/20 text-zinc-300 mb-10">
              <div className="text-sm flex flex-col gap-1 pl-5 border-l border-zinc-700">
                <div>010 4105 4301</div>
                <div>bbakkomm@gmail.com</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
