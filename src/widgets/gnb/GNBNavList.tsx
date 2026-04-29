"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useStore from "@/shared/store/useStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

interface NavPage {
  path: string;
  pathName: string;
  AuthPage: boolean;
}

const NAVPAGE_OBJECT: NavPage[] = [
  { path: "/resume", pathName: "Resume", AuthPage: false },
  { path: "/work", pathName: "Work", AuthPage: false },
  { path: "/admin", pathName: "admin", AuthPage: true },
];

const GNBNavList = () => {
  const [view, setView] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const authentication = useStore((s) => s.authentication);

  const [isPC, setIsPC] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width:1024px)");
    setIsPC(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPC(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // PC에선 모바일 메뉴 닫기
  useEffect(() => {
    if (isPC) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPC]);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const { createClient } = await import("@/shared/lib/supabase/client");
      await createClient().auth.signOut();
    },
    onSuccess: () => {
      toast.info("로그아웃 되었습니다");
    },
  });

  const openMenu = () => {
    setView(true);
    if (!menuWrapperRef.current) return;
    menuWrapperRef.current.style.transform = "translateX(0%)";
    menuWrapperRef.current.style.transition = "transform 0.4s ease";
  };

  const closeMenu = () => {
    if (!menuWrapperRef.current) return;
    menuWrapperRef.current.style.transform = "translateX(100%)";
    menuWrapperRef.current.style.transition = "transform 0.35s ease";
    const timer = setTimeout(() => setView(false), 350);
    return () => clearTimeout(timer);
  };

  return (
    <>
      {view && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[800] h-screen"
          onClick={closeMenu}
        />
      )}

      <div
        ref={menuWrapperRef}
        className={cn(
          "fixed right-0 top-0 w-4/5 md:w-2/4 max-w-[600px] h-screen z-[900] bg-zinc-900 text-zinc-100 px-10 pt-10 pb-20 flex flex-col shadow-2xl",
          !view && "translate-x-full"
        )}
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex justify-end mb-10">
          <X className="size-10 cursor-pointer" onClick={closeMenu} />
        </div>

        <div className="flex flex-col gap-8 text-right mt-10">
          {NAVPAGE_OBJECT.map((e, idx) => {
            if (!authentication && e.AuthPage) return null;
            return (
              <div
                key={idx}
                className={cn(
                  "text-3xl md:text-4xl font-montserrat cursor-pointer hover:text-pink-400 transition-colors",
                  e.path === pathname && "text-pink-400 underline"
                )}
                onClick={() => {
                  if (e.path === pathname) return;
                  if (!e.AuthPage || authentication) {
                    router.push(e.path);
                    closeMenu();
                  }
                }}
              >
                {e.pathName}
              </div>
            );
          })}
          {authentication && (
            <span
              className="text-3xl md:text-3xl font-montserrat cursor-pointer hover:text-pink-400 transition-colors"
              onClick={async () => {
                await mutateAsync();
                closeMenu();
                router.push("/");
              }}
            >
              LogOut
            </span>
          )}{" "}
        </div>
      </div>

      <nav
        className="grid grid-cols-[auto_1fr] gap-20 py-1 w-full"
        ref={headerRef}
      >
        <button onClick={() => router.push("/")}>Psh&apos; Portfolio</button>
        <div className="gap-10 md:flex hidden w-full">
          {NAVPAGE_OBJECT.map((e, idx) => {
            if (e.AuthPage && !authentication) return null;

            return (
              <button
                key={`${e.pathName}:${idx}`}
                className={cn(
                  "text-sm opacity-60 hover:opacity-100",
                  e.path.split("/")[1] === pathname.split("/")[1] &&
                    "border-b opacity-100"
                )}
                onClick={() => router.push(e.path)}
              >
                {e.pathName}
              </button>
            );
          })}
          <div className="ml-auto flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://open.kakao.com/o/sq4skkTf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg border border-zinc-50/10 hover:border-zinc-50/30 transition-all"
                  >
                    <img
                      src="/svg/kakao.svg"
                      alt="오픈 카카오톡"
                      width={14}
                      height={14}
                      className="opacity-50 group-hover:opacity-100 transition-all filter-[brightness(0)_invert(1)]"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-pink-400 text-zinc-50 border border-pink-300"
                  arrowClassName="bg-pink-400 fill-pink-400"
                >
                  오픈 카카오톡
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://github.com/bbakkomm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg border border-zinc-50/10 hover:border-zinc-50/30 transition-all"
                  >
                    <img
                      src="/svg/giticon.svg"
                      alt="GitHub"
                      width={14}
                      height={14}
                      className="opacity-50 group-hover:opacity-100 transition-all filter-[brightness(0)_invert(1)]"
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-pink-400 text-zinc-50 border border-pink-300"
                  arrowClassName="bg-pink-400 fill-pink-400"
                >
                  GitHub
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {authentication && (
              <div
                onClick={async () => {
                  await mutateAsync();
                  router.push("/");
                }}
                className="bg-transparent! transition-all duration-100 group p-2 h-auto rounded-lg border border-zinc-50/10 hover:border-indigo-200/50"
              >
                <div className="relative">
                  <LogOut className="size-3.5 md:size-3.5 fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
                </div>
              </div>
            )}{" "}
          </div>
        </div>

        <div
          className="group cursor-pointer relative items-center justify-center md:hidden flex ml-auto"
          onClick={openMenu}
        >
          {/* 메인 버튼 */}
          <div className="relative size-full rounded-lg backdrop-blur-sm flex items-center justify-center group-hover:border-slate-400/70 transition-all duration-300">
            {/* 햄버거 아이콘 */}
            <div className="flex flex-col gap-1.5 items-center justify-center">
              <span className="w-6 h-0.5 bg-slate-300 rounded-full group-hover:bg-slate-100 transition-colors duration-300" />
              <span className="w-6 h-0.5 bg-slate-300 rounded-full group-hover:bg-slate-100 transition-colors duration-300" />
              <span className="w-6 h-0.5 bg-slate-300 rounded-full group-hover:bg-slate-100 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GNBNavList;
