"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/useEnvironment";

/** Thin reading-progress bar pinned above the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = usePrefersReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-indigo via-violet to-cyan"
    />
  );
}
