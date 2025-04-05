"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect, useState } from "react";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useJobListings } from "@/contexts/JobListingsContext";

import RejectionMessageOptionsComponent from "@/components/amsComponents/rejectionMessageOptions";

// TODO: Make sure this URL is only accessible by the business whose ID matches the currentApp.businessId

export default function Application({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();
  const { applications } = useApplications();
  const { jobListings } = useJobListings();

  const [chosenMessage, setChosenMessage] = useState("");

  const currentApp = applications?.find((app: any) => app.id === params.id);

  const currentJob = jobListings?.find(
    (job: any) => job.jobId === currentApp?.jobId,
  )?.job;
  // const currentFellow = fellows?.find((fellow: any) => {
  //   return fellow.id === currentApp?.applicant;
  // })?.name;

  const currentFellow = "test current fellow";
  useEffect(() => {
    setChosenMessage(params.rejectionType);
  }, []);

  console.log(chosenMessage);

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
