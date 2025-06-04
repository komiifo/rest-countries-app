// src/hooks/useCountries.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useCountries from "./useCountries";

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
    cca3: "NGA",
    name: { common: "Nigeria" },
    population: 218541212,
    region: "Africa",
    capital: ["Abuja"],
    flags: { svg: "https://flagcdn.com/ng.svg" },
  },
];

window.fetch = vi.fn();

describe("useCountries Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockCountriesData,
    });
  });

  it("should load countries successfully", async () => {
    const { result } = renderHook(() => useCountries());

    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.countries).toHaveLength(2);
    expect(result.current.regions).toEqual(["Africa", "Europe"]);
  });

  it("should filter countries by search term", async () => {
    const { result } = renderHook(() => useCountries());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Simuler une recherche
    result.current.setSearchTerm("Fra");

    await waitFor(() => {
      expect(result.current.countries).toHaveLength(1);
      expect(result.current.countries[0].name.common).toBe("France");
    });
  });
});
