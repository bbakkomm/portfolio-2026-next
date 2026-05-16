export interface SubItem {
  name: string;
  desc?: string;
}

export interface Project {
  name: string;
  desc?: string;
  link?: { href: string; label: string };
  showArrow?: boolean;
  subItems?: SubItem[];
}

export interface Group {
  title: string;
  summary?: string;
  link?: { href: string; label: string };
  projects: Project[];
}

export interface Company {
  company: string;
  meta: string;
  role: string;
  stack: string;
  summary?: string;
  groups: Group[];
}

export const EXPERIENCE: Company[] = [
  {
    company: "비스톤스 — 테크2팀 선임",
    meta: "PTKOREA 파견 상주 · 2023.10 — 2026.02 · 2년 5개월",
    role: "프론트엔드 개발 (삼성닷컴 모듈 제작 및 운영)",
    stack: "JavaScript, Jquery, Sass",
    summary:"다수 외주사가 공존하는 레거시 환경에서 삼성닷컴 제품 판매 페이지의 프론트엔드 운영을 담당. 기획자·디자이너·백엔드·QA·원청(삼성) 담당자와 직접 커뮤니케이션하며, 매월 변경되는 요구사항에 대응하기 위한 모듈·내부 도구를 설계·운영.",
    groups: [
      {
        title: "사내 공통 인프라 — bs_common.js 폴드 대응 확장 및 공통 모듈군 배포",
        summary: "입사 시점 사내 표준 공통 모듈인 bs_common.js 는 PC·모바일 2단 브레이크포인트만 지원하던 구조였음. 폴드 디바이스(769–802px) 대응 분기를 추가하고, pxToVw 의 폴드 분기 처리·isFold 유틸 추가 등으로 사내 표준을 확장 배포. 이후 페이지 단위로 반복되던 패턴들을 공통 모듈로 분리해 사내에 develop·배포",
        projects: [
          {
            name: "video.js / tab.js / sticky.js / benefitSwiper.js 등 공통 모듈군",
            desc: "각 프로젝트마다 비슷하게 복사되던 영상 재생·탭 전환·스티키 헤더·혜택 슬라이드 패턴을 표준 모듈로 추출",
          },
          {
            name: "JSDoc 기반 문서화 규약 유지 (@param / @returns / @example / @deprecated / @version)",
            desc: "다른 개발자·퍼블리셔가 코드만 읽고 사용법을 파악할 수 있도록 함수 단위로 문서화",
          },
          {
            name: "전역 상태 객체 PT_STATE.eventState",
            desc: "setEventState/getEventState 로 캡슐화된 이벤트 상태 관리 패턴 정착",
          },
        ],
        link: { 
          href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/tree/master/module/common", 
          label: "GitHub Repository" 
        },
      },
      {
        title: "구매 모듈 v2 — 멀티 인스턴스 SKU 옵션 셀렉터 프레임워크",
        summary:
          "삼성닷컴·갤럭시 캠퍼스 등 다채널에서 사용 중이던 기존 구매 모듈은 한 페이지에 하나만 배치 가능한 단일 인스턴스 구조였음. 운영 중 고객사 요구가 '한 페이지에 2–3개 커스텀 배치' 로 확장되며 기존 구조로 대응 불가, 타 외주사가 시도 후 실패하거나 처음부터 대응 불가로 판단한 케이스가 우리 팀으로 안분된 작업. 데이터 가공 레이어와 UI 렌더링 레이어를 분리한 클래스 기반 프레임워크로 재설계.",
        projects: [
          {
            name: "클래스 인스턴스화로 다중 배치 지원",
            desc: "setDataTool 클래스를 셀렉터 기반으로 인스턴스화해, 한 페이지에 N개 인스턴스가 충돌 없이 공존 (실 운영 페이지에서 동시 10개 이상 인스턴스 가동 검증)",
          },
          {
            name: "옵션 의존성 체인 자동 해결",
            desc: "컬러·옵션A·옵션B 등 다단계 옵션 간 유효 조합을 단계적으로 필터링해, 사용자가 어떤 순서로 선택해도 모순된 조합이 만들어지지 않도록 처리. 단일 후보 자동 선택·무효 선택 자동 해제·기본값 폴백 규칙 내장",
          },
          {
            name: "그룹별 동작 정책 분리 (config.strictChain 등)",
            desc: "고객사가 그룹마다 다른 노출·동작 규칙을 요구해도 핵심 코드 수정 없이 config 값으로 대응 가능",
          },
          {
            name: "data-tool-* 어트리뷰트 컨벤션",
            desc: "마크업만 보고 역할이 읽히는 일관된 데이터 어트리뷰트 설계로, 사내 퍼블리셔·다른 개발자의 인수인계·운영 부담 최소화",
          },
          {
            name: "다중 디바이스 대응",
            desc: "PC·모바일·폴드 디바이스별 노출 개수 차등 적용, 모바일 2열 레이아웃에서 팝업이 화면 밖으로 이탈하지 않도록 위치 보정 로직 포함",
          },
        ],
        link: { 
          href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/tree/master/module/buying_tool", 
          label: "GitHub Repository" 
        },
      },
      {
        title: "운영 자동화 — Excel to Json 변환 모듈 (v1.0 → v6.1)",
        summary:
          "기획자가 전달하는 엑셀 DB를 개발자가 JSON으로 수작업 변환하던 기존 프로세스를 자동화. 자체 설계한 구매 모듈 v2 가 소비하는 JSON 구조에 맞춰 변환 규칙·검증 로직을 정의, 기획자 엑셀 → 자동 변환·검증 JSON → 모듈 렌더링 의 무중단 운영 파이프라인을 한 사람이 일관되게 설계. 사내에 유사 도구가 존재했으나 타 외주사가 배포한 정적 도구로, 문서·기술 정보가 공유되지 않고 타입 에러 발생 시 빈 화면으로 다운되는 구조였음. 외부 도움 요청이 불가한 환경이었기에 기존 코드를 처음부터 분석·분해·재조립한 뒤 새 도구를 설계.",
        projects: [
          {
            name: "7단계 검증 파이프라인",
            desc: "변환 자체보다 '잘못된 데이터를 사전에 막는 것' 이 핵심 목적. 행 길이 일관성 → 공백·짝수(Key-Value) 검사 → 모드별 필수 키 존재 검증 → 헤더 기준 키 일관성 검사(첫 행을 기준으로 전 행의 키 순서·이름 검증) → 엑셀 에러값 9종 탐지(#DIV/0!, #REF!, #VALUE! 등 — 기획자가 인지 못하고 복사한 수식 오류 차단) → 대표 SKU(def === 'O') 중복·누락 검증 → JSON 직렬화. 각 단계에서 실패 시 x줄, 키 불일치: optCdA (예상: optCdB) 형태로 에러 위치·원인을 동시에 리턴",
          },
          {
            name: "두 가지 운영 모드 지원",
            desc: "구매 모듈 v2의 옵션형·그룹형 데이터 형식에 각각 대응. 옵션형은 전체에서 대표 SKU 1개, 그룹형은 그룹마다 대표 SKU 1개를 검증해 모듈 렌더링 시점의 런타임 에러를 변환 단계에서 차단",
          },
          {
            name: "시각 검증 UI",
            desc: "변환 전 데이터를 컬럼별 카드로 펼쳐, 컬럼명·유니크 값 개수·각 값의 등장 횟수를 한눈에 확인 가능. '숫자로 잡히는 에러' 와 '눈으로 봐야 잡히는 에러' 를 동시에 방어",
          },
          {
            name: "optCheck JSON 보조 산출물",
            desc: "optCd* 컬럼의 유니크 값을 별도 JSON으로 자동 추출해, 구매 모듈 v2가 옵션 후보(컬러·옵션A·옵션B)를 구성할 때 사용. 두 모듈 간 데이터 연계를 도구 레벨에서 자동화",
          },
          {
            name: "카테고리 트리 자동 생성 (objCatGrp)",
            desc: "cat/grp 기반 데이터를 카테고리 → 그룹 → 옵션 키별 유니크 값 트리로 변환해, v2의 mergeData 구조에 그대로 투입 가능",
          },
          {
            name: "사내 배포",
            desc: "배포 후 이슈 수집·반영을 통해 v6.1까지 develop, 팀 내 휴먼 에러율 0% 달성. 100줄/20+ 컬럼 엑셀의 육안 디버깅 시간(약 30분–1시간) 제거",
          },
          {
            name: "운영 UX",
            desc: "클래스 구조로 재설계, 자주 쓰는 키 이름(grp, def, default)을 localStorage에 영속화, 로딩 인디케이터·클립보드 복사 상태 피드백 포함 — 비개발자도 운영 가능한 형태로 마감",
          },
        ],
        link: { 
          href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/tree/master/excel%20to%20json", 
          label: "GitHub Repository" 
        },
      },
      {
        title: "개발자 인스펙터 도구 — Tool Checker (?check=buying 활성화)",
        summary:
          "구매 모듈 v2 의 마크업 구조가 복잡해지면서, 운영 페이지에서 DOM과 데이터의 정합성을 즉시 확인할 수 있는 디버그 도구의 필요성 대두. 운영 페이지 코드에 상시 포함되어 있다가 URL에 ?check=buying 쿼리가 붙으면 화면 우상단에 검증 패널이 동적으로 주입되는 구조로 구현 — 배포 환경에서도 일반 사용자에게는 노출되지 않는 개발자 전용 모드.",
        projects: [
          {
            name: "Excel to Json 산출물과 직결",
            desc: "Excel to Json 도구가 추출한 optCheck JSON 을 그대로 입력으로 받음. Excel to Json → optCheck JSON → Tool Checker → 실제 페이지 의 일관된 검증 파이프라인 완성",
          },
          {
            name: "4단계 계층 검증",
            desc: "① data-opt-key 어트리뷰트 존재 여부 → ② JSON opt 개수와 data-opt-btn 개수 일치 여부(어느 쪽이 많고 적은지까지 보고) → ③ 각 옵션의 <input type='radio' name id value> + <label for> 5개 속성 정합성 → ④ JSON에 없는 잉여 data-opt-btn ID 추출",
          },
          {
            name: "에러 위치 색상 표기",
            desc: "정상은 파랑(#2188ff), 비정상은 빨강(#fa2337)으로 구분해 '어디가 틀렸는지' 한눈에 식별 가능",
          },
          {
            name: "sessionStorage 영속화",
            desc: "마지막 입력값을 유지해 코드 수정 → 새로고침 → 즉시 재검증 의 빠른 개발 루프 지원",
          },
          {
            name: "사용 빈도",
            desc: "대규모 마크업 변경 시 팀원이 활용. 일상적인 운영 도구라기보다 큰 구조 변경 시 휴먼 에러를 사전 차단하는 안전망 역할",
          },
        ],
        link: { 
          href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/blob/master/module/tool_checker/index.js", 
          label: "GitHub Repository" 
        },
      },
      {
        title: "삼성닷컴 계열 채널 운영 및 통합 런칭",
        summary:
          "일반 소비자 채널인 삼성닷컴(samsung.com/sec)을 중심으로, 학생·교원 대상 교육할인몰인 갤럭시 캠퍼스, 임직원·B2B 고객사 대상 패밀리넷·패밀리몰 등 다층 판매 채널의 프론트엔드를 운영. 각 채널은 가격 정책·노출 상품·인증 구조가 달라 동일 캠페인이라도 채널별로 마크업과 스크립트를 분기 처리해야 했음. 이 중 삼성닷컴 내 최고 매출 페이지의 메인 운영을 담당하며, 통합 런칭 시 서버·백엔드 담당자와 트래킹·넷퍼널을 협의 적용하고, 매월 변경되는 요구사항에 대응하기 위해 확장성·독립성을 고려한 함수와 모듈화로 페이지 로딩 속도를 개선.",
        projects: [
          {
            name: "대표 페이지 (URL은 시즌·캠페인에 따라 변경될 수 있음)",
            desc: "이 중 삼성닷컴 내 최고 매출 페이지의 메인 운영을 담당하며, 통합 런칭 시 서버·백엔드 담당자와 트래킹·넷퍼널을 협의 적용하고, 매월 변경되는 요구사항에 대응하기 위해 확장성·독립성을 고려한 함수와 모듈화로 페이지 로딩 속도를 개선.",
            subItems: [
              { name: "신혼가전 허브", desc: "samsung.com/sec/event/wedding-festa (메인에서 분기되는 카테고리 진입점)" },
              { name: "삼성 TV / 비스포크 냉장고 / 김치냉장고 외 다수 통합 런칭 페이지 운영"},
            ],
          },
          {
            name: "회원 등급 기반 채널 — 프론트단 1차 검증 레이어",
            desc: "갤럭시 캠퍼스·패밀리넷은 회원 등급과 생년월일로 구매·접속이 제한되는 폐쇄형 채널. 서버단 미들웨어가 1차 차단을 담당했으나, 모든 요청이 서버까지 도달한 뒤 거절되는 구조.",
            subItems: [
              { name: "회원 API·로그인 정보를 받아 프론트단에서 1차 거름망 역할을 하도록 설계해 불필요한 서버 요청 이벤트를 축소", desc: "" },
              { name: "백엔드 부하 감소와 사용자 응답 속도 개선 동시 달성", desc: "" },
            ],
          },
          {
            name: "패밀리넷 — 자회사 연계 제품 검색 모듈",
            desc: "패밀리넷 본 사이트뿐 아니라 링크로 연결된 자회사 홈페이지에서도 동일하게 동작해야 하는 제품 검색 기능을 제작. 외부에서 임베드되어도 독립적으로 동작하도록 제품 API를 받아 자체 검색 레이어 구현.",
            subItems: [
              { name: "한글 초성 검색", desc: "분할 수신한 제품 데이터를 배열로 보유하고 filter로 순회 검색. 한글 유니코드 연산(AC00–D7A3 범위에서 초성 인덱스 추출)으로 자모를 분리해 'ㄱㄹㅅ' → '갤럭시' 매칭 구현" },
              { name: "검색어 하이라이트", desc: "매칭 구간을 시각적으로 강조해 UX 개선" },
              { name: "호출 빈도 제어", desc: "검색 입력에 디바운싱을 적용해 타이핑 중 연속 발생하는 요청을 묶고, 마지막 입력 시점에만 호출되도록 처리해 서버 부하 최소화" },
              { name: "페이로드 최적화", desc: "전체 제품 카탈로그를 한 번에 받지 않고 페이지네이션(?page=1&size=100)으로 분할 수신, 응답에는 검색에 필요한 필드만 포함하도록 ?fields=id,name 형태로 요청. 클라이언트에서 반복 호출로 전체 데이터를 점진적으로 구성. 페이지네이션 방식이 데이터 변경 시 누락·중복 가능성이 있다는 한계는 인지하고 있었으나, 제품 카탈로그 갱신 주기가 길어 트레이드오프가 허용되는 도메인 특성을 고려해 채택." },
            ],
          },
        ],
        link: { 
          href: "https://www.samsung.com/sec/event/wedding-festa/", 
          label: "Web URL" 
        },
      },
      {
        title: "삼성닷컴 멤버십 프로모션 게임",
        summary:
          "기획자·디자이너와 직접 회의하며 기능 단위로 설계·구현. 1–2개월 주기로 교체되는 프로모션 페이지 특성을 고려해, 재사용 가능한 형태로 모듈화하고 이후 신규 런칭에 반복 활용. 클래스 기반 구조로 작성해 게임 인스턴스 단위로 데이터·상태·DOM을 독립 관리.",
        projects: [
          {
            name: "오 마이 재질테스트 — 6타입 가중치 점수 진단 게임 (JavaScript / jQuery)",
            desc: "'MBTI' 컨셉을 차용한 트래픽 유도 진단 게임. 단, 실제 알고리즘은 정통 MBTI 4축 이분법이 아닌 A–F 6타입 누적 점수 시스템으로 설계 — '재질테스트' 컨셉상 더 다양한 결과 분기가 필요했기 때문.",
            subItems: [
              { name: "6타입 가중치 누적", desc: "각 질문 옵션이 단일 타입이 아닌 복수 타입에 동시에 가중치 부여 가능. 10문제 후 누적 점수를 내림차순 정렬해 최고점 타입을 결과로 도출" },
              { name: "양방향 네비게이션 + 상태 복원", desc: "사용자가 '이전' 버튼을 누르면 마지막 선택을 pop하고 이전 화면의 active 상태를 함께 복원. 단순 진단이 아닌 풀이 도중 자유로운 이동 지원" },
              { name: "결과 이미지 프리로드", desc: "게임 시작 시점에 JSON에 정의된 결과 이미지를 미리 Image 객체로 로드해, 결과 화면 전환 시 깜빡임·로딩 지연 제거" },
              { name: "다단계 omni 트래킹", desc: "질문 버튼·결과 화면·SNS 공유(공유/Facebook/네이버블로그/카카오)·응모하기·다시하기·닫기까지 모든 상호작용에 data-omni 를 동적 부여 — 사용자 이탈 지점 분석 가능" },
              { name: "로딩 UX + 모달 상태 방어", desc: "결과 도출 전 3초 로딩 화면에 점 애니메이션 적용, 로딩 중 사용자가 모달을 닫아도 안전하게 분기 처리" },
            ],
            link: { 
              href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/tree/master/module/mbti_game", 
              label: "GitHub Repository" 
            },
          },
          {
            name: "코기 가족 찾기 — 스테이지 기반 숨은 정답 찾기 게임 (JavaScript / jQuery)",
            desc: "'월리를 찾아라'와 '틀린그림찾기'의 하이브리드 컨셉. 스테이지마다 다른 이미지에서 정답 영역을 클릭해 찾는 구조로, 게임 엔진을 데이터 주도(data-driven) 방식으로 설계해 신규 시즌마다 JSON 교체만으로 새 스테이지를 구성 가능.",
            subItems: [
              { name: "레벨·스테이지 진행 구조", desc: "각 스테이지마다 정답 버튼 수·위치·이미지를 JSON으로 정의, 단계별 난이도 차등 적용" },
              { name: "DOM 사전 생성 + 가시성 토글", desc: "전체 스테이지 중 정답 버튼 최대 개수를 사전 계산해 DOM을 한 번만 생성하고, 스테이지 전환 시 pt_hide 클래스로 보이기/숨기기만 수행 — 매 스테이지마다 DOM을 생성·제거하지 않는 성능 최적화" },
              { name: "PC/모바일 좌표 분기 데이터 구조", desc: "같은 이미지를 PC·모바일에서 다른 위치에 배치할 수 있도록 좌표 데이터(pc.x/y)를 디바이스 별로 분리, 디자이너와 disabled·enabled 상태별 이미지 노출 규칙과 비율을 협의해 시각 일관성 확보" },
              { name: "자동 ID 부여 ({stage}-{button})", desc: "기획자·디자이너가 JSON 작성 시 ID를 수동 관리할 필요 없이 스테이지·버튼 인덱스로 자동 생성" },
              { name: "원본 데이터 불변성 (structuredClone + 깊은 복사)", desc: "게임 재시작 시 첫 상태가 손상 없이 복원되도록 가공 데이터와 원본 데이터를 완전히 분리" },
            ],
            link: { 
              href: "https://github.com/bbakkomm/Work_Tool_vanillaJS/tree/master/module/find_the_difference_game", 
              label: "GitHub Repository" 
            },
          },
        ],
      },
    ],
  },
  {
    company: "DXC Technology — ThinQ 하이브리드앱 전담팀 대리",
    meta: "2021.04 — 2023.06 · 2년 2개월",
    role: "프론트엔드 개발",
    stack: "React, JavaScript, Sass, Python, Jira",
    summary:"LG 전자의 오랜 파트너 협력사로서 ThinQ 가전 앱(React 기반 웹뷰, iOS/Android 임베드) 신규 개발 전담팀에 합류, 단독 프론트엔드 개발자로 1년 운영 후 1인이 합류해 2인 체제로 확장. 사내 디자이너·기획자와 직접 협업, 네이티브·백엔드는 타 외주사와 화상 회의 및 LG R&D 센터 현장 협업으로 진행. ThinQ 외에도 LG H&A 본부 임직원용 PC 대시보드, 글로벌 셀러 운영 페이지, webOS 콘텐츠 스토어, 운영 자동화 도구 등 다양한 도메인으로 업무가 확장됨.",
    groups: [
      {
        title: "프로젝트 인프라 — Jira / Confluence / GitLab 매 프로젝트 단위 세팅",
        summary: "신규 프로젝트 킥오프 시점마다 고객사의 요구·개발 방식에 맞춰 Jira·Confluence(Collab)·GitLab 을 직접 파고 커스터마이징. 프로젝트별로 이슈 워크플로우·문서 구조·브랜치 전략이 달랐기에, 매 시작점에서 협업 인프라를 세팅해 팀·외주사·LG 측 담당자가 동일한 컨텍스트에서 작업할 수 있도록 정리.",
        projects: [],
      },
      {
        title: "ThinQ 마이홈리포트",
        summary: "ThinQ 앱 내 '내 가전 사용 패턴 리포트' 화면. 가전이 백엔드로 송신한 데이터를 실시간 가공해, 전기 사용량·문 열림 횟수·전원 ON/OFF 빈도·이웃집 평균 비교 등을 시각화하는 신규 화면. 라우팅 기본 세팅이 갖춰진 상태에서 합류해, Sass 기반의 초기 마크업·공통 스타일·시각화 툴킷을 0부터 설계하고 데이터 바인딩·이벤트 처리까지 담당.",
        projects: [
          {
            name: "차트 라이브러리 전체 이관 — Recharts → 경량 플러그인",
            desc: "초기 구현은 React와 호환성이 좋은 Recharts 로 진행했으나, QA 단계에서 iPhone mini 계열 일부 모델에서 차트가 아예 렌더링되지 않는 현상 발견. 구형이 아닌 신규 모델군에서 발생한 이슈였기에 '구형 비호환'으로 치부할 수 없었고, Canvas 렌더링 호환성 / WebView 버전 차이 로 원인을 추정하되 명확한 재현 조건은 끝까지 특정되지 않음. 일정상 원인 추적을 무한정 끌 수 없어 마이너 레포의 경량 차트 라이브러리로 전체 이관을 결단.",
            subItems: [
              { name: "데이터 가공 레이어는 유지, 그리기 레이어만 교체", desc: "사전에 분리되어 있던 데이터 가공 로직 덕분에 가공된 데이터는 그대로 흘려보내고 차트 렌더 부분만 재구현" },
              { name: "label 충돌·화면 이탈·resize·애니메이션 이벤트 전면 재작성", desc: "경량 라이브러리는 기본 제공 기능이 적어 label 겹침 회피·뷰포트 이탈 보정·리사이즈 대응·전환 애니메이션을 모두 직접 CSS·로직으로 구현" },
              { name: "빠른 의사결정으로 일정 손실을 최소화", desc: "'원인이 특정되지 않는 외부 의존성은 빠르게 갈아끼우고, 가공 레이어 분리로 갈아끼우는 비용을 미리 낮춰둔다' 는 설계 원칙을 검증한 작업" },
            ],
          },
        ],
      },
      {
        title: "ThinQ 생활연구소 — 블로그형 콘텐츠 + YouTube PIP",
        summary: "ThinQ 앱 내 세탁레시피·오염솔루션·의류가전·세탁지식 등 카테고리 기반 블로그형 콘텐츠 화면. 백엔드 콘텐츠 API와 사내 CS팀이 운영하는 CMS 연결 구조로, 게시물 컴포넌트를 직접 제작하고 YouTube API 연동.",
        projects: [
          {
            name: "YouTube IFrame Player API 연동",
            desc: "게시물 내 임베드 영상의 재생·일시정지·종료 상태를 후킹해 화면 상태와 동기화",
          },
          {
            name: "Picture-in-Picture (requestPictureInPicture)",
            desc: "영상 재생 중 사용자가 다른 콘텐츠로 이동해도 영상이 끊기지 않도록 PIP 모드 적용. PIP 트리거 시점 설계 및 상태 객체 수신·처리를 담당했고, OS별 PIP 정책은 네이티브 팀에서 별도 작업",
          },
          {
            name: "접근성",
            desc: "마이홈리포트에서 정립한 패턴 그대로 재사용. 영상 콘텐츠는 CMS에서 발화 텍스트를 컨트롤하도록 연결",
          },
        ],
      },
      {
        title: "ThinQ LG 베스트 케어 — 폼 기반 케어 서비스 신청",
        summary: "LG 케어 서비스(렌탈/케어십·가전세척·이전설치)를 ThinQ 앱에서 신청하는 폼 화면. 마이홈리포트·생활연구소에서 정립한 컴포넌트 구조·데이터 바인딩·접근성 패턴을 재사용해 단기간에 안정적으로 구축. 데이터 조건에 따른 횟수·상태 분기 처리 후 케어 신청은 CS 측에 요청 인터페이스로 연결되는 구조.",
        projects: [],
        link: { 
          href: "https://www.lge.co.kr/lg-thinq/app", 
          label: "Web URL" 
        },
      },
      {
        title: "접근성 — TalkBack / ScreenReader 100% 준수",
        summary: "LG 측의 강한 요구사항(user-friendly 컴플라이언스)으로, 화면계획서에 발화 텍스트·focus 이동 순서가 명세된 환경. 명세 100% 준수가 가능한지 자체가 의문이었으나 결과적으로 도달.",
        projects: [
          {
            name: "자동 발화 보일러플레이트 회피 패턴",
            desc: "button 태그가 'OO 버튼', '2번째 OOO 라디오 버튼' 등으로 OS가 자동 부여하는 발화를 가지기 때문에, 명세된 문장과 충돌하는 케이스 발생. 지울 수 없는 자동 발화 부분은 p 태그 / 커스텀 태그로 마크업을 우회하고 클릭 이벤트를 재바인딩해 발화 문장을 명세대로 통제",
          },
          {
            name: "차트 영역의 동적 aria-label 주입",
            desc: "차트 라이브러리가 데이터 포인트별 label DOM을 렌더링하는 시점을 후킹하거나, 라이브러리가 제공하는 커스텀 옵션을 활용해 데이터 포인트마다 의미 있는 문장 단위로 발화되도록 처리",
          },
          {
            name: "iOS / Android 분기 처리",
            desc: "TalkBack(Android)·VoiceOver(iOS) 가 OS 차원에서 처리하는 언어·발화 규칙 차이가 있어, 동일 마크업에서 발화가 어긋나는 케이스가 다수 존재. 프론트단에서는 User Agent 기반 분기로 마크업·속성을 조정, 네이티브 측은 네이티브 팀이 별도 작업해 양 OS 호환을 맞춤",
          },
          {
            name: "2단계 검증",
            desc: "자동화 접근성 검사 도구로 1차 점검 후, ScreenReader를 켜고 화면계획서대로 발화·focus 흐름을 1:1 검수",
          },
        ],
      },
      {
        title: "LG H&A 본부 데이터 관리 대시보드 (PC 웹)",
        summary: "LG H&A(Home Appliance & Air Solution) 본부 전체용 데이터 시각화 대시보드. 본부 임직원·마케팅·데이터 분석가·임원 보고까지 한 도구에서 커버하는 대규모 프로젝트.",
        projects: [
          {
            name: "0부터의 마크업·공통 스타일 설계",
            desc: "라우팅 기본 세팅을 받은 상태에서 시작, PC 환경에 맞는 디자인 토큰·레이아웃·공통 컴포넌트를 새로 설계",
          },
          {
            name: "7종 차트 컴포넌트 직접 제작",
            desc: "회의를 통해 본부가 보고 싶어 하는 데이터 패턴을 정의하고, 이에 맞는 약 7종의 차트 모듈을 Recharts 기반으로 커스터마이징해 컴포넌트화. PC 환경이라 마이홈리포트 당시의 WebView 호환 이슈는 해당 없음",
          },
          {
            name: "성능 최적화",
            desc: "일반적인 React 성능 최적화 (React.memo 기반 불필요한 재렌더 차단, 비용 큰 계산은 useMemo로 캐싱, 차트 데이터 가공은 마운트 시점에 한 번만 수행) 를 적용해 대량 데이터 렌더링 시 사용성 확보",
          },
        ],
      },
      {
        title: "LG Seller Lounge — 글로벌 운영 페이지 다범위 캘린더 모듈",
        summary: "LG의 글로벌 셀러 운영 페이지. 사내 CS팀이 운영 중 데이터 내려받기(엑셀 다운로드) 시 기간을 텍스트로 입력하는 방식이라 휴먼 에러가 다발. 요구 범위는 1일 / 1주 / 1달 / 분기 / 홀·짝수월 / 년도별 6종으로, 당시 시장에 해당 케이스를 모두 자유롭게 커스터마이징할 수 있는 캘린더 라이브러리가 존재하지 않았음.",
        projects: [
          {
            name: "moment.js 기반 다범위 캘린더 모듈 직접 제작",
            desc: "6종의 비표준 범위를 단일 컴포넌트에서 토글하는 형태로 통합, 텍스트 입력 → UI 기반 선택 전환으로 운영 휴먼 에러를 차단",
          },
          {
            name: "'홀/짝수월' 같은 도메인 특화 범위 처리 로직",
            desc: "도메인 특화 범위는 라이브러리에 일임할 수 없는 영역이라, 달력 셀 단위에서 직접 짝/홀수월 인덱스를 계산해 선택 가능 영역을 시각적으로 표시하는 형태로 구현",
          },
        ],
        link: { 
          href: "https://seller.lgappstv.com/seller/main/Main.lge", 
          label: "Web URL" 
        },
      },
      {
        title: "LG Content Store — webOS 스마트 TV 콘텐츠 페이지",
        summary: "LG 스마트 TV(webOS) 의 콘텐츠 스토어 웹페이지. TVING 등 외부 콘텐츠 앱들의 메타데이터를 종합해 노출하는 페이지로, 데이터 바인딩·조건 분기·페이지 제작을 담당.",
        projects: [],
        link: { 
          href: "https://kr.lgappstv.com/main", 
          label: "Web URL" 
        },
      },
      {
        title: "Python — 사내 CS팀 운영 자동화 도구 (PyInstaller exe 배포)",
        summary: "CS팀이 운영 중 반복적으로 수행하던 작업을 팀장이 정리한 요청 내역을 기반으로 Python 자동화 도구로 제작, PyInstaller로 exe 패키징해 비개발자도 사용 가능한 형태로 사내 배포.",
        projects: [
          {
            name: "OCR 자동 로그인 도구 (cv2 / OpenCV / pytesseract)",
            desc: "운영자가 매일 반복 수행하던 로그인 절차에서 보안 이미지 인식·자동 입력까지 자동화. 팀 내 가장 많이 쓰인 워크플로우 중 하나",
          },
          {
            name: "일일 raw 데이터 정리 → 이미지 자동 생성 워크플로우 (Selenium / Openpyxl / PIL)",
            desc: "운영 Admin 페이지에서 raw 데이터를 받아 분기 처리·정리한 뒤 canvas 기반 이미지로 변환해 보고 형태로 산출. 데이터 다운로드부터 시각 자료화까지 한 도구로 처리되어 팀 내 가장 많이 사용된 워크플로우",
          },
          {
            name: "이외 자동화 실행 도구",
            desc: "Python-docx (Word 자동화) / Openpyxl (Excel 자동화) / PIL (사진 사이즈·포맷 변환) — 각 영역별 반복 작업을 단일 exe로 제공",
          },
        ],
      },
    ],
  },
  {
    company: "이글루코퍼레이션 — 보안관제팀 사원",
    meta: "BC카드 상주 · 2020.03 — 2021.03 · 1년",
    role: "정보보안관제",
    stack: "Python, FireEYE, TippingPoint, NMS",
    summary: "이글루코퍼레이션 소속으로 BC카드 보안관제 센터에 상주 파견, 카드사 인프라 전반의 보안 이벤트를 24시간 모니터링·대응. 정기 보고서(일/주/월) 작성과 F/W·IPS·WAF 장비 백업 등 정형 업무 외에, 취약점 점검·일괄차단 IP 리스트 추출 등 반복 업무를 Python 웹프로그램으로 자동화해 운영 효율과 휴먼 에러 방지를 개선. APT 공격 대응(FireEYE EX/NX, Spamsniper), Spoofed DDoS·SYN Port Scan 등 실 공격 시나리오 분석 경험.",
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
    role: "퍼블리싱, PHP 개발",
    stack: "JavaScript, PHP, MySQL, phpMyAdmin",
    summary: "첫 직장으로 PHP·MySQL 기반의 클라이언트 사이트 런칭·이관·데이터 마이그레이션을 단독 진행. 1년 3개월간 병원·학회·프랜차이즈·제조 기업 등 15개 이상 도메인의 사이트를 다뤘으며, 디자이너·기획자·대표자와 직접 커뮤니케이션하며 요구를 받아 클라이언트 응대 → 설계 → 개발 → 운영 인계까지 한 사람이 책임지는 형태. 다국어(KOR·ENG·CHN·JPN), 카카오맵·SMS·Vimeo 등 외부 API 연동, Gnuboard 커스터마이징, 비개발자 운영자가 직접 다룰 수 있는 어드민 UI 설계 등을 반복 경험하며 작은 단위 풀스택 운영 역량을 쌓음.",
    groups: [
      {
        title: "클라이언트 사이트 런칭",
        summary:
          "병원·기업·학회·프렌차이즈 등 15개 이상의 클라이언트 사이트의 런칭·이관·데이터 마이그레이션을 단독 진행했습니다. (비인가 및 클로즈된 사이트 제외)",
        projects: [
          { 
            name: "이화수 육개장", desc: "프랜차이즈 사이트 리뉴얼 / 181개 매장 DB 재설계 및 통합 / 카카오맵 API 커스터마이징 / 창업 문의 SMS 자동화", showArrow: true,
            link: { 
              href: "http://ihwasoo.com/", 
              label: "Web URL" 
            },
          },
          { 
            name: "국제통합의과학회", desc: "학회 사이트 신규 구축 / 7단계 회원 등급 권한 체계 / 승인제 회원가입 운영 / Vimeo 영상 자료실 연동", showArrow: true,
            link: { 
              href: "https://www.imsacademy.net/", 
              label: "Web URL" 
            },
          },
          { 
            name: "대전시립노인병원", desc: "병원 홈페이지 런칭 / 진료일정표 캘린더 관리자 편집 / 자원봉사 신청 정원 제한·자동 마감 / 카카오톡 오픈채팅 연동", showArrow: true,
            link: { 
              href: "http://www.ilovenoin.com/", 
              label: "Web URL" 
            },
          },
          { 
            name: "유성한가족병원", desc: "병원 홈페이지 런칭 / 의료진 근무표 관리자 편집 UI / 반응형 (PC·Mobile) / IE11 대응", showArrow: true,
            link: { 
              href: "http://han.or.kr", 
              label: "Web URL" 
            },
          },
          { 
            name: "명신메디컬", desc: "의료기기 회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG·CHN) / Gnuboard 유튜브 임베드 모듈 제작 / 비개발자 운영자용 제품 등록 폼", showArrow: true,
            link: { 
              href: "http://www.msmedi.com/", 
              label: "Web URL" 
            },
          },
          { 
            name: "두타기술", desc: "회사 홈페이지 런칭 / 다국어 적용 (ENG·KOR, 영문 디폴트) / 가변 사양표 DB 1:N 설계 / 비개발자 어드민 운영", showArrow: true,
            link: { 
              href: "http://www.duta-rnd.com/", 
              label: "Web URL" 
            },
          },
          { 
            name: "대원산업", desc: "회사 홈페이지 리뉴얼 / 다국어 적용 (KOR·ENG·CHN) / 호스팅 트래픽 제한 하 이미지 최적화 / IE11 인터랙션 단계적 대응 합의", showArrow: true,
            link: { 
              href: "http://daewonic.com", 
              label: "Web URL" 
            },
          },
          { 
            name: "오픈엠", desc: "회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG) / 카카오맵 연동 / Gnuboard 게시판 다국어 분리 운영", showArrow: true,
            link: { 
              href: "http://openm.com/", 
              label: "Web URL" 
            },
          },
          { 
            name: "BMST", desc: "회사 홈페이지 런칭 / 다국어 적용 (KOR·ENG·CHN·JPN) / 연간 관리 일정 운영자 편집 UI / E-book·카탈로그 디지털 배포", showArrow: true,
            link: { 
              href: "http://bmst.co.kr", 
              label: "Web URL" 
            },
          },
          { 
            name: "김형제", desc: "프랜차이즈 본사 홈페이지 런칭 / 가맹 모집 중심 IA 설계 / 매출 지표 시각화 / 지역 필터 슬러그 상수화로 휴먼 에러 차단", showArrow: true,
            link: { 
              href: "http://kimbro.co.kr/", 
              label: "Web URL" 
            },
          },
          { 
            name: "여수요양병원", desc: "병원 홈페이지 런칭 / 보호자 동선 중심 IA 재설계 / Gnuboard 스킨 커스터마이징 / 게시판 스팸 필터링", showArrow: true,
            link: { 
              href: "http://www.newstart.co.kr/", 
              label: "Web URL" 
            },
          },
        ],
      },
    ],
  },
  {
    company: "프리랜서 프로젝트",
    meta: "2024.01",
    role: "프론트엔드 개발",
    stack: "JavaScript, Cafe24 Builder",
    summary: "재직 중 외주로 진행한 단기 프로젝트. 기획·디자인 담당자와 3인 체제로 10일 내 완료.",
    groups: [
      {
        title: "사이언스스타 — 과학 실험 기구 쇼핑몰 리뉴얼",
        summary: "(주)사이언스스타 공식 쇼핑몰 리뉴얼. 초·중·고 과학 교사와 학교 행정 담당자, 대량 도매 중간업자가 학년·학기·단원 단위로 실험 기구를 빠르게 찾고 후불제 결제와 견적서·품의서를 직접 발급할 수 있도록 정보 구조와 자가 처리 흐름을 재설계. Cafe24 스마트디자인 빌더 제약 안에서 바닐라 자바스크립트와 html2canvas로 전 기능을 구현했고, 오픈 후 CS 문의 70% 감소, 카카오 실시간 채팅 연동 후 90% 이상 감소.",
        projects: [
          {
            name: "학년·학기·단원 매핑 IA 재설계",
            desc: "기존 카테고리 구조를 학년·학기·단원 단위로 재편해 교사·행정 담당자가 실험 기구를 빠르게 탐색할 수 있도록 정보 구조를 새로 정의",
          },
          {
            name: "견적서·품의서 JPG 출력 (html2canvas)",
            desc: "후불제 결제 플로우에 맞춰 견적서·품의서를 브라우저 내에서 직접 발급·JPG 저장. Cafe24 환경 내 외부 라이브러리를 스크립트 주입 방식으로 적용",
          },
          {
            name: "CS 문의 70% → 90%+ 감소",
            desc: "자가 처리 흐름 재설계로 오픈 직후 CS 문의 70% 감소, 카카오 실시간 채팅 연동 이후 90% 이상 감소",
          },
        ],
        link: {
          href: "http://sstar.biz/",
          label: "Web URL",
        },
      },
    ],
  },
];
