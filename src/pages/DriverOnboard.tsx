import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Lock, User, ArrowLeft, ChevronRight, HelpCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LazyImage } from "@/components/common";
import { toast } from "sonner";
import api from "@/services/api";
import { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import driverLoginImg from "@/assets/driver-onboard.avif";

const onboardSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().optional(),
    employeeId: z.string().min(1, "Employee ID is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type OnboardFormData = z.infer<typeof onboardSchema>;

export default function DriverOnboard() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardFormData>({
        resolver: zodResolver(onboardSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            employeeId: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: OnboardFormData) => {
        setIsLoading(true);
        try {
            // confirmPassword is UI-only — strip it before passing to the API
            const { confirmPassword: _, ...payload } = data;

            const response = await api.post("/v1/users/register", payload);

            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message || "User created successfully");
                navigate("/driver-login");
            }
        } catch (error) {
            const err = error as AxiosError<{ message?: string; errors?: string[] }>;
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (errorData.errors && Array.isArray(errorData.errors)) {
                    errorData.errors.forEach((e: string) => toast.error(e));
                } else {
                    toast.error(errorData.message || "Registration failed");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
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
            <div className="hidden lg:flex lg:w-1/2 relative bg-black shrink-0 h-screen sticky top-0 overflow-hidden z-[99]">
                <div className="absolute inset-0 z-0">
                    <LazyImage
                        src={driverLoginImg}
                        alt="Luxury Driver"
                        className="w-full h-full object-cover object-left opacity-60 transition-transform duration-[20000ms] hover:scale-105"
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
                            Join the <br />
                            <span className="text-gradient-gold">Elite Fleet.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md leading-relaxed border-l-2 border-primary/30 pl-6">
                            Become part of the Ausempi Driver Team. Experience excellence, manage your schedule, and deliver premium service.
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
                        <Link to="/driver-login">
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                                <ArrowLeft size={14} className="transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-xs uppercase tracking-widest font-medium">Back to Login</span>
                        </Link>
                    </Button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center p-6 pt-12 sm:p-12 sm:pt-16 lg:p-24 lg:pt-32 xl:p-24 xl:pt-32 w-full">
                    {/* Decorative Grid Background (Desktop Only on Right side) */}
                    <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none hidden lg:block" />

                    <div className="w-full max-w-3xl relative z-10 py-12 lg:py-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-10 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Driver Registration
                            </div>
                            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-foreground">Get Started</h1>
                            <p className="text-muted-foreground text-sm sm:text-base font-light">Create your account to access the driver portal.</p>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSubmit(onSubmit)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="space-y-6"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        First Name <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <User size={18} />
                                        </div>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            {...register("firstName")}
                                            className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background"
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-xs ml-1">{errors.firstName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Last Name <span className="text-muted-foreground/50 text-[9px] normal-case tracking-normal font-normal">(optional)</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <User size={18} />
                                        </div>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            {...register("lastName")}
                                            className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background"
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-xs ml-1">{errors.lastName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="employeeId" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Employee ID <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <User size={18} />
                                        </div>
                                        <Input
                                            id="employeeId"
                                            placeholder="AUS-0000"
                                            {...register("employeeId")}
                                            className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background"
                                        />
                                    </div>
                                    {errors.employeeId && <p className="text-red-500 text-xs ml-1">{errors.employeeId.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Phone Number <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <Phone size={18} />
                                        </div>
                                        <Input
                                            id="phoneNumber"
                                            placeholder="0719606541"
                                            {...register("phoneNumber")}
                                            className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background"
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-red-500 text-xs ml-1">{errors.phoneNumber.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <Mail size={18} />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            {...register("email")}
                                            className="pl-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 font-light tracking-wide bg-background"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <Lock size={18} />
                                        </div>
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            {...register("password")}
                                            className="pl-11 pr-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 bg-background autofill"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1 font-bold">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors duration-300">
                                            <Lock size={18} />
                                        </div>
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="********"
                                            {...register("confirmPassword")}
                                            className="pl-11 pr-11 h-12 sm:h-14 bg-white/[0.03] border-white/10 hover:border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 rounded-sm text-base placeholder:text-muted-foreground/30 bg-background autofill"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-2 hover:bg-white/5 rounded-full"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs ml-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    type="submit"
                                    className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-[0.15em] text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-primary/10 mt-4 rounded-sm"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Registering...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Register Account
                                            <ChevronRight size={16} />
                                        </span>
                                    )}
                                </Button>
                            </div>

                            <div className="pt-4 relative text-center">
                                <div className="relative">
                                    <span className="px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <Button
                                    variant="link"
                                    className="text-primary text-xs uppercase tracking-widest font-bold"
                                    asChild
                                >
                                    <Link to="/driver-login">Login Here</Link>
                                </Button>
                            </div>
                        </motion.form>
                    </div>

                    {/* Mobile Footer */}
                    <div className="w-full text-center pb-6 lg:pb-8 relative z-10">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
                            Secured by Ausempi
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
