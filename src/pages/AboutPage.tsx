import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Shield, 
  Award, 
  CheckCircle, 
  Clock, 
  HeartHandshake,
  Navigation,
  Star,
  Zap,
  ChevronRight
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";

const sections = {
  hero: {
    title: "About AUXEMPI",
    subtitle: "Redefining the art of luxury transportation through precision, discretion, and excellence.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
  },
  story: {
    title: "Our Brand Story",
    content: [
      "Founded with a vision to transcend the traditional boundaries of private transportation, AUXEMPI has grown into a beacon of luxury and reliability. We recognized that for our clients, the journey is as significant as the destination.",
      "Our commitment is rooted in the belief that every trip deserves a bespoke approach. Whether it's a corporate transfer or a private lifestyle excursion, we bring a level of meticulous planning and executive care that remains unparalleled in the industry.",
      "Today, AUXEMPI stands as a symbol of trust for global leaders, executives, and discerning travelers who demand nothing less than perfection."
    ],
    image: "https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=1974&auto=format&fit=crop"
  },
  mission: {
    title: "Mission & Vision",
    mission: "To provide the world's most seamless and sophisticated private transportation experience, where safety meets supreme comfort.",
    vision: "To be the ultimate global partner in luxury mobility, setting the benchmark for professional chauffeur services worldwide.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
  },
  features: [
    {
      title: "Premium Fleet",
      description: "Our collection of latest-model sedans and SUVs represents the pinnacle of automotive engineering and luxury.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Elite Chauffeurs",
      description: "Professionally trained, background-vetted drivers who understand the nuances of executive hospitality.",
      icon: Award,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop"
    },
    {
      title: "Luxury Service Tiers",
      description: "Tailored service packages designed to match the specific requirements of every unique client journey.",
      icon: Star,
      image: "https://images.unsplash.com/photo-1469033051802-1262788e02d6?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Client-First Ethics",
      description: "A culture of service that prioritizes your comfort, safety, and schedule above all else.",
      icon: HeartHandshake,
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
    }
  ],
  stats: [
    { value: "8+", label: "Years of Service" },
    { value: "15K+", label: "Rides Completed" },
    { value: "25+", label: "Global Regions" },
    { value: "99.9%", label: "Client Satisfaction" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2036&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop"
  ]
};

const AboutPage = () => {
  return (
    <MainLayout>
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={sections.hero.image} 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Luxury Car Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-3 text-primary text-sm uppercase tracking-[0.4em] font-medium mb-6">
              <span className="w-12 h-px bg-primary/60" />
              Established 2018
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8">
              {sections.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              {sections.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Story Section */}
      <section className="bg-background py-24 md:py-32 lg:py-40">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium mb-6 block">
                The Legacy
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-10">
                {sections.story.title}
              </h2>
              <div className="space-y-6">
                {sections.story.content.map((p, i) => (
                  <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img 
                src={sections.story.image} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
                alt="AUXEMPI Story" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section className="bg-charcoal py-24 md:py-32">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 md:p-16 border border-border/30 bg-background/30 rounded-sm relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
              <Navigation className="text-primary mb-8" size={40} />
              <h3 className="font-display text-3xl font-bold text-foreground mb-6">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                "{sections.mission.mission}"
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 md:p-16 border border-border/30 bg-background/30 rounded-sm relative group overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-primary/10 transition-colors" />
              <Zap className="text-primary mb-8" size={40} />
              <h3 className="font-display text-3xl font-bold text-foreground mb-6">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                "{sections.mission.vision}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. What Sets Us Apart */}
      <section className="bg-background py-24 md:py-32 lg:py-40">
        <div className="container-luxury">
          <div className="text-center mb-20 lg:mb-28">
            <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium block mb-4">
              Distinctive Excellence
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What Sets <span className="text-gradient-gold">Us Apart</span>
            </h2>
            <div className="luxury-divider mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {sections.features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-sm bg-charcoal/50 border border-border/20"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={feature.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-[0.7]" 
                    alt={feature.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                </div>
                <div className="p-8 lg:p-10 relative mt-[-60px]">
                  <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center rounded-sm mb-6 shadow-xl shadow-black/40">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience & Trust Section */}
      <section className="bg-charcoal py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {sections.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-4">
                  {stat.value}
                </div>
                <div className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 pt-16 border-t border-border/20 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <div className="flex items-center gap-3">
              <Shield className="text-primary" size={24} />
              <span className="text-sm uppercase tracking-widest text-foreground font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-primary" size={24} />
              <span className="text-sm uppercase tracking-widest text-foreground font-medium">Certified Chauffeurs</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={24} />
              <span className="text-sm uppercase tracking-widest text-foreground font-medium">Licensed Operator</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Visual Gallery Section */}
      <section className="bg-background py-24 md:py-32 lg:py-40">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
            <div className="max-w-2xl">
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium block mb-4">
                Fleet & Lifestyle
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Capturing the <span className="text-gradient-gold">AUXEMPI Spirit</span>
              </h2>
            </div>
            <button className="flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-xs font-bold group">
              View Collection
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-sm cursor-pointer group ${
                  idx % 4 === 1 ? 'lg:translate-y-12' : idx % 4 === 3 ? 'lg:translate-y-12' : ''
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={img} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={`Gallery ${idx + 1}`} 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </motion.div>
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
