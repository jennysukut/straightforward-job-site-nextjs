"use client";
import React, { useState } from "react";
import { buttonColors } from "@/lib/buttonColors";
import type { ColorSchemeOption } from "@/lib/buttonColors";
import getRandomColorScheme from "@/utils/getRandomColorScheme";

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
  const [isPressed, setIsPressed] = useState(false);
  const [currentColor, setCurrentColor] = useState(colorScheme);

  let buttonSize: string;
  let buttonStyle: string;

  function setNewColor(currentColor: ColorSchemeOption) {
    const newColor = getRandomColorScheme(currentColor);
    setCurrentColor(newColor);
  }

  switch (size) {
    case "large":
      buttonSize = "px-6 py-4 text-sm";
      break;
    default:
      buttonSize = "px-4 py-2 text-xs min-w-[65px]";
  }

  switch (variant) {
    case "hollow":
      buttonStyle = "bg-cream border-jade text-jade border-[3px]";
      break;
    case "filled":
      buttonStyle = `text-eggshell ${buttonColors[currentColor].color1}`;
      break;
    default:
      buttonStyle = "";
  }

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const transitionClass = isPressed
    ? "translate-x-1.5 translate-y-1.5"
    : "hover:-translate-x-0.5 hover:-translate-y-0.5";

  const buttonDisabled = disabled
    ? "disabled:translate-x-1 disabled:translate-y-1 disabled:bg-blush disabled:text-white disabled:hover:cursor-not-allowed disabled:hover:saturate-100"
    : "";

  return (
    <div className="ButtonContainer group relative">
      <button
        {...props}
        className={`SiteButton relative z-[1] cursor-pointer rounded-full font-semibold transition-all duration-200 hover:saturate-150 ${variant === "hollow" ? `group-hover:border-lime group-hover:bg-lime group-hover:text-eggshell` : ""} ${buttonSize} ${addClasses} ${buttonStyle} ${transitionClass} ${buttonDisabled}`}
        type={type ?? "button"}
        onClick={() => setNewColor(currentColor)}
        disabled={disabled}
        aria-label={aria}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
      <div
        className={`ButtonShadow absolute -right-1.5 top-1.5 rounded-full text-transparent ${variant === "hollow" ? `border-[2px] border-jade bg-jade group-hover:border-lilac group-hover:bg-lilac` : `${buttonColors[currentColor].color2}`} ${buttonSize} ${addClasses}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RandomColorButton;
