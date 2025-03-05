"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect, useState } from "react";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellows } from "@/contexts/FellowsContext";

import RejectionMessageOptionsComponent from "@/components/amsComponents/rejectionMessageOptions";

export default function Application({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();
  const { applications } = useApplications();
  const { jobListings } = useJobListings();
  const { fellows } = useFellows();

  const [chosenMessage, setChosenMessage] = useState("");

  const currentApp = applications?.find((app: any) => app.id === params.id);

  console.log(params);
  const currentJob = jobListings?.find(
    (job: any) => job.jobId === currentApp?.jobId,
  )?.job;
  const currentFellow = fellows?.find((fellow: any) => {
    return fellow.id === currentApp?.applicant;
  })?.name;

  useEffect(() => {
    if (
      currentApp?.appIsBeingRejected !== false &&
      currentApp?.rejectionMessage === ""
    ) {
      setChosenMessage("kindGeneral");
    } else if (
      currentApp?.appIsBeingRejected !== false &&
      currentApp?.rejectionMessage !== ""
    ) {
      setChosenMessage(currentApp?.rejectionMessage);
    } else if (currentApp?.appIsBeingRejected === false) {
      setChosenMessage("");
    }
  }, [currentApp?.appIsBeingRejected]);

  useEffect(() => {
    setCurrentPage("application");
  }, []);

  return (
    <div className="RejectionPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Business" && (
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
