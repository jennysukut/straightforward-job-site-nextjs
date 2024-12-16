"use client";

import React, { useState, useEffect } from "react";
import SiteButton from "./siteButton";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import ButtonOptionsComponent from "./buttonOptionsComponent";

// Define the interface for button objects
interface Button {
  title: any;
  type: string;
  array?: Array<any>;
  options: any[]; // You can specify a more specific type if known
}

// Update the TieredButtonOptionsComponent interface
interface TieredButtonOptionsComponent {
  type: string;
  title?: string;
  errors?: any;
  buttons: Button[]; // Use the new Button interface
  selectedArray?: any;
  handleAdd: Function;
  required?: boolean;
  handleDelete: Function;
  classesForButtons?: string;
  addClasses?: string;
  flexOpt?: string;
  buttonSize?: any;
  setArray?: any;
}

const TieredButtonOptionsComponent: React.FC<TieredButtonOptionsComponent> = ({
  type,
  title,
  errors,
  buttons,
  selectedArray,
  handleAdd,
  required,
  handleDelete,
  classesForButtons,
  addClasses,
  flexOpt,
  setArray,
  buttonSize = "default",
}) => {
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const { textColor, errorColor } = useColorOptions();

  const buttonClick = (button: string) => {
    if (selectedArray.includes(button)) {
      console.log("already got that one - we need to delete it");
      handleDelete(type, button);
    } else {
      handleAdd(type, button);
    }
  };

  const removeTopTier = (
    topTierButton: any,
    secondaryButtons: any,
    currentButton: any,
  ) => {
    // Update selectedArray to remove any matching topTierButton
    //we need to be sure to delete the secondary ones as well, that'll remove details completely
    console.log(
      "removing top tier button:",
      topTierButton,
      "secondaryButtons:",
      secondaryButtons,
      "type:",
      type,
      "currentButton:",
      currentButton,
    );
    const updatedArray = selectedArray.filter(
      (item: any) => item !== topTierButton && !secondaryButtons.includes(item),
    );
    setArray(updatedArray);
    handleDelete(topTierButton, currentButton);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className={`ButtonOptionsComponentContainer mt-2 ${addClasses}`}>
      <div
        className={`ButtonsContainer mb-4 flex justify-center gap-4 ${flexOpt}`}
      >
        <label
          htmlFor={title}
          className={`ButtonOptionsTitle self-start pt-2 ${textColor}`}
        >
          {title}
          {required && (
            <span
              className={`required flex-end text-md m-0 pl-1 text-start align-baseline ${textColor}`}
            >
              *
            </span>
          )}
        </label>
        <div className="Buttons flex justify-center gap-4">
          {buttons.map((button: Button, index: number) => {
            return (
              <div
                className="ButtonAndOptions flex flex-col items-center"
                key={index}
              >
                <SiteButton
                  variant="hollow"
                  aria={button.title}
                  size={buttonSize || null}
                  colorScheme={
                    betterColorArray[index % betterColorArray.length]
                  }
                  onClick={() => buttonClick(button.title)}
                  addClasses={`text-nowrap ${classesForButtons || ""}`}
                  isSelected={
                    selectedArray.includes(button.title) ||
                    button.options.some((option) =>
                      button.title.includes(option),
                    )
                  }
                >
                  {button.title}
                </SiteButton>
                {selectedArray.includes(button.title) && (
                  <div className="SecondTierOptions -mb-10 flex flex-col items-center">
                    <ButtonOptionsComponent
                      type={button.type}
                      buttons={button.options}
                      selectedArray={button.array}
                      handleAdd={handleAdd}
                      handleDelete={handleDelete}
                      classesForButtons="px-6"
                      flexOpt="flex-col gap-2"
                      buttonContainerClasses="flex-col items-center gap-3 self-center"
                      addClasses="-mb-1"
                    />
                    <SiteButton
                      aria="removeButton"
                      variant="filled"
                      size="smallCircle"
                      colorScheme="f1"
                      onClick={() =>
                        removeTopTier(button.type, button.options, button.title)
                      }
                    >
                      X
                    </SiteButton>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {errors?.message && (
        <p className={`m-0 p-0 text-xs font-medium ${errorColor}`}>
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default TieredButtonOptionsComponent;
