"use client";

import React from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import { useState } from "react";

interface LabelGeneratorAndDisplayComp {
  handleAdd: Function;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  selectedArray: Array<any>;
  handleDelete: Function;
  placeholder: string;
  colorArray: Array<any>;
  name: string;
  variant: any;
  options?: boolean;
  searchData?: Array<any>;
}

const LabelGeneratorAndDisplayComp: React.FC<LabelGeneratorAndDisplayComp> = ({
  handleAdd,
  handleInputChange,
  errors,
  selectedArray,
  handleDelete,
  placeholder,
  colorArray,
  name,
  variant,
  options,
  searchData,
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]); // Add state for filtered skills
  const [inputValue, setInputValue] = useState<string>(""); // Add state for input value

  const findOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("trying to find options");
    const value = event.target.value;
    setInputValue(value); // Update input value state
    handleInputChange(event);

    if (value.length >= 2) {
      const matches =
        searchData?.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        ) || [];
      setFilteredItems(matches);
    } else {
      setFilteredItems([]);
    }
  };

  const addItem = (name: any, item: any) => {
    handleAdd(name, item);
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
        addClasses="flex"
        type={name}
        addClick={() => handleAdd(name)}
      >
        <input
          type={name}
          placeholder={placeholder}
          name={name}
          // this won't work for free-form typing items
          value={inputValue}
          className="text-md w-[98%] self-start bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
          onChange={findOptions}
        />
      </InfoBox>

      {/* place options/search info here? */}
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
              // handleAdd={() => handleAdd(name, item)}
            >
              {item}
            </SiteLabel>
          ))}
        </div>
      )}
      {/* make an options object that I can pass through and place here */}

      {errors.skills?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
          {errors.skills.message.toString()}
        </p>
      )}
      {selectedArray.length >= 1 ? (
        <div className="SkillsContainer -mt-4 flex flex-wrap gap-2">
          {selectedArray.map((item, index) => {
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
