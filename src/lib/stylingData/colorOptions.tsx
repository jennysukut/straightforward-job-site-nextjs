"use client";

import { useColors } from "@/contexts/ColorContext";

export const useColorOptions = () => {
  const { colorOption } = useColors();

  const inputColors = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-cobalt placeholder:text-cobalt/50 border-azure/50";
      case "seasonal":
        return "text-cocoa placeholder:text-cocoa/50 border-cocoa/50";
      default:
        return "text-midnight placeholder:text-jade/50 border-jade/50";
    }
  })();

  const inputClasses = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-cobalt placeholder:text-cobalt/50 border-azure/50 text-md mb-0 border-b-2 bg-transparent pb-2 pt-0 focus:outline-none";
      case "seasonal":
        return "text-cocoa placeholder:text-cocoa/50 border-cocoa/50 text-md mb-0 border-b-2 bg-transparent pb-2 pt-0 focus:outline-none";
      default:
        return "text-midnight placeholder:text-jade/50 border-jade/50 text-md mb-0 border-b-2 bg-transparent pb-2 pt-0 focus:outline-none";
    }
  })();

  const textColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-cobalt";
      case "seasonal":
        return "text-cocoa";
      default:
        return "text-jade";
    }
  })();

  const titleColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-cobalt";
      case "seasonal":
        return "text-cocoa";
      default:
        return "text-midnight";
    }
  })();

  const secondaryTextColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-azure";
      case "seasonal":
        return "text-cinnamon";
      default:
        return "text-olive";
    }
  })();

  const errorColor = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-denim";
      case "seasonal":
        return "text-spice";
      default:
        return "text-orange";
    }
  })();

  const modalColors = (() => {
    switch (colorOption) {
      case "highContrast":
        return "text-cobalt drop-shadow-cobalt border-cobalt";
      case "seasonal":
        return "text-cocoa drop-shadow-cocoa border-cocoa";
      case "anotherOption":
        return "text-someColor drop-shadow-someColor border-someColor";
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
