// src/components/CountryCard.jsx
import React from "react";

/**
 * Composant CountryCard
 * Affiche les informations principales d'un pays dans une carte attractive
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.country - Objet contenant toutes les données du pays
 * @param {Object} props.country.flags - Objet contenant les URLs des drapeaux
 * @param {string} props.country.flags.svg - URL du drapeau au format SVG
 * @param {Object} props.country.name - Objet contenant les noms du pays
 * @param {string} props.country.name.common - Nom commun du pays
 * @param {number} props.country.population - Population du pays
 * @param {string} props.country.region - Région géographique du pays
 * @param {string[]} props.country.capital - Tableau des capitales du pays
 */

function CountryCard({ country }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
      {/* Image du drapeau du pays */}
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Nom du pays en titre principal */}
        <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
        <p>
          {/* Population avec formatage des nombres (séparateurs de milliers) */}
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          {/* Région géographique */}
          <strong>Région:</strong> {country.region}
        </p>
        <p>
          {/* Capitale avec gestion des cas où il n'y en a pas */}
          <strong>Capitale:</strong> {country.capital?.[0] ?? "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
