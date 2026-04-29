"use client";

import { useEffect } from "react";

export function MSWInitializer() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return;

    import("./browser").then(({ worker }) => {
      worker.start({
        onUnhandledRequest: "bypass",
      });
    });
  }, []);

  return null;
}
