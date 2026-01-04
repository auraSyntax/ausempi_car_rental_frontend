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
      transition={{ duration: 0.9, delay: index * 0.2, ease: "easeOut" }}
      className={`grid lg:grid-cols-2 gap-0 lg:gap-0 items-stretch ${
        isReversed ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden h-[400px] lg:h-[600px] ${
          isReversed ? "lg:col-start-2" : ""
        }`}
      >
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent lg:hidden" />
          <div className={`absolute inset-0 hidden lg:block ${
            isReversed 
              ? "bg-gradient-to-l from-background via-background/60 to-transparent" 
              : "bg-gradient-to-r from-background via-background/60 to-transparent"
          }`} />
        </div>

        {/* Service Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
          className="absolute top-6 left-6 lg:top-8 lg:left-8"
        >
          <span className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs uppercase tracking-[0.2em] px-4 py-2 font-semibold">
            <Crown size={14} />
            {service.subtitle}
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div
        className={`relative bg-charcoal p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${
          isReversed ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {/* Gold Accent */}
        <div className={`absolute top-0 ${isReversed ? "right-0" : "left-0"} w-px h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden lg:block`} />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            {service.title}
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primary/30 mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
            {service.description}
          </p>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {service.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 lg:p-5 rounded-sm border transition-all duration-300 ${
                tier.highlighted
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-secondary/30 hover:border-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <tier.icon size={16} className={tier.highlighted ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${
                  tier.highlighted ? "text-primary" : "text-foreground"
                }`}>
                  {tier.name}
                </span>
              </div>
              <ul className="space-y-1.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 lg:gap-6 mb-8"
        >
          {service.amenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground group"
            >
              <div className="w-8 h-8 rounded-sm bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <amenity.icon size={14} className="text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wider hidden sm:inline">{amenity.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Button variant="luxury-outline" size="lg" className="group" asChild>
            <a href="#fleet">
              Learn More
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
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
      <div ref={headerRef} className="container-luxury pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 text-center">
        <span className="header-animate inline-flex items-center gap-3 text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-medium mb-4">
          <span className="w-8 md:w-12 h-px bg-primary/60" />
          Our Services
          <span className="w-8 md:w-12 h-px bg-primary/60" />
        </span>
        <h2 className="header-animate font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
          Curated for
          <span className="text-gradient-gold"> Excellence</span>
        </h2>
        <p className="header-animate text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose your experience. From executive sedans to commanding SUVs, 
          every journey is tailored to perfection.
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
