"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/shared/lib/cn";

type Props = ImageProps & { skeletonClassName?: string };

export default function LazyImage({ className, skeletonClassName, onLoad, ...props }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className={cn("absolute inset-0 bg-zinc-800 animate-pulse", skeletonClassName)} />
      )}
      <Image
        {...props}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
      />
    </>
  );
}
