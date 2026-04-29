import { QueryClient } from "@tanstack/react-query";

/**
 * 서버 컴포넌트에서 매 요청마다 새로운 QueryClient 인스턴스를 생성합니다.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * 브라우저 환경에서 QueryClient 싱글톤을 반환합니다.
 * 서버에서는 호출하지 마세요 — makeQueryClient()를 사용하세요.
 */
export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // 서버: 항상 새 인스턴스 반환
    return makeQueryClient();
  }

  // 브라우저: 기존 인스턴스가 없으면 새로 생성
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
