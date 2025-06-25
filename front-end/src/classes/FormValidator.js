export class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateForm(productData) {
        this.errors = {};
        let isValid = true;

        // Validate name
        if (!productData.nom || productData.nom.trim().length < 2) {
            this.errors.nom = "Le nom doit contenir au moins 2 caractères";
            isValid = false;
        } else if (productData.nom.trim().length > 100) {
            this.errors.nom = "Le nom ne peut pas dépasser 100 caractères";
            isValid = false;
        }

        // Validate brand
        if (!productData.marque || productData.marque.trim().length < 2) {
            this.errors.marque = "La marque doit contenir au moins 2 caractères";
            isValid = false;
        } else if (productData.marque.trim().length > 50) {
            this.errors.marque = "La marque ne peut pas dépasser 50 caractères";
            isValid = false;
        }

        // Validate price
        const price = parseFloat(productData.prix);
        if (!productData.prix || isNaN(price)) {
            this.errors.prix = "Le prix doit être un nombre valide";
            isValid = false;
        } else if (price <= 0) {
            this.errors.prix = "Le prix doit être supérieur à 0";
            isValid = false;
        } else if (price > 10000) {
            this.errors.prix = "Le prix ne peut pas dépasser 10 000$";
            isValid = false;
        }

        // Validate image URL
        if (!productData.image || !this.isValidUrl(productData.image)) {
            this.errors.image = "L'URL de l'image doit être valide";
            isValid = false;
        }

        // Validate description
        if (!productData.description || productData.description.trim().length < 10) {
            this.errors.description = "La description doit contenir au moins 10 caractères";
            isValid = false;
        } else if (productData.description.trim().length > 1000) {
            this.errors.description = "La description ne peut pas dépasser 1000 caractères";
            isValid = false;
        }

        return isValid;
    }

    validateField(input) {
        const field = input.name;
        const value = input.value.trim();
        let error = null;

        switch (field) {
            case "nom":
                if (value.length > 0 && value.length < 2) {
                    error = "Le nom doit contenir au moins 2 caractères";
                } else if (value.length > 100) {
                    error = "Le nom ne peut pas dépasser 100 caractères";
                }
                break;

            case "marque":
                if (value.length > 0 && value.length < 2) {
                    error = "La marque doit contenir au moins 2 caractères";
                } else if (value.length > 50) {
                    error = "La marque ne peut pas dépasser 50 caractères";
                }
                break;

            case "prix":
                if (value.length > 0) {
                    const price = parseFloat(value);
                    if (isNaN(price)) {
                        error = "Le prix doit être un nombre valide";
                    } else if (price <= 0) {
                        error = "Le prix doit être supérieur à 0";
                    } else if (price > 10000) {
                        error = "Le prix ne peut pas dépasser 10 000$";
                    }
                }
                break;

            case "image":
                if (value.length > 0 && !this.isValidUrl(value)) {
                    error = "L'URL de l'image doit être valide";
                }
                break;

            case "description":
                if (value.length > 0 && value.length < 10) {
                    error = "La description doit contenir au moins 10 caractères";
                } else if (value.length > 1000) {
                    error = "La description ne peut pas dépasser 1000 caractères";
                }
                break;
        }

        if (error) {
            this.errors[field] = error;
            this.displayFieldError(input, error);
            return false;
        } else {
            delete this.errors[field];
            this.clearFieldError(input);
            return true;
        }
    }

    isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
        }
    }

    displayFieldError(input, error) {
        const formGroup = input.closest(".form-group");
        if (!formGroup) return;

        // Remove existing error
        const existingError = formGroup.querySelector(".form-group__error");
        if (existingError) {
            existingError.remove();
        }


        input.classList.add("form-group__input--error");

        // Create and add error element
        const errorElement = document.createElement("div");
        errorElement.className = "form-group__error";
        errorElement.textContent = error;
        formGroup.appendChild(errorElement);

        formGroup.classList.add("form-group--error");
    }

    clearFieldError(input) {
        const formGroup = input.closest(".form-group");
        if (!formGroup) return;

        const errorElement = formGroup.querySelector(".form-group__error");
        if (errorElement) {
            errorElement.remove();
        }

        input.classList.remove("form-group__input--error");
        formGroup.classList.remove("form-group--error");
    }

    clearAllErrors() {
        this.errors = {};
        
        // Clear all error elements and classes
        document.querySelectorAll(".form-group__error").forEach(error => error.remove());
        document.querySelectorAll(".form-group__input--error").forEach(input => {
            input.classList.remove("form-group__input--error");
        });
        document.querySelectorAll(".form-group--error").forEach(group => {
            group.classList.remove("form-group--error");
        });

        const generalError = document.querySelector(".text-error");
        if (generalError) {
            generalError.remove();
        }
    }

    displayGeneralErrors() {
        const existingError = document.querySelector(".text-error");
        if (existingError) {
            existingError.remove();
        }

        if (Object.keys(this.errors).length === 0) return;

        const errorContainer = document.createElement("div");
        errorContainer.className = "text-error";
        
        const errorList = document.createElement("ul");
        
        Object.values(this.errors).forEach(error => {
            const listItem = document.createElement("li");
            listItem.textContent = error;
            errorList.appendChild(listItem);
        });

        errorContainer.appendChild(errorList);

        const form = document.querySelector("form");
        form.insertBefore(errorContainer, form.firstChild);
    }
}