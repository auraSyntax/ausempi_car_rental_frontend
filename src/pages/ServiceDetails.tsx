import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Shield,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  Star,
  ChevronRight,
  Wifi,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { LazyImage } from "@/components/common";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";

// Data Definitions
const SERVICES_DATA = {
  "luxury-sedan": {
    title: "Luxury Sedan",
    tagline: "The Art of Executive Travel",
    description: "Designed for the discerning individual, our luxury sedan service offers a sanctuary of calm. Whether for swift airport transfers or day-long executive roadshows, experience the perfect balance of efficiency and elegance.",
    heroImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop", // Mercedes S-Class vibe
    specs: [
      { label: "Passengers", value: "3", icon: Users },
      { label: "Luggage", value: "2 Large", icon: Briefcase },
      { label: "Privacy", value: "Privacy Glass", icon: Shield },
    ],
    features: [
      { title: "First Class Rear Cabin", desc: "Reclining seats with massage function and ample legroom.", icon: Star },
      { title: "Connected Office", desc: "Integrated high-speed Wi-Fi and executive work tables.", icon: Wifi },
      { title: "Personal Concierge", desc: "Chauffeur trained to assist with luggage, reservations, and more.", icon: Users },
      { title: "Acoustic Insulation", desc: "Double-glazed windows for a whisper-quiet internal environment.", icon: Shield }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop", // Interior
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop", // Detail
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"  // POV
    ],
    tiers: [
      {
        name: "Business Class",
        price: "From $120/hr",
        includes: ["Professional Chauffeur", "Bottled Water", "15min Wait Time", "Flight Tracking"]
      },
      {
        name: "First Class",
        price: "From $180/hr",
        includes: ["Senior Chauffeur", "Refreshments & Snacks", "60min Wait Time", "Concierge Service"],
        recommended: true
      }
    ]
  },
  "luxury-suv": {
    title: "Luxury SUV",
    tagline: "Commanding Space & Comfort",
    description: "For those who demand presence and space without compromising on luxury. Our SUV fleet is perfect for groups, families, or executives requiring a mobile boardroom with commanding views of the road.",
    heroImage: "https://images.unsplash.com/photo-1609520505218-7421dad18218?q=80&w=2070&auto=format&fit=crop", // Cadillac Escalade / Range Rover vibe
    specs: [
      { label: "Passengers", value: "6", icon: Users },
      { label: "Luggage", value: "5 Large", icon: Briefcase },
      { label: "Drive", value: "AWD Comfort", icon: MapPin },
    ],
    features: [
      { title: "Expansive Interior", desc: "Generous headroom and legroom for all 6 passengers.", icon: Users },
      { title: "Entertainment System", desc: "Rear-seat screens and premium surround sound.", icon: Wifi },
      { title: "Configureable Seating", desc: "Adaptable layout for meetings or relaxation.", icon: Star },
      { title: "All-Terrain Confidence", desc: "Smooth ride quality regardless of weather or road conditions.", icon: MapPin }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop", // Car Detail
      "https://images.unsplash.com/photo-1594741300266-3d778d91795c?q=80&w=2070&auto=format&fit=crop", // SUV Front
      "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop"  // Interior/Leather
    ],
    tiers: [
      {
        name: "Business SUV",
        price: "From $150/hr",
        includes: ["Professional Chauffeur", "Bottled Water", "Child Seats (Upon Request)", "Flight Tracking"]
      },
      {
        name: "Executive SUV",
        price: "From $220/hr",
        includes: ["Senior Chauffeur", "Premium Refreshments", "Extended Luggage Assist", "Wi-Fi Streaming"],
        recommended: true
      }
    ]
  }
};

