// useCountries.js - Hook personnalisé pour gérer la logique des pays
import { useState, useEffect } from "react";

function useCountries() {
  // === ÉTATS LOCAUX ===
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [regions, setRegions] = useState([]);

  // === FILTRES ET RECHERCHE ===
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  // === PARAMÈTRES DE TRI ===
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // === PAGINATION ===
  const [limit, setLimit] = useState(40);

  // === ÉTATS DE L'APPLICATION ===
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === EFFET POUR RÉCUPÉRER LES DONNÉES ===
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

  // === EFFET POUR FILTRER, TRIER ET LIMITER LES PAYS ===
  useEffect(() => {
    let filtered = [...allCountries];

    // === FILTRAGE PAR TERME DE RECHERCHE ===
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // === FILTRAGE PAR RÉGION ===
    if (regionFilter) {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    // === TRI DES RÉSULTATS ===
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

    // === LIMITATION DU NOMBRE DE RÉSULTATS ===
    setCountries(filtered.slice(0, limit));
  }, [searchTerm, regionFilter, sortKey, sortOrder, limit, allCountries]);

  // === RETOUR DE L'API DU HOOK ===
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
