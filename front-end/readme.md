# CubeShop Frontend

Interface utilisateur moderne pour CubeShop - une application de commerce électronique spécialisée dans les cubes Rubik et puzzles. Cette application offre une expérience utilisateur complète avec authentification, gestion des produits, et interface d'administration.

## Fonctionnalités principales

### 🔐 Système d'authentification complet

-   **Connexion/Inscription** avec validation en temps réel
-   **Gestion des rôles** (Utilisateur/Administrateur)
-   **Protection des pages** sensibles
-   **Sessions persistantes** avec localStorage/sessionStorage
-   **Déconnexion** sécurisée

### 🛍️ Gestion des produits

-   **Catalogue interactif** avec grille responsive
-   **Filtrage par marque** avec dropdown dynamique
-   **Pagination intelligente** (bouton "Afficher Plus")
-   **Pages de détail** produit avec navigation
-   **Ajout de produits** (réservé aux administrateurs)

### 👥 Gestion des utilisateurs

-   **Interface d'administration** pour les comptes utilisateur
-   **Contrôle d'accès** basé sur les rôles
-   **Validation des formulaires** côté client
-   **Feedback utilisateur** avec états de chargement

### 🎨 Interface utilisateur moderne

-   **Design responsive** mobile-first
-   **Thème cohérent** inspiré des cubes Rubik
-   **Animations fluides** et transitions
-   **Indicateurs visuels** pour l'état de l'API
-   **Composants Web** réutilisables

## Technologies

-   **Vite** - Build tool moderne et rapide
-   **Vanilla JavaScript (ES6+)** - JavaScript moderne sans framework
-   **SCSS** - Préprocesseur CSS avec variables et mixins
-   **HTML5** - Structure sémantique
-   **Web Components** - Composants réutilisables natifs

## Architecture

L'application utilise une architecture modulaire basée sur des classes ES6 et des Web Components :

```
front-end/
├── src/
│   ├── index.html              # Page d'accueil
│   ├── main.js                 # Point d'entrée principal
│   ├── main.scss              # Styles de la page d'accueil
│   ├── assets/
│   │   └── styles/            # Système de styles modulaire
│   │       ├── styles.scss    # Styles principaux
│   │       ├── api-states.scss # Styles pour états API
│   │       └── partials/      # Modules SCSS
│   ├── classes/               # Classes JavaScript principales
│   │   ├── CubeShopApp.js    # Application principale
│   │   ├── ProductGrid.js    # Grille de produits
│   │   ├── FilterManager.js  # Gestion des filtres
│   │   ├── FormManager.js    # Gestion des formulaires
│   │   ├── FormValidator.js  # Validation de formulaires
│   │   ├── AuthManager.js    # Authentification
│   │   ├── ProductPage.js    # Page produit détaillée
│   │   ├── PaginationManager.js # Gestion de la pagination
│   │   ├── BackendSimulator.js  # Simulation backend
│   │   └── ...
│   ├── components/           # Web Components réutilisables
│   │   ├── header.js        # En-tête de navigation
│   │   └── footer.js        # Pied de page
│   ├── pages/               # Pages de l'application
│   │   ├── form/           # Page d'ajout de produit
│   │   ├── produit/        # Page détail produit
│   │   └── auth/           # Page d'authentification
│   ├── services/           # Services API
│   │   └── apiService.js   # Service API centralisé
│   └── utils/              # Utilitaires
│       ├── products-manager.js      # Gestion des produits
│       ├── page-initializer.js      # Initialisation des pages
│       ├── event-emitter.js         # Système d'événements
│       ├── api-connection-manager.js # Gestion connexion API
│       └── auth-guard.js           # Protection des routes
├── config/
│   └── config.js           # Configuration générale
├── data/
│   └── products.js         # Données de démonstration
├── vite.config.js         # Configuration Vite
└── package.json
```

## Installation

```bash
cd front-end
npm install
```

## Développement

```bash
# Serveur de développement avec hot reload
npm run dev
```

