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
  Users,
  Briefcase,
  Wifi,
  Snowflake
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";

// Asset Imports
import heroSedan from "@/assets/hero-sedan.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const sections = {
    hero: {
    title: "About AUXEMPI",
    tagline: "The Pinnacle of Private Luxury",
    subtitle: "Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
  },
    story: {
    title: "Our Legacy of Excellence",
    content: [
      "AUXEMPI was founded on a singular premise: that luxury transportation should be an extension of one's lifestyle—seamless, sophisticated, and absolutely reliable.",
      "We recognized that for our discerning clientele, the journey is as significant as the destination. This realization led us to curate a fleet and a service philosophy that transcends the ordinary.",
      "Today, AUXEMPI stands as the premier choice for executives, global leaders, and private individuals who demand a bespoke travel experience defined by meticulous planning and executive care."
    ],
      image: "https://images.unsplash.com/photo-1600706432502-77a0e2e3277c?q=80&w=2070&auto=format&fit=crop"
  },
  fleet: [
    {
      type: "Executive Sedans",
      description: "Sophisticated elegance for executive travel and intimate city transfers.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
      specs: [
        { icon: Users, label: "Up to 3 guests" },
        { icon: Briefcase, label: "2 luggage" },
        { icon: Wifi, label: "Complimentary WiFi" },
        { icon: Snowflake, label: "Climate Control" },
      ],
      features: ["Advanced Acoustic Insulation", "Premium Leather Interiors", "Executive Climate Control"]
    },
    {
      type: "Luxury SUVs",
      description: "Commanding presence and generous space for group travel or extra luggage.",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
      specs: [
        { icon: Users, label: "Up to 6 guests" },
        { icon: Briefcase, label: "4 luggage" },
        { icon: Wifi, label: "Complimentary WiFi" },
        { icon: Snowflake, label: "Dual-zone Climate" },
      ],
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
      image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Bespoke Comfort",
      description: "In-vehicle amenities curated to your specific requirements and tastes.",
      image: "https://images.unsplash.com/photo-1620067644342-9989a664e434?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  stats: [
    { value: "8", label: "Years of Service", suffix: "+" },
    { value: "15", label: "Rides Completed", suffix: "K+" },
    { value: "25", label: "Global Regions", suffix: "+" },
    { value: "99", label: "Client Satisfaction", suffix: ".9%" }
  ],
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop"
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
        <section className="bg-charcoal py-32 md:py-48 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="container-luxury">
            <div className="text-center mb-24">
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">The AUXEMPI Collection</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">Luxury Fleet</h2>
              <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
                Curated for performance, comfort, and ultimate discretion.
              </p>
            </div>
  
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {sections.fleet.map((item, idx) => (
                <FadeInSection key={item.type} delay={idx * 0.2}>
                  <div className="group relative">
                    <div className="aspect-[16/10] overflow-hidden rounded-sm mb-12 relative">
                      <img 
                        src={item.image} 
                        alt={item.type} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-primary/90 backdrop-blur-md text-black text-[10px] uppercase font-bold tracking-widest">
                          {idx === 0 ? "Flagship Choice" : "Group Executive"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-10">
                      <div>
                        <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 flex items-center gap-4">
                          {item.type}
                          <div className="h-px flex-1 bg-white/10" />
                        </h3>
                        <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">{item.description}</p>
                        
                        <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                          {item.specs.map((spec, sidx) => (
                            <div key={sidx} className="flex items-center gap-4 text-white/40 group-hover:text-white/70 transition-colors">
                              <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center">
                                <spec.icon size={18} className="text-primary" />
                              </div>
                              <span className="text-sm uppercase tracking-wider">{spec.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {item.features.map(f => (
                            <span key={f} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="inline-flex items-center gap-6 text-primary group/btn">
                        <span className="text-xs uppercase tracking-[0.4em] font-bold group-hover/btn:translate-x-2 transition-transform duration-500">Discover Details</span>
                        <div className="h-12 w-12 rounded-full border border-primary/30 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-black transition-all duration-500">
                          <ChevronRight size={20} />
                        </div>
                      </button>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>


      {/* 4. Mission, Vision & Values (Clean Grid) */}
      <section className="bg-background py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-3 gap-20 lg:gap-32">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-8">Our Core</span>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-10 leading-tight">Mission, <br />Vision & <br /><span className="text-gradient-gold">Values</span></h2>
                <p className="text-muted-foreground text-xl font-light leading-relaxed mb-12">
                  To be the world's most seamless and sophisticated private transportation partner, setting the benchmark for elite mobility.
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">Since 2018</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-10">
              {sections.values.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="group p-10 bg-charcoal/5 hover:bg-charcoal/10 transition-all duration-500 rounded-sm border border-transparent hover:border-primary/20 relative h-full">
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                    <div className="w-16 h-16 rounded-sm bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                      <value.icon className="text-primary" size={32} />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-foreground mb-6">{value.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed font-light">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="group p-10 bg-primary/5 hover:bg-primary/10 transition-all duration-500 rounded-sm border border-primary/10 relative h-full overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <Shield size={200} />
                  </div>
                  <div className="w-16 h-16 rounded-sm bg-primary/20 flex items-center justify-center mb-10">
                    <Shield className="text-primary" size={32} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-6">Safety First</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">Rigorous vetting and advanced safety protocols for absolute peace of mind.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUXEMPI (Premium Grid) */}
      <section className="bg-charcoal py-32 md:py-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-luxury relative z-10">
          <div className="text-center mb-24">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Distinction</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8">Why Choose <span className="text-gradient-gold">AUXEMPI</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {sections.whyChoose.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group relative overflow-hidden rounded-sm">
                  <div className="relative aspect-[16/9] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                  </div>
                  
                  <div className="absolute inset-0 p-10 lg:p-16 flex flex-col justify-end">
                    <div className="overflow-hidden mb-4">
                      <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold block translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        Excellence 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700 delay-100">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black/40 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                </div>
              </FadeInSection>
            ))}
          </div>
          
          <div className="mt-32 grid md:grid-cols-3 gap-12 lg:gap-20 border-t border-white/10 pt-32">
            {[
              { icon: MapPin, title: "Global Network", text: "Elite service available in 25+ major luxury hubs worldwide, from London to Dubai." },
              { icon: Clock, title: "Precision Timing", text: "Our 15-minute early arrival policy ensures you are never kept waiting." },
              { icon: Shield, title: "Full Privacy", text: "Strict non-disclosure agreements and tinted privacy glass for absolute discretion." }
            ].map((feature, idx) => (
              <FadeInSection key={feature.title} delay={idx * 0.1}>
                <div className="group">
                  <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                    <feature.icon size={24} />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{feature.title}</h4>
                  <p className="text-white/40 text-lg font-light leading-relaxed">{feature.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
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
      <section className="bg-background py-32 md:py-48 overflow-hidden relative">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-8">Visual Storytelling</span>
              <h2 className="font-display text-5xl md:text-8xl font-bold text-foreground leading-[0.9]">
                Capturing <br /> <span className="text-gradient-gold">The Essence</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 italic">
                "Luxury is not a destination, but a way of traveling. We capture the moments that define your journey."
              </p>
              <div className="w-24 h-px bg-primary/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {sections.gallery.map((img, idx) => (
              <FadeInSection key={idx} delay={idx * 0.15}>
                <div className={`relative overflow-hidden group h-full ${
                  idx % 2 === 1 ? 'lg:translate-y-24' : ''
                }`}>
                    <div className="aspect-[3/4] overflow-hidden bg-charcoal relative">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                        alt={`Gallery ${idx + 1}`} 
                        loading="lazy"
                      />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white mb-6 translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                        <Crown size={24} className="text-primary" />
                      </div>
                      <p className="text-white text-[10px] uppercase tracking-[0.4em] font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">AUXEMPI Lifestyle</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] uppercase tracking-widest font-medium">Capture 0{idx + 1}</span>
                    <div className="h-px w-12 bg-primary/40" />
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default AboutPage;
