import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/common";

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
              Excellence in <br />
              <span className="text-gradient-gold">Every Journey.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              Welcome to the Ausempi Driver Portal. Access your schedule, manage trips, and maintain the highest standards of service.
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
            <Link to="/">
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </motion.div>

        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <User size={12} />
              Driver Access
            </div>
            <h1 className="font-display text-4xl font-bold mb-3">Welcome Back</h1>
            <p className="text-muted-foreground">Please enter your credentials to continue.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="employee-id" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">
                Employee ID
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                  <User size={20} />
                </div>
                <Input
                  id="employee-id"
                  placeholder="AUS-0000"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-12 h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-lg text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary/80 hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                  <Lock size={20} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-lg text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Dashboard
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
          </motion.form>

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
