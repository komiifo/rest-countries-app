// src/hooks/useFavorites.js
import { useMemo } from "react";
import useFavoritesStore from "../stores/favoritesStore";

/**
 * Hook personnalisé pour gérer les favoris avec des utilitaires supplémentaires
 *
 * @returns {Object} - Objet contenant l'état et les actions pour les favoris
 * @returns {Array} returns.favorites - Liste des pays favoris
 * @returns {Function} returns.addFavorite - Ajouter un pays aux favoris
 * @returns {Function} returns.removeFavorite - Retirer un pays des favoris
 * @returns {Function} returns.isFavorite - Vérifier si un pays est en favori
 * @returns {Function} returns.clearFavorites - Vider tous les favoris
 * @returns {Function} returns.toggleFavorite - Basculer l'état favori d'un pays
 * @returns {Function} returns.getFavoriteCount - Obtenir le nombre de favoris
 * @returns {Function} returns.getFavoritesByRegion - Obtenir les favoris d'une région
 * @returns {Function} returns.getFavoritesSortedBy - Obtenir les favoris triés
 * @returns {Function} returns.searchFavorites - Rechercher dans les favoris
 * @returns {Object} returns.stats - Statistiques calculées des favoris
 * @returns {boolean} returns.isEmpty - Indique si la liste des favoris est vide
 * @returns {Function} returns.hasRegion - Vérifier si une région a des favoris
 */

export function useFavorites() {
  const {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    getFavoriteCount,
    getFavoritesByRegion,
  } = useFavoritesStore();

  // Statistiques calculées
  const stats = useMemo(() => {
    const regions = favorites.reduce((acc, country) => {
      acc[country.region] = (acc[country.region] || 0) + 1;
      return acc;
    }, {});

    const totalPopulation = favorites.reduce((sum, country) => {
      return sum + (country.population || 0);
    }, 0);

    const mostPopulousCountry = favorites.reduce((max, country) => {
      return (country.population || 0) > (max.population || 0) ? country : max;
    }, {});

    return {
      totalCount: favorites.length,
      regions,
      totalPopulation,
      mostPopulousCountry: mostPopulousCountry.name?.common || null,
      averagePopulation:
        favorites.length > 0
          ? Math.round(totalPopulation / favorites.length)
          : 0,
    };
  }, [favorites]);

  // Fonctions utilitaires
  const toggleFavorite = (country) => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  const getFavoritesSortedBy = (sortKey = "addedAt", order = "desc") => {
    return [...favorites].sort((a, b) => {
      let valueA, valueB;

      switch (sortKey) {
        case "name":
          valueA = a.name?.common || "";
          valueB = b.name?.common || "";
          break;
        case "population":
          valueA = a.population || 0;
          valueB = b.population || 0;
          break;
        case "addedAt":
        default:
          valueA = a.addedAt || 0;
          valueB = b.addedAt || 0;
          break;
      }

      if (order === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  const searchFavorites = (searchTerm) => {
    if (!searchTerm) return favorites;

    return favorites.filter(
      (country) =>
        country.name?.common
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        country.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    // État
    favorites,

    // Actions de base
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    toggleFavorite,

    // Getters
    getFavoriteCount,
    getFavoritesByRegion,
    getFavoritesSortedBy,
    searchFavorites,

    // Statistiques
    stats,

    // Utilitaires
    isEmpty: favorites.length === 0,
    hasRegion: (region) =>
      favorites.some((country) => country.region === region),
  };
}

export default useFavorites;
