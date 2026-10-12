"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useEnvironment";

/**
 * Animates the numeric part of a value when it scrolls into view.
 *
 * Values here are things like "1,050+", "89.7%", "Top 7" and "3★", so the
 * component splits off a leading/trailing non-numeric prefix and suffix and
 * only counts the number between them. Anything with no number at all is
 * rendered untouched.
 */
const PARSE = /^(\D*?)([\d,]+(?:\.\d+)?)([\s\S]*)$/;

export function CountUp({
  value,
  duration = 1300,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = value.match(PARSE);
  const reducedMotion = usePrefersReducedMotion();

  const prefix = match?.[1] ?? "";
  const rawNumber = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";

  const target = rawNumber ? Number(rawNumber.replace(/,/g, "")) : null;
  const decimals = rawNumber.includes(".")
    ? rawNumber.split(".")[1].length
    : 0;
  const grouped = rawNumber.includes(",");

  /* Only the animated path needs state; everything else renders the final
     value directly, so no effect ever has to write it. */
  const animated = target !== null && !reducedMotion;

  const ref = useRef<HTMLSpanElement>(null);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (!animated || target === null) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let startedAt: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const tick = (now: number) => {
          if (startedAt === null) startedAt = now;
          const t = Math.min((now - startedAt) / duration, 1);
          // easeOutExpo, matching the site's motion curve.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setProgressValue(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animated, target, duration]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  const shown = animated ? progressValue : target;
  const formatted = grouped
    ? Math.round(shown).toLocaleString("en-US")
    : shown.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/* Tabular figures stop the width jittering as digits change. */}
      <span className="tabular-nums">{formatted}</span>
      {suffix}
    </span>
  );
}
