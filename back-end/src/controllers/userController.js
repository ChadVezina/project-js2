import User from "../models/User.js";

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

        res.json({
            success: true,
            message: "Connexion réussie",
            data: {
                user,
                // En production, retourner un token JWT
                token: `mock-token-${user.id}`,
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

// Contrôleur pour l'inscription publique
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validation des données
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Les champs nom d'utilisateur, email et mot de passe sont obligatoires",
            });
        }

        // Pour l'inscription publique, permettre la création d'admin et user
        let userRole = role || "user"; // Default to user if no role specified
        
        // Validate role
        if (!["user", "admin"].includes(userRole)) {
            userRole = "user"; // Default to user for invalid roles
        }

        const userData = {
            username,
            email,
            password,
            role: userRole
        };

        const createdUser = await userModel.create(userData);

        res.status(201).json({
            success: true,
            message: "Compte créé avec succès",
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
            message: "Erreur lors de la création du compte",
            error: error.message,
        });
    }
};


