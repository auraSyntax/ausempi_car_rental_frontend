import { useEffect, useState, useCallback, RefObject } from "react";
import { gsap } from "gsap";

// ============================================
// Scroll Position Hook
// ============================================

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollPosition, scrollDirection };
};

// ============================================
// Scroll to Element Hook
// ============================================

export const useScrollTo = () => {
  const scrollTo = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return scrollTo;
};

// ============================================
// Element In View Hook (for GSAP)
// ============================================

export const useGsapScrollTrigger = (
  ref: RefObject<HTMLElement>,
  animation: (element: HTMLElement) => void,
  options?: {
    start?: string;
    once?: boolean;
  }
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation(entry.target as HTMLElement);
            if (options?.once !== false) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, animation, options?.once]);
};

// ============================================
// Parallax Effect Hook
// ============================================

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
};

// ============================================
// Window Size Hook
// ============================================

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

// ============================================
// Media Query Hook
// ============================================

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

// ============================================
// Reduced Motion Preference Hook
// ============================================

export const useReducedMotion = () => {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
};

// ============================================
// GSAP Timeline Hook
// ============================================

export const useGsapTimeline = (options?: gsap.TimelineVars) => {
  const [timeline] = useState(() => gsap.timeline(options));

  useEffect(() => {
    return () => {
      timeline.kill();
    };
  }, [timeline]);

  return timeline;
};
