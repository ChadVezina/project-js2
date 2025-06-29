import JSONArrayDatabase from "../../database/JSONArrayDatabase.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class User {
    constructor() {
        this.db = new JSONArrayDatabase(path.join(__dirname, "../../data", "users.json"));
    }

    async getAll() {
        const users = await this.db.getAll();
        // Ne pas renvoyer les mots de passe
        return users.map((user) => {
            const { password, ...safeUser } = user;
            return safeUser;
        });
    }

    async getById(id) {
        const user = await this.db.get(parseInt(id));
        if (!user) {
            return null;
        }
        // Ne pas renvoyer le mot de passe
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async create(userData) {
        const { username, email, password, firstName, lastName } = userData;

        // Validation des données
        if (!username || !email || !password) {
            throw new Error("Les champs username, email et password sont obligatoires");
        }

        // Vérifier si l'email existe déjà
        const existingUsers = await this.db.getAll();
        const emailExists = existingUsers.some((user) => user.email === email);
        const usernameExists = existingUsers.some((user) => user.username === username);

        if (emailExists) {
            throw new Error("Cet email est déjà utilisé");
        }

        if (usernameExists) {
            throw new Error("Ce nom d'utilisateur est déjà pris");
        }

        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // En production, hasher le mot de passe
            firstName: firstName || "",
            lastName: lastName || "",
            createdAt: new Date().toISOString(),
        };

        const createdUser = await this.db.add(newUser);

        // Ne pas renvoyer le mot de passe
        const { password: _, ...safeUser } = createdUser;
        return safeUser;
    }

    async update(id, userData) {
        const userId = parseInt(id);
        const existingUser = await this.db.get(userId);

        if (!existingUser) {
            throw new Error("Utilisateur non trouvé");
        }

        const { username, email, password, firstName, lastName } = userData;

        // Vérifier l'unicité de l'email et du username si modifiés
        if (email && email !== existingUser.email) {
            const allUsers = await this.db.getAll();
            const emailExists = allUsers.some((user) => user.email === email && user.id !== userId);
            if (emailExists) {
                throw new Error("Cet email est déjà utilisé");
            }
        }

        if (username && username !== existingUser.username) {
            const allUsers = await this.db.getAll();
            const usernameExists = allUsers.some((user) => user.username === username && user.id !== userId);
            if (usernameExists) {
                throw new Error("Ce nom d'utilisateur est déjà pris");
            }
        }

        const updatedData = {
            ...existingUser,
            username: username || existingUser.username,
            email: email || existingUser.email,
            password: password || existingUser.password,
            firstName: firstName !== undefined ? firstName : existingUser.firstName,
            lastName: lastName !== undefined ? lastName : existingUser.lastName,
            updatedAt: new Date().toISOString(),
        };

        const updatedUser = await this.db.update(userId, updatedData);

        // Ne pas renvoyer le mot de passe
        const { password: _, ...safeUser } = updatedUser;
        return safeUser;
    }

    async delete(id) {
        const userId = parseInt(id);
        const existingUser = await this.db.get(userId);

        if (!existingUser) {
            throw new Error("Utilisateur non trouvé");
        }

        return await this.db.delete(userId);
    }
}

export default User;
