import { useRef, useEffect } from "react";
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
  Users,
  Briefcase,
  Clock,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

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
      "60-min free wait time",
    ],
    highlighted: false,
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
      "90-min free wait time",
      "Personalized preferences",
    ],
    highlighted: true,
  },
];

// Special Packages
const specialPackages = [
  {
    id: "airport",
    icon: Plane,
    title: "Airport Transfers",
    description: "Seamless arrivals and departures with real-time flight monitoring.",
    features: ["Flight tracking", "Meet at arrivals", "Luggage assistance"],
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Events",
    description: "Reliable fleet management for conferences, meetings, and executive travel.",
    features: ["Multi-vehicle coordination", "Dedicated account manager", "Priority booking"],
  },
  {
    id: "longdistance",
    icon: Route,
    title: "Long-Distance",
    description: "Comfortable intercity travel with scheduled stops and premium amenities.",
    features: ["Flexible stops", "Extended comfort features", "Competitive rates"],
  },
];

// Comparison Data
const comparisonFeatures = [
  { feature: "Passengers", sedan: "Up to 3", suv: "Up to 6" },
  { feature: "Luggage", sedan: "2 Large bags", suv: "4 Large bags" },
  { feature: "Ideal For", sedan: "Executive travel", suv: "Groups & families" },
  { feature: "Interior Space", sedan: "Refined", suv: "Spacious" },
  { feature: "Starting Price", sedan: "From $95", suv: "From $145" },
];

const ServicePackages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

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
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="header-animate inline-flex items-center gap-3 text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-4">
            <span className="w-8 md:w-12 h-px bg-primary/60" />
            Service Packages
            <span className="w-8 md:w-12 h-px bg-primary/60" />
          </span>
          <h2 className="header-animate font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Tailored to
            <span className="text-gradient-gold"> Your Needs</span>
          </h2>
          <p className="header-animate text-muted-foreground text-lg max-w-2xl mx-auto">
            From executive sedan service to fleet management, we offer flexible packages 
            designed around your requirements.
          </p>
        </div>

        {/* Service Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-20 lg:mb-28"
        >
          {serviceTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className={`relative p-8 lg:p-10 rounded-sm border transition-all duration-500 ${
                tier.highlighted
                  ? "border-primary/50 bg-primary/5 shadow-lg"
                  : "border-border/50 bg-background/50"
              }`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 font-semibold">
                    Recommended
                  </span>
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                  tier.highlighted ? "bg-primary/20" : "bg-secondary/50"
                }`}>
                  <tier.icon size={20} className={tier.highlighted ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div>
                  <h3 className={`font-display text-2xl font-bold ${
                    tier.highlighted ? "text-gradient-gold" : "text-foreground"
                  }`}>
                    {tier.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {tier.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check size={14} className={tier.highlighted ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.highlighted ? "luxury" : "luxury-outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Book {tier.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Packages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 lg:mb-28"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Special Packages
          </h3>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12" />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {specialPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group p-6 lg:p-8 rounded-sm border border-border/30 bg-background/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-sm bg-secondary/50 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <pkg.icon size={22} className="text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                  {pkg.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {pkg.description}
                </p>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sedan vs SUV Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Sedan vs SUV
          </h3>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12" />

          {/* Desktop Table */}
          <div className="hidden md:block max-w-3xl mx-auto">
            <div className="rounded-sm border border-border/30 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-secondary/30">
                <div className="p-4 lg:p-5 border-r border-border/30">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Feature</span>
                </div>
                <div className="p-4 lg:p-5 border-r border-border/30 text-center">
                  <span className="font-display text-lg font-semibold text-foreground">Sedan</span>
                </div>
                <div className="p-4 lg:p-5 text-center bg-primary/5">
                  <span className="font-display text-lg font-semibold text-gradient-gold">SUV</span>
                </div>
              </div>

              {/* Rows */}
              {comparisonFeatures.map((row, index) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${
                    index !== comparisonFeatures.length - 1 ? "border-b border-border/20" : ""
                  }`}
                >
                  <div className="p-4 lg:p-5 border-r border-border/20 flex items-center">
                    <span className="text-sm text-muted-foreground">{row.feature}</span>
                  </div>
                  <div className="p-4 lg:p-5 border-r border-border/20 flex items-center justify-center">
                    <span className="text-sm text-foreground">{row.sedan}</span>
                  </div>
                  <div className="p-4 lg:p-5 flex items-center justify-center bg-primary/5">
                    <span className="text-sm text-foreground font-medium">{row.suv}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {/* Sedan Card */}
            <div className="p-5 rounded-sm border border-border/30 bg-background/30">
              <h4 className="font-display text-lg font-semibold text-foreground mb-4 text-center">Sedan</h4>
              <ul className="space-y-3">
                {comparisonFeatures.map((row) => (
                  <li key={row.feature} className="text-center">
                    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      {row.feature}
                    </span>
                    <span className="text-sm text-foreground">{row.sedan}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUV Card */}
            <div className="p-5 rounded-sm border border-primary/30 bg-primary/5">
              <h4 className="font-display text-lg font-semibold text-gradient-gold mb-4 text-center">SUV</h4>
              <ul className="space-y-3">
                {comparisonFeatures.map((row) => (
                  <li key={row.feature} className="text-center">
                    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      {row.feature}
                    </span>
                    <span className="text-sm text-foreground font-medium">{row.suv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button variant="luxury" size="lg" className="glow-gold" asChild>
              <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                Reserve Your Ride
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default ServicePackages;
