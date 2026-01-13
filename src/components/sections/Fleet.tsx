import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Wifi, Snowflake, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/common";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const vehicles = [
  {
    id: "01",
    name: "Executive Sedan",
    category: "Premium",
    image: fleetSedan,
    specs: [
      { icon: Users, label: "Up to 3 guests" },
      { icon: Briefcase, label: "2 luggage" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Snowflake, label: "Climate Control" },
    ],
    description: "The epitome of executive travel, our sedans offer a silent, smooth ride with unparalleled sophistication. Perfect for corporate transfers and airport arrivals.",
  },
  {
    id: "02",
    name: "Luxury SUV",
    category: "Prestige",
    image: fleetSuv,
    specs: [
      { icon: Users, label: "Up to 6 guests" },
      { icon: Briefcase, label: "4 luggage" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Snowflake, label: "Dual-zone Climate" },
    ],
    description: "Commanding presence meets uncompromised comfort. Our luxury SUVs provide spacious interiors and advanced safety features for groups and families.",
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
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] -z-10" />

      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20 lg:mb-32"
        >
          <span className="text-primary text-sm uppercase tracking-[0.5em] font-medium block mb-4">
            The Fleet
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8">
            Curated for
            <span className="text-gradient-gold block md:inline"> Distinction</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the pinnacle of automotive engineering with our meticulously maintained, late-model fleet of premium sedans and SUVs.
          </p>
          <div className="luxury-divider mx-auto mt-10" />
        </motion.div>

        {/* Vehicle Cards */}
        <div className="space-y-32 lg:space-y-48">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                {/* Luxury Image Container */}
                <div className="relative z-10 p-2 sm:p-3 border border-primary/20 bg-secondary/30 backdrop-blur-sm rounded-sm">
                  <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[4/3]">
                    <LazyImage
                      src={vehicle.image}
                      alt={vehicle.name}
                      containerClassName="w-full h-full"
                      className="transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>

                {/* Background "Watermark" Number */}
                <div
                  className={`absolute -top-16 hidden lg:block text-[15rem] font-bold text-primary/5 select-none pointer-events-none -z-0 font-display ${index % 2 === 0 ? "-left-12" : "-right-12"
                    }`}
                >
                  {vehicle.id}
                </div>

                {/* Floating Category Badge */}
                <div className="absolute -top-4 -right-4 sm:top-8 sm:-right-8 z-20">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                    className="bg-primary px-6 py-2 shadow-xl border border-white/10"
                  >
                    <span className="text-primary-foreground text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold whitespace-nowrap">
                      {vehicle.category} Class
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-primary" />
                  <span className="text-primary text-sm uppercase tracking-widest font-semibold">Vehicle Profile</span>
                </div>

                <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {vehicle.name}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
                  {vehicle.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {vehicle.specs.map((spec, sIdx) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + (sIdx * 0.1) }}
                      className="flex items-center gap-4 p-4 border border-white/5 bg-white/2 backdrop-blur-sm rounded-sm hover:bg-primary/5 transition-colors duration-300 group/spec"
                    >
                      <div className="w-12 h-12 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center group-hover/spec:scale-110 transition-transform duration-300">
                        <spec.icon size={20} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80">{spec.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Button variant="luxury-outline" size="lg" className="group" asChild>
                    <a
                      href="https://allriders.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Reserve Selection
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <span className="text-muted-foreground/60 text-sm italic">
                    * Available in select metropolitan areas
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
