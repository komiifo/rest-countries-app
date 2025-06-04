// src/components/CountryCard.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CountryCard from "./CountryCard";

const mockCountry = {
  cca3: "FRA",
  name: { common: "France" },
  population: 67391582,
  region: "Europe",
  capital: ["Paris"],
  flags: { svg: "https://flagcdn.com/fr.svg" },
};

describe("CountryCard Component", () => {
  it("should render country information correctly", () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("67,391,582")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });

  it("should display flag image with correct alt text", () => {
    render(<CountryCard country={mockCountry} />);

    const flagImage = screen.getByAltText("France");
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute("src", "https://flagcdn.com/fr.svg");
  });

  it("should handle missing capital gracefully", () => {
    const countryWithoutCapital = { ...mockCountry, capital: undefined };
    render(<CountryCard country={countryWithoutCapital} />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
