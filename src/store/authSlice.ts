import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDto {
    id: number;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    email: string;
    employeeId: string | null;
    employeeName: string | null;
    isActive: boolean | null;
    userType: string | null;
    createdAt: string | null;
    isExamCompleted: boolean | null;
    // Add other fields as needed based on the response
}

interface AuthState {
    user: UserDto | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    tokenReceivedAt: number | null;
    sessionStartTime: number | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    tokenReceivedAt: null,
    sessionStartTime: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: UserDto; accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.tokenReceivedAt = Date.now();
            // Only set session start time if it's not already set (i.e. first login)
            if (!state.sessionStartTime) {
                state.sessionStartTime = Date.now();
            }
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.tokenReceivedAt = Date.now();
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.tokenReceivedAt = null;
            state.sessionStartTime = null;
        },
    },
});

export const { setCredentials, updateAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
