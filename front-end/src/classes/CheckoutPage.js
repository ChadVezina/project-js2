import { CartManager } from "./CartManager.js";
import { ToastManager } from "./ToastManager.js";
import { apiConnectionManager } from "../utils/api-connection-manager.js";
import { AuthGuard } from "../utils/auth-guard.js";

export class CheckoutPage {
    constructor() {
        this.cartManager = null;
        this.deliveryOptions = {
            standard: { price: 0, label: "Gratuit" },
            express: { price: 9.99, label: "9,99 $" },
            overnight: { price: 19.99, label: "19,99 $" },
        };
        this.selectedDelivery = "standard";
        this.orderData = {};
    }

    async init() {
        // Initialize API connection
        apiConnectionManager.init();

        // Guard the page - require authentication
        const isAuthenticated = await AuthGuard.checkAuthentication();

        if (!isAuthenticated) {
            window.location.href = "../auth/auth.html?redirect=checkout";
            return;
        }

        this.setupComponents();
        this.bindEvents();
        this.loadOrderData();
        this.validateForm();
    }

    setupComponents() {
        this.cartManager = new CartManager();
        this.prefillUserData();
    }

    bindEvents() {
        // Form validation
        const form = document.getElementById("deliveryForm");
        if (form) {
            form.addEventListener("input", () => this.validateForm());
            form.addEventListener("change", () => this.validateForm());
        }

        // Delivery options
        const deliveryInputs = document.querySelectorAll('input[name="delivery"]');
        deliveryInputs.forEach((input) => {
            input.addEventListener("change", (e) => {
                this.selectedDelivery = e.target.value;
                this.updateOrderSummary();
            });
        });

        // Place order button
        const placeOrderBtn = document.querySelector(".place-order-btn");
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener("click", (e) => {
                if (placeOrderBtn.disabled) {
                    e.preventDefault();
                    this.showValidationErrors();
                    return;
                }
                this.showConfirmationModal();
            });
        }

