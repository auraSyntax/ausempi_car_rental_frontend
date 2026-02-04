import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { FadeInSection, LazyImage } from "@/components/common";
import { Lock, Eye, Server, Database, UserCheck, Mail, Globe, Cookie, AlertCircle, History, Info } from "lucide-react";
import legalPageBgImg from "@/assets/legal-page-bg.avif"

const Privacy = () => {
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
            AUSEMPI Pty Ltd ("AUSEMPI", "we", "our", or "us") is committed to protecting the privacy, confidentiality, and security of personal information entrusted to us.
          </p>
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, disclose, store, and protect personal information when you:
          </p>
          <ul className="list-none space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Visit our website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Use our booking platforms or applications</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Engage our chauffeur, enterprise, or related services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Interact with us as a client, contractor, partner, or website visitor</span>
            </li>
          </ul>
          <p>
            AUSEMPI operates as part of the Coxempire Holdings group and complies with applicable Australian privacy laws, including the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
        </>
      )
    },
    {
      icon: Database,
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-4">We may collect personal information including, but not limited to:</p>
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Personal identification information (name, contact details, billing details)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Service and booking information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Technical and website usage information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Driver and contractor compliance information where required</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: Eye,
      title: "3. How We Use Personal Information",
      content: (
        <p>
          Personal information is used to deliver services, process bookings, ensure compliance, improve our platforms, and meet legal obligations. We do not sell personal information.
        </p>
      )
    },
    {
      icon: Server,
      title: "4. Disclosure of Information",
      content: (
        <p>
          Information may be shared with chauffeurs, service partners, technology providers, professional advisers, or government authorities where legally required.
        </p>
      )
    },
    {
      icon: Lock,
      title: "5. Data Storage & Security",
      content: (
        <p>
          Reasonable steps are taken to protect information from misuse, loss, or unauthorised access. Data is securely stored and destroyed when no longer required.
        </p>
      )
    },
    {
      icon: Globe,
      title: "6. International Data Transfers",
      content: (
        <p>
          Where data is stored or processed overseas, reasonable steps are taken to ensure equivalent privacy protections.
        </p>
      )
    },
    {
      icon: Cookie,
      title: "7. Cookies & Analytics",
      content: (
        <p>
          Cookies and analytics tools may be used to improve website functionality and user experience.
        </p>
      )
    },
    {
      icon: UserCheck,
      title: "8. Access & Correction",
      content: (
        <p>
          Individuals may request access to or correction of their personal information.
        </p>
      )
    },
    {
      icon: AlertCircle,
      title: "9. Complaints",
      content: (
        <p>
          Privacy complaints may be lodged directly with AUSEMPI. Unresolved complaints may be escalated to the OAIC.
        </p>
      )
    },
    {
      icon: History,
      title: "10. Changes to This Policy",
      content: (
        <p>
          This policy may be updated periodically. Updates take effect upon publication.
        </p>
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
              alt="Digital Security"
              className="w-full h-full object-cover opacity-10"
              containerClassName="h-full w-full absolute inset-0"
            />
          </motion.div>

          <div className="container-luxury relative z-10 text-center px-4">
            <FadeInSection>
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <Lock size={16} className="text-primary" />
                <span className="text-primary/80 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                  Data Protection
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
                Privacy <span className="text-gradient-gold">Policy</span>
              </h1>

              <div className="luxury-divider mx-auto mb-8" />

              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
                Your trust is our most valuable asset. We are dedicated to protecting and managing your personal data with the highest standards of luxury, privacy, and security.
              </p>

              <div className="flex flex-row items-center justify-around sm:justify-center gap-6 sm:gap-12 mt-10 border-t border-white/10 pt-8 sm:border-none sm:pt-0">
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
        <section className="relative py-20 bg-background overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="container-luxury max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <FadeInSection key={idx} delay={idx * 0.1}>
                  <div className="group relative pl-8 md:pl-12 border-l border-white/10 hover:border-primary/50 transition-colors duration-500">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-charcoal border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-primary/80 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                        <section.icon size={20} />
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {section.title}
                      </h2>
                    </div>

                    <div className="text-muted-foreground leading-relaxed text-base font-light">
                      {section.content}
                    </div>
                  </div>
                </FadeInSection>
              ))}

              <FadeInSection delay={0.5}>
                <div className="bg-charcoal p-8 md:p-10 rounded-sm border border-white/10 mt-12 text-center">
                  <Mail size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">11. Contact Us</h3>
                  <p className="text-white/60 mb-6 max-w-lg mx-auto">
                    AUSEMPI Pty Ltd
                  </p>
                  <a href="mailto:info@coxempire.com" className="inline-flex items-center text-primary hover:text-white transition-colors tracking-widest text-sm sm:text-base font-bold border-b border-primary hover:border-white pb-1">
                    info@coxempire.com
                  </a>
                </div>
              </FadeInSection>
            </div>

            <FadeInSection delay={0.6}>
              <div className="mt-20 pt-10 border-t border-white/10 text-center">
                <p className="text-muted-foreground/60 text-sm italic">
                  Last Updated: 25/01/2026. AUSEMPI reserves the right to update this policy to reflect changes in our practices or legal requirements.
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

export default Privacy;
