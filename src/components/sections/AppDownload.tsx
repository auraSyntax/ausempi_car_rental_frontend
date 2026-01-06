import { useRef, memo, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Star, Apple, Play, Wifi, MapPin, CreditCard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const appFeatures = [
  { icon: MapPin, title: "Real-Time Tracking", description: "Track your chauffeur live" },
  { icon: CreditCard, title: "Seamless Payments", description: "Secure cashless transactions" },
  { icon: Bell, title: "Instant Notifications", description: "Real-time ride updates" },
  { icon: Wifi, title: "In-App Support", description: "24/7 concierge assistance" },
];

const reviews = [
  { name: "Michael R.", rating: 5, text: "Exceptional service, every single time." },
  { name: "Sarah L.", rating: 5, text: "The app is intuitive and elegant." },
  { name: "James K.", rating: 5, text: "Best luxury ride experience available." },
];

const AppDownload = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Memoize QR code pattern to prevent re-renders
  const qrPattern = useMemo(() => 
    [...Array(16)].map((_, i) => i % 3 === 0 || i % 5 === 0),
    []
  );

  const getAnimationProps = (delay = 0) => prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 30 }, animate: isInView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.5, delay } };

  return (
    <section
      id="app"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
      aria-labelledby="app-heading"
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-80" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" aria-hidden="true" />
      
      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          {...getAnimationProps()}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Mobile Experience
          </span>
          <h2 id="app-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Luxury at Your
            <span className="text-gradient-gold"> Fingertips</span>
          </h2>
          <div className="luxury-divider mx-auto mb-4" aria-hidden="true" />
          <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto">
            Download the AUXEMPI app for seamless booking, real-time tracking, and exclusive member benefits.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone Mockup - simplified animation */}
          <motion.div
            {...(prefersReducedMotion ? {} : {
              initial: { opacity: 0, x: -40 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.6, delay: 0.2 }
            })}
            className="relative flex justify-center order-2 lg:order-1"
          >
            {/* Glow Effect - simplified */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/15 blur-[80px] rounded-full" aria-hidden="true" />
            
            {/* Phone with subtle float animation */}
            <motion.div
              animate={prefersReducedMotion ? {} : { 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative w-64 lg:w-72">
                <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2.5rem] p-2.5 shadow-xl border border-primary/20">
                  {/* Screen */}
                  <div className="bg-charcoal rounded-[2rem] overflow-hidden aspect-[9/19]">
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-charcoal-light to-charcoal">
                      {/* App UI Mockup */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-4 border border-primary/30">
                        <Smartphone size={28} className="text-primary" aria-hidden="true" />
                      </div>
                      <span className="font-display text-xl font-bold text-foreground tracking-[0.2em] mb-1">
                        AUXEMPI
                      </span>
                      <span className="text-muted-foreground text-xs text-center mb-6">
                        Premium Rides
                      </span>
                      
                      {/* Fake UI Elements */}
                      <div className="w-full space-y-2">
                        <div className="h-10 bg-charcoal-light rounded-lg border border-border/50 flex items-center px-3">
                          <MapPin size={14} className="text-primary mr-2" aria-hidden="true" />
                          <span className="text-muted-foreground text-xs">Where to?</span>
                        </div>
                        <div className="h-10 bg-charcoal-light rounded-lg border border-border/50" />
                        <div className="h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-semibold uppercase tracking-widest">
                            Book Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-full" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            {...(prefersReducedMotion ? {} : {
              initial: { opacity: 0, x: 40 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.6, delay: 0.3 }
            })}
            className="order-1 lg:order-2"
          >
            {/* App Features Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  {...(prefersReducedMotion ? {} : {
                    initial: { opacity: 0, y: 15 },
                    animate: isInView ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.4, delay: 0.3 + index * 0.08 }
                  })}
                  className="bg-charcoal-light/50 border border-border/50 rounded-lg p-3 hover:border-primary/30 transition-colors duration-200"
                >
                  <feature.icon size={20} className="text-primary mb-2" aria-hidden="true" />
                  <h4 className="text-foreground font-medium text-sm mb-0.5">{feature.title}</h4>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* App Ratings */}
            <motion.div
              {...getAnimationProps(0.5)}
              className="bg-charcoal-light/30 border border-border/50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-2xl font-bold text-foreground">4.9</span>
                    <div className="flex" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-primary fill-primary" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs">Based on 12,000+ reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground font-semibold">500K+</p>
                  <p className="text-muted-foreground text-xs">Downloads</p>
                </div>
              </div>

              {/* Mini Reviews */}
              <div className="space-y-2">
                {reviews.map((review, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-semibold">{review.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-foreground text-xs font-medium">{review.name}</span>
                        <div className="flex" aria-label={`${review.rating} stars`}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={8} className="text-primary fill-primary" aria-hidden="true" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div
              {...getAnimationProps(0.6)}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Store Buttons */}
              <div className="flex flex-col gap-2">
                <Button variant="luxury" size="lg" className="gap-2 touch-target">
                  <Apple size={18} aria-hidden="true" />
                  <div className="text-left">
                    <span className="block text-[9px] opacity-80">Download on the</span>
                    <span className="block text-sm font-semibold">App Store</span>
                  </div>
                </Button>
                <Button variant="luxury-outline" size="lg" className="gap-2 touch-target">
                  <Play size={18} aria-hidden="true" />
                  <div className="text-left">
                    <span className="block text-[9px] opacity-80">Get it on</span>
                    <span className="block text-sm font-semibold">Google Play</span>
                  </div>
                </Button>
              </div>

              {/* QR Codes */}
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="w-16 h-16 bg-foreground rounded-lg p-1.5 mb-1">
                    <div className="w-full h-full bg-charcoal rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-0.5">
                      {qrPattern.map((filled, i) => (
                        <div 
                          key={i} 
                          className={filled ? 'bg-foreground' : 'bg-transparent'}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs">iOS</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-foreground rounded-lg p-1.5 mb-1">
                    <div className="w-full h-full bg-charcoal rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-0.5">
                      {qrPattern.map((filled, i) => (
                        <div 
                          key={i} 
                          className={!filled ? 'bg-foreground' : 'bg-transparent'}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs">Android</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AppDownload.displayName = "AppDownload";

export default AppDownload;
