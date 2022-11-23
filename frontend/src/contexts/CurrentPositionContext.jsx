import { createContext, useContext, useState } from "react";

const currentPositionContext = createContext();

export const useCurrentPosition = () => useContext(currentPositionContext);

export function CurrentPositionProvider({ children }) {
  const [currentPosition, setCurrentPosition] = useState([]);

  return (
    <currentPositionContext.Provider
      value={{ currentPosition, setCurrentPosition }}
    >
      {children}
    </currentPositionContext.Provider>
  );
}
