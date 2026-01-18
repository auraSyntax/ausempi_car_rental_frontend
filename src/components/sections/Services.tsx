import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, ArrowRight, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/common";
import { homeServices } from "@/data/service";
import { Link } from "react-router-dom";
import { EXTERNAL_LINKS } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, index }: { service: typeof homeServices[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });
  const isReversed = index % 2 === 1;

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop Parallax Only
    mm.add("(min-width: 1024px)", () => {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, cardRef);

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative grid grid-cols-1 lg:grid-cols-12 min-h-[90vh] lg:min-h-screen border-t border-white/5 overflow-hidden ${index === 0 ? "border-t-0" : ""
        }`}
    >
      {/* Background Index Number */}
      <div
        className={`hidden xl:block absolute top-[20%] font-display text-[20rem] 2xl:text-[25rem] font-black text-white/[0.02] pointer-events-none select-none z-0 leading-none transition-transform duration-[1.5s] ease-out ${isReversed ? "left-[5%]" : "right-[5%]"
          }`}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? `translateX(0)`
            : `translateX(${isReversed ? "-100px" : "100px"})`
        }}
      >
        {service.index}
      </div>

      {/* Image Section */}
      <div
        className={`relative z-10 w-full lg:col-span-6 h-[50vh] lg:h-full order-1 ${isReversed ? "lg:order-2" : "lg:order-1"
          }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div ref={imageRef} className="w-full h-[130%] -top-[15%] relative will-change-transform">
            <LazyImage
              src={service.image}
              alt={service.title}
              containerClassName="w-full h-full"
              className="object-cover object-center brightness-[0.75] transition-all duration-700 lg:hover:scale-105"
            />
          </div>
          {/* Gradient Overlays */}
          <div className={`absolute inset-0 z-20 pointer-events-none ${isReversed
            ? "bg-gradient-to-b lg:bg-gradient-to-l from-background via-transparent to-transparent opacity-80"
            : "bg-gradient-to-b lg:bg-gradient-to-r from-background via-transparent to-transparent opacity-80"
            }`} />
          {/* Mobile bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent lg:hidden z-20" />
        </div>

        {/* Floating Badge (Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`absolute bottom-8 left-8 lg:bottom-16 ${isReversed ? "lg:right-16 lg:left-auto" : "lg:left-16 lg:right-auto"
            } z-30 hidden lg:block`}
        >
          <div className="bg-background/40 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-none">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-3">
              <span className="w-10 h-px bg-primary" />
              {service.subtitle}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div
        className={`relative z-20 w-full lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 py-16 lg:p-20 xl:p-28 order-2 ${isReversed ? "lg:order-1 lg:pr-12" : "lg:order-2 lg:pl-12"
          }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6 lg:hidden">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-[11px] uppercase tracking-[0.2em] font-bold">{service.subtitle}</span>
          </div>

          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 lg:mb-8 leading-[1.05]">
            <span className="block">{service.title.split(' ')[0]}</span>
            <span className="block text-gradient-gold italic">{service.title.split(' ')[1]}</span>
          </h3>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
            {service.description}
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 lg:mb-12">
          {service.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 rounded-none transition-all duration-300 group ${tier.highlighted
                ? "bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                : "bg-white/[0.02] border border-white/5 hover:border-white/10"
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-none ${tier.highlighted ? "bg-primary text-black" : "bg-white/5 text-white group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                  }`}>
                  <tier.icon size={18} />
                </div>
                {tier.highlighted && <Crown size={24} className="text-primary animate-pulse" />}
              </div>

              <h4 className={`text-xl lg:text-2xl font-bold uppercase tracking-widest mb-4 ${tier.highlighted ? "text-primary" : "text-foreground"
                }`}>
                {tier.name}
              </h4>

              <ul className="space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-sm lg:text-base text-muted-foreground flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${tier.highlighted ? "bg-primary" : "bg-white/30"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Amenities Row */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12">
          {service.amenities.map((amenity, i) => (
            <motion.div
              key={amenity.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
              className="flex items-center gap-3 text-muted-foreground/80"
            >
              <amenity.icon size={16} className="text-primary/70" />
              <span className="text-[11px] uppercase tracking-widest font-medium">{amenity.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="luxury-outline" className="h-14 px-8 group w-full sm:w-auto" asChild>
            <Link
              to={EXTERNAL_LINKS?.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3"
            >
              <span>Reserve {service.title}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
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
        { opacity: 0, y: 40, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
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
      {/* Simplified Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Hero Header */}
      <div ref={headerRef} className="container-luxury pt-32 lg:pt-48 pb-20 lg:pb-32 text-center relative z-10">
        <div className="header-animate mb-6 lg:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-3 lg:gap-4 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary/90 text-[10px] lg:text-xs uppercase tracking-[0.3em] font-bold">
              Curated Excellence
            </span>
          </div>
        </div>

        <h2 className="header-animate font-display text-5xl md:text-6xl lg:text-8xl font-bold text-foreground mb-8 lg:mb-14 tracking-tight leading-[0.9]">
          Bespoke <span className="text-gradient-gold">Journeys</span>
        </h2>

        <p className="header-animate text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12 lg:mb-16">
          Redefining the standards of luxury transportation with a fleet that commands respect
          and a service that anticipates every desire.
        </p>

        <div className="header-animate flex justify-center text-muted-foreground/30">
          <MousePointer2 className="animate-bounce" size={24} />
        </div>
      </div>

      {/* Full-width Service Cards */}
      <div className="space-y-0 relative z-10 w-full">
        {homeServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>

      {/* Footer / Transition Area */}
      <div className="relative py-32 lg:py-48 flex items-center justify-center overflow-hidden bg-background">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h4 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 lg:mb-12">
            Ready to Elevate Your Travel?
          </h4>
          <Button variant="gold-cta" size="xl" className="h-14 lg:h-16 px-8 lg:px-12 text-xs lg:text-sm tracking-[0.3em] uppercase font-bold shadow-[0_0_40px_rgba(212,175,55,0.2)]" asChild>
            <Link
              to={EXTERNAL_LINKS?.booking}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Signature Ride
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
