"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSpinnerProps } from "@/types/spinner-types";

export function LoadingSpinner({ 
  className, 
  size = 160
}: LoadingSpinnerProps) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] flex items-center justify-center z-50">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        <Image
          src="/assets/spinner.png"
          alt="Loading spinner"
          width={size}
          height={size}
          className={cn(
            "animate-[spin_1s_ease-in]",
            className
          )}
        />
        <div/>
      </div>
    </div>
  );
} 