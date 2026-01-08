import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Using a high-quality, cinematic luxury car image for a more premium feel
const HERO_IMAGE = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Derived mouse parallax transforms
  const bgTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2%", "2%"]);
  const bgTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-2%", "2%"]);
  const decorTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
  const decorTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.querySelectorAll(".hero-word"),
          { opacity: 0, y: 100, rotateX: -60, filter: "blur(10px)" },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            filter: "blur(0px)",
            duration: 1.5, 
            ease: "expo.out", 
            stagger: 0.1 
          }
        );
      }

      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "-=1"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.2 },
          "-=0.7"
        );
      }
    }, heroRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Layer with Multi-parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: backgroundY,
          scale,
          translateX: isMobile ? 0 : bgTranslateX,
          translateY: isMobile ? 0 : bgTranslateY,
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={HERO_IMAGE}
          alt="Luxury car showcase"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/20 z-20" />
      </motion.div>

      {/* Floating Particles/Decorative Elements */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ 
            translateX: decorTranslateX,
            translateY: decorTranslateY,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
          <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div 
        className="relative z-30 container-luxury text-center px-4"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, tracking: "0.2em" }}
          animate={{ opacity: 1, tracking: "0.5em" }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="mb-8"
        >
          <span className="text-primary text-[10px] md:text-xs uppercase font-medium flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
            ELEVATING EVERY JOURNEY
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </span>
        </motion.div>

        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 leading-[0.9] tracking-tight"
        >
          <span className="hero-word inline-block mr-4">The</span>
          <span className="hero-word inline-block text-gradient-gold">Art</span>
          <span className="block mt-4">
            <span className="hero-word inline-block mr-4">of</span>
            <span className="hero-word inline-block italic font-light opacity-90">Arrival</span>
          </span>
        </h1>

        <p
          ref={sublineRef}
          className="text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Experience the pinnacle of luxury transportation. Where impeccable service 
          meets uncompromising comfort for the discerning traveler.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="hero" size="xl" className="glow-gold min-w-[240px] h-16 text-lg" asChild>
              <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                Reserve Now
              </a>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="hero-outline" size="xl" className="min-w-[240px] h-16 text-lg border-primary/20 hover:border-primary/50" asChild>
              <a href="#fleet">Explore Fleet</a>
            </Button>
          </motion.div>
        </div>

        {/* Stats / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="mt-20 pt-10 border-t border-border/10 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            {[
              { label: "Elite Rides", value: "25K+" },
              { label: "Client Rating", value: "4.9/5" },
              { label: "Global Cities", value: "12+" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl md:text-4xl font-display font-bold text-gradient-gold">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 group-hover:text-primary transition-colors">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
