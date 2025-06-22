import { produits } from "../../data/products.js";

const STORAGE_KEY = "cubeshop-products";

export class ProductsManager {
    static getAllProducts() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with default products if not found
            localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
            return [...produits];
        }
        return JSON.parse(stored);
    }

    static getProductById(id) {
        const products = this.getAllProducts();
        return products.find((product) => product.id === parseInt(id));
    }

    static addProduct(productData) {
        const products = this.getAllProducts();
        const newProduct = {
            ...productData,
            id: Date.now(),
            prix: parseFloat(productData.prix).toFixed(2),
        };

        products.unshift(newProduct); // Add at beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return newProduct;
    }

    static updateProduct(id, productData) {
        const products = this.getAllProducts();
        const index = products.findIndex((product) => product.id === parseInt(id));

        if (index !== -1) {
            products[index] = {
                ...products[index],
                ...productData,
                id: parseInt(id), // Keep original ID
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    static deleteProduct(id) {
        const products = this.getAllProducts();
        const filteredProducts = products.filter((product) => product.id !== parseInt(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
        return filteredProducts.length < products.length;
    }

    static resetToDefault() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
        return [...produits];
    }
}
