"use client";

import { useTrackPageView } from "./hooks/useTrackPageView";
import { useTrackEvents } from "./hooks/useTrackEvents";

/** root layout에 주입하는 방문자 추적 컴포넌트. DOM을 렌더하지 않는다. */
export function AnalyticsTracker() {
  useTrackPageView();
  useTrackEvents();
  return null;
}
