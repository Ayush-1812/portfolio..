"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "glass";
  size?: "default" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-mono uppercase tracking-[0.2em] text-xs transition-all duration-300 cursor-pointer",
          {
            /* Primary: pure white bg, black text — per DESIGN.md */
            "bg-white text-[#05070A] hover:bg-[#e1e2e7]": variant === "primary",
            /* Glass: translucent with subtle border — per DESIGN.md */
            "bg-[rgba(15,19,29,0.4)] backdrop-blur-3xl border border-[rgba(255,255,255,0.06)] text-[#e1e2e7] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)]": variant === "glass",
            "h-12 px-6": size === "default",
            "h-14 px-8 text-sm": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
