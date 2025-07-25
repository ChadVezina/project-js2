import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    root: "./src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, "src/index.html"),
                form: resolve(__dirname, "src/pages/form/form.html"),
                produit: resolve(__dirname, "src/pages/produit/produit.html"),
                auth: resolve(__dirname, "src/pages/auth/auth.html"),
                panier: resolve(__dirname, "src/pages/panier/panier.html"),
                checkout: resolve(__dirname, "src/pages/checkout/checkout.html"),
            },
        },
    },
});
