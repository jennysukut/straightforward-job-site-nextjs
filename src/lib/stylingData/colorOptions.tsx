"use client";

import { useColors } from "@/contexts/ColorContext";

export const useColorOptions = () => {
  const { colorOption } = useColors();

  const inputColors =
    colorOption === "highContrast"
      ? "text-cobalt placeholder:text-cobalt/50 border-azure/50"
      : "text-midnight placeholder:text-jade/50 border-jade/50";

  const textColor =
    colorOption === "highContrast" ? "text-cobalt" : "text-jade";

  const titleColor =
    colorOption === "highContrast" ? "text-cobalt" : "text-midnight";

  const secondaryTextColor =
    colorOption === "highContrast" ? "text-azure" : "text-olive";

  const errorColor =
    colorOption === "highContrast" ? "text-denim" : "text-orange";

  const modalColors =
    colorOption === "highContrast"
      ? "text-cobalt drop-shadow-cobalt border-cobalt"
      : "text-jade drop-shadow-jade border-jade";

  return {
    inputColors,
    textColor,
    secondaryTextColor,
    errorColor,
    titleColor,
    modalColors,
  };
};
