import { apiService } from "../services/apiService.js";

export class ProductsManager {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async getAllProducts() {
        const cacheKey = "all_products";
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await apiService.getAllProducts();
            const products = response.data || response;

            this.cache.set(cacheKey, {
                data: products,
                timestamp: Date.now(),
            });

            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            // Return cached data if available, otherwise empty array
            return cached ? cached.data : [];
        }
    }

    async getProductById(id) {
        const cacheKey = `product_${id}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await apiService.getProductById(id);
            const product = response.data || response;

            this.cache.set(cacheKey, {
                data: product,
                timestamp: Date.now(),
            });

            return product;
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    }

    async addProduct(productData) {
        try {
            const response = await apiService.createProduct(productData);
            const newProduct = response.data || response;

            // Clear cache to force refresh
            this.cache.clear();

            return newProduct;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const response = await apiService.updateProduct(id, productData);
            const updatedProduct = response.data || response;

            // Clear cache to force refresh
            this.cache.clear();

            return updatedProduct;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await apiService.deleteProduct(id);

            // Clear cache to force refresh
            this.cache.clear();

            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    clearCache() {
        this.cache.clear();
    }
}
