import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

// ============================================
// Base Motion Wrapper
// ============================================

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "span";
}

export const MotionWrapper = ({
  children,
  className,
  as = "div",
  ...motionProps
}: MotionWrapperProps) => {
  const Component = motion[as];
  return (
    <Component className={className} {...motionProps}>
      {children}
    </Component>
  );
};

// ============================================
// Fade In Component
// ============================================

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) => {
  const variants = direction === "up" ? fadeInUp : fadeIn;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Scale In Component
// ============================================

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScaleIn = ({ children, className, delay = 0 }: ScaleInProps) => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Slide In Component
// ============================================

interface SlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}

export const SlideIn = ({
  children,
  className,
  delay = 0,
  direction = "left",
}: SlideInProps) => {
  const variants = direction === "left" ? slideInLeft : slideInRight;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Stagger Container Component
// ============================================

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) => {
  return (
    <motion.div
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Stagger Item Component
// ============================================

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================
// Hover Scale Component
// ============================================

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export const HoverScale = ({
  children,
  className,
  scale = 1.05,
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// Parallax Component
// ============================================

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const Parallax = ({
  children,
  className,
  speed = 0.5,
}: ParallaxProps) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
      }}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

export default {
  MotionWrapper,
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  Parallax,
};
