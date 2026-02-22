import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { useEffect } from "react";

interface ProtectedDriverRouteProps {
    children: React.ReactNode;
}

const ProtectedDriverRoute = ({ children }: ProtectedDriverRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && user?.userType !== "Driver") {
            toast.error("Access Denied", {
                description: "This area is restricted to Driver accounts only.",
            });
        }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        // Redirect to driver login, saving the location they were trying to go to
        return <Navigate to="/driver-login" state={{ from: location }} replace />;
    }

    // Check if user is a Driver
    // Note: We're doing a case-insensitive check to be safe, or exact match if you prefer
    if (user?.userType && user.userType !== "Driver") {
        // User is authenticated but NOT a driver (e.g. Admin)
        // Redirect to Admin Dashboard (placeholder) or Home
        // For now, redirect to Home as requested "later admin dashboard"
        return <Navigate to="/" replace />;
    }

    // If authenticated and is a Driver, render the protected content
    return <>{children}</>;
};

export default ProtectedDriverRoute;
