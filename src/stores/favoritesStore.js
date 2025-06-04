// src/stores/favoritesStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store Zustand pour la gestion des pays favoris
 * Utilise le middleware persist pour sauvegarder dans localStorage
 *
 * @typedef {Object} FavoritesStore
 * @property {Array} favorites - Liste des pays favoris
 * @property {Function} addFavorite - Ajouter un pays aux favoris
 * @property {Function} removeFavorite - Retirer un pays des favoris
 * @property {Function} isFavorite - Vérifier si un pays est en favori
 * @property {Function} clearFavorites - Vider tous les favoris
 * @property {Function} getFavoriteCount - Obtenir le nombre de favoris
 * @property {Function} getFavoritesByRegion - Obtenir les favoris d'une région
 */

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // État
      favorites: [],

      // Actions
      addFavorite: (country) => {
        const { favorites } = get();
        const countryWithDate = { ...country, addedAt: Date.now() };
        set({ favorites: [...favorites, countryWithDate] });
      },

      removeFavorite: (countryCode) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter(
            (country) => country.cca3 !== countryCode
          ),
        });
      },

      isFavorite: (countryCode) => {
        const { favorites } = get();
        return favorites.some((country) => country.cca3 === countryCode);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },

      // Getters utiles
      getFavoriteCount: () => {
        const { favorites } = get();
        return favorites.length;
      },

      getFavoritesByRegion: (region) => {
        const { favorites } = get();
        return favorites.filter((country) => country.region === region);
      },
    }),
    {
      name: "countries-favorites", // nom pour localStorage
      // Optionnel: ne persister que certaines propriétés
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

export default useFavoritesStore;
