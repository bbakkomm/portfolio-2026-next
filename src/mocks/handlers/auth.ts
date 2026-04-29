import { http, HttpResponse } from "msw";

const SUPABASE_URL = "https://jxtzlhhcpujseyheqplh.supabase.co";

export const authHandlers = [
  // POST - 인증 토큰 발급
  http.post(`${SUPABASE_URL}/auth/v1/token*`, () => {
    return HttpResponse.json({
      access_token: "mock-access-token",
      token_type: "bearer",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      refresh_token: "mock-refresh-token",
      user: {
        id: "mock-user-id",
        email: "mock@example.com",
        role: "authenticated",
        created_at: "2024-01-01T00:00:00.000Z",
      },
    });
  }),
];
