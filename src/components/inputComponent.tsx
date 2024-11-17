"use client";

import React, { useState } from "react";
import InfoBox from "./infoBox";
import { useForm } from "react-hook-form";

interface InputComponent {
  type: string;
  value: any;
  placeholderText: string;
  errors: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// Define the interface for the items in selectedArray
interface Item {
  [key: string]: any; // Adjust this to the specific structure of your items
}

const InputComponent: React.FC<InputComponent> = ({
  type,
  value,
  placeholderText,
  errors,
  onChange,
  ...props
}) => {
  return (
    <div className="InputComponentContainer flex flex-col gap-8">
      <InfoBox variant="hollow" size="extraSmall" aria="firstName">
        <input
          type={type}
          value={value}
          placeholder={placeholderText}
          className="text-md w-full bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
          onChange={onChange}
        />
      </InfoBox>
      {errors.name?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
          {errors.name.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