        // Confirmation modal events
        const confirmOrderBtn = document.querySelector(".confirm-order-btn");
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener("click", () => this.confirmAndPlaceOrder());
        }

        const cancelConfirmationBtn = document.querySelector(".cancel-confirmation-btn");
        if (cancelConfirmationBtn) {
            cancelConfirmationBtn.addEventListener("click", () => this.hideConfirmationModal());
        }

        const confirmationModal = document.getElementById("confirmationModal");
        if (confirmationModal) {
            confirmationModal.addEventListener("click", (e) => {
                if (e.target === confirmationModal) {
                    this.hideConfirmationModal();
                }
            });
        }

        const postalCodeInput = document.getElementById("postalCode");
        if (postalCodeInput) {
            postalCodeInput.addEventListener("input", this.formatPostalCode);
        }
    }

    prefillUserData() {
        try {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (currentUser) {
                const emailInput = document.getElementById("email");
                if (emailInput && currentUser.email) {
                    emailInput.value = currentUser.email;
                }

                const savedAddress = localStorage.getItem(`address_${currentUser.id}`);
                if (savedAddress) {
                    const addressData = JSON.parse(savedAddress);
                    this.fillAddressForm(addressData);
                }
            }
        } catch (error) {
            console.error("Erreur lors du pré-remplissage:", error);
        }
    }

    fillAddressForm(addressData) {
        Object.keys(addressData).forEach((key) => {
            const input = document.getElementById(key);
            if (input) {
                input.value = addressData[key];
            }
        });
    }

    loadOrderData() {
        const cartItems = this.cartManager.getCart();

        if (cartItems.length === 0) {
            ToastManager.warning("Votre panier est vide");
            setTimeout(() => {
                window.location.href = "../panier/panier.html";
            }, 1000);
            return;
        }

        this.renderOrderItems(cartItems);
        this.updateOrderSummary();
    }

    renderOrderItems(items) {
        const orderItemsContainer = document.querySelector(".order-items");
        if (!orderItemsContainer) return;

        orderItemsContainer.innerHTML = "";

        items.forEach((item) => {
            const itemElement = this.createOrderItemElement(item);
            orderItemsContainer.appendChild(itemElement);
        });
    }

    createOrderItemElement(item) {
        const itemEl = document.createElement("div");
        itemEl.className = "order-item";
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;

        itemEl.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">${price.toFixed(2)} $ × ${quantity}</p>
            </div>
            <div class="item-total">
                ${(price * quantity).toFixed(2)} $
            </div>
        `;

        return itemEl;
    }

    updateOrderSummary() {
        const cartItems = this.cartManager.getCart();
        const subtotal = parseFloat(this.cartManager.getCartTotal()) || 0;
        const shippingCost = parseFloat(this.deliveryOptions[this.selectedDelivery].price) || 0;
        const taxRate = 0.14975; // TPS + TVQ
        const taxes = (subtotal + shippingCost) * taxRate;
        const total = subtotal + shippingCost + taxes;

        // Mettre à jour les affichages
        const subtotalEl = document.querySelector(".subtotal");
        const shippingEl = document.querySelector(".shipping-cost");
        const taxesEl = document.querySelector(".taxes");
        const totalEl = document.querySelector(".total");

        if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} $`;
        if (shippingEl) shippingEl.textContent = this.deliveryOptions[this.selectedDelivery].label;
        if (taxesEl) taxesEl.textContent = `${taxes.toFixed(2)} $`;
        if (totalEl) totalEl.textContent = `${total.toFixed(2)} $`;

        // Sauvegarder les données de commande
        this.orderData = {
            items: cartItems,
            subtotal,
            shippingCost,
            taxes,
            total,
            delivery: this.selectedDelivery,
        };
    }

    validateForm() {
        const form = document.getElementById("deliveryForm");
        const placeOrderBtn = document.querySelector(".place-order-btn");

        if (!form || !placeOrderBtn) return;

        const requiredFields = form.querySelectorAll("input[required], select[required]");
        let isValid = true;
        let invalidFields = [];

        // Nettoyer les erreurs précédentes
        this.clearValidationErrors();

        requiredFields.forEach((field) => {
            const fieldContainer = field.closest(".form-group");

            if (!field.value.trim()) {
                isValid = false;
                invalidFields.push(field);

                // Ajouter une classe d'erreur
                fieldContainer?.classList.add("field-error");
                fieldContainer?.classList.remove("field-valid");
                field.classList.add("invalid");
                field.classList.remove("valid");
            } else {
                // Enlever la classe d'erreur et ajouter la classe valide
                fieldContainer?.classList.remove("field-error");
                fieldContainer?.classList.add("field-valid");
                field.classList.remove("invalid");
                field.classList.add("valid");
            }
        });

        // Validation spéciale pour le code postal canadien
        const postalCodeEl = document.getElementById("postalCode");
        if (postalCodeEl && postalCodeEl.value) {
            const postalCode = postalCodeEl.value;
            const postalCodePattern = /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/;
            const fieldContainer = postalCodeEl.closest(".form-group");

            if (!postalCodePattern.test(postalCode)) {
                isValid = false;
                invalidFields.push(postalCodeEl);
                fieldContainer?.classList.add("field-error");
                fieldContainer?.classList.remove("field-valid");
                postalCodeEl.classList.add("invalid");
                postalCodeEl.classList.remove("valid");
            } else {
                fieldContainer?.classList.remove("field-error");
                fieldContainer?.classList.add("field-valid");
                postalCodeEl.classList.remove("invalid");
                postalCodeEl.classList.add("valid");
            }
        }

        // Mettre à jour le bouton et le message d'aide
        this.updateButtonState(isValid, invalidFields);
    }

    clearValidationErrors() {
        // Enlever toutes les classes d'erreur et de validation
        document.querySelectorAll(".field-error").forEach((el) => el.classList.remove("field-error"));
        document.querySelectorAll(".field-valid").forEach((el) => el.classList.remove("field-valid"));
        document.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
        document.querySelectorAll(".valid").forEach((el) => el.classList.remove("valid"));
    }

    updateButtonState(isValid, invalidFields) {
        const placeOrderBtn = document.querySelector(".place-order-btn");

        if (!placeOrderBtn) return;

        placeOrderBtn.disabled = !isValid;

        if (isValid) {
            placeOrderBtn.style.opacity = "1";
            placeOrderBtn.style.cursor = "pointer";
            placeOrderBtn.textContent = "Confirmer la commande";
        } else {
            placeOrderBtn.style.opacity = "0.6";
            placeOrderBtn.style.cursor = "not-allowed";
            placeOrderBtn.textContent = `Remplir les champs requis (${invalidFields.length})`;
        }
    }

    showValidationErrors() {
        // Faire défiler vers le premier champ invalide
        const firstInvalidField = document.querySelector(".invalid");
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            // Flash du champ pour attirer l'attention
            firstInvalidField.style.animation = "shake 0.5s ease-in-out";
            setTimeout(() => {
                firstInvalidField.style.animation = "";
            }, 500);
        }

        // Afficher un toast informatif
        ToastManager.warning("Veuillez remplir tous les champs obligatoires pour continuer");
    }

    formatPostalCode(e) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

        if (value.length > 3) {
            value = value.substring(0, 3) + " " + value.substring(3, 6);
        }

        e.target.value = value;
    }

    showConfirmationModal() {
        const modal = document.getElementById("confirmationModal");
        if (modal) {
            modal.style.display = "flex";
        }
    }

    hideConfirmationModal() {
        const modal = document.getElementById("confirmationModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    async confirmAndPlaceOrder() {
        this.hideConfirmationModal();
        await this.placeOrder();
    }

    async placeOrder() {
        try {
            this.showLoading(true);

            // Collecter les données du formulaire
            const formData = this.collectFormData();

            // Sauvegarder l'adresse pour usage futur
            this.saveAddressData(formData);

            const result = await this.submitOrder(formData);

            // Vider le panier
            this.cartManager.clearCart();

            // Afficher le succès
            ToastManager.success(`Commande passée avec succès! Numéro: ${result.orderNumber}`);
            this.showSuccessModal();
        } catch (error) {
            console.error("Erreur lors de la commande:", error);
            ToastManager.error("Erreur lors de la commande. Veuillez réessayer.");
        } finally {
            this.showLoading(false);
        }
    }

    collectFormData() {
        const form = document.getElementById("deliveryForm");
        if (!form) return {};

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return {
            ...data,
            delivery: this.selectedDelivery,
            order: this.orderData,
        };
    }

    saveAddressData(formData) {
        try {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (currentUser) {
                const addressData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    province: formData.province,
                    postalCode: formData.postalCode,
                };
                localStorage.setItem(`address_${currentUser.id}`, JSON.stringify(addressData));
                ToastManager.info("Adresse sauvegardée pour vos prochaines commandes");
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'adresse:", error);
        }
    }

    async submitOrder(orderData) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const orderNumber = "CMD" + Date.now().toString().slice(-6);

        return { orderNumber };
    }

    showSuccessModal() {
        const modal = document.getElementById("successModal");
        const orderNumber = "CMD" + Date.now().toString().slice(-6);

        if (!modal) {
            ToastManager.success(`Commande confirmée ! Numéro: ${orderNumber}`);
            setTimeout(() => {
                window.location.href = "../../../index.html";
            }, 5000);
            return;
        }

        const orderNumberEl = document.getElementById("orderNumber");
        if (orderNumberEl) {
            orderNumberEl.textContent = orderNumber;
        }

        modal.style.display = "flex";
        const returnHomeBtn = modal.querySelector(".btn-primary");
        if (returnHomeBtn) {
            returnHomeBtn.onclick = () => {
                console.log("Redirection manuelle vers l'accueil...");
                window.location.href = "../../../index.html";
            };
        }
    }

    showLoading(show = true) {
        const overlay = document.getElementById("loadingOverlay");
        if (overlay) {
            overlay.style.display = show ? "flex" : "none";
        }
    }
}
