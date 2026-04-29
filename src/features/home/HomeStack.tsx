"use client";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import StackIconMapper, { type StackName } from "@/shared/components/stack-icon-mapper";
import HomeStackGraph from "./HomeStackGraph";
import HomeSectionTitle from "./HomeSectionTitle";

type StackItem = { name: StackName; description: string };
type StackGroup = {
  category: "Front-end" | "Server Stack" | "Infra & Design Tool" | "AI & Automation";
  trigger: string;
  stacks: StackItem[];
};

const STACKS: StackGroup[] = [
  {
    category: "Front-end",
    trigger:
      "최신 프론트엔드 흐름을 반영하며 구조적 설계와 사용자 경험, 렌더링 최적화에 초점을 두고 개발하며 빠른 퍼블리싱과 인터렉티브 UI를 구현하는 것을 즐깁니다.",
    stacks: [
      { name: "typescript", description: "제네릭과 유틸리티 타입으로 안정성 확보" },
      { name: "next.js", description: "App Router 기반 캐싱 설계 및 트래픽 절약" },
      { name: "react", description: "컴포넌트 기반 설계와 상태 관리 중심 UI 구현" },
      { name: "react-query", description: "비동기 상태 관리 및 캐싱 핸들링" },
      { name: "zustand", description: "가벼운 전역 상태 관리" },
      { name: "react-hook-form", description: "폼 상태 관리 및 유효성 최적화" },
      { name: "zod", description: "데이터 스키마 및 폼 유효성 검증" },
      { name: "gsap", description: "Reflow 최소화 인터랙션 및 스크롤 애니메이션" },
      { name: "tailwind", description: "유틸리티 기반 퍼블리싱 및 디자인 시스템화" },
      { name: "scss", description: "모듈 단위 스타일 관리" },
      { name: "vitest", description: "컴포넌트 단위 테스트 및 안정성 보장" },
      { name: "nextauth", description: "빠른 인증인가와 Token 관리" },
    ],
  },
  {
    category: "Server Stack",
    trigger:
      "프론트엔드 개발자로서 백엔드 아키텍처와 데이터 흐름을 이해하며, 협업 과정의 효율성과 기술적 시야를 넓혀가고 있습니다.",
    stacks: [
      { name: "node.js", description: "API 및 서버 환경 구성" },
      { name: "nest.js", description: "Layered 구조와 Guard, DTO 설계" },
      { name: "drizzleorm", description: "타입 안전한 ORM 기반 쿼리 및 마이그레이션" },
      { name: "postgresql", description: "RDBMS·트랜잭션 기반 데이터 관리" },
      { name: "supabase", description: "BaaS 인증 및 스토리지 관리" },
    ],
  },
  {
    category: "Infra & Design Tool",
    trigger:
      "배포 및 인프라 환경에 대한 시야를 넓히고 안정적인 서비스 구현을 하기 위해 정진하고 있습니다.",
    stacks: [
      { name: "aws", description: "S3·CloudFront 기반 CDN 및 배포 관리" },
      { name: "git", description: "브랜치 전략 및 버전 관리 협업" },
      { name: "vercel", description: "서버리스 배포 및 Git 연동" },
      { name: "docker", description: "테스트 환경 통일 및 docker-compose CI 환경 구성" },
      { name: "figma", description: "UI 프로토타입 설계" },
      { name: "photoshop", description: "웹용 에셋 제작 및 그래픽 리소스 관리" },
    ],
  },
  {
    category: "AI & Automation",
    trigger:
      "AI 도구를 활용한 개발 효율화와 자동화에 관심을 가지고, 일상적인 워크플로우에 적용하며 프로덕트 품질을 끌어올리는 데 활용합니다.",
    stacks: [
      { name: "python", description: "데이터 처리 및 자동화 스크립트 작성" },
      { name: "claude-code", description: "AI 페어 프로그래밍 및 리뷰 자동화" },
    ],
  },
];

export default function HomeStack() {
  return (
    <div className="grid">
      <HomeSectionTitle>Stack</HomeSectionTitle>
      <p className="max-w-[80%] md:max-w-[700px] text-base mb-8 text-zinc-400 leading-relaxed break-keep">
        최신 프론트엔드 트렌드를 반영해 구조적 설계와 렌더링 최적화에 집중하고,
        협업과 서비스 품질 향상을 위해 백엔드와 인프라를 함께 이해하며 개발합니다.
      </p>
      <ul className="gap-16 grid">
        <div className="grid grid-cols-1">
          <div className="col-span-full">
            <HomeStackGraph />
          </div>
          <div className="grid grid-cols-1 gap-20 mt-20">
            {STACKS.map(({ category, stacks, trigger }, i) => (
              <li
                key={`${category}-${i}`}
                className={cn("rounded-lg flex flex-col items-start")}
              >
                <div className="flex flex-col mb-6">
                  <h3 className="flex items-center gap-2 text-xl mb-4">
                    <span className={cn("text-zinc-200 font-semibold font-montserrat")}>
                      {category}
                    </span>
                    {category === "Front-end" && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-pink-400">
                        <Check />
                      </span>
                    )}
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-[450px] leading-relaxed break-keep">
                    {trigger}
                  </p>
                </div>

                <div className={cn("gap-2 w-full")}>
                  <div className="max-w-[750px] flex flex-wrap gap-2">
                    {stacks.map(({ name, description }, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center p-2 bg-zinc-800/30 gap-3 rounded-lg transition-colors">
                            <StackIconMapper
                              stackName={name}
                              className="size-5 text-zinc-300 transition-all"
                            />
                            <span className="text-xs text-zinc-400">
                              {name}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-pink-400 text-zinc-50 border border-pink-300 shadow-md text-xs" arrowClassName="bg-pink-400 fill-pink-400">
                          <span className="font-semibold">{name}</span>
                          <br />
                          {description}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
