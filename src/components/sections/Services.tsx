import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, BatteryCharging, Wine, Thermometer, Shield, Clock, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "sedan",
    title: "Luxury Sedan",
    subtitle: "Executive Excellence",
    description: "Refined elegance for the discerning professional. Every detail curated for your comfort.",
    image: fleetSedan,
    tiers: [
      { name: "Premium", icon: Star, features: ["Professional chauffeur", "Complimentary water", "Phone charging"] },
      { name: "Luxury", icon: Crown, features: ["Elite chauffeur", "Premium refreshments", "Dedicated concierge"], highlighted: true },
    ],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: BatteryCharging, label: "Device Charging" },
      { icon: Wine, label: "Refreshments" },
      { icon: Thermometer, label: "Climate Control" },
    ],
  },
  {
    id: "suv",
    title: "Luxury SUV",
    subtitle: "Commanding Presence",
    description: "Spacious sophistication for those who demand more. Arrive with unmistakable prestige.",
    image: fleetSuv,
    tiers: [
      { name: "Premium", icon: Star, features: ["Up to 5 guests", "Luggage capacity", "Airport meet & greet"] },
      { name: "Luxury", icon: Crown, features: ["Up to 6 guests", "Expanded cargo", "VIP handling"], highlighted: true },
    ],
    amenities: [
      { icon: Shield, label: "Privacy Partition" },
      { icon: BatteryCharging, label: "Multiple Ports" },
      { icon: Clock, label: "Flexible Timing" },
      { icon: Thermometer, label: "Dual Climate" },
    ],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
      className={`flex flex-col lg:grid lg:grid-cols-2 gap-0 items-stretch ${
        isReversed ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden h-[350px] sm:h-[450px] lg:h-[700px] w-full ${
          isReversed ? "lg:col-start-2" : ""
        }`}
      >
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent lg:hidden" />
          <div className={`absolute inset-0 hidden lg:block ${
            isReversed 
              ? "bg-gradient-to-l from-charcoal via-transparent to-transparent" 
              : "bg-gradient-to-r from-charcoal via-transparent to-transparent"
          }`} />
        </div>

        {/* Service Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute top-6 left-6 lg:top-10 lg:left-10 z-10"
        >
          <span className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] md:text-xs uppercase tracking-[0.25em] px-5 py-2.5 font-bold shadow-2xl border border-white/10">
            <Crown size={14} className="animate-pulse-gold" />
            {service.subtitle}
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div
        className={`relative bg-charcoal p-6 sm:p-10 lg:p-16 xl:p-24 flex flex-col justify-center ${
          isReversed ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {/* Edge Accents */}
        <div className={`absolute top-0 ${isReversed ? "right-0" : "left-0"} w-px h-full bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden lg:block`} />
        
        {/* Animated Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10"
        >
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            {service.title}
          </h3>
          <div className="w-20 h-[3px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-8" />
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            {service.description}
          </p>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 relative z-10"
        >
          {service.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`group p-5 lg:p-7 rounded-none border transition-all duration-500 relative overflow-hidden ${
                tier.highlighted
                  ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_30px_rgba(var(--primary),0.05)]"
                  : "border-border/30 bg-secondary/10 hover:border-primary/30"
              }`}
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-none flex items-center justify-center border transition-colors duration-300 ${
                      tier.highlighted ? "bg-primary/20 border-primary/40" : "bg-white/5 border-white/10 group-hover:border-primary/30"
                    }`}>
                      <tier.icon size={18} className={tier.highlighted ? "text-primary" : "text-muted-foreground group-hover:text-primary"} />
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-[0.15em] ${
                      tier.highlighted ? "text-primary" : "text-foreground"
                    }`}>
                      {tier.name}
                    </span>
                  </div>
                  {tier.highlighted && (
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 font-bold uppercase tracking-widest">Selected</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-xs sm:text-sm text-muted-foreground flex items-center gap-3 group/item">
                      <span className="w-1.5 h-1.5 rounded-none bg-primary/40 group-hover/item:scale-125 transition-transform duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 sm:gap-8 mb-12 relative z-10"
        >
          {service.amenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-3 text-muted-foreground group"
            >
              <div className="w-10 h-10 rounded-none bg-secondary/30 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                <amenity.icon size={16} className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-primary/50 font-bold mb-0.5">Feature</span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-foreground/80 group-hover:text-foreground transition-colors duration-300 font-medium">{amenity.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10"
        >
          <Button variant="luxury-outline" size="lg" className="group h-14 px-10 text-xs tracking-[0.2em] uppercase font-bold" asChild>
            <a href="#fleet">
              View Fleet Details
              <span className="inline-block ml-3 transition-transform duration-500 group-hover:translate-x-2">→</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".header-animate"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-background relative overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="container-luxury pt-24 md:pt-32 lg:pt-48 pb-16 md:pb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="header-animate"
        >
          <span className="inline-flex items-center gap-4 text-primary text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-6">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            Elite Services
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </span>
        </motion.div>
        
        <h2 className="header-animate font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mt-4 mb-8 tracking-tight leading-[1.1]">
          Mastery in <br className="hidden md:block" />
          <span className="text-gradient-gold italic">Motion</span>
        </h2>
        
        <div className="header-animate w-24 h-1 bg-primary mx-auto mb-10" />
        
        <p className="header-animate text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Experience the pinnacle of luxury transportation. From bespoke executive travel to 
          grand group expeditions, we redefine every mile with uncompromising standards.
        </p>
      </div>

      {/* Service Cards */}
      <div className="space-y-0">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Bottom Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-0" />
    </section>
  );
};

export default Services;
