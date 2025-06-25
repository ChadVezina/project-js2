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
        this.loadProduct(productId);
    }

    getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

    loadProduct(productId) {
        const product = this.productsManager.getProductById(productId);

        if (product) {
            this.renderProduct(product);
        } else {
            this.handleProductNotFound();
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

    handleProductNotFound() {
        window.location.href = "/";
    }
}