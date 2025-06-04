// src/App.jsx
import React, { useState } from "react";
import Navigation from "./components/Navigation";
import MainPage from "./pages/MainPage";
import FavoritesPage from "./pages/FavoritesPage";

/**
 * Composant App principal
 * Router de l'application gérant la navigation entre les pages
 *
 * @param {Object} props - Les propriétés du composant (aucune prop requise)
 */

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  const renderPage = () => {
    switch (currentPage) {
      case "favorites":
        return <FavoritesPage onBackToMain={() => setCurrentPage("main")} />;
      case "stats":
        // return <StatsPage />
        return (
          <div className="text-center p-8">Page de statistiques à venir...</div>
        );
      case "main":
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
