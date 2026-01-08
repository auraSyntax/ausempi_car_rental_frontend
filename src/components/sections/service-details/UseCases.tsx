import { motion } from "framer-motion";
import { Plane, Building2, PartyPopper, Map } from "lucide-react";

export function UseCases() {
  const cases = [
    { title: "Airport Transfers", icon: Plane, description: "Seamless travel to and from major airports." },
    { title: "Corporate Travel", icon: Building2, description: "Professional transport for executives and business events." },
    { title: "Special Occasions", icon: PartyPopper, description: "Elevate your weddings, galas, and celebrations." },
    { title: "Long-Distance", icon: Map, description: "Comfortable inter-city travel with premium service." },
  ];

  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ideal Use Cases</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                <item.icon className="text-gold w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
