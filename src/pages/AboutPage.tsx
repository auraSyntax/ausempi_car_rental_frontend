import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Shield, 
  Award, 
  CheckCircle, 
  Navigation,
  Star,
  Zap,
  ChevronRight,
  UserCheck,
  Crown,
  MapPin,
  Clock,
  ArrowUpRight
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";

// Import local assets
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const sections = {
  hero: {
    title: "About AUXEMPI",
    tagline: "The Pinnacle of Private Luxury",
    subtitle: "Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=2070&auto=format&fit=crop"
  },
  story: {
    title: "Our Legacy of Excellence",
    content: [
      "AUXEMPI was founded on a singular premise: that luxury transportation should be an extension of one's lifestyle—seamless, sophisticated, and absolutely reliable.",
      "We recognized that for our discerning clientele, the journey is as significant as the destination. This realization led us to curate a fleet and a service philosophy that transcends the ordinary.",
      "Today, AUXEMPI stands as the premier choice for executives, global leaders, and private individuals who demand a bespoke travel experience defined by meticulous planning and executive care."
    ],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop"
  },
  fleet: [
    {
      type: "Luxury Sedans",
      description: "Quiet elegance for executive travel and intimate city transfers. Our sedans offer the perfect balance of performance and prestige.",
      image: fleetSedan,
      features: ["Advanced Acoustic Insulation", "Premium Leather Interiors", "Executive Climate Control"],
      highlight: "Pure Refinement",
      specs: "1-3 Passengers"
    },
    {
      type: "Luxury SUVs",
      description: "Commanding presence and generous space for group travel or extra luggage. Uncompromised luxury across any terrain.",
      image: fleetSuv,
      features: ["All-Terrain Capability", "Panoramic Views", "Unmatched Comfort"],
      highlight: "Absolute Presence",
      specs: "1-6 Passengers"
    }
  ],
  values: [
    {
      title: "Exclusivity",
      text: "Every journey is a unique masterpiece, tailored precisely to your preferences and schedule.",
      icon: Crown
    },
    {
      title: "Integrity",
      text: "Transparent, honest, and professional service at every touchpoint of your experience.",
      icon: UserCheck
    },
    {
      title: "Innovation",
      text: "Leveraging the latest in automotive technology and logistics to ensure seamless travel.",
      icon: Zap
    }
  ],
  whyChoose: [
    {
      title: "Elite Chauffeurs",
      description: "Beyond driving, our chauffeurs are masters of hospitality, local navigation, and high-stakes logistics.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop"
    },
    {
      title: "Bespoke Comfort",
      description: "In-vehicle amenities curated to your specific requirements, from preferred refreshments to ambient settings.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  stats: [
    { value: "8", label: "Years of Service", suffix: "+" },
    { value: "15", label: "Rides Completed", suffix: "K+" },
    { value: "25", label: "Global Regions", suffix: "+" },
    { value: "99", label: "Client Satisfaction", suffix: ".9%" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
  ]
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero Section (Refined) */}
      <section ref={heroRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-background">
        <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <img 
            src={sections.hero.image} 
            className="w-full h-full object-cover brightness-[0.35]" 
            alt="AUXEMPI Luxury Fleet" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
        </motion.div>
        
        <div className="container-luxury relative z-10 pt-20">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-px bg-primary mb-12 mx-auto"
            />
            <span className="text-primary text-xs md:text-sm uppercase tracking-[0.8em] font-bold mb-8 block">
              {sections.hero.tagline}
            </span>
            <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] font-bold text-white mb-12 leading-[0.8] tracking-tighter">
              BEYOND <br /> <span className="text-gradient-gold italic">LUXURY</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.6em] text-white font-medium">Elevate Your Journey</span>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-24 bg-gradient-to-b from-primary via-primary/50 to-transparent" 
          />
        </div>
      </section>

      {/* 2. Brand Story Section (Editorial) */}
      <section className="bg-background py-40 md:py-64 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        <div className="absolute -top-48 -right-48 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-px bg-primary/40" />
                  <span className="text-primary text-xs uppercase tracking-[0.6em] font-bold">
                    The Heritage
                  </span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-16 leading-[1.1] tracking-tight">
                  {sections.story.title}
                </h2>
                <div className="space-y-10">
                  {sections.story.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                
                <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-10">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden ring-1 ring-primary/20 shadow-xl">
                        <img src={`https://i.pravatar.cc/150?u=aux-v2-${i}`} alt="Client" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-primary mb-2 gap-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-bold italic">Unwavering trust from the world's elite</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="relative group p-4">
                <div className="absolute -inset-4 border border-primary/20 translate-x-12 translate-y-12 transition-transform duration-1000 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="absolute inset-0 bg-charcoal/5 -translate-x-8 -translate-y-8 transition-transform duration-1000 group-hover:-translate-x-4 group-hover:-translate-y-4" />
                
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] bg-charcoal">
                  <img 
                    src={sections.story.image} 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105" 
                    alt="AUXEMPI Executive Experience" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />
                  
                  <div className="absolute bottom-12 left-12 right-12 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                    <div className="w-12 h-px bg-primary mb-6" />
                    <p className="text-[10px] uppercase tracking-[0.5em] mb-4 text-primary font-bold">The Vision</p>
                    <p className="font-display text-4xl font-bold leading-tight tracking-tight">Redefining <br /> Modern Mobility</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Luxury Fleet Representation (The AUXEMPI Collection) */}
      <section className="bg-charcoal py-40 md:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-32">
            <FadeInSection>
              <div className="inline-flex items-center gap-6 mb-8">
                <div className="w-12 h-px bg-primary/30" />
                <span className="text-primary text-xs uppercase tracking-[0.6em] font-bold">The AUXEMPI Collection</span>
                <div className="w-12 h-px bg-primary/30" />
              </div>
              <h2 className="font-display text-6xl md:text-9xl font-bold text-white mb-12 tracking-tighter">Our Fleet</h2>
              <p className="text-white/40 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic">
                "An uncompromising selection of world-class vehicles, meticulously maintained to provide a sanctuary of calm in a chaotic world."
              </p>
            </FadeInSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
            {sections.fleet.map((item, idx) => (
              <FadeInSection key={item.type} delay={idx * 0.2}>
                <div className="group relative">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-16 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]">
                    <img 
                      src={item.image} 
                      alt={item.type} 
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent group-hover:via-transparent transition-all duration-1000" />
                    
                    <div className="absolute top-10 right-10">
                      <div className="bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                        <span className="text-[11px] uppercase tracking-[0.4em] text-white font-bold">{item.highlight}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-10 left-10">
                      <div className="flex items-center gap-4 text-white/60">
                        <UserCheck size={16} className="text-primary" />
                        <span className="text-xs uppercase tracking-[0.3em] font-medium">{item.specs}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative px-2">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                      <div className="max-w-xl">
                        <h3 className="font-display text-5xl md:text-6xl font-bold text-white mb-8 group-hover:text-primary transition-colors duration-700 tracking-tight">
                          {item.type}
                        </h3>
                        <p className="text-white/40 text-xl font-light mb-12 leading-relaxed italic border-l-2 border-primary/20 pl-8">
                          {item.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                          {item.features.map(f => (
                            <div key={f} className="flex items-center gap-4 group/item">
                              <div className="w-6 h-px bg-primary/40 group-hover/item:w-10 transition-all duration-500" />
                              <span className="text-[12px] uppercase tracking-[0.2em] text-white/60 font-medium group-hover/item:text-white transition-colors">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-start md:justify-end">
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 45 }}
                          whileTap={{ scale: 0.9 }}
                          className="h-24 w-24 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:border-primary hover:text-primary transition-all duration-700 bg-white/[0.02] backdrop-blur-sm"
                        >
                          <ArrowUpRight size={40} strokeWidth={1} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision & Values (Refined) */}
      <section className="bg-background py-40 md:py-64 relative">
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-3 gap-24 lg:gap-32">
            <div className="lg:col-span-1">
              <FadeInSection>
                <span className="text-primary text-xs uppercase tracking-[0.6em] font-bold block mb-10">Our DNA</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-12 leading-[1.1] tracking-tight">Values that <br /> Drive Us</h2>
                <p className="text-muted-foreground text-xl font-light leading-relaxed mb-16">
                  In a world of fast-paced transit, we prioritize the value of time, the luxury of space, and the peace of mind that comes with absolute reliability.
                </p>
                <div className="w-32 h-px bg-primary/60" />
              </FadeInSection>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-16 gap-y-24">
              {sections.values.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="group">
                    <div className="w-20 h-20 rounded-sm bg-charcoal/5 border border-border/40 flex items-center justify-center mb-10 group-hover:border-primary/60 group-hover:bg-primary/[0.02] transition-all duration-700 relative">
                      <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-sm" />
                      <value.icon className="text-primary/50 group-hover:text-primary transition-colors relative z-10" size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-foreground mb-6 tracking-tight">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-xl">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="group">
                  <div className="w-20 h-20 rounded-sm bg-charcoal/5 border border-border/40 flex items-center justify-center mb-10 group-hover:border-primary/60 group-hover:bg-primary/[0.02] transition-all duration-700 relative">
                    <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-sm" />
                    <Shield className="text-primary/50 group-hover:text-primary transition-colors relative z-10" size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-6 tracking-tight">Safety Protocol</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-xl">Every journey is backed by our multi-layer safety framework, including advanced vehicle telematics and regular health assessments.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUXEMPI (Premium Visuals) */}
      <section className="bg-charcoal py-40 md:py-64 relative overflow-hidden">
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            {sections.whyChoose.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/11] rounded-sm mb-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-1000" />
                    
                    <div className="absolute top-12 left-12">
                      <div className="bg-white/10 backdrop-blur-2xl px-8 py-4 rounded-sm border border-white/20 shadow-2xl">
                        <span className="text-[11px] uppercase tracking-[0.6em] text-white font-bold">
                          DIFFERENTIATOR / 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-5xl font-bold text-white mb-8 group-hover:text-primary transition-colors duration-700 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-2xl font-light leading-relaxed max-w-2xl italic border-l-2 border-white/5 pl-10">
                    "{item.description}"
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <div className="mt-40 grid md:grid-cols-3 gap-24 border-t border-white/5 pt-40">
            {[
              { icon: MapPin, title: "Strategic Network", text: "Present in every major business hub, ensuring consistency of service across continents." },
              { icon: Clock, title: "The 15-Minute Rule", text: "Chauffeurs arrive at least 15 minutes early, standing by in a secure, pre-vetted location." },
              { icon: Shield, title: "Stealth Luxury", text: "Our vehicles are unbranded for maximum discretion, moving through the city with silent authority." }
            ].map((feature, idx) => (
              <FadeInSection key={feature.title} delay={idx * 0.1}>
                <div className="flex flex-col gap-10 group">
                  <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:border-primary transition-all duration-700 bg-white/[0.01]">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500">{feature.title}</h4>
                    <p className="text-white/30 text-lg font-light leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience & Trust (Redesigned Counters) */}
      <section className="bg-background py-40 md:py-64 relative overflow-hidden border-b border-border/40">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
            {sections.stats.map((stat, idx) => (
              <FadeInSection key={stat.label} delay={idx * 0.1}>
                <div className="text-center group relative">
                  <div className="font-display text-7xl md:text-[9rem] font-bold text-foreground mb-10 tabular-nums relative inline-block tracking-tighter">
                    <span className="text-gradient-gold drop-shadow-2xl">{stat.value}</span>
                    <span className="text-3xl md:text-5xl text-primary align-top mt-6 inline-block ml-2 opacity-50 font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground uppercase tracking-[0.8em] text-[11px] font-bold group-hover:text-primary transition-colors duration-700">
                    {stat.label}
                  </div>
                  <div className="mt-8 w-12 h-px bg-primary/20 mx-auto group-hover:w-24 transition-all duration-700" />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Lifestyle Gallery (Cinema Mode) */}
      <section className="bg-background py-40 md:py-80 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-display font-bold text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none tracking-tighter">
          PRESTIGE
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-16 mb-40">
            <div className="max-w-4xl">
              <FadeInSection>
                <span className="text-primary text-xs uppercase tracking-[0.8em] font-bold block mb-10 italic">Visual Portfolio</span>
                <h2 className="font-display text-6xl md:text-[11rem] font-bold text-foreground leading-[0.75] tracking-tighter">
                  Aura of <br /> <span className="text-gradient-gold italic">Arrival</span>
                </h2>
              </FadeInSection>
            </div>
            <div className="flex items-center gap-10 mb-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-bold">The AUXEMPI Standard</span>
              <div className="w-32 h-px bg-primary/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {sections.gallery.map((img, idx) => (
              <FadeInSection key={idx} delay={idx * 0.15}>
                <div className={`relative overflow-hidden group h-full ${
                  idx % 2 === 1 ? 'lg:translate-y-32' : 'lg:-translate-y-12'
                }`}>
                  <div className="aspect-[3/4] overflow-hidden bg-charcoal rounded-sm shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover grayscale-[0.4] transition-all duration-[2s] ease-out group-hover:scale-110 group-hover:grayscale-0" 
                      alt={`AUXEMPI Gallery ${idx + 1}`} 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col items-center justify-center p-12 text-center backdrop-blur-[4px]">
                      <motion.div 
                        initial={false}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white mb-10 transition-colors group-hover:border-primary/50"
                      >
                        <ArrowUpRight size={32} strokeWidth={1} />
                      </motion.div>
                      <p className="text-white text-[12px] uppercase tracking-[0.6em] font-bold border-b border-primary/40 pb-4">Cinematic Luxury</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default AboutPage;
