import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";

const userModel = new User();

// Contrôleur pour l'authentification
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Nom d'utilisateur et mot de passe requis",
            });
        }

        const user = await userModel.authenticate(username, password);
        
        // Générer le token JWT
        const token = generateToken(user);

        res.json({
            success: true,
            message: "Connexion réussie",
            data: {
                user,
                token,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.json({
            success: true,
            data: users,
            count: users.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des utilisateurs",
            error: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.getById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'utilisateur",
            error: error.message,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const createdUser = await userModel.create(req.body);

        res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès",
            data: createdUser,
        });
    } catch (error) {
        if (error.message.includes("obligatoires") || error.message.includes("déjà utilisé") || error.message.includes("déjà pris")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de l'utilisateur",
            error: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Utilisateur modifié avec succès",
            data: updatedUser,
        });
    } catch (error) {
        if (error.message === "Utilisateur non trouvé") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("déjà utilisé") || error.message.includes("déjà pris")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la modification de l'utilisateur",
            error: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.delete(req.params.id);

        res.json({
            success: true,
            message: "Utilisateur supprimé avec succès",
        });
    } catch (error) {
        if (error.message === "Utilisateur non trouvé") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de l'utilisateur",
            error: error.message,
        });
    }
};

// Contrôleur pour l'enregistrement d'un nouvel utilisateur
export const register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Nom d'utilisateur, email et mot de passe requis",
            });
        }

        // Validation du format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Format d'email invalide",
            });
        }

        // Validation de la force du mot de passe
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Le mot de passe doit contenir au moins 6 caractères",
            });
        }

        const newUser = await userModel.create({
            username,
            email,
            password,
            firstName,
            lastName,
            role: role || "user"
        });

        // Générer le token JWT pour le nouvel utilisateur
        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès",
            data: {
                user: newUser,
                token,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyTokenEndpoint = async (req, res) => {
    res.json({
        success: true,
        message: "Token valide",
        data: {
            user: req.user,
        },
    });
};

export const logout = async (req, res) => {
    res.json({
        success: true,
        message: "Déconnexion réussie",
    });
};


