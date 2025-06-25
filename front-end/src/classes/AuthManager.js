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

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push("Veuillez entrer un email valide");
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

    handleLogin(e) {
        e.preventDefault();
        const form = e.target;

        if (this.validateForm(form)) {
            const formData = new FormData(form);
            const credentials = {
                email: formData.get("email"),
                password: formData.get("password"),
                remember: formData.get("remember") === "on",
            };

            this.showLoadingState(form);

            setTimeout(() => {
                this.hideLoadingState(form);
                console.log("Login successful:", credentials);
                alert("Connexion réussie! Redirection...");
                window.location.href = "../index.html";
            }, 1500);
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const form = e.target;

        if (this.validateForm(form)) {
            const formData = new FormData(form);
            const userData = {
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
            };

            // Simulate registration process
            this.showLoadingState(form);

            setTimeout(() => {
                this.hideLoadingState(form);
                console.log("Registration successful:", userData);
                alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
                this.switchTab("login");
                form.reset();
            }, 1500);
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
