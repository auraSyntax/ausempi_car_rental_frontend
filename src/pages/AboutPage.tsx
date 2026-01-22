

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Shield,
  Award,
  Star,
  Quote,
  Users,
  Briefcase,
  Wifi,
  Snowflake,
  Crown,
  UserCheck,
  Zap,
  Globe,
  Clock
} from "lucide-react";

import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { LazyImage, FadeInSection } from "@/components/common";
import grainBg from "@/assets/noise-bg.svg";
import aboutPageBg from "@/assets/about-hero-bg.avif";
import aboutStoryImg from "@/assets/about-story-img.avif";
import aboutSedanImg from "@/assets/about-sedan.avif";
import aboutSuvImg from "@/assets/about-suv.avif";
import eliteChauffeursImg from "@/assets/about-elite-chauffeurs.avif";
import bespokeComfortImg from "@/assets/about-bespoke-comfort.avif";
import moment1Img from "@/assets/moment-1.avif";
import moment2Img from "@/assets/moment-2.avif";
import moment3Img from "@/assets/moment-3.avif";
import moment4Img from "@/assets/moment-4.avif";
import { cn } from "@/lib";

const AboutPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    // Initial check
    checkDesktop();

    // Listen for changes
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Optimize: Use direct transform instead of spring on desktop. 
  // Mobile: Disable ALL scroll-driven transforms (opacity/parallax) for max FPS.
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const y = isDesktop ? parallaxY : 0;
  const opacity = isDesktop ? fadeOpacity : 1;

  // Fleet date
  const fleetData = [
    {
      type: "Executive Sedans",
      description: "Sophisticated elegance for executive travel and intimate city transfers.",
      image: aboutSedanImg,
      specs: [
        { icon: Users, label: "Up to 3 guests" },
        { icon: Briefcase, label: "2 luggage" },
        { icon: Wifi, label: "Complimentary WiFi" },
        { icon: Snowflake, label: "Climate Control" },
      ],
      features: ["Advanced Acoustic Insulation", "Premium Leather Interiors", "Executive Climate Control"]
    },
    {
      type: "Luxury SUVs",
      description: "Commanding presence and generous space for group travel or extra luggage.",
      image: aboutSuvImg,
      specs: [
        { icon: Users, label: "Up to 6 guests" },
        { icon: Briefcase, label: "4 luggage" },
        { icon: Wifi, label: "Complimentary WiFi" },
        { icon: Snowflake, label: "Dual-zone Climate" },
      ],
      features: ["All-Terrain Capability", "Panoramic Views", "Unmatched Comfort"]
    }
  ];

  // Values data
  const valuesData = [
    {
      title: "Exclusivity",
      text: "Every journey is a unique masterpiece, tailored precisely to your preferences and schedule.",
      icon: Crown
    },
    {
      title: "Integrity",
      text: "Transparent, honest, and professional service at every touchpoint of your experience.",
      icon: UserCheck
    },
    {
      title: "Innovation",
      text: "Leveraging the latest in automotive technology and logistics to ensure seamless travel.",
      icon: Zap
    }
  ]

  // Why choose data
  const whyChooseData = [
    {
      title: "Elite Chauffeurs",
      description: "Beyond driving, our chauffeurs are masters of hospitality and local navigation.",
      image: eliteChauffeursImg
    },
    {
      title: "Bespoke Comfort",
      description: "In-vehicle amenities curated to your specific requirements and tastes.",
      image: bespokeComfortImg
    }
  ]

  // Features data
  const featuresData = [
    {
      icon: Globe,
      title: "Global Network",
      text: "Elite service available in 25+ major luxury hubs worldwide, from London to Dubai."
    },
    {
      icon: Clock,
      title: "Precision Timing",
      text: "Our 15-minute early arrival policy ensures you are never kept waiting."
    },
    {
      icon: Shield,
      title: "Full Privacy",
      text: "Strict non-disclosure agreements and tinted privacy glass for absolute discretion."
    }
  ];

  // Stats data
  const statsData = [
    { value: "8", label: "Years of Service", suffix: "+" },
    { value: "15", label: "Rides Completed", suffix: "K+" },
    { value: "25", label: "Global Regions", suffix: "+" },
    { value: "99", label: "Client Satisfaction", suffix: ".9%" }
  ];

  // Gallery images
  const galleryImages = [
    moment1Img,
    moment2Img,
    moment3Img,
    moment4Img
  ]

  return (
    <MainLayout>
      <Navbar />

      {/* 1. Hero Section (Refined) */}
      <section ref={heroRef} className="relative h-[100dvh] flex items-center overflow-hidden bg-black">
        {/* Optimized animated layer with hardware acceleration hints only on desktop */}
        <motion.div
          style={{ y, opacity }}
          className={`absolute inset-0 z-0 ${isDesktop ? "will-change-transform" : ""}`}
        >
          <LazyImage
            containerClassName="h-full"
            src={aboutPageBg}
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Luxury Sedan Exterior"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background/50" />
          {/* Grain Texture Overlay - Heavy composite effect, show ONLY on desktop */}
          {isDesktop && (
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url(${grainBg})` }} />
          )}
        </motion.div>

        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto md:mx-0"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="w-8 md:w-16 h-px bg-primary" />
              <span className="text-primary text-[10px] md:text-sm uppercase tracking-[0.4em] font-bold">
                The Pinnacle of Private Luxury
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-10 leading-[0.9] tracking-tight drop-shadow-lg"
            >
              About <br /> <span className="text-gradient-gold drop-shadow-2xl block italic">AUSEMPI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/80 font-light leading-relaxed text-base sm:text-lg md:text-xl max-w-full md:max-w-xl border-l-2 border-primary/40 pl-6 md:pl-10 backdrop-blur-sm"
            >
              Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-pulse text-white/40"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium hidden md:block">Discovery</span>
          <div className="w-px h-10 md:h-16 bg-gradient-to-b from-primary/80 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Brand Story Section (Editorial) */}
      <section className="bg-background py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-charcoal/5 pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <FadeInSection>
              <div className="relative">
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 md:mb-8 block">
                  Heritage & Vision
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 md:mb-10 leading-[1.1]">
                  Our Legacy of <span className="text-gradient-gold">Excellence</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed text-justify">
                    AUSEMPI was founded on a singular premise: that luxury transportation should be an extension of one's lifestyle—seamless, sophisticated, and absolutely reliable.
                  </p>

                  <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed text-justify">
                    We recognized that for our discerning clientele, the journey is as significant as the destination. This realization led us to curate a fleet and a service philosophy that transcends the ordinary.
                  </p>

                  <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed text-justify">
                    Today, AUSEMPI stands as the premier choice for executives, global leaders, and private individuals who demand a bespoke travel experience defined by meticulous planning and executive care.
                  </p>
                </div>
                <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-border/40 flex flex-wrap items-center gap-6 md:gap-10">
                  <div className="flex flex-col">
                    <div className="flex text-primary mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" className="text-primary" />
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">5-Star Excellence</p>
                  </div>
                  <div className="hidden md:block h-10 w-px bg-border/40" />
                  <div className="text-muted-foreground text-sm font-light italic w-full md:w-auto">
                    "Unrivaled precision in every mile."
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2} className="relative mt-8 lg:mt-0">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm group shadow-2xl">
                <LazyImage
                  containerClassName="h-full"
                  src={aboutStoryImg}
                  className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-105"
                  alt="AUSEMPI Interior"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 opacity-100" />

                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-10 right-6 md:right-10 text-white">
                  <Quote size={32} className="text-primary mb-4 opacity-80 md:scale-100 origin-left" />
                  <p className="text-lg md:text-2xl font-display leading-tight mb-6 italic text-white/90">
                    "Luxury is the absence of worry. It is the freedom of time and the comfort of silence."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-px bg-primary" />
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">The AUSEMPI Promise</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Luxury Fleet Representation */}
      <section className="bg-charcoal py-16 md:py-40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-luxury">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-4 md:mb-6">The AUSEMPI Collection</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Luxury Fleet</h2>
            <p className="text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto px-6">
              Curated for performance, comfort, and ultimate discretion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {fleetData.map((item, idx) => (
              <FadeInSection key={item.type} delay={idx * 0.2}>
                <div className="group relative bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 rounded-sm overflow-hidden hover:shadow-[0_0_60px_rgba(212,175,55,0.08)] h-full flex flex-col">
                  <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative border-b border-white/5">
                    <LazyImage
                      containerClassName="transition-transform duration-1000 group-hover:scale-105 origin-bottom"
                      src={item.image}
                      alt={item.type}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] uppercase font-bold tracking-widest rounded-sm">
                        {idx === 0 ? "Flagship Choice" : "Group Executive"}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.type}
                      </h3>
                      <div className="h-0.5 w-12 bg-primary group-hover:w-24 transition-all duration-500" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 md:p-10 flex-grow flex flex-col">
                    <p className="text-white/60 text-sm sm:text-base font-light mb-8 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-8">
                      {item.specs.map((spec, sidx) => (
                        <div key={sidx} className="flex items-center gap-2 md:gap-3 text-white/50 group-hover:text-white/90 transition-colors">
                          <spec.icon size={16} className="text-primary shrink-0" />
                          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                      {item.features.map(f => (
                        <span key={f} className="px-2 py-1 md:px-3 bg-white/[0.03] rounded-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 border border-white/5">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <Link to="/services" className="inline-flex items-center gap-3 text-white text-[12px] sm:text-xs uppercase tracking-[0.25em] font-bold group hover:text-primary transition-colors border-b border-white/10 pb-1 hover:border-primary">
              View Complete Fleet <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision & Values (Clean Grid) */}
      <section className="bg-background py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="text-primary text-[11px] md:text-xs uppercase tracking-[0.5em] font-bold block mb-4 md:mb-6">
                  Our Core
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 md:mb-8 leading-[1.1] lg:max-w-xs">
                  Mission, Vision & <span className="text-gradient-gold"> Values</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 md:mb-10 text-justify">
                  To be the world's most seamless and sophisticated private transportation partner, setting the benchmark for elite mobility.
                </p>
                <div className="flex items-center gap-6 p-6 bg-charcoal/5 rounded-sm border-l-2 border-primary">
                  <div className="text-4xl font-display font-bold text-primary">5k+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Successful<br />Journeys</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              {valuesData.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="group p-6 md:p-10 bg-background border border-border/60 hover:border-primary/30 transition-all duration-300 rounded-lg shadow-sm hover:shadow-lg h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-black text-primary transition-all duration-500">
                      <value.icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 md:mb-4">{value.title}</h3>
                    <p className="text-muted-foreground text-[15px] md:text-base leading-relaxed font-light">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="group p-6 md:p-10 bg-[#0A0A0A] text-white transition-all duration-300 rounded-lg h-full relative overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/10 flex items-center justify-center mb-6 md:mb-8">
                      <Shield className="text-white" size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3 md:mb-4">Safety First</h3>
                    <p className="text-white/60 text-[15px] md:text-base leading-relaxed font-light">Rigorous vetting and advanced safety protocols for absolute peace of mind.</p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
                    <Award size={14} /> Certified Secure
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUSEMPI (Premium Parallax) */}
      <section className="bg-charcoal py-20 md:py-32 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent bg-[length:4px_4px]" />

        <div className="container-luxury relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-primary text-[11px] md:text-sm uppercase tracking-[0.4em] font-bold block mb-4 md:mb-6">
              Distinction
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient-gold">AUSEMPI</span>
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
          </div>

          {/* Primary Features (Images with Text) */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
            {whyChooseData.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group relative overflow-hidden rounded-lg aspect-[1/1.1] sm:aspect-[3/2] md:aspect-[4/3] shadow-2xl border border-white/5 isolate">
                  <LazyImage
                    containerClassName="h-full w-full transition-transform duration-1000 group-hover:scale-105 origin-right"
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center md:object-left"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Content */}
                  <div className="absolute inset-0 p-7 md:p-12 flex flex-col justify-end">
                    <div className=" transition-transform duration-500">
                      <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] uppercase font-bold tracking-widest rounded-sm mb-4">
                        Excellence 0{idx + 1}
                      </span>
                      <h3 className="font-display text-[1.6rem] md:text-4xl font-bold text-white mb-3 md:mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-[15px] md:text-lg font-light leading-relaxed max-w-lg  transition-opacity duration-500 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Secondary Features (Icon Grid) */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {featuresData.map((feature, idx) => (
              <FadeInSection key={feature.title} delay={0.2 + (idx * 0.1)}>
                <div className="group h-full w-full p-8 rounded-lg bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary border border-white/5 group-hover:border-primary/20 group-hover:scale-110 transition-all duration-300 group-hover:bg-primary/10">
                    <feature.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-display text-[1.4rem] md:text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-white/60 text-[15px] md:text-base font-light leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience & Trust (Counters) */}
      <section className="bg-background py-16 md:py-32 border-y border-border/40">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
            {statsData.map((stat, idx) => (
              <FadeInSection key={stat.label} delay={idx * 0.1}>
                <div className="text-center group cursor-default">
                  <div className="font-display text-4xl md:text-7xl font-bold text-foreground mb-2 flex items-start justify-center">
                    <span className="group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                    <span className="text-xl md:text-3xl text-primary mt-1 opacity-60">{stat.suffix}</span>
                  </div>
                  <div className="w-8 h-0.5 bg-border mx-auto mb-4 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                  <div className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">
                    {stat.label}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Lifestyle Gallery (Redesigned) */}
      <section className="bg-background py-20 md:py-40 overflow-hidden relative">
        <div className="container-luxury relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24 px-4 md:px-0">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-primary" />
                <span className="text-primary text-[11px] sm:text-xs uppercase tracking-[0.4em] font-bold">Visual Storytelling</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-[0.9] tracking-tight">
                Capturing <br /> <span className="text-gradient-gold">The Essence</span>
              </h2>
            </div>
            <div className="max-w-sm md:text-right">
              <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed  italic border-l-2 md:border-l-0 md:border-r-2 border-primary/30 pl-4 md:pl-0 md:pr-4">
                "True luxury is not just seen, it is felt. A curated collection of moments defined by elegance."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
            {galleryImages.map((img, idx) => {
              // Create a varied grid layout
              const isLarge = idx === 0 || idx === 3;
              const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
              const isLast = idx === galleryImages.length - 1;

              return (
                <FadeInSection key={idx} delay={idx * 0.15} className={`relative group overflow-hidden rounded-sm ${colSpan}`}>
                  <div className="w-full h-full relative overflow-hidden border border-gold/30">
                    <LazyImage
                      containerClassName="h-full group-hover:scale-105 filter group-hover:saturate-0 transition-all duration-1000"
                      src={img}
                      className={cn("w-full h-full object-cover", isLast ? "object-top" : "object-center")}
                      alt={`Lifestyle Moment ${idx + 1}`}
                    />
                    {/* Cinematic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                    {/* Hover Interaction */}
                    <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end items-start opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="bg-gold/10 backdrop-blur-md border border-gold/10 px-4 py-2 rounded-full">
                        <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">
                          Moment 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>

        {/* Background Decorative elements */}
        <div className="absolute top-20 right-0 w-[40vw] h-full bg-charcoal/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default AboutPage;
