# portfolio-2026-next

디자인은 [phm6530/portfolio-ver-2025](https://github.com/phm6530/portfolio-ver-2025) 클론, 내부는 학습 목적의 풀-리빌드.
레퍼런스가 Vite + React 18 SPA였다면, 이쪽은 **Next.js 16 + React 19 + Supabase SSR + 자가 호스팅**으로 옮겼다.

**라이브** → `https://parklab.synology.me`

---

## 프로젝트 의도

디자인 의사결정의 부담을 레퍼런스에 위임하고, 그 여백을 스택 결정·인프라 학습에 투자했다.

- **디자인은 따라가되 내부 스택·구조·배포는 직접 결정** — 라우팅·폴더 구조·인증·DB·배포 모두 재설계.
- **운영 가능한 콘텐츠 환경** — 어드민 + TipTap 에디터 + Supabase Postgres. 글 추가에 재배포 불필요.
- **인프라까지 직접 만든다** — 보유 중인 Synology NAS를 호스트로 삼아 `git push` 한 번으로 빌드·배포·알림이 끝나는 파이프라인 구축.

---

## 기술 스택

| 영역 | 선택 | 이유(요약) |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) + React 19 | RSC / Server Actions / 메타데이터 / 캐시 모델 학습 |
| 인증 | Supabase Auth + `proxy.ts` 가드 | 인증 책임 위임, `ADMIN_EMAIL` 단일 가드로 운영 |
| Supabase | `@supabase/ssr` 0.10.2 (browser/RSC/proxy 분리) | RSC 환경에서 쿠키·세션 처리 분리 |
| 폴더 구조 | Feature-Sliced Design | 의존 방향 강제 학습 |
| 콘텐츠 | Supabase Postgres + TipTap 어드민 | 어드민에서 직접 작성·수정, 재배포 불필요 |
| 상태 | TanStack Query 5 + Zustand 5 + Server Actions | 서버 상태 / 클라이언트 UI 상태 분리 |
| 검증 | Zod 4 + react-hook-form | 스키마-타입 일원화 |
| 스타일 | Tailwind v4 + `@theme` oklch 토큰, 다크모드 강제 | 토큰 시스템화 시도 |
| 배포 | GitHub Actions → GHCR → Watchtower → Synology NAS + Telegram 알림 | `git push` 한 번으로 빌드/배포/알림 |

---

## 폴더 구조 (FSD)

```
src/
  app/          # 라우트
    (public)/   # 공개 라우트 그룹
    (admin)/    # 어드민 라우트 그룹
  widgets/      # 페이지 단위 합성 컴포넌트
  features/     # 도메인별 동작 단위
  entities/     # 도메인 모델/엔티티
  shared/       # 공통 UI·유틸·Supabase 클라이언트
  proxy.ts      # 세션 갱신 + 어드민 가드 (구 middleware.ts — Next.js 16부터 명칭 변경)
```

---

## 시작하기

**요구사항**: Node 20+, pnpm 10.33.0(`packageManager`로 강제), Supabase 프로젝트

### 환경변수

`.env.example` 을 복사해 `.env.local` 을 만든다.

| 변수 | 필수 | 용도 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `NEXT_PUBLIC_IMAGE_URL` | ✅ | Supabase Storage 이미지 베이스 URL |
| `NEXT_PUBLIC_SITE_URL` | ✅ | 배포 도메인 (SEO/OG 메타용) |
| `NEXT_PUBLIC_API_MOCKING` | ✅ | MSW 모킹 (`enabled` / `disabled`) |
| `ADMIN_EMAIL` | ✅ | 어드민 계정 이메일 — **`NEXT_PUBLIC_` 접두사 절대 금지** (클라이언트 번들 노출) |

### 명령어

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
pnpm analyze      # 번들 크기 분석
```

---

## 배포 파이프라인

```
git push
  └─ GitHub Actions (build + push)
       └─ GHCR (이미지 저장)
            └─ Watchtower (5분 polling, 다이제스트 비교)
                 └─ Synology NAS (컨테이너 무중단 교체)
                      └─ DSM Reverse Proxy (443/HTTPS, Let's Encrypt)
  └─ GitHub Actions (마지막 step)
       └─ Telegram Bot API (커밋 메시지·작성자·상태 알림)
```

빌드는 GitHub Actions 러너가 처리해 NAS 부하를 0으로 유지. Watchtower는 이미지 다이제스트 변경 시에만 교체를 수행한다.

---

## 이 스프린트에서 배운 것

- **Next.js 16 라우트 캐시 모델** — `revalidatePath`의 `'page'` vs `'layout'` 차이를 디버깅으로 직접 체득.
- **Server Actions + RSC 사고 전환** — 폼 제출이 서버 렌더링 트리거가 된다는 감각.
- **자가 호스팅 도커 파이프라인 전체 그림** — 빌드·저장·polling·교체·SSL 흐름을 처음으로 직접 구성.
- **로컬 vs CI 환경 차이** — pnpm 버전 불일치, `patches/` 폴더 누락, `NEXT_PUBLIC_*` 빌드타임 베이킹은 모두 "내 노트북에서는 되는데"가 통하지 않는 영역.


---

## 레퍼런스

- 디자인 레퍼런스: [phm6530/portfolio-ver-2025](https://github.com/phm6530/portfolio-ver-2025)
