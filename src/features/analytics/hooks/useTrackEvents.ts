"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/track-event";

/**
 * data-track 속성이 있는 요소 클릭을 자동으로 수집한다.
 *
 * 사용 예시 (HTML):
 *   <button data-track="resume_download">이력서 다운로드</button>
 *   <a data-track="github_link" data-track-props='{"repo":"portfolio"}'>GitHub</a>
 */
export function useTrackEvents() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") return;

    function handleClick(e: MouseEvent) {
      const target = (e.target as Element).closest("[data-track]");
      if (!target) return;

      const name = target.getAttribute("data-track");
      if (!name) return;

      const rawProps = target.getAttribute("data-track-props");
      let properties: Record<string, unknown> | undefined;
      if (rawProps) {
        try {
          properties = JSON.parse(rawProps);
        } catch {
          // 잘못된 JSON은 무시
        }
      }

      trackEvent(name, properties);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
