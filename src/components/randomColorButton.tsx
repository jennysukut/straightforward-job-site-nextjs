"use client";
import React, { useState } from "react";
import type { ColorSchemeOption } from "@/lib/buttonColors";
import getRandomColorScheme from "@/utils/getRandomColorScheme";
import SiteButton from "./siteButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addClasses?: string;
  size?: "large";
  variant: "hollow" | "filled";
  colorScheme: ColorSchemeOption;
  aria: string;
}

const RandomColorButton: React.FC<ButtonProps> = ({
  addClasses,
  size,
  onClick,
  disabled,
  type = "button",
  aria,
  variant,
  colorScheme = "e5",
  children,
  ...props
}) => {
  
  const [currentColor, setCurrentColor] = useState(colorScheme);

  function setNewColor(currentColor: ColorSchemeOption) {
    const newColor = getRandomColorScheme(currentColor);
    setCurrentColor(newColor);
  }

  return (
    <SiteButton
      {...props}
      colorScheme={currentColor}
      onClick={() => setNewColor(currentColor)}
      aria={aria}
      variant="filled"
      size={size}
      addClasses={addClasses}
      disabled={disabled}
      type={type}
    >
      {children}
    </SiteButton>
  );
};

export default RandomColorButton;
