"use client";

import React, { useState } from "react";
import Image from "next/image";
import SiteButton from "./siteButton";
import { useColors } from "@/contexts/ColorContext";

interface FormSubmissionComponent {
  canDelete?: boolean;
  clickDelete?: any;
  disabledButton: boolean;
  handleSubmit: any;
  addText: string;
  addingText: string;
}

const FormSubmissionButton: React.FC<FormSubmissionComponent> = ({
  canDelete,
  clickDelete,
  disabledButton,
  handleSubmit,
  addText,
  addingText,
  ...props
}) => {
  const { colorOption } = useColors();
  return (
    <div className="FormSubmissionButtonContainer flex flex-col gap-2 pt-4">
      {canDelete ? (
        <div className="ButtonContainer -mb-6 -mt-4 flex justify-between">
          {colorOption === "highContrast" && (
            <button onClick={clickDelete}>
              <Image
                className="DeleteButton opacity-75 hover:opacity-100"
                src="/cobalt-delete-icon.svg"
                width={18}
                height={18}
                alt="delete"
              />
            </button>
          )}
          {colorOption === "standard" && (
            <button onClick={clickDelete}>
              <Image
                className="DeleteButton opacity-75 hover:opacity-100"
                src="/delete-icon.svg"
                width={18}
                height={18}
                alt="delete"
              />
            </button>
          )}
          {colorOption === "seasonal" && (
            <button onClick={clickDelete}>
              <Image
                className="DeleteButton opacity-75 hover:opacity-100"
                src="/cocoa-delete-icon.svg"
                width={18}
                height={18}
                alt="delete"
              />
            </button>
          )}
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit}
            disabled={disabledButton}
            addClasses="px-8"
          >
            {disabledButton ? "Updating..." : "update"}
          </SiteButton>
        </div>
      ) : (
        <div className="ButtonContainer -mb-6 -mt-4 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit}
            disabled={disabledButton}
            addClasses="px-8"
          >
            {disabledButton ? addingText : addText}
          </SiteButton>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionButton;
