import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { useEffect } from "react";

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && user?.userType !== "Admin") {
            toast.error("Access Denied", {
                description: "This area is restricted to Administrator accounts only.",
            });
        }
    }, [isAuthenticated, user]);

    if (!isAuthenticated) {
        // Redirect to admin login, saving the location they were trying to go to
        // Note: User requested "no explicit menu", but the route exists.
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    // Check if user is an Admin
    if (user?.userType && user.userType !== "Admin") {
        // User is authenticated but NOT an admin (e.g. Driver)
        // Redirect to Home or appropriate dashboard
        return <Navigate to="/" replace />;
    }

    // If authenticated and is an Admin, render the protected content
    return <>{children}</>;
};

export default ProtectedAdminRoute;
