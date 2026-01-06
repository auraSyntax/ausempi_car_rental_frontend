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
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
          >
            <div className="bg-charcoal-light/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-white mb-2">Cookie Settings</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use cookies to enhance your luxury experience. By clicking "Accept All", you consent to our use of all cookies. Learn more in our{" "}
                    <Link to="/cookies" className="text-primary hover:underline underline-offset-4">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleAcceptAll}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-semibold tracking-wide py-6 rounded-xl transition-all duration-300"
                >
                  Accept All
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={handleRejectNonEssential}
                    className="border-white/10 hover:bg-white/5 text-white/80 text-xs py-5 rounded-xl transition-all duration-300"
                  >
                    Essential Only
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setShowPreferences(true)}
                    className="hover:bg-white/5 text-white/60 text-xs py-5 rounded-xl transition-all duration-300"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="bg-charcoal-dark border-white/10 text-white max-w-lg sm:rounded-3xl p-0 overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPreferences(false)}
              className="text-white/40 hover:text-white hover:bg-white/5 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <DialogHeader className="p-8 pb-4">
            <DialogTitle className="text-2xl font-display text-primary mb-2">Privacy Preferences</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Customize how we use cookies to provide you with the best experience.
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 pb-8 space-y-6">
            <div className="space-y-4">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-white">Essential Cookies</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Required for core functionality. Always active.</p>
                  </div>
                </div>
                <Switch checked={true} disabled className="data-[state=checked]:bg-primary" />
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-primary/70" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-white">Analytics Cookies</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Helps us understand how visitors use our site.</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg">
                    <Target className="w-5 h-5 text-primary/70" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm text-white">Marketing Cookies</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Used for relevant advertising and campaigns.</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketing: checked }))}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="bg-white/5 p-6 sm:justify-center border-t border-white/5">
            <Button 
              onClick={() => savePreferences(preferences)}
              className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-black font-semibold py-6 rounded-xl transition-all"
            >
              Save My Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
