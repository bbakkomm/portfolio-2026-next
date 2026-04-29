import { http, HttpResponse } from "msw";

const SUPABASE_URL = "https://jxtzlhhcpujseyheqplh.supabase.co";

const mockProjects = [
  {
    id: 1,
    title: "Mock Project 1",
    company: "Test Corp",
    description: "테스트 프로젝트입니다.",
    start_date: "2024-01-01",
    end_date: "2024-06-30",
    project_url: "https://example.com",
    thumbnail: "mock-thumb.webp",
    img_key: "mock-key-1",
  },
  {
    id: 2,
    title: "Mock Project 2",
    company: "Another Corp",
    description: "두 번째 테스트 프로젝트입니다.",
    start_date: "2024-07-01",
    end_date: null,
    project_url: null,
    thumbnail: "mock-thumb-2.webp",
    img_key: "mock-key-2",
  },
];

export const projectHandlers = [
  // GET - 프로젝트 목록 조회
  http.get(`${SUPABASE_URL}/rest/v1/project_meta*`, () => {
    return HttpResponse.json(mockProjects);
  }),

  // POST - 프로젝트 생성
  http.post(`${SUPABASE_URL}/rest/v1/project_meta*`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      { ...body, id: Date.now() },
      { status: 201 }
    );
  }),

  // PATCH - 프로젝트 수정
  http.patch(`${SUPABASE_URL}/rest/v1/project_meta*`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body, { status: 200 });
  }),

  // DELETE - 프로젝트 삭제
  http.delete(`${SUPABASE_URL}/rest/v1/project_meta*`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
