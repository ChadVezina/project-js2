import { apiService } from "../services/apiService.js";

export class AuthGuard {
    static async checkAuthentication() {
        const token = apiService.getStoredToken();
        const user = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser") || "{}");

        console.log("Checking authentication, token exists:", !!token);
        console.log("User data from storage:", user);

        // First check if we have basic auth data
        if (!token || !user.id) {
            console.log("No token or user data found");
            this.clearAuthData();
            return false;
        }

        try {
            // Use a dedicated auth check endpoint instead of getAllUsers
            const response = await apiService.makeRequest("/users/auth/verify", {
                method: "GET",
            });

            console.log("Authentication check successful:", response);
            return true;
        } catch (error) {
            console.error("Authentication check failed:", error);
            // Token is invalid or expired
            this.clearAuthData();
            return false;
        }
    }

    static async requireAuth(redirectUrl = "/pages/auth/auth.html") {
        try {
            // Use the more robust checkAuthentication method
            const isAuthenticated = await this.checkAuthentication();

            if (!isAuthenticated) {
                alert("You must be logged in to access this page.");
                window.location.href = redirectUrl;
                return false;
            }

            return true;
        } catch (error) {
            console.error("Error checking authentication:", error);
            window.location.href = redirectUrl;
            return false;
        }
    }

    static async requireAdmin(redirectUrl = "/") {
        console.log("Checking admin privileges...");

        const isAuthenticated = await this.checkAuthentication();
        console.log("Authentication check result:", isAuthenticated);

        if (!isAuthenticated) {
            console.log("User not authenticated, redirecting to login");
            alert("You must be logged in to access this page.");
            window.location.href = "/pages/auth/auth.html";
            return false;
        }

        try {
            const user = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser") || "{}");
            console.log("Current user data:", user);
            console.log("User role:", user.role);

            if (user.role !== "admin") {
                console.log("Access denied: user role is", user.role, "but admin required");
                alert("You need administrator privileges to access this page.");
                window.location.href = redirectUrl;
                return false;
            }

            console.log("Admin access granted");
            return true;
        } catch (error) {
            console.error("Error checking admin privileges:", error);
            window.location.href = redirectUrl;
            return false;
        }
    }

    static getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser") || "{}");
        } catch (error) {
            return {};
        }
    }

    static isAdmin() {
        const user = this.getCurrentUser();
        return user.role === "admin";
    }

    static logout() {
        this.clearAuthData();

        // Trigger logout event
        window.dispatchEvent(new CustomEvent("userLoggedOut"));

        window.location.href = "../pages/auth/auth.html";
    }

    // Helper method to clear all auth data
    static clearAuthData() {
        apiService.clearToken();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("currentUser");
    }
}

// Auto-check authentication on page load for protected pages
document.addEventListener("DOMContentLoaded", () => {
    const protectedPages = ["/admin/"];
    const adminPages = ["/pages/form/"];
    const currentPath = window.location.pathname;

    const isProtectedPage = protectedPages.some((path) => currentPath.includes(path));
    const isAdminPage = adminPages.some((path) => currentPath.includes(path));

    if (isProtectedPage) {
        AuthGuard.requireAuth();
    } else if (isAdminPage) {
        console.log("Admin page detected, authentication handled manually");
    }
});
