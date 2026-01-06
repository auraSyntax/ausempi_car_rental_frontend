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

const COOKIE_CONSENT_KEY = "auxempi_cookie_consent";

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
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 p-4 md:p-8 z-[100] pointer-events-none"
        >
          <div className="container-luxury max-w-7xl mx-auto flex justify-center md:justify-end">
            <div className="pointer-events-auto w-full md:max-w-lg bg-charcoal-light/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative group">
              {/* Subtle gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
              
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                    <div className="relative p-3 bg-charcoal border border-primary/20 rounded-xl">
                      <Cookie className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display text-white mb-2 leading-tight">
                      Experience Tailored <span className="text-primary">Luxury</span>
                    </h3>
                    <p className="text-sm text-white/60 font-body leading-relaxed">
                      We use cookies to curate a personalized experience for you. By accepting, you agree to our use of analytics and marketing tools.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAcceptAll}
                    className="flex-1 bg-primary hover:bg-primary/90 text-black font-semibold tracking-wider h-12 rounded-xl transition-all duration-300 shadow-lg shadow-primary/10 group overflow-hidden relative"
                  >
                    <span className="relative z-10">ACCEPT ALL</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                  <div className="flex gap-2 sm:flex-1">
                    <Button 
                      variant="outline"
                      onClick={handleRejectNonEssential}
                      className="flex-1 border-white/10 hover:bg-white/5 text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] h-12 rounded-xl transition-all duration-300"
                    >
                      ESSENTIAL
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setShowPreferences(true)}
                      className="flex-1 hover:bg-white/5 text-white/40 hover:text-white text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] h-12 rounded-xl transition-all duration-300"
                    >
                      MANAGE
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/cookies" 
                    className="text-[10px] uppercase tracking-widest text-white/30 hover:text-primary transition-colors"
                  >
                    View Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
      <DialogContent className="bg-charcoal border-white/10 text-white max-w-xl sm:rounded-3xl p-0 overflow-hidden shadow-2xl">
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPreferences(false)}
            className="text-white/40 hover:text-white hover:bg-white/5 rounded-full h-10 w-10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative">
          {/* Header background decoration */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          
          <DialogHeader className="p-8 md:p-12 pb-6 relative">
            <DialogTitle className="text-3xl md:text-4xl font-display text-white mb-3">
              Cookie <span className="text-primary">Preferences</span>
            </DialogTitle>
            <DialogDescription className="text-white/50 text-base font-body leading-relaxed max-w-md">
              Choose which cookies you allow us to use. Core functional cookies are always enabled to ensure site security.
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 md:px-12 pb-10 space-y-4 relative">
            <div className="space-y-3">
              {/* Essential */}
              <div className="flex items-center justify-between gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-white/10 hover:bg-white/10">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white tracking-wide">Essential Cookies</p>
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
                className="flex items-center justify-between gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-primary/20 hover:bg-white/10 cursor-pointer"
                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <BarChart3 className={`w-6 h-6 transition-colors ${preferences.analytics ? 'text-primary' : 'text-white/40'}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white tracking-wide">Performance & Analytics</p>
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
                className="flex items-center justify-between gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 group transition-all duration-300 hover:border-primary/20 hover:bg-white/10 cursor-pointer"
                onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <Target className={`w-6 h-6 transition-colors ${preferences.marketing ? 'text-primary' : 'text-white/40'}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white tracking-wide">Targeting & Marketing</p>
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

          <div className="p-8 md:p-12 pt-0 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => savePreferences(preferences)}
              className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold tracking-[0.1em] h-14 rounded-xl transition-all duration-300 shadow-xl shadow-primary/20"
            >
              SAVE SETTINGS
            </Button>
            <Button 
              variant="outline"
              onClick={handleAcceptAll}
              className="flex-1 border-white/10 hover:bg-white/5 text-white font-bold tracking-[0.1em] h-14 rounded-xl transition-all duration-300"
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
