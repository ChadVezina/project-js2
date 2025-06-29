# CubeShop - E-commerce de Cubes Rubik

Application web complète de commerce électronique spécialisée dans les cubes Rubik et puzzles, avec frontend moderne et API backend robuste.

## 🎯 Vue d'ensemble

CubeShop est une application full-stack développée pour la vente en ligne de cubes Rubik et puzzles. Elle combine une interface utilisateur moderne en JavaScript vanilla avec une API REST backend en Node.js/Express.

### ✨ Fonctionnalités principales

- **Catalogue de produits** avec filtrage et pagination
- **Pages détaillées** pour chaque produit
- **Formulaire d'ajout** de nouveaux produits avec validation
- **Système d'authentification** (connexion/inscription)
- **API REST complète** pour la gestion des données
- **Design responsive** adapté à tous les appareils
- **Interface moderne** inspirée des couleurs du cube Rubik

## 🏗️ Architecture du Projet

```
my-project-js2/
├── front-end/          # Application web frontend
│   ├── src/
│   │   ├── index.html
│   │   ├── pages/      # Pages de l'application
│   │   ├── classes/    # Classes JavaScript principales
│   │   ├── components/ # Web Components réutilisables
│   │   ├── assets/     # Styles et ressources
│   │   └── utils/      # Utilitaires
│   ├── data/           # Données de démonstration
│   └── vite.config.js  # Configuration du build
└── back-end/           # API REST backend
    ├── src/
    │   ├── controllers/ # Logique métier
    │   ├── models/      # Modèles de données
    │   ├── routes/      # Routes API
    │   └── middleware/  # Middlewares Express
    ├── database/        # Système de base de données JSON
    ├── data/            # Fichiers de données
    └── server.js        # Point d'entrée du serveur
```

## 🚀 Installation et Démarrage

### Prérequis

- **Node.js** (version 16+)
- **npm** ou **yarn**

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd my-project-js2

# Installation du frontend
cd front-end
npm install

# Installation du backend
cd ../back-end
npm install
```

### Démarrage en développement

#### Backend (Terminal 1)
```bash
cd back-end
npm run dev
# Serveur API disponible sur http://localhost:3000
```

#### Frontend (Terminal 2)
```bash
cd front-end
npm run dev
# Application web disponible sur http://localhost:5173
```

### Build de production

```bash
# Frontend
cd front-end
npm run build

# Backend
cd back-end
npm start
```

## 🎨 Frontend

### Technologies
- **Vite** - Build tool moderne
- **Vanilla JavaScript ES6+** - Sans framework
- **SCSS** - Préprocesseur CSS
- **Web Components** - Composants natifs

### Pages
- **`/`** - Accueil avec grille de produits
- **`/pages/produit/`** - Détails d'un produit
- **`/pages/form/`** - Ajout de produit
- **`/pages/auth/`** - Authentification

### Fonctionnalités
- ✅ **Responsive design** mobile-first
- ✅ **Filtrage par marque** avec dropdown
- ✅ **Pagination intelligente** avec "Afficher Plus"
- ✅ **Validation de formulaires** en temps réel
- ✅ **Gestion d'état** avec localStorage
- ✅ **Système d'événements** inter-composants
- ✅ **Design system** cohérent

Pour plus de détails : [`front-end/readme.md`](front-end/readme.md)

## 🔧 Backend

### Technologies
- **Node.js** avec **Express.js**
- **Architecture MVC** modulaire
- **JSONArrayDatabase** pour la persistance
- **Middleware** de gestion d'erreurs

### API Endpoints

#### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail d'un produit
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

#### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détail d'un utilisateur
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Fonctionnalités
- ✅ **API REST complète** avec CRUD
- ✅ **Validation des données** côté serveur
- ✅ **Gestion d'erreurs** centralisée
- ✅ **Format de réponse** standardisé
- ✅ **Documentation API** intégrée
- ✅ **CORS** pour le développement
- ✅ **Logging** des requêtes

Pour plus de détails : [`back-end/README.md`](back-end/README.md)

## 📱 Design System

### Palette de couleurs (inspirée du cube Rubik)
- **Orange** (`#ff6b35`) - Couleur primaire
- **Bleu** (`#1e88e5`) - Couleur secondaire
- **Vert** (`#43a047`) - Accent positif
- **Rouge** (`#e53935`) - Erreurs/danger
- **Jaune** (`#ffb300`) - Avertissements

### Composants
- **Boutons** avec animations et états
- **Cartes produits** avec hover effects
- **Formulaires** avec validation visuelle
- **Grille responsive** avec CSS Grid
- **Navigation** adaptative

## 🔄 Workflow de Développement

### Structure MVC
- **Models** - Gestion des données et validation
- **Views** - Pages HTML et composants
- **Controllers** - Logique métier et coordination

### Communication Frontend ↔ Backend
- **API REST** avec format JSON standardisé
- **Codes de statut HTTP** appropriés
- **Gestion d'erreurs** unifiée
- **Validation** côté client et serveur

## 📊 Base de Données

### Format JSON avec JSONArrayDatabase
- **Produits** - `back-end/data/products.json`
- **Utilisateurs** - `back-end/data/users.json`
- **CRUD complet** avec validation
- **IDs uniques** générés automatiquement

### Exemple de produit
```json
{
  "id": 1742596869,
  "nom": "GAN 356 M",
  "marque": "GAN",
  "prix": "45.99",
  "image": "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
  "description": "Cube magnétique 3x3 avec innovations GAN..."
}
```

## 🧪 Fonctionnalités Avancées

### Frontend
- **Page Initializer** pour le chargement dynamique
- **Event Emitter** pour la communication inter-composants
- **Form Validator** avec règles personnalisées
- **Backend Simulator** pour les tests sans serveur
- **Product Manager** avec persistance localStorage

### Backend
- **Async Handler** pour la gestion d'erreurs
- **Error Middleware** centralisé
- **Route Documentation** automatique
- **Model Validation** avec messages d'erreur

## 🚀 Déploiement

### Frontend
```bash
npm run build
# Fichiers statiques générés dans /dist
```

### Backend
```bash
npm start
# Serveur prêt pour production
```

## 📈 Extensions Futures

### Frontend
- [ ] **PWA** avec service workers
- [ ] **Mode sombre/clair**
- [ ] **Recherche textuelle** avancée
- [ ] **Panier d'achat** complet
- [ ] **Tests unitaires** avec Vitest

### Backend
- [ ] **Base de données** relationnelle (PostgreSQL)
- [ ] **Authentification JWT** sécurisée
- [ ] **Upload d'images** avec validation
- [ ] **Cache Redis** pour les performances
- [ ] **Tests API** avec Jest

### DevOps
- [ ] **Docker** containers
- [ ] **CI/CD** pipeline
- [ ] **Monitoring** et logging
- [ ] **Documentation** automatique

## 👥 Développement

### Standards de code
- **ES6+** avec modules
- **SCSS** modulaire avec BEM
- **Architecture MVC** séparée
- **Validation** client et serveur
- **Gestion d'erreurs** robuste

### Outils
- **Vite** pour le build frontend
- **Nodemon** pour le développement backend
- **SASS** pour les styles
- **Morgan** pour le logging
- **CORS** pour le développement

## 📄 Documentation

- [`front-end/README.md`](front-end/README.md) - Documentation détaillée du frontend
- [`back-end/README.md`](back-end/README.md) - Documentation de l'API backend
- [`back-end/ARCHITECTURE.md`](back-end/ARCHITECTURE.md) - Architecture détaillée du backend

---

**CubeShop** - Votre boutique en ligne pour cubes Rubik et puzzles 🧩
