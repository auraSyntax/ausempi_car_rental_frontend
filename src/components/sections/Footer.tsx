import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook, ArrowUpRight, ArrowRight } from "lucide-react";
import { BRAND, CONTACT, EXTERNAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ],
  services: [
    { name: "Airport Transfers", href: "/#services" },
    { name: "Corporate Travel", href: "/#services" },
    { name: "Special Events", href: "/#services" },
    { name: "Hourly Charters", href: "/#services" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: EXTERNAL_LINKS.instagram },
  { name: "Twitter", icon: Twitter, href: EXTERNAL_LINKS.twitter },
  { name: "LinkedIn", icon: Linkedin, href: EXTERNAL_LINKS.linkedin },
  { name: "Facebook", icon: Facebook, href: EXTERNAL_LINKS.facebook },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Footer CTA Section */}
      <div className="relative z-10 border-b border-border/20">
        <div className="bg-gradient-to-r from-charcoal via-charcoal-light/50 to-charcoal">
          <div className="container-luxury py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="text-center lg:text-left max-w-2xl">
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Elevate Your <span className="text-gradient-gold italic">Journey</span> Beyond Limits
                </h3>
                <p className="text-muted-foreground text-lg md:text-xl font-light">
                  Experience the pinnacle of luxury transportation. Your elite chauffeur is just a click away.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0"
              >
                <Button
                  variant="gold-cta"
                  size="xl"
                  className="group px-10 py-8 text-lg rounded-none border border-primary/30 relative overflow-hidden"
                  asChild
                >
                  <a
                    href={EXTERNAL_LINKS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Secure Your Reservation
                      <ArrowRight 
                        size={22} 
                        className="transition-transform duration-500 group-hover:translate-x-2" 
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-luxury pt-20 pb-12 lg:pt-32 lg:pb-16 relative z-10">
        {/* Background Decorative Text */}
        {/* <div className="absolute top-40 left-0 bottom-0 w-full flex justify-center opacity-[0.02] leading-loose pointer-events-none select-none overflow-visible">
          <span className="text-[15vw] font-display font-bold tracking-[0.2em] whitespace-nowrap">
            {BRAND.name}
          </span>
        </div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20 relative z-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-block group">
                <span className="text-3xl md:text-4xl font-display font-bold tracking-[0.4em] text-gradient-gold transition-all duration-500 group-hover:tracking-[0.45em]">
                  {BRAND.name}
                </span>
              </Link>
              <p className="text-muted-foreground mt-8 text-base leading-relaxed max-w-sm font-light italic">
                "{BRAND.description}. We define the standard of excellence in every mile, ensuring your journey is as distinguished as your destination."
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-10">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-border/40 bg-secondary/20 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-500 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -5, backgroundColor: "rgba(var(--primary-rgb), 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-display text-xs font-bold text-foreground mb-8 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-primary/50" />
                Explore
              </h4>
              <ul className="space-y-4">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-light inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary/50" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-display text-xs font-bold text-foreground mb-8 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-primary/50" />
                Offerings
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-light inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary/50" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-display text-xs font-bold text-foreground mb-8 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-6 h-px bg-primary/50" />
                Concierge
              </h4>
              <ul className="space-y-6">
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="flex items-center gap-5 text-muted-foreground hover:text-primary transition-all duration-500 group"
                  >
                    <div className="w-12 h-12 rounded-none border border-border/40 bg-secondary/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                      <Phone size={18} className="text-primary/70 group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">Direct Line</span>
                      <span className="text-sm font-medium tracking-wider">{CONTACT.phone}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-5 text-muted-foreground hover:text-primary transition-all duration-500 group"
                  >
                    <div className="w-12 h-12 rounded-none border border-border/40 bg-secondary/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                      <Mail size={18} className="text-primary/70 group-hover:text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">Electronic Mail</span>
                      <span className="text-sm font-medium tracking-wider lowercase">{CONTACT.email}</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-none border border-border/40 bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary/70" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">Headquarters</span>
                    <span className="text-sm font-light leading-relaxed text-muted-foreground italic">
                      {CONTACT.address}
                    </span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px w-full overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
            initial={{ left: "-100%" }}
            whileInView={{ left: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center lg:items-start gap-2"
          >
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.25em] font-medium">
              © {currentYear} {BRAND.name} International
            </p>
            <p className="text-muted-foreground/40 text-[9px] uppercase tracking-[0.1em]">
              Architected for distinction
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground/60 hover:text-primary transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
