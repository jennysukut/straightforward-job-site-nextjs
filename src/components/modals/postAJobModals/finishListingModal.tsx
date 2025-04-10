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

export default function FinishListingModal(jobId: any, url: string) {
  const { job, setJob } = useJob();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const { hideModal } = useModal();
  const router = useRouter();

  const redirect = () => {
    console.log("need to redirect to the relevant url");
    if (url !== "listing") {
      router.push(url);
    }
  };

  return (
    <div
      className={`FinishListingModal flex flex-col items-center gap-10 ${textColor}`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        complete your listing
      </Dialog.Title>
      {/* <p className="SubscriptionSubtitle -mt-10 text-center font-medium italic">
        per round{" "}
      </p> */}

      <div className="ButtonContainer m-0 -my-4 self-end">
        <SiteButton
          addClasses="w-32"
          variant="hollow"
          aria="Enter"
          colorScheme="b6"
          onClick={redirect}
        >
          continue
        </SiteButton>
      </div>
    </div>
  );
}
