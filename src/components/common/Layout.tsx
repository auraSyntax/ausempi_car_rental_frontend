import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================
// Section Wrapper Component
// ============================================

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "dark" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl" | "none";
}

export const Section = ({
  children,
  id,
  className,
  variant = "default",
  padding = "lg",
}: SectionProps) => {
  const paddingClasses = {
    none: "",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32 lg:py-40",
    xl: "py-32 md:py-40 lg:py-48",
  };

  const variantClasses = {
    default: "bg-background",
    dark: "bg-charcoal",
    gradient: "bg-gradient-dark",
  };

  return (
    <section
      id={id}
      className={cn(
        paddingClasses[padding],
        variantClasses[variant],
        "relative overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
};

// ============================================
// Container Component
// ============================================

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Container = ({
  children,
  className,
  size = "lg",
}: ContainerProps) => {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <div
      className={cn(
        "mx-auto px-6 md:px-8 lg:px-12",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================
// Section Header Component
// ============================================

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader = ({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn(alignClasses[align], "mb-16 lg:mb-24", className)}>
      {label && (
        <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
          {label}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
        {title}
        {titleHighlight && (
          <span className="text-gradient-gold"> {titleHighlight}</span>
        )}
      </h2>
      <div
        className={cn(
          "luxury-divider",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
      />
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl mt-6 leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

// ============================================
// Grid Component
// ============================================

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export const Grid = ({
  children,
  cols = 3,
  gap = "md",
  className,
}: GridProps) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-4 lg:gap-6",
    md: "gap-6 lg:gap-8",
    lg: "gap-8 lg:gap-12",
  };

  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
};

export default { Section, Container, SectionHeader, Grid };
