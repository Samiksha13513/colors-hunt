import React, { createContext, useState, useContext, ReactNode } from 'react';

type ColorPalette = string[];

interface ColorCollectionContextType {
  collection: ColorPalette[];
  addToCollection: (palette: ColorPalette) => void;
}

const ColorCollectionContext = createContext<ColorCollectionContextType | undefined>(undefined);

export const ColorCollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collection, setCollection] = useState<ColorPalette[]>([]);

  const addToCollection = (palette: ColorPalette) => {
    setCollection(prev => [...prev, palette]);
  };

  return (
    <ColorCollectionContext.Provider value={{ collection, addToCollection }}>
      {children}
    </ColorCollectionContext.Provider>
  );
};

export const useColorCollection = (): ColorCollectionContextType => {
  const context = useContext(ColorCollectionContext);
  if (!context) {
    throw new Error("useColorCollection must be used within a ColorCollectionProvider");
  }
  return context;
};
