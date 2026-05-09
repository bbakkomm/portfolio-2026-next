import { z } from "zod";

export const blogSchema = z.object({
  slug: z
    .string()
    .min(1, { message: "필수항목" })
    .regex(/^[a-z0-9-]+$/, { message: "영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다" }),
  title: z.string().min(1, { message: "필수항목" }),
  excerpt: z.string().default(""),
  thumbnail: z.string().min(1, { message: "썸네일을 업로드해주세요" }),
  contents: z.string().min(1, { message: "본문을 입력해주세요" }),
  status: z.enum(["draft", "published"]),
  categoryId: z.number().min(1, { message: "카테고리를 선택해주세요" }),
  tagIds: z.array(z.number()).default([]),
  newTags: z.array(z.string()).default([]),
});

export type BlogSchema = z.infer<typeof blogSchema>;
