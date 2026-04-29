import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/providers/query-provider";
import { Toaster } from "sonner";
import { MSWInitializer } from "@/mocks/msw-initializer";
import { TooltipProvider } from "@/shared/ui/tooltip";

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s | Portfolio" },
  description: "개인 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-[#171717] text-foreground min-h-screen">
        <QueryProvider>
          <TooltipProvider>
            <MSWInitializer />
            {children}
            <Toaster richColors theme="dark" />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
