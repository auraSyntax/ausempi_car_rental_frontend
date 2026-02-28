import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/common";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import api from "@/services/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

// TODO: Replace with an appropriate admin login image if available, or reuse driver for now
import adminLoginImg from "@/assets/admin-login.avif";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/v1/auth/login", { ...data, userType: "Admin" });

      const { accessToken, refreshToken, userDto } = response.data;

      // Dispatch to Redux
      dispatch(setCredentials({ user: userDto, accessToken }));

      // Set Refresh Token in Cookie
      if (refreshToken) {
        // Secure cookie settings
        Cookies.set("refreshToken", refreshToken, { expires: 1, secure: window.location.protocol === 'https:', sameSite: 'Strict' });
      }

      toast.success("Login successful", {
        description: `Welcome back, Administrator ${userDto.employeeName || userDto?.email}`,
      });

      if (userDto.userType === "Admin") {
        navigate("/admin/dashboard");
      } else {
        toast.error("Access Denied", {
          description: "This portal is strictly for administrators.",
        });
        // Optional: Logout immediately if not admin? Or redirect to home?
        // Let's redirect to home for safety
        navigate("/");
      }
    } catch (err: unknown) {
      console.error("Login failed", err);
      // specific error type for axios response access
      const error = err as { response?: { data?: { message?: string } } };
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      toast.error("Login failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground relative lg:h-screen lg:overflow-hidden">
      {/* Background for Mobile/Tablet - Subtle Texture */}
      <div className="absolute inset-0 bg-[#0A0A0A] lg:hidden z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Left Panel - Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black shrink-0 h-screen top-0 overflow-hidden z-[99]">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src={adminLoginImg}
            alt="Admin Portal"
            className="w-full h-full object-cover object-left opacity-40 transition-transform duration-[20000ms] hover:scale-105 filter"
            containerClassName="h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
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
              Administrative <br />
              <span className="text-gradient-gold">Control Center.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed border-l-2 border-primary/30 pl-6">
              Secure access for system administrators to manage users, content, and system configuration.
            </p>
          </motion.div>

          <div className="flex gap-4 text-xs text-white/20 font-mono">
            <span>•</span>
            <span>RESTRICTED ACCESS</span>
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
                <ArrowLeft size={14} className="transition-transform group-hover:scale-110" />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium">Back to Home</span>
            </Link>
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 w-full">
          {/* Decorative Grid Background (Desktop Only on Right side) */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none hidden lg:block" />

          <div className="w-full max-w-[400px] relative z-10 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Admin Access
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-foreground">Dashboard Login</h1>
              <p className="text-muted-foreground text-sm sm:text-base font-light">Please enter your administrative credentials.</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                    <User size={18} />
                  </div>
                  <Input
                    id="email"
                    placeholder="admin@ausempi.com"
                    {...register("email")}
                    className={`pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background ${errors.email ? "border-red-500" : ""
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>
                )}
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
                    placeholder="********"
                    {...register("password")}
                    className={`pl-11 pr-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 bg-background autofill ${errors.password ? "border-red-500" : ""
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-[0.15em] text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-primary/10 mt-4 rounded-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Access Dashboard
                    <ChevronRight size={16} />
                  </span>
                )}
              </Button>

              <div className="pt-4 text-center">
                {/* Removed Driver Registration Link */}
              </div>

              <div className="pt-4 relative text-center">
                <div className="relative">
                  <span className="px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    System Issue?
                  </span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group px-4 py-2 rounded-sm hover:bg-white/5">
                  <HelpCircle size={14} className="group-hover:text-primary transition-colors" />
                  <span className="text-xs tracking-wider">Contact IT Support</span>
                </div>
              </div>
            </motion.form>
          </div>

          {/* Mobile Footer */}
          <div className="w-full text-center pb-6 lg:pb-0 lg:absolute lg:bottom-8 relative z-10">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
              Internal System • Ausempi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
