import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Users,
  Briefcase,
  Wifi,
  Snowflake,
  ChevronRight,
  Shield,
  Plane,
  Building2,
  Route,
  BatteryCharging,
  Wine,
  Thermometer,
  CheckCircle2
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/common";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { Link } from "react-router-dom";

// High-quality luxury transport images from Unsplash
const images = {
  hero: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop", // Driver's perspective/Luxury interior
  sedan: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop", // Mercedes S-Class or similar
  suv: "https://images.unsplash.com/photo-1609520505218-7421dad18218?q=80&w=2070&auto=format&fit=crop", // Luxury SUV (Escalade/Range Rover style)
  cta: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" // Abstract luxury car detail
};

const sections = {
  hero: {
    title: "Our Services",
    tagline: "Luxury Tailored to Every Journey",
    subtitle: "Experience the ultimate in bespoke transportation, where every detail is meticulously curated for your comfort, privacy, and peace of mind.",
    image: images.hero
  },
  categories: {
    title: "The AUSEMPI Experience",
    description: "We offer more than just a ride; we provide a sanctuary on wheels. Choose between our flagship sedans for executive elegance or our commanding SUVs for group prestige."
  },
  sedan: {
    id: "luxury-sedan",
    title: "Luxury Sedan Services",
    subtitle: "Executive Excellence",
    description: "Refined elegance for the discerning professional. Our sedan services are designed for those who value understated luxury and absolute precision.",
    image: images.sedan,
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
    id: "luxury-suv",
    title: "Luxury SUV Services",
    subtitle: "Commanding Presence",
    description: "Spacious sophistication for groups or those who simply demand more. Our SUV fleet combines powerful performance with an expansive, luxury interior.",
    image: images.suv,
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
    },
    {
      id: "events",
      icon: Wine,
      title: "Special Events",
      description: "Make a grand entrance at weddings, galas, and VIP parties with our pristine fleet.",
      features: ["Red carpet service", "Decorations available", "Hourly charter"]
    }
  ]
};

const FadeInSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MainLayout>
      <Navbar />

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <LazyImage
            src={sections.hero.image}
            className="w-full h-screen object-cover brightness-[0.4]"
            alt="Luxury Transportation Hero"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </motion.div>

        <div className="container-luxury relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 md:gap-4 mb-8">
              <div className="h-px w-8 md:w-16 bg-primary/60" />
              <span className="text-primary text-xs md:text-sm uppercase tracking-[0.4em] font-semibold text-center">
                {sections.hero.tagline}
              </span>
              <div className="h-px w-8 md:w-16 bg-primary/60" />
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
              Our <span className="text-gradient-gold italic pr-2">Services</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
              {sections.hero.subtitle}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12"
            >
              <div className="flex flex-col items-center gap-2 text-white/40">
                <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Categories Overview */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="container-luxury text-center relative z-10">
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
      <section className="bg-charcoal py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700 rounded-sm" />
                <div className="aspect-[4/3] overflow-hidden rounded-sm relative z-10 shadow-2xl">
                  <LazyImage
                    src={sections.sedan.image}
                    alt="Luxury Sedan"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2} className="order-1 lg:order-2">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-px bg-primary" />
                  <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">{sections.sedan.subtitle}</span>
                </div>

                <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-none">{sections.sedan.title}</h2>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-10">{sections.sedan.description}</p>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
                  {sections.sedan.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70 group">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm uppercase tracking-wider font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary text-black hover:bg-white transition-colors duration-300 min-w-[180px]" asChild>
                    <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                      Book Sedan
                    </a>
                  </Button>
                  <Button size="lg" variant="luxury-outline" className="min-w-[180px]" asChild>
                    <Link to={`/services/${sections.sedan.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. Luxury SUV Services */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection delay={0.2} className="order-1">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-px bg-primary" />
                  <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">{sections.suv.subtitle}</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-none">{sections.suv.title}</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">{sections.suv.description}</p>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
                  {sections.suv.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-muted-foreground group">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm uppercase tracking-wider font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary text-black hover:bg-charcoal hover:text-white transition-colors duration-300 min-w-[180px]" asChild>
                    <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                      Book SUV
                    </a>
                  </Button>
                  <Button size="lg" variant="luxury-outline" className="min-w-[180px]" asChild>
                    <Link to={`/services/${sections.suv.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection className="order-2">
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/10 -translate-x-4 translate-y-4 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-700 rounded-sm" />
                <div className="aspect-[4/3] overflow-hidden rounded-sm relative z-10 shadow-2xl">
                  <LazyImage
                    src={sections.suv.image}
                    alt="Luxury SUV"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Premium vs Luxury Comparison */}
      <section className="bg-[#050505] py-32 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="text-center mb-24">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Choose Your Level</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">Fleet Distinction</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="p-6 md:p-8 text-white/40 uppercase tracking-widest text-xs font-bold w-1/3">Specification</th>
                    <th className="p-6 md:p-8 font-display text-xl md:text-2xl font-bold text-white w-1/3">Sedan Class</th>
                    <th className="p-6 md:p-8 font-display text-xl md:text-2xl font-bold text-primary w-1/3">SUV Class</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.comparison.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors group">
                      <td className="p-6 md:p-8 text-white/60 text-sm font-medium tracking-wide group-hover:text-white transition-colors">{row.feature}</td>
                      <td className="p-6 md:p-8 text-white/90 font-light">{row.sedan}</td>
                      <td className="p-6 md:p-8 text-primary/90 font-medium">{row.suv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Special Service Packages */}
      <section className="bg-background py-32 md:py-48 relative">
        <div className="container-luxury">
          <div className="text-center mb-20 md:mb-28">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold block mb-6">Specialized Travel</span>
            <h2 className="font-display text-4xl md:text-7xl font-bold text-foreground mb-6">Service Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tailored solutions for every occasion, ensuring your journey is as memorable as the destination.</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {sections.specialPackages.map((pkg, idx) => (
              <FadeInSection key={pkg.id} delay={idx * 0.1} className="h-full">
                <div className="group h-full p-8 bg-charcoal/5 hover:bg-charcoal/10 transition-all duration-500 rounded-lg border border-transparent hover:border-primary/20 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <pkg.icon size={80} strokeWidth={1} />
                  </div>

                  <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 text-primary relative z-10 border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/10">
                    <pkg.icon size={28} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors relative z-10">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow relative z-10">{pkg.description}</p>

                  <ul className="space-y-3 relative z-10 mt-auto pt-6 border-t border-dashed border-white/10">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-xs text-muted-foreground/80">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call-to-Action Section */}
      <section className="py-32 relative bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src={images.cta}
            className="w-full h-full object-cover opacity-40"
            alt="Luxury Night Drive"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="container-luxury relative z-10 text-center">
          <FadeInSection>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">True Luxury</span></h2>
            <p className="text-white/70 text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Our chauffeurs are standing by. Book your AUSEMPI journey today and redefine your standard of travel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="xl" className="h-16 px-12 text-lg tracking-widest uppercase bg-primary hover:bg-white hover:text-black font-bold group min-w-[240px] shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300" asChild>
                <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Reserve Now
                  <ChevronRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="xl" variant="luxury-outline" className="h-16 px-12 text-lg tracking-widest uppercase border-white/20 text-white hover:border-white hover:bg-white/5 min-w-[240px]" asChild>
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

export default ServicesPage;
