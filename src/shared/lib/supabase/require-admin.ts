import "server-only";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./server";
import { serverEnv } from "@/shared/config/env.server";

/**
 * 현재 세션이 admin(ADMIN_EMAIL 일치)인지 검증합니다.
 * 미인증 또는 비-admin이면 Error를 throw합니다.
 * - layout/page: catch 후 redirect("/")
 * - server action: 그대로 throw → 클라이언트 onError 처리
 */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== serverEnv.ADMIN_EMAIL) {
    throw new Error("권한이 없습니다.");
  }

  return user;
}
