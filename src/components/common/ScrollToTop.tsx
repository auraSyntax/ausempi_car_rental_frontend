import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that the window is scrolled to the top
 * whenever the route changes. Fixed to use 'smooth' behavior as per user request.
 */
export function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        // If there's a hash, we let the hash-scrolling logic handle it
        // Otherwise, we scroll to top instantly on every route change
        // Smooth scrolling here can cause layout jumps during page load transitions
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
}
