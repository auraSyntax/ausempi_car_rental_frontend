import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageSquare, Linkedin, Instagram, Twitter } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeInSection, LazyImage } from "@/components/common";
import contactBgImg from "@/assets/contact-bg-img.avif";
import { CONTACT } from "@/lib/constants";

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Global Headquarters",
      value: "Mayfair, London, UK", // Hardcoded specifically for this page layout but could use CONTACT.address
      description: "Visit our central office in Mayfair."
    },
    {
      icon: Phone,
      label: "Direct Concierge",
      value: CONTACT.phone,
      description: "Available 24/7 for immediate assistance."
    },
    {
      icon: Mail,
      label: "Email Inquiries",
      value: CONTACT.email,
      description: "General inquiries and corporate accounts."
    },
    {
      icon: Clock,
      label: "Operational Hours",
      value: "Always Open (24/7)",
      description: "Our fleet and staff operate around the clock."
    },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <MainLayout>
      <Navbar />

      {/* Hero Section – Premium Brand Reveal */}
      <section ref={containerRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Parallax & Dark Overlay */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 select-none">
          <LazyImage
            src={contactBgImg}
            alt="Contact AUSEMPT"
            className="w-full h-full object-cover scale-105"
            containerClassName="h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30" />
          {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80" /> */}
        </motion.div>

        <div className="container-luxury relative z-10 text-center px-4">
          <FadeInSection>
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/60" />
              <span className="text-primary/90 text-[11px] md:text-sm uppercase tracking-[0.4em] font-medium">
                Concierge & Support
              </span>
              <div className="h-px w-12 bg-primary/60" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Let Us Elevate <br className="hidden md:block" />
              Your <span className="text-gradient-gold italic pr-2">Experience</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-10">
              At AUSEMPI, we believe in seamless communication and personalized care. Our team is standing by to ensure your journey is nothing short of perfection.
            </p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-4 pt-8"
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent w-full h-1/2"
                />
              </div>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative py-20 md:py-32 bg-background overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

            {/* LEFT: Contact Information & Branding */}
            <div className="lg:col-span-5 space-y-12 md:sticky md:top-32">
              <FadeInSection>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
                  Whether you're planning a corporate event or a private transfer, our specialists are here to assist with every detail.
                </p>

                <div className="grid gap-6">
                  {contactInfo.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex gap-5 items-start p-5 rounded-sm border border-border/40 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                        <item.icon size={22} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-primary mb-1">{item.label}</h3>
                        <p className="text-foreground text-base md:text-lg font-medium">{item.value}</p>
                        <p className="text-muted-foreground text-xs md:text-sm font-light">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              {/* Social Connect */}
              <FadeInSection delay={0.2} className="pt-8 border-t border-border/30">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* RIGHT: Premium Contact Form */}
            <div className="lg:col-span-7">
              <FadeInSection delay={0.2}>
                <div className="relative">
                  <div className="relative bg-charcoal/40 backdrop-blur-md p-6 sm:p-10 md:p-14 rounded-sm border border-white/10 shadow-2xl">
                    <div className="mb-10">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Send an Inquiry</h3>
                      <p className="text-muted-foreground text-sm md:text-base">Complete the form below and a concierge member will reach out shortly.</p>
                    </div>

                    <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Ex: Alexander Pierce"
                            className="bg-white/[0.03] border-border/30 focus:border-primary/50 focus:ring-0 focus:bg-white/[0.05] transition-all duration-300 h-14 rounded-sm px-5 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="pierce@prestige.com"
                            className="bg-white/[0.03] border-border/30 focus:border-primary/50 focus:ring-0 focus:bg-white/[0.05] transition-all duration-300 h-14 rounded-sm px-5 text-base"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+44 7700 900000"
                            className="bg-white/[0.03] border-border/30 focus:border-primary/50 focus:ring-0 focus:bg-white/[0.05] transition-all duration-300 h-14 rounded-sm px-5 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Inquiry Type</Label>
                          <Select>
                            <SelectTrigger className="bg-white/[0.03] border-border/30 focus:border-primary/50 focus:ring-0 transition-all duration-300 h-14 rounded-sm px-5 text-base">
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-border/20 text-foreground">
                              <SelectItem value="general">General Inquiries</SelectItem>
                              <SelectItem value="airport">Airport Transfers</SelectItem>
                              <SelectItem value="events">Chauffeur Service for Events</SelectItem>
                              <SelectItem value="corporate">Corporate Accounts</SelectItem>
                              <SelectItem value="other">Special Requests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your requirements..."
                          className="min-h-[150px] bg-white/[0.03] border-border/30 focus:border-primary/50 focus:ring-0 focus:bg-white/[0.05] transition-all duration-300 rounded-sm px-5 py-4 text-base resize-none"
                        />
                      </div>

                      <Button variant="gold-cta" size="xl" className="w-full h-14 md:h-16 text-sm md:text-base font-bold tracking-widest uppercase group relative overflow-hidden rounded-sm">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Send Message
                          <Send className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                      </Button>
                    </form>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with Luxury Overlay */}
      <section className="bg-background py-20 md:pb-32">
        <div className="container-luxury">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <FadeInSection>
              <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold block mb-4">Location</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Our Presence</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl font-light">
                Strategically located in the heart of London to serve our elite clientele across the city and beyond.
              </p>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <Button variant="hero-outline" className="group h-12 px-6 text-sm">
                <MapPin className="mr-2 w-4 h-4 text-primary" />
                Get Directions
              </Button>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.2}>
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-sm border border-white/10 overflow-hidden relative shadow-2xl group">
              {/* Styled Map Interface */}
              <div className="absolute inset-0 z-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
                  alt="Map Background"
                  className="w-full h-full object-cover grayscale-[0.5] contrast-[1.1] transition-transform duration-[10s] group-hover:scale-110"
                  containerClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              {/* Map Info Overlay - Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative inline-block mb-6"
                >
                  <div className="absolute -inset-8 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-black/80 backdrop-blur-md border border-primary/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <MapPin className="text-primary" size={32} />
                  </div>
                </motion.div>

                <div className="max-w-[280px] md:max-w-xs mx-auto">
                  <div className="p-6 bg-black/80 backdrop-blur-md rounded-sm border border-white/10 shadow-2xl">
                    <h3 className="font-display text-xl font-bold text-white mb-2">AUSEMPI London</h3>
                    <p className="text-white/60 text-sm mb-4 tracking-wide">123 Luxury Way, Mayfair</p>
                    <div className="h-px w-12 bg-primary/30 mx-auto mb-4" />
                    <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                      <Globe size={12} />
                      Global Reach
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Details Panel (Desktop Only) */}
              <div className="absolute bottom-8 left-8 z-10 hidden lg:block bg-black/90 backdrop-blur-xl p-6 rounded-sm border border-white/10 max-w-xs">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 border-b border-primary/20 pb-3">Quick Facts</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MessageSquare size={16} className="text-primary mt-0.5" />
                    <p className="text-sm text-white/80 font-light">Multilingual staff fluent in 12 languages.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="text-primary mt-0.5" />
                    <p className="text-sm text-white/80 font-light">Immediate fleet deployment within 30 minutes.</p>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default Contact;
