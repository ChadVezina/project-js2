import JSONArrayDatabase from "../../database/JSONArrayDatabase.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Product {
    constructor() {
        this.db = new JSONArrayDatabase(path.join(__dirname, "../../data", "products.json"));
    }

    async getAll() {
        return await this.db.getAll();
    }

    async getById(id) {
        return await this.db.get(parseInt(id));
    }

    async create(productData) {
        const { nom, marque, image, prix, description } = productData;

        // Validation des données
        if (!nom || !marque || !prix) {
            throw new Error("Les champs nom, marque et prix sont obligatoires");
        }

        const newProduct = {
            id: Date.now(),
            nom,
            marque,
            image: image || "",
            prix,
            description: description || "",
        };

        return await this.db.add(newProduct);
    }

    async update(id, productData) {
        const productId = parseInt(id);
        const existingProduct = await this.db.get(productId);

        if (!existingProduct) {
            throw new Error("Produit non trouvé");
        }

        const { nom, marque, image, prix, description } = productData;

        const updatedData = {
            ...existingProduct,
            nom: nom || existingProduct.nom,
            marque: marque || existingProduct.marque,
            image: image !== undefined ? image : existingProduct.image,
            prix: prix || existingProduct.prix,
            description: description !== undefined ? description : existingProduct.description,
        };

        return await this.db.update(productId, updatedData);
    }

    async delete(id) {
        const productId = parseInt(id);
        const existingProduct = await this.db.get(productId);

        if (!existingProduct) {
            throw new Error("Produit non trouvé");
        }

        return await this.db.delete(productId);
    }
}

export default Product;
