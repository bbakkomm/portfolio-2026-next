import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, { message: "필수항목" }),
  company: z
    .string()
    .min(1, { message: "필수 항목 입니다" })
    .max(200, { message: "200글자 내외로 기재해주세요" }),
  members: z.string().min(1, { message: "필수항목입니다." }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
  contents: z.string().min(1, { message: "필수 항목" }),
  url: z.string().nullable(),
  thumbnail: z.string().min(1, { message: "필수항목" }),
  useStack: z
    .array(z.number())
    .min(1, { message: "기술을 하나 이상 선택하세요." }),
  surmmry: z.array(
    z.object({
      id: z.number().optional(),
      title: z.string().min(1, { message: "필수항목" }),
      contents: z.string().min(1, { message: "필수항목" }),
    })
  ),
  workRange: z
    .object({
      start: z.date().nullable(),
      end: z.date().nullable(),
    })
    .refine(({ start, end }) => !!start && !!end, {
      message: "작업 기간을 모두 선택해 주세요.",
      path: [""],
    }),
});
