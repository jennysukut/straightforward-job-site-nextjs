"use client";

import React, { useState } from "react";
import InfoBox from "./infoBox";
import { useModal } from "@/contexts/ModalContext";
import { useColors } from "@/contexts/ColorContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

// Define the props type for addModal
interface AddModalProps {
  handleAdd: Function;
  canDelete?: boolean;
  handleDelete?: Function;
  itemInfo?: any;
  handleUpdate?: Function;
  id?: number;
}

interface PopulateDisplayField {
  handleAdd: Function;
  handleDelete: Function;
  handleUpdate: Function;
  title: string;
  aria: string;
  addModal: React.ReactNode;
  selectedArray: Array<any>;
  displayOption1: string;
  displayOption2?: string;
  addClasses?: string;
  displayPunct?: string;
  required?: boolean;
  id?: number;
  height?: any;
  errors?: any;
}

// Define the interface for the items in selectedArray
interface Item {
  [key: string]: any; // Adjust this to the specific structure of your items
}

const PopulateDisplayField: React.FC<PopulateDisplayField> = ({
  handleAdd,
  handleDelete,
  handleUpdate,
  title,
  aria,
  selectedArray,
  addModal,
  displayOption1,
  displayOption2,
  addClasses,
  displayPunct,
  required,
  id,
  height,
  errors,
  ...props
}) => {
  const { showModal } = useModal();
  const { colorOption } = useColors();
  const { textColor, errorColor, titleColor } = useColorOptions();

  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
      {required && (
        <p
          className={`required flex-end -mb-[3rem] -mr-3 -mt-2 text-end text-2xl ${textColor}`}
        >
          *
        </p>
      )}
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria="populateDisplayField"
        canAdd
        width="extraWide"
        title={title}
        addClasses={`flex justify-between w-full ${addClasses}`}
        addClick={() => {
          if (React.isValidElement(addModal)) {
            showModal(
              React.cloneElement(
                addModal as React.ReactElement<AddModalProps>,
                { handleAdd, id: id },
              ),
            );
          }
        }}
      />
      {selectedArray.length > 0 && (
        <div className="AwardsDetailsContainer flex flex-col gap-4">
          {selectedArray.map((item: Item, index: number) => {
            return (
              <InfoBox
                key={index}
                variant="hollow"
                aria={title}
                size="extraSmall"
                canEdit
                width="extraWide"
                title={
                  displayOption2 && item[displayOption2]
                    ? displayPunct
                      ? `${item[displayOption1]} ${displayPunct} ${item[displayOption2]}`
                      : `${item[displayOption1]}, ${item[displayOption2]}`
                    : item[displayOption1]
                }
                addClasses={`flex w-[90%] self-end justify-between ${titleColor}`}
                editClick={() => {
                  if (React.isValidElement(addModal)) {
                    showModal(
                      React.cloneElement(
                        addModal as React.ReactElement<AddModalProps>,
                        {
                          handleAdd,
                          canDelete: true,
                          handleDelete,
                          itemInfo: item,
                          handleUpdate,
                        },
                      ),
                    );
                  }
                }}
              />
            );
          })}
        </div>
      )}
      {errors?.message && (
        <p className={`m-0 -mt-4 p-0 text-xs font-medium ${errorColor}`}>
          {errors.message.toString()}
        </p>
      )}
    </div>
  );
};

export default PopulateDisplayField;
