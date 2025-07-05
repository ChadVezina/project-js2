import fetch from "node-fetch";

const testLogin = async () => {
    console.log("Testing login endpoint...");

    try {
        // Test with username
        console.log("\n1. Testing with username:");
        const response1 = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "admin",
                password: "Admin123",
            }),
        });

        const data1 = await response1.json();
        console.log("Status:", response1.status);
        console.log("Response:", JSON.stringify(data1, null, 2));

        // Test with email
        console.log("\n2. Testing with email:");
        const response2 = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "admin@cubeshop.com",
                password: "Admin123",
            }),
        });

        const data2 = await response2.json();
        console.log("Status:", response2.status);
        console.log("Response:", JSON.stringify(data2, null, 2));

        // Test with wrong credentials
        console.log("\n3. Testing with wrong credentials:");
        const response3 = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "wronguser",
                password: "wrongpassword",
            }),
        });

        const data3 = await response3.json();
        console.log("Status:", response3.status);
        console.log("Response:", JSON.stringify(data3, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
};

testLogin();
