import type { Metadata, Viewport } from "next";
import "./globals.css";
import { pretendard, montserrat, poppins, bebas, bruno, brunoSC, nexon } from "@/shared/styles/fonts";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "sonner";
import { MSWInitializer } from "@/mocks/msw-initializer";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { GsapProvider } from "@/shared/providers/gsap-provider";
import TopButton from "@/shared/components/top-button";
import { ScrollReset } from "@/shared/components/scroll-reset";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://psh-portfolio.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

export const metadata: Metadata = {
  title: { default: "Psh' Portfolio", template: "%s | Portfolio" },
  description: "프론트엔드 개발자 PSH의 포트폴리오 사이트입니다.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Psh' Portfolio",
    description: "프론트엔드 개발자 PSH의 포트폴리오 사이트입니다.",
    url: siteUrl,
    siteName: "Psh' Portfolio",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/img/meta.jpg", width: 1200, height: 630, alt: "Psh' Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psh' Portfolio",
    description: "프론트엔드 개발자 PSH의 포트폴리오 사이트입니다.",
    images: ["/img/meta.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "박성훈",
  jobTitle: "Frontend Developer",
  url: siteUrl,
  email: "bbakkomm@gmail.com",
  sameAs: ["https://github.com/bbakkomm"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`dark ${[pretendard, montserrat, poppins, bebas, bruno, brunoSC, nexon].map((f) => f.variable).join(" ")}`}
    >
      <body className="bg-[#171717] text-foreground min-h-screen font-pretendard" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:top-4 focus:left-4 focus:rounded-md focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white focus:outline"
        >
          본문 바로가기
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <QueryProvider>
          <GsapProvider>
            <TooltipProvider>
              <MSWInitializer />
              <ScrollReset />
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
