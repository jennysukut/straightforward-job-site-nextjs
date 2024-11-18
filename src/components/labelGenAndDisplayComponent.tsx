"use client";

import React from "react";
import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";

interface LabelGeneratorAndDisplayComp {
  handleAdd: Function;
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  selectedArray: Array<any>;
  handleDelete: Function;
  placeholder: string;
  colorArray: Array<any>;
  name: string;
  variant: any;
}

const LabelGeneratorAndDisplayComp: React.FC<LabelGeneratorAndDisplayComp> = ({
  handleAdd,
  value,
  handleInputChange,
  errors,
  selectedArray,
  handleDelete,
  placeholder,
  colorArray,
  name,
  variant,
  ...props
}) => {
  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria={name}
        canAdd
        addClasses="flex"
        type={name}
        addClick={() => {
          handleAdd(name);
        }}
      >
        <input
          type={name}
          placeholder={placeholder}
          value={value}
          name={name}
          className="text-md w-[98%] self-start bg-transparent text-midnight placeholder:text-jade/50 focus:outline-none"
          onChange={handleInputChange}
        />
      </InfoBox>
      {errors.skills?.message && (
        <p className="m-0 -mt-4 p-0 text-xs font-medium text-orange">
          {errors.skills.message.toString()}
        </p>
      )}
      {selectedArray.length >= 1 ? (
        <div className="SkillsContainer flex flex-wrap gap-2">
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
