import { useState, useEffect, type RefObject } from "react";

export function useScrollFadeIn(
  ref: RefObject<Element | null>,
  margin = "0px 0px -10% 0px"
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // 요소가 뷰포트 아래쪽에 있음 → 위로 스크롤해서 아직 못 도달한 상태로 복귀
          setVisible(false);
        }
        // top <= 0 이면 이미 위로 지나친 것이므로 visible 유지
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);

  return visible;
}
