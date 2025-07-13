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
-   **Système de panier** avec ajout/modification/suppression d'articles

### 🛒 Système e-commerce complet

-   **Panier d'achat** avec persistance par utilisateur
-   **Gestion des quantités** avec contrôles intuitifs
-   **Calcul automatique** des totaux et taxes (TPS + TVQ)
-   **Processus de checkout** avec formulaire de livraison
-   **Options de livraison** multiples avec tarifs
-   **Confirmation de commande** avec numéro de suivi

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

- **[Architecture](../back-end/ARCHITECTURE.md)** - Structure et organisation du code


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
-   **Contrôles de panier** intégrés (ajout, modification des quantités)
-   **Gestion des quantités** avec boutons + et - intuitifs
-   **Feedback visuel** pour les actions du panier
-   **Gestion des produits non trouvés** avec page d'erreur personnalisée
-   **Navigation fluide** avec gestion de l'historique
-   **Bouton de retour** vers la liste des produits

### Page du panier (`/pages/panier/panier.html`)

-   **Protection par authentification** avec redirection automatique
-   **Affichage des articles** avec images, noms, prix et quantités
-   **Contrôles de quantité** pour chaque article avec limites (1-99)
-   **Suppression d'articles** avec modales de confirmation
-   **Calcul automatique** des sous-totaux, taxes (TPS + TVQ) et total
-   **Bouton de vidage** du panier avec confirmation
-   **États de chargement** avec animations
-   **Redirection vers checkout** pour finaliser la commande
-   **Gestion du panier vide** avec message et bouton de retour aux achats

### Page de checkout (`/pages/checkout/checkout.html`)

-   **Protection par authentification** avec vérification des droits
-   **Formulaire de livraison** complet avec validation en temps réel
-   **Préremplissage automatique** avec les données utilisateur sauvegardées
-   **Options de livraison** avec tarifs différenciés :
     - Standard (gratuit, 5-7 jours)
     - Express (9,99$, 2-3 jours)
     - Le lendemain (19,99$, 1 jour)
-   **Résumé de commande** avec articles, quantités et prix
-   **Calcul dynamique** des totaux avec livraison et taxes
-   **Validation de formulaire** avec feedback visuel instantané
-   **Sauvegarde d'adresse** pour réutilisation future
-   **Confirmation de commande** avec modal et numéro de suivi
-   **Vidage automatique** du panier après commande réussie

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

### [`CartManager`](src/classes/CartManager.js)

Gestionnaire complet du panier d'achat :

-   **Gestion des articles** avec ajout, suppression et modification des quantités
-   **Persistance par utilisateur** avec sauvegarde dans localStorage
-   **Calculs automatiques** des totaux et compteurs d'articles
-   **Événements en temps réel** pour mise à jour de l'interface
-   **Intégration avec ToastManager** pour notifications utilisateur
-   **Gestion des sessions** avec nettoyage automatique à la déconnexion
-   **Validation des quantités** avec limites min/max
-   **État de synchronisation** avec l'interface utilisateur

### [`PanierPage`](src/classes/PanierPage.js)

Page dédiée à la gestion du panier :

-   **Interface complète** de gestion des articles du panier
-   **Contrôles de quantité** intuitifs avec boutons + et -
-   **Modales de confirmation** pour suppression et vidage
-   **Calcul des taxes** automatique (TPS + TVQ à 14,975%)
-   **États de chargement** avec animations fluides
-   **Protection par authentification** avec redirection
-   **Intégration avec CartManager** pour synchronisation
-   **Redirection intelligente** vers checkout ou catalogue

### [`CheckoutPage`](src/classes/CheckoutPage.js)

Processus complet de finalisation de commande :

-   **Formulaire de livraison** avec validation en temps réel
-   **Préremplissage automatique** des données utilisateur
-   **Options de livraison** avec tarifs dynamiques
-   **Validation de code postal** canadien avec formatage automatique
-   **Sauvegarde d'adresse** pour commandes futures
-   **Résumé de commande** avec calculs détaillés
-   **Génération de numéro** de commande unique
-   **Modal de confirmation** avec états de chargement
-   **Intégration complète** avec le système de panier

### [`ProductPage`](src/classes/ProductPage.js)

Affichage détaillé des produits avec fonctionnalités e-commerce :

-   **Récupération des données** produit via API
-   **Rendu dynamique** du contenu avec templating
-   **Intégration du panier** avec boutons d'ajout/suppression
-   **Contrôles de quantité** avec gestion des limites
-   **Feedback visuel** pour les actions du panier
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

-   **localStorage** pour la persistance des produits, sessions et paniers par utilisateur
-   **Classes ES6** pour l'état local des composants
-   **EventEmitter** pour la communication inter-composants
-   **URL parameters** pour l'état de navigation
-   **Tokens d'authentification** pour les sessions utilisateur
-   **Synchronisation panier** avec connexion/déconnexion utilisateur

## Responsive Design

Design adaptatif avec breakpoints :

-   **Mobile-first** approach (768px breakpoint)
-   **Grille CSS Grid** flexible
-   **Navigation adaptive** avec menu hamburger
-   **Images optimisées** avec lazy loading
-   **Formulaires responsive** avec validation

## Fonctionnalités Avancées

### Système e-commerce complet

