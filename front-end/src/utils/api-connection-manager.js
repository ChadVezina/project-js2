import { apiService } from "../services/apiService.js";

export class ApiConnectionManager {
    constructor() {
        this.isConnected = false;
        this.statusElement = null;
        this.retryAttempts = 0;
        this.maxRetryAttempts = 3;
        this.retryDelay = 5000; // 5 seconds
        this.init();
    }

    async init() {
        await this.checkConnection();
        this.createStatusElement();
        this.startPeriodicCheck();
    }

    async checkConnection() {
        try {
            const connected = await apiService.checkConnection();
            this.updateConnectionStatus(connected);
            if (connected) {
                this.retryAttempts = 0;
            }
            return connected;
        } catch (error) {
            this.updateConnectionStatus(false);
            return false;
        }
    }

    updateConnectionStatus(connected) {
        this.isConnected = connected;
        this.updateStatusElement();
    }

    createStatusElement() {
        if (this.statusElement) return;

        this.statusElement = document.createElement("div");
        this.statusElement.className = "api-status";
        this.statusElement.style.display = "none";
        document.body.appendChild(this.statusElement);
    }

    updateStatusElement() {
        if (!this.statusElement) return;

        this.statusElement.className = "api-status";

        if (this.isConnected) {
            this.statusElement.classList.add("connected");
            this.statusElement.textContent = "✓ API Connected";
            this.statusElement.style.display = "none"; // Hide when connected
        } else {
            this.statusElement.classList.add("disconnected");
            this.statusElement.textContent = "✗ API Disconnected";
            this.statusElement.style.display = "block";
        }
    }

    startPeriodicCheck() {
        setInterval(async () => {
            if (!this.isConnected) {
                await this.checkConnection();
            }
        }, this.retryDelay);
    }

    async handleApiError(error) {
        console.error("API Error:", error);

        if (error.message.includes("Session expired")) {
            this.handleSessionExpired();
        } else if (error.message.includes("Network")) {
            this.handleNetworkError();
        }
    }

    handleSessionExpired() {
        alert("Your session has expired. Please log in again.");
        // Redirect to login page
        window.location.href = "/pages/auth/auth.html";
    }

    handleNetworkError() {
        this.updateConnectionStatus(false);

        if (this.retryAttempts < this.maxRetryAttempts) {
            this.retryAttempts++;
            setTimeout(() => {
                this.checkConnection();
            }, this.retryDelay);
        }
    }

    getConnectionStatus() {
        return this.isConnected;
    }
}

// Export singleton instance
export const apiConnectionManager = new ApiConnectionManager();
