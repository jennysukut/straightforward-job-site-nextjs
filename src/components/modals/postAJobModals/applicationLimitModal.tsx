import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";

export default function ApplicationLimitModal(isBeingUpdated: any) {
  const { job, setJob } = useJob();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const { setPageType } = usePageContext();
  const { hideModal } = useModal();
  const [applicationLimit, setApplicationLimit] = useState("25");

  const handleSubmit = () => {
    setJob({
      ...job,
      applicationLimit: applicationLimit,
    });

    hideModal();
  };

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
        >
          select
        </SiteButton>
      </div>
    </div>
  );
}
