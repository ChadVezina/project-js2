import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class JSONArrayDatabase {
    constructor(filename) {
        this.filepath = path.resolve(filename);
        this.data = [];
        this.initialize();
    }

    async initialize() {
        try {
            // Vérifier si le fichier existe
            await fs.access(this.filepath);
            const fileContent = await fs.readFile(this.filepath, "utf-8");
            this.data = JSON.parse(fileContent) || [];
        } catch (err) {
            // Si le fichier n'existe pas, créer un tableau vide
            if (err.code === "ENOENT") {
                this.data = [];
                await this.save();
            } else {
                throw err;
            }
        }
    }

    async save() {
        try {
            // S'assurer que le dossier existe
            const dir = path.dirname(this.filepath);
            await fs.mkdir(dir, { recursive: true });

            await fs.writeFile(this.filepath, JSON.stringify(this.data, null, 2), "utf-8");
        } catch (error) {
            console.error(`Erreur de sauvegarde dans ${this.filepath}`, error);
            throw error;
        }
    }

    async findByEmail(email) {
        return this.data.find((item) => item.email === email) || null;
    }

    async getAll() {
        // Reload data from file to get latest changes
        await this.initialize();
        return [...this.data];
    }

    async get(id) {
        return this.data.find((item) => item.id === id) || null;
    }

    async add(item) {
        const newItem = {
            ...item,
            id: item.id || Date.now(),
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        this.data.push(newItem);
        await this.save();
        return newItem;
    }

    async update(id, updatedData) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error(`Item avec l'ID ${id} non trouvé`);
        }

        this.data[index] = {
            ...this.data[index],
            ...updatedData,
            id: id, // S'assurer que l'ID ne change pas
            updatedAt: new Date().toISOString(),
        };

        await this.save();
        return this.data[index];
    }

    async delete(id) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error(`Item avec l'ID ${id} non trouvé`);
        }

        const deletedItem = this.data.splice(index, 1)[0];
        await this.save();
        return deletedItem;
    }

    async findById(id) {
        return this.get(id);
    }

    async findAll() {
        return this.getAll();
    }

    // Méthodes de compatibilité avec l'ancienne version
    async insert(item) {
        return this.add(item);
    }
}
