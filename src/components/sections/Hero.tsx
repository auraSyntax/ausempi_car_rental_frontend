
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { LazyImage } from "@/components/common";
import heroImageLandscape from "@/assets/hero_img_landscape.avif";
import heroImagePortrait from "@/assets/hero_img_portrait.avif";
import noiseBg from "@/assets/noise-bg.svg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [heroImage, setHeroImage] = useState(heroImageLandscape);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 1024) {
          setHeroImage(heroImagePortrait);
        } else {
          setHeroImage(heroImageLandscape);
        }
      }, 100);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // 1. Entrance Animations (Run once on mount)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

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
              clearProps: "all"
            }
          );
        }
      }

      // Animate subline
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", clearProps: "all" },
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
            clearProps: "all"
          },
          "-=0.4"
        );
      }
    }, heroRef);

    // 2. Parallax & Scroll Effects (Responsive)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0,
          invalidateOnRefresh: true,
        }
      });

      // Background Parallax
      if (backgroundRef.current) {
        scrollTl.to(backgroundRef.current, {
          y: 150,
          ease: "none",
          force3D: true
        }, 0);
      }

      // Image Scale (Zoom effect)
      if (bgImageRef.current) {
        scrollTl.to(bgImageRef.current, {
          scale: 1.1,
          ease: "none",
          force3D: true
        }, 0);
      }

      // Content Fade & Parallax
      if (contentRef.current) {
        scrollTl.to(contentRef.current, {
          y: 50,
          opacity: 0,
          ease: "none",
          force3D: true
        }, 0);
      }
    }, heroRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Container for Parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* Scalable Image Container */}
        <div
          ref={bgImageRef}
          className="relative w-full h-[115%] -top-[7.5%] will-change-transform"
        >
          <LazyImage
            src={heroImage}
            alt="Luxury black sedan on city street at night"
            className="w-full h-full object-cover object-right sm:object-center"
            containerClassName="w-full h-full"
            priority={true}
          />
        </div>

        {/* Optimized Overlays - Consolidated */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/60 lg:via-background/20" />

        {/* Noise Texture - Static transform to avoid jitter */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat mix-blend-overlay"
          style={{ backgroundImage: `url(${noiseBg})` }}
        />

        {/* Gold Accent - Hardware Accelerated */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50 translate-z-0" />
      </div>

      {/* Content Container */}
      <div
        ref={contentRef}
        className="relative container-luxury text-center z-10 px-4 md:px-8 w-full will-change-transform"
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

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[6rem] font-bold text-foreground mb-6 md:mb-8 leading-[1.1] sm:leading-[1.05] tracking-tight relative"
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
          className="text-base sm:text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed px-4 md:px-0"
        >
          Experience the pinnacle of urban mobility.
          <span className="inline"> Meticulously crafted journeys for those who demand excellence.</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-xs mx-auto sm:max-w-none"
        >
          <Button
            variant="gold-cta"
            size="xl"
            className="w-full sm:w-auto min-w-[200px] h-12 md:h-14 text-sm md:text-base tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)]"
            asChild
          >
            <Link
              to={EXTERNAL_LINKS?.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve Now
            </Link>
          </Button>

          <Button
            variant="hero-outline"
            size="xl"
            className="w-full sm:w-auto min-w-[200px] h-12 md:h-14 text-sm md:text-base tracking-[0.2em] backdrop-blur-sm hover:bg-white/10 border-white/20"
            asChild
          >
            <Link to="#fleet">View Fleet</Link>
          </Button>
        </div>
      </div>

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
