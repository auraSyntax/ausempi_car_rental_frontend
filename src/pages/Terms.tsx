import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { FadeInSection, LazyImage } from "@/components/common";
import { FileText, ShieldCheck, CreditCard, AlertCircle, Clock, Lock, User, Info, DollarSign, CalendarX, Briefcase, Gavel, History, Mail } from "lucide-react";
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
      icon: Info,
      title: "1. Introduction",
      content: (
        <>
          <p className="mb-4">
            AUSEMPI Pty Ltd ("AUSEMPI", "we", "our", or "us") provides premium chauffeur, mobility, and related services. These Terms & Conditions govern all bookings, services, and interactions with AUSEMPI, including use of our website, platforms, and applications.
          </p>
          <p>
            By making a booking or using our services, you agree to be bound by these Terms & Conditions.
          </p>
        </>
      )
    },
    {
      icon: Briefcase,
      title: "2. Services",
      content: (
        <p>
          AUSEMPI provides premium chauffeur and mobility services delivered by independent contractor drivers or approved partners. Service availability is subject to vehicle availability, location, compliance requirements, and operational conditions.
        </p>
      )
    },
    {
      icon: CreditCard,
      title: "3. Bookings & Payments",
      content: (
        <>
          <p className="mb-4">
            Bookings may be made via our website, applications, or authorised channels. All prices are quoted in Australian dollars unless otherwise stated.
          </p>
          <p>
            Payment terms, including deposits, pre-authorisations, or full prepayment, may apply depending on the service type.
          </p>
        </>
      )
    },
    {
      icon: DollarSign,
      title: "4. Pricing & Charges",
      content: (
        <p>
          Pricing is governed by AUSEMPI’s Board-approved pricing frameworks. Additional charges may apply for tolls, extended waiting time, special requests, or changes outside standard service scope.
        </p>
      )
    },
    {
      icon: CalendarX,
      title: "5. Cancellations & Amendments",
      content: (
        <p>
          Cancellation and amendment terms vary by service type and will be disclosed at the time of booking. Late cancellations or no-shows may incur fees.
        </p>
      )
    },
    {
      icon: User,
      title: "6. Chauffeurs & Vehicles",
      content: (
        <p>
          Drivers operate as independent contractors and are required to meet AUSEMPI’s training, compliance, and presentation standards. AUSEMPI does not guarantee a specific driver or vehicle unless expressly agreed in writing.
        </p>
      )
    },
    {
      icon: ShieldCheck,
      title: "7. Client Obligations",
      content: (
        <p>
          Clients must provide accurate booking information and comply with lawful instructions during service. Unsafe, unlawful, or abusive behaviour may result in immediate termination of service without refund.
        </p>
      )
    },
    {
      icon: AlertCircle,
      title: "8. Liability",
      content: (
        <p>
          To the maximum extent permitted by law, AUSEMPI limits its liability for loss, damage, or delay caused by events beyond reasonable control. Nothing in these Terms excludes rights under Australian Consumer Law.
        </p>
      )
    },
    {
      icon: Lock,
      title: "9. Privacy",
      content: (
        <p>
          Personal information is handled in accordance with the AUSEMPI Privacy Policy, available on our website.
        </p>
      )
    },
    {
      icon: Clock,
      title: "10. Force Majeure",
      content: (
        <p>
          AUSEMPI is not liable for failure or delay caused by events beyond its reasonable control, including natural disasters, strikes, or government restrictions.
        </p>
      )
    },
    {
      icon: Gavel,
      title: "11. Governing Law",
      content: (
        <p>
          These Terms & Conditions are governed by the laws of New South Wales, Australia.
        </p>
      )
    },
    {
      icon: History,
      title: "12. Changes to Terms",
      content: (
        <p>
          AUSEMPI may update these Terms & Conditions from time to time. Updated terms apply upon publication.
        </p>
      )
    },
    {
      icon: Mail,
      title: "13. Contact",
      content: (
        <>
          <p className="font-bold text-white mb-2">AUSEMPI Pty Ltd</p>
          <a href="mailto:info@coxempire.com" className="inline-flex items-center text-primary hover:text-white transition-colors tracking-widest text-sm sm:text-base font-bold border-b border-primary hover:border-white pb-1">
            info@coxempire.com
          </a>
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-10 border-t border-white/10 pt-8 sm:border-none sm:pt-0">
                <div className="flex flex-col items-center">
                  <span className="text-primary/80 text-[10px] uppercase tracking-[0.2em] font-medium mb-1">Effective Date</span>
                  <span className="text-white font-display text-lg">25/01/2026</span>
                </div>

                <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                <div className="flex flex-col items-center">
                  <span className="text-primary/80 text-[10px] uppercase tracking-[0.2em] font-medium mb-1">Last Reviewed</span>
                  <span className="text-white font-display text-lg">25/01/2026</span>
                </div>
              </div>
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

                    <div className="flex items-center gap-4 mb-4">
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
                  Last Updated: 25/01/2026. AUSEMPI reserves the right to update these terms at any time.
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
