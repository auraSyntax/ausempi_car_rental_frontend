import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock, Shield, HeartHandshake } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

const Experience = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const getAnimationProps = (delay = 0) => prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 30 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5, delay } };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Decorative Elements - simplified */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <motion.div
          {...getAnimationProps()}
          className="text-center mb-12 lg:mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            The Experience
          </span>
          <h2 id="experience-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Beyond
            <span className="text-gradient-gold"> Transportation</span>
          </h2>
          <div className="luxury-divider mx-auto" aria-hidden="true" />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          {...getAnimationProps(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...(prefersReducedMotion ? {} : {
                initial: { opacity: 0, scale: 0.9 },
                animate: isInView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.4, delay: 0.2 + index * 0.08 }
              })}
              className="text-center"
            >
              <span className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-gradient-gold">
                {stat.number}
              </span>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.15em] mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              {...(prefersReducedMotion ? {} : {
                initial: { opacity: 0, y: 25 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.4, delay: 0.3 + index * 0.08 }
              })}
              className="group text-center p-5 lg:p-6"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-sm bg-secondary/50 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary">
                <feature.icon
                  size={24}
                  className="text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
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
});

Experience.displayName = "Experience";

export default Experience;
