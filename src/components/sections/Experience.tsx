import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, Shield, HeartHandshake } from "lucide-react";

const stats = [
  { number: "15K+", label: "Rides Completed" },
  { number: "4.9", label: "Average Rating" },
  { number: "24/7", label: "Availability" },
  { number: "100%", label: "Satisfaction" },
];

const features = [
  {
    icon: Award,
    title: "Elite Chauffeurs",
    description: "Background-verified professionals with luxury service training and deep local knowledge.",
  },
  {
    icon: Clock,
    title: "Punctual Precision",
    description: "Real-time tracking with guaranteed on-time arrivals, every single time.",
  },
  {
    icon: Shield,
    title: "Complete Discretion",
    description: "NDA-ready service providing absolute privacy for executives and high-profile clients.",
  },
  {
    icon: HeartHandshake,
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <span className="font-display text-[20vw] font-bold whitespace-nowrap leading-none">
          AUXEMPI
        </span>
      </div>

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
            <span className="inline-block text-primary text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-4">
              Our Legacy of Excellence
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8"
          >
            Refining the Art of
            <span className="block text-gradient-gold"> Luxury Travel</span>
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
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-24 lg:mb-32 py-12 border-y border-white/5"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center relative">
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10" />
              )}
              <div className="font-display text-4xl lg:text-6xl font-bold text-gradient-gold mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="group relative p-8 rounded-none bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <feature.icon
                    size={24}
                    className="text-primary transition-transform duration-500 group-hover:rotate-6"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
