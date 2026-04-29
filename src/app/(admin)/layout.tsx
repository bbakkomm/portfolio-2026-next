import { redirect } from "next/navigation";
import { GNB } from "@/widgets/gnb/GNB";
import { Footer } from "@/widgets/footer/Footer";
import { requireAdmin } from "@/shared/lib/supabase/require-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#171717]">
      <GNB />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
