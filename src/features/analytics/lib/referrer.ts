export type ReferrerSource = "direct" | "search" | "social" | "internal" | "referral";

const SEARCH_HOSTS = [
  "google.", "bing.", "yahoo.", "naver.", "daum.", "duckduckgo.", "baidu.",
  "yandex.", "ask.", "ecosia.",
];
const SOCIAL_HOSTS = [
  "facebook.", "instagram.", "twitter.", "x.com", "t.co", "linkedin.",
  "youtube.", "tiktok.", "reddit.", "pinterest.", "snapchat.", "threads.",
  "kakao.", "band.us",
];

export function classifyReferrer(
  referrer: string | null | undefined,
  siteHost: string,
): ReferrerSource {
  if (!referrer) return "direct";

  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "direct";
  }

  if (host === siteHost.replace(/^www\./, "")) return "internal";
  if (SEARCH_HOSTS.some((h) => host.includes(h))) return "search";
  if (SOCIAL_HOSTS.some((h) => host.includes(h))) return "social";
  return "referral";
}
