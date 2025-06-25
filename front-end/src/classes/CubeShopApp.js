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
        this.init();
    }

    init() {
        this.setupComponents();
        this.bindEvents();
        this.loadInitialProducts();
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

    loadInitialProducts() {
        const products = this.productsManager.getAllProducts();
        this.productGrid.render(products.slice(0, 6));
        this.filterManager.updateBrands(products);
        this.paginationManager.updateState(6, products.length);
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
        const allProducts = this.productsManager.getAllProducts();
        if (!this.currentFilter || !this.currentFilter.brand) {
            return allProducts;
        }
        return allProducts.filter((product) => product.marque === this.currentFilter.brand);
    }

    refreshProducts() {
        this.loadInitialProducts();
    }
}
