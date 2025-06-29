import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`📋 Documentation API disponible sur http://localhost:${PORT}/api`);
    console.log(`🛠️  Environnement: ${process.env.NODE_ENV || "development"}`);
});

export default app;
