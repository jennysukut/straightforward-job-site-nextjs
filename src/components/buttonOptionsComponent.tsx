"use client";

import React, { useState, useEffect } from "react";
import SiteButton from "./siteButton";
import { getRandomColorArray } from "@/utils/getRandomColorScheme";

interface ButtonOptionsComponent {
  type: string;
  title: string;
  errors: any;
  buttons: any;
  selectedArray: any;
  handleAdd: Function;
  required?: boolean;
  handleDelete: Function;
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
}) => {
  const [colorArray, setColorArray] = useState(Array<any>);

  const buttonClick = (button: string) => {
    if (selectedArray.includes(button)) {
      handleDelete(type, button);
    } else {
      handleAdd(type, button);
    }
  };

  useEffect(() => {
    const colors = getRandomColorArray(buttons.length);
    setColorArray(colors);
  }, []);

  return (
    <div className="ButtonOptionsComponentContainer mt-2">
      <div className="ButtonsContainer mb-4 flex gap-6">
        <h2 className="ButtonOptionsTitle text-jade">
          {title}
          {required && (
            <span className="required flex-end m-0 pl-1 text-start align-baseline text-2xl text-jade">
              *
            </span>
          )}
        </h2>
        {buttons.map((button: string, index: any) => {
          return (
            <SiteButton
              variant="hollow"
              key={button}
              aria={button}
              colorScheme={colorArray[index % colorArray.length]}
              onClick={() => buttonClick(button)}
              addClasses="text-nowrap"
              isSelected={selectedArray.includes(button)}
            >
              {button}
            </SiteButton>
          );
        })}
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