-   **Panier d'achat persistant** avec sauvegarde par utilisateur
-   **Gestion des quantités** avec contrôles visuels intuitifs
-   **Calcul automatique des taxes** (TPS + TVQ) en temps réel
-   **Processus de checkout** avec formulaire de livraison complet
-   **Options de livraison** multiples avec tarifs différenciés
-   **Validation de code postal** canadien avec formatage automatique
-   **Sauvegarde d'adresse** pour réutilisation dans les commandes futures
-   **Génération de numéros** de commande uniques
-   **Modales de confirmation** pour actions critiques
-   **États de chargement** avec feedback visuel pour toutes les opérations

### Système d'authentification intégré

-   **Formulaires de connexion/inscription** avec validation avancée
-   **Gestion des sessions** avec localStorage et sessionStorage
-   **Protection des routes** avec `AuthGuard` et vérification serveur
-   **Feedback utilisateur** avec états de chargement et animations
-   **Gestion des rôles** avec permissions différenciées
-   **Déconnexion sécurisée** avec nettoyage des données et du panier

### Pagination et filtrage intelligents

-   **Chargement progressif** des produits avec performance optimisée
-   **Bouton "Afficher Plus"** avec gestion d'états avancée
-   **Filtrage par marque** avec mise à jour en temps réel
-   **Gestion de fin de liste** avec messages informatifs
-   **Intégration complète** entre filtres et pagination
-   **Cache local** pour améliorer les performances

### Validation de formulaires avancée

-   **Validation en temps réel** avec `FormValidator` pour tous les formulaires
-   **Messages d'erreur contextuels** par champ avec feedback visuel
-   **Prévention de soumission invalide** avec désactivation bouton
-   **Feedback visuel immédiat** avec styles CSS dynamiques
-   **Validation des mots de passe** avec critères de sécurité
-   **Vérification de la correspondance** des mots de passe
-   **Validation de code postal** canadien avec formatage automatique
-   **Scroll automatique** vers les champs en erreur avec animation

### Gestion des erreurs robuste

-   **Pages d'erreur personnalisées** avec boutons de retour
-   **Gestion des timeouts** API avec retry automatique
-   **Validation côté client** avant soumission
-   **Messages d'erreur localisés** en français
-   **Notifications toast** pour feedback utilisateur immédiat
-   **Modales de confirmation** pour actions critiques
-   **Logging détaillé** pour le débogage
-   **Fallback gracieux** en cas d'erreur critique

## Optimisations

-   **Code splitting** avec Vite et imports dynamiques
-   **Imports dynamiques** pour les pages avec lazy loading
-   **CSS modulaire** avec partials SCSS
-   **Images optimisées** avec lazy loading et formats modernes
-   **Bundle moderne** ES6+ avec fallbacks
-   **Caching intelligent** avec localStorage pour paniers et sessions
-   **Minification** CSS et JS en production

## Browser Support

-   **Modules ES6** (Chrome 61+, Firefox 60+, Safari 11+)
-   **CSS Grid** et Flexbox pour la mise en page
-   **Web Components** natifs avec polyfills
-   **LocalStorage** pour la persistance des paniers et sessions
-   **Fetch API** pour les requêtes HTTP
-   **CSS Custom Properties** pour les variables

## Extensions Futures

### Intégration backend complète
-   **Gestion des sessions** serveur sécurisée
-   **API REST** complète avec validation avancée

### Fonctionnalités e-commerce avancées
-   **Système de paiement** intégré (Stripe, PayPal)
-   **Gestion des stocks** en temps réel
-   **Historique des commandes** utilisateur
-   **Système de tracking** des livraisons

### Expérience utilisateur avancée

-   **Recherche textuelle** avec indexation full-text
-   **Filtres avancés** (prix, catégorie, popularité)
-   **Système de favoris** avec synchronisation
-   **Recommandations personnalisées** basées sur l'historique
-   **Notifications de stock** et promotions
-   **Système de wishlist** partageable

### Fonctionnalités techniques

-   **Mode sombre/clair** avec préférences utilisateur
-   **PWA** avec service workers et cache offline
-   **Notifications push** pour les nouveaux produits et commandes
-   **Internationalisation** multi-langues (i18n)
-   **Analytics avancées** pour tracking e-commerce
-   **Optimisation SEO** pour améliorer la visibilité

### Qualité et performance

-   **Tests unitaires et E2E** avec Jest/Cypress pour toutes les fonctionnalités
-   **Tests de panier** et processus de commande automatisés
-   **Monitoring des performances** avec analytics e-commerce
-   **Optimisation des images** avec CDN
-   **Lazy loading** avancé pour les ressources

### Administration avancée

-   **Tableau de bord** administrateur avec statistiques de ventes
-   **Gestion des commandes** avec statuts et tracking
-   **Gestion des utilisateurs** avec permissions granulaires
-   **Système de logs** et audit trail pour les transactions
-   **Sauvegarde et restauration** des données

## Déploiement et production

### Optimisations de production

-   **Minification** CSS et JS automatique
-   **Bundle splitting** pour un chargement optimisé avec code splitting du panier
-   **Cache headers** pour les ressources statiques
-   **Compression gzip** pour réduire la taille des fichiers

### Sécurité

-   **Content Security Policy** (CSP)
-   **Validation des entrées** côté client et serveur
-   **Protection CSRF** avec tokens
-   **Chiffrement des données** sensibles
-   **Sécurisation des paniers** avec validation d'utilisateur
-   **Protection des données** de commande avec chiffrement
