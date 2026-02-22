import api from "./api";
import { store } from "../store/store";
import { setCredentials } from "../store/authSlice";
import Cookies from "js-cookie";

/**
 * Calls POST /v1/auth/refresh with the stored refresh token cookie,
 * updates the Redux store with the new access token + user data, and
 * rotates the refresh token cookie when the server issues a new one.
 *
 * Returns the new access token on success, or throws on failure.
 */
export const refreshAuthToken = async (): Promise<string> => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await api.post("/v1/auth/refresh", { refreshToken });

    const { accessToken, userDto, refreshToken: newRefreshToken } = response.data;

    // Rotate the refresh token cookie when the server provides a new one
    if (newRefreshToken) {
        Cookies.set("refreshToken", newRefreshToken, { expires: 1 }); // 1 day
    }

    // Update Redux store with the latest token and user data (including isExamCompleted)
    store.dispatch(setCredentials({ user: userDto, accessToken }));

    return accessToken;
};

/**
 * Calls PATCH /v1/users?userId={userId}&status={status} to update a user's
 * exam completion status on the backend.
 *
 * @param userId  - The ID of the user whose status should be updated.
 * @param status  - 1 = exam completed, 0 = not completed.
 */
export const updateUserExamStatus = async (
    userId: number,
    status: 1 | 0
): Promise<void> => {
    await api.put(`/v1/users`, null, {
        params: { userId, status },
        requiresAuth: true,
    });
};
