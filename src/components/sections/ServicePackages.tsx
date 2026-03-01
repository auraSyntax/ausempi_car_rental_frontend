import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Plane,
  Building2,
  Route,
  Check,
  Crown,
  Star,
  ArrowRight,
  Clock,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { LazyImage } from "@/components/common";

// Assets
import sedanImg from "@/assets/comparison-sedan.avif";
import suvImg from "@/assets/comparison-suv.avif";

import corporateEvents from "@/assets/corporate-events.avif";
import airportTransfers from "@/assets/airport-transfers.avif";
import longDistance from "@/assets/long-distance.avif";


gsap.registerPlugin(ScrollTrigger);

// Service Tiers
const serviceTiers = [
  {
    name: "Premium",
    icon: Star,
    tagline: "Refined Excellence",
    description: "Professional service with attention to every detail. Perfect for business travel and special occasions.",
    features: [
      "Professional chauffeur",
      "Complimentary water",
      "Flight tracking",
      "Meet & greet",
      "30-min free wait time",
    ],
    highlighted: true,
    isComingSoon: false,
  },
  {
    name: "Luxury",
    icon: Crown,
    tagline: "Ultimate Prestige",
    description: "White-glove service for those who demand the extraordinary. An experience beyond transportation.",
    features: [
      "Elite vetted chauffeur",
      "Premium refreshments",
      "Dedicated concierge",
      "Priority scheduling",
      "60-min free wait time",
      "Personalized preferences",
    ],
    highlighted: false,
    isComingSoon: true,
  },
];

// Special Packages
const specialPackages = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Transfers",
    description: "Seamless arrivals and departures with real-time flight monitoring, meet & greet service, and luggage assistance.",
    features: ["Flight tracking", "Meet at arrivals", "Luggage assistance"],
    image: airportTransfers,
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Events",
    description: "Reliable fleet management for conferences, roadshows, and executive meetings with dedicated support.",
    features: ["Multi-vehicle coordination", "Dedicated account manager", "Priority booking"],
    image: corporateEvents,
  },
  {
    id: "longdistance",
    icon: Route,
    title: "Long-Distance",
    description: "Comfortable city-to-city travel offering a relaxed alternative to flights for regional journeys.",
    features: ["Flexible stops", "Extended comfort features", "Competitive flat rates"],
    image: longDistance,
  },
];

// Comparison Data
const comparisonFeatures = [
  { feature: "Passengers", sedan: "Up to 2", suv: "Up to 2" },
  { feature: "Luggage", sedan: "2 Large bags", suv: "4 Large bags" },
  { feature: "Ideal For", sedan: "Corporate", suv: "Executive" },
  { feature: "Interior Space", sedan: "Refined", suv: "Spacious" },
  { feature: "Starting Price", sedan: "From $130", suv: "From $190" },
];

