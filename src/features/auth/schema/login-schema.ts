import { z } from "zod";

export const loginSchema = z.object({
  user_id: z
    .string()
    .min(1, { message: "필수항목 입니다." })
    .email({ message: "이메일 형식이 아닙니다." }),
  user_password: z.string().min(1, { message: "필수항목 입니다." }),
});
