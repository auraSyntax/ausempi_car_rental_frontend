import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Quote, 
  Star, 
  MapPin, 
  Car, 
  Users, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  CheckCircle,
  Clock
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Stats Data
const stats = [
  { number: "8+", label: "Years of Excellence", icon: Calendar },
  { number: "15K+", label: "Completed Rides", icon: Car },
  { number: "25+", label: "Cities Covered", icon: MapPin },
  { number: "50+", label: "Premium Vehicles", icon: Users },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Jonathan Mitchell",
    role: "CEO, Mitchell Ventures",
    content: "AUXEMPI redefines what luxury transportation means. Every detail, from the immaculate vehicles to the professional chauffeurs, speaks to their commitment to excellence.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Executive Director",
    content: "For our corporate events, reliability is non-negotiable. AUXEMPI has never let us down. Their fleet coordination and attention to timing is impeccable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Private Client",
    content: "The level of discretion and personalized service is unmatched. They remember my preferences and always go above and beyond expectations.",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "VP of Operations",
    content: "We've used AUXEMPI for all our executive travel for three years. The consistency and quality of service has made them an indispensable partner.",
    rating: 5,
  },
];

// Trust Badges
const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Award, label: "Top Rated Service" },
  { icon: CheckCircle, label: "Vetted Chauffeurs" },
  { icon: Clock, label: "24/7 Availability" },
];

// Coverage Areas
const coverageAreas = [
  "New York", "Los Angeles", "Chicago", "Miami", "San Francisco",
  "Boston", "Washington D.C.", "Dallas", "Seattle", "Atlanta"
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Counter Animation
  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      const counters = statsRef.current?.querySelectorAll(".stat-number");
      
      counters?.forEach((counter) => {
        const target = counter.getAttribute("data-value") || "0";
        const numericValue = parseInt(target.replace(/\D/g, ""));
        const suffix = target.replace(/[0-9]/g, "");

        gsap.fromTo(
          counter,
          { innerText: "0" },
          {
            innerText: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
            },
            onUpdate: function () {
              const current = Math.floor(parseFloat(counter.textContent || "0"));
              counter.textContent = current + suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-background relative overflow-hidden"
    >
      {/* Mission & Vision */}
      <div className="container-luxury py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-3 text-primary text-xs uppercase tracking-[0.4em] font-medium mb-6">
              <span className="w-12 h-px bg-primary/60" />
              About AUXEMPI
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8">
              Where Excellence
              <span className="block text-gradient-gold">Becomes Standard</span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Founded on the principle that transportation should be an experience, 
                not just a service. We believe every journey deserves the same attention 
                to detail as the destination itself.
              </p>
              <p>
                Our mission is simple: deliver uncompromising luxury with unwavering 
                reliability. From our meticulously maintained fleet to our professionally 
                trained chauffeurs, every element is designed to exceed expectations.
              </p>
            </div>

            {/* Coverage */}
            <div className="mt-10 pt-8 border-t border-border/30">
              <h4 className="text-sm uppercase tracking-[0.2em] text-foreground font-medium mb-4">
                Service Coverage
              </h4>
              <div className="flex flex-wrap gap-2">
                {coverageAreas.slice(0, 6).map((city) => (
                  <span
                    key={city}
                    className="text-xs px-3 py-1.5 rounded-sm bg-secondary/50 text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
                <span className="text-xs px-3 py-1.5 rounded-sm bg-primary/10 text-primary">
                  +{coverageAreas.length - 6} more
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="relative p-6 lg:p-8 rounded-sm border border-border/30 bg-charcoal/50 group hover:border-primary/30 transition-colors duration-500"
              >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <stat.icon size={40} className="text-primary" />
                </div>
                <span
                  className="stat-number block font-display text-4xl lg:text-5xl font-bold text-gradient-gold mb-2"
                  data-value={stat.number}
                >
                  0
                </span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-charcoal py-20 md:py-28 lg:py-36 relative overflow-hidden">
        {/* Decorative Quote */}
        <div className="absolute top-12 left-12 opacity-5">
          <Quote size={200} className="text-primary" />
        </div>

        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
              Client Testimonials
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
              Words of <span className="text-gradient-gold">Trust</span>
            </h3>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center px-4 md:px-12"
              >
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-primary fill-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 font-light italic">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "w-6 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container-luxury py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-muted-foreground group"
            >
              <div className="w-10 h-10 rounded-sm bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <badge.icon size={18} className="text-primary" />
              </div>
              <span className="text-sm uppercase tracking-wider font-medium">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default About;
