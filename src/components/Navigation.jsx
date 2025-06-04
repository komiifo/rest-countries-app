// src/components/Navigation.jsx
import React from "react";
import { Globe, Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

/**
 * Composant Navigation
 * Barre de navigation principale avec onglets
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.currentPage - Page actuellement active ("main", "favorites", "stats")
 * @param {Function} props.onPageChange - Fonction appelée lors du changement de page
 */

function Navigation({ currentPage, onPageChange }) {
  const { getFavoriteCount } = useFavorites();
  const favoritesCount = getFavoriteCount();

  return (
    <div className="bg-white shadow-sm border-b mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-8">
          <button
            onClick={() => onPageChange("main")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              currentPage === "main"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Globe className="w-4 h-4 inline mr-2" />
            Tous les pays
          </button>

          <button
            onClick={() => onPageChange("favorites")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
              currentPage === "favorites"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Favoris
            {favoritesCount > 0 && (
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">
                {favoritesCount} pays
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
