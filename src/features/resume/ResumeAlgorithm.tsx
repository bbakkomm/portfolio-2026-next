"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./components/SectionLabel";
import { CONTESTS, CONTESTS_INITIAL_SHOW } from "./constants/contests";

const ResumeAlgorithm = () => {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = CONTESTS.length - CONTESTS_INITIAL_SHOW;
  const visibleContests = expanded ? CONTESTS : CONTESTS.slice(0, CONTESTS_INITIAL_SHOW);

  return (
    <section>
      <SectionLabel>Algorithm &amp; Problem Solving</SectionLabel>

      <h2 className="text-[22px] font-bold tracking-[-0.018em] text-zinc-50 mb-3 mt-0">
        백준 / solved.ac
      </h2>

      <p className="text-zinc-300 text-[14.5px] leading-[1.85] mb-0 break-keep">
        꾸준한 알고리즘 학습과 문제 해결 감각 유지를 위해 백준 온라인 저지에서{" "}
        <strong className="text-zinc-50 font-semibold">989문제</strong>를 풀어왔습니다.
        주언어는 TypeScript이며, 구현·수학·문자열·자료구조 위주로 풀이 경험을 쌓았습니다.
      </p>

      {/* Streak */}
      <div className="my-6 py-5 border-t border-b border-zinc-800">
        <div className="flex flex-wrap items-baseline gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-bold text-zinc-50 tracking-[-0.015em] leading-none">308</span>
            <span className="text-[13.5px] text-zinc-300">일 연속</span>
          </div>
          <p className="flex-1 min-w-[220px] text-zinc-400 text-[13.5px] leading-[1.7] m-0 break-keep">
            바쁜 실무 사이에서도 하루도 거르지 않고 매일 한 문제 이상 풀어내며,
            꾸준함을 실력의 기본기로 삼고 있습니다.
          </p>
        </div>
      </div>

      {/* Contests */}
      <div className="mt-10">
        <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-zinc-50 mb-1.5 mt-0">
          사설 알고리즘 대회 참가
        </h3>
        <p className="text-[13.5px] text-zinc-400 mt-1.5 mb-3 break-keep">
          각 대학 경시대회 Open Contest에 출전 문제 해결
        </p>

        <ul className="list-none p-0 m-0">
          {visibleContests.map((contest, i) => (
            <li
              key={i}
              className="relative pl-[18px] py-2.5 before:content-[''] before:absolute before:left-0 before:top-[22px] before:size-[5px] before:rounded-full before:bg-zinc-300"
            >
              <div className="font-semibold text-[15px] text-zinc-50">{contest}</div>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 bg-transparent border border-zinc-700 text-zinc-300 text-[13px] px-4 py-2 rounded-full cursor-pointer transition-colors hover:border-pink-400 hover:text-pink-400"
          >
            {expanded ? "접기" : `더보기 (+${hiddenCount})`}
          </button>
        )}
      </div>

      <a
        href="https://solved.ac/profile/bbakkomm"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 text-[14px] text-zinc-300 border-b border-zinc-400 pb-1.5 transition-colors hover:text-pink-400 hover:border-pink-400 group"
      >
        solved.ac/profile/bbakkomm
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  );
};

export default ResumeAlgorithm;
