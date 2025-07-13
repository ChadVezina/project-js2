# Architecture CubeShop - Application Full-Stack

## Architecture globale

Le projet CubeShop est structuré comme une application full-stack moderne avec séparation claire entre frontend et backend :

```
my-project-js2/
├── back-end/                   # API REST Node.js/Express
│   ├── src/
│   │   ├── app.js             # Configuration principale Express
│   │   ├── config/
│   │   │   └── config.js      # Configuration de l'application
│   │   ├── controllers/       # Logique métier des contrôleurs
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── middleware/        # Middlewares personnalisés
│   │   │   ├── authMiddleware.js    # Authentification et autorisation
│   │   │   └── errorMiddleware.js   # Gestion des erreurs
│   │   ├── models/           # Modèles de données
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── routes/           # Définition des routes
│   │   │   ├── index.js     # Routes principales
│   │   │   ├── productRoutes.js
│   │   │   └── userRoutes.js
│   │   └── utils/           # Utilitaires
│   ├── database/
│   │   └── JSONArrayDatabase.js    # Gestionnaire base de données JSON
│   ├── data/
│   │   ├── products.json          # Données des produits
│   │   └── users.json             # Données des utilisateurs
│   ├── tests/                     # Tests de l'API
│   │   ├── test-api.js           # Tests généraux API
│   │   ├── test-login.js         # Tests d'authentification
│   │   └── test-privileges.js    # Tests de privilèges
│   ├── server.js                 # Point d'entrée du serveur
│   └── package.json
└── front-end/                    # Interface utilisateur Vite
    ├── src/
    │   ├── index.html           # Page principale
    │   ├── main.js              # Point d'entrée JavaScript
    │   ├── main.scss            # Point d'entrée SCSS
    │   ├── assets/
    │   │   └── styles/          # Feuilles de style SCSS
    │   ├── classes/             # Classes JavaScript modulaires
    │   │   ├── AuthManager.js
    │   │   ├── CartManager.js   # 🆕 Gestion du panier d'achat
    │   │   ├── CheckoutPage.js  # 🆕 Processus de commande
    │   │   ├── CubeShopApp.js
    │   │   ├── FilterManager.js
    │   │   ├── FormManager.js
    │   │   ├── FormValidator.js
    │   │   ├── PaginationManager.js
    │   │   ├── PanierPage.js    # 🆕 Page du panier
    │   │   ├── ProductGrid.js
    │   │   ├── ProductPage.js
    │   │   ├── ProductService.js
    │   │   └── ToastManager.js  # 🆕 Notifications toast
    │   ├── components/          # Composants réutilisables
    │   │   ├── footer.js
    │   │   └── header.js
    │   ├── config/
    │   │   └── config.js        # Configuration frontend
    │   ├── pages/               # Pages de l'application
    │   │   ├── auth/           # Page d'authentification
    │   │   ├── checkout/       # 🆕 Page de checkout
    │   │   ├── form/           # Page de formulaire
    │   │   ├── panier/         # 🆕 Page du panier
    │   │   └── produit/        # Page produit
    │   ├── services/
    │   │   └── apiService.js    # Service d'API
    │   └── utils/               # Utilitaires frontend
    │       ├── api-connection-manager.js
    │       ├── auth-guard.js
    │       ├── event-emitter.js
    │       ├── page-initializer.js
    │       └── products-manager.js
    ├── public/
    │   └── vite.svg
    ├── vite.config.js
    └── package.json
```

## Composants Backend

### 1. Models (`src/models/`)

-   **Product.js** : Gestion des données des produits
-   **User.js** : Gestion des données des utilisateurs avec authentification
-   Chaque modèle encapsule la logique d'accès aux données et les validations

### 2. Controllers (`src/controllers/`)

-   **productController.js** : Logique métier pour les produits (CRUD complet)
-   **userController.js** : Logique métier pour les utilisateurs (CRUD + authentification)
-   Chaque contrôleur gère les requêtes HTTP et coordonne avec les modèles

### 3. Routes (`src/routes/`)

-   **index.js** : Routes principales et documentation API
-   **productRoutes.js** : Routes spécifiques aux produits
-   **userRoutes.js** : Routes spécifiques aux utilisateurs (y compris login)
-   Chaque fichier de routes définit les endpoints et lie aux contrôleurs

