import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface LazyImageProps extends HTMLMotionProps<"img"> {
    containerClassName?: string;
    src: string; // Enforce src
    alt: string; // Enforce alt
    priority?: boolean;
}

export function LazyImage({
    className,
    src,
    alt,
    containerClassName,
    priority = false,
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            {/* Skeleton/Blur placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-secondary/30 animate-pulse z-10" />
            )}

            <motion.img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded || priority ? 1 : 0,
                    scale: isLoaded || priority ? 1 : 1.05
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onLoad={() => setIsLoaded(true)}
                className={cn("w-full h-full object-cover", className)}
                {...props}
            />
        </div>
    );
}
