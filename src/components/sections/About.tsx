import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Quote, 
  Star, 
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

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

const highlights = [
  {
    title: "Unmatched Fleet Quality",
    description: "Our meticulously maintained vehicles represent the pinnacle of automotive luxury and safety."
  },
  {
    title: "Expert Chauffeur Service",
    description: "Highly trained professionals dedicated to providing a seamless, discrete, and safe experience."
  },
  {
    title: "Global Service Excellence",
    description: "Consistent high-end service standards maintained across major cities and travel hubs worldwide."
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
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
      {/* Redesigned About Section - Split Layout */}
      <div className="container-luxury py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
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
              Elevating the Standard of 
              <span className="block text-gradient-gold">Private Travel</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              We don't just provide a ride; we deliver an experience defined by precision, luxury, and an unwavering commitment to your journey's excellence. Every mile is a testament to our dedication to superior service.
            </p>

            {/* Highlights Grid */}
            <div className="space-y-8 mb-12">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-px h-12 bg-primary/20 group-hover:bg-primary transition-colors duration-500" />
                  <div>
                    <h4 className="text-foreground font-semibold uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary font-medium tracking-[0.2em] uppercase text-xs group"
              >
                Learn More About Our Vision
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Editorial Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image Frame */}
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative z-10 shadow-2xl shadow-black/50">
              <img 
                src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Vehicle Interior"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-primary/30 z-0" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-primary/30 z-0" />
            
            {/* Floating Trust Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 right-10 z-20 bg-charcoal/90 backdrop-blur-md p-6 border border-border/30 rounded-sm shadow-xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg leading-none">8+ Years</p>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">of Excellence</p>
                </div>
              </div>
            </motion.div>
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
