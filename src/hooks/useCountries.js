// useCountries.js - Hook personnalisé pour gérer la logique des pays
import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer la logique des pays
 * Récupère les données des pays depuis l'API REST Countries,
 * gère la recherche, le filtrage, le tri et la pagination
 *
 * @returns {Object} - Objet contenant l'état et les actions pour la gestion des pays
 *
 * @returns {Array} returns.countries - Liste des pays filtrés, triés et limités à afficher
 * @returns {Array} returns.regions - Liste des régions géographiques uniques disponibles
 *
 * @returns {string} returns.searchTerm - Terme de recherche actuel saisi par l'utilisateur
 * @returns {Function} returns.setSearchTerm - Fonction pour mettre à jour le terme de recherche
 * @returns {string} returns.regionFilter - Région actuellement sélectionnée pour le filtrage
 * @returns {Function} returns.setRegionFilter - Fonction pour mettre à jour le filtre de région
 *
 * @returns {string} returns.sortKey - Clé de tri actuelle ("name" ou "population")
 * @returns {Function} returns.setSortKey - Fonction pour changer la clé de tri
 * @returns {string} returns.sortOrder - Ordre de tri actuel ("asc" ou "desc")
 * @returns {Function} returns.setSortOrder - Fonction pour changer l'ordre de tri
 *
 * @returns {number} returns.limit - Nombre maximum de pays à afficher (pagination)
 * @returns {Function} returns.setLimit - Fonction pour modifier la limite d'affichage
 *
 * @returns {boolean} returns.loading - État de chargement des données depuis l'API
 * @returns {string|null} returns.error - Message d'erreur en cas de problème, null sinon
 */

function useCountries() {
  // États pour stocker les pays et les régions
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [regions, setRegions] = useState([]);

  // États pour la recherche et le filtrage
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // États pour le tri
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination - Limite du nombre de pays affichés
  const [limit, setLimit] = useState(40);

  // États pour le chargement et les erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effet pour récupérer les pays depuis l'API REST Countries
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://restcountries.com/v3.1/all");

        if (!res.ok)
          throw new Error("Erreur lors de la récupération des pays.");

        const data = await res.json();

        setAllCountries(data);

        const uniqueRegions = [
          ...new Set(data.map((country) => country.region).filter(Boolean)),
        ];

        setRegions(uniqueRegions.sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Effet pour filtrer, trier et limiter les pays affichés
  useEffect(() => {
    let filtered = [...allCountries];

    //Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par région
    if (regionFilter) {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    // Tri des pays
    filtered.sort((a, b) => {
      const valueA = sortKey === "name" ? a.name.common : a.population;
      const valueB = sortKey === "name" ? b.name.common : b.population;

      // Application de l'ordre de tri
      return sortOrder === "asc"
        ? valueA > valueB
          ? 1
          : -1
        : valueA < valueB
        ? 1
        : -1;
    });

    // Limitation du nombre de pays affichés
    setCountries(filtered.slice(0, limit));
  }, [searchTerm, regionFilter, sortKey, sortOrder, limit, allCountries]);

  // Retourne l'état et les fonctions pour gérer les pays
  return {
    countries,
    regions,

    // États des filtres et recherche
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,

    // États du tri
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,

    // État de la pagination
    limit,
    setLimit,

    // États de l'application
    loading,
    error,
  };
}

export default useCountries;
