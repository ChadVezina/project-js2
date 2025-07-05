import { ProductsManager } from "../utils/products-manager.js";
import { ProductGrid } from "./ProductGrid.js";
import { FilterManager } from "./FilterManager.js";
import { PaginationManager } from "./PaginationManager.js";

export class CubeShopApp {
    constructor() {
        this.productsManager = new ProductsManager();
        this.productGrid = null;
        this.filterManager = null;
        this.paginationManager = null;
        this.currentFilter = null;
        this.allProducts = [];
        this.isLoading = false;
        this.init();
    }

    async init() {
        this.setupComponents();
        this.bindEvents();
        await this.loadInitialProducts();
    }

    setupComponents() {
        const contentDiv = document.querySelector(".content");

        // Create button container if it doesn't exist
        let buttonContainer = contentDiv.querySelector(".button-container");
        if (!buttonContainer) {
            buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";
            contentDiv.appendChild(buttonContainer);
        }

        // Initialize components
        this.filterManager = new FilterManager(buttonContainer);
        this.productGrid = new ProductGrid(contentDiv);
        this.paginationManager = new PaginationManager(buttonContainer);
    }

    bindEvents() {
        // Listen for filter changes
        this.filterManager.on("filterChange", (filterData) => {
            this.handleFilterChange(filterData);
        });

        // Listen for pagination events
        this.paginationManager.on("loadMore", () => {
            this.loadMoreProducts();
        });

        // Listen for refresh events
        this.filterManager.on("refresh", () => {
            this.refreshProducts();
        });
    }

    async loadInitialProducts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();

        try {
            this.allProducts = await this.productsManager.getAllProducts();
            this.productGrid.render(this.allProducts.slice(0, 6));
            this.filterManager.updateBrands(this.allProducts);
            this.paginationManager.updateState(6, this.allProducts.length);
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Failed to load products. Please try again.');
        } finally {
            this.hideLoading();
            this.isLoading = false;
        }
    }

    handleFilterChange(filterData) {
        this.currentFilter = filterData;
        const filteredProducts = this.getFilteredProducts();
        this.productGrid.clear();
        this.productGrid.render(filteredProducts.slice(0, 6));
        this.paginationManager.updateState(6, filteredProducts.length);
    }

    loadMoreProducts() {
        const filteredProducts = this.getFilteredProducts();
        const currentCount = this.productGrid.getProductCount();
        const newProducts = filteredProducts.slice(currentCount, currentCount + 6);
        this.productGrid.addProducts(newProducts);
        this.paginationManager.updateState(currentCount + newProducts.length, filteredProducts.length);
    }

    getFilteredProducts() {
        if (!this.currentFilter || !this.currentFilter.brand) {
            return this.allProducts;
        }
        return this.allProducts.filter((product) => product.marque === this.currentFilter.brand);
    }

    async refreshProducts() {
        this.productsManager.clearCache();
        await this.loadInitialProducts();
    }

    showLoading() {
        const contentDiv = document.querySelector(".content");
        let loadingDiv = contentDiv.querySelector(".loading-message");
        
        if (!loadingDiv) {
            loadingDiv = document.createElement("div");
            loadingDiv.className = "loading-message";
            loadingDiv.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading products...</p>
                </div>
            `;
            contentDiv.appendChild(loadingDiv);
        }
        
        loadingDiv.style.display = "block";
    }

    hideLoading() {
        const loadingDiv = document.querySelector(".loading-message");
        if (loadingDiv) {
            loadingDiv.style.display = "none";
        }
    }

    showError(message) {
        const contentDiv = document.querySelector(".content");
        let errorDiv = contentDiv.querySelector(".error-message");
        
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            contentDiv.appendChild(errorDiv);
        }
        
        errorDiv.innerHTML = `
            <div class="error-content">
                <p>${message}</p>
                <button class="retry-button" onclick="window.location.reload()">Retry</button>
            </div>
        `;
        errorDiv.style.display = "block";
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 5000);
    }
}
