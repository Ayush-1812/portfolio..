"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useRef } from "react";

import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useEnvironment";

/**
 * Pulls its child toward the pointer while hovered, then springs back.
 *
 * Wraps rather than replaces the child's own element, so the underlying
 * control keeps its semantics, focus ring and hit area.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 22, mass: 0.5 });

  // Both hooks must run every render — short-circuiting them would make
  // the second call conditional.
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!enabled) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
