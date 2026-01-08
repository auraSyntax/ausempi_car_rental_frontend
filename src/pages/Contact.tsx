import { motion } from "framer-motion";
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

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Global Headquarters",
      value: "123 Luxury Way, Suite 500, London, UK",
      description: "Visit our central office in Mayfair."
    },
    {
      icon: Phone,
      label: "Direct Concierge",
      value: "+44 (0) 20 7946 0000",
      description: "Available 24/7 for immediate assistance."
    },
    {
      icon: Mail,
      label: "Email Inquiries",
      value: "concierge@auxempi.com",
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
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 lg:pt-24 overflow-hidden">
        {/* Background Image with Cinematic Ken Burns Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Executive Lounge" 
            className="w-full h-full object-cover"
          />
          {/* Layered Overlays for Depth */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
          
          {/* Animated Light Trails / Particles (Optional but luxury) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>

        <div className="container-luxury relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-10 inline-block"
              >
                <span className="relative inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="flex h-2 w-2 rounded-full bg-primary relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  </span>
                  <span className="text-[11px] md:text-xs uppercase tracking-[0.5em] font-bold text-primary-foreground/90">
                    Concierge & Excellence
                  </span>
                </span>
              </motion.div>
              
              <h1 className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground mb-10 leading-[1.1] md:leading-[1] tracking-tight text-balance">
                Your <span className="text-gradient-gold italic">Elite Passage</span> <br className="hidden md:block" />
                Awaits You
              </h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="max-w-3xl mx-auto relative"
              >
                <div className="absolute -left-12 top-0 text-primary/20 hidden lg:block">
                  <span className="text-6xl font-serif">“</span>
                </div>
                <p className="text-lg md:text-2xl text-muted-foreground/90 font-light leading-relaxed mb-12 text-balance">
                  Orchestrating seamless transportation with unparalleled discretion. Experience the pinnacle of luxury travel with AUXEMPI's 24/7 dedicated concierge service.
                </p>
                <div className="absolute -right-12 bottom-0 text-primary/20 hidden lg:block">
                  <span className="text-6xl font-serif">”</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <Button variant="luxury" size="xl" className="min-w-[220px] h-16 text-sm tracking-[0.2em] uppercase font-bold group overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Speak with Concierge
                    <Phone className="ml-3 w-4 h-4 transition-transform group-hover:rotate-12" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
                <Button variant="luxury-outline" size="xl" className="min-w-[220px] h-16 text-sm tracking-[0.2em] uppercase font-bold group">
                  <MapPin className="mr-3 w-4 h-4 text-primary group-hover:animate-bounce" />
                  Our Locations
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Luxury Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-primary/80 via-primary/20 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 80] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.6em] text-primary/50 font-bold ml-1">Scroll</span>
        </motion.div>

        {/* Decorative corner accents */}
        <div className="absolute top-32 left-8 md:left-16 w-12 h-12 border-t-2 border-l-2 border-primary/20 opacity-30" />
        <div className="absolute top-32 right-8 md:right-16 w-12 h-12 border-t-2 border-r-2 border-primary/20 opacity-30" />
      </section>

      {/* Main Content Section */}
      <section className="relative py-24 md:py-40 bg-background overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-[100px] -ml-32 -mb-32" />

        <div className="container-luxury">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* LEFT: Contact Information & Branding */}
            <div className="lg:col-span-5 space-y-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">Contact Information</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                  Whether you're planning a corporate event or a private transfer, our specialists are here to assist with every detail.
                </p>

                <div className="grid sm:grid-cols-1 gap-8">
                  {contactInfo.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 10 }}
                      className="group flex gap-6 items-start p-6 rounded-xl border border-border/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
                        <item.icon className="text-primary" size={26} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-1">{item.label}</h3>
                        <p className="text-foreground text-lg font-medium">{item.value}</p>
                        <p className="text-muted-foreground text-sm font-light">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Connect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pt-8 border-t border-border/30"
              >
                <h3 className="text-sm uppercase tracking-widest font-bold text-foreground mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.href}
                      className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative group">
                {/* Animated Glowing Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative bg-charcoal/40 backdrop-blur-xl p-8 md:p-14 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Send an Inquiry</h2>
                    <p className="text-muted-foreground">Complete the form below and a concierge member will reach out shortly.</p>
                  </div>

                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Ex: Alexander Pierce" 
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-lg px-5 text-lg" 
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="pierce@prestige.com" 
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-lg px-5 text-lg" 
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="+44 7700 900000" 
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-lg px-5 text-lg" 
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Inquiry Type</Label>
                        <Select>
                          <SelectTrigger className="bg-white/[0.03] border-border/30 focus:border-primary transition-all duration-300 h-14 rounded-lg px-5 text-lg">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent className="bg-charcoal border-border text-foreground">
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
                      <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Your Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your requirements..." 
                        className="min-h-[180px] bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 rounded-xl px-5 py-4 text-lg resize-none" 
                      />
                    </div>

                    <Button variant="gold-cta" size="xl" className="w-full h-16 text-lg font-bold tracking-widest uppercase group relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                        <Send className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
                      </span>
                      {/* Button Shine Effect */}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section with Luxury Overlay */}
      <section className="bg-background py-24 md:pb-40">
        <div className="container-luxury">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl font-bold text-foreground mb-4">Our Presence</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Strategically located in the heart of London to serve our elite clientele across the city and beyond.
              </p>
            </motion.div>
            <Button variant="luxury-outline" className="group">
              <MapPin className="mr-2 w-4 h-4 text-primary" />
              Get Directions
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[600px] rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl group"
          >
            {/* Styled Map Interface */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop" 
                alt="Map Background" 
                className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-700" />
            </div>

            {/* Map Info Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative inline-block"
              >
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl" />
                <div className="relative w-16 h-16 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-gold">
                  <MapPin className="text-primary" size={32} />
                </div>
              </motion.div>
              <div className="mt-6 p-6 bg-charcoal/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl max-w-xs mx-auto">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">AUXEMPI London</h3>
                <p className="text-muted-foreground text-sm mb-4">123 Luxury Way, Mayfair</p>
                <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold tracking-widest uppercase">
                  <Globe size={14} />
                  Serving Worldwide
                </div>
              </div>
            </div>

            {/* Map Details Panel (Desktop Only) */}
            <div className="absolute bottom-10 left-10 z-10 hidden lg:block bg-background/80 backdrop-blur-xl p-8 rounded-xl border border-white/10 max-w-sm">
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-4">Quick Facts</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MessageSquare size={18} className="text-primary mt-1" />
                  <p className="text-sm text-foreground">Multilingual staff fluent in 12 languages.</p>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-primary mt-1" />
                  <p className="text-sm text-foreground">Immediate fleet deployment within 30 minutes.</p>
                </li>
                <li className="flex items-start gap-3">
                  <Globe size={18} className="text-primary mt-1" />
                  <p className="text-sm text-foreground">Direct access to London's private jet terminals.</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default Contact;
