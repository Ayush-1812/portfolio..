"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/** Nothing to subscribe to — the value is read once per render pass. */
const noopSubscribe = () => () => {};

/**
 * Subscribes to a media query.
 *
 * Uses useSyncExternalStore rather than an effect so there is no extra render
 * pass on mount, and so the server snapshot is explicit: every query reports
 * `false` during SSR, then resolves for real once hydrated.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True for mouse/trackpad users. Touch devices get no hover-driven 3D. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Respects the browser's Data Saver setting where it is exposed. */
function useSaveData(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      ),
    () => false,
  );
}

/**
 * Gate for the expensive WebGL hero: a fine pointer, a reasonably wide
 * viewport, motion allowed, and the visitor is not on a metered connection.
 */
export function useCanRenderHeavyVisuals(): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();
  const wideEnough = useMediaQuery("(min-width: 768px)");
  const saveData = useSaveData();

  return finePointer && wideEnough && !reducedMotion && !saveData;
}

/**
 * Defers work until the browser is idle, so nothing here competes with first
 * paint. Falls back to a short timeout where requestIdleCallback is absent.
 */
export function useAfterIdle(enabled = true, timeout = 2000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;

    const win = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(() => setReady(true), { timeout });
      return () => win.cancelIdleCallback?.(handle);
    }

    const id = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(id);
  }, [enabled, ready, timeout]);

  return ready;
}
