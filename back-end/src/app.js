import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Route 404 pour les endpoints non trouvés
app.use(notFoundHandler);

// Gestionnaire d'erreurs global
app.use(errorHandler);

export default app;
