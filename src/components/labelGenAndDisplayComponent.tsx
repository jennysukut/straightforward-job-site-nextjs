"use client";

import React from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import { useState } from "react";
import { span } from "framer-motion/client";

interface LabelGeneratorAndDisplayComp {
  handleAdd: Function;
  errors: any;
  selectedArray: Array<any>;
  handleDelete: Function;
  placeholder: string;
  colorArray: Array<any>;
  name: string;
  variant: any;
  options?: boolean;
  searchData?: Array<any>;
  note?: string;
}

const LabelGeneratorAndDisplayComp: React.FC<LabelGeneratorAndDisplayComp> = ({
  handleAdd,
  errors,
  selectedArray,
  handleDelete,
  placeholder,
  colorArray,
  name,
  variant,
  options,
  searchData,
  note,
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("trying to find options");
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
    handleAdd(name, item || inputValue);
    setFilteredItems([]);
    setInputValue("");
  };

  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria={name}
        canAdd={!options}
        canSearch={options}
        addClasses="flex"
        type={name}
        addClick={() => addItem(name)}
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
        <span className="note align-end m-0 text-end italic text-olive">
          {note}
        </span>
      )}

      {/* options/search info */}
      {options && (
        <div className="OptionsContainer -mb-2 -mt-4 flex flex-wrap gap-2">
          {filteredItems.map((item, index) => (
            <SiteLabel
              aria={item}
              variant="display"
              key={index}
              colorScheme={colorArray[index % colorArray.length]}
              canAdd
              handleAdd={() => addItem(name, item)}
            >
              {item}
            </SiteLabel>
          ))}
        </div>
      )}

      {errors?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
          {errors.message.toString()}
        </p>
      )}
      {selectedArray.length >= 1 ? (
        <div className="SkillsContainer -mt-4 flex flex-wrap gap-2">
          {selectedArray
            .slice()
            .reverse()
            .map((item, index) => {
              return (
                <SiteLabel
                  aria={item}
                  variant={variant}
                  key={index}
                  colorScheme={colorArray[index % colorArray.length]}
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