Le serveur démarre sur http://localhost:5173

## Build

```bash
# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## Pages et Fonctionnalités

### Page d'accueil (`/`)

-   **Grille de produits** responsive avec pagination intelligente
-   **Filtrage par marque** avec dropdown interactif
-   **Bouton "Afficher Plus"** pour charger progressivement les produits
-   **Navigation** fluide vers les détails des produits
-   **Indicateur de statut API** en temps réel
-   **Header dynamique** avec informations utilisateur connecté

### Page de détail produit (`/pages/produit/produit.html`)

-   **Affichage détaillé** du produit sélectionné
-   **Image, nom, marque, prix et description** avec mise en forme avancée
-   **Gestion des produits non trouvés** avec page d'erreur personnalisée
-   **Navigation fluide** avec gestion de l'historique
-   **Bouton de retour** vers la liste des produits

### Page d'ajout de produit (`/pages/form/form.html`)

-   **Protection administrateur** avec vérification des privilèges
-   **Formulaire complet** avec validation en temps réel
-   **Validation côté client** avec messages d'erreur contextuels
-   **Intégration API** pour la soumission
-   **États de chargement** et feedback visuel
-   **Gestion des erreurs** avec retry automatique

### Page d'authentification (`/pages/auth/auth.html`)

-   **Interface à onglets** pour connexion/inscription
-   **Formulaires avec validation** en temps réel
-   **Sélection du rôle** (Utilisateur/Administrateur)
-   **Validation des mots de passe** avec critères de sécurité
-   **Option "Se souvenir de moi"** pour les sessions persistantes
-   **Gestion des erreurs** serveur et client
-   **Redirection automatique** après connexion réussie

## Système d'authentification

### Comptes de test disponibles

#### Administrateur

-   **Username**: `admin`
-   **Email**: `admin@cubeshop.com`
-   **Password**: `Admin123`
-   **Accès**: Toutes les fonctionnalités

#### Utilisateur standard

-   **Username**: `johndoe`
-   **Email**: `john.doe@example.com`
-   **Password**: `password123`
-   **Accès**: Consultation des produits

### Fonctionnalités d'authentification

-   **Connexion sécurisée** avec validation serveur
-   **Inscription publique** avec sélection de rôle
-   **Gestion des sessions** avec tokens d'authentification
-   **Protection des routes** avec `AuthGuard`
-   **Déconnexion propre** avec nettoyage des données
-   **Vérification des privilèges** en temps réel

## Contrôle d'accès

### Permissions par rôle

#### Administrateur (`admin`)

-   ✅ Consultation des produits
-   ✅ Ajout de nouveaux produits
-   ✅ Modification des produits
-   ✅ Suppression des produits
-   ✅ Gestion des utilisateurs
-   ✅ Accès à toutes les pages

#### Utilisateur (`user`)

-   ✅ Consultation des produits
-   ✅ Consultation des détails produit
-   ❌ Ajout/modification/suppression de produits
-   ❌ Accès aux pages d'administration

### Protection des pages

-   **Pages publiques** : Accueil, détails produit, authentification
-   **Pages protégées** : Formulaire d'ajout de produit
-   **Redirection automatique** vers la page de connexion si non autorisé
-   **Messages d'erreur** contextuels pour les accès refusés

## Système de Styles

### Variables CSS personnalisées

```scss
// Palette inspirée du rubik cube
--primary: #ff6b35; // Orange
--secondary: #1e88e5; // Bleu
--accent: #43a047; // Vert
--danger: #e53935; // Rouge
--warning: #ffb300; // Jaune
--text: #333333; // Texte principal
--text-light: #666666; // Texte secondaire
```

### Architecture SCSS modulaire

-   **`_reset.scss`** - Reset CSS moderne
-   **`_variables.scss`** - Variables et couleurs
-   **`_base.scss`** - Styles de base
-   **`_classes.scss`** - Classes utilitaires
-   **`_utils.scss`** - Utilitaires de spacing
-   **`_media-queries.scss`** - Mixins responsive
-   **`api-states.scss`** - États API et chargement

### Design System

-   **Responsive design** avec breakpoints mobiles
-   **Système de grille** flexible avec CSS Grid
-   **Composants réutilisables** (boutons, cartes, formulaires)
-   **Animations et transitions** fluides
-   **Thème cohérent** inspiré des cubes Rubik
-   **États de chargement** et feedback utilisateur

## Classes Principales

### [`CubeShopApp`](src/classes/CubeShopApp.js)

Application principale qui coordonne tous les composants :

-   Initialisation des gestionnaires de produits et filtres
-   Coordination des filtres et pagination
-   Gestion de l'état global de l'application
-   Intégration avec le gestionnaire de connexion API

### [`AuthManager`](src/classes/AuthManager.js)

Gestion complète de l'authentification :

-   **Connexion et inscription** d'utilisateurs avec validation
-   **Validation des formulaires** en temps réel
-   **Gestion des sessions** avec tokens et localStorage
-   **États de chargement** et gestion d'erreurs
-   **Interface à onglets** pour connexion/inscription
-   **Intégration avec AuthGuard** pour la protection des routes

### [`FormManager`](src/classes/FormManager.js)

Gestion avancée des formulaires d'ajout de produits :

-   **Validation en temps réel** avec [`FormValidator`](src/classes/FormValidator.js)
-   **Gestion des erreurs** contextuelles par champ
-   **Soumission avec intégration API** réelle
-   **Protection par authentification** avec vérification des rôles
-   **États de chargement** et feedback visuel

### [`ProductPage`](src/classes/ProductPage.js)

Affichage détaillé des produits :

-   **Récupération des données** produit via API
-   **Rendu dynamique** du contenu avec templating
-   **Gestion des erreurs** et produits non trouvés
-   **Navigation fluide** avec gestion de l'historique
-   **Optimisation des images** avec lazy loading

### [`PaginationManager`](src/classes/PaginationManager.js)

Système de pagination intelligent :

-   **Chargement progressif** des produits
-   **Bouton "Afficher Plus"** avec états de chargement
-   **Gestion de fin de liste** avec message informatif
-   **Intégration avec filtres** pour pagination filtrée
-   **Performance optimisée** avec cache local

### [`ProductService`](src/classes/ProductService.js)

Service pour la gestion des produits :

-   **Validation d'images** avec types et tailles autorisés
-   **Soumission de produits** avec gestion d'erreurs
-   **Mise à jour et suppression** de produits (admin)
-   **Gestion d'états de chargement** avec spinners
-   **Intégration API** complète avec retry automatique

## Services et Utilitaires

### [`apiService`](src/services/apiService.js)

Service API centralisé pour toutes les communications avec le backend :

-   **Gestion des requêtes HTTP** avec fetch API
-   **Authentification automatique** avec headers d'autorisation
-   **Gestion des erreurs** réseau et serveur
-   **Méthodes d'authentification** (login, logout, register)
-   **CRUD complet** pour produits et utilisateurs
-   **Gestion des tokens** avec persistance
-   **Retry automatique** en cas d'échec

### [`apiConnectionManager`](src/utils/api-connection-manager.js)

Gestionnaire de connexion API avec surveillance en temps réel :

-   **Surveillance du statut** de connexion API
-   **Indicateur visuel** de statut dans l'interface
-   **Gestion des timeouts** et reconnexions automatiques
-   **Notifications utilisateur** pour les problèmes de connexion
-   **Retry intelligent** avec backoff exponentiel

### [`AuthGuard`](src/utils/auth-guard.js)

Protection des routes et vérification des permissions :

-   **Vérification d'authentification** avec validation serveur
-   **Contrôle d'accès** basé sur les rôles
-   **Redirection automatique** vers la page de connexion
-   **Gestion des sessions expirées** avec nettoyage
-   **Méthodes utilitaires** pour vérifier les permissions
-   **Interface Promise** pour faciliter l'utilisation

### [`EventEmitter`](src/utils/event-emitter.js)

Système d'événements pour la communication entre composants :

-   **Gestion des événements** personnalisés
-   **Communication inter-composants** découplée
-   **Gestion des abonnements** et désabonnements
-   **Performance optimisée** avec weak references

### [`PageInitializer`](src/utils/page-initializer.js)

Initialisation standardisée des pages :

-   **Chargement paresseux** des composants
-   **Gestion des erreurs** d'initialisation
-   **Configuration flexible** par page
-   **Intégration avec les classes** principales

## Web Components

### [`app-header`](src/components/header.js)

En-tête de navigation réutilisable et intelligent :

-   **Navigation responsive** avec liens vers toutes les sections
-   **Indication de la page active** avec highlighting
-   **Gestion dynamique** de l'état d'authentification
-   **Affichage des informations utilisateur** (nom, bouton déconnexion)
-   **Écoute des événements** de connexion/déconnexion
-   **Intégration avec AuthGuard** pour la déconnexion

### [`app-footer`](src/components/footer.js)

Pied de page simple et élégant :

-   **Branding cohérent** avec le thème CubeShop
-   **Liens utiles** et informations légales
-   **Design responsive** adapté à tous les écrans

## Intégration API

### Configuration

Le frontend communique avec le backend via l'API REST :

-   **URL de base** : `http://localhost:3000/api`
-   **Authentification** : Headers `user-id` et `user-role`
-   **Format des données** : JSON
-   **Gestion des erreurs** : Codes HTTP standard

