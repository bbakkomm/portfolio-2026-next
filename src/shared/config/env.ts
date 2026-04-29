import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url({
    message: "NEXT_PUBLIC_SUPABASE_URL은 유효한 URL이어야 합니다.",
  }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, {
    message: "NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다.",
  }),
  NEXT_PUBLIC_IMAGE_URL: z.string().url({
    message: "NEXT_PUBLIC_IMAGE_URL은 유효한 URL이어야 합니다.",
  }),
  NEXT_PUBLIC_API_MOCKING: z
    .enum(["enabled", "disabled"])
    .default("disabled"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
});

if (!parsed.success) {
  console.error(
    "환경변수 검증 실패:\n",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error(
    `환경변수 설정이 올바르지 않습니다. 자세한 내용은 위 에러를 확인하세요.`,
  );
}

export const env = parsed.data;
