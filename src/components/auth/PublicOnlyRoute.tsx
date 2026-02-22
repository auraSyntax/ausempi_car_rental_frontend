import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PublicOnlyRouteProps {
    children: React.ReactNode;
}

/**
 * PublicOnlyRoute
 *
 * Wraps guest-only routes (login, register, onboard).
 * If the user already has an active session, redirect them to the
 * appropriate dashboard instead of showing the page.
 *
 * Redirect rules:
 *   Admin  → /admin/dashboard
 *   Driver → /code-of-conduct
 *   Other  → / (home)
 */
const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated && user) {
        if (user.userType === "Admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        if (user.userType === "Driver") {
            return <Navigate to="/code-of-conduct" replace />;
        }
        // Fallback for any other authenticated userType
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicOnlyRoute;
