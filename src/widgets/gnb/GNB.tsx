import GNBNavList from "./GNBNavList";
import { cn } from "@/shared/lib/cn";

export function GNB() {
  return (
    <>
      {/* Header */}
      <header
        className={cn("fixed z-50 w-full bg-zinc-700/1")}
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <div
          className={cn(
            "text-white flex items-center layout-center justify-between py-4 px-0 grid-layout mx-auto"
          )}
        >
          {/* Header- Con */}
          <GNBNavList />
        </div>
      </header>
    </>
  );
}
