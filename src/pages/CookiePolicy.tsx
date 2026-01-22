import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { FadeInSection, LazyImage } from "@/components/common";
import { Cookie, Settings, Shield, Info, MousePointer, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import legalPageBgImg from "@/assets/legal-page-bg.avif"

const CookiePolicy = () => {
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
      title: "1. What Are Cookies",
      content: (
        <>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site. At AUSEMPI, we usage cookies to ensure our digital presence matches the quality of our physical service.
          </p>
        </>
      )
    },
    {
      icon: Cookie,
      title: "2. Types of Cookies We Use",
      content: (
        <>
          <p className="mb-6">
            We categorize our cookies into distinct groups to give you full transparency and control:
          </p>
          <div className="space-y-4">
            <div className="bg-white/[0.03] p-6 rounded-sm border-l-2 border-primary group hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={18} className="text-primary" />
                <span className="text-white font-medium text-lg">Essential Cookies</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed pl-7">
                Strictly necessary for the website to function properly. They enable core features such as security, network management, and accessibility. You cannot opt out of these cookies.
              </p>
            </div>
            <div className="bg-white/[0.03] p-6 rounded-sm border-l-2 border-gold group hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <MousePointer size={18} className="text-gold" />
                <span className="text-white font-medium text-lg">Analytics Cookies</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed pl-7">
                Help us understand how visitors interact with our website by collecting and reporting information anonymized. This allows us to improve our user experience continuously.
              </p>
            </div>
            <div className="bg-white/[0.03] p-6 rounded-sm border-l-2 border-primary/50 group hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={18} className="text-primary/50" />
                <span className="text-white font-medium text-lg">Marketing Cookies</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed pl-7">
                Used to track visitors across websites to display ads that are relevant and engaging for the individual user. We partner with trusted premium ad networks only.
              </p>
            </div>
          </div>
        </>
      )
    },
    {
      icon: Settings,
      title: "3. How We Use Cookies",
      content: (
        <>
          <p>
            AUSEMPI uses cookies to enhance your experience. Specifically, we rely on them to:
          </p>
          <ul className="list-none grid sm:grid-cols-2 gap-4 mt-4">
            <li className="flex items-start gap-3 text-sm text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Remember your vehicle preferences and booking criteria.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Keep you securely signed in during your session.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Analyze site traffic to optimize load times and performance.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>Deliver personalized content relevant to your travel needs.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: Settings,
      title: "4. Managing Preferences",
      content: (
        <>
          <p className="mb-6">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager or by amending your browser controls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="luxury-outline"
              className="h-14 px-8 text-sm tracking-widest uppercase hover:bg-primary hover:text-black border-primary text-primary transition-all duration-300"
              onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-preferences"))}
            >
              Open Preference Center
            </Button>
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
              alt="Digital Technology"
              className="w-full h-full object-cover opacity-10"
              containerClassName="h-full w-full absolute inset-0"
            />
          </motion.div>

          <div className="container-luxury relative z-10 text-center px-4">
            <FadeInSection>
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <Cookie size={16} className="text-primary" />
                <span className="text-primary/80 text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                  Digital Experience
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
                Cookie <span className="text-gradient-gold">Policy</span>
              </h1>

              <div className="luxury-divider mx-auto mb-8" />

              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
                Transparency is key. This policy explains how we use cookies to personalize your AUSEMPI experience and your choices regarding them.
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

              <FadeInSection delay={0.5}>
                <div className="bg-charcoal p-8 md:p-10 rounded-sm border border-white/10 mt-12 text-center">
                  <Info size={32} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Browser Settings</h3>
                  <p className="text-white/60 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                    Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutcookies.org</a>.
                  </p>
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

export default CookiePolicy;
