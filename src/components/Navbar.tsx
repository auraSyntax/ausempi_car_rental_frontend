import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Fleet", href: "#fleet" },
  { name: "Experience", href: "#experience" },
  { name: "App", href: "#app" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-2xl lg:text-3xl font-display font-bold tracking-[0.3em] text-foreground">
              AUXEMPI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="luxury" size="lg" asChild>
              <a
                href="https://allriders.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reserve Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <div className="container-luxury py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="luxury" size="lg" className="mt-4" asChild>
                <a
                  href="https://allriders.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
