"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import FallingStarsEffect from "@/shared/effects/falling-stars";

const mainText = "항상 탐구하는 개발자";
const titlePre = "Front-end ";
const titlePost = "Developer";

export default function HomeHero() {
  return (
    <>
      {/* Background */}
      <div className="absolute w-full h-lvh overflow-hidden">
        <motion.div
          className="absolute h-lvh will-change-transform transform-gpu w-full top-0 left-0 md:inset-0 z-0 overflow-hidden bg-cover bg-bottom md:bg-center"
          initial={{ scale: 1.4, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 0.7, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }}
        >
          {/* 하단 이미지 */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-left-top z-0 [background-position-x:70%] xl:[background-position-x:0%]"
            style={{ backgroundImage: "url(/img/heros/bbt_38_1920.webp)" }}
          />
          <div
            className="absolute inset-0 w-full h-full bg-no-repeat bg-size-[auto_50rem] bg-[0rem_bottom] md:bg-size-[auto_60rem] md:bg-left-bottom xl:bg-cover z-5"
            style={{ backgroundImage: "url(/img/heros/bbt_35_1920.webp)" }}
          />
          {/* PNG 상단 이미지 */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat md:bg-bottom z-10"
            style={{ backgroundImage: "url(/img/heros/bbt_34_1920.webp)" }}
          >
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-b from-transparent via-[#171717]/70 to-[#171717] z-20" />
            <div className="absolute bg-[#171717] w-full h-[500px] top-[99%]"></div>
          </div>
        </motion.div>
      </div>

      <FallingStarsEffect />

      <section className="overflow-hidden relative">
        <div className="grid-layout md:grid flex pt-60 md:pt-75">
          <div className="leading-relaxed flex flex-col mb-10 z-1">
            <div
              data-animate
              className="flex flex-col gap-4 leading-tight z-10 break-keep items-start md:pb-20"
            >
              <div>
                {/* 메인 텍스트 */}
                <div className="inline-block text-zinc-50 font-montserrat">
                  {mainText.split("").map((ch, i) => (
                    <motion.span
                      key={`main:${i}`}
                      className="relative text-shadow-3x text-xl md:text-2xl inline-block"
                      style={{ textShadow: "0 0 30px rgba(45, 212, 191, 0.3)" }}
                      initial={{ opacity: 0, y: 50, rotateX: -90, filter: "blur(20px)" }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                      transition={{ delay: 1.1 + i * 0.03, duration: 0.4, ease: "easeOut" }}
                    >
                      {ch === " " ? " " : ch}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row font-bold">
                  {/* Front-end */}
                  <div className="w-full flex mt-3 text-zinc-50 font-montserrat">
                    {titlePre.split("").map((ch, i) => (
                      <motion.span
                        key={`pre:${i}`}
                        className="relative inline-block text-[clamp(3rem,5vw,4rem)]"
                        initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 1.5 + i * 0.035, duration: 0.5, ease: "easeOut" }}
                      >
                        {ch === " " ? " " : ch}
                      </motion.span>
                    ))}
                  </div>
                  {/* Developer */}
                  <div className="w-full flex mt-3 text-zinc-50 font-montserrat">
                    {titlePost.split("").map((ch, i) => (
                      <motion.span
                        key={`post:${i}`}
                        className="relative inline-block text-[clamp(3rem,5vw,4rem)]"
                        initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 1.7 + i * 0.035, duration: 0.5, ease: "easeOut" }}
                      >
                        {ch === " " ? " " : ch}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <motion.div
                className="grid grid-cols-[1fr_auto] text-zinc-200 z-10 mt-10"
                initial={{ x: -30, opacity: 0, filter: "blur(10px)" }}
                animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 2.2, duration: 0.7, ease: "easeOut" }}
              >
                <div>
                  <p className="text-base md:text-base text-indigo-100">
                    프론트앤드 개발과 퍼블리싱을 주로 다룹니다
                  </p>
                  <p className="text-base text-zinc-500 mt-2">
                    React.js ㆍ Next.js ㆍ Tailwind ㆍ Python
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sub Nav & Work Summary */}
            <motion.div
              className="grid md:grid-cols-2 pb-10 pt-10"
              initial={{ x: -30, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex gap-4">
                <Link
                  href={ROUTES.WORK}
                  className="text-sm text-zinc-300 hover:text-zinc-50 border border-zinc-700 hover:border-zinc-400 rounded-full px-4 py-2 transition-colors"
                >
                  Work
                </Link>
                <Link
                  href={ROUTES.RESUME}
                  className="text-sm text-zinc-300 hover:text-zinc-50 border border-zinc-700 hover:border-zinc-400 rounded-full px-4 py-2 transition-colors"
                >
                  Resume
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
