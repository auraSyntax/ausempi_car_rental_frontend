import { motion } from "framer-motion";

interface ServiceOverviewProps {
  text: string;
  image: string;
}

export function ServiceOverview({ text, image }: ServiceOverviewProps) {
  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-gold mb-6">Service Overview</h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white">
              {text}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] overflow-hidden rounded-sm group"
          >
            <img
              src={image}
              alt="Service Visual"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
