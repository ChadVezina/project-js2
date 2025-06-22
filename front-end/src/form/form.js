import "../assets/styles/styles.scss";
import "./form.scss";
import { ProductsManager } from "../utils/products-manager.js";

const form = document.querySelector("form");
const errorElement = document.querySelector(".text-error");
let errors = [];

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());

    if (formIsValid(article)) {
        // Show success feedback
        showSuccessMessage();

        // Simulate saving process
        await simulateSave(article);

        // Add product using ProductsManager
        const newProduct = ProductsManager.addProduct({
            nom: article.nom.trim(),
            marque: article.marque.trim(),
            image: article.image.trim(),
            prix: article.prix,
            description: article.description.trim(),
        });

        // Reset form after successful save
        form.reset();
        errorElement.innerHTML = "";
        clearAllFieldErrors();

        console.log("Article saved:", newProduct);

        // Optionally redirect to home page after a delay
        setTimeout(() => {
            if (confirm("Produit ajouté avec succès! Voulez-vous retourner à l'accueil pour voir le nouveau produit?")) {
                window.location.href = "../index.html";
            }
        }, 2000);
    }
});

function validatePrice(priceString) {
    // Test if it's a valid number
    if (!priceString || priceString.trim() === "") {
        return "Le prix est obligatoire !";
    }

    // Remove spaces and check format
    const cleanPrice = priceString.trim();

    // Check if it's a valid number format (including decimal)
    if (!/^\d*\.?\d+$/.test(cleanPrice)) {
        return "Le format du prix est invalide ! Utilisez le format: 45.99";
    }

    // Convert to number
    const price = parseFloat(cleanPrice);

    // Check if positive
    if (price <= 0) {
        return "Le prix doit être supérieur à 0";
    }

    // Check if not too large (adjusted for typical cube prices)
    if (price > 500) {
        return "Le prix est trop haut pour un cube !";
    }

    // Check decimal places
    if (cleanPrice.includes(".") && cleanPrice.split(".")[1]?.length > 2) {
        return "Maximum deux décimales après le point svp!";
    }

    return true;
}

function validateImageUrl(imageUrl) {
    if (!imageUrl || imageUrl.trim() === "") {
        return "L'URL de l'image est obligatoire !";
    }

    // Basic URL validation
    try {
        new URL(imageUrl);
    } catch (e) {
        return "L'URL de l'image n'est pas valide !";
    }

    // Check if it's likely an image URL
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const hasImageExtension = imageExtensions.some((ext) => imageUrl.toLowerCase().includes(ext));

    if (!hasImageExtension && !imageUrl.includes("unsplash.com") && !imageUrl.includes("imgur.com")) {
        return "L'URL ne semble pas pointer vers une image valide !";
    }

    return true;
}

function validateName(name) {
    if (!name || name.trim().length < 2) {
        return "Le nom du produit doit contenir au moins 2 caractères !";
    }

    if (name.trim().length > 100) {
        return "Le nom du produit est trop long (maximum 100 caractères) !";
    }

    return true;
}

function validateBrand(brand) {
    if (!brand || brand.trim().length < 2) {
        return "La marque doit contenir au moins 2 caractères !";
    }

    if (brand.trim().length > 50) {
        return "Le nom de la marque est trop long (maximum 50 caractères) !";
    }

    return true;
}

function validateDescription(description) {
    if (!description || description.trim().length < 20) {
        return "La description doit contenir au moins 20 caractères !";
    }

    if (description.trim().length > 1000) {
        return "La description est trop longue (maximum 1000 caractères) !";
    }

    return true;
}

const formIsValid = (article) => {
    errors = [];

    // Check if all required fields are filled
    if (!article.nom || !article.marque || !article.prix || !article.image || !article.description) {
        errors.push("Vous devez renseigner tous les champs");
    }

    // Validate each field individually
    const nameValidation = validateName(article.nom);
    if (nameValidation !== true) {
        errors.push(nameValidation);
    }

    const brandValidation = validateBrand(article.marque);
    if (brandValidation !== true) {
        errors.push(brandValidation);
    }

    const priceValidation = validatePrice(article.prix);
    if (priceValidation !== true) {
        errors.push(priceValidation);
    }

    const imageValidation = validateImageUrl(article.image);
    if (imageValidation !== true) {
        errors.push(imageValidation);
    }

    const descriptionValidation = validateDescription(article.description);
    if (descriptionValidation !== true) {
        errors.push(descriptionValidation);
    }

    // Display errors or clear them
    if (errors.length) {
        let errorHTML = "";
        errors.forEach((error) => {
            errorHTML += `<li>${error}</li>`;
        });
        errorElement.innerHTML = errorHTML;

        // Scroll to errors
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });

        return false;
    } else {
        errorElement.innerHTML = "";
        return true;
    }
};

function showSuccessMessage() {
    // Remove any existing success message first
    const existingMessage = document.querySelector(".form__success-message");
    if (existingMessage) {
        existingMessage.remove();
    }

    const successMessage = document.createElement("div");
    successMessage.className = "form__success-message";
    successMessage.innerHTML = `
        <div class="form__success-content">
            <span class="form__success-icon">✓</span>
            <span class="form__success-text">Produit ajouté avec succès!</span>
        </div>
    `;

    // Insert success message before the form
    form.parentNode.insertBefore(successMessage, form);

    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 3000);
}

async function simulateSave(article) {
    // Add loading state to submit button
    const submitBtn = form.querySelector(".btn--primary");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.classList.add("btn--loading");
    submitBtn.textContent = "Sauvegarde...";

    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Here you would normally send the data to your backend
            console.log("Saving article:", article);

            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove("btn--loading");
            submitBtn.textContent = originalText;

            resolve();
        }, 500);
    });
}

// Add real-time validation feedback using BEM selectors
const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
inputs.forEach((input) => {
    input.addEventListener("blur", () => {
        validateSingleField(input);
    });

    input.addEventListener("input", () => {
        clearFieldError(input);
    });
});

function validateSingleField(input) {
    const value = input.value;
    const name = input.name;
    let validation = true;

    switch (name) {
        case "nom":
            validation = validateName(value);
            break;
        case "marque":
            validation = validateBrand(value);
            break;
        case "prix":
            validation = validatePrice(value);
            break;
        case "image":
            validation = validateImageUrl(value);
            break;
        case "description":
            validation = validateDescription(value);
            break;
    }

    if (validation !== true) {
        showFieldError(input, validation);
    } else {
        clearFieldError(input);
    }
}

function showFieldError(input, message) {
    clearFieldError(input);

    // Add BEM modifier for error state
    input.classList.add("form-group__input--error");

    // Find the form group parent
    const formGroup = input.closest(".form-group");
    if (formGroup) {
        formGroup.classList.add("form-group--error");

        // Create error element with BEM naming
        const errorSpan = document.createElement("span");
        errorSpan.className = "form-group__error";
        errorSpan.textContent = message;

        formGroup.appendChild(errorSpan);
    }
}

function clearFieldError(input) {
    // Remove BEM modifier for error state
    input.classList.remove("form-group__input--error");

    // Find the form group parent
    const formGroup = input.closest(".form-group");
    if (formGroup) {
        formGroup.classList.remove("form-group--error");

        // Remove existing error element
        const existingError = formGroup.querySelector(".form-group__error");
        if (existingError) {
            existingError.remove();
        }
    }
}

function clearAllFieldErrors() {
    const allInputs = document.querySelectorAll(".form-group input, .form-group textarea");
    allInputs.forEach((input) => {
        clearFieldError(input);
    });
}
