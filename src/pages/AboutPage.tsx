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
  Clock
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";

const sections = {
  hero: {
    title: "About AUXEMPI",
    tagline: "The Pinnacle of Private Luxury",
    subtitle: "Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop"
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
      description: "Quiet elegance for executive travel and intimate city transfers.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
      features: ["Advanced Acoustic Insulation", "Premium Leather Interiors", "Executive Climate Control"]
    },
    {
      type: "Luxury SUVs",
      description: "Commanding presence and generous space for group travel or extra luggage.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      features: ["All-Terrain Capability", "Panoramic Views", "Unmatched Comfort"]
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
      description: "Beyond driving, our chauffeurs are masters of hospitality and local navigation.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop"
    },
    {
      title: "Bespoke Comfort",
      description: "In-vehicle amenities curated to your specific requirements and tastes.",
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
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2036&auto=format&fit=crop"
  ]
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero Section (Refined) */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src={sections.hero.image} 
            className="w-full h-full object-cover brightness-[0.3]" 
            alt="Luxury Sedan Exterior" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-4 text-primary text-sm uppercase tracking-[0.6em] font-semibold mb-8">
              <span className="w-16 h-px bg-primary" />
              {sections.hero.tagline}
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-10 leading-[0.9]">
              About <br /> <span className="text-gradient-gold">AUXEMPI</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl border-l border-primary/30 pl-8">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Brand Story Section (Editorial) */}
      <section className="bg-background py-32 md:py-48 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/5 pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <FadeInSection>
              <div className="relative">
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-8 block">
                  Heritage & Vision
                </span>
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
                <div className="mt-12 flex items-center gap-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-primary mb-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Trusted by 5,000+ Executives</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="relative aspect-[3/4] group">
                <div className="absolute -inset-4 border border-primary/20 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
                <div className="relative h-full overflow-hidden rounded-sm">
                  <img 
                    src={sections.story.image} 
                    className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" 
                    alt="AUXEMPI Interior" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-[0.3em] mb-2">Chauffeur Excellence</p>
                  <p className="font-display text-2xl">Attention to Detail</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Luxury Fleet Representation */}
      <section className="bg-charcoal py-32 md:py-48 overflow-hidden">
        <div className="container-luxury">
          <div className="text-center mb-24">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">The AUXEMPI Collection</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">Luxury Fleet</h2>
            <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
              Curated for performance, comfort, and ultimate discretion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {sections.fleet.map((item, idx) => (
              <FadeInSection key={item.type} delay={idx * 0.2}>
                <div className="group relative">
                  <div className="aspect-[16/9] overflow-hidden rounded-sm mb-10">
                    <img 
                      src={item.image} 
                      alt={item.type} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                      <h3 className="font-display text-4xl font-bold text-white mb-4">{item.type}</h3>
                      <p className="text-white/60 text-lg font-light mb-6 max-w-md">{item.description}</p>
                      <div className="flex flex-wrap gap-4">
                        {item.features.map(f => (
                          <span key={f} className="px-4 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/40">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission, Vision & Values (Clean Grid) */}
      <section className="bg-background py-32 md:py-48">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="lg:col-span-1">
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-8">Our Core</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Mission, Vision & Values</h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
                To be the world's most seamless and sophisticated private transportation partner, setting the benchmark for elite mobility.
              </p>
              <div className="w-20 h-px bg-primary" />
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-12 lg:gap-16">
              {sections.values.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="p-8 border-l border-border/40 hover:border-primary transition-colors group">
                    <value.icon className="text-primary/40 group-hover:text-primary transition-colors mb-6" size={32} />
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="p-8 border-l border-border/40 hover:border-primary transition-colors group">
                  <Shield className="text-primary/40 group-hover:text-primary transition-colors mb-6" size={32} />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Safety First</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">Rigorous vetting and advanced safety protocols for absolute peace of mind.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUXEMPI (Premium Grid) */}
      <section className="bg-charcoal py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {sections.whyChoose.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/10] rounded-sm mb-8">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-8 left-8">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        Luxury Standard 0{idx + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-white/50 text-lg font-light leading-relaxed">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <div className="mt-24 grid md:grid-cols-3 gap-12 border-t border-white/5 pt-24">
            {[
              { icon: MapPin, title: "Global Network", text: "Service available in 25+ major luxury hubs worldwide." },
              { icon: Clock, title: "Precision Timing", text: "Advanced logistics ensure we are always 15 minutes early." },
              { icon: Shield, title: "Full Privacy", text: "Discretion is our hallmark. Your privacy is guaranteed." }
            ].map((feature, idx) => (
              <FadeInSection key={feature.title} delay={idx * 0.1}>
                <div className="flex gap-6">
                  <div className="mt-1">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience & Trust (Counters) */}
      <section className="bg-background py-32 md:py-48 border-y border-border/50">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {sections.stats.map((stat, idx) => (
              <FadeInSection key={stat.label} delay={idx * 0.1}>
                <div className="text-center group">
                  <div className="font-display text-6xl md:text-8xl font-bold text-foreground mb-4 tabular-nums relative inline-block">
                    <span className="text-gradient-gold">{stat.value}</span>
                    <span className="text-2xl md:text-3xl text-primary align-top mt-2 inline-block ml-1 opacity-50">{stat.suffix}</span>
                  </div>
                  <div className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold group-hover:text-primary transition-colors duration-500">
                    {stat.label}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Lifestyle Gallery (Staggered) */}
      <section className="bg-background py-32 md:py-48 overflow-hidden">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="max-w-2xl">
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Visual Storytelling</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Capturing <br /> <span className="text-gradient-gold">The Experience</span>
              </h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-primary/30 mb-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {sections.gallery.map((img, idx) => (
              <FadeInSection key={idx} delay={idx * 0.1}>
                <div className={`relative overflow-hidden rounded-sm cursor-pointer group h-full ${
                  idx % 2 === 1 ? 'lg:mt-16' : ''
                }`}>
                  <div className="aspect-[3/4] overflow-hidden bg-charcoal">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                      alt={`Gallery ${idx + 1}`} 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        <ChevronRight size={20} />
                      </div>
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
