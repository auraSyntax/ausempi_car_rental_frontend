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
      value: "concierge@ausempi.com",
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
      <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511407397940-d57f68e8118a?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Car Interior"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
        </div>

        <div className="container-luxury relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block text-primary text-xs md:text-sm uppercase tracking-[0.5em] font-semibold mb-6 px-4 py-1 border border-primary/20 bg-primary/5 rounded-full backdrop-blur-md">
              Concierge & Support
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
              Let Us Elevate <br />
              Your <span className="text-gradient-gold">Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              At AUSEMPI, we believe in seamless communication and personalized care. Our team is standing by to ensure your journey is nothing short of perfection.
            </p>
          </motion.div>
        </div>

        {/* Subtle Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
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
                      className="group flex gap-6 items-start p-6 rounded-none border border-border/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
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
              <div className="relative">
                {/* Animated Glowing Border Effect */}
                {/* <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" /> */}

                <div className="relative bg-charcoal/50 backdrop-blur-xl p-8 md:p-14 rounded-none border border-white/10 shadow-2xl">
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
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-none px-5 !text-base"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="pierce@prestige.com"
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-none px-5 !text-base"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+44 7700 900000"
                          className="bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 h-14 rounded-none px-5 !text-base"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground ml-1">Inquiry Type</Label>
                        <Select>
                          <SelectTrigger className="bg-white/[0.03] border-border/30 focus:border-primary transition-all duration-300 h-14 rounded-none px-5 text-base">
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
                        className="min-h-[180px] bg-white/[0.03] border-border/30 focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 rounded-none px-5 py-4 text-base resize-none"
                      />
                    </div>

                    <Button variant="gold-cta" size="xl" className="w-full h-14 text-base font-bold tracking-widest uppercase group relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                        <Send className="ml-3 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
            className="w-full h-[600px] rounded-none border border-white/10 overflow-hidden relative shadow-2xl group"
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
              <div className="mt-6 p-6 bg-charcoal/80 backdrop-blur-md rounded-none border border-white/10 shadow-2xl max-w-xs mx-auto">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">AUSEMPI London</h3>
                <p className="text-muted-foreground text-sm mb-4">123 Luxury Way, Mayfair</p>
                <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold tracking-widest uppercase">
                  <Globe size={14} />
                  Serving Worldwide
                </div>
              </div>
            </div>

            {/* Map Details Panel (Desktop Only) */}
            <div className="absolute bottom-10 left-10 z-10 hidden lg:block bg-background/80 backdrop-blur-xl p-8 rounded-none border border-white/10 max-w-sm">
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
