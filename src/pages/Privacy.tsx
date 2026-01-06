import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
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
                Privacy <span className="text-gradient-gold">Policy</span>
              </h1>
              <div className="luxury-divider mx-auto mb-8" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
                Your trust is our most valuable asset. Learn how we protect and manage your personal data with the highest standards of luxury and security.
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
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To provide our premium transportation services, we collect information that identifies you or relates to your travel requirements.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                <li>Personal identifiers (name, email address, phone number).</li>
                <li>Travel details (pickup/drop-off locations, flight numbers, special requests).</li>
                <li>Payment information (processed securely through our PCI-compliant partners).</li>
                <li>Technical data (IP address, browser type, and usage patterns on our website).</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Your information is used exclusively to deliver an exceptional and personalized experience.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                <li>Facilitating and confirming your luxury transport bookings.</li>
                <li>Communicating critical updates regarding your chauffeur and vehicle.</li>
                <li>Personalizing your journey based on previous preferences and requests.</li>
                <li>Ensuring the safety and security of our clients and staff.</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                3. Data Sharing & Third Parties
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We do not sell your personal data. Sharing only occurs with trusted partners essential to our service delivery.
              </p>
              <div className="bg-charcoal-light/50 p-8 border border-white/5 rounded-lg shadow-xl">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Confidentiality Commitment</p>
                <p className="text-muted-foreground italic">
                  "All third-party partners are vetted to ensure they maintain the same rigorous data protection standards as AUXEMPI. Your travel history and personal details remain strictly confidential."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                4. Cookies & Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our website uses cookies to enhance your browsing experience and analyze site performance. You can manage your cookie preferences through your browser settings at any time.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We implement industry-leading technical and organizational measures to protect your data against unauthorized access, loss, or alteration. Our systems are regularly audited for security compliance.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                6. User Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                You maintain full control over your personal information. You have the right to access, rectify, or request the deletion of your data at any time by contacting our privacy team.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                7. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                For any inquiries regarding this Privacy Policy or your personal data, please reach out to our dedicated support team at <span className="text-primary font-medium">privacy@auxempi.com</span>.
              </p>
            </div>

            <div className="pt-10 border-t border-white/10 text-center">
              <p className="text-muted-foreground text-sm italic">
                Last Updated: January 2026. AUXEMPI reserves the right to update this policy to reflect changes in our practices or legal requirements.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </MainLayout>
  );
};

export default Privacy;
