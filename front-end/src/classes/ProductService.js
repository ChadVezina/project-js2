import { apiService } from "../services/apiService.js";

export class ProductService {
    static async submitProduct(productData) {
        try {
            const response = await apiService.createProduct(productData);

            // Format response to match expected structure
            return {
                success: true,
                message: "Product submitted successfully",
                productId: response.data?.id || response.id,
                timestamp: new Date().toISOString(),
                data: response.data || response,
            };
        } catch (error) {
            console.error("Product submission failed:", error);
            throw error;
        }
    }

    static async updateProduct(id, productData) {
        try {
            const response = await apiService.updateProduct(id, productData);

            return {
                success: true,
                message: "Product updated successfully",
                productId: id,
                timestamp: new Date().toISOString(),
                data: response.data || response,
            };
        } catch (error) {
            console.error("Product update failed:", error);
            throw error;
        }
    }

    static async deleteProduct(id) {
        try {
            await apiService.deleteProduct(id);

            return {
                success: true,
                message: "Product deleted successfully",
                productId: id,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            console.error("Product deletion failed:", error);
            throw error;
        }
    }

    static async checkImageUrl(url) {
        // Basic client-side validation
        if (!url || typeof url !== "string") {
            throw new Error("Invalid image URL");
        }

        // Basic URL validation
        if (!url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
            throw new Error("Image URL must point to a valid image file (jpg, jpeg, png, gif, webp)");
        }

        // Try to load the image to verify it exists
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ valid: true });
            img.onerror = () => reject(new Error("Image could not be loaded from the provided URL"));
            img.src = url;
        });
    }
}