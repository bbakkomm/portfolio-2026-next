디자인이 마음에 들었던 [phm6530/portfolio-ver-2025](https://github.com/phm6530/portfolio-ver-2025)를 레퍼런스로 삼아 진행한 포트폴리오 클론 코딩. 디자인 톤은 거의 그대로 따라가되 내부는 학습 목적으로 완전히 재구성했다. 레퍼런스가 Vite + React 18 SPA + S3 배포였다면, 작업본은 **Next.js 16 + React 19 + Supabase SSR**로 옮기고 폴더 구조는 **FSD**로 갈아엎었으며, 배포는 Vercel 대신 **시놀로지 NAS + GitHub Actions + Watchtower + 텔레그램 알림**으로 직접 만들었다. 1차 사용자는 채용 담당자와 동료 개발자다.

## Problem & Context 🔍

포트폴리오 레퍼런스를 찾던 중 phm6530의 사이트 디자인이 마음에 들었다. 카드 레이아웃, 별 애니메이션, GSAP 패럴렉스, 캐러셀의 호흡이 모두 내가 표현하고 싶은 톤과 맞았다. 거기에 더해, **퍼블리셔 출신으로 프론트엔드로 넘어온 비슷한 커리어 궤적**을 가진 분이라는 점이 한 번 더 끌어당겼다. 같은 출발선에서 어떤 결정을 거쳐 어디까지 왔는지를 직접 따라가보는 일 자체가 학습이 되는 셈이었다. 그렇다고 그대로 베끼는 건 학습 가치가 없다. 디자인 톤은 따라가되, 내부 스택과 폴더 구조 그리고 배포 파이프라인은 직접 다시 결정하기로 했다. 클론 코딩은 디자인 의사결정의 부담을 덜고 그만큼의 분량을 **스택 결정과 인프라 학습에 투자할 수 있게 해주는 도구**로 잡았다.

레퍼런스 레포를 직접 열어보면 다음과 같은 구성이었다.

- Vite 5 + React 18 SPA, `tsc && vite build` 단일 빌드
- 라우팅은 `react-router-dom 6`, 인증은 `bcryptjs` + `jwt-decode` 로 자체 JWT 검증
- 폼 검증은 Yup + Zod 3가 혼재, 차트는 apexcharts, 3D 효과는 ogl, 그리드는 react-responsive-masonry, 슬라이드는 swiper
- 배포는 GitHub Actions에서 빌드 후 S3로 추정되는 정적 배포

이 구성은 그 자체로 충분히 합리적이지만, 내가 학습하고 싶은 영역과는 결이 달랐다. 나는 SSR과 Server Components, Server Actions, 라우트별 캐시 무효화, 그리고 자가 호스팅 인프라를 한 번에 다루고 싶었다. SPA 기반의 레퍼런스를 그대로 따라가면 그 학습 기회가 통째로 사라진다.

**문제점**

- 레퍼런스의 SPA 구조 — 첫 로드에서 메타데이터·OG 태그·SEO를 직접 만들어야 함. Next.js의 메타데이터 API와 비교 학습이 불가능
- 레퍼런스의 자체 JWT 인증 — 토큰 만료/리프레시/저장 위치 결정을 모두 직접 해야 함. 어드민 1명이 쓰는 사이트에 비해 운영 비용이 큼
- 레퍼런스의 단일 폴더 구조 — 한 번에 다 보이는 장점은 있지만, 의존 방향이나 도메인 경계를 강제할 장치가 없음
- 콘텐츠가 정적 파일에 묶이면 글을 추가할 때마다 재배포가 필요 — 어드민에서 직접 운영하는 흐름이 안 만들어짐
- Vercel에 맡기면 편하지만, 도커 / 역방향 프록시 / 인증서 / 컨테이너 오케스트레이션 같은 인프라 학습이 통째로 빠짐

**핵심 요구사항**

1. **디자인 충실도와 내부 재구성을 분리한다** — 디자인은 레퍼런스를 따라가되, 라우팅·데이터 모델·폴더 구조·배포는 모두 직접 결정한다.
2. **운영 가능한 콘텐츠 환경을 만든다** — 어드민에서 글을 작성·수정·발행할 수 있고, 본문은 TipTap으로 편집한다. 글 추가에 재배포 불필요.
3. **인프라까지 직접 만진다** — 보유 중인 시놀로지 NAS를 호스트로 삼아, `git push` 한 번으로 빌드·배포·알림이 끝나는 파이프라인을 만든다.

## Goals & Constraints 🎯

2026년 시점 1인 작업이고, 실제 구현은 4월 29일에 시작해 4월 30일 밤까지 이어졌다. 이틀짜리 스프린트로 클론 코딩의 큰 줄기를 끝낸 뒤, 마이그레이션·인프라·품질 페이즈를 의식적으로 단계화해 진행했다. 무엇을 만들 것인가보다 어떤 조건 아래에서 만들 것인가를 먼저 합의하는 일이 더 중요했다.

1. **목표** — 레퍼런스의 디자인 톤을 80% 이상 재현하면서, Next.js 16 App Router·Supabase SSR·자가 호스팅 배포 파이프라인을 한 번에 학습한다. 학습이 끝났을 때 손으로 만들고 검증한 결과물 한 페이지가 배포되어 있어야 한다.
2. **인원** — 1인. 디자인 결정 일부는 레퍼런스에 위임해 학습 분량을 인프라/스택 쪽으로 몰았다.
3. **일정** — 의도적으로 단기 스프린트. Day 1에 라우트·UI를 한 번에 이식하고, Day 2에 디버깅·품질·배포를 마무리. 첫 커밋(`85d203a Initial commit from Create Next App`)부터 배포 파이프라인 완성(`14a3fee ci: inject environment variables for docker build`)까지 모두 이틀 안에 들어갔다.
4. **운영 환경** — 시놀로지 NAS 단독 호스팅, `parklab.synology.me` DDNS, Let's Encrypt HTTPS, DSM 내장 Reverse Proxy.
5. **유지보수 주체** — 본인. 콘텐츠는 어드민에서 직접 작성, 인프라도 본인 책임. 외부 의존이 늘면 그만큼 직접 학습할 표면이 줄어드는 것을 트레이드오프로 받아들였다.
6. **명시적 비목표** — `apexcharts`, `ogl`, `react-responsive-masonry`, `swiper` 처럼 레퍼런스에는 있지만 내 콘텐츠에 필요 없는 것들은 의도적으로 뺐다. "참고 레포에 있는 것은 다 따라간다"는 함정을 피하는 것 자체가 결정이었다.

## Tech Decisions 🛠️

모든 선택은 **"디자인은 레퍼런스를 따라간다 / 1인이 운영 가능해야 한다 / 인프라까지 직접 만진다 / 학습 가치를 우선한다"** 라는 네 제약 아래에서 내려졌다. 레퍼런스(phm6530)와 작업본(bbakkomm)의 차이를 먼저 표로 정리하고, 이후 항목별로 왜 그 방향을 골랐는지를 서술한다.

| 영역 | phm6530 (레퍼런스) | bbakkomm (작업) | 변경 의도 |
|---|---|---|---|
| 프레임워크 | Vite 5 + React 18.2 | Next.js 16.2 + React 19.2 | RSC / Server Actions / SSR / 메타데이터 학습 |
| 라우팅 | react-router-dom 6 (SPA) | App Router + 라우트 그룹 `(public)/(admin)` | 서버 라우팅 + 그룹별 레이아웃 |
| 렌더링 | CSR 전적 | RSC + ISR + Server Actions | 초기 진입 / SEO / 캐시 학습 |
| 인증 | `bcryptjs` + `jwt-decode` 자체 | Supabase Auth + `ADMIN_EMAIL` 가드 + `proxy.ts` | 인증 책임을 플랫폼에 위임 |
| Supabase 클라이언트 | `supabase-js` 직접 | `@supabase/ssr` (browser/RSC/middleware 분리) | RSC 환경에서 cookie/세션 분리 학습 |
| 폼 검증 | Yup + Zod 3 혼재 | Zod 4 단일 | 검증 스키마와 타입 추론을 한 라이브러리로 통일 |
| 폴더 구조 | 일반 `src/components/pages/...` | FSD (`entities/features/widgets/shared`) | 의존 방향 강제 학습 |
| 콘텐츠 저장 | Supabase + 폼 기반 | Supabase + TipTap 에디터 + 이미지 리사이즈 패치 | 운영자가 직접 작성/수정, 재배포 불필요 |
| 특수 라이브러리 | apexcharts, ogl(WebGL), masonry, swiper | 미사용 | 기능 불필요 — 디자인 톤만 가져옴 |
| Tailwind | v4 | v4 + `@theme` oklch 토큰 + 다크모드 강제 | 토큰 시스템화 시도 |
| 배포 | GitHub Actions + S3 추정 | GHCR + Synology NAS + Watchtower + Telegram | 인프라 직접 운영 학습 |

---

### 1. 프레임워크 — Next.js 16 (App Router) + React 19

- **채택 근거**: 레퍼런스가 Vite + React 18 SPA였기에, 작업본에서는 RSC와 Server Actions, 메타데이터 API, 이미지 최적화, 라우트 그룹과 templates 같이 SPA로는 다룰 수 없는 영역을 한꺼번에 학습 대상으로 삼고 싶었다. Next.js 16에서는 `middleware.ts`가 `proxy.ts`로 명칭이 바뀌었는데, 이걸 직접 부딪혀가며 적용한 흔적이 `05df5e0 feat: SEO 설정 + 빌드 오류 수정 + Next.js 16 proxy 전환` 커밋에 남아 있다. 명칭 하나가 바뀐 것뿐이지만, 공식 문서를 다시 읽고 마이그레이션 가이드를 확인하는 흐름 자체가 학습이었다.
- **포기한 옵션**: Vite + React (레퍼런스 구성 — SSR/SEO/Server Components를 직접 만들어야 해 학습 대상에서 멀어짐), Remix (Server Actions/Loaders 모델은 매력적이지만 Next.js 캐시 정책 학습이 우선), Astro (정적 콘텐츠 중심이라 어드민 + 동적 CRUD 요구에 부적합)

### 2. 라우팅과 그룹화 — App Router + `(public)/(admin)` 라우트 그룹

- **채택 근거**: 어드민과 공개 라우트가 서로 다른 레이아웃·미들웨어·테마를 가진다. 라우트 그룹 `(public)`과 `(admin)`으로 분리하면 URL은 깨지지 않으면서 레이아웃과 가드만 다르게 줄 수 있다. 레퍼런스는 `react-router-dom` 6의 중첩 라우터로 같은 효과를 냈지만, 서버에서 분기되는 게 학습 가치가 더 컸다.
- **포기한 옵션**: react-router-dom 6 (SPA), Pages Router (레거시 학습 가치가 낮음)

### 3. 인증 — Supabase Auth + `src/proxy.ts`

- **채택 근거**: 레퍼런스는 `bcryptjs` + `jwt-decode`로 토큰을 자체 발급하고 검증하는 구조였다. 어드민 1명이 쓰는 사이트에서 직접 토큰 수명을 관리하는 건 위험·비용이 모두 크다. Supabase Auth로 위임한 뒤 `proxy.ts`에서 세션 쿠키를 갱신하고, 서버 측에서 `user.email === ADMIN_EMAIL` 비교로 가드만 한다. 인증 책임을 플랫폼에 위임하고 검증 로직만 손대는 모델을 학습했다.
- **포기한 옵션**: 자체 JWT (레퍼런스 방식 — 학습 가치는 있지만 운영 비용 과함), NextAuth/Auth.js (Supabase에 데이터까지 묶여 있으면 동일 벤더에서 받는 게 정합성이 높음)

### 4. Supabase 통합 — `@supabase/ssr` 로 클라이언트 분리

- **채택 근거**: RSC + 미들웨어 환경에서는 브라우저 / 서버 컴포넌트 / 미들웨어 각각이 쿠키 접근 방식이 다르다. `@supabase/ssr` 0.10.2를 도입해 `client.ts` (브라우저), `server.ts` (RSC, async cookies), `middleware.ts` (세션 갱신) 세 클라이언트를 분리했다. 레퍼런스는 `supabase-js`만 쓰는 SPA 모델이었기 때문에 이 분리 자체가 학습 포인트였다.
- **포기한 옵션**: `supabase-js` 단독 (RSC와 충돌하고 쿠키/세션을 직접 관리해야 함)

### 5. 폴더 구조 — Feature-Sliced Design (FSD)

- **채택 근거**: 레퍼런스는 `src/components`, `src/pages`, `src/hooks` 같은 흔한 분할이었다. 클론 코딩이라 도메인이 단순한 만큼, 의존 방향을 강제하는 구조 학습 자체를 채택 이유로 잡았다. `app/` → `widgets/` → `features/` → `entities/` → `shared/` 역방향 의존을 폴더만으로도 의식적으로 고민하게 되는 효과가 있었다.
- **포기한 옵션**: Next.js 권장 colocation (페이지별 묶음 — 어드민·공개 공통 로직 추출이 모호해짐), 레이어드(클린) 아키텍처 (1인 포트폴리오에 비해 추상화 과함)

### 6. 콘텐츠 저장 — Supabase Postgres + TipTap 어드민

- **채택 근거**: 레퍼런스도 Supabase에 콘텐츠를 두지만 어드민 UX는 폼 위주였다. 작업본은 본문 작성을 TipTap 에디터로 받고 이미지 업로드·리사이즈까지 어드민에서 끝낸다. 글 추가가 재배포로 이어지지 않으므로 운영자가 손으로 만지는 사이트라는 정체성이 명확해졌다. `project_meta` / `project_contents` / `project_surmmry` / `project_meta_stack` / `project_stack` / `project_pin` / `admin` 7개 테이블로 정규화했다. (`project_surmmry` 오타는 마이그레이션 도입 전이라 그대로 남아있다 — Retrospect에서 다룸)
- **포기한 옵션**: MDX (글마다 커밋 필요 — 어드민 운영 의도와 충돌), 헤드리스 CMS 수신(Sanity, Contentful — Supabase로 충분한 규모에 의존성 추가 비용 불합리)

### 7. 상태와 데이터 — TanStack Query 5 + Zustand 5 + Server Actions

- **채택 근거**: 서버 상태는 React Query, 클라이언트 UI 상태(GNB 토글, 모달, 어드민 사이드바 등)는 Zustand로 분리. 어드민의 변경 작업은 Server Actions(`upsert-project-action.ts`, `delete-project-action.ts`)로 처리해 RSC와 자연스럽게 연결했다. 레퍼런스가 axios + React Query였다면, 작업본은 Server Action + Supabase 직접 호출로 한 단계 더 내려갔다.
- **포기한 옵션**: Redux Toolkit (보일러플레이트 과함), SWR (devtools/Mutation 모델이 학습에 덜 풍부)

### 8. 폼/검증 — Zod 4 단일

- **채택 근거**: 레퍼런스는 Yup과 Zod 3가 혼재했다. 작업본은 Zod 4로 통일해 검증 스키마에서 곧장 타입을 추론. `react-hook-form` + `@hookform/resolvers`로 어드민 폼·로그인 폼·프로젝트 등록 폼을 모두 동일한 패턴으로 처리했다.
- **포기한 옵션**: Yup (타입 추론이 약함), Joi (서버 친화적이라 클라이언트 폼 비중이 큰 이 프로젝트에 부적합)

### 9. 배포 — Synology NAS + GHCR + GitHub Actions + Watchtower + Telegram 알림

- **채택 근거**: 인프라까지 직접 만진다는 제약을 만족시키는 가장 작은 구성을 찾은 결과다. 빌드는 GitHub Actions가 처리해 NAS 부하를 0으로 유지하고, GHCR이 이미지 저장소가 된다. NAS의 Watchtower는 5분마다 GHCR의 이미지 다이제스트만 비교해 변경이 있을 때만 컨테이너를 무중단 교체. DSM 내장 Reverse Proxy로 443/HTTPS를 컨테이너의 8999 포트로 매핑하고, Let's Encrypt 인증서를 발급받아 HTTPS를 닫는다. 마지막으로 Telegram Bot API를 GitHub Actions의 마지막 step에 붙여, 커밋 메시지·작성자·상태를 메시지로 받는다. `git push` 한 번으로 빌드 → 푸시 → 풀 → 교체 → 알림이 모두 자동으로 이어진다.
- **포기한 옵션**: Vercel (무료/빠르지만 인프라 학습 기회 소멸), Cloudflare Pages (동일 이유), AWS ECS/Fargate (비용·복잡도가 1인 포트폴리오 규모를 초과), NAS에서 직접 빌드 (부하 크고 ARM/x86 차이로 환경 재현 위험)

## Troubleshooting 🧯

GitHub 클라우드 빌드와 NAS 배포로 옮기면서 로컬에서는 보이지 않던 환경 차이가 한꺼번에 드러났고, Next.js 16의 새 명칭과 Supabase upsert의 동작 차이까지 겹쳐서 Day 2 후반은 거의 디버깅으로만 채워졌다. 같은 함정을 다음에 피하기 위해 시간을 빼앗긴 지점을 기록한다. 이 섹션의 모든 항목은 실제 git 커밋과 브라우저 검증을 거친 사례다.

### 1. Next.js 16 — `middleware.ts` 가 더는 없다

- **증상**: Supabase 세션 갱신을 위해 `src/middleware.ts`를 추가했는데 어드민 라우트로 이동해도 세션이 갱신되지 않고, 빌드 시 deprecation 경고가 뜸.
- **원인**: Next.js 16에서 `middleware.ts`가 `proxy.ts`로 명칭이 바뀌었다.
- **해결**: 파일명을 `src/proxy.ts`로 변경하고 `matcher` 설정도 새 API에 맞게 정리. 커밋: `05df5e0 feat: SEO 설정 + 빌드 오류 수정 + Next.js 16 proxy 전환`. 메이저 버전 마이그레이션은 정식 문서를 정주행하는 비용을 아끼지 않는 편이 결국 빠르다는 걸 다시 확인했다.

### 2. `revalidatePath` 만으로는 수정 내용이 즉시 반영되지 않는다

- **증상**: 어드민에서 프로젝트를 수정한 뒤 공개 상세 페이지로 이동해도 이전 콘텐츠가 그대로. `revalidatePath('/work/[id]')` 를 호출하고 있는데도.
- **원인**: Next.js 16의 라우트 캐시는 페이지 단독이 아니라 레이아웃까지 묶인 단위로 무효화된다. 페이지만 무효화하면 레이아웃에 묶인 RSC 트리가 그대로 남는다.
- **해결**: `revalidatePath(path, 'layout')` 으로 layout-purge를 호출. 커밋: `4573143 fix: revalidatePath layout-purge로 수정 즉시 반영 버그 해결`. Next.js 캐시 모델은 "어디까지 다시 그릴지"를 명시적으로 선택하는 도구라는 점을 받아들여야 한다.

### 3. Supabase `upsert` 가 매번 새 row를 만들어버린다

- **증상**: `project_contents`를 `upsert`로 저장하는데 같은 프로젝트를 두 번 수정하면 row가 한 줄 더 생긴다.
- **원인**: `upsert`가 conflict target을 정확히 잡지 못한 상황 — 복합 unique 제약이 없거나 행 식별 키가 의도와 다르게 매칭됐다.
- **해결**: 단일 `upsert` 호출을 **명시적 `insert` / `update` 분기**로 분리. 어드민 폼 제출 시 row 존재 여부를 먼저 조회한 뒤 분기. 커밋: `d33cce0 fix: project_contents upsert를 insert/update 분리로 중복 row 생성 버그 수정`. SDK의 `upsert`는 conflict target이 직관과 다르게 동작하는 경우가 많아 명시적 분기가 디버깅 비용을 줄인다.

### 4. 404 페이지의 "이전 화면" 버튼이 외부 referrer에서도 작동했다

- **증상**: 404 페이지의 "이전 화면" 버튼이 외부 검색 결과에서 들어온 사용자에게도 그대로 노출되어, 다시 외부 사이트로 튕겨나가는 동선이 발생.
- **해결**: `document.referrer` 의 호스트가 같은 출처일 때만 버튼을 노출하고, 그 외에는 홈 fallback으로 표시. 커밋: `88c668e` → `fb217ea fix: 404 이전화면 버튼 referrer 기반 same-origin 체크로 교체`. 라우팅 폴백은 SPA적 경험에만 의지하면 안 되며, 외부 진입 동선을 항상 가정해야 한다.

### 5. GitHub Actions에서 `pnpm install` 이 exit 254로 죽는다

- **증상**: GHCR 빌드 워크플로우가 `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH`를 띄우며 `exit code: 254`. 로컬에서는 정상.
- **원인**: GitHub 러너의 pnpm 10.33.2와 로컬 pnpm의 미세한 버전 차이 → `--frozen-lockfile` 검증 실패.
- **해결**: `package.json` 최상위에 `"packageManager": "pnpm@10.33.0"` 명시. 양쪽 모두 corepack을 통해 같은 버전을 강제. 한 번에 끝나지 않아 두 차례 시도했다(`a2bdd62 fix: pnpm 버전 10.33.0으로 강제 고정` → `9185172 fix: pnpm 버전 10.33.0으로 강제 고정2`). lock 파일은 의존 트리만이 아니라 패키지 매니저 자체의 동작 호환성까지 본다는 점을 잊지 말 것.

### 6. 도커 빌드에서 `patches/` 폴더가 사라졌다

- **증상**: 어드민 TipTap 이미지 리사이즈를 위해 `@squirrel309/my-testcounter@0.0.67`에 로컬 패치(`type: "image"` → `type: "imageResize"`)를 적용해 두었는데, 도커 컨테이너 안에서는 `patches/`가 없어서 pnpm이 패치 적용에 실패.
- **원인**: `Dockerfile`이 `package.json`과 `pnpm-lock.yaml`만 복사하고 `patches/`는 제외했다. 로컬에서는 이미 적용된 패치가 동작하니 보이지 않던 함정.
- **해결**: `Dockerfile`의 `deps` 스테이지에서 `pnpm install`보다 앞에 `COPY patches ./patches` 한 줄 추가. 커밋: `47b2b6b fix: Dockerfile에 patches 폴더 복사 추가`. 도커 컨텍스트는 명시적으로 복사한 것만 존재한다. 빌드 시점에 필요한 모든 재료를 한 번 더 점검하는 습관이 필요하다.

### 7. Next.js 빌드 시 `NEXT_PUBLIC_*` 가 `undefined` 라 SSG가 죽는다

- **증상**: GHCR 빌드 단계에서 정적 페이지 데이터 수집 중 환경변수가 비어 있어 `exit code 1`. `.env.local`은 의도적으로 GitHub에 올리지 않았다.
- **원인**: GitHub Actions 러너에서 `.env.local`이 존재하지 않음. 도커 빌드 ARG로 받지 않으면 `process.env.NEXT_PUBLIC_*`가 빈 문자열로 베이크된다.
- **해결**: 3단계로 처리했다. ① GitHub `Settings > Secrets and variables`에 6개 변수 등록 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_IMAGE_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_MOCKING`, `ADMIN_EMAIL`). ② `deploy.yml`의 `docker/build-push-action`에 `build-args`로 secrets 주입. ③ `Dockerfile`에 `ARG` 선언 후 동일 이름으로 `ENV` 재선언해 `pnpm run build` 시점에 베이킹. 커밋: `14a3fee ci: inject environment variables for docker build`. `NEXT_PUBLIC_*`는 빌드 타임에 코드에 박힌다. 런타임에 주입할 수 있다고 착각하지 말 것. `ADMIN_EMAIL`처럼 서버 전용 값은 절대 `NEXT_PUBLIC_` 접두사를 붙이지 말 것 — 클라이언트 번들에 노출된다.

### 8. HTTPS 접속 시 `403 Forbidden` 과 인증서 미발급

- **증상**: 외부에서 `parklab.synology.me` 접속 시 자물쇠 없이 403. DSM Reverse Proxy 매핑은 끝났는데 인증서가 비어 있음.
- **원인**: Let's Encrypt가 80 포트로 ACME challenge를 거는데, 공유기에서 80을 NAS로 포트포워딩하지 않은 상태였다.
- **해결**: 공유기에서 80/443을 NAS로 포트포워딩한 뒤, DSM `[제어판] - [보안] - [인증서]`에서 Let's Encrypt 인증서를 새로 발급받아 Reverse Proxy 매핑에 연결. HTTPS 인증서 발급은 단순히 "발급 버튼"의 문제가 아니라, **80 포트가 외부에서 도달 가능한가**라는 네트워크 전제 조건의 문제다.

### 9. 텔레그램 자동 배포 알림 — 3차 시도 끝의 학습

- **증상**: GitHub Actions의 마지막 step에 Telegram Bot API 호출을 붙였는데 첫 시도에서는 메시지가 도착하지 않거나 깨진 형식으로 도착.
- **원인 (시도별)**: ① 봇 토큰/채팅 ID를 secrets에 등록하지 않아 빈 문자열이 들어감 → ② 메시지 본문의 커밋 메시지에 들어간 `\n` 이스케이프 문제 → ③ `parse_mode: Markdown` 과 본문의 특수문자(`_`, `*`, `[`)가 충돌해 400 응답.
- **해결**: 커밋 메시지를 일반 텍스트로 보내고, 작성자·해시·상태만 별도 필드로 구성. 커밋 시리즈: `9aea952 → ea7df3b → f7753e4 test: 텔레그램 자동 배포 알림 테스트 1/2/3`. 외부 봇 API는 페이로드의 escape 규칙을 가장 먼저 의심해야 한다. secrets 미등록은 가장 흔한 원인이다.

## Retrospect 📝

이번 프로젝트는 결과물의 완성도를 자랑하기 위한 것이 아니라, 짧은 시간 안에 새로운 스택과 인프라를 한꺼번에 마주하기 위한 학습 스프린트였다. 회고도 잘된 결정 자랑보다, **어떤 영역에서 학습 폭이 가장 컸고 / 어떤 영역에 부채가 남았으며 / 다시 한다면 어디를 다르게 할지**에 분량을 더 쓴다.

이번 스프린트에서 가장 크게 배운 것들은 이렇다. Next.js 16의 **라우트 캐시 모델** — `revalidatePath`의 `'page'` / `'layout'` 차이를 디버깅으로 직접 부딪혀 이해했다. 서버 렌더 캐시는 자동으로 사라지는 게 아니라 명시적으로 무효화하는 도구다. **Server Actions + RSC**의 사고 전환 — 어드민의 CRUD를 클라이언트 mutation 대신 Server Action으로 옮기면, 폼 제출이 곧 서버 렌더링 트리거가 된다는 감각을 체득했다. **자가 호스팅 도커 파이프라인의 전체 그림** — GitHub Actions가 빌드하고, GHCR이 저장하고, Watchtower가 polling하고, DSM Reverse Proxy가 SSL을 닫는다는 흐름을 처음으로 직접 구성하면서 "이미지가 어디에 어떤 형태로 살아있는가"라는 감각을 얻었다. **로컬 vs CI 환경 차이** — `pnpm` 버전, `patches/` 폴더, `NEXT_PUBLIC_*` 베이킹은 모두 "내 노트북에서는 되는데"가 통하지 않는 영역이다.

**아쉬운 점**

- **DB 스키마가 코드로 관리되지 않는다** — `project_surmmry` 같은 오타가 그대로 남아 있고, RLS 정책도 콘솔에 의존. 환경 재현·롤백·협업 전제가 모두 약하다.
- **TipTap 출력의 정규화를 후처리로 처리** — `normalize-content-html.ts`가 화면 단계에서 HTML을 다듬지만, 어드민 입력 단계에서 스키마를 강제했어야 더 깔끔하다. 입력의 일관성을 출력 정규화로 메우는 구조는 결국 양쪽 모두 손이 간다.
- **테스트 커버리지가 거의 없다** — Vitest + RTL + jsdom + MSW 셋업은 끝났지만, Server Actions·어드민 가드·Supabase 클라이언트 분리처럼 회귀 위험이 큰 영역도 비어 있다. 셋업과 사용은 별개다.
- **디자인 토큰의 일관성** — `@theme`으로 oklch 팔레트를 잡았지만, 컴포넌트 단위에서 토큰 외 임의 색상이 일부 남아 있다. 토큰 시스템을 만들었으면 토큰만 쓰도록 강제할 장치가 필요하다.
- **이미지 리사이즈 패치 의존** — `@squirrel309/my-testcounter`에 `patches/`로 패치를 박아두는 구조는 도커 빌드도 복잡하게 만든다. 직접 TipTap extension을 작성하는 편이 결국 가볍다.
- **Watchtower 폴링 간격과 무중단 보장의 불완전성** — 5분 polling은 즉시성이 부족하고, 컨테이너 교체 시점에 5xx가 나는지 측정할 수단이 없다.

**다시 한다면**

- **DB 스키마 / RLS 를 마이그레이션 스크립트로 관리** — Supabase CLI. 환경 재현성과 협업 가능성, 오타 정정 비용까지 한 번에 해결된다.
- **TipTap 콘텐츠를 JSON으로 저장하고 입력 단계에서 스키마 강제** — HTML 직저장에서 벗어나면 정규화·검색·렌더러 교체가 모두 단순해진다.
- **회귀 테스트 최소 셋** — 어드민 가드, Server Actions 입력 검증, Supabase 쿠키 세션 처리. 빌드 단계에서 함께 돌리고 싶다.
- **Watchtower 대신 webhook 기반 즉시 교체 + healthcheck + 외부 핑 모니터** — 텔레그램 채널을 배포 알림과 알람 채널로 분리.
- **이미지 리사이즈 TipTap extension 직접 작성** — `patches/` 의존 제거. 도커 빌드 단계 간소화.
- **디자인 토큰 외 사용을 ESLint/stylelint로 잡기** — 토큰 시스템의 일관성을 자동으로 검증.
- **클론 코딩의 출처를 상단 메타에도 명시** — 디자인 레퍼런스 링크를 페이지 상단에 자연스럽게 노출해, 출처와 학습 의도를 동시에 드러내는 편이 더 솔직하다.

이번 스프린트는 결과물보다 학습 그래프 자체가 자산이었다. 이틀 안에 47개 커밋을 남기며 새 프레임워크의 명칭 변경부터 도커 컨텍스트의 미세한 함정, NAS 인증서의 네트워크 전제 조건까지 한 번에 부딪힌 경험은, 같은 기간을 다른 방식으로 썼을 때보다 압도적으로 많은 학습을 남겼다. 다음 사이클은 이번에 남은 부채(테스트, 마이그레이션, 디자인 토큰 강제) 위에서 쌓아 올린다.