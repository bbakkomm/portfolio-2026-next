import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * service_role 키를 사용하는 Supabase 클라이언트.
 * RLS를 우회하므로 반드시 requireAdmin() 통과 후 또는 /api/track(서버 검증 완료) 에서만 호출할 것.
 * 클라이언트 컴포넌트에서 import 시 빌드 에러 발생 ("server-only").
 */
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
