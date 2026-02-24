import axios from "axios";
import { store } from "../store/store";
import { logout, updateAccessToken } from "../store/authSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../store/authSlice";

// Create axios instance
// Using /api base URL to leverage the Vite proxy
const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Important for cookies
});

// Queue for pending requests during token refresh
interface QueuedRequest {
    resolve: (token: string | null) => void;
    reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Extend AxiosRequestConfig to include our custom property
declare module "axios" {
    export interface AxiosRequestConfig {
        requiresAuth?: boolean;
    }
}

// Request interceptor to add access token
api.interceptors.request.use(
    (config) => {
        // Only attach token if requiresAuth is explicitly set to true or undefined (defaulting to true for now is safer, OR user asked "not all the requests this needed so, pass a props which needed a token for the apis")
        // Let's implement it as: default is FALSE (no token), must explicitly set true. Or default TRUE and opt-out?
        // User said: "not all the requests this needed so, pass a props which needed a token for the apis."
        // This implies we should be explicit.

        // However, for an "api" instance, it's common to default to authenticated.
        // Let's check if the user wants an opt-in or opt-out. "pass a props which needed a token" sounds like opt-in.
        // Let's assume standard API calls need it, but we can switch it off.
        // Actually, "pass a props which needed a token" suggests: if (props.needed) -> attach token.

        // Let's default to attaching it ONLY if requiresAuth is true. This is safer per the user's phrasing.
        // BUT, existing calls might break. I should probably default to TRUE for the `api` instance since it's an "api user service".
        // Wait, the user said "not all the requests this needed so, pass a props which needed a token".
        // I will interpret this as: check for `requiresAuth: true`.

        if (config.requiresAuth) {
            const state = store.getState();
            const token = state.auth.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only attempt token refresh for authenticated requests that get a 401
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.requiresAuth
        ) {

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = Cookies.get("refreshToken");

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await api.post("/v1/auth/refresh", {
                    refreshToken: refreshToken,
                });

                const { accessToken, userDto } = response.data;

                // If new refresh token is returned, update cookie
                if (response.data.refreshToken) {
                    Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 }); // 1 day
                }

                // Update Redux
                store.dispatch(setCredentials({ user: userDto, accessToken }));

                // Process any queued requests
                processQueue(null, accessToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // If refresh fails, logout and redirect based on user type
                const state = store.getState();
                const userType = state.auth.user?.userType;
                store.dispatch(logout());
                Cookies.remove("refreshToken");
                window.location.href = userType === "Admin" ? "/admin-login" : "/driver-login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

// Proactive Token Refresh Logic
// Check token expiry every minute
setInterval(() => {
    const state = store.getState();
    const { accessToken, tokenReceivedAt, sessionStartTime } = state.auth;

    if (accessToken) {
        const now = Date.now();

        // 1. Check strict 24h Session Expiry (Client-side enforcement)
        // 24 hours = 24 * 60 * 60 * 1000 = 86400000 ms
        if (sessionStartTime && now - sessionStartTime > 86400000) {
            store.dispatch(logout());
            Cookies.remove("refreshToken");
            window.location.href = "/driver-login";
            return;
        }

        // 2. Check 15m Access Token Expiry (Proactive Refresh)
        // Refresh if > 13 minutes have passed since token receipt
        // 13 minutes = 13 * 60 * 1000 = 780000 ms
        if (tokenReceivedAt && now - tokenReceivedAt > 780000) {
            const refreshToken = Cookies.get("refreshToken");
            if (refreshToken) {
                api
                    .post("/v1/auth/refresh", { refreshToken })
                    .then((response) => {
                        const { accessToken, userDto, refreshToken: newRefreshToken } = response.data;
                        if (newRefreshToken) {
                            Cookies.set("refreshToken", newRefreshToken, { expires: 1 });
                        }
                        // This will update tokenReceivedAt in the reducer
                        store.dispatch(setCredentials({ user: userDto, accessToken }));
                    })
                    .catch(() => {
                        // If refresh fails, let the interceptor handle it or next request fail
                        // But if we are purely proactive, we might want to log out if refresh fails here too?
                        // Safest to let the interceptor handle the 401 eventual failure if this background call fails.
                    });
            }
        }
    }
}, 60000); // Check every minute

export default api;
