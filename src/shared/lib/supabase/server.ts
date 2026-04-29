import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버 컴포넌트 / Route Handler용 Supabase 클라이언트.
 * Next.js 16에서는 cookies()가 비동기이므로 await 필수.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // 서버 컴포넌트에서 호출된 경우 쿠키 쓰기가 불가능하므로 무시합니다.
            // 세션 갱신은 미들웨어에서 처리합니다.
          }
        },
      },
    },
  );
}
