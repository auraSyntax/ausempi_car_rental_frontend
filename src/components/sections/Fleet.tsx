import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const vehicles = [
  {
    name: "Executive Sedan",
    category: "Premium",
    image: fleetSedan,
    specs: [
      { icon: Users, label: "Up to 3 guests" },
      { icon: Briefcase, label: "2 luggage" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Snowflake, label: "Climate Control" },
    ],
    description: "Sophisticated elegance for the executive professional.",
  },
  {
    name: "Luxury SUV",
    category: "Luxury",
    image: fleetSuv,
    specs: [
      { icon: Users, label: "Up to 6 guests" },
      { icon: Briefcase, label: "4 luggage" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Snowflake, label: "Dual-zone Climate" },
    ],
    description: "Commanding presence with uncompromised comfort.",
  },
];

const Fleet = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 40 }, animate: isInView ? { opacity: 1, y: 0 } : {} };

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
      aria-labelledby="fleet-heading"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          {...animationProps}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            The Fleet
          </span>
          <h2 id="fleet-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Curated for
            <span className="text-gradient-gold"> Distinction</span>
          </h2>
          <div className="luxury-divider mx-auto" aria-hidden="true" />
        </motion.div>

        {/* Vehicle Cards */}
        <div className="space-y-16 lg:space-y-24">
          {vehicles.map((vehicle, index) => (
            <motion.article
              key={vehicle.name}
              {...(prefersReducedMotion ? {} : {
                initial: { opacity: 0, y: 50 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
              })}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.name} - ${vehicle.description}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] px-2.5 py-1 font-semibold">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                  {vehicle.description}
                </p>

                {/* Specs Grid */}
                <ul className="grid grid-cols-2 gap-3 mb-6" aria-label={`${vehicle.name} specifications`}>
                  {vehicle.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <div className="w-8 h-8 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                        <spec.icon size={16} className="text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-sm">{spec.label}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="luxury-outline" size="lg" className="touch-target" asChild>
                  <a
                    href="https://allriders.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book This Vehicle
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});

Fleet.displayName = "Fleet";

export default Fleet;
