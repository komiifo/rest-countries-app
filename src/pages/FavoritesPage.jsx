// src/pages/FavoritesPage.jsx
import React, { useState } from "react";
import { Heart, Trash2, Star, Filter, X } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";

/**
 * Composant FavoritesPage
 * Page dédiée à l'affichage et la gestion des pays favoris
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onBackToMain - Fonction pour retourner à la page principale
 */

function FavoritesPage({ onBackToMain }) {
  const {
    favorites,
    clearFavorites,
    getFavoritesSortedBy,
    searchFavorites,
    stats,
    isEmpty,
  } = useFavorites();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("addedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [regionFilter, setRegionFilter] = useState("");

  // Application des filtres et du tri
  let displayedFavorites = favorites;

  // Recherche
  if (searchTerm) {
    displayedFavorites = searchFavorites(searchTerm);
  }

  // Filtre par région
  if (regionFilter) {
    displayedFavorites = displayedFavorites.filter(
      (country) => country.region === regionFilter
    );
  }

  // Tri
  displayedFavorites = getFavoritesSortedBy(sortBy, sortOrder);

  const clearAllFilters = () => {
    setSearchTerm("");
    setRegionFilter("");
  };

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-16">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Aucun pays en favori
          </h3>
          <p className="text-gray-600 mb-6">
            Commencez à ajouter des pays à vos favoris en cliquant sur le cœur
            ❤️
          </p>
          <button
            onClick={onBackToMain}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Explorer les pays
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header avec statistiques */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-500 fill-current" />
              Mes Pays Favoris
            </h1>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>{stats.totalCount} pays</span>
              <span>•</span>
              <span>{Object.keys(stats.regions).length} régions</span>
              <span>•</span>
              <span>{stats.totalPopulation.toLocaleString()} habitants</span>
            </div>
          </div>

          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 
                     transition-colors flex items-center"
            title="Vider tous les favoris"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Tout supprimer
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded p-3">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalCount}
            </div>
            <div className="text-sm text-blue-800">Pays favoris</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(stats.regions).length}
            </div>
            <div className="text-sm text-green-800">Régions</div>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <div className="text-2xl font-bold text-purple-600">
              {(stats.averagePopulation / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-purple-800">Pop. moyenne</div>
          </div>
          <div className="bg-orange-50 rounded p-3">
            <div className="text-xl font-bold text-orange-600 truncate">
              {stats.mostPopulousCountry || "N/A"}
            </div>
            <div className="text-sm text-orange-800">Plus peuplé</div>
          </div>
        </div>
      </div>

      {/* Contrôles de filtrage */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="space-y-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrer par région
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes les régions</option>
                {Object.keys(stats.regions).map((region) => (
                  <option key={region} value={region}>
                    {region} ({stats.regions[region]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="addedAt">Date d'ajout</option>
                <option value="name">Nom</option>
                <option value="population">Population</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordre
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="desc">Décroissant</option>
                <option value="asc">Croissant</option>
              </select>
            </div>

            <div className="flex items-end">
              {(searchTerm || regionFilter) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Effacer filtres
                </button>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Affichage de <strong>{displayedFavorites.length}</strong> sur{" "}
            <strong>{stats.totalCount}</strong> favoris
          </div>
        </div>
      </div>

      {/* Liste des favoris */}
      {displayedFavorites.length === 0 ? (
        <div className="text-center py-8">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Aucun favori ne correspond à vos critères de recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedFavorites.map((country) => (
            <div key={country.cca3} className="relative group">
              <CountryCard country={country} />

              {/* Badge de date d'ajout */}
              <div
                className="absolute top-2 left-2 bg-blue-500 text-white text-xs 
                      px-2 py-1 rounded-full opacity-90 shadow-sm z-10"
              >
                {new Date(country.addedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
