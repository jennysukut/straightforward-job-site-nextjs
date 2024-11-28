"use client";

import React, { useState, useEffect } from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import { span } from "framer-motion/client";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";

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
  required?: boolean;
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
  required,
  ...props
}) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [colorOptions, setColorOptions] = useState(Array<any>);

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

  useEffect(() => {
    const colors = getRandomColorArray(25);
    setColorOptions(colors);
  }, []);

  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
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
        <div className="SkillsContainer -mt-2 flex flex-wrap gap-2">
          {selectedArray
            // .slice()
            // .reverse()
            .map((item, index) => {
              return (
                <SiteLabel
                  aria={item}
                  variant={variant}
                  key={index}
                  colorScheme={colorOptions[index % colorOptions.length]}
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
