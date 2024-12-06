"use client";

import React, { createContext, useContext, useState } from "react";

interface ColorContextType {
  isGrayscale: boolean;
  toggleGrayscale: () => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isGrayscale, setIsGrayscale] = useState(false);

  const toggleGrayscale = () => {
    setIsGrayscale((prev) => !prev);
  };

  return (
    <ColorContext.Provider value={{ isGrayscale, toggleGrayscale }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};
