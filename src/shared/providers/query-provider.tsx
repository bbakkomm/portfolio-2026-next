"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { makeQueryClient } from "@/shared/lib/query-client";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState로 클라이언트측 QueryClient 생성 (서버 사이드와 독립)
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools는 개발 환경에서만 렌더링 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
