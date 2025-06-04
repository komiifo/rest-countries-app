// src/components/CountryCard.jsx
import React from "react";
import { Users, Globe, MapPin } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

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
      <div className="relative">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-48 object-cover"
        />
        {/* 🆕 AJOUT DU BOUTON FAVORI */}
        <div className="absolute top-3 right-3">
          <FavoriteButton country={country} />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            <span>
              <strong>Région:</strong> {country.region}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              <strong>Capitale:</strong> {country.capital?.[0] ?? "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
