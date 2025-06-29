import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// GET /api/products - Récupérer tous les produits
router.get("/", asyncHandler(getAllProducts));

// GET /api/products/:id - Récupérer un produit par ID
router.get("/:id", asyncHandler(getProductById));

// POST /api/products - Créer un nouveau produit
router.post("/", asyncHandler(createProduct));

// PUT /api/products/:id - Modifier un produit
router.put("/:id", asyncHandler(updateProduct));

// DELETE /api/products/:id - Supprimer un produit
router.delete("/:id", asyncHandler(deleteProduct));

export default router;
