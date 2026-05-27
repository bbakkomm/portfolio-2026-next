import "server-only";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const VID_COOKIE = "pf_vid";
const SID_COOKIE = "pf_sid";
const VID_MAX_AGE = 60 * 60 * 24 * 400; // 400일
const SID_MAX_AGE = 60 * 30;             // 30분

export interface VisitorIds {
  visitorId: string;
  sessionId: string;
  /** route handler 응답에 Set-Cookie 해야 할 새 쿠키 목록 */
  setCookies: { name: string; value: string; maxAge: number }[];
}

/**
 * 요청 쿠키를 읽어 visitor_id / session_id를 반환한다.
 * 없으면 신규 UUID를 발급하고 setCookies에 담아 반환한다.
 */
export async function resolveVisitor(): Promise<VisitorIds> {
  const cookieStore = await cookies();

  const existingVid = cookieStore.get(VID_COOKIE)?.value;
  const existingSid = cookieStore.get(SID_COOKIE)?.value;

  const visitorId = existingVid ?? randomUUID();
  const sessionId = existingSid ?? randomUUID();

  const setCookies: VisitorIds["setCookies"] = [];

  if (!existingVid) {
    setCookies.push({ name: VID_COOKIE, value: visitorId, maxAge: VID_MAX_AGE });
  }
  // sid는 매 요청마다 갱신해서 슬라이딩 만료
  setCookies.push({ name: SID_COOKIE, value: sessionId, maxAge: SID_MAX_AGE });

  return { visitorId, sessionId, setCookies };
}
