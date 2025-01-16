"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useEffect, useState } from "react";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellows } from "@/contexts/FellowsContext";

import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";
import RejectionMessageOptionsComponent from "@/components/amsComponents/rejectionMessageOptions";

export default function Application({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();
  const { fellow } = useFellow();
  const { applications } = useApplications();
  const { jobListings } = useJobListings();
  const { fellows } = useFellows();

  const [showRejectOptions, setShowRejectionOptions] = useState(false);
  const [chosenMessage, setChosenMessage] = useState("");

  const currentApp = applications?.find((app: any) => app.id === params.id);
  const currentJob = jobListings?.find(
    (job: any) => job.jobId === currentApp?.jobId,
  )?.job;
  const currentFellow = fellows?.find((fellow: any) => {
    return fellow.id === currentApp?.applicant;
  })?.name;

  useEffect(() => {
    setCurrentPage("application");
    if (currentApp?.appIsBeingRejected !== "false") {
      setShowRejectionOptions(true);
      setChosenMessage(currentApp?.appIsBeingRejected || "");
    } else if (currentApp?.appIsBeingRejected === "false") {
      setShowRejectionOptions(false);
      setChosenMessage("");
    }
  }, [currentApp, setCurrentPage]);

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Fellow" && (
        <FellowProfile self={fellow} isOwn isApp appId={params.id} />
      )}
      {accountType === "Business" && showRejectOptions === false && (
        <FellowProfile hasId id="testId" isApp appId={params.id} />
      )}
      {accountType === "Business" && showRejectOptions === true && (
        <RejectionMessageOptionsComponent
          jobTitle={currentJob?.jobTitle}
          applicant={currentFellow}
          businessName={currentJob?.businessName}
          interviewer={currentJob?.interviewer}
          chosenMessage={chosenMessage}
          currentApp={currentApp}
        />
      )}
    </div>
  );
}
