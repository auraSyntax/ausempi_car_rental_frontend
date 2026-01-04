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
    description: "Background-verified professionals with luxury service training.",
  },
  {
    icon: Clock,
    title: "Punctual Precision",
    description: "Real-time tracking with guaranteed on-time arrivals.",
  },
  {
    icon: Shield,
    title: "Complete Discretion",
    description: "NDA-ready service for executives and high-profile clients.",
  },
  {
    icon: HeartHandshake,
    title: "Concierge Care",
    description: "Personalized attention to every preference and detail.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
            The Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Beyond
            <span className="text-gradient-gold"> Transportation</span>
          </h2>
          <div className="luxury-divider mx-auto" />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 lg:mb-28"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <span className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient-gold">
                {stat.number}
              </span>
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group text-center p-6 lg:p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-sm bg-secondary/50 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:glow-gold">
                <feature.icon
                  size={28}
                  className="text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
