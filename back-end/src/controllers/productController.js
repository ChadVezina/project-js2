import Product from "../models/Product.js";

const productModel = new Product();

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.json({
            success: true,
            data: products,
            count: products.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des produits",
            error: error.message,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productModel.getById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Produit non trouvé",
            });
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération du produit",
            error: error.message,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        console.log("Creating product with data:", req.body);
        const createdProduct = await productModel.create(req.body);
        console.log("Product created successfully:", createdProduct);

        res.status(201).json({
            success: true,
            message: "Produit créé avec succès",
            data: createdProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        if (error.message.includes("obligatoires")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la création du produit",
            error: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Produit modifié avec succès",
            data: updatedProduct,
        });
    } catch (error) {
        if (error.message === "Produit non trouvé") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la modification du produit",
            error: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productModel.delete(req.params.id);

        res.json({
            success: true,
            message: "Produit supprimé avec succès",
        });
    } catch (error) {
        if (error.message === "Produit non trouvé") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression du produit",
            error: error.message,
        });
    }
};
