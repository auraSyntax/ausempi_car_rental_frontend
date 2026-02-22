import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // persist auth slice
};

// Custom persist config for auth slice to blacklist accessToken
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "sessionStartTime"], // Persist user and session timer
    blacklist: ["accessToken", "isAuthenticated", "tokenReceivedAt"], // explicitly blacklist volatile items
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: persistReducer(authPersistConfig, authReducer),
    })
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
