// src/pages/MainPage.jsx
import React from "react";
import useCountries from "../hooks/useCountries";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import SortFilterBar from "../components/SortFilterBar";

/**
 * Composant MainPage
 * Page principale affichant tous les pays avec filtres et recherche
 *
 * @param {Object} props - Les propriétés du composant (aucune prop requise actuellement)
 */

function MainPage() {
  const {
    countries, // Liste des pays filtrés et triés à afficher
    searchTerm, // Terme de recherche saisi par l'utilisateur
    setSearchTerm, // Fonction pour mettre à jour le terme de recherche
    regionFilter, // Région sélectionnée pour le filtrage
    setRegionFilter, // Fonction pour mettre à jour le filtre de région
    sortKey, // Clé de tri (nom ou population)
    setSortKey, // Fonction pour changer la clé de tri
    sortOrder, // Ordre de tri (croissant ou décroissant)
    setSortOrder, // Fonction pour changer l'ordre de tri
    limit, // Nombre maximum de pays à afficher
    setLimit, // Fonction pour modifier la limite d'affichage
    regions, // Liste des régions disponibles (récupérées de l'API)
    error, // Message d'erreur en cas de problème
    loading, // État de chargement des données
  } = useCountries();

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10">Erreur : {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🌍 Pays du monde</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <SortFilterBar
        region={regionFilter}
        onRegionChange={setRegionFilter}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        limit={limit}
        onLimitChange={setLimit}
        regions={regions}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
