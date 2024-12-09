"use client";

import React, { useState, useEffect } from "react";
import SiteButton from "./siteButton";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";

interface ButtonOptionsComponent {
  type: string;
  title?: string;
  errors?: any;
  buttons: any;
  selectedArray?: any;
  handleAdd: Function;
  required?: boolean;
  handleDelete: Function;
  classesForButtons?: string;
  addClasses?: string;
  flexOpt?: string;
  buttonSize?: any;
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
}) => {
  const [colorArray, setColorArray] = useState(Array<any>);
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);

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
        className={`ButtonsContainer mb-4 flex justify-center gap-6 ${flexOpt}`}
      >
        <label
          htmlFor={title}
          className="ButtonOptionsTitle self-center text-jade"
        >
          {title}
          {required && (
            <span className="required flex-end text-md m-0 pl-1 text-start align-baseline text-jade">
              *
            </span>
          )}
        </label>
        <div className="Buttons flex justify-center gap-6">
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
        </div>
      </div>
      {errors?.message && (
        <p className="m-0 p-0 text-xs font-medium text-orange">
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default ButtonOptionsComponent;