### Endpoints utilisés

#### Authentification

-   `POST /users/login` - Connexion utilisateur
-   `POST /users/register` - Inscription utilisateur
-   `GET /users/auth/verify` - Vérification du token

#### Produits

-   `GET /products` - Liste des produits
-   `GET /products/:id` - Détails d'un produit
-   `POST /products` - Ajout d'un produit (admin)
-   `PUT /products/:id` - Modification d'un produit (admin)
-   `DELETE /products/:id` - Suppression d'un produit (admin)

#### Utilisateurs

-   `GET /users` - Liste des utilisateurs (authentifié)
-   `GET /users/:id` - Détails d'un utilisateur
-   `POST /users` - Création d'un utilisateur (admin)
-   `PUT /users/:id` - Modification d'un utilisateur (admin)
-   `DELETE /users/:id` - Suppression d'un utilisateur (admin)

### Gestion des erreurs API

-   **Codes de statut** : 200, 201, 400, 401, 403, 404, 500
-   **Messages d'erreur** : Localisés en français
-   **Retry automatique** : Pour les erreurs réseau
-   **Fallback** : Mode dégradé en cas d'indisponibilité API

## Gestion des Événements

Système d'événements basé sur [`EventEmitter`](src/utils/event-emitter.js) pour la communication entre composants :

