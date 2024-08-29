"use client";
import React, { useState } from "react";
import { buttonColors } from "@/lib/buttonColors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addClasses?: string;
  size?: "large";
  variant: "hollow" | "filled";
  colorScheme?: string;
  aria?: string;
}

const SiteButton: React.FC<ButtonProps> = ({
  addClasses,
  size,
  onClick,
  disabled,
  type = "button",
  aria,
  variant,
  colorScheme = "a2",
  children,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  let buttonSize: string;
  let buttonStyle: string;

  switch (size) {
    case "large":
      buttonSize = "px-8 py-4 text-xl";
      break;
    default:
      buttonSize = "px-4 py-2 text-base min-w-[85px]";
  }

  switch (variant) {
    case "hollow":
      buttonStyle = "bg-cream border-jade text-jade border-[3px]";
      break;
    case "filled":
      buttonStyle = `text-eggshell ${buttonColors[colorScheme].color1}`;
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
    ? "disabled:translate-x-1.5 disabled:translate-y-1.5 disabled:bg-blush disabled:text-white disabled:hover:cursor-not-allowed disabled:hover:saturate-100"
    : "";

  return (
    <div className="ButtonContainer relative">
      <button
        {...props}
        className={`SiteButton relative z-[1] cursor-pointer rounded-full font-semibold capitalize leading-5 transition-all duration-200 hover:saturate-150 ${buttonSize} ${addClasses} ${buttonStyle} ${transitionClass} ${buttonDisabled}`}
        type={type ?? "button"}
        onClick={onClick}
        disabled={disabled}
        aria-label={aria}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
      <div
        className={`ButtonShadow absolute -right-1.5 top-1.5 rounded-full capitalize leading-5 text-transparent ${variant === "hollow" ? "border-[3px] border-jade" : ""} ${buttonSize} ${buttonColors[colorScheme].color2} ${addClasses}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SiteButton;
