import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="app"
      ref={sectionRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
              Mobile App
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Luxury at Your
              <span className="text-gradient-gold"> Fingertips</span>
            </h2>
            <div className="luxury-divider mb-8" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Book your premium ride in seconds. Real-time tracking, instant confirmations, and seamless payments—all within the AUXEMPI app.
            </p>

            {/* App Features */}
            <div className="space-y-4 mb-10">
              {[
                "Instant booking with real-time availability",
                "Live GPS tracking of your chauffeur",
                "Secure, cashless payments",
                "Rate and review every ride",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Star size={16} className="text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="luxury" size="lg" className="gap-3">
                <Download size={18} />
                App Store
              </Button>
              <Button variant="luxury-outline" size="lg" className="gap-3">
                <Download size={18} />
                Google Play
              </Button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
            
            {/* Phone Frame */}
            <div className="relative w-72 lg:w-80">
              <div className="relative bg-charcoal-light rounded-[3rem] p-3 shadow-2xl border border-border">
                {/* Screen */}
                <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-charcoal to-background">
                    {/* App UI Mockup */}
                    <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 glow-gold">
                      <Smartphone size={32} className="text-primary" />
                    </div>
                    <span className="font-display text-2xl font-bold text-foreground tracking-[0.2em] mb-2">
                      AUXEMPI
                    </span>
                    <span className="text-muted-foreground text-sm text-center">
                      Premium Rides
                    </span>
                    
                    {/* Fake UI Elements */}
                    <div className="w-full mt-8 space-y-3">
                      <div className="h-12 bg-secondary rounded-sm animate-pulse" />
                      <div className="h-12 bg-primary/20 rounded-sm" />
                      <div className="h-10 bg-primary rounded-sm flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-semibold uppercase tracking-widest">
                          Book Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-charcoal-light rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
