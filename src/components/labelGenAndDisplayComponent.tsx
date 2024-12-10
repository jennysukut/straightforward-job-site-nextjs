"use client";

import React, { useState, useEffect } from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";

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
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);

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
      {title && <p className="Title -mb-4 pl-4">{title}</p>}
      {subTitle && (
        <p className="SubTitle -mb-4 -mt-4 pl-4 text-sm font-medium italic text-olive">
          {subTitle}
        </p>
      )}
      {required && (
        <p className="required flex-end -mb-[3rem] -mr-3 -mt-2 text-end text-2xl">
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
          className="text-md w-[98%] self-start bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
          onChange={handleInput}
        />
      </InfoBox>
      {note && (
        <span className="note align-end -mb-6 -mt-4 text-end text-xs text-lime">
          {note}
        </span>
      )}
      {errors?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
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
          {selectedArray.map((item, index) => {
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
