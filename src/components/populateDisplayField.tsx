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
  type: string;
  test: string;
  displayOption1: string;
  displayOption2: string;
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
  type,
  aria,
  test,
  selectedArray,
  addModal,
  displayOption1,
  displayOption2,
  ...props
}) => {
  const { showModal } = useModal();

  return (
    <div>
      <InfoBox
        variant="hollow"
        size="extraSmall"
        aria="awards"
        canAdd
        width="extraWide"
        title={title}
        addClasses="flex justify-between w-full"
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
                title={`${item[displayOption1]}, ${item[displayOption2]}`}
                addClasses="flex w-[90%] self-end justify-between"
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
