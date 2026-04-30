import { cn } from "@/shared/lib/cn";
import { Box } from "lucide-react";
import {
  siNextdotjs,
  siNestjs,
  siNodedotjs,
  siReact,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siSass,
  siGsap,
  siVitest,
  siZod,
  siReactquery,
  siReacthookform,
  siPostgresql,
  siSupabase,
  siDrizzle,
  siDocker,
  siVercel,
  siGit,
  siFigma,
  siPython,
  siClaude,
  siJquery,
  siMysql,
  siPhpmyadmin,
  siPhp,
  siAxios,
  siStyledcomponents,
  siTypeorm,
  siBootstrap,
  siGithub,
  siJira,
  siConfluence,
  siHtml5,
  siCss,
  siSelenium,
  siOpencv,
  siGreensock,
  siWordpress,
} from "simple-icons";

// HomeStack에서 타입 참조용으로 사용
export type StackName =
  | "next.js"
  | "nest.js"
  | "javascript"
  | "typescript"
  | "scss"
  | "git"
  | "php"
  | "react"
  | "tailwind"
  | "jquery"
  | "styled-component"
  | "figma"
  | "zod"
  | "react-query"
  | "typeorm"
  | "drizzleorm"
  | "supabase"
  | "react-hook-form"
  | "postgresql"
  | "axios"
  | "photoshop"
  | "aws"
  | "vercel"
  | "docker"
  | "vitest"
  | "zustand"
  | "gsap"
  | "tiptap"
  | "bootstrap"
  | "nextauth"
  | "node.js"
  | "python"
  | "claude-code"
  | "mysql"
  | "phpmyadmin";

type SiIcon = { path: string; hex: string; title: string };

// simple-icons 아이콘 lookup (정규화된 slug → 아이콘)
const SI_LOOKUP: Record<string, SiIcon> = {
  nextdotjs: siNextdotjs,
  nestjs: siNestjs,
  nodedotjs: siNodedotjs,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  sass: siSass,
  gsap: siGsap,
  vitest: siVitest,
  zod: siZod,
  reactquery: siReactquery,
  reacthookform: siReacthookform,
  postgresql: siPostgresql,
  supabase: siSupabase,
  drizzle: siDrizzle,
  docker: siDocker,
  vercel: siVercel,
  git: siGit,
  figma: siFigma,
  python: siPython,
  claude: siClaude,
  jquery: siJquery,
  mysql: siMysql,
  phpmyadmin: siPhpmyadmin,
  php: siPhp,
  axios: siAxios,
  styledcomponents: siStyledcomponents,
  typeorm: siTypeorm,
  bootstrap: siBootstrap,
  github: siGithub,
  jira: siJira,
  confluence: siConfluence,
  html5: siHtml5,
  css: siCss,
  selenium: siSelenium,
  opencv: siOpencv,
  greensock: siGreensock,
  wordpress: siWordpress,
};

// normalize된 키가 simple-icons slug와 다를 때만 매핑
const SI_SLUG_MAP: Record<string, string> = {
  nextjs: "nextdotjs",
  nodejs: "nodedotjs",
  tailwind: "tailwindcss",
  scss: "sass",
  drizzleorm: "drizzle",
  claudecode: "claude",
  styledcomponent: "styledcomponents",
  tanstackquery: "reactquery",
  css3: "css",
};

// simple-icons에 없는 아이콘: 기존 로컬 SVG 사용
const LOCAL_SRC: Record<string, string> = {
  nextauth: "/stack/nextauth.svg",
  aws: "/stack/aws.svg",
  photoshop: "/stack/photostop.svg",
  tiptap: "/stack/tiptap.svg",
  zustand: "/stack/zustand.svg",
};

// 정규화: 소문자 + 공백/점/하이픈/언더스코어/@ 제거
const normalize = (s: string) => s.toLowerCase().replace(/[\s._@-]/g, "");

// 다크 배경에서 보이지 않는 어두운 brand color → 흰색으로 대체
function pickFill(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.18 ? "#ffffff" : `#${hex}`;
}

interface StackIconMapperProps {
  stackName: string;
  className?: string;
}

export default function StackIconMapper({ stackName, className }: StackIconMapperProps) {
  const normalized = normalize(stackName);
  const siSlug = SI_SLUG_MAP[normalized] ?? normalized;
  const siIcon = SI_LOOKUP[siSlug];

  if (siIcon) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn("size-3", className)}
        aria-hidden="true"
        role="img"
      >
        <title>{siIcon.title}</title>
        <path d={siIcon.path} fill={pickFill(siIcon.hex)} />
      </svg>
    );
  }

  const localSrc = LOCAL_SRC[normalized];
  if (localSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={localSrc}
        alt={stackName}
        aria-hidden="true"
        className={cn("size-3", className)}
      />
    );
  }

  return <Box className={cn("size-3 text-zinc-400", className)} />;
}
