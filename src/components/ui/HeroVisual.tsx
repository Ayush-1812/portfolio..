"use client";

import dynamic from "next/dynamic";

import { useAfterIdle, useCanRenderHeavyVisuals } from "@/hooks/useEnvironment";

/**
 * Loads the WebGL hero only once the browser is idle, and only on devices
 * that should be asked to run it. Everyone else keeps the CSS aura behind
 * the hero, which is what sits underneath this layer anyway — so there is
 * no empty space and no layout shift when it is skipped.
 */
const ParticleKnot = dynamic(() => import("./ParticleKnot"), {
  ssr: false,
  loading: () => null,
});

export function HeroVisual({ className }: { className?: string }) {
  const capable = useCanRenderHeavyVisuals();
  const idle = useAfterIdle(capable);

  if (!capable || !idle) return null;

  return <ParticleKnot className={className} />;
}
