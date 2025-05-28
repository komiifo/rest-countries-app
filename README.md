
# 🌍 Pays du Monde

Une application React moderne pour explorer et découvrir tous les pays du monde avec leurs informations détaillées.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)

## 📖 Description

Cette application permet d'explorer les 195+ pays du monde grâce à une interface intuitive et moderne. Elle utilise l'API REST Countries pour récupérer des informations à jour sur chaque pays et offre de nombreuses fonctionnalités de recherche et de filtrage.

## ✨ Fonctionnalités

### 🔍 **Recherche et Filtrage**

* **Recherche textuelle** : Trouvez un pays en tapant son nom
* **Filtrage par région** : Affichez uniquement les pays d'une région spécifique (Afrique, Amériques, Asie, Europe, Océanie)
* **Filtres dynamiques** : Les régions sont automatiquement récupérées depuis l'API

### 📊 **Tri et Organisation**

* **Tri par nom** : Ordre alphabétique (A-Z ou Z-A)
* **Tri par population** : Du plus peuplé au moins peuplé (ou l'inverse)
* **Tri dynamique** : Changement instantané sans rechargement

### 🎛️ **Contrôles Avancés**

* **Limite d'affichage** : Slider pour ajuster le nombre de pays affichés (0-250)
* **Interface responsive** : Adaptation automatique à tous les écrans
* **Chargement optimisé** : Indicateurs de progression et gestion d'erreurs

### 🎴 **Affichage des Données**

* **Drapeaux HD** : Images vectorielles haute qualité
* **Informations essentielles** : Nom, population, région, capitale
* **Format lisible** : Population avec séparateurs de milliers
* **Design moderne** : Cartes avec animations et effets hover

## 🚀 Installation et Lancement

### Prérequis

* **Node.js** version 18+
* **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le projet**

```bash
git clone https://github.com/komiifo/rest-countries-app.git
cd pays-du-monde
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

### Build pour la production

```bash
npm run build
# ou
yarn build
```

## 🏗️ Architecture du Projet

```
src/
├── components/           # Composants réutilisables
│   ├── CountryCard.jsx  # Carte d'affichage d'un pays
│   ├── SearchBar.jsx    # Barre de recherche
│   └── SortFilterBar.jsx # Contrôles de tri et filtrage
├── hooks/               # Hooks personnalisés
│   └── useCountries.js  # Logique métier des pays
├── App.jsx             # Composant principal
└── main.jsx           # Point d'entrée de l'application
```

## 🔧 Technologies Utilisées

### Core

* **React 19.1.0** - Framework UI moderne
* **JavaScript ES6+** - Langage de programmation
* **Vite 6.3.5** - Build tool ultra-rapide

### Styling

* **TailwindCSS 3.4.17** - Framework CSS utility-first
* **PostCSS 8.5.3** - Processeur CSS
* **Autoprefixer** - Préfixes automatiques

### API

* **REST Countries API** - Données des pays du monde
* **Fetch API** - Requêtes HTTP natives

### Development

* **ESLint** - Linter JavaScript
* **React DevTools** - Debugging React

## 📡 API Utilisée

Cette application utilise l'API **REST Countries** gratuite :

* **URL** : `https://restcountries.com/v3.1/all`
* **Documentation** : https://restcountries.com/
* **Données** : Noms, drapeaux, populations, régions, capitales
* **Format** : JSON
* **Limite** : Aucune limite de requête

## 🎨 Design Pattern

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

### Avantages de cette approche :

* ✅ **Séparation des responsabilités** : UI séparée de la logique
* ✅ **Réutilisabilité** : Hook utilisable dans d'autres composants
* ✅ **Maintenabilité** : Code organisé et modulaire
* ✅ **Testabilité** : Logique métier facilement testable

## 📱 Responsive Design

L'application s'adapte à tous les écrans :

* **Mobile** (320px+) : 1 colonne
* **Tablet** (640px+) : 2 colonnes
* **Desktop** (768px+) : 3 colonnes
* **Large Desktop** (1024px+) : 4 colonnes

## 🔄 États de l'Application

### État de Chargement

```javascript
if (loading) return <p>Chargement...</p>;
```

### État d'Erreur

```javascript
if (error) return <p>Erreur : {error}</p>;
```

### État Normal

Affichage de la grille de pays avec tous les contrôles.

## 🎯 Performances

### Optimisations Implémentées

* **Filtrage côté client** : Pas de requête API à chaque recherche
* **Données en cache** : Une seule requête API au chargement
* **Rendu conditionnel** : Affichage uniquement des pays nécessaires
* **Lazy loading** : Chargement progressif des images

### Métriques

* **Bundle size** : ~200KB (gzipped)
* **First Load** : ~1-2 secondes
* **Interaction** : Instantanée (< 100ms)

## 🐛 Gestion d'Erreurs

L'application gère plusieurs types d'erreurs :

* **Erreur réseau** : Problème de connexion à l'API
* **Erreur API** : Réponse invalide de l'API
* **Données manquantes** : Affichage de valeurs par défaut (ex: "N/A")

## 📈 Améliorations Futures

### Fonctionnalités Prévues

* 🌍 **Vue carte** : Affichage des pays sur une carte interactive
* 📊 **Graphiques** : Visualisation des données démographiques
* 🔗 **Détails pays** : Page dédiée avec plus d'informations
* 🌙 **Mode sombre** : Thème alternatif
* 🔍 **Recherche avancée** : Filtres par population, superficie, etc.
* 📱 **PWA** : Application installable
* 🌐 **i18n** : Support multilingue

### Optimisations Techniques

* **React Query** : Cache et synchronisation des données
* **Virtual Scrolling** : Performance pour de grandes listes
* **Service Worker** : Cache offline
* **Bundle Splitting** : Chargement par chunks

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité
3. **Commit** vos changements
4. **Push** vers la branche
5. **Ouvrir** une Pull Request

### Standards de Code

* Utilisez **ESLint** pour le linting
* Commentez les fonctions complexes
* Suivez la convention de nommage **camelCase**
* Testez vos modifications

## 📄 Licence

Ce projet est sous licence  **MIT** . Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

* GitHub: [@komiifo](https://github.com/komiifo)
* Email: nathan440@live.fr

## 🙏 Remerciements

* [REST Countries API](https://restcountries.com/) pour les données
* [React Team](https://react.dev/) pour le framework
* [Tailwind Labs](https://tailwindcss.com/) pour le CSS framework
* [Vite Team](https://vitejs.dev/) pour le build tool

---

⭐ **N'hésitez pas à star le projet si vous l'aimez !**
