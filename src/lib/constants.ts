// Site-wide constants and configuration

import { NavConfig, ContactInfo, ThemeConfig } from "@/types";

// ============================================
// Brand Configuration
// ============================================

export const BRAND = {
  name: "AUXEMPI",
  tagline: "Exclusive Transportation",
  description: "Premium luxury sedan and SUV transportation services",
} as const;

// ============================================
// Navigation Configuration
// ============================================

export const NAV_CONFIG: NavConfig = {
  links: [
    { name: "Services", href: "#services" },
    { name: "Fleet", href: "#fleet" },
    { name: "Experience", href: "#experience" },
    { name: "App", href: "#app" },
  ],
  ctaText: "Reserve Now",
  ctaHref: "https://allriders.com",
};

// ============================================
// Contact Information
// ============================================

export const CONTACT: ContactInfo = {
  phone: "+1 (888) 555-0123",
  email: "concierge@auxempi.com",
  address: "Available in major metropolitan areas",
};

// ============================================
// External Links
// ============================================

export const EXTERNAL_LINKS = {
  booking: "https://allriders.com",
  appStore: "#", // Replace with actual App Store link
  playStore: "#", // Replace with actual Play Store link
  instagram: "#",
  twitter: "#",
  linkedin: "#",
} as const;

// ============================================
// Theme Configuration
// ============================================

export const THEME: ThemeConfig = {
  colors: {
    primary: "hsl(43, 72%, 52%)", // Luxury Gold
    background: "hsl(0, 0%, 7%)", // Deep Black
    foreground: "hsl(0, 0%, 98%)", // Off White
    gold: "#D4AF37",
    charcoal: "#1A1A1A",
  },
  fonts: {
    display: "Playfair Display, serif",
    body: "Inter, sans-serif",
  },
};

// ============================================
// Breakpoints (matching Tailwind)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
} as const;

// ============================================
// Animation Timing
// ============================================

export const ANIMATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2,
  staggerDelay: 0.1,
} as const;

// ============================================
// SEO Defaults
// ============================================

export const SEO = {
  defaultTitle: "AUXEMPI | Premium Luxury Transportation",
  titleTemplate: "%s | AUXEMPI",
  defaultDescription:
    "Experience unparalleled luxury with AUXEMPI's premium sedan and SUV fleet. Professional chauffeurs, impeccable service, and exclusive transportation.",
  siteUrl: "https://auxempi.com",
  keywords: [
    "luxury transportation",
    "private car service",
    "executive sedan",
    "luxury SUV",
    "chauffeur service",
    "premium rides",
    "black car service",
  ],
} as const;
