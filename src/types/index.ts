// Type definitions for AUSEMPI application

// ============================================
// Navigation Types
// ============================================

export interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface NavConfig {
  links: NavLink[];
  ctaText: string;
  ctaHref: string;
}

// ============================================
// Service Types
// ============================================

export interface ServiceFeature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
}

export interface ServiceTier {
  tier: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  price: string;
  featured?: boolean;
}

// ============================================
// Vehicle / Fleet Types
// ============================================

export interface VehicleSpec {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: "Premium" | "Luxury";
  image: string;
  specs: VehicleSpec[];
  description: string;
}

// ============================================
// Experience / Stats Types
// ============================================

export interface Stat {
  number: string;
  label: string;
}

export interface Feature {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

// ============================================
// Contact Types
// ============================================

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

// ============================================
// Booking Types (for Phase 2)
// ============================================

export interface BookingRequest {
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  vehicleType: "sedan" | "suv";
  serviceTier: "premium" | "luxury";
  passengers: number;
  specialRequests?: string;
}

export interface BookingConfirmation {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  estimatedPrice: number;
  chauffeur?: ChauffeurInfo;
}

// ============================================
// Employee Portal Types (Phase 2)
// ============================================

export interface ChauffeurInfo {
  id: string;
  name: string;
  photo: string;
  rating: number;
  totalRides: number;
  licenseNumber: string;
}

export interface EmployeeCredentials {
  email: string;
  role: "chauffeur" | "dispatcher" | "admin";
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "not_started" | "in_progress" | "completed";
  completedAt?: string;
}

// ============================================
// UI Types
// ============================================

export interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    background: string;
    foreground: string;
    gold: string;
    charcoal: string;
  };
  fonts: {
    display: string;
    body: string;
  };
}
