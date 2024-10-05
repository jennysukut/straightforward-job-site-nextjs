"use client";

import React, { useState } from "react";
import {
  buttonColors,
  ButtonColorOption,
} from "@/lib/stylingData/buttonColors";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addClasses?: string;
  size?: "large" | "largeCircle" | "smallCircle" | "extraLarge";
  variant: "hollow" | "filled" | "avatar";
  colorScheme: ButtonColorOption;
  aria: string;
  addImage?: string;
  isSelected?: boolean;
}

const SiteButton: React.FC<ButtonProps> = ({
  addClasses,
  size = "default",
  onClick,
  disabled,
  type = "button",
  aria,
  variant,
  colorScheme = "e5",
  children,
  addImage,
  isSelected,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClasses = clsx(
    "SiteButton relative z-[1] cursor-pointer rounded-full font-semibold transition-all duration-200 tracking-superwide hover:saturate-[120%]",
    {
      // size
      "px-8 py-4 text-[0.85rem] sm:px-10 md:text-sm": size === "large",
      "h-16 w-16": size === "largeCircle",
      "h-6 w-6": size === "smallCircle",
      "px-4 py-2 text-xs min-w-[65px]": size === "default",
      "px-12 py-6 text-[0.85rem] sm:py-6 md:px-10 md:py-4 md:text-sm":
        size === "extraLarge",

      // variant
      "bg-cream border-jade border-[2px]": variant === "hollow",
      "text-jade": variant === "hollow" && !isSelected,
      [`text-eggshell ${buttonColors[colorScheme].color1}`]:
        variant === "filled",
      [`${addImage} bg-cover`]: variant === "avatar",
      // hover colors for hollow buttons
      [`${buttonColors[colorScheme].color5} ${buttonColors[colorScheme].color6} group-hover:text-eggshell`]:
        variant === "hollow",

      // pressed state
      "translate-x-2 translate-y-2 sm:translate-x-1.5 sm:translate-y-1.5":
        isPressed,
      "hover:-translate-x-0.5 hover:-translate-y-0.5":
        !isPressed && !isSelected,

      //selected state
      [`${buttonColors[colorScheme].color1} ${buttonColors[colorScheme].color3} translate-x-1 translate-y-1 text-eggshell`]:
        isSelected,
      [`${buttonColors[colorScheme].color5} ${buttonColors[colorScheme].color6} translate-x-[2px] translate-y-[2px] text-eggshell`]:
        isSelected && size === "smallCircle",

      // diabled
      "disabled:translate-x-1 disabled:translate-y-1 disabled:border-midnight disabled:bg-midnight disabled:text-jade disabled:hover:cursor-not-allowed disabled:hover:saturate-100":
        disabled,
    },
    addClasses,
    addImage,
  );

  const shadowClasses = clsx(
    "ButtonShadow absolute rounded-full text-transparent font-semibold tracking-superwide",
    {
      // size
      "px-8 py-4 text-[0.85rem] sm:px-10 md:text-sm left-2 -right-2 top-2":
        size === "large",
      "h-16 w-16 -right-1.5 top-1.5 left-1.5": size === "largeCircle",
      "h-6 w-6 -right-1 top-1 left-1": size === "smallCircle",
      "px-4 py-2 text-xs min-w-[65px] -right-1.5 top-1.5  left-1.5":
        size === "default",
      "px-12 py-6 text-[0.85rem] sm:py-6 md:px-10 md:text-sm md:py-4 left-2 -right-2 top-2":
        size === "extraLarge",

      // variant
      [`border-[2px] border-jade bg-jade ${buttonColors[colorScheme].color7} ${buttonColors[colorScheme].color8}`]:
        variant === "hollow",
      "bg-jade": variant === "avatar",
      [`${buttonColors[colorScheme].color2}`]: variant === "filled",

      //selected state
      [` ${buttonColors[colorScheme].color2} ${buttonColors[colorScheme].color4} ${buttonColors[colorScheme].color7} ${buttonColors[colorScheme].color8}`]:
        isSelected && variant === "hollow",
    },
    addClasses,
  );

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <div className="Button group relative w-fit">
      <button
        {...props}
        className={buttonClasses}
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
      <div className={shadowClasses}>{children}</div>
    </div>
  );
};

export default SiteButton;
