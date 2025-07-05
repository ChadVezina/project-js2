# CubeShop Backend API

Backend Express.js pour l'application CubeShop avec gestion des produits et utilisateurs via JSONArrayDatabase. Ce backend inclut un système d'authentification et d'autorisation complet avec gestion des rôles.

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

## Système d'authentification

Le backend utilise un système d'authentification par headers simulé avec gestion des rôles :

-   **Rôles disponibles** : `admin`, `user`
-   **Authentification** : Via headers `user-id` et `user-role`
-   **Permissions** : Contrôle d'accès basé sur les rôles
-   **Sécurité** : Validation des données et gestion des erreurs

## Endpoints API

### Base

-   `GET /api` - Informations sur l'API et documentation des endpoints
-   `GET /api/health` - Vérification de l'état de santé de l'API

### Authentification

#### Connexion

-   **POST** `/api/users/login`
-   **Body**:

```json
{
    "username": "nom_utilisateur",
    "password": "mot_de_passe"
}
```

-   **Réponse**: Données utilisateur, token d'authentification et rôle

#### Inscription

-   **POST** `/api/users/register`
-   **Body**:

```json
{
    "username": "nom_utilisateur",
    "email": "email@example.com",
    "password": "mot_de_passe",
    "role": "user" // ou "admin"
}
```

-   **Réponse**: Confirmation de création du compte

#### Vérification d'authentification

-   **GET** `/api/users/auth/verify`
-   **Headers**: `user-id` et `user-role` requis
-   **Réponse**: Validation du token et informations utilisateur

### Produits

#### Récupérer tous les produits

-   **GET** `/api/products`
-   **Accès**: Public
-   **Réponse**: Liste de tous les produits

#### Récupérer un produit par ID

-   **GET** `/api/products/:id`
-   **Accès**: Public
-   **Paramètres**: `id` (integer) - ID du produit
-   **Réponse**: Détails du produit

#### Créer un nouveau produit

-   **POST** `/api/products`
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
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
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
-   **Paramètres**: `id` (integer) - ID du produit
-   **Body**: Mêmes champs que pour la création (tous optionnels)

#### Supprimer un produit

-   **DELETE** `/api/products/:id`
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
-   **Paramètres**: `id` (integer) - ID du produit

### Utilisateurs

#### Récupérer tous les utilisateurs

-   **GET** `/api/users`
-   **Accès**: Utilisateurs authentifiés (lecture)
-   **Headers**: `user-id` et `user-role` requis
-   **Réponse**: Liste de tous les utilisateurs (sans mots de passe)

#### Récupérer un utilisateur par ID

-   **GET** `/api/users/:id`
-   **Accès**: Utilisateur lui-même ou administrateur
-   **Headers**: `user-id` et `user-role` requis
-   **Paramètres**: `id` (integer) - ID de l'utilisateur
-   **Réponse**: Détails de l'utilisateur (sans mot de passe)

#### Créer un nouvel utilisateur (Administration)

-   **POST** `/api/users`
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
-   **Body**:

```json
{
    "username": "nom_utilisateur",
    "email": "email@example.com",
    "password": "mot_de_passe",
    "firstName": "Prénom (optionnel)",
    "lastName": "Nom (optionnel)",
    "role": "user" // ou "admin"
}
```

#### Modifier un utilisateur

-   **PUT** `/api/users/:id`
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
-   **Paramètres**: `id` (integer) - ID de l'utilisateur
-   **Body**: Mêmes champs que pour la création (tous optionnels)

#### Supprimer un utilisateur

-   **DELETE** `/api/users/:id`
-   **Accès**: Administrateur uniquement
-   **Headers**: `user-id` et `user-role` requis
-   **Paramètres**: `id` (integer) - ID de l'utilisateur

## Système de permissions

### Rôles et accès

-   **Administrateur (`admin`)**:

    -   Accès complet à tous les endpoints
    -   Création, modification et suppression de produits
    -   Création, modification et suppression d'utilisateurs
    -   Lecture de tous les utilisateurs

-   **Utilisateur (`user`)**:
    -   Lecture des produits (accès public)
    -   Lecture de tous les utilisateurs (authentifié)
    -   Accès à ses propres données utilisateur uniquement

### Middleware d'authentification

-   **`authenticate`**: Vérifie la présence des headers `user-id` et `user-role`
-   **`requireAdmin`**: Nécessite le rôle administrateur
-   **`requireReadAccess`**: Nécessite une authentification (tous les utilisateurs)
-   **`requireSelfOrAdmin`**: Accès à ses propres données ou administrateur
-   **`requireWriteAccess`**: Nécessite le rôle administrateur pour écriture

## Comptes de test

Le système inclut des comptes de test préconfigurés :

### Administrateur

-   **Username**: `admin`
-   **Email**: `admin@cubeshop.com`
-   **Password**: `Admin123`
-   **Role**: `admin`

### Utilisateur standard

-   **Username**: `johndoe`
-   **Email**: `john.doe@example.com`
-   **Password**: `password123`
-   **Role**: `user`

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
-   **Middleware personnalisés** :
    -   `authenticate` - Vérification de l'authentification
    -   `requireAdmin` - Vérification des privilèges administrateur
    -   `requireReadAccess` - Vérification d'accès en lecture
    -   `requireSelfOrAdmin` - Vérification d'accès aux données personnelles
    -   `asyncHandler` - Gestion des erreurs asynchrones

## Tests

Le backend inclut des scripts de test pour vérifier le fonctionnement :

### Test de l'API

```bash
node test-api.js
```

### Test de connexion

```bash
node test-login.js
```

### Test des privilèges

```bash
node test-privileges.js
```

## Sécurité

-   **Validation des données** : Validation côté serveur pour tous les endpoints
-   **Gestion des erreurs** : Middleware centralisé pour la gestion des erreurs
-   **Contrôle d'accès** : Système de permissions basé sur les rôles
-   **Sanitisation** : Suppression des mots de passe dans les réponses
-   **Validation des rôles** : Vérification des rôles valides (`admin`, `user`)

## Développement

### Structure MVC

Le backend suit le pattern MVC avec :

-   **Models** : Gestion des données et logique métier
-   **Views** : Réponses JSON standardisées
-   **Controllers** : Traitement des requêtes et coordination

### Gestion des erreurs

Format standardisé des erreurs avec codes HTTP appropriés :

-   `400` : Erreur de validation
-   `401` : Authentification requise
-   `403` : Accès refusé (permissions insuffisantes)
-   `404` : Ressource non trouvée
-   `500` : Erreur interne du serveur