```javascript
// Exemple d'utilisation
filterManager.on("filterChange", (data) => {
    productGrid.applyFilter(data.brand);
});

// Gestion des événements d'authentification
authManager.on("loginSuccess", (user) => {
    // Redirection ou mise à jour de l'interface
});
```

## Gestion d'État

-   **localStorage** pour la persistance des produits et sessions
-   **Classes ES6** pour l'état local des composants
-   **EventEmitter** pour la communication inter-composants
-   **URL parameters** pour l'état de navigation
-   **Tokens d'authentification** pour les sessions utilisateur

## Responsive Design

Design adaptatif avec breakpoints :

-   **Mobile-first** approach (768px breakpoint)
-   **Grille CSS Grid** flexible
-   **Navigation adaptive** avec menu hamburger
-   **Images optimisées** avec lazy loading
-   **Formulaires responsive** avec validation

## Fonctionnalités Avancées

### Système d'authentification intégré

-   **Formulaires de connexion/inscription** avec validation avancée
-   **Gestion des sessions** avec localStorage et sessionStorage
-   **Protection des routes** avec `AuthGuard` et vérification serveur
-   **Feedback utilisateur** avec états de chargement et animations
-   **Gestion des rôles** avec permissions différenciées
-   **Déconnexion sécurisée** avec nettoyage des données

