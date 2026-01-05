import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Star, Apple, Play, Wifi, MapPin, CreditCard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const AppDownload = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="app"
      ref={sectionRef}
      className="section-padding bg-charcoal relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-80" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.4em] font-medium">
            Mobile Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
            Luxury at Your
            <span className="text-gradient-gold"> Fingertips</span>
          </h2>
          <div className="luxury-divider mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Download the AUXEMPI app for seamless booking, real-time tracking, and exclusive member benefits.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Phone Mockup with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 blur-[100px] rounded-full" />
            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-primary/10 blur-[60px] rounded-full" />
            
            {/* Floating Phone */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative w-72 lg:w-80">
                <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl border border-primary/20">
                  {/* Screen */}
                  <div className="bg-charcoal rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-charcoal-light to-charcoal">
                      {/* App UI Mockup */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-6 border border-primary/30"
                      >
                        <Smartphone size={32} className="text-primary" />
                      </motion.div>
                      <span className="font-display text-2xl font-bold text-foreground tracking-[0.2em] mb-2">
                        AUXEMPI
                      </span>
                      <span className="text-muted-foreground text-sm text-center mb-8">
                        Premium Rides
                      </span>
                      
                      {/* Fake UI Elements */}
                      <div className="w-full space-y-3">
                        <div className="h-12 bg-charcoal-light rounded-lg border border-border/50 flex items-center px-4">
                          <MapPin size={16} className="text-primary mr-3" />
                          <span className="text-muted-foreground text-xs">Where to?</span>
                        </div>
                        <div className="h-12 bg-charcoal-light rounded-lg border border-border/50" />
                        <div className="h-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center glow-gold">
                          <span className="text-primary-foreground text-xs font-semibold uppercase tracking-widest">
                            Book Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-full" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -right-8 top-20 bg-charcoal-light border border-primary/30 rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bell size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground font-medium">Ride Confirmed</p>
                      <p className="text-[10px] text-muted-foreground">Arriving in 5 min</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0], x: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute -left-6 bottom-32 bg-charcoal-light border border-primary/30 rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-foreground">5.0</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            {/* App Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-charcoal-light/50 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors duration-300"
                >
                  <feature.icon size={24} className="text-primary mb-3" />
                  <h4 className="text-foreground font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* App Ratings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-charcoal-light/30 border border-border/50 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-foreground">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">Based on 12,000+ reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground font-semibold">500K+</p>
                  <p className="text-muted-foreground text-sm">Downloads</p>
                </div>
              </div>

              {/* Mini Reviews */}
              <div className="space-y-3">
                {reviews.map((review, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-semibold">{review.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground text-sm font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={10} className="text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Store Buttons */}
              <div className="flex flex-col gap-3">
                <Button variant="luxury" size="lg" className="gap-3 w-full sm:w-auto">
                  <Apple size={20} />
                  <div className="text-left">
                    <span className="block text-[10px] opacity-80">Download on the</span>
                    <span className="block text-sm font-semibold">App Store</span>
                  </div>
                </Button>
                <Button variant="luxury-outline" size="lg" className="gap-3 w-full sm:w-auto">
                  <Play size={20} />
                  <div className="text-left">
                    <span className="block text-[10px] opacity-80">Get it on</span>
                    <span className="block text-sm font-semibold">Google Play</span>
                  </div>
                </Button>
              </div>

              {/* QR Codes */}
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-foreground rounded-lg p-2 mb-2">
                    <div className="w-full h-full bg-charcoal rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
                      {[...Array(16)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs">iOS</span>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-foreground rounded-lg p-2 mb-2">
                    <div className="w-full h-full bg-charcoal rounded grid grid-cols-4 grid-rows-4 gap-0.5 p-1">
                      {[...Array(16)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
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
};

export default AppDownload;
