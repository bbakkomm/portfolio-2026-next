"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function isDNT(): boolean {
  return (
    typeof navigator !== "undefined" &&
    (navigator.doNotTrack === "1" || (navigator as any).msDoNotTrack === "1")
  );
}

function isMSWEnabled(): boolean {
  return process.env.NEXT_PUBLIC_API_MOCKING === "enabled";
}

async function sendEnter(viewId: string, path: string, referrer: string | null) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "enter", viewId, path, referrer }),
      keepalive: true,
    });
  } catch {
    // fire-and-forget, 실패는 무시
  }
}

function sendLeave(viewId: string, durationMs: number) {
  const payload = JSON.stringify({ action: "leave", viewId, durationMs });
  const blob = new Blob([payload], { type: "application/json" });
  try {
    navigator.sendBeacon("/api/track", blob);
  } catch {
    // 브라우저가 sendBeacon을 지원하지 않으면 무시
  }
}

export function useTrackPageView() {
  const pathname = usePathname();
  const viewIdRef = useRef<string | null>(null);
  const enterTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isDNT() || isMSWEnabled()) return;

    const viewId = crypto.randomUUID();
    const referrer = document.referrer || null;
    viewIdRef.current = viewId;
    enterTimeRef.current = Date.now();

    sendEnter(viewId, pathname, referrer);

    function handleLeave() {
      if (!viewIdRef.current) return;
      const durationMs = Date.now() - enterTimeRef.current;
      sendLeave(viewIdRef.current, durationMs);
      viewIdRef.current = null;
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") handleLeave();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", handleLeave);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", handleLeave);
      // SPA 내비게이션: 다음 pathname effect 시작 전에 leave
      handleLeave();
    };
  // pathname 변경 시마다 새 enter/leave 사이클
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
