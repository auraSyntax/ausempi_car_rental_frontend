import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowLeft, ChevronRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/common";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Reset link requested for:", email);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      {/* Left Panel - Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Driver"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-end p-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              Maintain <br />
              <span className="text-gradient-gold">Control.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Securely recover your account access. Our dedicated support team is available 24/7 if you need immediate assistance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-[#0A0A0A]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20"
        >
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground gap-2 group"
            asChild
          >
            <Link to="/driver-login">
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Login</span>
            </Link>
          </Button>
        </motion.div>

        <div className="w-full max-w-md relative z-10">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                  <Shield size={12} />
                  Account Recovery
                </div>
                <h1 className="font-display text-4xl font-bold mb-3">Forgot Password?</h1>
                <p className="text-muted-foreground">Enter your credentials to receive a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">
                    Email or Employee ID
                  </Label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                      <Mail size={20} />
                    </div>
                    <Input
                      id="email"
                      placeholder="email@ausempi.com or AUS-0000"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-lg text-lg"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-gold hover:opacity-90 text-primary-foreground font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-lg shadow-primary/10 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending Request...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Reset Link
                      <ChevronRight size={18} />
                    </span>
                  )}
                </Button>

                <div className="pt-6 relative text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative">
                    <span className="bg-[#0A0A0A] px-4 text-xs text-muted-foreground uppercase tracking-wider">
                      Support
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2 text-xs">
                    <HelpCircle size={14} />
                    Contact Fleet Manager
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>

              <h2 className="font-display text-3xl font-bold mb-4">Check Your Inbox</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                If an account matches <span className="text-white font-medium block mt-1">{email}</span> we have sent instructions to reset your password.
              </p>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-14 border-white/10 hover:border-primary hover:bg-primary/10 hover:text-primary uppercase tracking-widest"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Another Email
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-white"
                  asChild
                >
                  <Link to="/driver-login">Return to Login</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Mobile Footer */}
          <div className="mt-12 text-center lg:text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              Secured by Ausempi Guard &bull; v2.4.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
