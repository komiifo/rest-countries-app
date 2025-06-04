// src/components/SortFilterBar.jsx
import React from "react";

/**
 * Composant SortFilterBar
 * Fournit tous les contrôles pour filtrer, trier et limiter l'affichage des pays
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.region - Région actuellement sélectionnée pour le filtrage
 * @param {Function} props.onRegionChange - Fonction appelée quand l'utilisateur change de région
 * @param {string} props.sortKey - Clé de tri actuelle ("name" ou "population")
 * @param {Function} props.onSortKeyChange - Fonction appelée quand l'utilisateur change la clé de tri
 * @param {string} props.sortOrder - Ordre de tri actuel ("asc" ou "desc")
 * @param {Function} props.onSortOrderChange - Fonction appelée quand l'utilisateur change l'ordre de tri
 * @param {number} props.limit - Nombre maximum de pays à afficher
 * @param {Function} props.onLimitChange - Fonction appelée quand l'utilisateur change la limite
 * @param {string[]} props.regions - Tableau des régions disponibles (récupérées de l'API)
 */

function SortFilterBar({
  region,
  onRegionChange,
  sortKey,
  onSortKeyChange,
  sortOrder,
  onSortOrderChange,
  limit,
  onLimitChange,
  regions,
}) {
  return (
    // Conteneur principal avec layout flexible et responsive
    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
      {/* === SÉLECTEUR DE RÉGION === */}
      <select
        className="p-2 border rounded-md"
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="">Toutes les régions</option>

        {/* Génération dynamique des options à partir des régions de l'API */}
        {regions.map((regionName) => (
          <option key={regionName} value={regionName}>
            {regionName}
          </option>
        ))}
      </select>

      {/* === SÉLECTEUR DE CLÉ DE TRI === */}
      <select
        className="p-2 border rounded-md"
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value)}
      >
        <option value="name">Nom</option>
        <option value="population">Population</option>
      </select>

      {/* === SÉLECTEUR D'ORDRE DE TRI === */}
      <select
        className="p-2 border rounded-md"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
      >
        <option value="asc">Croissant</option>
        <option value="desc">Décroissant</option>
      </select>

      {/* === CONTRÔLE DE LIMITE D'AFFICHAGE === */}
      <div className="flex flex-col">
        <label htmlFor="limitRange" className="text-sm font-medium">
          Nombre de pays: {limit}
        </label>

        {/* Slider pour ajuster le nombre de pays affichés */}
        <input
          id="limitRange"
          type="range"
          min="0"
          max="250"
          step="1"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="w-40"
        />
      </div>
    </div>
  );
}

export default SortFilterBar;
