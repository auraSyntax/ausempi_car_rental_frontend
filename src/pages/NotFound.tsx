
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Home, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.1] grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

        {/* Abstract '404' as texture */}
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden opacity-[0.03] pointer-events-none">
          <span className="text-[40vw] font-display font-bold text-white leading-none tracking-tighter">
            404
          </span>
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9v4o7z/image/upload/v1706110000/grain-texture_q9x9x9.png')]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-luxury px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary"
          >
            <Compass strokeWidth={1} className="w-10 h-10 md:w-12 md:h-12 animate-[spin_10s_linear_infinite]" />
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Destination <span className="text-gradient-gold block">Unknown</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-light mb-12 leading-relaxed max-w-2xl mx-auto">
            It seems you have ventured off our mapped routes. Let us guide you back to the luxury you deserve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Button variant="luxury" size="xl" asChild className="w-full sm:w-auto min-w-[200px] text-sm">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Return Home
              </Link>
            </Button>

            <Button variant="luxury-outline" size="xl" asChild className="w-full sm:w-auto min-w-[200px] text-sm">
              <Link to="/services">
                <ArrowLeft className="mr-2 h-4 w-4 rotate-180" /> View Our Fleet
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Compass Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/50" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-white/30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full border border-white/10 border-dashed" />
      </div>
    </div>
  );
};

export default NotFound;
