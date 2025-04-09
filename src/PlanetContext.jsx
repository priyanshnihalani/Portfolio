// src/components/PlanetContext.jsx
import { createContext, useContext, useState } from "react";

const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [targetPlanet, setTargetPlanet] = useState(null);
  return (
    <PlanetContext.Provider value={{ targetPlanet, setTargetPlanet }}>
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanet = () => useContext(PlanetContext);
