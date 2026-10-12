import React from "react";

import { cn } from "@/lib/utils";

type GlassPanelProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Adds the tier-3 hover treatment from the design spec. */
  interactive?: boolean;
};

/**
 * Tier 2 of the elevation model: a floating glass surface.
 *
 * Plain div rather than motion.div — wrap it in Reveal or Tilt3D when it
 * needs to move, so panels that do not animate cost no JS.
 */
export function GlassPanel({
  className,
  interactive = false,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 md:p-8",
        interactive &&
          "transition-colors duration-300 hover:bg-glass-hover hover:border-hairline-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
