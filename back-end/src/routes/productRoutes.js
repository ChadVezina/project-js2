import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import { authenticate, requireAdmin, requireReadAccess } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/products - Public access for viewing products
router.get("/", asyncHandler(getAllProducts));

// GET /api/products/:id - Public access for viewing individual product
router.get("/:id", asyncHandler(getProductById));

// POST /api/products - Admin only for creating products
router.post("/", authenticate, requireAdmin, asyncHandler(createProduct));

// PUT /api/products/:id - Modifier un produit (admin seulement)
router.put("/:id", authenticate, requireAdmin, asyncHandler(updateProduct));

// DELETE /api/products/:id - Supprimer un produit (admin seulement)
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteProduct));

export default router;
