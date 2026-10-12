"use client";

import { useEffect, useRef } from "react";

import { useHasFinePointer, usePrefersReducedMotion } from "@/hooks/useEnvironment";

/**
 * A soft glow that trails the pointer across the whole page.
 *
 * Writes two CSS custom properties from a single rAF-throttled listener and
 * lets the compositor do the rest — no React state, so moving the mouse
 * never triggers a render.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  // Both hooks must run every render — short-circuiting them would make
  // the second call conditional.
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        node.style.setProperty("--spot-x", `${x}px`);
        node.style.setProperty("--spot-y", `${y}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(520px circle at var(--spot-x, 50%) var(--spot-y, 33%), rgba(129,140,248,0.07), transparent 65%)",
      }}
    />
  );
}
