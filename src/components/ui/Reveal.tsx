"use client";

import { motion } from "framer-motion";
import React from "react";

import { usePrefersReducedMotion } from "@/hooks/useEnvironment";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  /** Adds a slight 3D rotation to the entrance. */
  depth?: boolean;
};

const OFFSET = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -36 },
  right: { y: 0, x: 36 },
  none: { y: 0, x: 0 },
} as const;

/**
 * Scroll-triggered entrance. Animates once, then stops observing.
 * Renders children untouched when reduced motion is requested — content is
 * never gated behind an animation that may not run.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  depth = false,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = OFFSET[from];

  return (
    <motion.div
      /* `js-reveal` is the hook a <noscript> rule uses to force this visible.
         Framer writes opacity:0 into the SSR markup, so without it any
         visitor whose JS never runs would see an empty page. */
      className={cn("js-reveal", className)}
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
        rotateX: depth ? 10 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={depth ? { transformPerspective: 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
}
