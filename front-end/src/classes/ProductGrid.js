import { apiService } from "../services/apiService.js";

export class ProductGrid {
    constructor(container) {
        this.container = container;
        this.productsContainer = this.createProductsContainer();
        this.products = [];
        this.currentUser = this.getCurrentUser();

        // Écouter les événements de connexion/déconnexion
        window.addEventListener("userLoggedIn", (event) => {
            this.currentUser = event.detail.user;
            this.refreshProductsDisplay();
        });

        window.addEventListener("userLoggedOut", () => {
            this.currentUser = null;
            this.refreshProductsDisplay();
        });
    }

    createProductsContainer() {
        const container = document.createElement("div");
        container.className = "products-container";
        this.container.appendChild(container);
        return container;
    }

    render(products) {
        this.clear();
        this.addProducts(products);
    }

    addProducts(products) {
        products.forEach((product) => {
            const productElement = this.createProductElement(product);
            this.productsContainer.appendChild(productElement);
            this.products.push(product);
        });
    }

    createProductElement(product) {
        const productEl = document.createElement("div");
        productEl.className = "product block";

        const deleteButton = this.canUserDeleteProduct()
            ? `
            <button class="delete-btn" data-product-id="${product.id}" title="Supprimer le produit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        `
            : "";

        productEl.innerHTML = `
            <a href="./pages/produit/produit.html?id=${product.id}" class="product-link">
                <div class="overflow">
                    <div class="img-container" 
                    style="background-image: url(${product.image}); height: 300px; background-size: cover; background-position: center;">
                    </div>
                </div>
                <h3 class="brand">${product.marque}</h3>
                <h2 class="name">${product.nom}</h2>
                <h2 class="price">${product.prix} $</h2>
            </a>
            ${deleteButton}
        `;

        // Add event listener for delete button if it exists
        if (this.canUserDeleteProduct()) {
            const deleteBtn = productEl.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleDeleteProduct(product.id, productEl);
            });
        }

        return productEl;
    }

    clear() {
        this.productsContainer.innerHTML = "";
        this.products = [];
    }

    getProductCount() {
        return this.products.length;
    }

    getCurrentUser() {
        try {
            const userData = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    }

    canUserDeleteProduct() {
        // Vérifier si l'utilisateur est connecté et est un admin
        return this.currentUser && this.currentUser.role === "admin";
    }

    async handleDeleteProduct(productId, productElement) {
        // Demander confirmation avant la suppression
        const productName = productElement.querySelector(".name").textContent;
        const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer le produit "${productName}" ?`);

        if (!confirmed) {
            return;
        }

        try {
            // Ajouter un état de chargement
            const deleteBtn = productElement.querySelector(".delete-btn");
            deleteBtn.disabled = true;
            deleteBtn.innerHTML = '<div class="spinner"></div>';

            // Appeler l'API pour supprimer le produit
            await apiService.deleteProduct(productId);

            // Supprimer l'élément du DOM avec une animation
            productElement.style.transition = "all 0.3s ease-out";
            productElement.style.transform = "scale(0.8)";
            productElement.style.opacity = "0";

            setTimeout(() => {
                productElement.remove();
                // Mettre à jour la liste des produits
                this.products = this.products.filter((p) => p.id !== productId);
            }, 300);

            // Afficher un message de succès
            this.showSuccessMessage("Produit supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);

            // Restaurer le bouton en cas d'erreur
            const deleteBtn = productElement.querySelector(".delete-btn");
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;

            // Afficher un message d'erreur
            this.showErrorMessage("Erreur lors de la suppression du produit: " + error.message);
        }
    }

    refreshProductsDisplay() {
        // Re-render les produits pour afficher/masquer les boutons supprimer
        if (this.products.length > 0) {
            this.render(this.products);
        }
    }

    showSuccessMessage(message) {
        const notification = document.createElement("div");
        notification.className = "notification success";
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("show");
        }, 100);

        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showErrorMessage(message) {
        const notification = document.createElement("div");
        notification.className = "notification error";
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("show");
        }, 100);

        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}
