import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import logo from "@/assets/ausempi-logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Mobile App", href: "/#app" },
  { name: "Driver Login", href: "/driver-login", isSecondary: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash scroll when coming from another page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/10"
        : "bg-transparent"
        }`}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
          >
            <motion.img
              src={logo}
              alt="AUSEMPI"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className={`relative text-[0.8rem] uppercase tracking-[0.15em] transition-all duration-300 group ${isActive
                      ? "text-primary font-medium"
                      : link.isSecondary
                        ? "text-muted-foreground/70 hover:text-muted-foreground"
                        : "text-muted-foreground hover:text-primary"
                      }`}
                  >
                    {link.name}
                    {!link.isSecondary && (
                      <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`} />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="luxury" size="lg" className="glow-gold" asChild>
                <a
                  href={EXTERNAL_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve Now
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-foreground p-2 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile/Tablet Menu Overlay - Portalled for robustness */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl lg:hidden flex flex-col"
            >
              {/* Internal Header for Close Button Alignment */}
              <div className="container-luxury h-20 lg:h-24 flex items-center justify-between shrink-0">
                {/* Logo - Matching Navbar */}
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center group focus:outline-none active:outline-none">
                  <img
                    src={logo}
                    alt="AUSEMPI"
                    className="h-12 w-auto object-contain"
                  />
                </Link>

                {/* Close Button */}
                <motion.button
                  className="text-foreground p-2 focus:outline-none active:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-primary" />
                </motion.button>
              </div>

              {/* Scrollable Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="container-luxury py-7 sm:py-8 flex flex-col items-center justify-center min-h-full gap-8">
                  {/* Links */}
                  <div className="flex flex-col items-center gap-6 w-full">
                    {navLinks.map((link, index) => {
                      const isActive = location.pathname === link.href;
                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                          className="w-full text-center"
                        >
                          <Link
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block w-full font-display text-xl sm:text-2xl md:text-3xl py-1.5 sm:py-2 transition-all duration-300 focus:outline-none active:outline-none ${isActive ? "text-primary" : "text-foreground hover:text-primary/70"
                              }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full max-w-xs mt-4"
                  >
                    <Button variant="luxury" size="xl" className="w-full glow-gold h-12 sm:h-14 text-sm sm:text-base sm:text-lg focus:outline-none active:outline-none" asChild>
                      <a href={EXTERNAL_LINKS.booking} target="_blank" rel="noopener noreferrer">Reserve Now</a>
                    </Button>
                  </motion.div>

                  {/* Footer / Contact */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 pt-8 border-t border-white/5 w-full grid grid-cols-2 gap-4 text-center"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary mb-1">Inquiries</p>
                      <a href="tel:+18885550123" className="text-sm hover:text-white transition-colors">+1 (888) 555-0123</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary mb-1">Email</p>
                      <a href="mailto:concierge@ausempi.com" className="text-sm hover:text-white transition-colors">concierge@ausempi.com</a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
};

export default Navbar;
