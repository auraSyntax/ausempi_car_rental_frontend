import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";
import { FadeInSection, LazyImage } from "@/components/common";
import { FileText, ShieldCheck, CreditCard, AlertCircle, Clock, Lock } from "lucide-react";
import legalPageBgImg from "@/assets/legal-page-bg.avif"

const Terms = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const sections = [
    {
      icon: ShieldCheck,
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
            By accessing and using the AUSEMPI website and services, you agree to be bound by these Terms and Conditions. This agreement constitutes a legally binding contract between you and AUSEMPI. If you do not agree with any part of these terms, you must not use our services.
          </p>
          <p className="mt-4">
            We reserve the right to amend these terms at any time. Continued use of our services following any changes indicates your acceptance of the new terms.
          </p>
        </>
      )
    },
    {
      icon: Clock,
      title: "2. Service Provision",
      content: (
        <>
          <p>
            AUSEMPI provides premium transportation services including executive chauffeurs, airport transfers, and bespoke travel solutions. While we strive for perfection, we reserve the right to modify or discontinue any service at our discretion.
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Vehicle types are subject to availability and may be substituted with a comparable or higher class vehicle ensures your journey continues without interruption.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Punctuality is our priority, but we are not liable for delays caused by circumstances beyond our control (weather, traffic, road closures).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Our chauffeurs reserve the right to refuse service to any individual exhibiting inappropriate behavior or posing a safety risk.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: CreditCard,
      title: "3. Booking & Payment",
      content: (
        <>
          <p>
            All bookings must be confirmed through our official platform or authorized channels. Payments are processed securely via our integrated payment systems. We accept major credit cards and corporate account transfers.
          </p>
          <div className="bg-white/[0.03] border-l-2 border-primary p-6 mt-6 rounded-r-sm">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Financial Obligations</p>
            <p className="text-white/80 italic text-sm leading-relaxed">
              "Full payment or a pre-authorized deposit is required to secure any premium reservation. Rates are inclusive of taxes and standard fees unless otherwise specified. gratuities are discretionary but appreciated."
            </p>
          </div>
        </>
      )
    },
    {
      icon: AlertCircle,
      title: "4. Cancellation Policy",
      content: (
        <>
          <p>
            We understand that plans can change. Our cancellation policy is designed to be fair while ensuring the availability of our fleet for all clients. Please review the tiers below:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-charcoal p-4 rounded-sm border border-white/10 text-center">
              <span className="block text-primary font-display text-xl mb-1">24+ Hours</span>
              <span className="text-xs text-white/60 uppercase tracking-wider">Full Refund</span>
            </div>
            <div className="bg-charcoal p-4 rounded-sm border border-white/10 text-center">
              <span className="block text-gold font-display text-xl mb-1">12-24 Hours</span>
              <span className="text-xs text-white/60 uppercase tracking-wider">50% Fee</span>
            </div>
            <div className="bg-charcoal p-4 rounded-sm border border-white/10 text-center">
              <span className="block text-red-400 font-display text-xl mb-1">&lt; 12 Hours</span>
              <span className="text-xs text-white/60 uppercase tracking-wider">No Refund</span>
            </div>
          </div>
        </>
      )
    },
    {
      icon: ShieldCheck,
      title: "5. Liability & Insurance",
      content: (
        <>
          <p>
            AUSEMPI maintains comprehensive commercial insurance for all vehicles and passengers. Our liability is limited to the extent provided by our insurance coverage. We prioritize passenger safety above all else.
          </p>
          <p className="mt-4">
            We are not responsible for personal belongings left in the vehicles, though we will make every effort to assist in their recovery. Clients are responsible for any damage caused to the vehicle interior beyond normal wear and tear.
          </p>
        </>
      )
    },
    {
      icon: Lock,
      title: "6. Privacy & Data",
      content: (
        <>
          <p>
            Your privacy is paramount. All personal data collected during the booking process is handled in accordance with our Privacy Policy and international data protection standards. We do not sell or share your personal information with third parties for marketing purposes.
          </p>
        </>
      )
    }
  ];

  return (
    <MainLayout>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section ref={containerRef} className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            {/* Abstract/Dark Background for Legal Pages */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/20 via-[#050505]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505]/80 z-10" />

            <LazyImage
              src={legalPageBgImg}
              alt="Legal Documents"
              className="w-full h-full object-cover opacity-10"
              containerClassName="h-full w-full absolute inset-0"
            />
          </motion.div>

          <div className="container-luxury relative z-10 text-center px-4">
            <FadeInSection>
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <FileText size={16} className="text-primary" />
                <span className="text-primary/80 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                  Legal Documentation
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
                Terms <span className="text-gradient-gold">&</span> Conditions
              </h1>

              <div className="luxury-divider mx-auto mb-8" />

              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
                Please read these terms carefully. They define the agreement between you and AUSEMPI regarding your use of our premium luxury transportation services.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-20 md:py-32 bg-background overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="container-luxury max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-16">
              {sections.map((section, idx) => (
                <FadeInSection key={idx} delay={idx * 0.1}>
                  <div className="group relative pl-8 md:pl-12 border-l border-white/10 hover:border-primary/50 transition-colors duration-500">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-charcoal border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-primary/80 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                        <section.icon size={20} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {section.title}
                      </h2>
                    </div>

                    <div className="text-muted-foreground leading-relaxed text-base md:text-lg font-light">
                      {section.content}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection delay={0.4}>
              <div className="mt-20 pt-10 border-t border-white/10 text-center">
                <p className="text-muted-foreground/60 text-sm italic">
                  Last Updated: January 2026. AUSEMPI reserves the right to update these terms at any time without prior notice.
                </p>
                <p className="mt-4 text-xs text-muted-foreground/40 uppercase tracking-widest">
                  &copy; 2026 AUSEMPI Luxury Transport. All Rights Reserved.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </MainLayout>
  );
};

export default Terms;
