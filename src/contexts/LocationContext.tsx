
import React, { createContext, useState, useContext } from "react";
import { cities } from "../utils/data";

interface LocationContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    const stored = localStorage.getItem("townshop_city");
    return stored || "";
  });

  const handleSetCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("townshop_city", city);
  };

  const value = {
    selectedCity,
    setSelectedCity: handleSetCity,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
