import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, BatteryCharging, Wine, Thermometer, Shield, Clock, Crown, Star, ArrowRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import fleetSedan from "@/assets/fleet-sedan.jpg";
import fleetSuv from "@/assets/fleet-suv.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "sedan",
    title: "Luxury Sedan",
    subtitle: "Executive Excellence",
    description: "Experience the pinnacle of executive travel. Our premium sedans offer a sanctuary of calm and sophistication, designed for the discerning professional who values time and tranquility.",
    image: fleetSedan,
    index: "01",
    tiers: [
      { name: "Premium", icon: Star, features: ["Professional chauffeur", "Complimentary water", "Phone charging"] },
      { name: "Luxury", icon: Crown, features: ["Elite chauffeur", "Premium refreshments", "Dedicated concierge"], highlighted: true },
    ],
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: BatteryCharging, label: "Device Charging" },
      { icon: Wine, label: "Refreshments" },
      { icon: Thermometer, label: "Climate Control" },
    ],
  },
  {
    id: "suv",
    title: "Luxury SUV",
    subtitle: "Commanding Presence",
    description: "Uncompromising space meets unparalleled luxury. Our flagship SUVs provide a commanding perspective and abundant room, making every group journey an occasion of shared prestige.",
    image: fleetSuv,
    index: "02",
    tiers: [
      { name: "Premium", icon: Star, features: ["Up to 5 guests", "Luggage capacity", "Airport meet & greet"] },
      { name: "Luxury", icon: Crown, features: ["Up to 6 guests", "Expanded cargo", "VIP handling"], highlighted: true },
    ],
    amenities: [
      { icon: Shield, label: "Privacy Partition" },
      { icon: BatteryCharging, label: "Multiple Ports" },
      { icon: Clock, label: "Flexible Timing" },
      { icon: Thermometer, label: "Dual Climate" },
    ],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col lg:grid lg:grid-cols-12 gap-0 items-stretch overflow-hidden min-h-[600px] lg:min-h-[800px] ${
        index !== 0 ? "mt-[-1px]" : ""
      }`}
    >
      {/* Background Index Number */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 hidden lg:block font-display text-[25rem] font-black text-white/[0.02] pointer-events-none select-none z-0 transition-all duration-1000 ${
          isReversed ? "left-10" : "right-10"
        } ${isInView ? "opacity-100 translate-x-0" : "opacity-0 " + (isReversed ? "-translate-x-20" : "translate-x-20")}`}
      >
        {service.index}
      </div>

      {/* Image Section */}
      <div
        className={`relative overflow-hidden h-[400px] sm:h-[500px] lg:h-auto w-full lg:col-span-6 z-10 ${
          isReversed ? "lg:order-2" : ""
        }`}
      >
        <div ref={imageRef} className="absolute inset-0 scale-125">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center brightness-90"
            loading="lazy"
          />
          {/* Complex Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:hidden" />
          <div className={`absolute inset-0 hidden lg:block ${
            isReversed 
              ? "bg-gradient-to-l from-background via-background/10 to-transparent" 
              : "bg-gradient-to-r from-background via-background/10 to-transparent"
          }`} />
        </div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-10 left-10 lg:bottom-16 lg:left-16 z-20"
        >
          <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 px-6 py-3 shadow-2xl">
            <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="w-8 h-px bg-primary" />
              {service.subtitle}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div
        className={`relative bg-background p-8 sm:p-12 lg:p-20 xl:p-28 flex flex-col justify-center lg:col-span-6 z-10 ${
          isReversed ? "lg:order-1" : ""
        }`}
      >
        {/* Decorative Corner */}
        <div className={`absolute top-0 ${isReversed ? "left-0" : "right-0"} w-32 h-32 opacity-10 pointer-events-none`}>
          <div className={`absolute top-10 ${isReversed ? "left-10" : "right-10"} w-px h-20 bg-primary`} />
          <div className={`absolute top-10 ${isReversed ? "left-10" : "right-10"} w-20 h-px bg-primary`} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-[1.1]">
            {service.title.split(' ')[0]} <br />
            <span className="text-gradient-gold italic">{service.title.split(' ')[1]}</span>
          </h3>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-light">
            {service.description}
          </p>
        </motion.div>

        {/* Tier Cards - Redesigned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {service.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className={`group relative p-6 lg:p-8 transition-all duration-500 overflow-hidden ${
                tier.highlighted
                  ? "bg-primary/[0.03] border border-primary/30"
                  : "bg-white/[0.02] border border-white/5 hover:border-primary/20"
              }`}
            >
              {/* Animated Background Highlight */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${
                    tier.highlighted ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    <tier.icon size={20} />
                  </div>
                  <div>
                    <span className={`block text-xs uppercase tracking-widest font-bold ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`}>
                      {tier.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter">Experience</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-xs lg:text-sm text-muted-foreground flex items-center gap-3">
                      <span className={`w-1 h-1 rounded-full ${tier.highlighted ? "bg-primary" : "bg-primary/40"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {service.amenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="flex flex-col gap-3 group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-white/5 bg-white/[0.02] group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                <amenity.icon size={18} className="text-primary/60 group-hover:text-primary transition-colors duration-500" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-foreground transition-colors">
                {amenity.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button variant="luxury" size="lg" className="group h-16 px-12 text-xs tracking-[0.3em] uppercase font-bold shadow-2xl" asChild>
            <a href="#fleet" className="flex items-center gap-4">
              Explore {service.title}
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".header-animate"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-background relative overflow-hidden pb-0"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[180px] -translate-x-1/2" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="container-luxury pt-32 md:pt-48 pb-20 md:pb-32 text-center relative z-10">
        <div className="header-animate mb-8">
          <span className="inline-flex items-center gap-4 text-primary text-xs md:text-sm uppercase tracking-[0.6em] font-bold">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
            Curated Excellence
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
          </span>
        </div>
        
        <h2 className="header-animate font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground mt-4 mb-10 tracking-tight leading-[0.9]">
          Bespoke <br />
          <span className="text-gradient-gold italic">Journeys</span>
        </h2>
        
        <p className="header-animate text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light mb-12">
          Redefining the standards of luxury transportation with a fleet that commands respect 
          and a service that anticipates every desire.
        </p>

        <div className="header-animate flex flex-col items-center gap-4 text-muted-foreground/40">
          <MousePointer2 className="animate-bounce" size={24} />
          <span className="text-[10px] uppercase tracking-[0.5em]">Scroll to Explore</span>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-0 relative z-10">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Final Bottom Accent */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-background">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
         <div className="relative z-10 text-center px-6">
            <h4 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-8">Ready to Elevate Your Travel?</h4>
            <Button variant="luxury" size="xl" className="h-16 px-16 text-sm tracking-[0.4em] uppercase font-black" asChild>
              <a href="#contact">Book Your Signature Ride</a>
            </Button>
         </div>
         {/* Moving Background Lines */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ 
                  top: `${20 * (i + 1)}%`,
                  animation: `slideRight ${10 + i * 2}s linear infinite`,
                  opacity: 0.2 + (i * 0.1)
                }}
              />
            ))}
         </div>
      </div>
    </section>
  );
};

export default Services;
