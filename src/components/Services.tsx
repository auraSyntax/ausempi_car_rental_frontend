import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Shield, Clock, Star, Car, Users } from "lucide-react";

const services = [
  {
    tier: "Premium",
    tagline: "Refined Excellence",
    description: "First-class sedans for the discerning professional. Impeccable service, every time.",
    features: [
      { icon: Car, text: "Executive Sedans" },
      { icon: Clock, text: "On-time Guarantee" },
      { icon: Shield, text: "Vetted Chauffeurs" },
    ],
    price: "From $95",
  },
  {
    tier: "Luxury",
    tagline: "Ultimate Prestige",
    description: "Flagship SUVs for those who demand the extraordinary. Unmatched comfort and presence.",
    features: [
      { icon: Crown, text: "Flagship SUVs" },
      { icon: Star, text: "White-glove Service" },
      { icon: Users, text: "Up to 6 Guests" },
    ],
    price: "From $195",
    featured: true,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-gradient-dark relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Two Tiers of
            <span className="text-gradient-gold"> Excellence</span>
          </h2>
          <div className="luxury-divider mx-auto" />
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.tier}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative group ${service.featured ? "md:-mt-4 md:mb-4" : ""}`}
            >
              <div
                className={`relative bg-card border rounded-sm p-8 lg:p-10 h-full transition-all duration-500 ${
                  service.featured
                    ? "border-primary/50 shadow-lg glow-gold"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] px-4 py-2 font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    {service.tier}
                  </h3>
                  <p className="text-primary text-sm uppercase tracking-[0.2em] mb-6">
                    {service.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature) => (
                      <div
                        key={feature.text}
                        className="flex items-center justify-center gap-3 text-foreground"
                      >
                        <feature.icon size={18} className="text-primary" />
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-6 border-t border-border">
                    <span className="text-muted-foreground text-sm">Starting</span>
                    <p className="font-display text-3xl font-bold text-foreground mt-1">
                      {service.price}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
