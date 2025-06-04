// src/App.test.jsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock des données de test
const mockCountriesData = [
  {
    cca3: "FRA",
    name: { common: "France" },
    population: 67391582,
    region: "Europe",
    capital: ["Paris"],
    flags: { svg: "https://flagcdn.com/fr.svg" },
  },
  {
    cca3: "DEU",
    name: { common: "Germany" },
    population: 83240525,
    region: "Europe",
    capital: ["Berlin"],
    flags: { svg: "https://flagcdn.com/de.svg" },
  },
  {
    cca3: "NGA",
    name: { common: "Nigeria" },
    population: 218541212,
    region: "Africa",
    capital: ["Abuja"],
    flags: { svg: "https://flagcdn.com/ng.svg" },
  },
  {
    cca3: "EGY",
    name: { common: "Egypt" },
    population: 104258327,
    region: "Africa",
    capital: ["Cairo"],
    flags: { svg: "https://flagcdn.com/eg.svg" },
  },
  {
    cca3: "JPN",
    name: { common: "Japan" },
    population: 125836021,
    region: "Asia",
    capital: ["Tokyo"],
    flags: { svg: "https://flagcdn.com/jp.svg" },
  },
];

// Mock de l'API fetch
window.fetch = vi.fn();

describe("App Component - Filtrage par région", () => {
  beforeEach(() => {
    // Reset du mock avant chaque test
    vi.clearAllMocks();

    // Mock de la réponse de l'API
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockCountriesData,
    });
  });

  it("should render all countries on initial load", async () => {
    render(<App />);

    // Vérifier que le composant se charge
    expect(screen.getByText("🌍 Pays du monde")).toBeInTheDocument();

    // Attendre que les pays se chargent
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Germany")).toBeInTheDocument();
      expect(screen.getByText("Nigeria")).toBeInTheDocument();
      expect(screen.getByText("Egypt")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });
  });

  it("should filter countries by Europe region", async () => {
    render(<App />);

    // Attendre que les données se chargent
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // Trouver et cliquer sur le select de région
    const regionSelect = screen.getByDisplayValue("Toutes les régions");
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    // Vérifier que seuls les pays européens sont affichés
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Germany")).toBeInTheDocument();
      expect(screen.queryByText("Nigeria")).not.toBeInTheDocument();
      expect(screen.queryByText("Egypt")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  it("should filter countries by Africa region", async () => {
    render(<App />);

    // Attendre que les données se chargent
    await waitFor(() => {
      expect(screen.getByText("Nigeria")).toBeInTheDocument();
    });

    // Trouver et cliquer sur le select de région
    const regionSelect = screen.getByDisplayValue("Toutes les régions");
    fireEvent.change(regionSelect, { target: { value: "Africa" } });

    // Vérifier que seuls les pays africains sont affichés
    await waitFor(() => {
      expect(screen.getByText("Nigeria")).toBeInTheDocument();
      expect(screen.getByText("Egypt")).toBeInTheDocument();
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Germany")).not.toBeInTheDocument();
      expect(screen.queryByText("Japan")).not.toBeInTheDocument();
    });
  });

  it('should show all countries when "Toutes les régions" is selected', async () => {
    render(<App />);

    // Attendre que les données se chargent
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // Filtrer par Europe d'abord
    const regionSelect = screen.getByDisplayValue("Toutes les régions");
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    await waitFor(() => {
      expect(screen.queryByText("Nigeria")).not.toBeInTheDocument();
    });

    // Remettre "Toutes les régions"
    fireEvent.change(regionSelect, { target: { value: "" } });

    // Vérifier que tous les pays sont de nouveau affichés
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Germany")).toBeInTheDocument();
      expect(screen.getByText("Nigeria")).toBeInTheDocument();
      expect(screen.getByText("Egypt")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });
  });

  it("should display loading state initially", () => {
    render(<App />);
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("should handle API error gracefully", async () => {
    // Mock d'une erreur d'API
    fetch.mockRejectedValue(new Error("API Error"));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Erreur/)).toBeInTheDocument();
    });
  });
});

// Tests spécifiques pour le hook useCountries
describe("useCountries Hook Logic", () => {
  it("should correctly filter countries by region", () => {
    const countries = mockCountriesData;
    const europeanCountries = countries.filter(
      (country) => country.region === "Europe"
    );

    expect(europeanCountries).toHaveLength(2);
    expect(europeanCountries.map((c) => c.name.common)).toEqual([
      "France",
      "Germany",
    ]);
  });

  it("should correctly filter countries by Africa region", () => {
    const countries = mockCountriesData;
    const africanCountries = countries.filter(
      (country) => country.region === "Africa"
    );

    expect(africanCountries).toHaveLength(2);
    expect(africanCountries.map((c) => c.name.common)).toEqual([
      "Nigeria",
      "Egypt",
    ]);
  });

  it("should extract unique regions correctly", () => {
    const countries = mockCountriesData;
    const regions = [
      ...new Set(countries.map((country) => country.region)),
    ].sort();

    expect(regions).toEqual(["Africa", "Asia", "Europe"]);
  });
});

// Tests d'intégration plus avancés
describe("App Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockCountriesData,
    });
  });

  it("should combine search and region filter", async () => {
    render(<App />);

    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // Filtrer par Europe
    const regionSelect = screen.getByDisplayValue("Toutes les régions");
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    // Rechercher "Germ"
    const searchInput = screen.getByPlaceholderText("Rechercher un pays...");
    fireEvent.change(searchInput, { target: { value: "Germ" } });

    // Vérifier que seul Germany est affiché
    await waitFor(() => {
      expect(screen.getByText("Germany")).toBeInTheDocument();
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Nigeria")).not.toBeInTheDocument();
    });
  });

  it("should show no results when filter combination returns empty", async () => {
    render(<App />);

    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByText("France")).toBeInTheDocument();
    });

    // Filtrer par Europe
    const regionSelect = screen.getByDisplayValue("Toutes les régions");
    fireEvent.change(regionSelect, { target: { value: "Europe" } });

    // Rechercher un pays qui n'existe pas en Europe
    const searchInput = screen.getByPlaceholderText("Rechercher un pays...");
    fireEvent.change(searchInput, { target: { value: "Nigeria" } });

    // Vérifier qu'aucun pays n'est affiché
    await waitFor(() => {
      expect(screen.queryByText("France")).not.toBeInTheDocument();
      expect(screen.queryByText("Germany")).not.toBeInTheDocument();
      expect(screen.queryByText("Nigeria")).not.toBeInTheDocument();
    });
  });
});
