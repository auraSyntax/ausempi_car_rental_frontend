import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { fadeIn, fadeInUp } from "@/lib/animations";

export default function DriverLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for login would go here
    console.log("Login attempted with:", { employeeId, password });
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-md px-6 py-12">
          {/* Back to Home */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="absolute top-0 left-6 lg:-left-24"
          >
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-primary transition-colors gap-2"
              asChild
            >
              <Link to="/">
                <ArrowLeft size={18} />
                <span className="hidden lg:inline">Back to Home</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center mb-8"
          >
            {/* Logo */}
            <Link to="/" className="mb-6">
              <span className="text-3xl font-display font-bold tracking-[0.3em] text-gradient-gold">
                AUXEMPI
              </span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-2xl font-display text-foreground tracking-wider mb-2 uppercase">
                Driver Login
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground/60 text-sm uppercase tracking-[0.15em]">
                <Shield size={14} className="text-primary/60" />
                <span>Authorized Personnel Only</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border/30 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/50">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl font-medium text-foreground/90 tracking-wide">
                  Employee Portal
                </CardTitle>
                <CardDescription className="text-muted-foreground/70">
                  Enter your credentials to access the driver dashboard.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="employee-id" 
                      className="text-xs uppercase tracking-widest text-muted-foreground ml-1"
                    >
                      Employee ID
                    </Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                        <User size={18} />
                      </div>
                      <Input
                        id="employee-id"
                        placeholder="AUX-0000"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="pl-10 h-12 bg-white/5 border-border/20 focus:border-primary/50 focus:ring-primary/20 transition-all text-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <Label 
                        htmlFor="password" 
                        className="text-xs uppercase tracking-widest text-muted-foreground"
                      >
                        Password
                      </Label>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                        <Lock size={18} />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 bg-white/5 border-border/20 focus:border-primary/50 focus:ring-primary/20 transition-all text-foreground"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button 
                      variant="link" 
                      className="text-xs text-primary/70 hover:text-primary p-0 h-auto font-normal tracking-wide"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-8">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20"
                  >
                    Sign In
                  </Button>
                  
                  <div className="flex flex-col items-center gap-3 mt-2">
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                    <Button 
                      variant="ghost" 
                      className="text-xs text-muted-foreground/50 hover:text-muted-foreground gap-2 h-auto py-1"
                    >
                      <HelpCircle size={14} />
                      Need technical support?
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            variants={fadeIn}
            className="mt-8 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 leading-relaxed">
              &copy; {new Date().getFullYear()} AUXEMPI Global Logistics. <br />
              Secure Portal &bull; Encrypted Connection
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
