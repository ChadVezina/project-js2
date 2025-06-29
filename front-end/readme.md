# CubeShop Frontend

Interface utilisateur moderne pour CubeShop - une application de commerce électronique spécialisée dans les cubes de Rubik et puzzles.

## Technologies

- **Vite** - Build tool moderne et rapide
- **Vanilla JavaScript (ES6+)** - JavaScript moderne sans framework
- **SCSS** - Préprocesseur CSS avec variables et mixins
- **HTML5** - Structure sémantique
- **Web Components** - Composants réutilisables natifs

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
│   │       └── partials/      # Modules SCSS
│   ├── classes/               # Classes JavaScript principales
│   │   ├── CubeShopApp.js    # Application principale
│   │   ├── ProductGrid.js    # Grille de produits
│   │   ├── FilterManager.js  # Gestion des filtres
│   │   ├── FormManager.js    # Gestion des formulaires
│   │   ├── AuthManager.js    # Authentification
│   │   └── ...
│   ├── components/           # Web Components réutilisables
│   │   ├── header.js        # En-tête de navigation
│   │   └── footer.js        # Pied de page
│   ├── pages/               # Pages de l'application
│   │   ├── form/           # Page d'ajout de produit
│   │   ├── produit/        # Page détail produit
│   │   └── auth/           # Page d'authentification
│   └── utils/              # Utilitaires
│       ├── products-manager.js  # Gestion des produits
│       ├── page-initializer.js  # Initialisation des pages
│       └── event-emitter.js     # Système d'événements
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
- **Grille de produits** responsive avec pagination
- **Filtrage par marque** avec dropdown interactif
- **Bouton "Afficher Plus"** pour charger plus de produits
- **Navigation** vers les détails des produits

### Page de détail produit (`/pages/produit/produit.html`)
- **Affichage détaillé** du produit sélectionné
- **Image, nom, marque, prix et description**
- **Gestion des produits non trouvés**

### Page d'ajout de produit (`/pages/form/form.html`)
- **Formulaire complet** avec validation en temps réel
- **Validation côté client** avec messages d'erreur
- **Simulation backend** pour la soumission
- **Messages de succès et d'erreur**

### Page d'authentification (`/pages/auth/auth.html`)
- **Onglets connexion/inscription**
- **Validation des formulaires** en temps réel
- **Gestion des erreurs** de validation
- **Interface utilisateur moderne**

## Système de Styles

### Variables CSS personnalisées
```scss
// Palette inspirée du rubik cube
--primary: #ff6b35;    // Orange
--secondary: #1e88e5;  // Bleu
--accent: #43a047;     // Vert
--danger: #e53935;     // Rouge
--warning: #ffb300;    // Jaune
```

### Architecture SCSS modulaire
- **`_reset.scss`** - Reset CSS
- **`_variables.scss`** - Variables et couleurs
- **`_base.scss`** - Styles de base
- **`_classes.scss`** - Classes utilitaires
- **`_utils.scss`** - Utilitaires de spacing
- **`_media-queries.scss`** - Mixins responsive

### Design System
- **Responsive design** avec breakpoints mobiles
- **Système de grille** flexible
- **Composants réutilisables** (boutons, cartes, formulaires)
- **Animations et transitions** fluides
- **Thème cohérent** inspiré des cubes de Rubik

## Classes Principales

### [`CubeShopApp`](src/classes/CubeShopApp.js)
Application principale qui coordonne tous les composants :
- Initialisation des gestionnaires
- Coordination des filtres et pagination
- Gestion de l'état global

### [`ProductsManager`](src/utils/products-manager.js)
Gestion des données produits avec localStorage :
- CRUD complet sur les produits
- Persistance locale des données
- Gestion des IDs uniques

### [`FormManager`](src/classes/FormManager.js)
Gestion avancée des formulaires :
- Validation en temps réel
- Gestion des erreurs
- Soumission avec simulation backend

### [`FilterManager`](src/classes/FilterManager.js)
Système de filtrage interactif :
- Filtrage par marque
- Interface dropdown moderne
- Émission d'événements pour coordination

## Web Components

### [`app-header`](src/components/header.js)
En-tête de navigation réutilisable :
- Navigation responsive
- Indication de la page active
- Liens vers toutes les sections

### [`app-footer`](src/components/footer.js)
Pied de page simple et élégant

## Gestion des Événements

Système d'événements basé sur [`EventEmitter`](src/utils/event-emitter.js) pour la communication entre composants :

```javascript
// Exemple d'utilisation
filterManager.on('filterChange', (data) => {
    productGrid.applyFilter(data.brand);
});
```

## Gestion d'État

- **localStorage** pour la persistance des produits
- **Classes ES6** pour l'état local des composants
- **EventEmitter** pour la communication inter-composants
- **URL parameters** pour l'état de navigation

## Responsive Design

Design adaptatif avec breakpoints :
- **Mobile-first** approach
- **Grille CSS Grid** flexible
- **Navigation adaptive**
- **Images optimisées**

## Fonctionnalités Avancées

### Pagination intelligente
- Chargement progressif des produits
- Bouton "Afficher Plus" avec état de chargement
- Gestion de fin de liste

### Validation de formulaires
- Validation en temps réel
- Messages d'erreur contextuels
- Prévention de soumission invalide
- Feedback visuel immédiat

### Simulation Backend
Classe [`BackendSimulator`](src/classes/BackendSimulator.js) pour simuler :
- Latence réseau réaliste
- Validation d'images
- Réponses d'erreur et de succès
- Gestion d'états de chargement

## Optimisations

- **Code splitting** avec Vite
- **Imports dynamiques** pour les pages
- **CSS modulaire** avec partials SCSS
- **Images optimisées** avec lazy loading
- **Bundle moderne** ES6+ avec fallbacks

## Browser Support

- **Modules ES6** (Chrome 61+, Firefox 60+, Safari 11+)
- **CSS Grid** et Flexbox
- **Web Components** natifs
- **LocalStorage** pour la persistance

## Extensions Futures

- Intégration avec l'API backend réelle
- Système de panier d'achat
- Authentification JWT
- Recherche textuelle avancée
- Mode sombre/clair
- PWA avec service workers
- Tests unitaires et E2E