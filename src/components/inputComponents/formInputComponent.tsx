"use client";

import React from "react";
import Image from "next/image";

import { useColorOptions } from "@/lib/stylingData/colorOptions";

interface InputComponent {
  type: string;
  title: string;
  placeholderText: string;
  errors?: any;
  registerValue: string;
  defaultValue?: any;
  register: any;
  viewButton?: boolean;
  viewFunction?: any;
}

const FormInputComponent: React.FC<InputComponent> = ({
  type,
  title,
  defaultValue,
  placeholderText,
  register,
  registerValue,
  errors,
  viewButton,
  viewFunction,
  ...props
}) => {
  const { inputClasses, inputColors, titleColor, textColor, errorColor } =
    useColorOptions();

  return (
    <div className="FormInputComponentContainer flex flex-col gap-2">
      <div className="TitleViewGroup flex gap-2">
        <label htmlFor={registerValue} className={`Title ${textColor}`}>
          {title}
        </label>
        {viewButton && (
          <Image
            src="/view-icon.svg"
            alt="view"
            width={16}
            height={16}
            onClick={viewFunction}
            className="cursor-pointer"
          ></Image>
        )}
      </div>

      <input
        type={type}
        defaultValue={defaultValue}
        {...register(registerValue)}
        placeholder={placeholderText}
        className={inputClasses}
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
