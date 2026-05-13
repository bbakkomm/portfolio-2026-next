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
    desc: "실무에서 가장 많은 시간을 보낸 영역입니다. 매월 변경되는 운영 요구사항에 견디는 구조 설계와, 인수인계가 가능한 코드를 만드는 것을 우선합니다.",
    badges: [
      { label: "jQuery", abbr: "jQ", bg: "#0769ad" },
      { label: "React", abbr: "⚛", bg: "#61dafb", color: "#111" },
      { label: "Next.js", abbr: "N", bg: "#000" },
      { label: "TypeScript", abbr: "TS", bg: "#3178c6" },
      { label: "Tailwind", abbr: "tw", bg: "#38bdf8", color: "#111" },
      { label: "Sass", abbr: "S", bg: "#cc6699" },
      { label: "GSAP", abbr: "G", bg: "#88ce02", color: "#111" },
    ],
    points: [
      "모듈화·유연한 함수 분리로 매월 변경되는 요구사항 대응",
      "클래스 기반 구조 설계로 다중 인스턴스·재사용 가능한 모듈 운영",
      "대용량 데이터 분기처리 및 차트 모듈 직접 제작",
      "차트 라이브러리 호환성 이슈 대응을 위한 라이브러리 이관·재설계 경험",
      "TalkBack·ScreenReader 접근성 적용 경험"
    ],
  },
  {
    title: "Server / Data",
    desc: "PHP·MySQL 기반의 단독 사이트 런칭 경험과, 운영 인력의 반복 업무를 Python 도구로 끊어내는 작업 경험이 있습니다.",
    badges: [
      { label: "PHP", abbr: "P", bg: "#777bb4" },
      { label: "MySQL", abbr: "M", bg: "#4479a1" },
      { label: "Python", abbr: "Py", bg: "#3776ab" },
      { label: "Selenium", abbr: "Se", bg: "#306998" },
      { label: "OpenCV", abbr: "cv", bg: "#5586a4" },
    ],
    points: [
      "MySQL/phpMyAdmin 기반 DB 직접 설계 및 데이터 마이그레이션 (15개+ 클라이언트 사이트)",
      "CRUD API 설계 / 캘린더·예약·다국어 게시판 시스템 바인딩",
      "Python 자동화 도구 사내 배포 (PyInstaller exe 패키징, 비개발자가 직접 실행)",
      "cv2·pytesseract OCR 자동 로그인 / Selenium 운영 Admin 일일 데이터 수집 자동화",
      "Python-docx · Openpyxl · PIL로 Word·Excel·이미지 반복 작업 자동화"
    ],
  },
  {
    title: "Infra & Tooling",
    desc: "협업·형상관리 도구를 일상적으로 사용하며, 프로젝트 킥오프 시점에 팀이 같은 컨텍스트에서 일할 수 있도록 인프라를 직접 세팅한 경험이 있습니다.",
    badges: [
      { label: "Git", abbr: "G", bg: "#f05032" },
      { label: "GitHub", abbr: "GH", bg: "#181717" },
      { label: "GitLab", abbr: "GL", bg: "#fc6d26" },
      { label: "Jira", abbr: "J", bg: "#0052cc" },
      { label: "Figma", abbr: "F", bg: "#f24e1e" },
      { label: "Adobe", abbr: "Ad", bg: "#ff7c00" },
    ],
    points: [
      "Git·SVN 기반 브랜치 관리, GitHub·GitLab 운영",
      "프로젝트 킥오프 시 Jira·Confluence·GitLab을 고객사 요구에 맞춰 직접 세팅·커스터마이징",
      "Figma·Adobe Tool 기반 시안 제작 및 예시 디자인"
    ],
  },
  {
    title: "Security (이전 경력)",
    desc: "BC카드 보안관제 센터 1년 상주 경력으로, 24시간 모니터링 환경에서 정상/비정상 트래픽을 빠르게 식별하는 감각과 반복 업무를 자동화 도구로 정리해두는 습관을 얻었습니다.",
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
