"use client";

import React, { useState } from "react";
import InfoBox from "./infoBox";
import { useForm } from "react-hook-form";
import SiteLabel from "./siteLabel";

interface InputComponent {
  type: string;
  placeholderText: string;
  errors: any;
  register: any;
  registerValue: string;
  defaultValue: any;
  width?: any;
  height?: any;
  size?: "extraSmall" | "tall" | "medium";
  addClasses?: string;
}

// Define the interface for the items in selectedArray
interface Item {
  [key: string]: any; // Adjust this to the specific structure of your items
}

const InputComponent: React.FC<InputComponent> = ({
  type,
  placeholderText,
  errors,
  register,
  registerValue,
  defaultValue,
  width,
  height,
  size = "extraSmall",
  addClasses,
  ...props
}) => {
  return (
    <div className="InputComponentContainer flex flex-col gap-8">
      <InfoBox
        variant="hollow"
        size={size}
        aria="firstName"
        width={width}
        addClasses={addClasses}
      >
        {size === "extraSmall" && (
          <input
            type={type}
            placeholder={placeholderText}
            className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
            defaultValue={defaultValue}
            {...(typeof register === "function" ? register(registerValue) : {})}
          />
        )}
        {size !== "extraSmall" && (
          <textarea
            className="text-md h-full w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
            type={type}
            placeholder={placeholderText}
            defaultValue={defaultValue}
            {...(typeof register === "function" ? register(registerValue) : {})}
          />
        )}
      </InfoBox>

      {errors?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
