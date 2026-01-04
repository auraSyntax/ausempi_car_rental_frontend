import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const Fleet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="fleet"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
            The Fleet
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Curated for
            <span className="text-gradient-gold"> Distinction</span>
          </h2>
          <div className="luxury-divider mx-auto" />
        </motion.div>

        {/* Vehicle Cards */}
        <div className="space-y-24 lg:space-y-32">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: index * 0.3 }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
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
                    alt={vehicle.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] px-3 py-1.5 font-semibold">
                    {vehicle.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {vehicle.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {vehicle.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center">
                        <spec.icon size={18} className="text-primary" />
                      </div>
                      <span className="text-sm">{spec.label}</span>
                    </div>
                  ))}
                </div>

                <Button variant="luxury-outline" size="lg" asChild>
                  <a
                    href="https://allriders.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book This Vehicle
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
