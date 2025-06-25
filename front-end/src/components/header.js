class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const activePage = this.getAttribute("active-page") || "";
        this.innerHTML = `
            <header>
                <a class="header-brand" href="/">CubeShop</a>
                <ul>
                    <li>
                        <a href="/" class="header-nav ${activePage === "home" ? "active" : ""}">Accueil</a>
                    </li>
                    <li>
                        <a href="/pages/form/form.html" class="header-nav ${activePage === "form" ? "active" : ""}">Ajouter un produit</a>
                    </li>
                    <li>
                        <a href="/pages/auth/auth.html" class="header-nav ${activePage === "auth" ? "active" : ""}">Connexion</a>
                    </li>
                </ul>
            </header>
        `;
    }
}

customElements.define("app-header", AppHeader);
