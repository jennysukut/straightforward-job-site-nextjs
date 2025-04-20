import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { stageList } from "@/lib/stageList";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_STATUS } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import RejectAppModal from "./rejectAppModal";

export default function SetAppStatusModal({
  application,
  applicant,
  appStatus,
  // updateStatus,
}: any) {
  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { applications, setApplications } = useApplications();
  const [clickedButton, setClickedButton] = useState("");
  const [updateStatus, { loading, error }] = useMutation(UPDATE_STATUS);
  const router = useRouter();

  const rejectClick = () => {
    // showModal for rejection confirmation
  };

  const confirmReject = () => {
    // code here after rejection is verified
  };

  const nextStage = () => {
    // find the interviewProcess for the jobListing so we can see how many stages there are

    const currentIndex = stageList.findIndex((stage) => stage === appStatus);
    return currentIndex !== -1 && currentIndex < stageList.length - 1
      ? stageList[currentIndex + 1]
      : null;
  };

  const sendJobOffer = () => {
    setClickedButton("sendJobOffer");

    if (applications) {
      setApplications(
        applications.map((app) =>
          app.id === application.id
            ? {
                ...app,
                appStatus: "offer",
                jobOfferBeingSent: true,
              }
            : app,
        ),
      );
    }
    router.push(`/messages/${application.id}`);
    hideModal();
  };

  const setStatus = async () => {
    setClickedButton("nextStage");
    console.log("trying to update the app's status:", nextStage());

    try {
      const response = await updateStatus({
        variables: {
          appId: application.id,
          status: nextStage,
        },
      });
      console.log(
        "Status updated successfully, Details:",
        response.data.updateStatus,
      );
      hideModal();
      //choose what to do for each status update and plug in here
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="SetAppStatusModal flex w-[350px] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Set Status for ${applicant}`}
      </Dialog.Title>
      <div className="Buttons mt-4 flex flex-col items-start gap-y-4">
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="c1"
          aria="delete"
          addClasses="w-[250px]"
          onClick={setStatus}
          isSelected={clickedButton === "nextStage"}
        >
          continue to {nextStage()}
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[250px]"
          onClick={() =>
            showModal(
              <RejectAppModal
                applicant={applicant}
                application={application}
              />,
            )
          }
        >
          reject
        </SiteButton>
        <SiteButton
          variant="hollow"
          size="large"
          colorScheme="b3"
          aria="go back"
          addClasses="w-[250px]"
          onClick={() => sendJobOffer()}
          isSelected={clickedButton === "sendJobOffer"}
        >
          make job offer
        </SiteButton>
      </div>
    </div>
  );
}
