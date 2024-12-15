"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Colors {
  colorOption: "highContrast" | "standard" | "seasonal";
}

interface ColorContextType {
  colorOption: Colors | string;
  setColorOption: (colors: Colors | string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorOption, setColorOption] = useState<Colors | string>("");

  return (
    <ColorContext.Provider value={{ colorOption, setColorOption }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
};
