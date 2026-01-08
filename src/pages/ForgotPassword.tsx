import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowLeft, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { fadeIn, fadeInUp } from "@/lib/animations";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for password reset link would go here
    console.log("Reset link requested for:", email);
    setIsSubmitted(true);
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
          {/* Back to Login */}
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
              <Link to="/driver-login">
                <ArrowLeft size={18} />
                <span className="hidden lg:inline">Back to Login</span>
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
                Forgot Password
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
              {!isSubmitted ? (
                <>
                  <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-xl font-medium text-foreground/90 tracking-wide">
                      Password Recovery
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/70">
                      Enter your registered email address or employee ID to receive a secure reset link.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="email-id" 
                          className="text-xs uppercase tracking-widest text-muted-foreground ml-1"
                        >
                          Email or Employee ID
                        </Label>
                        <div className="relative group">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                            <Mail size={18} />
                          </div>
                          <Input
                            id="email-id"
                            placeholder="email@auxempi.com or AUX-0000"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12 bg-white/5 border-border/20 focus:border-primary/50 focus:ring-primary/20 transition-all text-foreground"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pb-8">
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20"
                      >
                        Send Reset Link
                      </Button>
                      
                      <div className="flex flex-col items-center gap-3 mt-2">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent" />
                        <Button 
                          variant="ghost" 
                          className="text-xs text-muted-foreground/50 hover:text-muted-foreground gap-2 h-auto py-1"
                          asChild
                        >
                          <Link to="/driver-login">
                            Back to Sign In
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </>
              ) : (
                <div className="p-8 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="text-primary w-10 h-10" />
                  </motion.div>
                  <h2 className="text-xl font-medium text-foreground mb-3">Reset Link Sent</h2>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                    If an account exists for <span className="text-foreground font-medium">{email}</span>, you will receive an email with instructions shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try Another Email
                  </Button>
                  <Button 
                    variant="link" 
                    className="mt-4 text-xs text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <Link to="/driver-login">Return to Login</Link>
                  </Button>
                </div>
              )}
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
