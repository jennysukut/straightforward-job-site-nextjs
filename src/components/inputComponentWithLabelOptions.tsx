"use client";

import React from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import { useState, useEffect } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

interface InputComponentWithLabelOptions {
  handleAdd: Function;
  errors?: any;
  handleDelete?: Function;
  placeholder: string;
  name: string;
  variant?: any;
  searchData: Array<any>;
  colorArray: Array<any>;
  options?: boolean;
  defaultValue?: any;
  required?: boolean;
  width?: any;
  register?: any;
  registerValue?: string;
  size?: any;
  textSize?: any;
  optionsContainerClasses?: string;
}

const InputComponentWithLabelOptions: React.FC<
  InputComponentWithLabelOptions
> = ({
  handleAdd,
  errors,
  handleDelete,
  placeholder,
  name,
  variant,
  colorArray,
  searchData,
  options,
  defaultValue = "",
  required,
  width,
  register,
  size = "extraSmall",
  registerValue,
  textSize,
  optionsContainerClasses,
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const { inputColors, textColor, errorColor } = useColorOptions();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length == 0) {
      handleAdd(name, value);
    }
    if (value.length >= 3) {
      const matches =
        searchData?.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        ) || [];
      setFilteredItems(matches);
    } else {
      setFilteredItems([]);
    }
  };

  const selectItem = (name: any, item: any) => {
    setFilteredItems([]);
    setInputValue(item);
    handleAdd(name, item);
  };

  return (
    <div className="InputComponentWithLabelOptionsContainer flex flex-col gap-8">
      {required && (
        <p
          className={`required flex-end -mb-[3rem] -mr-3 -mt-2 text-end text-2xl ${textColor}`}
        >
          *
        </p>
      )}
      <InfoBox
        variant="hollow"
        size={size}
        aria={name}
        canSearch
        addClasses="flex"
        type={name}
        width={width}
        textSize={textSize}
      >
        <input
          type={name}
          placeholder={placeholder}
          name={name}
          value={inputValue || ""}
          className={`text-md w-[98%] self-start bg-transparent ${inputColors} focus:outline-none`}
          onChange={handleInput}
          {...(typeof register === "function" ? register(registerValue) : "")}
        />
      </InfoBox>

      {/* place options/search info here? */}
      {options && (
        <div
          className={`OptionsContainer -mb-2 -mt-4 flex flex-wrap gap-2 ${optionsContainerClasses}`}
        >
          {filteredItems.map((item, index) => (
            <SiteLabel
              aria={item}
              variant="display"
              key={index}
              canAdd
              colorScheme={colorArray[index % colorArray.length]}
              handleAdd={() => selectItem(name, item)}
            >
              {item}
            </SiteLabel>
          ))}
        </div>
      )}

      {errors?.message && (
        <p className={`m-0 -mt-4 p-0 text-xs font-medium ${errorColor}`}>
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputComponentWithLabelOptions;
