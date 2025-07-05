import fetch from "node-fetch";

const testAPI = async () => {
    console.log("Testing API endpoints...");

    try {
        // Test base API endpoint
        console.log("\n1. Testing base API endpoint:");
        const response1 = await fetch("http://localhost:3000/api");
        const data1 = await response1.json();
        console.log("Status:", response1.status);
        console.log("Response:", JSON.stringify(data1, null, 2));

        // Test health endpoint
        console.log("\n2. Testing health endpoint:");
        const response2 = await fetch("http://localhost:3000/api/health");
        const data2 = await response2.json();
        console.log("Status:", response2.status);
        console.log("Response:", JSON.stringify(data2, null, 2));

        // Test users endpoint
        console.log("\n3. Testing users endpoint:");
        const response3 = await fetch("http://localhost:3000/api/users");
        const data3 = await response3.json();
        console.log("Status:", response3.status);
        console.log("Response:", JSON.stringify(data3, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
};

testAPI();
