import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { FadeInSection, LazyImage } from "@/components/common";
import { Shield, Lock, Eye, Server, Database, UserCheck, Mail } from "lucide-react";
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
      icon: Database,
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            To provide our premium transportation services, we collect information that identifies you or relates to your travel requirements. We are committed to minimizing the data we collect to what is strictly necessary.
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Identity Data: Includes first name, last name, username or similar identifier, and title.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Contact Data: Includes billing address, delivery address, email address, and telephone numbers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Technical Data: Includes internet protocol (IP) address, your login data, browser type and version.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Usage Data: Includes information about how you use our website and services.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: (
        <>
          <p>
            Your information is used exclusively to deliver an exceptional and personalized experience. We process your personal data for the following purposes:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/[0.03] p-4 rounded-sm border-l-2 border-primary">
              <span className="block text-white font-medium mb-1">Service Delivery</span>
              <span className="text-sm text-white/60">Facilitating and confirming your luxury transport bookings.</span>
            </div>
            <div className="bg-white/[0.03] p-4 rounded-sm border-l-2 border-primary">
              <span className="block text-white font-medium mb-1">Personalization</span>
              <span className="text-sm text-white/60">Tailoring your journey based on previous preferences and requests.</span>
            </div>
            <div className="bg-white/[0.03] p-4 rounded-sm border-l-2 border-primary">
              <span className="block text-white font-medium mb-1">Communication</span>
              <span className="text-sm text-white/60">Sending critical updates regarding your chauffeur and vehicle.</span>
            </div>
            <div className="bg-white/[0.03] p-4 rounded-sm border-l-2 border-primary">
              <span className="block text-white font-medium mb-1">Safety & Security</span>
              <span className="text-sm text-white/60">Ensuring the ultimate safety of our clients and staff.</span>
            </div>
          </div>
        </>
      )
    },
    {
      icon: Server,
      title: "3. Data Sharing & Third Parties",
      content: (
        <>
          <p>
            We do not sell your personal data. Sharing only occurs with trusted partners strictly necessary for our service delivery (e.g., payment processors, vetted affiliate partners for global bookings).
          </p>
          <div className="bg-white/[0.03] border border-white/10 p-6 mt-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield size={48} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Confidentiality Commitment</p>
            <p className="text-white/80 italic text-sm leading-relaxed">
              "All third-party partners are strictly vetted to ensure they maintain the same rigorous data protection standards as AUSEMPI. Your travel history and sensitive personal details remain strictly confidential at all times."
            </p>
          </div>
        </>
      )
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content: (
        <>
          <p>
            We implement industry-leading technical and organizational measures to protect your data against unauthorized access, loss, or alteration.
          </p>
          <ul className="list-none space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1"><Shield size={16} /></span>
              <span>All data is encrypted in transit and at rest using enterprise-grade encryption standards.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1"><Shield size={16} /></span>
              <span>Access to personal data is restricted to employees and partners who have a business need to know.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1"><Shield size={16} /></span>
              <span>Regular security audits and vulnerability assessments are conducted on our systems.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: UserCheck,
      title: "5. Your Legal Rights",
      content: (
        <>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data. You maintain full control over your personal information.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {['Access', 'Correction', 'Erasure', 'Restriction'].map((right) => (
              <div key={right} className="text-center p-3 border border-white/10 rounded-sm hover:border-primary/50 hover:bg-white/[0.02] transition-colors">
                <span className="text-xs uppercase tracking-wider text-white/70">{right}</span>
              </div>
            ))}
          </div>
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

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
                Privacy <span className="text-gradient-gold">Policy</span>
              </h1>

              <div className="luxury-divider mx-auto mb-8" />

              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
                Your trust is our most valuable asset. We are dedicated to protecting and managing your personal data with the highest standards of luxury, privacy, and security.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-20 md:py-32 bg-background overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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

              <FadeInSection delay={0.5}>
                <div className="bg-charcoal p-8 md:p-10 rounded-sm border border-white/10 mt-12 text-center">
                  <Mail size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Contact Our Privacy Team</h3>
                  <p className="text-white/60 mb-6 max-w-lg mx-auto">
                    If you have any questions about this privacy policy or our data practices, please contact our Data Protection Officer.
                  </p>
                  <a href="mailto:privacy@ausempi.com" className="inline-flex items-center text-primary hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-primary hover:border-white pb-1">
                    privacy@ausempi.com
                  </a>
                </div>
              </FadeInSection>
            </div>

            <FadeInSection delay={0.6}>
              <div className="mt-20 pt-10 border-t border-white/10 text-center">
                <p className="text-muted-foreground/60 text-sm italic">
                  Last Updated: January 2026. AUSEMPI reserves the right to update this policy to reflect changes in our practices or legal requirements.
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
