import Resume from "@/features/resume/Resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "프론트엔드 개발자 박성훈의 이력서입니다. 기술 스택, 경력, 프로젝트 이력을 확인하세요.",
  openGraph: {
    title: "Resume | Psh' Portfolio",
    description: "프론트엔드 개발자 박성훈의 이력서입니다.",
    images: [{ url: "/img/meta.jpg", width: 1200, height: 630, alt: "Psh' Portfolio Resume" }],
  },
};

export default function ResumePage() {
  return <Resume />;
}
