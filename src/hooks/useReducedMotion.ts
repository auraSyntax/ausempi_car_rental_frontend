import { useState, useEffect } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Used to disable/simplify animations for accessibility
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns animation config based on reduced motion preference
 */
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    // Disable parallax and scroll-linked animations
    enableParallax: !prefersReducedMotion,
    // Simplified transition for users who prefer reduced motion
    transition: prefersReducedMotion
      ? { duration: 0.01 }
      : { duration: 0.6, ease: "easeOut" },
    // Simplified spring config
    spring: prefersReducedMotion
      ? { duration: 0.01 }
      : { type: "spring", stiffness: 100, damping: 20 },
  };
}
