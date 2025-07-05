import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, login, register } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import { authenticate, requireAdmin, requireSelfOrAdmin, requireReadAccess, verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/users/login - Authentification (pas de middleware requis)
router.post("/login", asyncHandler(login));

// POST /api/users/register - Inscription publique (pas de middleware requis)
router.post("/register", asyncHandler(register));

// GET /api/users - Récupérer tous les utilisateurs (lecture seulement)
router.get("/", authenticate, requireReadAccess, asyncHandler(getAllUsers));

// GET /api/users/:id - Récupérer un utilisateur par ID (utilisateur lui-même ou admin)
router.get("/:id", authenticate, requireSelfOrAdmin, asyncHandler(getUserById));

// POST /api/users - Créer un nouvel utilisateur (admin seulement - pour l'administration)
router.post("/", authenticate, requireAdmin, asyncHandler(createUser));

// PUT /api/users/:id - Modifier un utilisateur (admin seulement)
router.put("/:id", authenticate, requireAdmin, asyncHandler(updateUser));

// DELETE /api/users/:id - Supprimer un utilisateur (admin seulement)
router.delete("/:id", authenticate, requireAdmin, asyncHandler(deleteUser));

// GET /api/users/auth/verify - Vérifier l'authentification (middleware pour vérifier le token)
router.get("/auth/verify", authenticate, verifyAuth);

export default router;
