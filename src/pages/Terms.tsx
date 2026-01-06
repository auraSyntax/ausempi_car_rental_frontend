import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <MainLayout>
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="container-luxury relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-display mb-6 tracking-tight">
                Terms & <span className="text-gradient-gold">Conditions</span>
              </h1>
              <div className="luxury-divider mx-auto mb-8" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
                Please read these terms carefully before using the AUXEMPI luxury transportation services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container-luxury max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-gold max-w-none space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                By accessing and using the AUXEMPI website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                2. Service Provision
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                AUXEMPI provides premium transportation services including executive chauffeurs, airport transfers, and bespoke travel solutions. While we strive for perfection, we reserve the right to modify or discontinue any service at our discretion.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                <li>Vehicle types are subject to availability and may be substituted with a comparable or higher class vehicle.</li>
                <li>Punctuality is our priority, but we are not liable for delays caused by circumstances beyond our control (weather, traffic, etc.).</li>
                <li>Our chauffeurs reserve the right to refuse service to any individual exhibiting inappropriate behavior.</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                3. Booking & Payment
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                All bookings must be confirmed through our official platform or authorized channels. Payments are processed securely via our integrated payment systems.
              </p>
              <div className="bg-charcoal-light/50 p-8 border border-white/5 rounded-lg shadow-xl">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Financial Obligations</p>
                <p className="text-muted-foreground italic">
                  "Full payment or a pre-authorized deposit is required to secure any premium reservation. Rates are inclusive of taxes and standard fees unless otherwise specified."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                4. Cancellation Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We understand that plans can change. Our cancellation policy is designed to be fair while ensuring the availability of our fleet for all clients.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                <li>Cancellations made 24 hours prior to service are eligible for a full refund.</li>
                <li>Cancellations within 12-24 hours incur a 50% service fee.</li>
                <li>Cancellations within 12 hours or 'no-shows' are charged at the full rate.</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                5. Liability & Insurance
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                AUXEMPI maintains comprehensive commercial insurance for all vehicles and passengers. Our liability is limited to the extent provided by our insurance coverage.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We are not responsible for personal belongings left in the vehicles, though we will make every effort to assist in their recovery.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                6. Privacy & Data
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Your privacy is paramount. All personal data collected during the booking process is handled in accordance with our Privacy Policy and international data protection standards.
              </p>
            </div>

            <div className="pt-10 border-t border-white/10 text-center">
              <p className="text-muted-foreground text-sm italic">
                Last Updated: January 2026. AUXEMPI reserves the right to update these terms at any time.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </MainLayout>
  );
};

export default Terms;
