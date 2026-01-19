import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Cookie, ShieldCheck, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "ausempi_cookie_consent";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      setPreferences(JSON.parse(savedConsent));
    }

    // Event listener for opening preferences from footer
    const handleOpenPreferences = () => setShowPreferences(true);
    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    savePreferences(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false };
    savePreferences(onlyEssential);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setIsVisible(false);
    setShowPreferences(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !showPreferences && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-[calc(100vw-3rem)] md:w-full md:max-w-lg pointer-events-auto"
          >
            <div className="bg-charcoal/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden relative group ring-1 ring-white/5">
              {/* Premium Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />

              <div className="p-5 md:p-6 relative">
                <div className="flex items-start gap-5 mb-8">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <div className="relative p-3.5 bg-charcoal-light border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors duration-500">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-display text-white mb-3 leading-tight tracking-tight">
                      Premium <span className="text-primary">Experience</span>
                    </h3>
                    <p className="text-[0.95rem] text-white/50 font-body leading-relaxed">
                      To provide the elite service you expect, we use cookies to personalize your journey.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold tracking-[0.15em] h-12 rounded-xl transition-all duration-500 shadow-lg shadow-primary/5 group/btn overflow-hidden relative text-sm"
                  >
                    <span className="relative z-10">ACCEPT ALL COOKIES</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={handleRejectNonEssential}
                      className="border-white/10 hover:bg-white/5 hover:border-white/20 text-white/70 hover:text-white  text-[11px] font-bold uppercase tracking-[0.2em] h-12 rounded-xl transition-all duration-300"
                    >
                      ESSENTIAL
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPreferences(true)}
                      className="border-white/10 hover:bg-white/5 hover:border-white/20 text-white/70 hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] h-12 rounded-xl transition-all duration-300"
                    >
                      PREFERENCES
                    </Button>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                  <Link
                    to="/cookies"
                    className="text-[10px] uppercase tracking-[0.25em] text-white/30 hover:text-primary transition-all duration-300 font-bold"
                  >
                    Cookie Policy
                  </Link>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-white/20" />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-white/20 font-medium">Secured by Ausempi</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="bg-charcoal border-white/10 text-white max-w-xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto !rounded-3xl  p-0 shadow-2xl custom-scrollbar border-none ring-1 ring-white/10">
          <div className="relative">
            {/* Header background decoration */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <button
              onClick={() => setShowPreferences(false)}
              className="absolute top-6 right-6 p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 z-50 group"
            >
              <X className="w-5 h-5 text-white/40 group-hover:text-white" />
            </button>

            <DialogHeader className="p-6 md:p-8 pb-8 relative text-left">
              <DialogTitle className="text-2xl md:text-3xl font-display text-white mb-6">
                Cookie <span className="text-primary">Preferences</span>
              </DialogTitle>
              <DialogDescription className="text-white/50 text-base font-body leading-relaxed max-w-md">
                Choose which cookies you allow us to use. Core functional cookies are always enabled to ensure site security.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 md:px-8 space-y-4 relative">
              <div className="space-y-3">
                {/* Essential */}
                <div className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-white/10 hover:bg-white/10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm sm:text-base font-semibold text-white tracking-wide">Essential Cookies</p>
                      <p className="text-xs text-white/40 leading-relaxed font-body">Required for core functionality and security.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Always On</span>
                    <Switch checked={true} disabled className="data-[state=checked]:bg-primary opacity-50" />
                  </div>
                </div>

                {/* Analytics */}
                <div
                  className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-primary/20 hover:bg-white/10 cursor-pointer"
                  onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                      <BarChart3 className={`w-6 h-6 transition-colors ${preferences.analytics ? 'text-primary' : 'text-white/40'}`} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm sm:text-base font-semibold text-white tracking-wide">Performance & Analytics</p>
                      <p className="text-xs text-white/40 leading-relaxed font-body">Helps us measure site traffic and optimize features.</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                    className="data-[state=checked]:bg-primary pointer-events-none"
                  />
                </div>

                {/* Marketing */}
                <div
                  className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-primary/20 hover:bg-white/10 cursor-pointer"
                  onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                      <Target className={`w-6 h-6 transition-colors ${preferences.marketing ? 'text-primary' : 'text-white/40'}`} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm sm:text-base font-semibold text-white tracking-wide">Targeting & Marketing</p>
                      <p className="text-xs text-white/40 leading-relaxed font-body">Enables personalized content and tailored offers.</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                    className="data-[state=checked]:bg-primary pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-10 md:pt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 relative">
              <Button
                onClick={() => savePreferences(preferences)}
                className="sm:flex-[2] bg-primary hover:bg-primary/90 text-black font-bold tracking-[0.15em] h-11 sm:h-12 rounded-xl transition-all duration-500 shadow-xl shadow-primary/10 relative overflow-hidden group/btn text-[13px]"
              >
                <span className="relative z-10">SAVE PREFERENCES</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptAll}
                className="sm:flex-1 border-white/10 hover:bg-primary/5 hover:border-primary/20 text-white hover:text-primary font-bold tracking-[0.15em] h-11 sm:h-12 rounded-xl transition-all duration-300 text-[13px]"
              >
                ACCEPT ALL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
