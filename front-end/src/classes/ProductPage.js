import { ProductsManager } from "../utils/products-manager.js";

export class ProductPage {
    constructor(options = {}) {
        this.productsManager = new ProductsManager();
        this.content = null;
        this.options = options;
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
                this.renderProduct(product);
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
                    </div>
                </div>
            </div>
        `;
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
