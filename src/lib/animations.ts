// Animation utilities using GSAP and Framer Motion
import { gsap } from "gsap";
import { Variants } from "framer-motion";

// ============================================
// GSAP Animation Utilities
// ============================================

export const gsapFadeInUp = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y ?? 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
    }
  );
};

export const gsapStaggerFadeIn = (
  elements: HTMLElement[] | NodeListOf<Element>,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
    }
  );
};

export const gsapRevealFromLeft = (
  element: HTMLElement | null,
  options?: { delay?: number; duration?: number }
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
    }
  );
};

export const gsapRevealFromRight = (
  element: HTMLElement | null,
  options?: { delay?: number; duration?: number }
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
    }
  );
};

export const gsapScaleIn = (
  element: HTMLElement | null,
  options?: { delay?: number; duration?: number }
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      ease: "back.out(1.7)",
    }
  );
};

// ============================================
// Framer Motion Variants
// ============================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Hero-specific animations
export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const heroImageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeOut" },
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.3, ease: "easeOut" },
};

export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
