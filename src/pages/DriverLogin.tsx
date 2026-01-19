import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/common";

import driverLoginImg from "@/assets/driver-login.avif";

export default function DriverLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login attempted with:", { employeeId, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground relative lg:h-screen lg:overflow-hidden">
      {/* Background for Mobile/Tablet - Subtle Texture */}
      <div className="absolute inset-0 bg-[#0A0A0A] lg:hidden z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Left Panel - Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black shrink-0 h-screen sticky top-0 overflow-hidden z-[99]">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src={driverLoginImg}
            alt="Luxury Driver"
            className="w-full h-full object-cover object-left opacity-60 transition-transform duration-[20s] hover:scale-105"
            containerClassName="h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-end p-20 w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              Excellence in <br />
              <span className="text-gradient-gold">Every Journey.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed border-l-2 border-primary/30 pl-6">
              Welcome to the Ausempi Driver Portal. Access your schedule, manage trips, and maintain the highest standards of service.
            </p>
          </motion.div>

          <div className="flex gap-4 text-xs text-white/20 font-mono">
            <span>•</span>
            <span>SECURED BY AUSEMPI</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form (Scrollable) */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen relative z-10 lg:h-full lg:overflow-y-auto">
        {/* Back Button */}
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 z-20">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground gap-2 group pl-0 hover:bg-transparent"
            asChild
          >
            <Link to="/">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium">Back to Home</span>
            </Link>
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 w-full">
          {/* Decorative Grid Background (Desktop Only on Right side) */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none hidden lg:block" />

          <div className="w-full max-w-[400px] relative z-10 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Driver Access
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground text-sm sm:text-base font-light">Please enter your specialized credentials to continue.</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="employee-id" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                  Employee ID
                </Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                    <User size={18} />
                  </div>
                  <Input
                    id="employee-id"
                    placeholder="AUS-0000"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-[10px] uppercase tracking-wider text-primary/80 hover:text-primary transition-colors border-b border-transparent hover:border-primary/50 pb-0.5"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-[0.15em] text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-primary/10 mt-4 rounded-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In to Dashboard
                    <ChevronRight size={16} />
                  </span>
                )}
              </Button>

              <div className="pt-8 relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative">
                  <span className="bg-[#0A0A0A] px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    Support
                  </span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group px-4 py-2 rounded-sm hover:bg-white/5">
                  <HelpCircle size={14} className="group-hover:text-primary transition-colors" />
                  <span className="text-xs tracking-wider">Contact Support</span>
                </div>
              </div>
            </motion.form>
          </div>

          {/* Mobile Footer */}
          <div className="w-full text-center pb-6 lg:pb-0 lg:absolute lg:bottom-8 relative z-10">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
              Secured by Ausempi Guard • 256-bit Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
