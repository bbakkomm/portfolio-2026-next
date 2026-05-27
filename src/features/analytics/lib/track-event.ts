"use client";

/**
 * 이벤트를 수동으로 전송한다.
 *
 * 사용 예시:
 *   trackEvent("resume_download")
 *   trackEvent("project_click", { id: 3, title: "포트폴리오" })
 */
export async function trackEvent(
  name: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "event",
        eventId: crypto.randomUUID(),
        path: window.location.pathname,
        name,
        properties,
      }),
      keepalive: true,
    });
  } catch {
    // fire-and-forget
  }
}
