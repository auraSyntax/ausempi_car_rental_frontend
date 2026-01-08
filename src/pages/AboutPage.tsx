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
import heroSedan from "@/assets/hero-sedan.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const sections = {
  hero: {
    title: "About AUXEMPI",
    tagline: "The Pinnacle of Private Luxury",
    subtitle: "Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.",
    image: heroSedan
  },
  story: {
    title: "Our Legacy of Excellence",
    content: [
      "AUXEMPI was founded on a singular premise: that luxury transportation should be an extension of one's lifestyle—seamless, sophisticated, and absolutely reliable.",
      "We recognized that for our discerning clientele, the journey is as significant as the destination. This realization led us to curate a fleet and a service philosophy that transcends the ordinary.",
      "Today, AUXEMPI stands as the premier choice for executives, global leaders, and private individuals who demand a bespoke travel experience defined by meticulous planning and executive care."
    ],
    image: "https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=1974&auto=format&fit=crop"
  },
  fleet: [
    {
      type: "Luxury Sedans",
      description: "Quiet elegance for executive travel and intimate city transfers. Our sedans offer the perfect balance of performance and prestige.",
      image: fleetSedan,
      features: ["Advanced Acoustic Insulation", "Premium Leather Interiors", "Executive Climate Control"],
      highlight: "Pure Refinement"
    },
    {
      type: "Luxury SUVs",
      description: "Commanding presence and generous space for group travel or extra luggage. Uncompromised luxury across any terrain.",
      image: fleetSuv,
      features: ["All-Terrain Capability", "Panoramic Views", "Unmatched Comfort"],
      highlight: "Absolute Presence"
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
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop", // Modern luxury car
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop", // Detail
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop", // Sedan side
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"  // SUV
  ]
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero Section (Refined) */}
      <section ref={heroRef} className="relative h-[90vh] md:h-screen flex items-center overflow-hidden bg-background">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src={sections.hero.image} 
            className="w-full h-full object-cover brightness-[0.4] scale-105" 
            alt="AUXEMPI Luxury Fleet" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
        </motion.div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-primary mb-8"
            />
            <span className="text-primary text-xs md:text-sm uppercase tracking-[0.6em] font-semibold mb-6 block">
              {sections.hero.tagline}
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-10 leading-[0.85] tracking-tight">
              The Essence of <br /> <span className="text-gradient-gold italic">AUXEMPI</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl border-l border-primary/20 pl-8 ml-1">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.5em] text-white">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-primary to-transparent" 
          />
        </div>
      </section>

      {/* 2. Brand Story Section (Editorial) */}
      <section className="bg-background py-32 md:py-48 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold">
                    Heritage & Vision
                  </span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-12 leading-tight">
                  {sections.story.title}
                </h2>
                <div className="space-y-8">
                  {sections.story.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-16 flex items-center gap-8 p-6 border border-border/40 rounded-sm bg-charcoal/5 backdrop-blur-sm max-w-fit">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden ring-1 ring-primary/20">
                        <img src={`https://i.pravatar.cc/100?u=aux${i}`} alt="Client" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Excellence Trusted by Global Leaders</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="relative group">
                {/* Decorative frames */}
                <div className="absolute -inset-6 border border-primary/10 translate-x-12 translate-y-12 transition-transform duration-1000 group-hover:translate-x-8 group-hover:translate-y-8" />
                <div className="absolute inset-0 bg-primary/10 -translate-x-6 -translate-y-6 transition-transform duration-1000 group-hover:-translate-x-4 group-hover:-translate-y-4" />
                
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                  <img 
                    src={sections.story.image} 
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    alt="AUXEMPI Executive Experience" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                    <span className="inline-block w-8 h-px bg-primary mb-4" />
                    <p className="text-[10px] uppercase tracking-[0.4em] mb-2 text-primary">Master Chauffeurs</p>
                    <p className="font-display text-3xl font-bold leading-tight">Meticulous <br /> Attention to Detail</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Luxury Fleet Representation (The AUXEMPI Collection) */}
      <section className="bg-charcoal py-32 md:py-56 relative overflow-hidden">
        {/* Subtle light effect */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        
        <div className="container-luxury relative z-10">
          <div className="text-center mb-28">
            <FadeInSection>
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary/50" />
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold">The AUXEMPI Collection</span>
                <div className="w-8 h-px bg-primary/50" />
              </div>
              <h2 className="font-display text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">Luxury Fleet</h2>
              <p className="text-white/40 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Precision-engineered for performance, bespoke comfort, and ultimate discretion.
              </p>
            </FadeInSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {sections.fleet.map((item, idx) => (
              <FadeInSection key={item.type} delay={idx * 0.2}>
                <div className="group relative">
                  {/* Card Background Decoration */}
                  <div className="absolute -inset-4 bg-white/[0.02] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-12 shadow-2xl">
                    <img 
                      src={item.image} 
                      alt={item.type} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-transparent transition-all duration-700" />
                    
                    <div className="absolute top-8 right-8">
                      <div className="bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">{item.highlight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                      <div className="max-w-md">
                        <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500">
                          {item.type}
                        </h3>
                        <p className="text-white/50 text-lg font-light mb-10 leading-relaxed italic">
                          "{item.description}"
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.features.map(f => (
                            <div key={f} className="flex items-center gap-3">
                              <CheckCircle size={14} className="text-primary/60" />
                              <span className="text-[11px] uppercase tracking-widest text-white/70 font-medium">
                                {f}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center justify-end gap-4">
                        <button className="h-16 w-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-primary group-hover:text-primary transition-all duration-500 hover:bg-primary/10">
                          <ArrowUpRight size={28} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision & Values (Clean Grid) */}
      <section className="bg-background py-32 md:py-48 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="lg:col-span-1">
              <FadeInSection>
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-8">Our Core</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">Philosophy & <br /> Commitment</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
                  To be the world's most seamless and sophisticated private transportation partner, setting the benchmark for elite mobility and service excellence.
                </p>
                <div className="w-24 h-px bg-primary" />
              </FadeInSection>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-x-12 gap-y-16">
              {sections.values.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="group">
                    <div className="w-16 h-16 rounded-sm bg-charcoal/5 border border-border/40 flex items-center justify-center mb-8 group-hover:border-primary/40 group-hover:bg-primary/[0.03] transition-all duration-500">
                      <value.icon className="text-primary/60 group-hover:text-primary transition-colors" size={28} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4 tracking-tight">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-lg">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="group">
                  <div className="w-16 h-16 rounded-sm bg-charcoal/5 border border-border/40 flex items-center justify-center mb-8 group-hover:border-primary/40 group-hover:bg-primary/[0.03] transition-all duration-500">
                    <Shield className="text-primary/60 group-hover:text-primary transition-colors" size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 tracking-tight">Safety First</h3>
                  <p className="text-muted-foreground leading-relaxed font-light text-lg">Rigorous chauffeur vetting and advanced safety protocols for absolute peace of mind on every journey.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUXEMPI (Premium Grid) */}
      <section className="bg-charcoal py-32 md:py-56 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {sections.whyChoose.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/10] rounded-sm mb-10 shadow-2xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-700" />
                    
                    <div className="absolute top-10 left-10">
                      <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-sm border border-white/20">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">
                          The AUXEMPI Way / 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                  <p className="text-white/50 text-xl font-light leading-relaxed max-w-xl">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <div className="mt-32 grid md:grid-cols-3 gap-16 border-t border-white/5 pt-32">
            {[
              { icon: MapPin, title: "Global Network", text: "Premier service available in 25+ major luxury hubs and business centers worldwide." },
              { icon: Clock, title: "Precision Timing", text: "Proprietary logistics ensure our chauffeurs are on-site 15 minutes before your scheduled arrival." },
              { icon: Shield, title: "Absolute Privacy", text: "Discretion is our hallmark. Non-disclosure agreements and tinted privacy glass are standard." }
            ].map((feature, idx) => (
              <FadeInSection key={feature.title} delay={idx * 0.1}>
                <div className="flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-white mb-4">{feature.title}</h4>
                    <p className="text-white/40 text-base font-light leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience & Trust (Counters) */}
      <section className="bg-background py-32 md:py-48 relative border-b border-border/40">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {sections.stats.map((stat, idx) => (
              <FadeInSection key={stat.label} delay={idx * 0.1}>
                <div className="text-center group">
                  <div className="font-display text-6xl md:text-8xl font-bold text-foreground mb-6 tabular-nums relative inline-block">
                    <span className="text-gradient-gold drop-shadow-sm">{stat.value}</span>
                    <span className="text-2xl md:text-3xl text-primary align-top mt-3 inline-block ml-1 opacity-60 font-medium">{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold group-hover:text-primary transition-colors duration-500">
                    {stat.label}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Lifestyle Gallery (Staggered) */}
      <section className="bg-background py-32 md:py-56 relative overflow-hidden">
        {/* Background Text Overlay */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-display font-bold text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none">
          LUXURY EXPERIENCE
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-3xl">
              <FadeInSection>
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6 italic">Visual Storytelling</span>
                <h2 className="font-display text-5xl md:text-8xl font-bold text-foreground leading-[0.9] tracking-tighter">
                  Capturing <br /> <span className="text-gradient-gold">The Experience</span>
                </h2>
              </FadeInSection>
            </div>
            <div className="flex items-center gap-6 mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to view</span>
              <div className="w-24 h-px bg-primary/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {sections.gallery.map((img, idx) => (
              <FadeInSection key={idx} delay={idx * 0.15}>
                <div className={`relative overflow-hidden group h-full ${
                  idx % 2 === 1 ? 'lg:translate-y-20' : ''
                }`}>
                  <div className="aspect-[4/5] overflow-hidden bg-charcoal rounded-sm shadow-xl">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                      alt={`AUXEMPI Gallery ${idx + 1}`} 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center text-white mb-6 scale-75 group-hover:scale-100 transition-transform duration-700">
                        <ArrowUpRight size={24} />
                      </div>
                      <p className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Exquisite Detail</p>
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
