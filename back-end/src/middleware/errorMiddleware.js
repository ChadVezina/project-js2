// Middleware pour gérer les erreurs async
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Gestionnaire d'erreurs global
export const errorHandler = (error, req, res, next) => {
    console.error("Erreur serveur:", error);
    res.status(500).json({
        success: false,
        message: "Erreur interne du serveur",
        error: process.env.NODE_ENV === "development" ? error.message : "Une erreur est survenue",
    });
};

// Route 404 pour les endpoints non trouvés
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint non trouvé",
    });
};
