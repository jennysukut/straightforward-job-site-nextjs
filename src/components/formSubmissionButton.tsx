"use client";

import React, { useState } from "react";
import Image from "next/image";
import SiteButton from "./siteButton";

interface FormSubmissionComponent {
  canDelete: boolean;
  clickDelete: any;
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
  return (
    <div className="FormSubmissionButtonContainer flex flex-col gap-2 pt-4">
      {canDelete ? (
        <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
          <button onClick={clickDelete}>
            <Image
              className="DeleteButton opacity-75 hover:opacity-100"
              src="/delete-icon.svg"
              width={18}
              height={18}
              alt="delete"
            />
          </button>
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
        <div className="ButtonContainer -mb-6 mt-6 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            {disabledButton ? addingText : addText}
          </SiteButton>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionButton;
