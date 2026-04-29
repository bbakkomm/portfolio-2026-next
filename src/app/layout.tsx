import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "sonner";
import { MSWInitializer } from "@/mocks/msw-initializer";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { GsapProvider } from "@/shared/providers/gsap-provider";
import TopButton from "@/shared/components/top-button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";

export const metadata: Metadata = {
  title: { default: "Psh' Portfolio", template: "%s | Portfolio" },
  description: "프론트엔드 개발자 박성환의 포트폴리오 사이트입니다.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Psh' Portfolio",
    description: "프론트엔드 개발자 박성환의 포트폴리오 사이트입니다.",
    url: siteUrl,
    siteName: "Psh' Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Psh' Portfolio",
    description: "프론트엔드 개발자 박성환의 포트폴리오 사이트입니다.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-[#171717] text-foreground min-h-screen font-pretendard">
        <QueryProvider>
          <GsapProvider>
            <TooltipProvider>
              <MSWInitializer />
              {children}
              <Toaster richColors theme="dark" />
              <TopButton />
            </TooltipProvider>
          </GsapProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
