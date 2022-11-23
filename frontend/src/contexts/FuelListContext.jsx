import { createContext, useContext, useState } from "react";

const fuelListContex = createContext();

export const useFuelList = () => useContext(fuelListContex);

export function ProviderFuelList({ children }) {
  const [fuelList, setFuelList] = useState([]);

  return (
    <fuelListContex.Provider value={{ fuelList, setFuelList }}>
      {children}
    </fuelListContex.Provider>
  );
}
