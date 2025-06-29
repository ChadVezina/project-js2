# Structure du Backend CubeShop

## Architecture

Le backend a été restructuré selon le pattern MVC (Model-View-Controller) pour une meilleure organisation du code :

```
back-end/
├── src/
│   ├── app.js                  # Configuration principale de l'application Express
│   ├── config/
│   │   └── config.js          # Configuration de l'application
│   ├── controllers/           # Logique métier des contrôleurs
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/            # Middlewares personnalisés
│   │   └── errorMiddleware.js
│   ├── models/               # Modèles de données
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/              # Définition des routes
│   │   ├── index.js        # Routes principales
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   └── utils/              # Utilitaires (pour extensions futures)
├── database/
│   └── JSONArrayDatabase.js
├── data/
│   ├── products.json
│   └── users.json
├── server.js               # Point d'entrée du serveur
└── package.json
```

## Composants

### 1. Models (`src/models/`)

-   **Product.js** : Gestion des données des produits
-   **User.js** : Gestion des données des utilisateurs
-   Chaque modèle encapsule la logique d'accès aux données et les validations

### 2. Controllers (`src/controllers/`)

-   **productController.js** : Logique métier pour les produits
-   **userController.js** : Logique métier pour les utilisateurs
-   Chaque contrôleur gère les requêtes HTTP et coordonne avec les modèles

### 3. Routes (`src/routes/`)

-   **index.js** : Routes principales et documentation API
-   **productRoutes.js** : Routes spécifiques aux produits
-   **userRoutes.js** : Routes spécifiques aux utilisateurs
-   Chaque fichier de routes définit les endpoints et lie aux contrôleurs

### 4. Middleware (`src/middleware/`)

-   **errorMiddleware.js** : Gestion centralisée des erreurs
    -   `asyncHandler` : Wrapper pour les fonctions async
    -   `errorHandler` : Gestionnaire d'erreurs global
    -   `notFoundHandler` : Gestionnaire pour les routes non trouvées

### 5. Configuration (`src/config/`)

-   **config.js** : Configuration centralisée de l'application

## Avantages de cette architecture

1. **Séparation des responsabilités** : Chaque composant a un rôle spécifique
2. **Maintenabilité** : Code plus facile à maintenir et déboguer
3. **Extensibilité** : Facile d'ajouter de nouvelles fonctionnalités
4. **Réutilisabilité** : Composants réutilisables
5. **Testabilité** : Chaque composant peut être testé indépendamment

## Utilisation

Le serveur fonctionne exactement comme avant, mais avec une architecture plus propre :

```bash
npm start
```

Tous les endpoints restent identiques :

-   `GET /api` - Documentation API
-   `GET /api/products` - Liste des produits
-   `GET /api/products/:id` - Produit par ID
-   `POST /api/products` - Créer un produit
-   `PUT /api/products/:id` - Modifier un produit
-   `DELETE /api/products/:id` - Supprimer un produit
-   (idem pour `/api/users`)

## Extensions futures possibles

-   Ajout d'authentification (middleware auth)
-   Validation des données avec des schémas
-   Logging avancé
-   Tests unitaires et d'intégration
-   Base de données relationnelle
-   Cache Redis
-   Rate limiting
