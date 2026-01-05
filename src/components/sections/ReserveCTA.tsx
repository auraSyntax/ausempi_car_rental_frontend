import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

const highlights = [
  { icon: Clock, text: "Available 24/7" },
  { icon: Shield, text: "Fully Insured" },
  { icon: Star, text: "5-Star Service" },
];

const ReserveCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary text-sm uppercase tracking-[0.4em] font-medium"
          >
            Begin Your Journey
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6"
          >
            Experience
            <span className="text-gradient-gold"> Distinction</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="luxury-divider mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10"
          >
            Reserve your premium transportation experience today. 
            Where every journey becomes an unforgettable moment.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.icon size={18} className="text-primary" />
                <span className="text-sm uppercase tracking-wider">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                variant="gold-cta"
                size="xl"
                className="group"
                asChild
              >
                <a
                  href={EXTERNAL_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve Now
                  <ArrowRight 
                    size={20} 
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Subtle note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-muted-foreground/60 text-xs uppercase tracking-wider mt-6"
          >
            Complimentary booking consultation available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReserveCTA;
