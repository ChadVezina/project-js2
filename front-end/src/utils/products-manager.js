import { produits } from "../../data/products.js";

const STORAGE_KEY = "cubeshop-products";

export class ProductsManager {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
        }
    }

    getAllProducts() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [...produits];
    }

    getProductById(id) {
        const products = this.getAllProducts();
        return products.find((product) => product.id === parseInt(id));
    }

    addProduct(productData) {
        const products = this.getAllProducts();
        const newProduct = {
            ...productData,
            id: Date.now(),
            prix: parseFloat(productData.prix).toFixed(2),
        };

        products.unshift(newProduct);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return newProduct;
    }

    updateProduct(id, productData) {
        const products = this.getAllProducts();
        const index = products.findIndex((product) => product.id === parseInt(id));

        if (index !== -1) {
            products[index] = {
                ...products[index],
                ...productData,
                id: parseInt(id),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getAllProducts();
        const filteredProducts = products.filter((product) => product.id !== parseInt(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
        return filteredProducts.length < products.length;
    }

    resetToDefault() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(produits));
        return [...produits];
    }
}
