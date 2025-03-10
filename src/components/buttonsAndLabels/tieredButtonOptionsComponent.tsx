"use client";

import React, { useState, useEffect } from "react";
import SiteButton from "./siteButton";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import ButtonOptionsComponent from "./buttonOptionsComponent";

// Define the interface for button objects
interface Button {
  title: any;
  initialTitle?: string;
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
  horizontalSecondaryButtons?: boolean;
  secondaryButtonClasses?: string;
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
  horizontalSecondaryButtons,
  secondaryButtonClasses,
}) => {
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const { textColor, errorColor } = useColorOptions();

  const buttonClick = (button: string) => {
    if (selectedArray.includes(button)) {
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
    const updatedArray = selectedArray.filter(
      (item: any) =>
        item !== topTierButton &&
        !secondaryButtons.includes(item) &&
        !currentButton,
    );
    setArray(updatedArray);
    handleDelete(topTierButton, currentButton);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className={`ButtonOptionsComponentContainer ${addClasses}`}>
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
                className={`ButtonAndOptions flex flex-col ${horizontalSecondaryButtons ? "items-start" : "items-center"} `}
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
                  <div
                    className={`SecondTierOptions ${horizontalSecondaryButtons ? "ml-2 flex-row gap-1 align-middle" : "-mb-10 flex-col"} flex items-center`}
                  >
                    <ButtonOptionsComponent
                      type={button.type}
                      buttons={button.options}
                      selectedArray={button.array}
                      handleAdd={handleAdd}
                      handleDelete={handleDelete}
                      classesForButtons="px-6"
                      flexOpt={`${secondaryButtonClasses}`}
                      buttonContainerClasses={`${horizontalSecondaryButtons ? "flex-row" : "flex-col items-center self-center"} ${secondaryButtonClasses} gap-3`}
                      addClasses="-mb-1"
                      deleteButton
                      deleteClick={() =>
                        removeTopTier(
                          button.type,
                          button.options,
                          button.initialTitle,
                        )
                      }
                    />
                    {/* <SiteButton
                      aria="removeButton"
                      size="smallCircle"
                      variant="filled"
                      colorScheme="d2"
                      addImage="bg-[url('/top-tier-delete.svg')]"
                      addClasses={`bg-center ${horizontalSecondaryButtons ? "mt-2 ml-1" : ""} `}
                      onClick={() =>
                        removeTopTier(
                          button.type,
                          button.options,
                          button.initialTitle,
                        )
                      }
                    /> */}
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
