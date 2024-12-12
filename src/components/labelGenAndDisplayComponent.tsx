"use client";

import React, { useState, useEffect } from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import Image from "next/image";

interface LabelGeneratorAndDisplayComp {
  handleAdd: Function;
  errors: any;
  selectedArray: Array<any>;
  handleDelete: Function;
  placeholder: string;
  name: string;
  variant: any;
  options?: boolean;
  searchData?: Array<any>;
  note?: string;
  required?: boolean;
  title?: string;
  width?: "full";
  subTitle?: string;
  addClassesToResults?: string;
  resultDisplay?: string;
}

const LabelGeneratorAndDisplayComp: React.FC<LabelGeneratorAndDisplayComp> = ({
  handleAdd,
  errors,
  selectedArray,
  handleDelete,
  placeholder,
  name,
  variant,
  options,
  searchData,
  note,
  required,
  title,
  subTitle,
  width,
  addClassesToResults,
  resultDisplay,
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const { inputColors, textColor, secondaryTextColor, errorColor } =
    useColorOptions();
  const { colorOption } = useColors();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (options) {
      findOptions(value);
    }
  };

  const findOptions = (value: any) => {
    if (value.length >= 2) {
      const matches =
        searchData?.filter(
          (item) =>
            item.toLowerCase().includes(value.toLowerCase()) &&
            !selectedArray.includes(item),
        ) || [];
      setFilteredItems(matches);
    } else {
      setFilteredItems([]);
    }
  };

  const addItem = (name: any, item?: any) => {
    if (inputValue.length >= 2) {
      handleAdd(name, item || inputValue);
      setFilteredItems([]);
      setInputValue("");
    } else {
      console.log("Input value must be at least 2 characters long.");
    }
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
  }, []);

  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
      {title && <p className={`Title -mb-4 pl-4 ${textColor}`}>{title}</p>}
      {subTitle && (
        <p
          className={`SubTitle -mb-4 -mt-4 pl-4 text-sm font-medium italic ${secondaryTextColor}`}
        >
          {subTitle}
        </p>
      )}
      {required && (
        <p
          className={`required flex-end -mb-[3rem] -mr-3 -mt-2 text-end text-2xl ${textColor}`}
        >
          *
        </p>
      )}
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria={name}
        canAdd={!options}
        canSearch={options}
        addClasses="flex"
        type={name}
        addClick={() => addItem(name)}
        width={width}
      >
        <input
          type={name}
          placeholder={placeholder}
          name={name}
          value={inputValue}
          className={`text-md w-[98%] self-start bg-transparent ${inputColors} focus:outline-none`}
          onChange={handleInput}
        />
      </InfoBox>
      {note && (
        <span className="note align-end -mb-6 -mt-4 text-end text-xs text-lime">
          {note}
        </span>
      )}
      {errors?.message && (
        <p className={`m-0 -mt-4 p-0 text-xs font-medium ${errorColor}`}>
          {errors.message.toString()}
        </p>
      )}

      {/* options/search info */}
      {options && (
        <div className="OptionsContainer -mb-4 -mt-4 flex flex-wrap gap-2">
          {filteredItems.map((item, index) => (
            <SiteLabel
              aria={item}
              variant="display"
              key={index}
              colorScheme={primaryColorArray[index % primaryColorArray.length]}
              canAdd
              handleAdd={() => addItem(name, item)}
            >
              {item}
            </SiteLabel>
          ))}
        </div>
      )}

      {selectedArray.length >= 1 ? (
        <div
          className={`LabelContainer -mb-2 -mt-2 flex flex-wrap gap-2 ${addClassesToResults}`}
        >
          {resultDisplay === "list" && (
            <ul className="ListItems mt-4 flex list-disc flex-col gap-3 pl-12">
              {selectedArray.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="ListItem flex flex-wrap">
                      {item}
                      {colorOption === "highContrast" && (
                        <button
                          className="CloseButton opacity-100 hover:opacity-50"
                          onClick={() => handleDelete(name, item)}
                        >
                          <Image
                            src="/modal-close-button.svg"
                            alt="closebutton"
                            width={20}
                            height={20}
                          ></Image>
                        </button>
                      )}
                      {colorOption === "standard" && (
                        <button
                          className="CloseButton opacity-100 hover:opacity-50"
                          onClick={() => handleDelete(name, item)}
                        >
                          <Image
                            src="/modal-close-button.svg"
                            alt="closebutton"
                            width={20}
                            height={20}
                          ></Image>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {resultDisplay !== "list" &&
            selectedArray.map((item, index) => {
              return (
                <SiteLabel
                  aria={item}
                  variant={variant}
                  key={index}
                  colorScheme={
                    secondaryColorArray[index % secondaryColorArray.length]
                  }
                  handleDelete={() => handleDelete(name, item)}
                >
                  {item}
                </SiteLabel>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LabelGeneratorAndDisplayComp;
