import { CartManager } from "./CartManager.js";
import { ToastManager } from "./ToastManager.js";
import { apiConnectionManager } from "../utils/api-connection-manager.js";
import { AuthGuard } from "../utils/auth-guard.js";

/**
 * Classe pour gérer la page du panier
 */
export class PanierPage {
    constructor() {
        this.cartManager = null;
        this.isLoading = false;
    }

    async init() {
        // Show loading initially
        this.showLoading(true);

        apiConnectionManager.init();

        const isAuthenticated = await AuthGuard.checkAuthentication();

        if (!isAuthenticated) {
            window.location.href = "../auth/auth.html?redirect=panier";
            return;
        }

        this.setupComponents();
        this.bindEvents();
        await this.loadCart();

        // Hide loading after everything is set up
        this.showLoading(false);
    }

    setupComponents() {
        this.cartManager = new CartManager();
    }

    bindEvents() {
        this.cartManager.on("cartUpdated", (data) => {
            this.updateCartDisplay(data);
        });

        this.cartManager.on("itemRemoved", () => {
            ToastManager.success("Article retiré du panier");
        });

        this.cartManager.on("cartCleared", () => {
            ToastManager.success("Panier vidé");
        });

        // UI events
        this.bindUIEvents();
    }

    bindUIEvents() {
        const clearCartBtn = document.querySelector(".clear-cart-btn");
        if (clearCartBtn) {
            clearCartBtn.addEventListener("click", () => {
                this.showConfirmModal("Êtes-vous sûr de vouloir vider votre panier ?", () => this.cartManager.clearCart());
            });
        }

        const checkoutBtn = document.querySelector(".checkout-btn");
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", () => {
                window.location.href = "../checkout/checkout.html";
            });
        }

        this.bindModalEvents();
    }

    bindModalEvents() {
        const modal = document.getElementById("confirmModal");
        if (!modal) return;

        const closeBtn = modal.querySelector(".modal-close");
        const cancelBtn = modal.querySelector(".cancel-btn");

        [closeBtn, cancelBtn].forEach((btn) => {
            if (btn) {
                btn.addEventListener("click", () => this.hideConfirmModal());
            }
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.hideConfirmModal();
            }
        });
    }

    async loadCart() {
        try {
            // Add a small delay to simulate loading (optional, can be removed)
            await new Promise((resolve) => setTimeout(resolve, 100));

            const cartData = {
                items: this.cartManager.getCart(),
                count: this.cartManager.getCartCount(),
                total: this.cartManager.getCartTotal(),
            };

            this.updateCartDisplay(cartData);
        } catch (error) {
            console.error("Erreur lors du chargement du panier:", error);
            ToastManager.error("Erreur lors du chargement du panier");
        }
    }

    updateCartDisplay(cartData) {
        const { items, count, total } = cartData;

        const cartEmpty = document.querySelector(".cart-empty");
        const cartItems = document.querySelector(".cart-items");

        if (count === 0) {
            if (cartEmpty) cartEmpty.style.display = "block";
            if (cartItems) cartItems.style.display = "none";
        } else {
            if (cartEmpty) cartEmpty.style.display = "none";
            if (cartItems) cartItems.style.display = "block";
            this.renderCartItems(items);
            this.updateCartSummary(total);
        }
    }

    renderCartItems(items) {
        const cartList = document.querySelector(".cart-list");
        if (!cartList) return;

        cartList.innerHTML = "";

        items.forEach((item) => {
            const cartItemElement = this.createCartItemElement(item);
            cartList.appendChild(cartItemElement);
        });
    }

    createCartItemElement(item) {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.dataset.productId = item.id;
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;

        itemEl.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">${price.toFixed(2)} $</p>
            </div>
            <div class="item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn minus" data-action="decrease">-</button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="qty-btn plus" data-action="increase">+</button>
                </div>
                <button class="remove-item-btn" title="Retirer l'article">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="item-total">
                ${(price * quantity).toFixed(2)} $
            </div>
        `;

        this.bindItemEvents(itemEl, item);
        return itemEl;
    }

    bindItemEvents(itemEl, item) {
        const productId = item.id;
        const currentQuantity = parseInt(item.quantity) || 1;

        // Quantity controls
        const minusBtn = itemEl.querySelector(".qty-btn.minus");
        const plusBtn = itemEl.querySelector(".qty-btn.plus");
        const quantityDisplay = itemEl.querySelector(".quantity-display");
        const removeBtn = itemEl.querySelector(".remove-item-btn");

        if (minusBtn) {
            minusBtn.addEventListener("click", () => {
                const newQuantity = Math.max(1, currentQuantity - 1);
                this.cartManager.updateQuantity(productId, newQuantity);
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener("click", () => {
                const newQuantity = Math.min(99, currentQuantity + 1);
                this.cartManager.updateQuantity(productId, newQuantity);
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                this.showConfirmModal(`Êtes-vous sûr de vouloir retirer "${item.name}" de votre panier ?`, () =>
                    this.cartManager.removeFromCart(productId)
                );
            });
        }
    }

    updateCartSummary(subtotal) {
        const taxRate = 0.14975; // TPS + TVQ
        const subtotalNum = parseFloat(subtotal) || 0;
        const taxes = subtotalNum * taxRate;
        const total = subtotalNum + taxes;

        const subtotalEl = document.querySelector(".subtotal");
        const taxesEl = document.querySelector(".taxes");
        const totalEl = document.querySelector(".total");

        if (subtotalEl) subtotalEl.textContent = `${subtotalNum.toFixed(2)} $`;
        if (taxesEl) taxesEl.textContent = `${taxes.toFixed(2)} $`;
        if (totalEl) totalEl.textContent = `${total.toFixed(2)} $`;
    }

    showConfirmModal(message, onConfirm) {
        const modal = document.getElementById("confirmModal");
        if (!modal) return;

        const messageEl = document.getElementById("confirmMessage");
        const confirmBtn = modal.querySelector(".confirm-btn");

        if (messageEl) messageEl.textContent = message;
        modal.style.display = "flex";

        if (confirmBtn) {
            const newConfirmBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

            newConfirmBtn.addEventListener("click", () => {
                onConfirm();
                this.hideConfirmModal();
            });
        }
    }

    hideConfirmModal() {
        const modal = document.getElementById("confirmModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    showLoading(show = true) {
        const loadingState = document.querySelector(".loading-state");
        const cartContent = document.querySelector(".cart-content");

        if (!loadingState || !cartContent) {
            console.warn("Loading elements not found in DOM");
            return;
        }

        if (show) {
            loadingState.style.display = "flex";
            cartContent.style.display = "none";
        } else {
            loadingState.style.display = "none";
            cartContent.style.display = "block";
        }
    }
}
