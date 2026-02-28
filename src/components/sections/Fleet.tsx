import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Wifi, Snowflake, ChevronRight, Laptop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/common";
import insideSedan from "@/assets/sedan-inside.avif";
import insideSuv from "@/assets/suv-inside.avif";
import { Link } from "react-router-dom";
import { EXTERNAL_LINKS } from "@/lib";

const vehicles = [
  {
    id: "1",
    name: "Executive Sedan",
    category: "Premium",
    image: insideSedan,
    specs: [
      { icon: Users, label: "2 guests" },
      { icon: Briefcase, label: "2 luggage" },
      { icon: Laptop, label: "Work space" },
      { icon: Snowflake, label: "Climate Control" },
    ],
    description: "The epitome of executive travel, our sedans offer a silent, smooth ride with unparalleled sophistication. Perfect for corporate transfers and airport arrivals.",
  },
  {
    id: "2",
    name: "Luxury SUV",
    category: "Prestige",
    image: insideSuv,
    isComingSoon: true,
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
          <span className="text-primary text-xs sm:text-sm uppercase tracking-[0.5em] font-medium block mb-4">
            The Fleet
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-8">
            Curated for
            <span className="text-gradient-gold block italic"> Distinction</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
                <div className={`relative z-10 p-2 sm:p-3 border border-primary/20 bg-secondary/30 backdrop-blur-sm rounded-sm ${vehicle.isComingSoon ? "pointer-events-none select-none" : ""}`}>
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <LazyImage
                      src={vehicle.image}
                      alt={vehicle.name}
                      containerClassName="w-full h-full"
                      className={`transition-transform duration-1000 ${vehicle.isComingSoon ? "grayscale opacity-80 blur-sm scale-105" : "group-hover:scale-110"}`}
                    />
                    {/* Dark gradient overlay for text readability if needed */}
                    {!vehicle.isComingSoon && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    )}

                    {/* Coming Soon Overlay Layer */}
                    {vehicle.isComingSoon && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                        {/* Diagonal subtle stripes */}
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />

                        <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-20 pointer-events-none" />

                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                            <Clock size={20} className="text-primary relative z-10" />
                          </div>

                          <span className="text-white text-[11px] md:text-sm uppercase tracking-[0.4em] font-black drop-shadow-lg mb-1.5 text-center">
                            Coming Soon
                          </span>
                          <span className="text-primary/70 text-[9px] uppercase tracking-widest font-medium text-center">
                            Expanding Our Fleet
                          </span>

                          {/* Glow effect under badge */}
                          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-primary/40 blur-xl rounded-full pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background "Watermark" Number */}
                <div
                  className={`absolute -top-16 hidden lg:block text-[15rem] font-bold text-primary/5 ${vehicle.isComingSoon ? "grayscale blur-sm" : ""} select-none pointer-events-none -z-0 font-display ${index % 2 === 0 ? "-left-12" : "-right-12"
                    }`}
                >
                  {vehicle.id}
                </div>

                {/* Floating Category Badge */}
                <div className={`absolute -top-4 -right-4 sm:top-8 sm:-right-8 z-20 ${vehicle.isComingSoon ? "opacity-60 grayscale blur-[2px]" : ""}`}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={vehicle.isComingSoon ? {} : { rotate: 0, scale: 1.05 }}
                    className="bg-primary px-4 sm:px-6 py-1 sm:py-2 shadow-xl border border-white/10"
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
                className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} ${vehicle.isComingSoon ? "opacity-60 grayscale blur-sm pointer-events-none select-none transition-all duration-700" : ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-primary" />
                  <span className="text-primary text-xs sm:text-sm uppercase tracking-widest font-semibold">Vehicle Profile</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {vehicle.name}
                </h3>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
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
                      className="flex items-center gap-4 p-3 sm:p-4 border border-white/5 bg-white/2 backdrop-blur-sm rounded-sm hover:bg-primary/5 transition-colors duration-300 group/spec"
                    >
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center group-hover/spec:scale-110 transition-transform duration-300">
                        <spec.icon className="text-primary w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[0.9rem] sm:text-[0.95rem] font-medium text-foreground/80">{spec.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Button variant="luxury-outline" size="lg" className="group" asChild>
                    <Link
                      to={EXTERNAL_LINKS.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Reserve Selection
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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
