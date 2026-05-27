/** UA 문자열에서 device/browser/os를 파싱한다. */
export interface UAParsed {
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  os: string;
}

export function parseUA(ua: string): UAParsed {
  const s = ua.toLowerCase();

  // device
  const device: UAParsed["device"] = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
    ? "tablet"
    : /mobile|iphone|ipod|android.*mobile|blackberry|windows phone/i.test(ua)
      ? "mobile"
      : "desktop";

  // browser (major only)
  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\//i.test(ua)) browser = "Opera";
  else if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) browser = "Chrome";
  else if (/firefox\//i.test(ua)) browser = "Firefox";
  else if (/safari\//i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
  else if (/msie|trident/i.test(ua)) browser = "IE";

  // os
  let os = "Other";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/mac os x/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  void s; // suppress unused warning
  return { device, browser, os };
}
