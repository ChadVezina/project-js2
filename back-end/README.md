# CubeShop Backend API

Backend Express.js pour l'application CubeShop avec gestion des produits et utilisateurs via JSONArrayDatabase.

## Architecture

Ce backend suit le pattern MVC (Model-View-Controller) pour une meilleure organisation du code. Pour une description détaillée de l'architecture et de l'organisation des fichiers, consultez [ARCHITECTURE.md](ARCHITECTURE.md).

## Installation

```bash
cd back-end
npm install
```

## Démarrage

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

Le serveur démarre par défaut sur http://localhost:3000

## Endpoints API

### Base

-   `GET /api` - Informations sur l'API et documentation des endpoints

### Produits

#### Récupérer tous les produits

-   **GET** `/api/products`
-   **Réponse**: Liste de tous les produits

#### Récupérer un produit par ID

-   **GET** `/api/products/:id`
-   **Paramètres**: `id` (integer) - ID du produit
-   **Réponse**: Détails du produit

#### Créer un nouveau produit

-   **POST** `/api/products`
-   **Body**:

```json
{
    "nom": "Nom du produit",
    "marque": "Marque",
    "image": "URL de l'image (optionnel)",
    "prix": "Prix",
    "description": "Description (optionnel)"
}
```

#### Modifier un produit

-   **PUT** `/api/products/:id`
-   **Paramètres**: `id` (integer) - ID du produit
-   **Body**: Mêmes champs que pour la création (tous optionnels)

#### Supprimer un produit

-   **DELETE** `/api/products/:id`
-   **Paramètres**: `id` (integer) - ID du produit

### Utilisateurs

#### Récupérer tous les utilisateurs

-   **GET** `/api/users`
-   **Réponse**: Liste de tous les utilisateurs (sans mots de passe)

#### Récupérer un utilisateur par ID

-   **GET** `/api/users/:id`
-   **Paramètres**: `id` (integer) - ID de l'utilisateur
-   **Réponse**: Détails de l'utilisateur (sans mot de passe)

#### Créer un nouvel utilisateur

-   **POST** `/api/users`
-   **Body**:

```json
{
    "username": "nom_utilisateur",
    "email": "email@example.com",
    "password": "mot_de_passe",
    "firstName": "Prénom (optionnel)",
    "lastName": "Nom (optionnel)"
}
```

#### Modifier un utilisateur

-   **PUT** `/api/users/:id`
-   **Paramètres**: `id` (integer) - ID de l'utilisateur
-   **Body**: Mêmes champs que pour la création (tous optionnels)

#### Supprimer un utilisateur

-   **DELETE** `/api/users/:id`
-   **Paramètres**: `id` (integer) - ID de l'utilisateur

## Format des réponses

Toutes les réponses suivent le format standardisé :

### Succès

```json
{
  "success": true,
  "message": "Message de succès (optionnel)",
  "data": { ... },
  "count": 10
}
```

### Erreur

```json
{
    "success": false,
    "message": "Message d'erreur",
    "error": "Détails de l'erreur (en développement)"
}
```

## Codes de statut HTTP

-   `200` - Succès
-   `201` - Créé avec succès
-   `400` - Erreur de validation ou données manquantes
-   `404` - Ressource non trouvée
-   `500` - Erreur interne du serveur

## Base de données

Les données sont stockées dans des fichiers JSON via JSONArrayDatabase :

-   `data/products.json` - Produits
-   `data/users.json` - Utilisateurs

## Structure du projet

Le backend utilise une architecture MVC organisée comme suit :

-   **`src/models/`** - Modèles de données (Product.js, User.js)
-   **`src/controllers/`** - Logique métier des contrôleurs
-   **`src/routes/`** - Définition des routes et endpoints
-   **`src/middleware/`** - Middlewares personnalisés (gestion d'erreurs)
-   **`src/config/`** - Configuration de l'application
-   **`database/`** - Système de base de données JSON
-   **`data/`** - Fichiers de données JSON

Pour plus de détails sur l'architecture, voir [ARCHITECTURE.md](ARCHITECTURE.md).

## Middleware utilisé

-   **Morgan** - Logging des requêtes HTTP
-   **CORS** - Gestion des requêtes cross-origin
-   **Express.json()** - Parsing du JSON dans les requêtes


