import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

// GET /api/users - Récupérer tous les utilisateurs
router.get("/", asyncHandler(getAllUsers));

// GET /api/users/:id - Récupérer un utilisateur par ID
router.get("/:id", asyncHandler(getUserById));

// POST /api/users - Créer un nouvel utilisateur
router.post("/", asyncHandler(createUser));

// PUT /api/users/:id - Modifier un utilisateur
router.put("/:id", asyncHandler(updateUser));

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete("/:id", asyncHandler(deleteUser));

export default router;
