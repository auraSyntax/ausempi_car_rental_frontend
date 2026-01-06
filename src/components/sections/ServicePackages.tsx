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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Assets
import sedanImg from "@/assets/fleet-sedan.jpg";
import suvImg from "@/assets/fleet-suv.jpg";

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
    description: "Seamless arrivals and departures with real-time flight monitoring and meet & greet.",
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
          <h2 className="header-animate font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mt-4 mb-8">
            Tailored to
            <span className="text-gradient-gold"> Your Needs</span>
          </h2>
          <p className="header-animate text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
              className={`group relative p-8 lg:p-12 rounded-2xl border transition-all duration-700 ${
                tier.highlighted
                  ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_50px_-12px_rgba(212,175,55,0.15)]"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              {/* Highlighted Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-[10px] md:text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full font-bold shadow-lg shadow-primary/20">
                    Recommended
                  </span>
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${
                  tier.highlighted ? "bg-primary/20 shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)]" : "bg-white/5"
                }`}>
                  <tier.icon size={32} className={tier.highlighted ? "text-primary" : "text-muted-foreground"} />
                </div>
                <h3 className={`font-display text-3xl md:text-4xl font-bold mb-2 ${
                  tier.highlighted ? "text-gradient-gold" : "text-foreground"
                }`}>
                  {tier.name}
                </h3>
                <p className="text-sm uppercase tracking-[0.2em] text-primary/80 font-medium">
                  {tier.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-center text-base leading-relaxed mb-10">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-12">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-base">
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      tier.highlighted ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
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
                className={`w-full h-14 text-base tracking-widest uppercase transition-all duration-300 ${
                  tier.highlighted ? "hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]" : ""
                }`}
                asChild
              >
                <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Book {tier.name}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section with Images */}
        <div className="mb-24 lg:mb-32">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              className="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={sedanImg} 
                  alt="Premium Sedan" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-8 lg:p-10 relative">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-display text-3xl font-bold text-foreground">Premium Sedan</h4>
                  <span className="text-primary font-bold text-xl">$95<span className="text-xs text-muted-foreground font-normal ml-1">Starting</span></span>
                </div>
                
                <div className="space-y-4">
                  {comparisonFeatures.map((row) => (
                    <div key={row.feature} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-muted-foreground text-sm uppercase tracking-wider">{row.feature}</span>
                      <span className="text-foreground font-medium">{row.sedan}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="luxury-outline" className="w-full mt-8 group" asChild>
                  <a href={EXTERNAL_LINKS.booking} className="flex items-center justify-center gap-2">
                    Book Sedan <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* SUV Comparison Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden rounded-3xl bg-primary/[0.03] border border-primary/20 shadow-[0_0_50px_-12px_rgba(212,175,55,0.1)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={suvImg} 
                  alt="Luxury SUV" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest">
                  Groups Choice
                </div>
              </div>
              <div className="p-8 lg:p-10 relative">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-display text-3xl font-bold text-gradient-gold">Luxury SUV</h4>
                  <span className="text-primary font-bold text-xl">$145<span className="text-xs text-muted-foreground font-normal ml-1">Starting</span></span>
                </div>
                
                <div className="space-y-4">
                  {comparisonFeatures.map((row) => (
                    <div key={row.feature} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                      <span className="text-muted-foreground text-sm uppercase tracking-wider">{row.feature}</span>
                      <span className="text-foreground font-medium">{row.suv}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="luxury" className="w-full mt-8 group glow-gold" asChild>
                  <a href={EXTERNAL_LINKS.booking} className="flex items-center justify-center gap-2">
                    Book SUV <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Special Packages Grid */}
        <div className="relative">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Premium <span className="text-primary">Experiences</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Specialized services tailored for specific travel requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {specialPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <pkg.icon size={28} className="text-primary" />
                </div>
                <h4 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {pkg.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
