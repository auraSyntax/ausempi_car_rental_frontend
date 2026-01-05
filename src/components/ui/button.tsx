import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-sm",
        link: "text-primary underline-offset-4 hover:underline",
        // AUXEMPI Luxury Variants
        luxury: "bg-primary text-primary-foreground hover:bg-gold-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5 uppercase tracking-widest rounded-sm",
        "luxury-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground uppercase tracking-widest rounded-sm",
        "luxury-ghost": "text-foreground hover:text-primary uppercase tracking-widest",
        hero: "bg-primary text-primary-foreground hover:bg-gold-dark shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-[0.2em] text-base font-semibold rounded-sm",
        "hero-outline": "border-2 border-foreground/30 text-foreground bg-transparent hover:border-primary hover:text-primary uppercase tracking-[0.2em] text-base font-medium backdrop-blur-sm rounded-sm",
        // Premium Gold CTA - Black text on gold with premium hover effects
        "gold-cta": "bg-gradient-to-r from-primary via-gold to-primary text-charcoal font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1 rounded-sm border border-gold/50 hover:border-gold transition-all duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
