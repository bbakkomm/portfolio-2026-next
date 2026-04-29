"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center flex-col justify-center bg-black text-zinc-50">
      <h1 className="text-3xl mb-3 text-center">
        <span className="text-red-300 mb-3 inline-block">&quot;404&quot;</span>
        <br />
        권한이 없거나 존재하지 않는 페이지입니다.
      </h1>
      <p className="mb-10 text-sm text-zinc-300">
        아래의 버튼을 눌러 정상 경로로 접근 부탁드립니다.
      </p>
      <Button
        variant="outline"
        className="rounded-full p-6"
        onClick={() => {
          const isSameOrigin =
            document.referrer &&
            new URL(document.referrer).origin === window.location.origin;
          if (isSameOrigin) {
            router.back();
          } else {
            router.push("/");
          }
        }}
      >
        이전화면
      </Button>
    </div>
  );
}
