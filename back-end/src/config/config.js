export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",

    database: {
        products: "data/products.json",
        users: "data/users.json",
    },

    api: {
        version: "1.0.0",
        prefix: "/api",
    },
};
