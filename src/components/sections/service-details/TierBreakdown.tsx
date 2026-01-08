import { motion } from "framer-motion";

export function TierBreakdown() {
  const tiers = [
    {
      name: "Premium Tier",
      description: "Exceptional comfort for every journey.",
      features: ["Leather Seating", "Climate Control", "Professional Chauffeur", "Standard Amenities"],
      highlight: false
    },
    {
      name: "Luxury Tier",
      description: "The ultimate expression of luxury travel.",
      features: ["Premium Leather", "Extended Legroom", "Elite Chauffeur", "Enhanced Amenities", "Privacy Partition"],
      highlight: true
    }
  ];

  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Service Tiers</h2>
          <p className="text-gray-400 font-light">Choose the level of luxury that suits your needs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-10 border ${tier.highlight ? 'border-gold/50 bg-gold/5' : 'border-white/5 bg-black/20'} relative overflow-hidden`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-gold text-black text-[10px] uppercase tracking-widest py-1 px-4 font-bold">
                  Recommended
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-4 ${tier.highlight ? 'text-gold' : 'text-white'}`}>{tier.name}</h3>
              <p className="text-gray-400 mb-8 font-light">{tier.description}</p>
              <ul className="space-y-4">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 font-light text-sm">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
