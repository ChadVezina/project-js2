import { EventEmitter } from "../utils/event-emitter.js";
import { FormValidator } from "./FormValidator.js";
import { ProductService } from "./ProductService.js";

export class FormManager extends EventEmitter {
    constructor(options = {}) {
        super();
        this.form = null; // Will be set in init()
        this.validator = new FormValidator();
        this.isSubmitting = false;
        this.options = options;
    }

    async init() {
        // Wait for DOM to be ready
        await this.waitForDOM();

        // Add additional delay to ensure form is fully rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Find the form element
        this.form = document.querySelector("form");

        if (!this.form) {
            throw new Error("Form element not found");
        }

        // Verify that form is a valid DOM element
        if (!this.form || typeof this.form.addEventListener !== "function") {
            console.error("Form element is not valid:", this.form);
            throw new Error("Form element is not a valid DOM element");
        }

        this.bindEvents();
        this.setupRealTimeValidation();
        this.addRequiredAttributes();
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    addRequiredAttributes() {
        const inputs = this.form.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            input.setAttribute("required", "true");
        });
    }

    bindEvents() {
        this.form.addEventListener("submit", (e) => this.handleSubmit(e));

        const cancelBtn = this.form.querySelector(".btn-secondary");
        if (cancelBtn) {
            cancelBtn.addEventListener("click", (e) => {
                e.preventDefault();
                this.handleCancel();
            });
        }
    }

    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll(".form-group input, .form-group textarea");
        inputs.forEach((input) => {
            input.addEventListener("blur", () => {
                if (input.value.trim()) {
                    this.validator.validateField(input);
                }
            });

            input.addEventListener("input", () => {
                if (input.classList.contains("form-group__input--error")) {
                    this.validator.clearFieldError(input);
                }
            });

            input.addEventListener("focus", () => {
                input.parentElement.classList.add("form-group--focused");
            });

            input.addEventListener("blur", () => {
                input.parentElement.classList.remove("form-group--focused");
            });
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.isSubmitting) return;

        this.validator.clearAllErrors();

        const formData = new FormData(this.form);
        const productData = Object.fromEntries(formData.entries());

        const isValid = this.validator.validateForm(productData);

        if (!isValid) {
            this.validator.displayGeneralErrors();

            const firstErrorInput = this.form.querySelector(".form-group__input--error");
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
            return;
        }

        try {
            this.isSubmitting = true;
            this.showLoadingState();

            // Submit to backend via ProductService
            const response = await this.submitToBackend(productData);
            this.handleSuccess(response);
        } catch (error) {
            this.handleError(error);
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }

    async submitToBackend(productData) {
        // Prepare data for backend
        const backendData = {
            nom: productData.nom.trim(),
            marque: productData.marque.trim(),
            image: productData.image.trim(),
            prix: parseFloat(productData.prix).toFixed(2),
            description: productData.description.trim(),
        };

        // Optional: Validate image URL before submission
        try {
            await ProductService.checkImageUrl(backendData.image);
        } catch (imageError) {
            throw new Error(`Image validation failed: ${imageError.message}`);
        }

        // Submit to backend
        return await ProductService.submitProduct(backendData);
    }

    handleSuccess(response) {
        this.showSuccessMessage(response);
        this.form.reset();
        this.validator.clearAllErrors();

        setTimeout(() => {
            const shouldRedirect = confirm("Produit soumis avec succès! Il sera affiché après approbation.\n\nVoulez-vous retourner à l'accueil?");

            if (shouldRedirect) {
                window.location.href = "../../index.html";
            }
        }, 2500);
    }

    handleError(error) {
        console.error("Error submitting product:", error);

        // Show user-friendly error message
        const errorContainer = document.createElement("div");
        errorContainer.className = "text-error";

        let errorMessage = "Une erreur est survenue lors de la soumission du produit.";

        // Handle specific error types
        if (error.message.includes("Server temporarily unavailable")) {
            errorMessage = "Le serveur est temporairement indisponible. Veuillez réessayer dans quelques instants.";
        } else if (error.message.includes("Image validation failed")) {
            errorMessage = error.message.replace("Image validation failed: ", "Erreur d'image: ");
        } else if (error.message.includes("Product name cannot contain")) {
            errorMessage = "Le nom du produit ne peut pas contenir certains mots interdits.";
        }

        errorContainer.innerHTML = `
            <ul>
                <li>${errorMessage}</li>
            </ul>
        `;

        this.form.insertBefore(errorContainer, this.form.firstChild);

        // Remove error after 8 seconds
        setTimeout(() => {
            if (errorContainer.parentElement) {
                errorContainer.remove();
            }
        }, 8000);
    }

    handleCancel() {
        if (confirm("Êtes-vous sûr de vouloir annuler? Toutes les données saisies seront perdues.")) {
            this.form.reset();
            this.validator.clearAllErrors();
            window.location.href = "../../index.html";
        }
    }

    showLoadingState() {
        const submitBtn = this.form.querySelector(".btn-primary");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Envoi en cours...";
            submitBtn.classList.add("btn--loading");
        }
    }

    hideLoadingState() {
        const submitBtn = this.form.querySelector(".btn-primary");
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sauvegarder";
            submitBtn.classList.remove("btn--loading");
        }
    }

    showSuccessMessage(response) {
        const successDiv = document.createElement("div");
        successDiv.className = "form__success-message";
        successDiv.innerHTML = `
            <div class="form__success-content">
                <span class="form__success-icon">✓</span>
                <div class="form__success-details">
                    <span class="form__success-text">Produit soumis avec succès!</span>
                    <small class="form__success-subtext">
                        ID: ${response.data?.id || 'N/A'} | Status: En attente d'approbation
                    </small>
                </div>
            </div>
        `;
        this.form.insertBefore(successDiv, this.form.firstChild);

        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 4000);
    }
}
