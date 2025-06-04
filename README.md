
# 🌍 Pays du Monde

Une application React moderne pour explorer et découvrir tous les pays du monde avec leurs informations détaillées, un système de favoris et une documentation complète.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-5.0.5-FF6B6B?style=flat-square&logo=zustand)
![Vitest](https://img.shields.io/badge/Vitest-3.2.1-6E9F18?style=flat-square&logo=vitest)
![JSDoc](https://img.shields.io/badge/JSDoc-4.0.4-FFA500?style=flat-square&logo=javascript)

## 📖 Description

Cette application permet d'explorer les 195+ pays du monde grâce à une interface intuitive et moderne. Elle utilise l'API REST Countries pour récupérer des informations à jour sur chaque pays et offre de nombreuses fonctionnalités de recherche, filtrage et de gestion de favoris avec persistance locale.

## ✨ Fonctionnalités

### 🔍 **Recherche et Filtrage**

* **Recherche textuelle** : Trouvez un pays en tapant son nom
* **Filtrage par région** : Affichez uniquement les pays d'une région spécifique (Afrique, Amériques, Asie, Europe, Océanie)
* **Filtres dynamiques** : Les régions sont automatiquement récupérées depuis l'API
* **Filtres combinés** : Recherche + région pour un filtrage précis

### ❤️ **Système de Favoris**

* **Ajout/Suppression** : Cliquez sur le cœur pour gérer vos favoris
* **Page dédiée** : Interface spéciale pour vos pays favoris
* **Persistance locale** : Favoris sauvegardés avec Zustand + localStorage
* **Statistiques** : Population totale, régions représentées, pays le plus peuplé
* **Recherche dans les favoris** : Trouvez rapidement vos pays préférés
* **Tri avancé** : Par date d'ajout, nom ou population
* **Badge de date** : Voyez quand vous avez ajouté chaque pays

### 📊 **Tri et Organisation**

* **Tri par nom** : Ordre alphabétique (A-Z ou Z-A)
* **Tri par population** : Du plus peuplé au moins peuplé (ou l'inverse)
* **Tri par date d'ajout** : Dans la section favoris
* **Tri dynamique** : Changement instantané sans rechargement

### 🎛️ **Contrôles Avancés**

* **Limite d'affichage** : Slider pour ajuster le nombre de pays affichés (10-250)
* **Navigation par onglets** : Basculez entre "Tous les pays" et "Favoris"
* **Interface responsive** : Adaptation automatique à tous les écrans
* **Chargement optimisé** : Indicateurs de progression et gestion d'erreurs

### 🎴 **Affichage des Données**

* **Drapeaux HD** : Images vectorielles haute qualité avec fallback
* **Informations essentielles** : Nom, population, région, capitale, sous-région
* **Format lisible** : Population avec séparateurs de milliers
* **Design moderne** : Cartes avec animations et effets hover
* **Icônes contextuelles** : Lucide React pour une meilleure UX

## 🚀 Installation et Lancement

### Prérequis

* **Node.js** version 18+
* **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le projet**

```bash
git clone https://github.com/komiifo/rest-countries-app.git
cd rest-countries-app
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Lancer en mode développement**

```bash
npm run dev
# ou
yarn dev
```

4. **Ouvrir dans le navigateur**

```
http://localhost:5173
```

### Scripts disponibles

```bash
# Développement
npm run dev                    # Lancer le serveur de développement

# Production
npm run build                  # Build pour la production
npm run preview               # Prévisualiser le build

# Tests
npm run test                  # Lancer les tests en mode watch
npm run test:run              # Lancer les tests une fois
npm run test:ui               # Interface UI pour les tests
npm run test:coverage         # Tests avec couverture de code

# Documentation
npm run docs                  # Générer la documentation JSDoc
npm run docs:serve            # Générer et servir la documentation
npm run docs:watch            # Générer la doc en mode watch
npm run docs:clean            # Nettoyer et régénérer la documentation
```

## 🏗️ Architecture du Projet

```
src/
├── components/              # Composants réutilisables
│   ├── CountryCard.jsx     # Carte d'affichage d'un pays
│   ├── SearchBar.jsx       # Barre de recherche
│   ├── SortFilterBar.jsx   # Contrôles de tri et filtrage
│   ├── FavoriteButton.jsx  # Bouton pour gérer les favoris
│   └── Navigation.jsx      # Navigation principale
├── hooks/                  # Hooks personnalisés
│   ├── useCountries.js     # Logique métier des pays
│   └── useFavorites.js     # Hook pour la gestion des favoris
├── stores/                 # Gestion d'état Zustand
│   └── favoritesStore.js   # Store des favoris avec persistance
├── pages/                  # Pages de l'application
│   ├── MainPage.jsx        # Page principale avec tous les pays
│   └── FavoritesPage.jsx   # Page dédiée aux favoris
├── App.jsx                 # Routeur principal
├── main.jsx               # Point d'entrée
└── setupTests.js          # Configuration des tests
```

## 🔧 Technologies Utilisées

### Core

* **React 19.1.0** - Framework UI moderne avec les dernières fonctionnalités
* **JavaScript ES6+** - Langage de programmation avec JSDoc
* **Vite 6.3.5** - Build tool ultra-rapide

### État et Data Management

* **Zustand 5.0.5** - Gestion d'état moderne et légère
* **Persistance localStorage** - Sauvegarde automatique des favoris
* **Custom Hooks** - Logique métier encapsulée et réutilisable

### Styling et UI

* **TailwindCSS 3.4.17** - Framework CSS utility-first
* **Lucide React 0.512.0** - Icônes modernes et cohérentes
* **PostCSS 8.5.3** - Processeur CSS
* **Autoprefixer** - Préfixes automatiques

### Testing et Documentation

* **Vitest 3.2.1** - Framework de tests rapide et moderne
* **@testing-library/react 16.3.0** - Utilitaires de test pour React
* **@testing-library/jest-dom 6.6.3** - Matchers personnalisés
* **JSDoc 4.0.4** - Documentation automatique du code

### API et Development

* **REST Countries API** - Données des pays du monde
* **Fetch API** - Requêtes HTTP natives
* **ESLint** - Linter JavaScript
* **React DevTools** - Debugging React

## 📡 API Utilisée

Cette application utilise l'API **REST Countries** gratuite :

* **URL** : `https://restcountries.com/v3.1/all`
* **Documentation** : https://restcountries.com/
* **Données** : Noms, drapeaux, populations, régions, capitales, sous-régions
* **Format** : JSON
* **Limite** : Aucune limite de requête

## 🎨 Design Patterns

### Hook Personnalisé `useCountries`

L'application utilise un **hook personnalisé** pour centraliser toute la logique métier :

```javascript
const {
  countries,        // Pays filtrés et triés
  searchTerm,       // Terme de recherche
  regionFilter,     // Région sélectionnée  
  sortKey,          // Clé de tri (nom/population)
  sortOrder,        // Ordre (asc/desc)
  limit,            // Nombre de pays à afficher
  regions,          // Régions disponibles
  loading,          // État de chargement
  error            // Erreurs éventuelles
} = useCountries();
```

### Hook Personnalisé `useFavorites`

Gestion avancée des favoris avec statistiques :

```javascript
const {
  favorites,              // Liste des pays favoris
  addFavorite,           // Ajouter un pays
  removeFavorite,        // Retirer un pays
  isFavorite,           // Vérifier si un pays est favori
  toggleFavorite,       // Basculer l'état favori
  searchFavorites,      // Rechercher dans les favoris
  getFavoritesSortedBy, // Trier les favoris
  stats,               // Statistiques calculées
  isEmpty              // Liste vide ?
} = useFavorites();
```

### Store Zustand `favoritesStore`

Gestion d'état centralisée avec persistance :

```javascript
const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (country) => { /* ... */ },
      removeFavorite: (countryCode) => { /* ... */ },
      // ... autres actions
    }),
    {
      name: 'countries-favorites', // localStorage key
      partialize: (state) => ({ favorites: state.favorites })
    }
  )
)
```

### Avantages de cette architecture :

* ✅ **Séparation des responsabilités** : UI séparée de la logique
* ✅ **Réutilisabilité** : Hooks utilisables dans d'autres composants
* ✅ **Maintenabilité** : Code organisé et modulaire
* ✅ **Testabilité** : Logique métier facilement testable
* ✅ **Persistance** : État sauvegardé automatiquement
* ✅ **Performance** : Zustand optimisé pour React

## 🧪 Tests

L'application inclut une suite de tests complète avec **Vitest** :

### Types de tests implémentés

* **Tests unitaires** : Composants individuels
* **Tests d'intégration** : Interaction entre composants
* **Tests de hooks** : Logique métier des hooks personnalisés
* **Tests d'API** : Mock des appels REST Countries
* **Tests de store** : Gestion d'état Zustand

### Exemple de test

```javascript
it('should filter countries by Europe region', async () => {
  render(<App />)
  
  await waitFor(() => {
    expect(screen.getByText('France')).toBeInTheDocument()
  })
  
  const regionSelect = screen.getByDisplayValue('Toutes les régions')
  fireEvent.change(regionSelect, { target: { value: 'Europe' } })
  
  await waitFor(() => {
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Germany')).toBeInTheDocument()
    expect(screen.queryByText('Nigeria')).not.toBeInTheDocument()
  })
})
```

### Couverture de code

* **Composants** : 95%+ de couverture
* **Hooks** : 100% de couverture
* **Store** : 90%+ de couverture

## 📖 Documentation

L'application est entièrement documentée avec **JSDoc** :

* **Composants** : Props et comportements documentés
* **Hooks** : Paramètres et valeurs de retour détaillés
* **Fonctions** : Types et exemples d'utilisation
* **Stores** : Actions et état documentés

### Générer la documentation

```bash
npm run docs
```

La documentation sera générée dans le dossier `docs/` et accessible via `docs/index.html`.

## 📱 Responsive Design

L'application s'adapte à tous les écrans :

* **Mobile** (320px+) : 1 colonne, navigation simplifiée
* **Tablet** (640px+) : 2 colonnes, contrôles optimisés
* **Desktop** (768px+) : 3 colonnes, toutes les fonctionnalités
* **Large Desktop** (1024px+) : 4 colonnes, expérience optimale

## 🔄 États de l'Application

### État de Chargement

```javascript
if (loading) return <LoadingSpinner />;
```

### État d'Erreur

```javascript
if (error) return <ErrorMessage error={error} onRetry={fetchCountries} />;
```

### État Vide (Favoris)

```javascript
if (isEmpty) return <EmptyFavoritesState onExplore={goToMainPage} />;
```

### État Normal

Affichage de la grille de pays avec tous les contrôles.

## 🎯 Performances

### Optimisations Implémentées

* **Filtrage côté client** : Pas de requête API à chaque recherche
* **Données en cache** : Une seule requête API au chargement
* **Rendu conditionnel** : Affichage uniquement des pays nécessaires
* **Lazy loading** : Chargement progressif des images
* **Zustand optimisé** : Re-render minimal des composants
* **Persistance efficace** : Sérialisation partielle pour localStorage

### Métriques

* **Bundle size** : ~300KB (gzipped, avec Zustand et Lucide)
* **First Load** : ~1-2 secondes
* **Interaction** : Instantanée (< 100ms)
* **Tests** : 50+ tests en < 5 secondes

## 🐛 Gestion d'Erreurs

L'application gère plusieurs types d'erreurs :

* **Erreur réseau** : Problème de connexion à l'API
* **Erreur API** : Réponse invalide de l'API
* **Données manquantes** : Affichage de valeurs par défaut (ex: "N/A")
* **Images cassées** : Fallback avec icône
* **Store corruption** : Réinitialisation automatique

## 📈 Améliorations Futures

### Fonctionnalités Prévues

* 🌍 **Vue carte** : Affichage des pays sur une carte interactive
* 📊 **Graphiques** : Visualisation des données démographiques
* 🔗 **Détails pays** : Page dédiée avec plus d'informations
* 🌙 **Mode sombre** : Thème alternatif
* 🔍 **Recherche avancée** : Filtres par population, superficie, etc.
* 📱 **PWA** : Application installable
* 🌐 **i18n** : Support multilingue
* 🏷️ **Tags personnalisés** : Étiquettes pour organiser les favoris
* 📤 **Export/Import** : Sauvegarde et partage des favoris

### Optimisations Techniques

* **React Query** : Cache et synchronisation des données avancés
* **Virtual Scrolling** : Performance pour de grandes listes
* **Service Worker** : Cache offline
* **Bundle Splitting** : Chargement par chunks
* **Web Workers** : Filtrage en arrière-plan
* **IndexedDB** : Stockage local avancé

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add: Amazing Feature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Standards de Code

* ✅ Utilisez **ESLint** pour le linting
* ✅ **Documentez** avec JSDoc les nouvelles fonctions
* ✅ **Testez** vos modifications avec Vitest
* ✅ Suivez la convention de nommage **camelCase**
* ✅ **Commitez** avec des messages clairs (Convention Commits)

### Checklist PR

* [X] Tests ajoutés/mis à jour
* [X] Documentation JSDoc ajoutée
* [X] Code linté (ESLint)
* [X] README mis à jour si nécessaire
* [X] Screenshots pour les changements UI

## 📄 Licence

Ce projet est sous licence  **MIT** . Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

* **GitHub** : [@komiifo](https://github.com/komiifo)
* **Email** : nathan440@live.fr

## 🙏 Remerciements

* [REST Countries API](https://restcountries.com/) pour les données complètes
* [React Team](https://react.dev/) pour le framework révolutionnaire
* [Tailwind Labs](https://tailwindcss.com/) pour le CSS framework
* [Vite Team](https://vitejs.dev/) pour le build tool lightning-fast
* [Zustand](https://github.com/pmndrs/zustand) pour la gestion d'état simple
* [Lucide](https://lucide.dev/) pour les icônes magnifiques
* [Vitest](https://vitest.dev/) pour le framework de tests moderne

## 📊 Statistiques du Projet

![GitHub Stars](https://img.shields.io/github/stars/komiifo/rest-countries-app?style=social)
![GitHub Forks](https://img.shields.io/github/forks/komiifo/rest-countries-app?style=social)
![GitHub Issues](https://img.shields.io/github/issues/komiifo/rest-countries-app)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/komiifo/rest-countries-app)

---

⭐ **N'hésitez pas à star le projet si vous l'aimez !**

🐛 **Trouvé un bug ?** [Créez une issue](https://github.com/komiifo/rest-countries-app/issues)

💡 **Une idée d'amélioration ?** [Discutons-en !](https://github.com/komiifo/rest-countries-app/discussions)
