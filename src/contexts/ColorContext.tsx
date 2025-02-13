"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "./FellowContext";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";

export interface Colors {
  colorOption: "highContrast" | "standard" | "seasonal";
}

interface ColorContextType {
  colorOption: Colors | string;
  setColorOption: (colors: Colors | string) => void;
  currentColorScheme: ButtonColorOption | string;
  setCurrentColorScheme: (colorScheme: ButtonColorOption | string) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // We'll need to set a colorOption to the account of each person & business on the site
  // Options here: "standard" || "highContrast"
  const [colorOption, setColorOption] = useState<Colors | string>("standard");
  const [currentColorScheme, setCurrentColorScheme] = useState("");
  const { fellow } = useFellow();

  return (
    <ColorContext.Provider
      value={{
        colorOption,
        setColorOption,
        currentColorScheme,
        setCurrentColorScheme,
      }}
    >
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
