import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";

/**
 * PWAReloadPrompt handle service worker registration and updates.
 * It uses 'sonner' to show premium toasts when the app is ready for offline use
 * or when a new version is available.
 */
function PWAReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered() {
            // Service worker registered successfully
        },
        onRegisterError() {
            // Error during service worker registration
        },
    });

    const close = useCallback(() => {
        setOfflineReady(false);
        setNeedRefresh(false);
    }, [setOfflineReady, setNeedRefresh]);

    useEffect(() => {
        if (offlineReady) {
            toast.success("App ready to work offline", {
                description: "The application has been cached for offline use.",
                action: {
                    label: "Close",
                    onClick: () => close(),
                },
            });
        }
    }, [offlineReady, close]);

    useEffect(() => {
        if (needRefresh) {
            toast.info("New content available", {
                description: "A new version of the app is available. Please refresh to update.",
                action: {
                    label: "Update",
                    onClick: () => updateServiceWorker(true),
                },
                duration: Infinity,
            });
        }
    }, [needRefresh, updateServiceWorker]);

    return null;
}

export default PWAReloadPrompt;
