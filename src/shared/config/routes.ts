// Next.js는 파일 기반 라우팅을 사용하므로 경로 문자열 상수만 정의합니다.

export const ROUTES = {
  HOME: "/",
  WORK: "/work",
  RESUME: "/resume",
  LOGIN: "/login",
  ADMIN: "/admin",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

// ─── 네비게이션 링크 배열 ────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  /** true이면 인증된 사용자에게만 노출 */
  authOnly: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Resume", href: ROUTES.RESUME, authOnly: false },
  { label: "Work", href: ROUTES.WORK, authOnly: false },
  { label: "Admin", href: ROUTES.ADMIN, authOnly: true },
];
