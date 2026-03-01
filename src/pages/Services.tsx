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
  Star,
  Clock,
  Lock,
  Laptop
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/common";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { Link } from "react-router-dom";
import heroBgImg from "@/assets/services-hero-bg.avif";

// High-quality luxury transport images from Unsplash
import sedanImg from "@/assets/comparison-sedan.avif";
import suvImg from "@/assets/comparison-suv.avif";

import airPortTransferImg from "@/assets/service-airport-transfers.avif";
import executiveTravelImg from "@/assets/service-executive-travel.avif";
import interCityCustomImg from "@/assets/service-intercity-custom.avif";
import specialEventsImg from "@/assets/service-special-events.avif";

import ctaBgImg from "@/assets/service-cta-bg-1.avif";

// High-quality luxury transport images from Unsplash
const images = {
  sedan: sedanImg,
  suv: suvImg,
  cta: ctaBgImg
};

const sections = {
  sedan: {
    id: "luxury-sedan",
    title: "Sedan Services",
    subtitle: "Executive Excellence",
    description: "Refined elegance for the discerning professional. Our sedan services are designed for those who value understated luxury and absolute precision.",
    image: images.sedan,
    amenities: [
      { icon: Laptop, label: "Work space" },
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
    title: "SUV Services",
    subtitle: "Commanding Presence",
    description: "Spacious sophistication for groups or those who simply demand more. Our SUV fleet combines powerful performance with an expansive, luxury interior.",
    image: images.suv,
    isComingSoon: true,
    amenities: [
      { icon: Shield, label: "Privacy Partition" },
      { icon: Users, label: "Up to 2 Guests" },
      { icon: Briefcase, label: "4-5 Large Bags" },
      { icon: Snowflake, label: "Tri-zone Climate" },
    ],
    tiers: [
      {
        name: "Premium SUV",
        features: ["2 guests", "Generous luggage", "Airport meet & greet", "WiFi & Charging"]
      },
      {
        name: "Luxury SUV",
        features: ["2 guests", "Expanded cargo space", "VIP airport handling", "Personalized amenities"],
        highlighted: true
      }
    ]
  },
  comparison: [
    { feature: "Capacity", sedan: "2 Guests", suv: "2 Guests" },
    { feature: "Luggage", sedan: "2 Large", suv: "5 Large" },
    { feature: "Amenities & Tech", sedan: "Included", suv: "Included" },
    { feature: "Privacy", sedan: "High", suv: "Ultimate" },
    { feature: "Best For", sedan: "Corporate", suv: "Executive" },
  ],
  specialPackages: [
    {
      id: "airport",
      image: airPortTransferImg,
      icon: Plane,
      title: "Airport Transfers",
      description: "Experience the epitome of stress-free travel with our dedicated airport transfer service. We continuously monitor your flight status to ensure your chauffeur is ready the moment you land, offering seamless curbside meet & greet and luggage assistance.",
      features: ["Real-time flight monitoring", "Curbside meet & greet", "Luggage assistance", "60 mins complimentary wait time"]
    },
    {
      id: "corporate",
      image: executiveTravelImg,
      icon: Building2,
      title: "Executive Travel",
      description: "Elevate your business mobility with comprehensive transportation solutions designed for the corporate world. From high-profile roadshows to daily executive commutes, we provide a mobile office environment with privacy and reliability.",
      features: ["Dedicated account management", "Multi-vehicle coordination", "Confidentiality agreements", "Detailed monthly billing"]
    },
    {
      id: "longdistance",
      image: interCityCustomImg,
      icon: Route,
      title: "Intercity & Custom",
      description: "Bypass the airport hassle and travel on your own schedule. Our long-distance service offers door-to-door luxury between cities, allowing you to work or relax in complete comfort with flexible stops and bespoke itineraries.",
      features: ["Door-to-door service", "Flexible itinerary & stops", "Flat-rate pricing", "Premium refreshments included"]
    },
    {
      id: "events",
      image: specialEventsImg,
      icon: Wine,
      title: "Special Events",
      description: "Arrive in style and make a lasting impression. Whether it's a wedding, gala, red carpet event, or a VIP party, our pristine fleet and immaculately attired chauffeurs ensure your entrance is nothing short of spectacular.",
      features: ["Red carpet arrival service", "Vehicle decoration options", "Hourly charter availability", "On-site coordination"]
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
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 h-full">
          <LazyImage
            src={heroBgImg}
            className="w-full h-full object-cover object-center object-top brightness-[0.9] pt-40 lg:pt-0"
            alt="Luxury Transportation Hero"
            containerClassName="h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
        </motion.div>

        <div className="container-luxury relative z-10 text-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center gap-3 md:gap-6 mb-6 md:mb-8">
              <div className="h-px w-8 md:w-16 bg-primary/80" />
              <span className="text-primary/90 text-[11px] md:text-sm uppercase tracking-[0.3em] font-medium text-center">
                Luxury Tailored to Every Journey
              </span>
              <div className="h-px w-8 md:w-16 bg-primary/80" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              Our <span className="text-gradient-gold italic pr-2">Services</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Experience the ultimate in bespoke transportation, where every detail is meticulously curated for your comfort, privacy, and peace of mind.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-10 sm:px-0"
            >
              <Button size="xl" variant="gold-cta" className="min-w-[160px] text-sm h-12 sm:h-14 tracking-widest" asChild>
                <Link to={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Book A Ride
                </Link>
              </Button>
              <Button size="xl" variant="hero-outline" className="min-w-[160px] text-sm h-12 sm:h-14 tracking-widest backdrop-blur-md" asChild>
                <Link to="#luxury-sedan">
                  Explore Fleet
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 pointer-events-none hidden md:flex flex-col items-center gap-3"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Categories Overview */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="container-luxury text-center relative z-10">
          <FadeInSection>
            <span className="text-primary text-xs md:text-sm uppercase tracking-[0.5em] font-bold block mb-6">World-Class Standards</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              The <span className="text-gradient-gold">AUSEMPI</span> Experience
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              We offer more than just a ride; we provide a sanctuary on wheels. Choose between our flagship sedans for executive elegance or our commanding SUVs for group prestige.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Sedan Services */}
      <section id="luxury-sedan" className="bg-charcoal py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image Side */}
            <FadeInSection className="order-1 lg:order-1 relative">
              <div className="relative group">
                <div className="absolute -inset-3 sm:-inset-4 border border-primary/10 translate-x-0 translate-y-0 lg:group-hover:scale-105 transition-transform duration-700 rounded-sm" />
                <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-sm relative z-10 lg:hover:shadow-2xl transition-shadow duration-700">
                  <LazyImage
                    src={sections.sedan.image}
                    alt="Luxury Sedan"
                    className="w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>
            </FadeInSection>

            {/* Content Side */}
            <FadeInSection delay={0.2} className="order-2 lg:order-2">
              <div>
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <span className="w-8 md:w-12 h-px bg-primary" />
                  <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">{sections.sedan.subtitle}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {sections.sedan.title}
                </h2>

                <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed mb-8 md:mb-10">
                  {sections.sedan.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 mb-8 md:mb-12">
                  {sections.sedan.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70 group">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <item.icon size={16} />
                      </div>
                      <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary text-black hover:bg-white transition-colors duration-300 min-w-full sm:min-w-[200px] h-12 md:h-14 text-sm md:text-base uppercase font-semibold tracking-wider" asChild>
                    <Link to={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                      Book Sedan
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 4. SUV Services */}
      <section id="luxury-suv" className="bg-background py-20 md:py-32 relative overflow-hidden">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Content Side - First on Desktop */}
            <FadeInSection delay={0.2} className="order-2 lg:order-1">
              <div className={`relative transition-all duration-700 ${sections.suv.isComingSoon ? "pointer-events-none select-none z-10" : ""}`}>
                <div className="relative z-10 w-full">
                  <div className={`flex items-center gap-3 md:gap-4 mb-4 md:mb-6 ${sections.suv.isComingSoon ? "grayscale opacity-80" : ""}`}>
                    <span className="w-8 md:w-12 h-px bg-primary" />
                    <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                      {sections.suv.subtitle}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-4 md:mb-6">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground/50 leading-tight">
                      {sections.suv.title}
                    </h2>
                    {sections.suv.isComingSoon && (
                      <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 shadow-xl backdrop-blur-md">
                        <Lock size={16} className="text-primary md:w-5 md:h-5" />
                        <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">Coming Soon</span>
                      </div>
                    )}
                  </div>

                  <div className={sections.suv.isComingSoon ? "grayscale opacity-80" : ""}>
                    <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed mb-8 md:mb-10">
                      {sections.suv.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4 mb-8 md:mb-12">
                      {sections.suv.amenities.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-muted-foreground group">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                            <item.icon size={16} />
                          </div>
                          <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="bg-primary text-black hover:bg-charcoal hover:text-white transition-colors duration-300 min-w-full sm:min-w-[200px] h-12 md:h-14 text-sm md:text-base uppercase font-semibold tracking-wider" asChild>
                        <Link to={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                          Book SUV
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Image Side */}
            <FadeInSection className="order-1 lg:order-2 relative">
              <div className={`relative group ${sections.suv.isComingSoon ? "pointer-events-none" : ""}`}>
                <div className={`absolute -inset-3 sm:-inset-4 border border-foreground/10 translate-x-0 translate-y-0 ${sections.suv.isComingSoon ? "" : "lg:group-hover:scale-105"} transition-transform duration-700 rounded-sm`} />
                <div className={`aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-sm relative z-10 ${sections.suv.isComingSoon ? "" : "lg:hover:shadow-2xl"} transition-shadow duration-700`}>
                  <LazyImage
                    src={sections.suv.image}
                    alt="Luxury SUV"
                    className={`w-full h-full object-cover transition-transform duration-1000 ${sections.suv.isComingSoon ? "grayscale opacity-80 scale-105" : "group-hover:scale-105"}`}
                    containerClassName="w-full h-full"
                  />
                  {!sections.suv.isComingSoon && (
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                  )}

                  {/* Coming Soon Overlay Layer */}
                  {sections.suv.isComingSoon && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60">
                      {/* Diagonal subtle stripes */}
                      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />

                      <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 bg-black/80 border border-white/10 rounded-2xl shadow-2xl">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-20 pointer-events-none" />

                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                          <Lock size={20} className="text-primary relative z-10" />
                        </div>

                        <span className="text-white text-[11px] md:text-sm uppercase tracking-[0.4em] font-black drop-shadow-lg mb-1.5 text-center">
                          Coming Soon
                        </span>
                        <span className="text-primary/70 text-[9px] uppercase tracking-widest font-medium text-center">
                          Expanding Our Fleet
                        </span>

                        {/* Glow effect under badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-primary/60 blur-md rounded-full pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 5. Premium vs Luxury Comparison */}
      {/* <section className="bg-[#050505] py-32 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary text-[11px] md:text-xs uppercase tracking-[0.5em] font-bold block mb-6">Choose Your Level</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">Fleet Distinction</h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto relative border border-gold/20 p-3 sm:p-5">
            <div className="overflow-hidden rounded-none border border-white/5 bg-white/[0.04] backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04]">
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
        </div>
      </section> */}

      {/* 6. Special Service Packages */}
      <section className="bg-[#050505] py-32 md:py-48 relative" id="offerings">
        <div className="container-luxury">
          <div className="text-center mb-20 md:mb-24">
            <span className="text-primary text-xs md:text-sm uppercase tracking-[0.5em] font-bold block mb-6">
              Specialized Travel
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Service Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
              Tailored solutions for every occasion, ensuring your journey is as memorable as the destination.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {sections.specialPackages.map((pkg, idx) => (
              <FadeInSection key={pkg.id} delay={idx * 0.1} className="h-full">
                <div className="group h-full bg-charcoal/5 hover:bg-charcoal/10 border border-white/10 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col">
                  {/* Image Area - 3:2 Ratio */}
                  <div className="relative aspect-[3/2]">
                    <LazyImage
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* Floating Icon */}
                    <div className="absolute bottom-0 right-6 translate-y-1/2 w-12 h-12 bg-primary text-black flex items-center justify-center rounded-sm shadow-lg transition-transform duration-500 group-hover:scale-110 z-10">
                      <pkg.icon size={24} />
                    </div>
                  </div>

                  {/* Content Area - Always Visible */}
                  <div className="p-6 pt-10 flex flex-col flex-grow relative bg-background backdrop-blur-sm">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="text-muted-foreground text-base sm:text-lg lg:text-base leading-relaxed mb-8">
                      {pkg.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                        {pkg.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm sm:text-base lg:text-sm font-medium text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call-to-Action Section */}
      <section className="py-24 md:py-32 relative bg-black overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <LazyImage
            containerClassName="h-full"
            src={images.cta}
            className="w-full h-full object-cover object-right sm:object-center opacity-40 transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
            alt="Luxury Night Drive"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/20 via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505]/80" />
        </div>

        <div className="container-luxury relative z-10 text-center">
          <FadeInSection>
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 md:mb-12 text-white/60">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium">24/7 Service</span>
              </div>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl xl:text-[5rem] font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1]">
              Experience <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold to-primary bg-[length:200%_auto] animate-shimmer p-2">True Luxury</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4">
              Your chariot awaits. Step into a world where every journey is crafted to perfection, and every destination feels like a beginning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
              <Button size="xl" variant="gold-cta" className="w-full sm:w-auto min-w-[220px] h-14 sm:h-16 text-sm sm:text-base shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]" asChild>
                <Link to={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">
                  Book Your Ride
                  <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                size="xl"
                variant="hero-outline"
                className="w-full sm:w-auto min-w-[220px] h-14 sm:h-16 text-sm sm:text-base backdrop-blur-sm hover:bg-white/10 border-white/20"
                asChild
              >
                <Link to="/contact">
                  Contact Concierge
                </Link>
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
