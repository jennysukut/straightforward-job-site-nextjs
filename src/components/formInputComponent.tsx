"use client";

import React, { useState } from "react";
import { inputClasses } from "@/lib/stylingData/stylingClasses";

interface InputComponent {
  type: string;
  title: string;
  placeholderText: string;
  errors: any;
  registerValue: string;
  defaultValue: any;
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
  return (
    <div className="FormInputComponentContainer flex flex-col gap-2 pt-4">
      <label htmlFor={registerValue}>{title}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(registerValue)}
        placeholder={placeholderText}
        className={inputClasses}
      />
      {errors?.message && (
        <p className="m-0 p-0 text-xs font-medium text-orange">
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInputComponent;
