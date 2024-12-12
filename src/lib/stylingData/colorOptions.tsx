"use client";

import { useColors } from "@/contexts/ColorContext";

export const useColorOptions = () => {
  const { colorOption } = useColors();

  const inputColors =
    colorOption === "highContrast"
      ? "text-cobalt placeholder:text-cobalt/50"
      : "text-midnight placeholder:text-jade/50";

  const textColor =
    colorOption === "highContrast" ? "text-cobalt" : "text-jade";

  const secondaryTextColor =
    colorOption === "highContrast" ? "text-azure" : "text-olive";

  const errorColor =
    colorOption === "highContrast" ? "text-violet" : "text-orange";

  return { inputColors, textColor, secondaryTextColor, errorColor };
};
