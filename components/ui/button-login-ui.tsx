"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ButtonLoginProps } from "@/types/button-types";

export const ButtonLogin = forwardRef<HTMLButtonElement, ButtonLoginProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 w-full h-10 px-4 py-2 transition-all duration-200 font-medium text-white bg-primary hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonLogin.displayName = "ButtonLogin"; 