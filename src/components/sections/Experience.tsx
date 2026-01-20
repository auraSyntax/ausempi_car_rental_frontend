import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, Shield, HeartHandshake } from "lucide-react";
import conciergeCare from "@/assets/concierge-care.avif";
import punctualPrecision from "@/assets/punctual-precision.avif";
import eliteChauffeurs from "@/assets/elite-chauffeurs.avif";
import completeDiscretion from "@/assets/complete-discretion.avif";
import { LazyImage } from "../common";

const stats = [
  { number: "15K+", label: "Rides Completed" },
  { number: "4.9", label: "Average Rating" },
  { number: "24/7", label: "Availability" },
  { number: "100%", label: "Satisfaction" },
];

const features = [
  {
    icon: Award,
    image: eliteChauffeurs,
    title: "Elite Chauffeurs",
    description: "Background-verified professionals with luxury service training and deep local knowledge.",
  },
  {
    icon: Clock,
    image: punctualPrecision,
    title: "Punctual Precision",
    description: "Real-time tracking with guaranteed on-time arrivals, every single time.",
  },
  {
    icon: Shield,
    image: completeDiscretion,
    title: "Complete Discretion",
    description: "NDA-ready service providing absolute privacy for executives and high-profile clients.",
  },
  {
    icon: HeartHandshake,
    image: conciergeCare,
    title: "Concierge Care",
    description: "Personalized attention to every detail, from temperature to preferred refreshments.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Decorative Background Text */}
      {/* <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <span className="font-display text-[20vw] font-bold whitespace-nowrap leading-none">
          AUSEMPI
        </span>
      </div> */}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary text-xs sm:text-sm uppercase tracking-[0.5em] font-bold mb-4">
              Our Legacy of Excellence
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Refining the Art of
            <span className="block italic text-gradient-gold leading-[1.2]"> Luxury Travel</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px w-24 bg-primary mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We don't just move you from point A to B. We curate a seamless,
            sophisticated environment where every detail is meticulously managed.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-24 lg:mb-32 py-12 border-y border-white/10"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center relative">
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10" />
              )}
              <div className="font-display text-4xl lg:text-6xl font-bold text-gradient-gold mb-3">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-sm border border-white/10 hover:border-primary/50 transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <LazyImage
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end">
                <div className="transform transition-transform duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black text-white transition-all duration-500">
                    <feature.icon size={24} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
