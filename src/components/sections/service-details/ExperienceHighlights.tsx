import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Highlight {
  title: string;
  description: string;
}

interface ExperienceHighlightsProps {
  highlights: Highlight[];
}

export function ExperienceHighlights({ highlights }: ExperienceHighlightsProps) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Experience</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 bg-[#1A1A1A] hover:border-gold/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6">
                <Check className="text-gold w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{highlight.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
