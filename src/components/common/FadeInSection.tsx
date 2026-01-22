
import { useRef, useState, useEffect } from "react";
import { motion, useInView, HTMLMotionProps, type Easing } from "framer-motion";

interface FadeInSectionProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    threshold?: number;
}

export const FadeInSection = ({
    children,
    delay = 0,
    className = "",
    threshold = 0.2,
    ...props
}: FadeInSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Reduce threshold on mobile to trigger earlier as screen is smaller
    const effectiveThreshold = isMobile ? 0.1 : threshold;
    const isInView = useInView(ref, { once: true, amount: effectiveThreshold });

    useEffect(() => {
        const checkMobile = () => {
            // Treat tablets and mobile as "mobile" for performance (under 1024px)
            setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Optimized animation config for mobile
    const variants = {
        hidden: {
            opacity: 0,
            y: isMobile ? 10 : 30 // Reduce movement on mobile
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                // Faster, simpler transition on mobile
                duration: isMobile ? 0.5 : 0.8,
                delay: isMobile ? Math.min(delay, 0.2) : delay, // Cap delay on mobile to make it snappier
                ease: (isMobile ? "easeOut" : [0.21, 0.47, 0.32, 0.98]) as Easing
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
