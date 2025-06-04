// src/components/SearchBar.jsx
import React from "react";

/**
 * Composant SearchBar
 * Fournit un champ de saisie pour permettre à l'utilisateur de rechercher des pays par nom
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.value - Valeur actuelle du champ de recherche (terme saisi)
 * @param {Function} props.onChange - Fonction appelée quand l'utilisateur tape dans le champ
 */

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      {/* Champ de saisie principal */}
      <input
        type="text"
        placeholder="Rechercher un pays..."
        className="
          w-full                       // Largeur : 100% du conteneur parent
          p-2                          // Padding : espacement interne de 8px
          border border-gray-300       // Bordure : 1px grise
          rounded-md                   // Coins arrondis moyens
          shadow-sm                    // Ombre légère
          focus:outline-none           // Supprime le contour par défaut au focus
          focus:ring                   // Ajoute un anneau coloré au focus
          focus:border-blue-300        // Change la couleur de bordure au focus
        "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
