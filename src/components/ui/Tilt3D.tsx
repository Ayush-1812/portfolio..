"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";
import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useEnvironment";

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
  /** Draws a specular highlight that tracks the pointer. */
  glare?: boolean;
  /** Pushes the card toward the viewer while hovered. */
  lift?: number;
};

const SPRING = { stiffness: 220, damping: 26, mass: 0.6 } as const;

/**
 * Pointer-driven perspective tilt.
 *
 * Degrades to a plain wrapper — no listeners, no motion values applied — for
 * touch devices and anyone who has asked for reduced motion, so the content
 * is never dependent on the effect.
 */
export function Tilt3D({
  children,
  className,
  intensity = 8,
  glare = true,
  lift = 14,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const z = useSpring(useMotionValue(0), SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), SPRING);

  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      rotateY.set((px - 0.5) * intensity * 2);
      rotateX.set(-(py - 0.5) * intensity * 2);
      glareX.set(px * 100);
      glareY.set(py * 100);
    },
    [intensity, rotateX, rotateY, glareX, glareY],
  );

  const handlePointerEnter = useCallback(() => {
    z.set(lift);
    glareOpacity.set(1);
  }, [lift, z, glareOpacity]);

  const handlePointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, z, glareOpacity]);

  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.09), transparent 42%)`;

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ background: glareBackground, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </motion.div>
  );
}
