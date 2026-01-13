import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Shield,
  Award,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Wifi,
  Snowflake,
  ChevronRight,
  UserCheck,
  Crown,
  Zap,
  Globe,
  Quote,
  Star
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { LazyImage } from "@/components/common";

const images = {
  hero: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop", // Professional chauffeur/car exterior
  story: "https://plus.unsplash.com/premium_photo-1661281350976-59b9514e5364?q=80&w=2069&auto=format&fit=crop", // High-end meeting/interior
  fleet: {
    sedan: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2072&auto=format&fit=crop", // Elegant sedan shot
    suv: "https://images.unsplash.com/photo-1606148695344-b6ed50bb3f5d?q=80&w=2070&auto=format&fit=crop" // Large SUV
  },
  whyChoose: {
    chauffeur: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2069&auto=format&fit=crop", // Professional driver
    amenities: "https://images.unsplash.com/photo-1632731557053-96b678cdb8b3?q=80&w=2070&auto=format&fit=crop" // Luxury car interior detail
  },
  gallery: [
    "https://images.unsplash.com/photo-1506015507548-c89324aca43c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570733577533-33bc0255375c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
  ]
};

const sections = {
  hero: {
    title: "About AUXEMPI",
    tagline: "The Pinnacle of Private Luxury",
    subtitle: "Redefining the art of elite transportation through precision, discretion, and an unwavering commitment to excellence.",
    image: images.hero
  },
  story: {
    title: "Our Legacy of Excellence",
    content: [
      "AUXEMPI was founded on a singular premise: that luxury transportation should be an extension of one's lifestyle—seamless, sophisticated, and absolutely reliable.",
      "We recognized that for our discerning clientele, the journey is as significant as the destination. This realization led us to curate a fleet and a service philosophy that transcends the ordinary.",
      "Today, AUXEMPI stands as the premier choice for executives, global leaders, and private individuals who demand a bespoke travel experience defined by meticulous planning and executive care."
    ],
    image: images.story
  },
  fleet: [
    {
      type: "Executive Sedans",
      description: "Sophisticated elegance for executive travel and intimate city transfers.",
      image: images.fleet.sedan,
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
      image: images.fleet.suv,
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
      image: images.whyChoose.chauffeur
    },
    {
      title: "Bespoke Comfort",
      description: "In-vehicle amenities curated to your specific requirements and tastes.",
      image: images.whyChoose.amenities
    }
  ],
  stats: [
    { value: "8", label: "Years of Service", suffix: "+" },
    { value: "15", label: "Rides Completed", suffix: "K+" },
    { value: "25", label: "Global Regions", suffix: "+" },
    { value: "99", label: "Client Satisfaction", suffix: ".9%" }
  ],
  gallery: images.gallery
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MainLayout>
      <Navbar />

      {/* 1. Hero Section (Refined) */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <LazyImage
            src={sections.hero.image}
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Luxury Sedan Exterior"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </motion.div>

        <div className="container-luxury relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-primary" />
              <span className="text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-bold">
                {sections.hero.tagline}
              </span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
              About <br /> <span className="text-gradient-gold">AUXEMPI</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl border-l-2 border-primary/40 pl-8 md:pl-10">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 2. Brand Story Section (Editorial) */}
      <section className="bg-background py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/5 pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <FadeInSection>
              <div className="relative">
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-8 block">
                  Heritage & Vision
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-none">
                  {sections.story.title}
                </h2>
                <div className="space-y-6">
                  {sections.story.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground text-lg font-light leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-12 pt-12 border-t border-border/40 flex items-center gap-8">
                  <div className="flex flex-col">
                    <div className="flex text-primary mb-2">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">TRUSTED BY 5,000+ EXECUTIVES</p>
                  </div>
                  <div className="h-10 w-px bg-border/40" />
                  <div className="text-muted-foreground text-sm font-light italic">
                    "Unrivaled precision."
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2} className="relative">
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm group shadow-2xl">
                <LazyImage
                  src={sections.story.image}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="AUXEMPI Interior"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <Quote size={40} className="text-primary mb-4 opacity-80" />
                  <p className="text-xl md:text-2xl font-display leading-tight mb-4">
                    "Luxury is the absence of worry. It is the freedom of time and the comfort of silence."
                  </p>
                  <p className="text-sm uppercase tracking-widest text-primary font-bold">The AUXEMPI Promise</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 md:top-8 md:-right-8 w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-[spin_10s_linear_infinite]">
                <div className="text-center">
                  <span className="block text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-primary">Est.</span>
                  <span className="block text-xl md:text-2xl font-bold font-display text-foreground">2018</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Luxury Fleet Representation */}
      <section className="bg-charcoal py-24 md:py-40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-luxury">
          <div className="text-center mb-20">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">The AUXEMPI Collection</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Luxury Fleet</h2>
            <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Curated for performance, comfort, and ultimate discretion.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {sections.fleet.map((item, idx) => (
              <FadeInSection key={item.type} delay={idx * 0.2}>
                <div className="group relative bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 rounded-sm overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-white/5">
                    <LazyImage
                      src={item.image}
                      alt={item.type}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] uppercase font-bold tracking-widest rounded-sm">
                        {idx === 0 ? "Flagship Choice" : "Group Executive"}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 z-10">
                      <h3 className="font-display text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                        {item.type}
                      </h3>
                      <div className="h-0.5 w-12 bg-primary group-hover:w-24 transition-all duration-500" />
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <p className="text-white/60 text-base font-light mb-8 leading-relaxed">{item.description}</p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8">
                      {item.specs.map((spec, sidx) => (
                        <div key={sidx} className="flex items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors">
                          <spec.icon size={16} className="text-primary shrink-0" />
                          <span className="text-xs uppercase tracking-wider font-medium">{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                      {item.features.map(f => (
                        <span key={f} className="px-3 py-1 bg-white/[0.05] rounded-full text-[9px] uppercase tracking-wider text-white/40">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="/fleet" className="inline-flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold group hover:text-primary transition-colors">
              View Complete Fleet <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>


      {/* 4. Mission, Vision & Values (Clean Grid) */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Our Core</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.1]">Mission, <br />Vision & <br /><span className="text-gradient-gold">Values</span></h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
                  To be the world's most seamless and sophisticated private transportation partner, setting the benchmark for elite mobility.
                </p>
                <div className="flex items-center gap-6 p-6 bg-charcoal/5 rounded-sm border-l-2 border-primary">
                  <div className="text-4xl font-display font-bold text-primary">5k+</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Successful<br />Journeys</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              {sections.values.map((value, idx) => (
                <FadeInSection key={value.title} delay={idx * 0.1}>
                  <div className="group p-8 md:p-10 bg-background border border-border/60 hover:border-primary/30 transition-all duration-300 rounded-lg shadow-sm hover:shadow-lg h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-700" />
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black text-primary transition-all duration-500">
                      <value.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed font-light">{value.text}</p>
                  </div>
                </FadeInSection>
              ))}
              <FadeInSection delay={0.3}>
                <div className="group p-8 md:p-10 bg-[#0A0A0A] text-white transition-all duration-300 rounded-lg h-full relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center mb-8">
                      <Shield className="text-white" size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">Safety First</h3>
                    <p className="text-white/60 text-base leading-relaxed font-light">Rigorous vetting and advanced safety protocols for absolute peace of mind.</p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
                    <Award size={14} /> Certified Secure
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose AUXEMPI (Premium Parallax) */}
      <section className="bg-charcoal py-32 relative overflow-hidden">
        <div className="container-luxury relative z-10">
          <div className="text-center mb-24">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Distinction</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">Why Choose <span className="text-gradient-gold">AUXEMPI</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {sections.whyChoose.map((item, idx) => (
              <FadeInSection key={item.title} delay={idx * 0.2}>
                <div className="group relative overflow-hidden rounded-lg aspect-[16/10] md:aspect-[16/9]">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/20 transition-all duration-500" />

                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3 md:mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Feature 0{idx + 1}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                    <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-md translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-20 md:mt-32 grid md:grid-cols-3 gap-8 border-t border-white/10 pt-16 md:pt-24">
            {[
              { icon: Globe, title: "Global Network", text: "Elite service available in 25+ major luxury hubs worldwide, from London to Dubai." },
              { icon: Clock, title: "Precision Timing", text: "Our 15-minute early arrival policy ensures you are never kept waiting." },
              { icon: Shield, title: "Full Privacy", text: "Strict non-disclosure agreements and tinted privacy glass for absolute discretion." }
            ].map((feature, idx) => (
              <FadeInSection key={feature.title} delay={idx * 0.1}>
                <div className="group hover:bg-white/5 p-6 rounded-lg transition-colors border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={22} />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{feature.text}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience & Trust (Counters) */}
      <section className="bg-background py-24 md:py-32 border-y border-border/40">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {sections.stats.map((stat, idx) => (
              <FadeInSection key={stat.label} delay={idx * 0.1}>
                <div className="text-center group cursor-default">
                  <div className="font-display text-5xl md:text-7xl font-bold text-foreground mb-2 flex items-start justify-center">
                    <span className="group-hover:text-primary transition-colors duration-500">{stat.value}</span>
                    <span className="text-xl md:text-3xl text-primary mt-1 opacity-60">{stat.suffix}</span>
                  </div>
                  <div className="w-8 h-0.5 bg-border mx-auto mb-4 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                  <div className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">
                    {stat.label}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Visual Lifestyle Gallery (Staggered) */}
      <section className="bg-background py-24 md:py-40 overflow-hidden relative">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 md:mb-28">
            <div className="max-w-2xl">
              <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Visual Storytelling</span>
              <h2 className="font-display text-4xl md:text-7xl font-bold text-foreground leading-[0.9]">
                Capturing <br /> <span className="text-gradient-gold">The Essence</span>
              </h2>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                "Luxury is not a destination, but a way of traveling."
              </p>
              <div className="w-24 h-px bg-primary/30 md:ml-auto" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {sections.gallery.map((img, idx) => (
              <FadeInSection key={idx} delay={idx * 0.15} className={idx % 2 === 1 ? 'md:translate-y-12' : ''}>
                <div className="relative overflow-hidden group rounded-sm aspect-[3/4]">
                  <LazyImage
                    src={img}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    alt={`Gallery ${idx + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-primary text-[9px] uppercase tracking-[0.3em] font-bold translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Lifestyle
                    </span>
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
