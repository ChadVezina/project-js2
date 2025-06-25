export class BackendSimulator {
    static async submitProduct(productData) {
        const delay = Math.random() * 2000 + 1000; // 1-3 seconds
        await new Promise(resolve => setTimeout(resolve, delay));

        // Simulate validation errors (rare edge cases)
        if (productData.nom.toLowerCase().includes("test")) {
            throw new Error("Product name cannot contain 'test'");
        }

        // Simulate successful response
        const response = {
            success: true,
            message: "Product submitted successfully",
            productId: `PROD_${Date.now()}`,
            timestamp: new Date().toISOString(),
            data: {
                ...productData,
                id: `PROD_${Date.now()}`,
                status: "pending_approval",
                createdAt: new Date().toISOString()
            }
        };

        console.log("Backend Response (Simulated):", response);
        return response;
    }

    static async checkImageUrl(url) {
        // Simulate image validation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Basic URL validation (you can make this more sophisticated)
        if (!url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            throw new Error("Image URL must point to a valid image file");
        }

        return { valid: true };
    }
}