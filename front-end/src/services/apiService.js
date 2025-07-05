import { config } from "../config/config.js";

export class ApiService {
    constructor() {
        this.baseUrl = config.api.baseUrl; // This is correct
        this.timeout = config.api.timeout;
        this.token = this.getStoredToken();

        // Update token whenever it changes in storage
        this.refreshToken();
    }

    refreshToken() {
        this.token = this.getStoredToken();
    }

    getStoredToken() {
        return localStorage.getItem(config.auth.tokenKey) || sessionStorage.getItem(config.auth.tokenKey);
    }

    setToken(token, rememberMe = false) {
        this.token = token;
        if (rememberMe) {
            localStorage.setItem(config.auth.tokenKey, token);
        } else {
            sessionStorage.setItem(config.auth.tokenKey, token);
        }
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem(config.auth.tokenKey);
        sessionStorage.removeItem(config.auth.tokenKey);
    }

    getAuthHeaders() {
        const headers = {};

        // Check if we have a token (either in memory or storage)
        const token = this.token || this.getStoredToken();

        if (token) {
            // Parse the token to get user info
            try {
                const user = JSON.parse(localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser") || "{}");
                if (user.id && user.role) {
                    headers["user-id"] = user.id.toString();
                    headers["user-role"] = user.role;
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        return headers;
    }

    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`; // Fixed: use this.baseUrl instead of this.baseURL
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...this.getAuthHeaders(),
                ...options.headers,
            },
            ...options,
        };

        console.log("Making request to:", url);
        console.log("With headers:", config.headers);

        try {
            const response = await fetch(url, config);

            // Check if response has content before trying to parse JSON
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                const text = await response.text();
                if (text.trim()) {
                    data = JSON.parse(text);
                } else {
                    data = {};
                }
            } else {
                data = { message: "No JSON response" };
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }

    // Authentication methods
    async login(credentials) {
        const response = await this.makeRequest("/users/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        if (response.data && response.data.token) {
            this.setToken(response.data.token, credentials.rememberMe);

            // Store user data - don't override role as it's already in user object
            const userData = response.data.user;

            if (credentials.rememberMe) {
                localStorage.setItem("currentUser", JSON.stringify(userData));
            } else {
                sessionStorage.setItem("currentUser", JSON.stringify(userData));
            }

            // Make sure the token is refreshed in the instance
            this.refreshToken();
        }

        return response;
    }

    async logout() {
        this.clearToken();
    }

    // Product methods
    async getAllProducts() {
        return await this.makeRequest("/products");
    }

    async getProductById(id) {
        return await this.makeRequest(`/products/${id}`);
    }

    async createProduct(productData) {
        return await this.makeRequest("/products", {
            method: "POST",
            body: JSON.stringify(productData),
        });
    }

    async updateProduct(id, productData) {
        return await this.makeRequest(`/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(productData),
        });
    }

    async deleteProduct(id) {
        return await this.makeRequest(`/products/${id}`, {
            method: "DELETE",
        });
    }

    // User methods
    async getAllUsers() {
        return await this.makeRequest("/users");
    }

    async getUserById(id) {
        return await this.makeRequest(`/users/${id}`);
    }

    async createUser(userData) {
        // This method is now for admin-only user creation
        return await this.makeRequest("/users", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }

    async register(userData) {
        // This method is for public registration
        return await this.makeRequest("/users/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }

    async updateUser(id, userData) {
        return await this.makeRequest(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(id) {
        return await this.makeRequest(`/users/${id}`, {
            method: "DELETE",
        });
    }

    // Utility methods
    isAuthenticated() {
        return !!this.token;
    }

    async checkConnection() {
        try {
            await fetch(`${this.baseUrl}/health`);
            return true;
        } catch {
            return false;
        }
    }
}

// Export a singleton instance
export const apiService = new ApiService();
