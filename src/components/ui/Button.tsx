"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost";
type Size = "sm" | "default" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-mono uppercase " +
  "tracking-[0.2em] whitespace-nowrap transition-colors duration-300 cursor-pointer " +
  "disabled:opacity-55 disabled:cursor-not-allowed select-none";

const VARIANTS: Record<Variant, string> = {
  /* Design spec: primary is pure white on black, no border. */
  primary: "bg-ink text-void hover:bg-white",
  glass:
    "glass text-ink hover:bg-[rgba(255,255,255,0.08)] hover:border-hairline-strong",
  ghost: "text-ink-muted hover:text-ink",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px]",
  default: "h-12 px-6 text-[11px]",
  lg: "h-14 px-8 text-xs",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/* HTMLMotionProps rather than React's own prop types: framer-motion overrides
   the drag handlers with its own signatures, and mixing the two conflicts. */
type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<HTMLMotionProps<"a">, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const HOVER = { scale: 1.03 };
const TAP = { scale: 0.97 };

/**
 * Renders an `<a>` when given an `href` and a `<button>` otherwise, so a
 * navigational control is never an anchor nested inside a button.
 */
export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (rest.href !== undefined) {
    return (
      <motion.a
        whileHover={HOVER}
        whileTap={TAP}
        className={classes}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={HOVER}
      whileTap={TAP}
      className={classes}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
