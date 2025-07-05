export const config = {
    api: {
        baseUrl: import.meta.env.MODE === "production" ? "https://your-production-api.com/api" : "http://localhost:3000/api",
        timeout: 10000, // 10 seconds
        retryAttempts: 3,
        retryDelay: 1000, // 1 second
    },
    auth: {
        tokenKey: "authToken",
        userKey: "currentUser",
        tokenExpiration: 24 * 60 * 60 * 1000, // 24 hours
        rememberMeExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    cache: {
        defaultTTL: 5 * 60 * 1000, // 5 minutes
        maxSize: 100, // Maximum number of cached items
    },
    ui: {
        loadingDelay: 300, // Show loading after 300ms
        errorDisplayTime: 5000, // Show errors for 5 seconds
        successDisplayTime: 3000, // Show success messages for 3 seconds
    },
};
