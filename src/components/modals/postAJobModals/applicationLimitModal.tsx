import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import { useMutation } from "@apollo/client";
import { CREATE_JOB_LISTING_ROUND } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";

export default function ApplicationLimitModal({ currentLimit }: any) {
  const { job, setJob } = useJob();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const { setPageType } = usePageContext();
  const { hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [applicationLimit, setApplicationLimit] = useState("25");
  const [createJobListingRound, { loading, error }] = useMutation(
    CREATE_JOB_LISTING_ROUND,
  );

  const handleSubmit = async () => {
    setDisabledButton(true);

    try {
      const response = await createJobListingRound({
        variables: {
          id: job?.id,
          applicationLimit: Number(applicationLimit),
          roundNumber: 1,
          completed: "appLimit",
        },
      });

      // console.log(
      //   "Round Details saved successfully, Details:",
      //   response.data.createJobListingRound,
      // );
      setJob({
        ...job,
        applicationLimit: applicationLimit,
        roundNumber: "1",
        completed: "appLimit",
      });

      hideModal();
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  useEffect(() => {
    if (currentLimit) {
      setApplicationLimit(currentLimit);
    }
  }, []);

  useEffect(() => {
    setPageType("Business");
  }, [setPageType]);

  return (
    <div
      className={`SubscriptionModal flex flex-col items-center gap-10 ${textColor}`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        application limit
      </Dialog.Title>
      <p className="SubscriptionSubtitle -mt-10 text-center font-medium italic">
        per round{" "}
      </p>

      <input
        type="range"
        min="10"
        max="50"
        step="5"
        value={applicationLimit}
        className={`ScaleInput custom-range w-[85%] ${colorOption === "highContrast" ? "highContrast" : ""}`}
        onChange={(e) => setApplicationLimit(e.target.value)}
      />
      <p className="Details text-md">
        max applications per round: {applicationLimit}
      </p>
      <p className={`Details -mt-4 text-sm italic ${secondaryTextColor}`}>
        we recommend 25
      </p>
      <div className="ButtonContainer m-0 -my-4 self-end">
        <SiteButton
          addClasses="w-32"
          variant="hollow"
          aria="Enter"
          colorScheme="b6"
          onClick={handleSubmit}
          isSelected={disabledButton}
        >
          {disabledButton && !currentLimit
            ? "Generating..."
            : disabledButton && currentLimit
              ? "Updating..."
              : "select"}
        </SiteButton>
      </div>
    </div>
  );
}
