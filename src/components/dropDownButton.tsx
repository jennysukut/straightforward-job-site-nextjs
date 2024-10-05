"use client";

import React, { useState } from "react";
import {
  buttonColors,
  ButtonColorOption,
} from "@/lib/stylingData/buttonColors";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addClasses?: string;
  variant: "filled";
  colorScheme: ButtonColorOption;
  aria: string;
  isSelected?: boolean;
  details?: string[];
}

const DropDownButton: React.FC<ButtonProps> = ({
  addClasses,
  onClick,
  type = "button",
  aria,
  variant,
  colorScheme = "e5",
  children,
  isSelected,
  details,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClasses = clsx(
    "SiteButton relative z-[1] w-[18rem] cursor-pointer leading-6 font-semibold transition-all duration-150 tracking-superwide hover:saturate-[120%] px-8 py-4 text-[0.85rem]",
    {
      // isSelected
      "rounded-full": !isSelected,
      "rounded-[2rem] py-6": isSelected,

      // variant - filled only, but I'll leave it JIC
      [`text-eggshell ${buttonColors[colorScheme].color1}`]:
        variant === "filled",

      // pressed state
      // "translate-x-2 translate-y-2 sm:translate-x-1.5 sm:translate-y-1.5":
      //   isPressed,
      "h-[22rem]": isPressed,
      "hover:-translate-x-0.5 hover:-translate-y-0.5":
        !isPressed && !isSelected,
    },
    addClasses,
  );

  const shadowClasses = clsx(
    "ButtonShadow absolute w-[18rem] text-transparent leading-6 font-semibold tracking-superwide text-[0.85rem] -right-2 top-2 px-8 py-4",
    {
      // isSelected
      "rounded-full": !isSelected,
      "rounded-[2rem]": isSelected,
      "py-6": isSelected,

      // filled option - JIC
      [`${buttonColors[colorScheme].color2}`]: variant === "filled",
    },
    addClasses,
  );

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <div className="DropDownButton group relative w-fit">
      <button
        {...props}
        className={buttonClasses}
        type={type ?? "button"}
        onClick={onClick}
        aria-label={aria}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <p className={`Title ${isSelected ? "mb-6 mt-8" : ""}`}>{children}</p>
        {isSelected && details
          ? details.map((detail, index) => (
              <p
                key={index}
                className="mb-4 px-6 text-left first-of-type:pt-8 last-of-type:pb-8"
              >
                {detail.trim()}
              </p>
            ))
          : ""}
      </button>
      <div className={shadowClasses}>
        <p className={`Title ${isSelected ? "mb-6 mt-8" : ""}`}>{children}</p>
        {isSelected && details
          ? details.map((detail, index) => (
              <p
                key={index}
                className="mb-4 px-6 text-left first-of-type:pt-8 last-of-type:pb-8"
              >
                {detail.trim()}
              </p>
            ))
          : ""}
      </div>
    </div>
  );
};

export default DropDownButton;
