# CubeShop - Application Full-Stack

> Application e-commerce moderne spécialisée dans les cubes Rubik et puzzles avec système d'authentification complet et interface d'administration.

## 🚀 Présentation

**CubeShop** est une application web full-stack. Elle combine un backend API REST moderne avec un frontend interactif, offrant une expérience utilisateur complète pour la gestion et la consultation de produits.

### 📋 Fonctionnalités principales

- **🔐 Authentification complète** - Connexion, inscription et gestion des rôles
- **🛍️ Catalogue de produits** - Affichage, filtrage et pagination intelligente
- **� Système de panier** - Ajout, modification et gestion des articles avec persistance
- **💳 Processus de checkout** - Finalisation des commandes avec informations de livraison
- **👥 Gestion des utilisateurs** - Interface d'administration avec contrôle d'accès
- **📱 Interface responsive** - Design moderne adapté à tous les appareils
- **🔗 API REST** - Backend robuste avec architecture MVC
- **⚡ Performance optimisée** - Chargement rapide et gestion d'état efficace

## 🏗️ Architecture

Le projet est structuré en deux parties principales :

```
my-project-js2/
├── back-end/           # API REST Node.js/Express
│   ├── src/           # Code source organisé en MVC
│   ├── data/          # Base de données JSON
│   ├── database/      # Gestionnaire de base de données
│   └── tests/         # Tests de l'API
└── front-end/         # Interface utilisateur Vite
    ├── src/           # Code source modulaire
    |── public/        # Ressources statiques

```

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web minimaliste
- **JSON File Database** - Stockage de données simplifié
- **CORS** - Gestion des requêtes cross-origin
- **Morgan** - Logging des requêtes HTTP

### Frontend
- **Vite** - Build tool moderne et rapide
- **Vanilla JavaScript (ES6+)** - JavaScript moderne sans framework
- **SCSS** - Préprocesseur CSS avec variables et mixins
- **Web Components** - Composants réutilisables natifs
- **CSS Grid & Flexbox** - Mise en page responsive moderne

## 🚀 Installation et démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### 1. Clonage du projet
```bash
git clone <repository-url>
cd my-project-js2
```

### 2. Installation du Backend
```bash
cd back-end
npm install
```

### 3. Installation du Frontend
```bash
cd ../front-end
npm install
```

### 4. Démarrage du développement

#### Backend (Terminal 1)
```bash
cd back-end
npm run dev
```
Le serveur API démarre sur `http://localhost:3000`

#### Frontend (Terminal 2)
```bash
cd front-end
npm run dev
```
L'application démarre sur `http://localhost:5173`

## 📚 Documentation

### Backend
- **[README Backend](back-end/README.md)** - Documentation complète de l'API
- **Tests disponibles** - `test-api.js`, `test-login.js`, `test-privileges.js`

### Frontend
- **[README Frontend](front-end/README.md)** - Documentation complète de l'interface

### Architecture
- **[Architecture](back-end/ARCHITECTURE.md)** - Structure et organisation du code

## 🔐 Authentification et comptes de test

### Comptes administrateur
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `Admin123`

### Comptes utilisateur
- **Nom d'utilisateur :** `johndoe`
- **Mot de passe :** `password123`

### Système de rôles
- **Utilisateur** : Consultation des produits, gestion de son profil
- **Administrateur** : Toutes les fonctionnalités + gestion des produits et utilisateurs

## 📊 Endpoints API

### Produits
- `GET /api/products` - Liste tous les produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (Admin)
- `PUT /api/products/:id` - Modifier un produit (Admin)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)

### Utilisateurs
- `POST /api/users/login` - Connexion
- `POST /api/users/register` - Inscription
- `GET /api/users` - Liste des utilisateurs (Admin)
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur (Admin)

## 🎨 Pages et fonctionnalités

### Page d'accueil (`/`)
- Catalogue de produits avec grille responsive
- Filtrage par marque avec dropdown dynamique
- Pagination intelligente (bouton "Afficher Plus")
- Boutons d'ajout au panier intégrés aux cartes produit
- Liens vers les pages de détail

### Page d'authentification (`/pages/auth/`)
- Interface à onglets (Connexion/Inscription)
- Validation en temps réel des formulaires
- Gestion des rôles et sessions
- Redirection automatique après connexion

### Page de produit (`/pages/produit/`)
- Affichage détaillé d'un produit
- Contrôles d'ajout au panier avec gestion des quantités
- Navigation avec gestion d'historique
- Gestion des erreurs (produit non trouvé)

### Page du panier (`/pages/panier/`)
- Affichage des articles avec quantités et prix
- Modification des quantités et suppression d'articles
- Calcul automatique des sous-totaux, taxes et total
- Bouton de vidage du panier avec confirmation
- Redirection vers le checkout

### Page de checkout (`/pages/checkout/`)
- Formulaire de livraison avec validation en temps réel
- Options de livraison (standard, express, overnight)
- Résumé de commande avec calcul des taxes
- Sauvegarde des informations d'adresse
- Confirmation de commande avec numéro de suivi

### Page d'ajout de produit (`/pages/form/`)
- Formulaire complet avec validation
- Réservé aux administrateurs
- Intégration API en temps réel
- États de chargement et feedback

## 🔧 Fonctionnalités avancées

### Gestion d'état
- **LocalStorage** pour la persistance des sessions et paniers
- **EventEmitter** pour la communication inter-composants
- **Tokens d'authentification** pour les sessions sécurisées
- **Gestion des paniers par utilisateur** avec sauvegarde automatique

### Système de panier
- **Ajout/suppression d'articles** avec notifications visuelles
- **Gestion des quantités** avec contrôles intuitifs
- **Calcul automatique** des totaux et taxes (TPS + TVQ)
- **Persistance par utilisateur** liée à l'authentification
- **États de chargement** et feedback utilisateur

### Processus de commande
- **Validation de formulaire** en temps réel avec critères visuels
- **Options de livraison** avec tarifs dynamiques
- **Sauvegarde d'adresse** pour réutilisation future
- **Confirmation de commande** avec numéro de suivi
- **Vidage automatique** du panier après commande

### Sécurité
- **Validation côté client et serveur**
- **Middleware d'authentification** sur l'API
- **Protection des routes** sensibles
- **Gestion des erreurs** robuste


### Frontend
Tests manuels disponibles via l'interface utilisateur :
- Connexion/Inscription
- Navigation entre pages
- Fonctionnalités CRUD (selon les rôles)
- Responsive design sur différents appareils

## 📦 Build de production

### Backend
```bash
cd back-end
npm start
```

### Frontend
```bash
cd front-end
npm run build
npm run preview
```

## 🔮 Extensions futures

### Fonctionnalités e-commerce
- Système de paiement
- Gestion des stocks en temps réel
- Historique des commandes

### Améliorations techniques
- Base de données relationnelle (PostgreSQL/MySQL)
- Tests automatisés (Jest/Cypress)
- Déploiement avec Docker

### Expérience utilisateur
- Recherche textuelle avancée
- Système de favoris
- Notifications push
- Mode sombre/clair

## 👨‍💻 Développement

### Structure du code
- **Architecture MVC** pour le backend
- **Classes ES6** pour le frontend
- **Modules ES6** pour l'organisation
- **SCSS modulaire** pour les styles

### Bonnes pratiques
- **Séparation des responsabilités**
- **Gestion d'erreurs centralisée**
- **Validation des données**
- **Documentation du code**


> 💡 **Conseil :** Consultez les README spécifiques de chaque partie ([Backend](back-end/README.md) et [Frontend](front-end/README.md)) pour une documentation technique détaillée.
