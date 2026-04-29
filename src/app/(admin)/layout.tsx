import { redirect } from "next/navigation";
import { GNB } from "@/widgets/gnb/GNB";
import { Footer } from "@/widgets/footer/Footer";
import { createClient } from "@/shared/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  return (
    <div className="min-h-screen bg-[#171717]">
      <GNB />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
