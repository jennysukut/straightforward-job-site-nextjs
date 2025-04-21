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
import ApplicationLimitModal from "./applicationLimitModal";

export default function FinishListingModal({ completed }: any) {
  const { job, setJob } = useJob();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const { hideModal, showModal } = useModal();
  const router = useRouter();

  let redirectUrl: any;
  if (completed === "create") {
    redirectUrl = "/post-a-job/step1";
  } else if (completed === "step1") {
    redirectUrl = "/post-a-job/step2";
  } else if (completed === "step2") {
    redirectUrl = "/post-a-job/step3";
  } else if (completed === "step3") {
    redirectUrl = "/post-a-job/step4";
  } else if (completed === "step4") {
    redirectUrl = "/post-a-job/step5";
  } else if (completed === "step5") {
    redirectUrl = "listing";
  }

  const redirect = () => {
    if (redirectUrl !== "listing") {
      router.push(redirectUrl);
    } else if (redirectUrl === "listing") {
      showModal(<ApplicationLimitModal />);
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

      <div className="ButtonContainer m-0 -my-4 self-center">
        <SiteButton
          addClasses="w-32"
          variant="hollow"
          size="medium"
          aria="continue"
          colorScheme="b6"
          onClick={redirect}
        >
          continue
        </SiteButton>
      </div>
    </div>
  );
}
