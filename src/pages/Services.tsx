import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  Wifi, 
  Snowflake, 
  ChevronRight, 
  Star, 
  Crown, 
  Shield, 
  Clock, 
  Plane, 
  Building2, 
  Route,
  ArrowRight,
  BatteryCharging,
  Wine,
  Thermometer,
  Check
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Asset Imports
import heroSedan from "@/assets/hero-sedan.jpg";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

const sections = {
  hero: {
    title: "Our Services",
    tagline: "Luxury Tailored to Every Journey",
    subtitle: "Experience the ultimate in bespoke transportation, where every detail is meticulously curated for your comfort, privacy, and peace of mind.",
    image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop"
  },
  categories: {
    title: "The AUXEMPI Experience",
    description: "We offer more than just a ride; we provide a sanctuary on wheels. Choose between our flagship sedans for executive elegance or our commanding SUVs for group prestige."
  },
  sedan: {
    title: "Luxury Sedan Services",
    subtitle: "Executive Excellence",
    description: "Refined elegance for the discerning professional. Our sedan services are designed for those who value understated luxury and absolute precision.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: BatteryCharging, label: "Device Charging" },
      { icon: Wine, label: "Refreshments" },
      { icon: Thermometer, label: "Climate Control" },
    ],
    tiers: [
      {
        name: "Premium Sedan",
        features: ["Professional chauffeur", "Complimentary water", "Phone charging", "Flight tracking"]
      },
      {
        name: "Luxury Sedan",
        features: ["Elite vetted chauffeur", "Premium refreshments", "Dedicated concierge", "Priority scheduling"],
        highlighted: true
      }
    ]
  },
  suv: {
    title: "Luxury SUV Services",
    subtitle: "Commanding Presence",
    description: "Spacious sophistication for groups or those who simply demand more. Our SUV fleet combines powerful performance with an expansive, luxury interior.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: Shield, label: "Privacy Partition" },
      { icon: Users, label: "Up to 6 Guests" },
      { icon: Briefcase, label: "4-5 Large Bags" },
      { icon: Snowflake, label: "Tri-zone Climate" },
    ],
    tiers: [
      {
        name: "Premium SUV",
        features: ["Up to 5 guests", "Generous luggage", "Airport meet & greet", "WiFi & Charging"]
      },
      {
        name: "Luxury SUV",
        features: ["Up to 6 guests", "Expanded cargo space", "VIP airport handling", "Personalized amenities"],
        highlighted: true
      }
    ]
  },
  comparison: [
    { feature: "Capacity", sedan: "3 Guests", suv: "6 Guests" },
    { feature: "Luggage", sedan: "2 Large", suv: "5 Large" },
    { feature: "WiFi & Tech", sedan: "Included", suv: "Included" },
    { feature: "Privacy", sedan: "High", suv: "Ultimate" },
    { feature: "Best For", sedan: "Solo/Couples", suv: "Groups/Families" },
  ],
  specialPackages: [
    {
      id: "airport",
      icon: Plane,
      title: "Airport Transfers",
      description: "Stress-free arrivals and departures with real-time flight tracking and curbside meet & greet.",
      features: ["Punctuality guaranteed", "Flight monitoring", "Curbside pickup"]
    },
    {
      id: "corporate",
      icon: Building2,
      title: "Executive Travel",
      description: "Dedicated transportation for high-profile meetings, corporate events, and roadshows.",
      features: ["Account management", "Multi-car coordination", "Monthly billing"]
    },
    {
      id: "longdistance",
      icon: Route,
      title: "Intercity & Custom",
      description: "Comfortable long-distance travel with flexible itineraries and luxury-first amenities.",
      features: ["Flexible stops", "Refreshments included", "Fixed rates"]
    }
  ]
};

const FadeInSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ServicesPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-[85vh] flex items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src={sections.hero.image} 
            className="w-full h-full object-cover brightness-[0.35]" 
            alt="Luxury Transportation Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
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
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-2xl border-l border-primary/30 pl-8">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Categories Overview */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="container-luxury text-center">
          <FadeInSection>
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">World-Class Standards</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-8">{sections.categories.title}</h2>
            <p className="text-muted-foreground text-xl font-light max-w-3xl mx-auto leading-relaxed">
              {sections.categories.description}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Luxury Sedan Services */}
      <section className="bg-charcoal py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
                <div className="aspect-[16/10] overflow-hidden rounded-sm relative z-10">
                  <img src={sections.sedan.image} alt="Luxury Sedan" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div>
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 block">{sections.sedan.subtitle}</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">{sections.sedan.title}</h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-10">{sections.sedan.description}</p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {sections.sedan.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/50">
                      <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="text-sm uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {sections.sedan.tiers.map((tier, i) => (
                    <div key={i} className={`p-6 border transition-all duration-500 rounded-sm ${tier.highlighted ? 'border-primary/50 bg-primary/5' : 'border-white/10 bg-white/5'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className={`text-xl font-bold ${tier.highlighted ? 'text-primary' : 'text-white'}`}>{tier.name}</h4>
                        {tier.highlighted && <Crown size={20} className="text-primary" />}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {tier.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
                            <CheckIcon className="w-3 h-3 text-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Luxury SUV Services */}
      <section className="bg-background py-32 relative">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 items-center lg:flex-row-reverse">
            <FadeInSection className="lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/10 -translate-x-4 translate-y-4 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
                <div className="aspect-[16/10] overflow-hidden rounded-sm relative z-10">
                  <img src={sections.suv.image} alt="Luxury SUV" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="lg:order-1">
              <div>
                <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 block">{sections.suv.subtitle}</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">{sections.suv.title}</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">{sections.suv.description}</p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {sections.suv.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-muted-foreground/60">
                      <div className="w-10 h-10 rounded-sm bg-charcoal/5 flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="text-sm uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {sections.suv.tiers.map((tier, i) => (
                    <div key={i} className={`p-6 border transition-all duration-500 rounded-sm ${tier.highlighted ? 'border-primary/50 bg-primary/5' : 'border-charcoal/5 bg-charcoal/5'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className={`text-xl font-bold ${tier.highlighted ? 'text-primary' : 'text-foreground'}`}>{tier.name}</h4>
                        {tier.highlighted && <Crown size={20} className="text-primary" />}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {tier.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2 text-xs text-muted-foreground/60 uppercase tracking-widest">
                            <CheckIcon className="w-3 h-3 text-primary" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Premium vs Luxury Comparison */}
      <section className="bg-charcoal py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Choose Your Level</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">Fleet Comparison</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-8 text-white/40 uppercase tracking-widest text-xs font-bold">Feature</th>
                  <th className="p-8 font-display text-2xl font-bold text-white">Sedan</th>
                  <th className="p-8 font-display text-2xl font-bold text-primary">SUV</th>
                </tr>
              </thead>
              <tbody>
                {sections.comparison.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                    <td className="p-8 text-white/50 text-sm font-medium">{row.feature}</td>
                    <td className="p-8 text-white/80">{row.sedan}</td>
                    <td className="p-8 text-primary/80 font-bold">{row.suv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Special Service Packages */}
      <section className="bg-background py-32 md:py-48 relative">
        <div className="container-luxury">
          <div className="text-center mb-24">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Specialized Travel</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-foreground mb-8">Service Packages</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {sections.specialPackages.map((pkg, idx) => (
              <FadeInSection key={pkg.id} delay={idx * 0.1}>
                <div className="group p-10 bg-charcoal/5 hover:bg-charcoal/10 transition-all duration-500 rounded-sm border border-transparent hover:border-primary/20 relative h-full flex flex-col">
                  <div className="w-16 h-16 rounded-sm bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 text-primary">
                    <pkg.icon size={32} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">{pkg.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light mb-8 flex-grow">{pkg.description}</p>
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-muted-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="luxury-outline" className="w-full group/btn">
                    Details <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call-to-Action Section */}
      <section className="py-24 md:py-32 relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-[0.2]" 
            alt="Luxury Night Drive" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>
        
        <div className="container-luxury relative z-10 text-center">
          <FadeInSection>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-10">Experience True Luxury</h2>
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto mb-16">
              Our chauffeurs are standing by. Book your AUXEMPI journey today and redefine your standard of travel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Button size="xl" className="h-16 px-12 text-lg tracking-widest uppercase bg-primary hover:bg-primary/90 text-black font-bold group" asChild>
                <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Reserve Now
                  <ChevronRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="xl" variant="luxury-outline" className="h-16 px-12 text-lg tracking-widest uppercase border-white/20 text-white hover:border-white hover:bg-white/5" asChild>
                <a href="/contact">
                  Contact Concierge
                </a>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </MainLayout>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default ServicesPage;
