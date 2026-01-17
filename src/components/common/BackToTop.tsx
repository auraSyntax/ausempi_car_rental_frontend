import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--charcoal-light))" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex h-11 w-11 sm:w-12 sm:h-12 items-center justify-center rounded-full border border-gold/20 bg-charcoal text-gold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50",
            "hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          )}
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
