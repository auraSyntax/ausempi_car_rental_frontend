import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { LazyImage } from "@/components/common";
import heroImage from "@/assets/hero-sedan.jpg";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll - Optimized range
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 150]); // Reduced movement/jitter
  const contentY = useTransform(scrollY, [0, 500], [0, 50]); // Subtle content shift
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 }); // Faster start

      // Animate headline with safer selector
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        if (words.length > 0) {
          tl.fromTo(
            words,
            {
              opacity: 0,
              y: 50,
              rotateX: -20,
              filter: "blur(10px)"
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
              stagger: 0.1,
            }
          );
        }
      }

      // Animate subline
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
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
            ease: "back.out(1.5)",
            stagger: 0.1,
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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax & Optimization */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="relative w-full h-[115%] -top-[7.5%]"> {/* Offset to prevent white gaps on parallax */}
          <LazyImage
            src={heroImage}
            alt="Luxury black sedan on city street at night"
            className="w-full h-full object-cover object-center scale-105 will-change-transform" // hardware accel
            containerClassName="w-full h-full"
            loading="eager" // Hero image should load immediately
          />
        </div>

        {/* Optimized Gradients - Reduced count for performance */}
        <div className="absolute inset-0 bg-black/40" /> {/* Base darken */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 lg:via-background/20" />

        {/* Cinematic Noise/Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        {/* Gold accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent mix-blend-overlay opacity-50" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative container-luxury text-center z-10 pt-20 px-4 md:px-8 w-full"
        style={{ y: contentY, opacity }}
      >
        {/* Pre-headline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 md:gap-4 px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary/90 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
              Premium Chauffeur Service
            </span>
          </div>
        </motion.div>

        {/* Main Headline - Responsive Text Sizing */}
        <h1
          ref={headlineRef}
          className="font-display text-6xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold text-foreground mb-6 md:mb-8 leading-[1.1] sm:leading-[1.05] tracking-tight relative"
        >
          <span className="hero-word inline-block origin-bottom">The</span>{" "}
          <span className="hero-word inline-block origin-bottom italic font-serif text-primary">Art</span>{" "}
          <span className="hero-word inline-block origin-bottom">of</span>
          <span className="block mt-1 sm:mt-2">
            <span className="hero-word inline-block origin-bottom text-gradient-gold pb-2 transform-gpu">Arrival</span>
          </span>
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 md:mb-14 font-light leading-relaxed px-4 md:px-0"
        >
          Experience the pinnacle of urban mobility.
          <span className="hidden sm:inline"> Meticulously crafted journeys for those who demand excellence.</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-md mx-auto sm:max-w-none"
        >
          <Button
            variant="gold-cta"
            size="xl"
            className="w-full sm:w-auto min-w-[200px] h-14 text-sm md:text-base tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)]"
            asChild
          >
            <a
              href={EXTERNAL_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve Now
            </a>
          </Button>

          <Button
            variant="hero-outline"
            size="xl"
            className="w-full sm:w-auto min-w-[200px] h-14 text-sm md:text-base tracking-[0.2em] backdrop-blur-sm hover:bg-white/10 border-white/20"
            asChild
          >
            <a href="#fleet">View Fleet</a>
          </Button>
        </div>

        {/* Trust Stats - Optimized Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 hidden sm:flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { label: "Elite Drivers", value: "500+" },
            { label: "Global Cities", value: "40+" },
            { label: "Client Satisfaction", value: "99%" },
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <span className="block text-2xl md:text-3xl font-display font-bold text-white/90 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary/70 transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
