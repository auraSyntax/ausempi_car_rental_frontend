import { useState, useRef, useEffect, ImgHTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  placeholderColor?: string;
}

/**
 * OptimizedImage - Performance-optimized image component with:
 * - Native lazy loading for non-priority images
 * - Smooth fade-in transition on load
 * - Placeholder with aspect ratio to prevent layout shift
 * - GPU-accelerated animations with will-change
 */
const OptimizedImage = memo(({
  src,
  alt,
  className,
  aspectRatio,
  priority = false,
  placeholderColor = "hsl(var(--charcoal))",
  style,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use IntersectionObserver for lazy loading (fallback for older browsers)
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // Start loading 200px before viewport
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-charcoal",
        className
      )}
      style={{
        aspectRatio,
        backgroundColor: placeholderColor,
        ...style,
      }}
    >
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          willChange: isLoaded ? "auto" : "opacity",
        }}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
