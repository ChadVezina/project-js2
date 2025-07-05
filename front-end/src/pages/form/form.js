import "../../assets/styles/styles.scss";
import "./form.scss";
import { PageInitializer } from "../../utils/page-initializer.js";
import { FormManager } from "../../classes/FormManager.js";
import "../../components/header.js";
import "../../components/footer.js";
import { AuthGuard } from "../../utils/auth-guard.js";

// Initialize the form
console.log("Initializing form page");

// Async function to handle initialization
async function initializeFormPage() {
    try {
        // Check admin privileges before initializing the form
        const hasAdminAccess = await AuthGuard.requireAdmin();
        if (!hasAdminAccess) {
            console.log("Admin access denied, redirecting...");
            return;
        }

        console.log("Admin access granted, initializing form...");

        // Initialize the form manager
        await PageInitializer.initializePage(FormManager);
        console.log("Form page initialized successfully");
    } catch (error) {
        console.error("Failed to initialize form page:", error);

        try {
            const formManager = new FormManager();
            await formManager.init();
            console.log("Form manager initialized manually");
        } catch (fallbackError) {
            console.error("Manual initialization also failed:", fallbackError);

            // Show user-friendly error
            document.addEventListener("DOMContentLoaded", () => {
                const content = document.querySelector(".content");
                if (content) {
                    content.innerHTML = `
                        <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                            <h2>Erreur de chargement</h2>
                            <p>Impossible de charger le formulaire. Veuillez rafraîchir la page.</p>
                            <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem;">
                                Rafraîchir
                            </button>
                        </div>
                    `;
                }
            });
        }
    }
}

// Call the initialization function
initializeFormPage();
