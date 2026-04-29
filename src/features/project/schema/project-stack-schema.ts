import { z } from "zod";

export const projectStackSchema = z.object({
  stackItem: z.string().min(1, { message: "stack명 을 입력해주세요" }),
  stackType: z.string().min(1, { message: "stack 타입을 선택해주세요" }),
});
