import { AuthGuard } from "../utils/auth-guard"; // Adjust the path as necessary

export class Header extends HTMLElement {
    constructor() {
        super();
        this.currentUser = null;
        this.checkAuthStatus();
        
        // Listen for login/logout events
        window.addEventListener('userLoggedIn', this.handleUserLoggedIn.bind(this));
        window.addEventListener('userLoggedOut', this.handleUserLoggedOut.bind(this));
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
                        <li>
                            ${this.renderAuthSection()}
                        </li>
                    </ul>
                </nav>
            </header>
        `;
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
