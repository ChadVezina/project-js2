/**
 * ToastManager - Gestionnaire de notifications toast uniforme
 */
export class ToastManager {
    static instance = null;

    constructor() {
        if (ToastManager.instance) {
            return ToastManager.instance;
        }

        this.toasts = [];
        this.container = null;
        this.init();
        ToastManager.instance = this;
    }

    static getInstance() {
        if (!ToastManager.instance) {
            ToastManager.instance = new ToastManager();
        }
        return ToastManager.instance;
    }

    init() {
        this.createContainer();
        this.injectStyles();
    }

    createContainer() {
        this.container = document.createElement("div");
        this.container.id = "toast-container";
        this.container.className = "toast-container";
        document.body.appendChild(this.container);
    }

    injectStyles() {
        if (document.getElementById("toast-styles")) return;

        const styles = document.createElement("style");
        styles.id = "toast-styles";
        styles.innerHTML = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }
            
            .toast {
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                padding: 16px 20px;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: auto;
                border-left: 4px solid #007bff;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .toast.success {
                border-left-color: #28a745;
            }
            
            .toast.error {
                border-left-color: #dc3545;
            }
            
            .toast.warning {
                border-left-color: #ffc107;
            }
            
            .toast.info {
                border-left-color: #007bff;
            }
            
            .toast-icon {
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .toast-content {
                flex: 1;
            }
            
            .toast-message {
                font-weight: 500;
                color: #333;
                margin: 0;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 18px;
                color: #999;
                cursor: pointer;
                padding: 0;
                margin-left: 8px;
                flex-shrink: 0;
            }
            
            .toast-close:hover {
                color: #666;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Affiche une notification toast
     * @param {string} message - Le message à afficher
     * @param {string} type - Le type de toast (success, error, warning, info)
     * @param {number} duration - Durée en millisecondes (par défaut 3000)
     */
    show(message, type = "info", duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Afficher le toast avec animation
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        // Auto-suppression après la durée spécifiée
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;

        const icon = this.getIcon(type);

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" type="button">&times;</button>
        `;

        // Ajouter l'événement de fermeture
        const closeBtn = toast.querySelector(".toast-close");
        closeBtn.addEventListener("click", () => {
            this.remove(toast);
        });

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: "✓",
            error: "✕",
            warning: "⚠",
            info: "ℹ",
        };
        return icons[type] || icons.info;
    }

    remove(toast) {
        if (!toast || !toast.parentNode) return;

        toast.classList.remove("show");

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }

            const index = this.toasts.indexOf(toast);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        }, 300);
    }

    // Méthodes de commodité
    static success(message, duration = 3000) {
        return ToastManager.getInstance().show(message, "success", duration);
    }

    static error(message, duration = 3000) {
        return ToastManager.getInstance().show(message, "error", duration);
    }

    static warning(message, duration = 3000) {
        return ToastManager.getInstance().show(message, "warning", duration);
    }

    static info(message, duration = 3000) {
        return ToastManager.getInstance().show(message, "info", duration);
    }

    // Nettoyer tous les toasts
    clear() {
        this.toasts.forEach((toast) => this.remove(toast));
    }
}

// Export par défaut et nommé
export default ToastManager;
