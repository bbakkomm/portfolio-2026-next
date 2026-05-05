import { cn } from "@/shared/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLabel = ({ children, className }: SectionLabelProps) => (
  <p
    className={cn(
      "text-[13px] font-bold tracking-[0.18em] uppercase text-pink-400 mb-6",
      className
    )}
  >
    {children}
  </p>
);

export default SectionLabel;