### Pagination et filtrage intelligents

-   **Chargement progressif** des produits avec performance optimisée
-   **Bouton "Afficher Plus"** avec gestion d'états avancée
-   **Filtrage par marque** avec mise à jour en temps réel
-   **Gestion de fin de liste** avec messages informatifs
-   **Intégration complète** entre filtres et pagination
-   **Cache local** pour améliorer les performances

### Validation de formulaires avancée

-   **Validation en temps réel** avec `FormValidator`
-   **Messages d'erreur contextuels** par champ
-   **Prévention de soumission invalide** avec désactivation bouton
-   **Feedback visuel immédiat** avec styles CSS dynamiques
-   **Validation des mots de passe** avec critères de sécurité
-   **Vérification de la correspondance** des mots de passe

### Gestion des erreurs robuste

-   **Pages d'erreur personnalisées** avec boutons de retour
-   **Gestion des timeouts** API avec retry automatique
-   **Validation côté client** avant soumission
-   **Messages d'erreur localisés** en français
-   **Logging détaillé** pour le débogage
-   **Fallback gracieux** en cas d'erreur critique

## Optimisations

-   **Code splitting** avec Vite et imports dynamiques
-   **Imports dynamiques** pour les pages avec lazy loading
-   **CSS modulaire** avec partials SCSS
-   **Images optimisées** avec lazy loading et formats modernes
-   **Bundle moderne** ES6+ avec fallbacks
-   **Caching intelligent** avec localStorage
-   **Minification** CSS et JS en production

## Browser Support

-   **Modules ES6** (Chrome 61+, Firefox 60+, Safari 11+)
-   **CSS Grid** et Flexbox pour la mise en page
-   **Web Components** natifs avec polyfills
-   **LocalStorage** pour la persistance
-   **Fetch API** pour les requêtes HTTP
-   **CSS Custom Properties** pour les variables

## Extensions Futures

### Intégration backend complète

-   **Authentification JWT** avec refresh tokens
-   **Gestion des sessions** serveur sécurisée
-   **API REST** complète avec validation avancée
-   **Gestion des permissions** granulaire côté serveur

### Fonctionnalités e-commerce

-   **Système de panier d'achat** avec persistance
-   **Gestion des commandes** et historique
-   **Système de paiement** intégré
-   **Gestion des stocks** en temps réel

### Expérience utilisateur avancée

-   **Recherche textuelle** avec indexation full-text
-   **Filtres avancés** (prix, catégorie, popularité)
-   **Système de favoris** avec synchronisation
-   **Recommandations personnalisées** basées sur l'historique

### Fonctionnalités techniques

-   **Mode sombre/clair** avec préférences utilisateur
-   **PWA** avec service workers et cache offline
-   **Notifications push** pour les nouveaux produits
-   **Internationalisation** multi-langues (i18n)

### Qualité et performance

-   **Tests unitaires et E2E** avec Jest/Cypress
-   **Monitoring des performances** avec analytics
-   **Optimisation des images** avec CDN
-   **Lazy loading** avancé pour les ressources

### Administration avancée

-   **Tableau de bord** administrateur avec statistiques
-   **Gestion des utilisateurs** avec permissions granulaires
-   **Système de logs** et audit trail
-   **Sauvegarde et restauration** des données

## Déploiement et production

### Optimisations de production

-   **Minification** CSS et JS automatique
-   **Bundle splitting** pour un chargement optimisé
-   **Cache headers** pour les ressources statiques
-   **Compression gzip** pour réduire la taille des fichiers

### Sécurité

-   **Content Security Policy** (CSP)
-   **Validation des entrées** côté client et serveur
-   **Protection CSRF** avec tokens
-   **Chiffrement des données** sensibles

### Monitoring

-   **Logging des erreurs** avec service externe
-   **Métriques de performance** utilisateur
-   **Alertes automatiques** en cas de problème
-   **Tableau de bord** de monitoring en temps réel
