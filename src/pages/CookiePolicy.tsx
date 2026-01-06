import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";

const CookiePolicy = () => {
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
                Cookie <span className="text-gradient-gold">Policy</span>
              </h1>
              <div className="luxury-divider mx-auto mb-8" />
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">
                We use cookies to enhance your experience on our website. This policy explains how we use cookies and your choices regarding them.
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
                1. What Are Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                2. Types of Cookies We Use
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    These cookies are necessary for the website to function properly. They enable core features such as security, network management, and accessibility. You cannot opt out of these cookies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    We use these cookies to understand how visitors interact with our website, helping us improve performance and user experience. All data is anonymized.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Marketing Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    These cookies track your activity across websites to deliver more relevant advertisements. They help us measure the effectiveness of our marketing campaigns.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                3. How We Use Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                AUXEMPI uses cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                <li>Remember your preferences and settings.</li>
                <li>Keep you signed in during your session.</li>
                <li>Analyze site traffic and performance.</li>
                <li>Deliver personalized content and advertisements.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                4. Managing Cookie Preferences
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  You can manage your cookie preferences at any time by clicking the button below or by adjusting your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.dispatchEvent(new CustomEvent("open-cookie-preferences"))}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-display uppercase tracking-widest text-sm transition-all duration-300 rounded-sm group"
                  >
                    <span>Manage My Preferences</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                5. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                In some cases, we use cookies provided by trusted third parties, such as Google Analytics, to help us understand how you use the site and ways that we can improve your experience.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display text-primary border-l-4 border-primary pl-6 py-1">
                6. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                If you have any questions about our use of cookies, please contact us at <span className="text-primary font-medium">privacy@auxempi.com</span>.
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

export default CookiePolicy;
