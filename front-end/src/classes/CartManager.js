import { EventEmitter } from "../utils/event-emitter.js";
import { ToastManager } from "./ToastManager.js";

export class CartManager extends EventEmitter {
    constructor() {
        super();
        this.cart = this.loadCartFromStorage();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    bindEvents() {
        // Écouter les événements de connexion/déconnexion
        window.addEventListener("userLoggedIn", () => {
            this.cart = this.loadCartFromStorage();
            this.updateCartUI();
        });

        window.addEventListener("userLoggedOut", () => {
            this.clearCart();
        });
    }

    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find((item) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price) || 0,
                image: product.image,
                quantity: parseInt(quantity) || 1,
            });
        }

        this.saveCartToStorage();
        this.updateCartUI();
        this.emit("itemAdded", { product, quantity });

        // Afficher une notification toast
        ToastManager.success(`${product.name} ajouté au panier`);
    }

    removeFromCart(productId) {
        const itemIndex = this.cart.findIndex((item) => item.id === productId);
        if (itemIndex > -1) {
            const removedItem = this.cart.splice(itemIndex, 1)[0];
            this.saveCartToStorage();
            this.updateCartUI();
            this.emit("itemRemoved", removedItem);
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find((item) => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCartToStorage();
                this.updateCartUI();
                this.emit("quantityUpdated", { productId, quantity });
            }
        }
    }

    getCart() {
        return [...this.cart];
    }

    getCartCount() {
        return this.cart.reduce((total, item) => {
            const quantity = parseInt(item.quantity) || 0;
            return total + quantity;
        }, 0);
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartUI();
        this.emit("cartCleared");

        // Afficher une notification toast
        ToastManager.info("Panier vidé");
        this.emit("cartCleared");
    }

    loadCartFromStorage() {
        try {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (!currentUser) return [];

            const cartData = localStorage.getItem(`cart_${currentUser.id}`);
            if (!cartData) return [];

            const cart = JSON.parse(cartData);

            return cart.map(item => ({
                ...item,
                price: parseFloat(item.price) || 0,
                quantity: parseInt(item.quantity) || 1
            }));
        } catch (error) {
            console.error("Erreur lors du chargement du panier:", error);
            return [];
        }
    }

    saveCartToStorage() {
        try {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (currentUser) {
                localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(this.cart));
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du panier:", error);
        }
    }

    updateCartUI() {
        const cartCount = this.getCartCount();
        const cartTotal = this.getCartTotal();

        // Mettre à jour le compteur dans le header
        const cartCountElement = document.querySelector(".cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? "block" : "none";
        }

        // Émettre un événement pour mettre à jour l'interface
        this.emit("cartUpdated", { count: cartCount, total: cartTotal, items: this.cart });
    }

    isInCart(productId) {
        return this.cart.some((item) => item.id === productId);
    }

    getItemQuantity(productId) {
        const item = this.cart.find((item) => item.id === productId);
        return item ? item.quantity : 0;
    }
}
