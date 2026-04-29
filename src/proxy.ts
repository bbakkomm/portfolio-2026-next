import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/shared/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  // /admin/* 경로 보호: 미인증 또는 비-admin 이메일이면 홈으로 리다이렉트
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;
  if (isAdminRoute && !isAdmin) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
