import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { CookieConsent } from "./components/common/CookieConsent";
import { PageLoader } from "./components/common/PageLoader";
import { ScrollToTop } from "./components/common/ScrollToTop";
import PWAReloadPrompt from "./components/PWAReloadPrompt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setCredentials, logout } from "./store/authSlice";
import Cookies from "js-cookie";
import axios from "axios";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DriverLogin = lazy(() => import("./pages/DriverLogin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const DriverOnboard = lazy(() => import("./pages/DriverOnboard"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CodeOfConduct = lazy(() => import("./pages/CodeOfConduct"));

// Admin Pages (Lazy Loaded)
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const VideoMasterData = lazy(() => import("./pages/admin/VideoMasterData"));
const UserMasterData = lazy(() => import("./pages/admin/UserMasterData"));

import ProtectedDriverRoute from "./components/auth/ProtectedDriverRoute";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";
import api from "./services/api";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// AuthController Component
const AuthController = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const refreshToken = Cookies.get("refreshToken");

      // Scenario 1: Local Storage Cleared (Not Authenticated in Redux) BUT Cookie Exists
      // Action: Attempt to recover session
      if (!isAuthenticated && refreshToken) {
        try {
          // We use direct axios call here to avoid interceptor circular dependency or issues
          // But we need to use /api proxy
          const response = await api.post("/v1/auth/refresh", { refreshToken });
          const { accessToken, userDto, refreshToken: newRefreshToken } = response.data;

          if (newRefreshToken) {
            Cookies.set("refreshToken", newRefreshToken, { expires: 1 });
          }

          dispatch(setCredentials({ user: userDto, accessToken }));
          // No need to navigate, stay on current page
        } catch (error) {
          console.error("Session recovery failed", error);
          Cookies.remove("refreshToken");
          // Only redirect if trying to access a protected route? 
          // For now, let it be. User stays unauthenticated.
        }
      }

      // Scenario 2: Cookie Cleared (Authenticated in Redux) BUT Cookie Missing
      // Action: Logout user
      // We check this periodically or on route change. Here it is on mount/update.
      // IMPORTANT: Only check this if we consider the user "logged in". 
      // AND ensure we don't loop if we are already on login page or redirecting.
      if (isAuthenticated && !refreshToken) {
        dispatch(logout());
        // Only redirect if not already on a public page? Or just send to login.
        if (location.pathname !== "/driver-login") {
          navigate("/driver-login");
        }
      }

      setIsRestoring(false);
    };

    checkAuthStatus();

    // Optional: Set up an interval to poll for cookie existence?
    // The api.ts interval handles proactive monitoring, but this component handles route/render based checks.
    const interval = setInterval(() => {
      const refreshToken = Cookies.get("refreshToken");
      // Only trigger forced logout if we THINK we are authenticated but have no token
      if (isAuthenticated && !refreshToken) {
        dispatch(logout());
        if (window.location.pathname !== "/driver-login") {
          window.location.href = "/driver-login";
        }
      }
    }, 5000); // Check every 5 seconds for manual cookie deletion

    return () => clearInterval(interval);

  }, [dispatch, isAuthenticated, navigate, location.pathname]);

  if (isRestoring) {
    return <PageLoader isForced={true} />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAReloadPrompt />
      <BrowserRouter>
        <AuthController>
          <ScrollToTop />
          <PageLoader />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/driver-login" element={<PublicOnlyRoute><DriverLogin /></PublicOnlyRoute>} />
              <Route path="/admin-login" element={<PublicOnlyRoute><AdminLogin /></PublicOnlyRoute>} />
              <Route path="/driver-onboard" element={<PublicOnlyRoute><DriverOnboard /></PublicOnlyRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/code-of-conduct"
                element={
                  <ProtectedDriverRoute>
                    <CodeOfConduct />
                  </ProtectedDriverRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="video-master" element={<VideoMasterData />} />
                <Route path="user-master" element={<UserMasterData />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </AuthController>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
