import User from "../models/User.js";

const userModel = new User();

// Middleware pour vérifier l'authentification
export const authenticate = async (req, res, next) => {
    try {
        // Récupérer l'utilisateur depuis les headers (simulation d'authentification)
        const userId = req.headers["user-id"];
        const userRole = req.headers["user-role"];

        if (!userId || !userRole) {
            return res.status(401).json({
                success: false,
                message: "Authentification requise",
            });
        }

        // Vérifier que l'utilisateur existe
        const user = await userModel.getById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }

        // Ajouter l'utilisateur au request pour les middlewares suivants
        req.user = {
            id: parseInt(userId),
            role: userRole,
            ...user,
        };

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Erreur d'authentification",
            error: error.message,
        });
    }
};

// Middleware pour vérifier les permissions d'administrateur
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentification requise",
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Accès refusé. Privilèges administrateur requis.",
        });
    }

    next();
};

// Middleware pour vérifier les permissions de lecture/écriture
export const requireWriteAccess = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentification requise",
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Accès refusé. Seuls les administrateurs peuvent modifier les données.",
        });
    }

    next();
};

// Middleware pour vérifier l'accès à ses propres données ou admin
export const requireSelfOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentification requise",
        });
    }

    const targetUserId = parseInt(req.params.id);
    const currentUserId = req.user.id;

    // Admin peut accéder à tout, utilisateur normal seulement à ses propres données
    if (req.user.role === "admin" || currentUserId === targetUserId) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Accès refusé. Vous ne pouvez accéder qu'à vos propres données.",
        });
    }
};

// Middleware pour les opérations de lecture (tous les utilisateurs authentifiés)
export const requireReadAccess = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentification requise",
        });
    }

    // Tous les utilisateurs authentifiés peuvent lire
    next();
};
export const verifyAuth = async (req, res) => {
    try {
        res.json({
            success: true,
            message: "Authentication valid",
            user: req.user,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};
