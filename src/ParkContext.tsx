import React, { createContext, useContext } from "react";
import type { Park } from "./types";

type ParkContextType = {
  park: Park | null;
  setPark?: React.Dispatch<React.SetStateAction<Park | null>>;
};

const ParkContext = createContext<ParkContextType>({ park: null });

export const usePark = () => useContext(ParkContext);

export const ParkProvider: React.FC<{
  park: Park | null;
  children: React.ReactNode;
}> = ({ park, children }) => {
  return (
    <ParkContext.Provider value={{ park }}>{children}</ParkContext.Provider>
  );
};
