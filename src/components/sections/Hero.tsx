import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import heroImage from "@/assets/hero-sedan.jpg";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.querySelectorAll(".hero-word"),
          { 
            opacity: 0, 
            y: 80,
            rotateX: -40,
          },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            duration: 1.2, 
            ease: "power4.out",
            stagger: 0.15,
          }
        );
      }

      // Animate subline
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      // Animate CTAs
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6, 
            ease: "back.out(1.7)",
            stagger: 0.15,
          },
          "-=0.4"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <img
          src={heroImage}
          alt="Luxury black sedan on city street at night"
          className="w-full h-[120%] object-cover object-center scale-105"
          loading="eager"
        />
        
        {/* Multi-layer Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
        
        {/* Gold accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 mix-blend-overlay" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_100%)]" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden lg:block" />
      <div className="absolute top-1/3 right-0 w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />

      {/* Content */}
      <motion.div 
        className="relative container-luxury text-center z-10 pt-24 md:pt-20 px-4"
        style={{ y: contentY, opacity }}
      >
        {/* Pre-headline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-3 text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-medium">
            <span className="w-8 md:w-12 h-px bg-primary/60" />
            Exclusive Transportation
            <span className="w-8 md:w-12 h-px bg-primary/60" />
          </span>
        </motion.div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 md:mb-6 leading-[1.1] perspective-1000"
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
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-4"
        >
          Where every journey becomes an experience.
          <span className="hidden sm:inline"> Uncompromising luxury, impeccable service.</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="hero" size="xl" className="glow-gold min-w-[200px] md:min-w-[220px]" asChild>
              <a
                href={EXTERNAL_LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve Your Ride
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="hero-outline" size="xl" className="min-w-[200px] md:min-w-[220px]" asChild>
              <a href="#fleet">Explore Our Fleet</a>
            </Button>
          </motion.div>
        </div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex items-center justify-center gap-6 md:gap-8 text-muted-foreground/60">
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-display font-bold text-gradient-gold">15K+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Rides</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-display font-bold text-gradient-gold">4.9</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Rating</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="text-center">
              <span className="block text-2xl md:text-3xl font-display font-bold text-gradient-gold">24/7</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider">Service</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="#services"
          className="flex flex-col items-center text-muted-foreground/70 hover:text-primary transition-colors duration-300 group"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
            Discover More
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center pt-2 group-hover:border-primary/50 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </motion.div>
        </a>
      </motion.div>

      {/* Bottom Gold Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default Hero;