const ServicePackages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".header-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true, // Hardware acceleration for header animation
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="bg-charcoal relative overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="header-animate inline-flex items-center gap-3 text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-4"
          >
            <span className="w-8 md:w-12 h-px bg-primary/60" />
            Service Packages
            <span className="w-8 md:w-12 h-px bg-primary/60" />
          </motion.div>
          <h2 className="header-animate font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-4 mb-8">
            Tailored to
            <span className="text-gradient-gold"> Your Needs</span>
          </h2>
          <p className="header-animate text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From executive sedan service to fleet management, we offer flexible packages
            designed around your unique requirements.
          </p>
        </div>

        {/* Service Tiers */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-24 lg:mb-32">
          {serviceTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className={`group relative p-8 lg:p-12 rounded-none border transition-all duration-700 ${tier.highlighted
                ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_50px_-12px_rgba(212,175,55,0.15)]"
                : "border-white/5 bg-white/[0.02]"
                } ${tier.isComingSoon ? "overflow-hidden" : ""}`}
            >
              {/* Coming Soon Overlay Layer */}
              {tier.isComingSoon && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60">
                  {/* Diagonal subtle stripes */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />

                  <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-black/80 border border-white/10 rounded-2xl shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.03]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-20 pointer-events-none" />

                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                      <Lock size={20} className="text-primary relative z-10" />
                    </div>

                    <span className="text-white text-[11px] md:text-sm uppercase tracking-[0.4em] font-black drop-shadow-lg mb-1.5 text-center">
                      Coming Soon
                    </span>
                    <span className="text-primary/70 text-[9px] uppercase tracking-widest font-medium text-center">
                      Elevating Standards
                    </span>

                    {/* Glow effect under badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-primary/60 blur-md rounded-full pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-30 ${tier.isComingSoon ? "opacity-80 grayscale" : ""}`}>
                  <span className="bg-primary text-primary-foreground text-[10px] md:text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full font-bold shadow-lg shadow-primary/20">
                    Recommended
                  </span>
                </div>
              )}

              <div className={`relative flex flex-col h-full transition-all duration-500 z-10 ${tier.isComingSoon ? "opacity-80 grayscale pointer-events-none select-none" : ""}`}>
                {/* Icon & Title */}
                <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${tier.highlighted ? "bg-primary/20 shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)]" : "bg-white/5"
                    }`}>
                    <tier.icon size={32} className={tier.highlighted ? "text-primary" : "text-muted-foreground"} />
                  </div>
                  <h3 className={`font-display text-3xl md:text-4xl font-bold mb-2 ${tier.highlighted ? "text-gradient-gold" : "text-foreground"
                    }`}>
                    {tier.name}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
                    {tier.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-center text-base sm:text-lg md:text-base lg:text-base leading-relaxed mb-8 sm:mb-10 sm:max-w-xs mx-auto">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-12 md:min-h-[225px]">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-[0.9rem] sm:text-base">
                      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${tier.highlighted ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                        }`}>
                        <Check size={14} />
                      </div>
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={tier.highlighted ? "luxury" : "luxury-outline"}
                  size="lg"
                  className={`w-full h-12 sm:h-14 text-sm sm:text-base tracking-widest uppercase transition-all duration-300 ${tier.highlighted ? "hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]" : ""
                    }`}
                  asChild
                >
                  <Link to={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                    Book {tier.name}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section with Images */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Select Your <span className="text-primary">Vessel</span>
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Sedan Comparison Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-none bg-white/[0.02] border border-white/5"
            >
              <div className="aspect-[3/2] overflow-hidden relative">
                <LazyImage
                  src={sedanImg}
                  alt="Premium Sedan"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-7 sm:p-10 relative">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-display text-xl sm:text-3xl font-bold text-foreground">Sedan</h4>
                  <span className="text-primary font-bold text-xl">
                    {comparisonFeatures?.filter((item) => item.feature === "Starting Price")[0].sedan}
                    <span className="text-xs text-muted-foreground font-normal ml-1">Starting</span></span>
                </div>

                <div className="space-y-4">
                  {comparisonFeatures.map((row) => (
                    <div key={row.feature} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-muted-foreground text-[0.85rem] sm:text-sm uppercase tracking-wider">{row.feature}</span>
                      <span className="text-foreground font-medium text-[0.9rem] sm:text-base">{row.sedan}</span>
                    </div>
                  ))}
                </div>

                <Button variant="luxury-outline" className="w-full mt-8 h-12 sm:h-14 text-sm sm:text-base" asChild>
                  <Link
                    to={EXTERNAL_LINKS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Book Sedan <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* SUV Comparison Card */}
            {(() => {
              const isComingSoon = true;
              return (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`group relative overflow-hidden rounded-none ${isComingSoon ? "bg-white/[0.08] border border-white/5 pointer-events-none select-none" : "bg-primary/[0.03] border border-primary/20 shadow-[0_0_50px_-12px_rgba(212,175,55,0.1)]"}`}
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    <LazyImage
                      src={suvImg}
                      alt="Luxury SUV"
                      containerClassName="w-full h-full"
                      className={`w-full h-full object-cover transition-transform duration-1000 ${isComingSoon ? "grayscale opacity-80 scale-105" : "group-hover:scale-110"}`}
                    />
                    {!isComingSoon && (
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
                    )}
                    <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${isComingSoon ? "bg-white/10 text-white/70" : "bg-primary text-primary-foreground"}`}>
                      Groups Choice
                    </div>

                    {/* Coming Soon Overlay Layer */}
                    {isComingSoon && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60">
                        {/* Diagonal subtle stripes */}
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />

                        <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-black/80 border border-white/10 rounded-2xl shadow-2xl">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-20 pointer-events-none" />

                          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 relative overflow-hidden bg-primary/10 border border-primary/20 `}>
                            <div className={`absolute inset-0 animate-pulse bg-primary/20`} />
                            <Lock size={20} className={`relative z-10 text-primary`} />
                          </div>

                          <span className="text-white text-[11px] md:text-sm uppercase tracking-[0.4em] font-black drop-shadow-lg mb-1.5 text-center">
                            Coming Soon
                          </span>
                          <span className="text-primary/70 text-[9px] uppercase tracking-widest font-medium text-center">
                            Expanding Our Fleet
                          </span>

                          {/* Glow effect under badge */}
                          <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 blur-md rounded-full pointer-events-none ${isComingSoon ? "bg-white/40" : "bg-primary/60"}`} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`p-7 sm:p-10 relative transition-all duration-700 ${isComingSoon ? "pointer-events-none select-none overflow-hidden" : ""}`}>
                    {/* Dark overlay for the section */}
                    {isComingSoon && (
                      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />
                    )}

                    <div className="relative z-10 w-full">
                      <div className="flex justify-between items-center mb-8 flex-wrap gap-y-4">
                        <div className="flex items-center gap-4">
                          <h4 className={`font-display text-xl sm:text-3xl font-bold ${isComingSoon ? "text-foreground/50" : "text-gradient-gold"}`}>SUV</h4>
                          {isComingSoon && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-xl backdrop-blur-md">
                              <Lock size={16} className="text-primary/80" />
                              <span className="text-primary/80 text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold">Coming Soon</span>
                            </div>
                          )}
                        </div>
                        <span className={`font-bold text-xl ${isComingSoon ? "text-foreground/50" : "text-primary"}`}>
                          {comparisonFeatures?.filter((item) => item.feature === "Starting Price")[0].suv}
                          <span className="text-xs text-muted-foreground font-normal ml-1">Starting</span></span>
                      </div>

                      <div className={`space-y-4 ${isComingSoon ? "opacity-80" : ""}`}>
                        {comparisonFeatures.map((row) => (
                          <div key={row.feature} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                            <span className="text-muted-foreground text-[0.85rem] sm:text-sm uppercase tracking-wider">{row.feature}</span>
                            <span className="text-foreground/50 font-medium text-[0.9rem] sm:text-base">{row.suv}</span>
                          </div>
                        ))}
                      </div>

                      <div className={isComingSoon ? "opacity-80" : ""}>
                        <Button variant={isComingSoon ? "luxury-outline" : "luxury"} className={`w-full mt-8 group h-12 sm:h-14 text-sm sm:text-base ${isComingSoon ? "grayscale" : "glow-gold"}`} asChild>
                          <Link
                            to={EXTERNAL_LINKS.booking}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            Book SUV <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>

        {/* Special Packages Grid */}
        <div className="relative">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Premium <span className="text-primary">Experiences</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
              Specialized services tailored for specific travel requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {specialPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative h-[550px] sm:h-[750px] lg:h-[550px] overflow-hidden rounded-sm border border-white/10 hover:border-primary/50 transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <LazyImage
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-7 sm:p-8 h-full flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black text-white transition-all duration-500">
                      <pkg.icon size={28} />
                    </div>

                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                      {pkg.title}
                    </h4>

                    <p className="text-white/70 text-[0.95rem] sm:text-lg lg:text-base leading-relaxed mb-8 lg:max-w-sm">
                      {pkg.description}
                    </p>

                    <ul className="space-y-3 border-t border-white/20 pt-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm sm:text-base lg:text-[0.9rem] text-white/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent opacity-40 pointer-events-none" />
    </section>
  );
};

export default ServicePackages;
