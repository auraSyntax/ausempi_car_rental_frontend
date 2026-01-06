import { useEffect, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import heroImage from "@/assets/hero-sedan.jpg";

const Hero = memo(() => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax effect on scroll - disabled for reduced motion
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], prefersReducedMotion ? [0, 0] : [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], prefersReducedMotion ? [0, 0] : [0, 75]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate headline - simplified for performance
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.querySelectorAll(".hero-word"),
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8, 
            ease: "power3.out",
            stagger: 0.1,
          }
        );
      }

      // Animate subline
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Animate CTAs
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.3"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section - Premium luxury transportation"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-[115%] object-cover object-center"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        
        {/* Simplified gradient overlays - fewer layers for performance */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/50" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.3)_100%)]" />
      </motion.div>

      {/* Decorative Elements - hidden on mobile for performance */}
      <div className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block" aria-hidden="true" />
      <div className="absolute top-1/3 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" aria-hidden="true" />

      {/* Content */}
      <motion.div 
        className="relative container-luxury text-center z-10 pt-20 md:pt-16 px-4"
        style={{ y: contentY, opacity }}
      >
        {/* Pre-headline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
            <span className="w-6 md:w-10 h-px bg-primary/60" aria-hidden="true" />
            Exclusive Transportation
            <span className="w-6 md:w-10 h-px bg-primary/60" aria-hidden="true" />
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 md:mb-6 leading-[1.1]"
        >
          <span className="hero-word inline-block">The</span>{" "}
          <span className="hero-word inline-block">Art</span>{" "}
          <span className="hero-word inline-block">of</span>
          <span className="block mt-2 md:mt-4">
            <span className="hero-word inline-block text-gradient-gold">Arrival</span>
          </span>
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-6 md:mb-10 font-light leading-relaxed px-4"
        >
          Where every journey becomes an experience.
          <span className="hidden sm:inline"> Uncompromising luxury, impeccable service.</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Button variant="hero" size="lg" className="glow-gold min-w-[180px] md:min-w-[200px] touch-target" asChild>
            <a
              href={EXTERNAL_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve Your Ride
            </a>
          </Button>
          
          <Button variant="hero-outline" size="lg" className="min-w-[180px] md:min-w-[200px] touch-target" asChild>
            <a href="#fleet">Explore Our Fleet</a>
          </Button>
        </div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 md:mt-14"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 text-muted-foreground/60">
            <div className="text-center">
              <span className="block text-xl md:text-2xl font-display font-bold text-gradient-gold">15K+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Rides</span>
            </div>
            <div className="w-px h-6 bg-border/50" aria-hidden="true" />
            <div className="text-center">
              <span className="block text-xl md:text-2xl font-display font-bold text-gradient-gold">4.9</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Rating</span>
            </div>
            <div className="w-px h-6 bg-border/50" aria-hidden="true" />
            <div className="text-center">
              <span className="block text-xl md:text-2xl font-display font-bold text-gradient-gold">24/7</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Service</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - simplified animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#services"
          className="flex flex-col items-center text-muted-foreground/70 hover:text-primary transition-colors duration-300 group touch-target"
          aria-label="Scroll to services section"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 opacity-70">
            Discover More
          </span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1.5 group-hover:border-primary/50 transition-colors"
          >
            <div className="w-1 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </a>
      </motion.div>

      {/* Bottom Gold Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
