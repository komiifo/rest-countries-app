// src/components/FavoriteButton.jsx
import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

/**
 * Composant FavoriteButton
 * Bouton pour ajouter/retirer un pays des favoris
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.country - Objet contenant les données du pays
 * @param {string} props.country.cca3 - Code ISO à 3 lettres du pays
 * @param {Object} props.country.name - Nom du pays
 * @param {string} props.country.name.common - Nom commun du pays
 * @param {string} [props.size="md"] - Taille du bouton ("sm", "md", "lg")
 * @param {boolean} [props.showTooltip=true] - Afficher ou non le tooltip
 */

function FavoriteButton({ country, size = "md", showTooltip = true }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.cca3);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(country);
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonClasses = `
    transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full p-1
    ${
      isCountryFavorite
        ? "text-red-500 hover:text-red-600"
        : "text-gray-400 hover:text-red-500"
    }
  `;

  return (
    <button
      onClick={handleClick}
      className={buttonClasses}
      title={
        showTooltip
          ? isCountryFavorite
            ? "Retirer des favoris"
            : "Ajouter aux favoris"
          : undefined
      }
      aria-label={
        isCountryFavorite
          ? `Retirer ${country.name.common} des favoris`
          : `Ajouter ${country.name.common} aux favoris`
      }
    >
      <Heart
        className={`${sizeClasses[size]} ${
          isCountryFavorite ? "fill-current" : ""
        }`}
      />
    </button>
  );
}

export default FavoriteButton;
