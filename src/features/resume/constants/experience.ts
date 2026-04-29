export interface Project {
  name: string;
  desc?: string;
  link?: { href: string; label: string };
  showArrow?: boolean;
}

export interface Group {
  title: string;
  summary?: string;
  projects: Project[];
}

export interface Company {
  company: string;
  meta: string;
  role: string;
  stack: string;
  groups: Group[];
}

export const EXPERIENCE: Company[] = [
  {
    company: "비스톤스 — 테크2팀 선임",
    meta: "PTKOREA 파견 상주 · 2023.10 — 2026.02 · 2년 5개월",
    role: "프론트엔드 개발 (삼성닷컴 모듈 제작 및 운영)",
    stack: "JavaScript, Sass",
    groups: [
      {
        title: "삼성닷컴 통합, 프로모션 런칭 및 운영 / 고도화",
        summary:
          "삼성닷컴 내 가장 제품 판매 매출이 높은 페이지의 메인 운영을 진행하며, 서버/백엔드 담당자와 지속적인 트래킹 체크 및 넷퍼넬을 적용했습니다. 매월 변경되는 고객 요구사항 대응을 위해 확장성과 의존성을 고려한 유연·독립적인 함수 및 모듈화를 적용해 페이지 로딩 속도를 개선했습니다.",
        projects: [
          {
            name: "통합런칭 — 삼성 TV",
            link: {
              href: "https://www.samsung.com/sec/event/2024-tv-launching/",
              label: "samsung.com/sec/event/2024-tv-launching",
            },
          },
          {
            name: "통합런칭 — 비스포크 냉장고",
            link: {
              href: "https://www.samsung.com/sec/event/bespoke-refrigerator/",
              label: "samsung.com/sec/event/bespoke-refrigerator",
            },
          },
          {
            name: "통합런칭 — 김치냉장고",
            link: {
              href: "https://www.samsung.com/sec/event/kimchi-refrigerator/",
              label: "samsung.com/sec/event/kimchi-refrigerator",
            },
          },
        ],
      },
      {
        title: "삼성닷컴 멤버십 이벤트 게임 제작",
        projects: [
          {
            name: "오 마이 재질테스트",
            desc: '"MBTI"를 포커스로 트래픽 상승 유도를 위한 프로모션 이벤트 게임 — JavaScript / jQuery',
          },
          {
            name: "코기 가족 찾기",
            desc: '"월리를 찾아라" 컨셉의 트래픽 유도용 프로모션 게임 — JavaScript / jQuery',
          },
        ],
      },
      {
        title: "모듈, 유틸 제작 및 고도화",
        projects: [
          {
            name: "스마트폰 바꿔보상 금액 체크 모듈 (3 Depth)",
            desc: "기존 소유 중인 갤럭시·아이폰을 신규 구매 스마트폰 가격 할인 프로모션을 위해 제작",
          },
          {
            name: "다중 조건문 모듈",
            desc: "data-value에 다중 조건을 적용해 고객 요구사항의 유연한 대응을 위해 제작",
          },
        ],
      },
      {
        title: "내부 운영 작업 프로세스 시스템 설계",
        projects: [
          {
            name: "Excel to Json",
            desc: "DB 변경 작업을 JSON으로 관리할 때 발생하는 휴먼 에러를 줄이기 위한 검증 로직과 자동 변경 기능",
          },
          {
            name: "Tool Checker",
            desc: "DB 내 상품 추가·제거 시 툴과 호환되는 마크업 오류 검증 및 직관적인 에러 위치 파악 도구",
          },
        ],
      },
    ],
  },
  {
    company: "DXC Technology — ThinQ 하이브리드앱 전담팀 대리",
    meta: "2021.04 — 2023.06 · 2년 2개월",
    role: "프론트엔드 개발",
    stack: "React, Python, Jira",
    groups: [
      {
        title: "H&A 본부 데이터 관리 대시보드",
        projects: [
          { name: "기존 코드 충돌로 인한 가전 종류별 서비스 비정상 노출 건 키워드별 모듈 분기처리 고도화" },
          { name: "초기 마크업 구축 및 공통 스타일 설계 (PC 기반)" },
          { name: "대용량 데이터 타입별 분기처리 및 재통합, 종류별 차트 모듈 제작" },
        ],
      },
      {
        title: "ThinQ 마이홈리포트",
        projects: [
          { name: "초기 마크업 구축 및 공통 스타일 설계" },
          { name: "앱 컨텐츠 클릭 수, 화면 지속 시간, 이탈률 탐지 로직", desc: "moment, useBlocker 사용" },
          { name: "에너지 소비·사용 빈도 그래프 차트 모듈 제작" },
          { name: "TalkBack, ScreenReader 접근성 적용" },
        ],
      },
      {
        title: "ThinQ 생활연구소",
        projects: [
          { name: "초기 마크업 구축 및 공통 스타일 설계" },
          { name: "체류 시간·이탈률 감소를 위한 YouTube API & PIP 모드 고도화 협업" },
          { name: "TalkBack, ScreenReader 접근성 적용" },
        ],
      },
      {
        title: "ThinQ LG 베스트 케어",
        projects: [
          { name: "기존 코드 충돌로 인한 가전 종류별 서비스 비정상 노출 건 키워드별 모듈 분기처리 고도화" },
          { name: "초기 마크업 구축 및 공통 스타일 설계 (PC 기반)" },
          { name: "대용량 데이터 타입별 분기처리 및 재통합, 종류별 차트 모듈 제작" },
        ],
      },
      {
        title: "LG Seller Lounge / Content Store",
        projects: [
          { name: "판매 상품 데이터 추출 시스템 고도화" },
          { name: "다기능 범위 캘린더 (1일·1주·1달·분기·홀/짝수월·년도별 범위)" },
          { name: "로딩속도 관련 이미지 Resize·Lazy 적용 / 코드 리팩토링 성능 최적화" },
        ],
      },
      {
        title: "Jira / Collab — 내부 구성팀 데이터 대시보드",
        projects: [{ name: "프로젝트 킥오프 시 스케줄·진행 상태·이슈 파악용 인프라 구축" }],
      },
      {
        title: "Python — 내부 직원용 자동화 프로그램",
        summary: "운영팀 내부 반복 작업 자동화",
        projects: [
          { name: "Python-docx", desc: "Word 문서 자동화 exe 제작" },
          { name: "Openpyxl", desc: "Excel 문서 자동화 exe 제작" },
          { name: "cv2, OpenCV, pytesseract", desc: "OCR 자동로그인 exe 제작" },
          { name: "Selenium", desc: "운영 Admin 페이지 내 일일보고서 자동화 exe 제작" },
          { name: "PIL", desc: "사진 사이즈 및 파일 변환 기능 exe 제작" },
        ],
      },
    ],
  },
  {
    company: "이글루코퍼레이션 — 보안관제팀 사원",
    meta: "BC카드 상주 · 2020.03 — 2021.03 · 1년",
    role: "정보보안관제",
    stack: "FireEYE, TippingPoint, NMS",
    groups: [
      {
        title: "보고서 / 일일점검 / 장비백업",
        projects: [
          {
            name: "정기보고서 (일일/주간/월간) 작성",
            desc: "탐지 이벤트, 발생시간, 출발지·목적지 IP/Port를 기재하고 위험도 책정 후 권고 및 조치사항 반영",
          },
          {
            name: "관제 전반 모니터링 및 SIEM CPU/Memory/Cache 점검",
            desc: "에이전트 활성화 여부 및 시·분별 로그 정상 유입 확인",
          },
          {
            name: "F/W, IPS, WAF 장비 백업",
            desc: "GUI 환경이 무거운 장비는 CLI 접근으로 .txt 저장",
          },
        ],
      },
      {
        title: "보안 이벤트 모니터링 및 분석",
        projects: [
          { name: "웹해킹 취약점 정탐", desc: "404 기반이 아닌 실제로 영향이 있는지 공격 유효성 테스트" },
          {
            name: "SYN Port Scan, Spoofed DDoS 취약점",
            desc: "DDX/F/W 로그 조회를 통한 공격 시도 수, 트래픽량(Cacti, DDX) 모니터링 및 IP·PORT 차단",
          },
          {
            name: "APT 공격 대응 (FireEYE EX/NX, Spamsniper)",
            desc: "탐지된 Phishing URL·Malicious DNS·Host를 Nslookup으로 확인 후 Malwares·VirusTotal로 악성 여부 확인",
          },
        ],
      },
      {
        title: "업무 프로세스 고도화",
        projects: [
          { name: "취약점 점검 자동화 웹프로그램", desc: "BC카드 홈페이지의 고객 정보 노출 및 취약점 방지를 위한 자동검색 도구 제작" },
          {
            name: "Spoofed DDoS, SipVicious, wordpress Vulnerability 등 일괄차단 IP 리스트 추출 프로그램",
            desc: "중복·공백 제거, 공인/사설 IP 분기 등록, Human Error 방지",
          },
        ],
      },
    ],
  },
  {
    company: "이음소프트 — 개발팀 주임",
    meta: "2017.10 — 2018.12 · 1년 3개월",
    role: "PHP 개발",
    stack: "JavaScript, PHP, MySQL, phpMyAdmin",
    groups: [
      {
        title: "클라이언트 사이트 런칭",
        summary:
          "병원·기업·학회·프렌차이즈 등 15개 이상의 클라이언트 사이트의 런칭·이관·데이터 마이그레이션을 단독 진행했습니다. (비인가 및 클로즈된 사이트 제외)",
        projects: [
          { name: "이화수 육개장 (ihwasoo.com)", desc: "프랜차이즈 사이트 리뉴얼 / 181개 매장 DB 재설계 및 통합 / 카카오맵 API 커스터마이징 / 창업 문의 SMS 자동화", showArrow: true },
          { name: "국제통합의과학회 (imsacademy.net)", desc: "학회 사이트 신규 구축 / 7단계 회원 등급 권한 체계 / 승인제 회원가입 운영 / Vimeo 영상 자료실 연동", showArrow: true },
          { name: "대전시립노인병원 (ilovenoin.com)", desc: "병원 홈페이지 런칭 / 진료일정표 캘린더 관리자 편집 / 자원봉사 신청 정원 제한·자동 마감 / 카카오톡 오픈채팅 연동", showArrow: true },
          { name: "유성한가족병원 (han.or.kr)", desc: "병원 홈페이지 런칭 / 의료진 근무표 관리자 편집 UI / 반응형 (PC·Mobile) / IE11 대응", showArrow: true },
          { name: "명신메디컬 (msmedi.com)", desc: "의료기기 회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG·CHN) / Gnuboard 유튜브 임베드 모듈 제작 / 비개발자 운영자용 제품 등록 폼", showArrow: true },
          { name: "두타기술 (duta-rnd.com)", desc: "회사 홈페이지 런칭 / 다국어 적용 (ENG·KOR, 영문 디폴트) / 가변 사양표 DB 1:N 설계 / 비개발자 어드민 운영", showArrow: true },
          { name: "대원산업 (daewonic.com)", desc: "회사 홈페이지 리뉴얼 / 다국어 적용 (KOR·ENG·CHN) / 호스팅 트래픽 제한 하 이미지 최적화 / IE11 인터랙션 단계적 대응 합의", showArrow: true },
          { name: "오픈엠 (openm.com)", desc: "회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG) / 카카오맵 연동 / Gnuboard 게시판 다국어 분리 운영", showArrow: true },
          { name: "BMST (bmst.co.kr)", desc: "회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG·CHN·JPN) / 연간 관리 일정 운영자 편집 UI / E-book·카탈로그 디지털 배포", showArrow: true },
          { name: "김형제 (kimbro.co.kr)", desc: "프랜차이즈 본사 홈페이지 런칭 / 가맹 모집 중심 IA 설계 / 매출 지표 시각화 / 지역 필터 슬러그 상수화로 휴먼 에러 차단", showArrow: true },
          { name: "여수요양병원 (newstart.co.kr)", desc: "병원 홈페이지 런칭 / 보호자 동선 중심 IA 재설계 / Gnuboard 스킨 커스터마이징 / 게시판 스팸 필터링", showArrow: true },
        ],
      },
    ],
  },
  {
    company: "프리랜서 프로젝트",
    meta: "2024.01",
    role: "",
    stack: "",
    groups: [
      {
        title: "",
        projects: [
          {
            name: "사이언스스타 (sstar.biz)",
            desc: "쇼핑몰 리뉴얼 / 학년·학기별 단원 매핑 IA / 견적서·품의서 JPG 출력 (html2canvas) / CS 문의 90%+ 감소",
          },
        ],
      },
    ],
  },
];
