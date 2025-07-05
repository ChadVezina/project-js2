import express from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Route de base pour vérifier que l'API fonctionne
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API CubeShop fonctionnelle",
        version: "1.0.0",
        endpoints: {
            products: {
                getAll: "GET /api/products",
                getById: "GET /api/products/:id",
                create: "POST /api/products",
                update: "PUT /api/products/:id",
                delete: "DELETE /api/products/:id",
            },
            users: {
                getAll: "GET /api/users",
                getById: "GET /api/users/:id",
                create: "POST /api/users",
                update: "PUT /api/users/:id",
                delete: "DELETE /api/users/:id",
                login: "POST /api/users/login",
                register: "POST /api/users/register",
            },
        },
    });
});

// Health check endpoint
router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy",
        timestamp: new Date().toISOString(),
    });
});

// Routes pour les produits
router.use("/products", productRoutes);

// Routes pour les utilisateurs
router.use("/users", userRoutes);

export default router;
