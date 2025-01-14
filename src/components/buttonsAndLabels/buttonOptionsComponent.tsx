"use client";

import React, { useState, useEffect } from "react";
import SiteButton from "./siteButton";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

interface ButtonOptionsComponent {
  type: string;
  title?: string;
  errors?: any;
  buttons: any;
  selectedArray: any;
  handleAdd: Function;
  required?: boolean;
  handleDelete: Function;
  classesForButtons?: string;
  addClasses?: string;
  flexOpt?: string;
  buttonSize?: any;
  buttonContainerClasses?: string;
  deleteButton?: boolean;
  deleteClick?: any;
}

const ButtonOptionsComponent: React.FC<ButtonOptionsComponent> = ({
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
  buttonSize = "default",
  buttonContainerClasses,
  deleteButton,
  deleteClick,
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

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className={`ButtonOptionsComponentContainer mt-2 ${addClasses}`}>
      <div
        className={`ButtonsContainer mb-4 flex ${flexOpt ? flexOpt : "justify-center gap-6"}`}
      >
        {title && (
          <label
            htmlFor={title}
            className={`ButtonOptionsTitle self-center ${textColor}`}
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
        )}

        <div
          className={`Buttons flex ${buttonContainerClasses ? buttonContainerClasses : "justify-center gap-6"}`}
        >
          {buttons.map((button: string, index: any) => {
            return (
              <SiteButton
                variant="hollow"
                key={button}
                aria={button}
                size={buttonSize || null}
                colorScheme={betterColorArray[index % betterColorArray.length]}
                onClick={() => buttonClick(button)}
                addClasses={`text-nowrap ${classesForButtons || ""}`}
                isSelected={selectedArray.includes(button)}
              >
                {button}
              </SiteButton>
            );
          })}
          {deleteButton && (
            <SiteButton
              aria="removeButton"
              size="smallCircle"
              variant="filled"
              colorScheme="d2"
              addImage="bg-[url('/top-tier-delete.svg')]"
              addClasses={`bg-center mt-2`}
              onClick={deleteClick}
            />
          )}
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

export default ButtonOptionsComponent;
