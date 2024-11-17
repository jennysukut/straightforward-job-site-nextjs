"use client";

import React, { useState } from "react";
import InfoBox from "./infoBox";
import { useModal } from "@/contexts/ModalContext";

// Define the props type for addModal
interface AddModalProps {
  handleAdd: Function;
  canDelete?: boolean;
  handleDelete?: Function;
  itemInfo?: any;
  handleUpdate?: Function;
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
  ...props
}) => {
  const { showModal } = useModal();

  return (
    <div className="PopulateDisplayFieldContainer flex flex-col gap-8">
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria="awards"
        canAdd
        width="extraWide"
        title={title}
        addClasses={`flex justify-between w-full ${addClasses}`}
        addClick={() => {
          if (React.isValidElement(addModal)) {
            showModal(
              React.cloneElement(
                addModal as React.ReactElement<AddModalProps>,
                { handleAdd },
              ),
            );
          }
        }}
      />
      {selectedArray.length > 0 && (
        <div className="AwardsDetailsContainer flex flex-col gap-4">
          {selectedArray.map((item: Item) => {
            return (
              <InfoBox
                key={item.id}
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
                addClasses="flex w-[90%] self-end justify-between text-midnight"
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
    </div>
  );
};

export default PopulateDisplayField;
