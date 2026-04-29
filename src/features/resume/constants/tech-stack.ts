export interface TechBadge {
  label: string;
  abbr: string;
  bg: string;
  color?: string;
}

export interface TechCategory {
  title: string;
  desc: string;
  badges: TechBadge[];
  points: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    title: "Front-end",
    desc: "실무에서 가장 많은 시간을 보낸 영역입니다. 마크업·스타일·인터랙션 전반에서 성능과 유지보수성을 최우선으로 고려해 코드를 작성합니다.",
    badges: [
      { label: "HTML5", abbr: "H", bg: "#e34f26" },
      { label: "CSS3", abbr: "C", bg: "#1572b6" },
      { label: "JavaScript", abbr: "JS", bg: "#f7df1e", color: "#111" },
      { label: "jQuery", abbr: "jQ", bg: "#0769ad" },
      { label: "React", abbr: "⚛", bg: "#61dafb", color: "#111" },
      { label: "TypeScript", abbr: "TS", bg: "#3178c6" },
      { label: "Tailwind", abbr: "tw", bg: "#38bdf8", color: "#111" },
      { label: "Sass", abbr: "S", bg: "#cc6699" },
      { label: "GSAP", abbr: "G", bg: "#88ce02", color: "#111" },
    ],
    points: [
      "모듈화·유연한 함수 분리로 매월 변경되는 요구사항 대응",
      "대용량 데이터 분기처리 및 차트 모듈 직접 제작",
      "Resize·Lazy·코드 리팩토링으로 페이지 로딩 속도 개선",
      "TalkBack·ScreenReader 접근성 적용 경험",
      "React 기반 구조 설계, useBlocker·moment를 활용한 사용자 행동 추적",
    ],
  },
  {
    title: "Server / Data",
    desc: "PHP·MySQL 기반의 풀스택 단독 런칭 경험과 Python으로 사내 반복 업무를 자동화한 경험이 있습니다.",
    badges: [
      { label: "PHP", abbr: "P", bg: "#777bb4" },
      { label: "MySQL", abbr: "M", bg: "#4479a1" },
      { label: "Python", abbr: "Py", bg: "#3776ab" },
      { label: "Selenium", abbr: "Se", bg: "#306998" },
      { label: "OpenCV", abbr: "cv", bg: "#5586a4" },
    ],
    points: [
      "phpMyAdmin·MySQL 직접 설계 및 마이그레이션",
      "CRUD API 설계 / 캘린더·예약 시스템 바인딩",
      "Python-docx, Openpyxl, PIL로 사내 자동화 .exe 배포",
      "cv2 + pytesseract OCR 자동 로그인 / Selenium 일일보고서 자동화",
    ],
  },
  {
    title: "Infra & Tooling",
    desc: "형상관리·CI 도구와 디자인 협업 도구를 일상적으로 사용합니다.",
    badges: [
      { label: "Git", abbr: "G", bg: "#f05032" },
      { label: "GitHub", abbr: "GH", bg: "#181717" },
      { label: "Jira", abbr: "J", bg: "#0052cc" },
      { label: "Confluence", abbr: "Co", bg: "#172b4d" },
      { label: "Figma", abbr: "F", bg: "#f24e1e" },
      { label: "Adobe", abbr: "Ad", bg: "#ff7c00" },
    ],
    points: [
      "Git·SVN 기반 브랜치 관리 / Jira·Confluence 협업",
      "Figma·Adobe Tool 기반 시안 제작 및 예시 디자인",
    ],
  },
  {
    title: "Security (이전 경력)",
    desc: "BC카드 상주 보안관제 경력으로 정상/비정상 트래픽을 빠르게 식별하는 감각을 습득했습니다.",
    badges: [
      { label: "FireEYE", abbr: "FE", bg: "#c8102e" },
      { label: "TippingPoint", abbr: "TP", bg: "#f5a623", color: "#111" },
      { label: "SIEM", abbr: "SI", bg: "#0a3d62" },
    ],
    points: [
      "FireEYE EX/NX, Spamsniper, TippingPoint 운영",
      "SIEM 기반 이벤트 분석, 패턴 룰 생성 및 수정",
    ],
  },
];
