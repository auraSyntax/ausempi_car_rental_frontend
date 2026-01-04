import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { BRAND, CONTACT, EXTERNAL_LINKS } from "@/lib/constants";

const footerLinks = {
  navigation: [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Airport Transfers", href: "#services" },
    { name: "Corporate Travel", href: "#services" },
    { name: "Special Events", href: "#services" },
    { name: "Hourly Charters", href: "#services" },
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
    <footer id="contact" className="bg-charcoal relative overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-luxury pt-20 pb-12 lg:pt-28 lg:pb-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-3xl font-display font-bold tracking-[0.3em] text-gradient-gold">
                {BRAND.name}
              </span>
              <p className="text-muted-foreground mt-6 text-sm leading-relaxed max-w-xs">
                {BRAND.description}. Experience excellence with every journey. Where distinction meets destination.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-sm bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
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
              <h4 className="font-display text-sm font-semibold text-foreground mb-6 uppercase tracking-[0.2em]">
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
              <h4 className="font-display text-sm font-semibold text-foreground mb-6 uppercase tracking-[0.2em]">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
              <h4 className="font-display text-sm font-semibold text-foreground mb-6 uppercase tracking-[0.2em]">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-sm bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone size={16} className="text-primary" />
                    </span>
                    <span className="text-sm">{CONTACT.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="w-10 h-10 rounded-sm bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail size={16} className="text-primary" />
                    </span>
                    <span className="text-sm">{CONTACT.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-sm bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </span>
                  <span className="text-sm text-muted-foreground pt-2">
                    {CONTACT.address}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-xs uppercase tracking-[0.15em]"
          >
            © {currentYear} {BRAND.name}. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.1em]"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
