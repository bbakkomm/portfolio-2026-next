import { cn } from "@/shared/lib/cn";
import { Box } from "lucide-react";

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

const STACK_SRC: Record<StackName, string> = {
  "next.js": "/stack/next.svg",
  "nest.js": "/stack/nestjs.svg",
  javascript: "/stack/javascript.svg",
  typescript: "/stack/typescript.svg",
  scss: "/stack/sass.svg",
  git: "/stack/git.svg",
  php: "/stack/php.svg",
  react: "/stack/react.svg",
  tailwind: "/stack/tailwindcss.svg",
  jquery: "/stack/jquery.svg",
  "styled-component": "/stack/styledcomponents.svg",
  figma: "/stack/figma.svg",
  zod: "/stack/zod.svg",
  "react-query": "/stack/reactquery.svg",
  typeorm: "/stack/typeorm.svg",
  drizzleorm: "/stack/drizzle.svg",
  supabase: "/stack/supabase.svg",
  "react-hook-form": "/stack/reacthookform.svg",
  postgresql: "/stack/postgresql.svg",
  axios: "/stack/axios.svg",
  photoshop: "/stack/photostop.svg",
  aws: "/stack/aws.svg",
  vercel: "/stack/vercel.svg",
  docker: "/stack/docker.svg",
  vitest: "/stack/vitest.svg",
  zustand: "/stack/zustand.svg",
  gsap: "/stack/gsap.svg",
  tiptap: "/stack/tiptap.svg",
  bootstrap: "/stack/bootstrap.svg",
  nextauth: "/stack/nextauth.svg",
  "node.js": "/stack/node.svg",
  python: "/stack/python.svg",
  "claude-code": "/stack/claude.svg",
  mysql: "/stack/mysql.svg",
  phpmyadmin: "/stack/phpmyadmin.svg",
};

const STACK_ALIASES: Record<string, StackName> = {
  "styled-components": "styled-component",
  styledcomponents: "styled-component",
  "tanstack@query": "react-query",
  reactquery: "react-query",
  reacthookform: "react-hook-form",
  claudecode: "claude-code",
  claude: "claude-code",
  sass: "scss",
};

interface StackIconMapperProps {
  stackName: string;
  className?: string;
}

export default function StackIconMapper({ stackName, className }: StackIconMapperProps) {
  const normalized = stackName.toLowerCase().replace(/\s+/g, "");
  const mappedName = (STACK_ALIASES[normalized] || normalized) as StackName;
  const src = STACK_SRC[mappedName];

  if (!src) {
    return <Box className={cn("size-3 text-zinc-400", className)} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={stackName}
      aria-hidden="true"
      className={cn("size-3", className)}
    />
  );
}