// Animation Helper
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

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = SERVICES_DATA[serviceId as keyof typeof SERVICES_DATA];

  // Fallback if ID not found
  if (!service) {
    return (
      <MainLayout>
        <Navbar />
        <div className="h-screen flex items-center justify-center bg-background text-white">
          <div className="text-center">
            <h1 className="text-4xl font-display mb-4">Service Not Found</h1>
            <Link to="/services" className="text-primary hover:underline">Return to Services</Link>
          </div>
        </div>
        <Footer />
      </MainLayout>
    )
  }

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MainLayout>
      <Navbar />

      {/* 1. Hero Section - Full Height & Immersive */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <LazyImage
            src={service.heroImage}
            className="w-full h-full object-cover brightness-[0.3]"
            alt={service.title}
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background" />
        </motion.div>

        <div className="container-luxury relative z-10 px-6 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Link to="/services" className="inline-flex items-center gap-3 text-white/50 hover:text-primary transition-colors text-xs uppercase tracking-[0.2em] group font-medium">
              <div className="w-8 h-px bg-white/30 group-hover:bg-primary transition-colors" />
              Back to Fleet
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[0.9] tracking-tighter">
              {service.title}
            </h1>
            <p className="text-xl md:text-3xl text-primary/80 font-light mb-12 italic max-w-2xl border-l-2 border-primary/20 pl-6">
              "{service.tagline}"
            </p>

            <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-8 max-w-3xl">
              {service.specs.map((spec, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-3 text-white/40 mb-2 group-hover:text-primary transition-colors">
                    <spec.icon size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{spec.label}</span>
                  </div>
                  <span className="block font-display text-2xl md:text-4xl text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40 mix-blend-screen"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 2. Overview & Details - Editorial Layout */}
      <section className="bg-background py-24 md:py-32 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-5 sticky top-32">
              <FadeInSection>
                <span className="text-primary text-xs uppercase tracking-[0.4em] font-bold block mb-8">The Experience</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                  Refined Luxury <br /> <span className="text-gradient-gold">Without Compromise</span>
                </h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10 text-justify">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="xl" className="bg-primary text-black hover:bg-white min-w-[200px]" asChild>
                    <a href={EXTERNAL_LINKS.booking} target="_blank">Book Now</a>
                  </Button>
                  <Button size="xl" variant="outline" className="border-border hover:bg-charcoal/5 text-muted-foreground min-w-[200px]" asChild>
                    <a href="/contact">Inquire</a>
                  </Button>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Features Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {service.features.map((feature, idx) => (
                  <FadeInSection key={idx} delay={idx * 0.1}>
                    <div className="group p-8 bg-charcoal/5 hover:bg-background border border-transparent hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-sm h-full flex flex-col">
                      <div className="w-12 h-12 rounded-sm bg-background border border-border group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all duration-500">
                        <feature.icon size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light group-hover:text-foreground/70 transition-colors">{feature.desc}</p>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Gallery - Modern Masonry/Grid */}
      <section className="bg-charcoal py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-bold block mb-4">Gallery</span>
              <h2 className="font-display text-4xl md:text-5xl text-white">Inside & Out</h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed text-right hidden md:block">
              Every angle tells a story of impeccable design and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
            {/* Hero Image in Gallery */}
            <div className="md:col-span-8 md:row-span-2 relative h-[300px] md:h-full rounded-sm overflow-hidden group">
              <LazyImage
                src={service.gallery[0]}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                alt="Main View"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>

            {/* Side Images */}
            <div className="md:col-span-4 h-[250px] md:h-full rounded-sm overflow-hidden group relative">
              <LazyImage
                src={service.gallery[1]}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                alt="Detail View"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
            <div className="md:col-span-4 h-[250px] md:h-full rounded-sm overflow-hidden group relative">
              <LazyImage
                src={service.gallery[2]}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                alt="Interior View"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing & Tiers - Clean Cards */}
      <section className="bg-background py-32 relative">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-bold block mb-6">Selection</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">Choose Your Class</h2>
              <p className="text-muted-foreground text-lg font-light"> tailored for different needs, keeping luxury constant.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {service.tiers.map((tier, idx) => (
                <FadeInSection key={idx} delay={idx * 0.1} className="h-full">
                  <div className={`
                                    relative p-10 rounded-xl border h-full flex flex-col transition-all duration-300
                                    ${tier.recommended
                      ? 'bg-gradient-to-b from-primary/5 to-background border-primary/30 shadow-2xl shadow-primary/5'
                      : 'bg-white/[0.02] border-border hover:border-primary/20'}
                                `}>
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-8 border-b border-dashed border-border pb-8">
                      <h3 className="font-display text-3xl font-bold text-foreground mb-2">{tier.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm text-muted-foreground uppercase tracking-widest">Starting</span>
                        <span className="font-display text-2xl font-bold text-primary">{tier.price}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-10 flex-grow px-2">
                      {tier.includes.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-4 text-sm text-foreground/80 group">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                            <CheckCircle2 size={12} />
                          </div>
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className={`w-full py-6 md:text-sm tracking-widest uppercase font-bold
                            ${tier.recommended
                        ? 'bg-primary text-black hover:bg-white hover:text-black shadow-lg shadow-primary/20'
                        : 'bg-charcoal text-white hover:bg-black'}`}
                      asChild>
                      <a href={EXTERNAL_LINKS.booking} target="_blank">Book {tier.name}</a>
                    </Button>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default ServiceDetails;
