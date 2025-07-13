import { ProductsManager } from "../utils/products-manager.js";
import { CartManager } from "./CartManager.js";
import { ToastManager } from "./ToastManager.js";

export class ProductPage {
    constructor(options = {}) {
        this.productsManager = new ProductsManager();
        this.cartManager = new CartManager();
        this.toastManager = new ToastManager();
        this.content = null;
        this.options = options;
        this.currentProduct = null;
        this.currentUser = this.getCurrentUser();
    }

    async init() {
        this.content = document.querySelector(".content");
        if (!this.content) {
            throw new Error("Content element not found");
        }

        const productId = this.getProductIdFromUrl();
        await this.loadProduct(productId);
    }

    getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    async loadProduct(productId) {
        try {
            this.showLoading();
            const product = await this.productsManager.getProductById(productId);

            if (product) {
                this.currentProduct = product;
                this.renderProduct(product);
                this.bindCartEvents();
            } else {
                this.handleProductNotFound();
            }
        } catch (error) {
            console.error("Error loading product:", error);
            this.handleError("Failed to load product. Please try again.");
        } finally {
            this.hideLoading();
        }
    }

    renderProduct(product) {
        const cartSection = this.currentUser ? this.renderCartSection(product) : "";

        this.content.innerHTML = `
            <div class="card p-20 product-container">
                <div class="product">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.nom}">
                    </div>
                    <div class="px-20 product-details">
                        <div class="brand"><h2>${product.marque}</h2></div>
                        <div class="title"><h1>${product.nom}</h1></div>
                        <div class="price"><h3>${product.prix}$</h3></div>
                        <div class="description"><p>${product.description}</p></div>
                        ${cartSection}
                    </div>
                </div>
            </div>
        `;
    }

    renderCartSection(product) {
        const isInCart = this.cartManager.isInCart(product.id);
        const quantity = this.cartManager.getItemQuantity(product.id);

        if (isInCart) {
            return `
                <div class="product-cart-section">
                    <div class="cart-controls-large">
                        <button class="qty-btn minus" data-action="decrease">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="qty-btn plus" data-action="increase">+</button>
                    </div>
                    <button class="btn btn-danger remove-from-cart-btn">
                        Retirer du panier
                    </button>
                    <a href="../panier/panier.html" class="btn btn-outline">
                        Voir le panier
                    </a>
                </div>
            `;
        } else {
            return `
                <div class="product-cart-section">
                    <div class="quantity-selector">
                        <label for="quantity">Quantité:</label>
                        <select id="quantity" class="quantity-select">
                            ${Array.from({ length: 10 }, (_, i) => i + 1)
                                .map((num) => `<option value="${num}">${num}</option>`)
                                .join("")}
                        </select>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn-large">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 7h13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Ajouter au panier
                    </button>
                </div>
            `;
        }
    }

    bindCartEvents() {
        if (!this.currentUser || !this.currentProduct) return;

        const addToCartBtn = document.querySelector(".add-to-cart-btn-large");
        const removeFromCartBtn = document.querySelector(".remove-from-cart-btn");
        const minusBtn = document.querySelector(".qty-btn.minus");
        const plusBtn = document.querySelector(".qty-btn.plus");
        const quantitySelect = document.querySelector(".quantity-select");

        if (addToCartBtn) {
            addToCartBtn.addEventListener("click", () => {
                const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
                this.cartManager.addToCart(
                    {
                        id: this.currentProduct.id,
                        name: this.currentProduct.nom,
                        price: this.currentProduct.prix,
                        image: this.currentProduct.image,
                    },
                    quantity
                );
                this.renderProduct(this.currentProduct);
                this.bindCartEvents();
                // Note: Le toast est déjà affiché par CartManager.addToCart()
            });
        }

        if (removeFromCartBtn) {
            removeFromCartBtn.addEventListener("click", () => {
                this.cartManager.removeFromCart(this.currentProduct.id);
                this.renderProduct(this.currentProduct);
                this.bindCartEvents();
                ToastManager.success("Produit retiré du panier");
            });
        }

        if (minusBtn) {
            minusBtn.addEventListener("click", () => {
                const currentQuantity = this.cartManager.getItemQuantity(this.currentProduct.id);
                this.cartManager.updateQuantity(this.currentProduct.id, currentQuantity - 1);
                this.renderProduct(this.currentProduct);
                this.bindCartEvents();
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener("click", () => {
                const currentQuantity = this.cartManager.getItemQuantity(this.currentProduct.id);
                this.cartManager.updateQuantity(this.currentProduct.id, currentQuantity + 1);
                this.renderProduct(this.currentProduct);
                this.bindCartEvents();
            });
        }
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

    showLoading() {
        this.content.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading product...</p>
                </div>
            </div>
        `;
    }

    hideLoading() {
        // Loading will be hidden when content is rendered
    }

    handleError(message) {
        this.content.innerHTML = `
            <div class="error-message">
                <div class="error-content">
                    <h2>Error</h2>
                    <p>${message}</p>
                    <button onclick="window.location.reload()" class="retry-button">Retry</button>
                    <button onclick="window.location.href='/'" class="back-button">Back to Home</button>
                </div>
            </div>
        `;
    }

    handleProductNotFound() {
        this.content.innerHTML = `
            <div class="error-message">
                <div class="error-content">
                    <h2>Product Not Found</h2>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <button onclick="window.location.href='/'" class="back-button">Back to Home</button>
                </div>
            </div>
        `;
    }
}
