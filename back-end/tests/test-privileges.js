// Tests de démonstration du système de privilèges

console.log("=== Tests du système de privilèges ===");

// Configuration de base
const BASE_URL = "http://localhost:3000/api";

// Fonction utilitaire pour les tests
const testAPI = async (method, endpoint, headers = {}, body = null) => {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        console.log(`${method} ${endpoint} - Status: ${response.status}`);
        console.log("Response:", data);
        console.log("---");
        
        return { status: response.status, data };
    } catch (error) {
        console.error(`Erreur pour ${method} ${endpoint}:`, error.message);
        return { error: error.message };
    }
};

// Tests à exécuter
const runTests = async () => {
    console.log("\n1. Test de connexion Admin");
    await testAPI('POST', '/users/login', {}, {
        username: 'admin',
        password: 'admin123'
    });
    
    console.log("\n2. Test de connexion User");
    await testAPI('POST', '/users/login', {}, {
        username: 'johndoe',
        password: 'password123'
    });
    
    console.log("\n3. Test accès lecture utilisateurs (Admin)");
    await testAPI('GET', '/users', {
        'user-id': '1',
        'user-role': 'admin'
    });
    
    console.log("\n4. Test accès lecture utilisateurs (User)");
    await testAPI('GET', '/users', {
        'user-id': '2',
        'user-role': 'user'
    });
    
    console.log("\n5. Test création utilisateur (Admin) - AUTORISÉ");
    await testAPI('POST', '/users', {
        'user-id': '1',
        'user-role': 'admin'
    }, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User'
    });
    
    console.log("\n6. Test création utilisateur (User) - REFUSÉ");
    await testAPI('POST', '/users', {
        'user-id': '2',
        'user-role': 'user'
    }, {
        username: 'testuser2',
        email: 'test2@example.com',
        password: 'test123'
    });
    
    console.log("\n7. Test lecture produits (User) - AUTORISÉ");
    await testAPI('GET', '/products', {
        'user-id': '2',
        'user-role': 'user'
    });
    
    console.log("\n8. Test création produit (User) - REFUSÉ");
    await testAPI('POST', '/products', {
        'user-id': '2',
        'user-role': 'user'
    }, {
        name: 'Test Cube',
        price: 19.99,
        description: 'Cube de test'
    });
    
    console.log("\n9. Test sans authentification - REFUSÉ");
    await testAPI('GET', '/users');
    
    console.log("\n=== Fin des tests ===");
};
// Exécuter les tests
runTests().catch(console.error);