### 4. Middleware (`src/middleware/`)

-   **errorMiddleware.js** : Gestion centralisée des erreurs
    -   `asyncHandler` : Wrapper pour les fonctions async
    -   `errorHandler` : Gestionnaire d'erreurs global
    -   `notFoundHandler` : Gestionnaire pour les routes non trouvées
-   **authMiddleware.js** : Système d'authentification et autorisation
    -   `authenticate` : Vérification de l'authentification
    -   `requireAdmin` : Vérification des privilèges administrateur
    -   `requireOwnerOrAdmin` : Vérification propriétaire ou admin

### 5. Configuration (`src/config/`)

-   **config.js** : Configuration centralisée de l'application

### 6. Database (`database/`)

-   **JSONArrayDatabase.js** : Gestionnaire de base de données JSON
    -   Opérations CRUD sur fichiers JSON
    -   Gestion des IDs auto-incrémentés
    -   Sauvegarde atomique des données

### 7. Tests (`tests/`)

-   **test-api.js** : Tests généraux de l'API
-   **test-login.js** : Tests du système d'authentification
-   **test-privileges.js** : Tests du système de privilèges et autorisations

## Composants Frontend

### 1. Classes (`src/classes/`)

-   **AuthManager.js** : Gestion de l'authentification côté client
-   **CartManager.js** : 🆕 Gestionnaire complet du panier d'achat avec persistance
-   **CheckoutPage.js** : 🆕 Processus de finalisation de commande
-   **CubeShopApp.js** : Application principale
-   **FilterManager.js** : Gestion des filtres de produits
-   **FormManager.js** : Gestion des formulaires
-   **FormValidator.js** : Validation des formulaires
-   **PaginationManager.js** : Gestion de la pagination
-   **PanierPage.js** : 🆕 Interface de gestion du panier
-   **ProductGrid.js** : Affichage grille des produits
-   **ProductPage.js** : Page détail produit avec fonctionnalités panier
-   **ProductService.js** : Service de gestion des produits
-   **ToastManager.js** : 🆕 Système de notifications toast

### 2. Components (`src/components/`)

-   **footer.js** : Composant footer réutilisable
-   **header.js** : Composant header avec navigation

### 3. Pages (`src/pages/`)

