"use client";

import { useColors } from "@/contexts/ColorContext";

export const useColorOptions = () => {
  const { colorOption } = useColors();

  const inputColors = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine placeholder:text-pine/50 border-pine/50";
      default:
        return "text-midnight placeholder:text-jade/50 border-jade/50";
    }
  })();

  const inputClasses = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine placeholder:text-pine/50 border-pine/50 text-md mb-0 border-b-2 bg-transparent pb-2 pt-0 focus:outline-none";
      default:
        return "text-midnight placeholder:text-jade/50 border-jade/50 text-md mb-0 border-b-2 bg-transparent pb-2 pt-0 focus:outline-none";
    }
  })();

  const textColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine";
      default:
        return "text-jade";
    }
  })();

  const titleColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine";
      default:
        return "text-midnight";
    }
  })();

  const secondaryTextColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-forest";
      // case "seasonal":
      //   return "text-forest";
      default:
        return "text-olive";
    }
  })();

  const errorColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine";
      // case "seasonal":
      //   return "text-pine";
      default:
        return "text-orange";
    }
  })();

  const modalColors = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-pine drop-shadow-pine border-pine";
      default:
        return "text-jade drop-shadow-jade border-jade";
    }
  })();

  return {
    inputColors,
    inputClasses,
    textColor,
    secondaryTextColor,
    errorColor,
    titleColor,
    modalColors,
  };
};
