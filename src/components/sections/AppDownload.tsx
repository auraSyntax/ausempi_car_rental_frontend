import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Smartphone, Star, Apple, Play, Wifi, MapPin, 
  CreditCard, Bell, ShieldCheck, Zap, Headphones,
  ChevronRight, Globe, Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appFeatures = [
  { 
    icon: MapPin, 
    title: "Precision Tracking", 
    description: "Real-time GPS tracking of your elite chauffeur with millisecond accuracy.",
    tag: "Live Data"
  },
  { 
    icon: Fingerprint, 
    title: "Secure Access", 
    description: "Biometric authentication and encrypted payment systems for absolute peace of mind.",
    tag: "Military Grade"
  },
  { 
    icon: Zap, 
    title: "Instant Booking", 
    description: "One-tap reservation system designed for the fast-paced executive lifestyle.",
    tag: "High Priority"
  },
  { 
    icon: Headphones, 
    title: "24/7 Concierge", 
    description: "Direct line to our premium support team for bespoke travel requirements.",
    tag: "Priority Support"
  },
];

const reviews = [
  { name: "Alexander V.", rating: 5, text: "The interface is as smooth as the rides themselves." },
  { name: "Julianne M.", rating: 5, text: "Managing global travel has never been this effortless." },
];

const AppDownload = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="app"
      ref={sectionRef}
      className="section-padding bg-[#050505] relative overflow-hidden"
    >
      {/* Editorial Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden w-full h-full flex items-center justify-center">
        <span className="text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap leading-none">
          AUXEMPI EXPERIENCE
        </span>
      </div>

      {/* Luxury Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">
          
          {/* Visual Side: Enhanced Phone Mockup */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              {/* Dynamic Glow Behind Phone */}
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full transform scale-75 animate-pulse" />
              
              {/* Main Phone Frame */}
              <div className="relative w-[300px] md:w-[340px]">
                <div className="relative bg-[#1A1A1A] rounded-[3.5rem] p-3.5 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
                  {/* Subtle Inner Bezel Reflect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
                  
                  {/* Screen Content */}
                  <div className="bg-[#0A0A0A] rounded-[2.8rem] overflow-hidden aspect-[9/19.5] relative flex flex-col">
                    {/* App Status Bar */}
                    <div className="flex justify-between items-center px-8 pt-6 pb-2">
                      <span className="text-[10px] text-white/40 font-medium">9:41</span>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full border border-white/20" />
                        <Wifi size={10} className="text-white/40" />
                      </div>
                    </div>

                    {/* App Content Interface */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <p className="text-[10px] text-primary uppercase tracking-widest mb-1">Welcome back</p>
                          <h4 className="text-sm font-display font-bold text-white">Mr. Kensington</h4>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-charcoal" />
                        </div>
                      </div>

                      {/* Featured Ride Selection */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">Available Now</span>
                          <Star size={12} className="text-primary fill-primary" />
                        </div>
                        <div className="w-full h-24 bg-gradient-to-b from-transparent to-white/5 rounded-xl mb-3 flex items-center justify-center">
                           {/* Placeholder for car image in UI */}
                           <div className="w-3/4 h-12 border-b border-primary/20 relative">
                             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                           </div>
                        </div>
                        <h5 className="text-xs font-semibold text-white mb-1">Rolls Royce Ghost</h5>
                        <p className="text-[9px] text-white/40">Signature Series • Mayfair, London</p>
                      </div>

                      {/* Destination Input */}
                      <div className="mt-auto space-y-3">
                        <div className="h-11 bg-white/[0.03] border border-white/10 rounded-xl flex items-center px-4 gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                          <span className="text-[10px] text-white/60 italic">Where shall we take you?</span>
                        </div>
                        <Button className="w-full h-11 bg-primary hover:bg-primary/90 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold text-black shadow-[0_10px_20px_rgba(var(--primary),0.2)]">
                          Request Chauffeur
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-2xl border-x border-b border-white/5" />
                </div>

                {/* Floating Notification - Elite Level */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-12 top-24 bg-[#111] border border-primary/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl w-48 z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Bell size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white font-bold mb-0.5">Ride Arrived</p>
                      <p className="text-[9px] text-white/40">Your Phantom is here</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Rating Badge */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-10 bottom-40 bg-white/5 border border-white/10 rounded-2xl p-3 px-4 shadow-2xl backdrop-blur-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                         <div key={i} className="w-6 h-6 rounded-full border border-[#111] bg-charcoal" />
                       ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[11px] text-white font-bold">4.98</span>
                        <Star size={10} className="text-primary fill-primary" />
                      </div>
                      <p className="text-[8px] text-white/40">Elite Chauffeurs</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold">
                  The Mobile Suite
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
                Luxury Managed <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary">In Real-Time</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl leading-relaxed">
                The AUXEMPI mobile application is more than just a booking tool—it's your personal digital concierge, designed for seamless global mobility.
              </p>
            </motion.div>

            {/* Premium Features List */}
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-primary/20" />
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                        <feature.icon size={22} className="text-primary" />
                      </div>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
                        {feature.tag}
                      </span>
                    </div>
                    <h4 className="text-white font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-white/40 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust & Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-10"
            >
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col gap-2">
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-primary fill-primary" />)}
                   </div>
                   <p className="text-white font-bold text-xl">4.9 / 5.0</p>
                   <p className="text-white/40 text-xs">App Store Excellence</p>
                </div>
                <div className="h-12 w-px bg-white/10 hidden sm:block" />
                <div className="flex flex-col gap-2">
                   <p className="text-white font-bold text-xl">150K+</p>
                   <p className="text-white/40 text-xs">Elite Active Members</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="h-16 px-8 bg-white text-black hover:bg-white/90 rounded-2xl gap-4 group transition-all duration-500 hover:scale-[1.02]">
                  <Apple size={28} className="fill-black" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold opacity-60 leading-none mb-1">Download on the</p>
                    <p className="text-lg font-bold leading-none">App Store</p>
                  </div>
                  <ChevronRight size={18} className="ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
                
                <Button className="h-16 px-8 bg-transparent border border-white/20 hover:border-primary text-white rounded-2xl gap-4 group transition-all duration-500 hover:scale-[1.02]">
                  <Play size={24} className="fill-white" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold opacity-60 leading-none mb-1">Get it on</p>
                    <p className="text-lg font-bold leading-none">Google Play</p>
                  </div>
                  <ChevronRight size={18} className="ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>

                {/* Premium QR Code Frame */}
                {/* <div className="relative group ml-auto hidden xl:block">
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-[#111] border border-white/10 p-2 rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-lg p-1.5 overflow-hidden">
                       <div className="w-full h-full bg-black flex items-center justify-center">
                          <Globe size={16} className="text-primary" />
                       </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-white/30 text-center mt-2 uppercase tracking-widest">Scan to join</p>
                </div> */}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppDownload;