-   **auth/** : Page d'authentification (login/register)
-   **checkout/** : 🆕 Page de finalisation de commande avec formulaire de livraison
-   **form/** : Page de formulaire de produits
-   **panier/** : 🆕 Page de gestion du panier d'achat
-   **produit/** : Page détail produit avec contrôles de panier
-   Chaque page contient HTML, JS et SCSS spécifiques

### 4. Services (`src/services/`)

-   **apiService.js** : Service d'API pour communication avec le backend

### 5. Utils (`src/utils/`)

-   **api-connection-manager.js** : Gestion des connexions API
-   **auth-guard.js** : Protection des routes
-   **event-emitter.js** : Système d'événements
-   **page-initializer.js** : Initialisation des pages
-   **products-manager.js** : Gestion des produits

### 6. Assets (`src/assets/styles/`)

-   Architecture SCSS modulaire avec partials
-   Variables, mixins et classes utilitaires
-   Styles responsive et accessibles

## Technologies utilisées

### Backend

-   **Node.js** - Environnement d'exécution JavaScript
-   **Express.js** - Framework web minimaliste et flexible
-   **JSON File Database** - Stockage de données simplifié via JSONArrayDatabase
-   **CORS** - Gestion des requêtes cross-origin
-   **Morgan** - Logging des requêtes HTTP
-   **Node-fetch** - Client HTTP pour les tests

### Frontend

-   **Vite** - Build tool moderne et rapide
-   **Vanilla JavaScript (ES6+)** - JavaScript moderne sans framework
-   **SCSS** - Préprocesseur CSS avec variables et mixins
-   **Web Components** - Composants réutilisables natifs
-   **CSS Grid & Flexbox** - Mise en page responsive moderne
-   **Modules ES6** - Architecture modulaire côté client

## Fonctionnalités implémentées

### Authentification et autorisation

-   **Système de connexion** avec username/email et mot de passe
-   **Gestion des rôles** (admin, user)
-   **Middleware d'authentification** avec headers personnalisés
-   **Contrôle d'accès** basé sur les privilèges

### Gestion des produits

-   **CRUD complet** des produits
-   **Intégration panier** avec ajout/suppression depuis les pages produit
-   **Filtrage et pagination** côté client
-   **Validation des données** côté serveur et client
-   **Interface d'administration** pour les admins

### Système e-commerce

-   **🆕 Panier d'achat** avec persistance par utilisateur dans localStorage
-   **🆕 Gestion des quantités** avec contrôles visuels et validation
-   **🆕 Calcul automatique** des totaux et taxes (TPS + TVQ)
-   **🆕 Processus de checkout** avec formulaire de livraison complet
-   **🆕 Options de livraison** multiples avec tarifs différenciés
-   **🆕 Notifications toast** pour feedback utilisateur immédiat
-   **🆕 Confirmation de commande** avec génération de numéro unique

### Gestion des utilisateurs

-   **CRUD complet** des utilisateurs
-   **Profils utilisateur** avec informations détaillées
-   **Système de privilèges** avec contrôles d'accès
-   **Interface d'administration** pour la gestion des utilisateurs

### API REST

-   **Endpoints documentés** avec descriptions détaillées
-   **Gestion d'erreurs** centralisée et cohérente
-   **Réponses JSON** standardisées
-   **Tests automatisés** pour validation

## Avantages de cette architecture

1. **Séparation des responsabilités** : Frontend et backend découplés
2. **Maintenabilité** : Code modulaire et bien organisé
3. **Extensibilité** : Facilité d'ajout de nouvelles fonctionnalités e-commerce
4. **Réutilisabilité** : Composants et services réutilisables
5. **Testabilité** : Chaque composant peut être testé indépendamment
6. **Sécurité** : Système d'authentification et contrôle d'accès
7. **Performance** : Optimisations côté client et serveur avec cache localStorage
8. **Responsive** : Interface adaptée à tous les appareils
9. **🆕 Expérience e-commerce** : Panier, checkout et notifications intégrés
10. **🆕 Persistance de données** : Sauvegarde automatique des paniers par utilisateur

## Démarrage de l'application

### Backend

```bash
cd back-end
npm install
npm start          # Mode production
npm run dev        # Mode développement avec nodemon
```

### Frontend

```bash
cd front-end
npm install
npm run dev        # Serveur de développement Vite
npm run build      # Build de production
npm run preview    # Prévisualisation du build
```

## Endpoints API

### Authentification

-   `POST /api/users/login` - Connexion utilisateur
-   `POST /api/users/register` - Inscription utilisateur

### Produits

-   `GET /api/products` - Liste des produits
-   `GET /api/products/:id` - Produit par ID
-   `POST /api/products` - Créer un produit (admin)
-   `PUT /api/products/:id` - Modifier un produit (admin)
-   `DELETE /api/products/:id` - Supprimer un produit (admin)

### Utilisateurs

-   `GET /api/users` - Liste des utilisateurs (admin)
-   `GET /api/users/:id` - Utilisateur par ID
-   `POST /api/users` - Créer un utilisateur (admin)
-   `PUT /api/users/:id` - Modifier un utilisateur (propriétaire ou admin)
-   `DELETE /api/users/:id` - Supprimer un utilisateur (admin)

### Utilitaires

-   `GET /api` - Documentation API
-   `GET /api/health` - Statut de l'API

## Tests

### Exécution des tests

```bash
cd back-end
node tests/test-api.js         # Tests généraux API
node tests/test-login.js       # Tests d'authentification
node tests/test-privileges.js  # Tests de privilèges
```

### Types de tests

-   **Tests d'API** : Validation des endpoints
-   **Tests d'authentification** : Vérification du système de login
-   **Tests de privilèges** : Contrôle des autorisations

## Sécurité

### Authentification

-   Authentification par headers (`user-id`, `user-role`)
-   Validation des utilisateurs en base de données
-   Gestion des sessions côté client

### Autorisations

-   Contrôle d'accès basé sur les rôles
-   Protection des routes administrateur
-   Validation propriétaire/administrateur pour les modifications

### Validation des données

-   Validation côté serveur et client
-   Sanitisation des entrées utilisateur
-   Gestion des erreurs sécurisée

