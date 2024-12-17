"use client";
import React, { useState } from "react";
import type { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import SiteButton from "./siteButton";
import { useColors } from "@/contexts/ColorContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "mediumCircle";
  variant?: "hollow" | "filled" | "avatar";
  colorScheme: ButtonColorOption;
  clickedButton: any;
  title: string;
  addImage?: any;
}

const NavButton: React.FC<ButtonProps> = ({
  size,
  onClick,
  variant = "filled",
  colorScheme = "e5",
  clickedButton,
  title,
  addImage,
}) => {
  const { colorOption } = useColors();

  return (
    <SiteButton
      // variant={variant}
      variant={colorOption === "seasonal" ? "hollow" : variant}
      colorScheme={colorScheme}
      size={size}
      aria={title}
      value={title}
      onClick={onClick}
      addImage={addImage}
      isSelected={clickedButton === `${title}`}
    >
      {addImage ? "" : title}
    </SiteButton>
  );
};

export default NavButton;
