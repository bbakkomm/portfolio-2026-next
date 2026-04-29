import { GNB } from "@/widgets/gnb/GNB";
import { Footer } from "@/widgets/footer/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
