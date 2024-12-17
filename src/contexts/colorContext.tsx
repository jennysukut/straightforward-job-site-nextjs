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
  // We'll need to set a colorOption to the account of each person & business on the site
  // Options here: "standard" || "highContrast" || "seasonal" - coming soon
  const [colorOption, setColorOption] = useState<Colors | string>("seasonal");

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
