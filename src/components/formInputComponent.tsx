"use client";

import React from "react";
import { inputClasses } from "@/lib/stylingData/stylingClasses";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

interface InputComponent {
  type: string;
  title: string;
  placeholderText: string;
  errors?: any;
  registerValue: string;
  defaultValue?: any;
  register: any;
}

const FormInputComponent: React.FC<InputComponent> = ({
  type,
  title,
  defaultValue,
  placeholderText,
  register,
  registerValue,
  errors,
  ...props
}) => {
  const { inputColors, titleColor, errorColor } = useColorOptions();
  return (
    <div className="FormInputComponentContainer flex flex-col gap-2">
      <label htmlFor={registerValue} className={`Title ${titleColor}`}>
        {title}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(registerValue)}
        placeholder={placeholderText}
        className={inputClasses + inputColors}
      />
      {errors?.message && (
        <p className={`m-0 p-0 text-xs font-medium ${errorColor}`}>
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInputComponent;
