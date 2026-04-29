import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  ADMIN_EMAIL: z.string().email({ message: "ADMIN_EMAIL은 유효한 이메일이어야 합니다." }),
});

const parsed = serverEnvSchema.safeParse({
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});

if (!parsed.success) {
  console.error("서버 환경변수 검증 실패:", parsed.error.flatten().fieldErrors);
  throw new Error(
    "서버 환경변수 설정이 올바르지 않습니다. ADMIN_EMAIL 환경변수를 확인하세요."
  );
}

export const serverEnv = parsed.data;
