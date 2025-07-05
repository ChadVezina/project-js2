import { apiService } from "../services/apiService.js";

export class AuthManager {
    constructor(options = {}) {
        this.currentTab = "login";
        this.options = options;

        if (!options.deferInit) {
            this.init();
        }
    }

    async init() {
        await new Promise((resolve) => setTimeout(resolve, 0));

        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        const tabs = document.querySelectorAll(".auth__tab");
        tabs.forEach((tab) => {
            tab.addEventListener("click", (e) => this.switchTab(e.target.dataset.tab));
        });

        document.getElementById("loginForm").addEventListener("submit", (e) => this.handleLogin(e));
        document.getElementById("registerForm").addEventListener("submit", (e) => this.handleRegister(e));

        const inputs = document.querySelectorAll(".auth__input");
        inputs.forEach((input) => {
            input.addEventListener("blur", () => this.validateField(input));
            input.addEventListener("input", () => this.clearFieldError(input));
            
            // Add change event for select elements
            if (input.tagName === "SELECT") {
                input.addEventListener("change", () => this.validateField(input));
            }
        });
    }

    switchTab(tab) {
        this.currentTab = tab;

        document.querySelectorAll(".auth__tab").forEach((t) => {
            t.classList.toggle("auth__tab--active", t.dataset.tab === tab);
        });

        document.querySelectorAll(".auth__form").forEach((form) => {
            if (form.classList.contains(`auth__form--${tab}`)) {
                form.classList.remove("auth__form--hidden");
            } else {
                form.classList.add("auth__form--hidden");
            }
        });

        this.clearAllErrors();
    }

    setupFormValidation() {
        const confirmPasswordInput = document.getElementById("confirmPassword");
        confirmPasswordInput.addEventListener("input", () => {
            this.validatePasswordMatch();
        });
    }

    validateField(input) {
        const field = input.name;
        const value = input.value.trim();
        const errors = [];

        switch (field) {
            case "name":
                if (value.length < 2) {
                    errors.push("Le nom doit contenir au moins 2 caractères");
                }
                if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    errors.push("Le nom ne peut contenir que des lettres et des espaces");
                }
                break;

            case "username":
                if (value.length < 3) {
                    errors.push("Le nom d'utilisateur doit contenir au moins 3 caractères");
                }
                if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    errors.push("Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscore");
                }
                break;

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push("Veuillez entrer un email valide");
                }
                break;

            case "role":
                if (!value) {
                    errors.push("Veuillez sélectionner un rôle");
                }
                if (value && !["user", "admin"].includes(value)) {
                    errors.push("Le rôle doit être 'user' ou 'admin'");
                }
                break;

            case "password":
                if (value.length < 8) {
                    errors.push("Le mot de passe doit contenir au moins 8 caractères");
                }
                if (!/(?=.*[a-z])/.test(value)) {
                    errors.push("Le mot de passe doit contenir au moins une minuscule");
                }
                if (!/(?=.*[A-Z])/.test(value)) {
                    errors.push("Le mot de passe doit contenir au moins une majuscule");
                }
                if (!/(?=.*\d)/.test(value)) {
                    errors.push("Le mot de passe doit contenir au moins un chiffre");
                }
                break;

            case "confirmPassword":
                const passwordInput = document.getElementById("registerPassword");
                if (value !== passwordInput.value) {
                    errors.push("Les mots de passe ne correspondent pas");
                }
                break;
        }

        this.displayFieldErrors(field, errors);
        return errors.length === 0;
    }

    validatePasswordMatch() {
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (confirmPassword && password !== confirmPassword) {
            this.displayFieldErrors("confirmPassword", ["Les mots de passe ne correspondent pas"]);
        } else {
            this.clearFieldError(document.getElementById("confirmPassword"));
        }
    }

    displayFieldErrors(field, errors) {
        const errorElement = document.querySelector(`[data-field="${field}"]`);
        const inputElement = document.querySelector(`[name="${field}"]`);

        if (errors.length > 0) {
            errorElement.textContent = errors[0];
            errorElement.style.display = "block";
            inputElement.classList.add("auth__input--error");
        } else {
            errorElement.style.display = "none";
            inputElement.classList.remove("auth__input--error");
        }
    }

    clearFieldError(input) {
        const field = input.name;
        const errorElement = document.querySelector(`[data-field="${field}"]`);
        errorElement.style.display = "none";
        input.classList.remove("auth__input--error");
    }

    clearAllErrors() {
        document.querySelectorAll(".auth__error").forEach((error) => {
            error.style.display = "none";
        });
        document.querySelectorAll(".auth__input").forEach((input) => {
            input.classList.remove("auth__input--error");
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll(".auth__input[required]");
        let isValid = true;

        inputs.forEach((input) => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (form.id === "registerForm") {
            const termsCheckbox = form.querySelector('[name="terms"]');
            if (!termsCheckbox.checked) {
                alert("Vous devez accepter les conditions d'utilisation");
                isValid = false;
            }
        }

        return isValid;
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;

        if (this.validateForm(form)) {
            const formData = new FormData(form);
            const credentials = {
                username: formData.get("username"),
                password: formData.get("password"),
                rememberMe: formData.get("remember") === "on",
            };

            this.showLoadingState(form);

            try {
                const response = await apiService.login(credentials);

                this.hideLoadingState(form);
                console.log("Login successful:", response);

                // Store user info AND token
                if (response.data && response.data.user) {
                    localStorage.setItem("currentUser", JSON.stringify(response.data.user));
                }
                
                // Make sure token is also stored if available
                if (response.data && response.data.token) {
                    localStorage.setItem("authToken", response.data.token);
                }

                alert("Connexion réussie! Redirection...");
                
                // Trigger a custom event to notify header about login
                window.dispatchEvent(new CustomEvent('userLoggedIn', {
                    detail: { user: response.data.user }
                }));
                
                window.location.href = "../../index.html";
            } catch (error) {
                this.hideLoadingState(form);
                console.error("Login failed:", error);
                alert("Erreur de connexion: " + error.message);
            }
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;

        if (this.validateForm(form)) {
            const formData = new FormData(form);
            const userData = {
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
                role: formData.get("role")
            };

            this.showLoadingState(form);

            try {
                const response = await apiService.register(userData);

                this.hideLoadingState(form);
                console.log("Registration successful:", response);
                alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
                this.switchTab("login");
                form.reset();
            } catch (error) {
                this.hideLoadingState(form);
                console.error("Registration failed:", error);
                alert("Erreur d'inscription: " + error.message);
            }
        }
    }

    showLoadingState(form) {
        const submitBtn = form.querySelector(".auth__submit");
        submitBtn.disabled = true;
        submitBtn.textContent = "Chargement...";
        submitBtn.classList.add("auth__submit--loading");
    }

    hideLoadingState(form) {
        const submitBtn = form.querySelector(".auth__submit");
        submitBtn.disabled = false;
        submitBtn.classList.remove("auth__submit--loading");

        if (form.id === "loginForm") {
            submitBtn.textContent = "Se connecter";
        } else {
            submitBtn.textContent = "S'inscrire";
        }
    }
}
