import { AuthGuard } from "../utils/auth-guard"; // Adjust the path as necessary

export class Header extends HTMLElement {
    constructor() {
        super();
        this.currentUser = null;
        this.checkAuthStatus();

        // Listen for login/logout events
        window.addEventListener("userLoggedIn", this.handleUserLoggedIn.bind(this));
        window.addEventListener("userLoggedOut", this.handleUserLoggedOut.bind(this));
    }

    checkAuthStatus() {
        try {
            const userData = localStorage.getItem("currentUser");
            if (userData) {
                this.currentUser = JSON.parse(userData);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            this.currentUser = null;
        }
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
    }

    render() {
        const activePage = this.getAttribute("active-page") || "";
        this.innerHTML = `
            <header class="header">
                <a class="header-brand" href="/">CubeShop</a>
                <nav class="navbar">
                    <ul>
                        <li>
                            <a href="/" class="header-nav ${activePage === "home" ? "active" : ""}">Accueil</a>
                        </li>
                        <li>
                            <a href="/pages/form/form.html" class="header-nav ${activePage === "form" ? "active" : ""}">Ajouter un produit</a>
                        </li>
                            ${this.renderCartSection()}
                        <li>
                            ${this.renderAuthSection()}
                        </li>
                    </ul>
                </nav>
            </header>
        `;
    }

    renderCartSection() {
        if (this.currentUser) {
            return `
                <li>
                    <a href="/pages/panier/panier.html" class="cart-link" title="Mon panier">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 7h13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="cart-text">Panier</span>
                        <span class="cart-count" style="display: none;">0</span>
                    </a>
                </li>
            `;
        }
        return "";
    }

    renderAuthSection() {
        if (this.currentUser && this.currentUser.username) {
            return `
                <div class="user-info">
                    <span class="user-greeting">Bonjour, ${this.currentUser.username}</span>
                    <button class="btn btn-secondary logout-btn">Déconnexion</button>
                </div>
            `;
        } else {
            return `
                <div class="login-section">
                    <a href="/pages/auth/auth.html" class="login-btn">Connexion</a>
                </div>
            `;
        }
    }

    bindEvents() {
        const logoutBtn = this.querySelector(".logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", this.handleLogout.bind(this));
        }
    }

    handleLogout() {
        // Use AuthGuard logout method
        AuthGuard.logout();
    }

    handleUserLoggedIn(event) {
        this.currentUser = event.detail.user;
        this.render();
    }

    handleUserLoggedOut() {
        this.currentUser = null;
        this.render();
    }

    // Method to update user info dynamically
    updateUserInfo() {
        this.checkAuthStatus();
        this.render();
    }
}

customElements.define("app-header", Header);
