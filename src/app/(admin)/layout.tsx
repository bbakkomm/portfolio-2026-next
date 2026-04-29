import { GNB } from "@/widgets/gnb/GNB";
import { Footer } from "@/widgets/footer/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#171717]">
      <GNB />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
