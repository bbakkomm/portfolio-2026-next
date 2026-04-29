import { http, HttpResponse } from "msw";

const SUPABASE_URL = "https://jxtzlhhcpujseyheqplh.supabase.co";

export const storageHandlers = [
  // POST - 파일 업로드
  http.post(`${SUPABASE_URL}/storage/v1/object/*`, () => {
    return HttpResponse.json({ Key: "project/mock-image.webp" });
  }),
];
