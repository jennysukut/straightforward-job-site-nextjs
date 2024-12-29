"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import JobPost from "@/components/jobBoardComponents/jobPostComponent";

export default function SavedJobs() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { jobListings } = useJobListings();
  const { hideModal } = useModal();

  const [colorArray, setColorArray] = useState<[]>([]);

  const saveClick = (jobId: any) => {
    if (fellow?.savedJobs?.includes(jobId)) {
      setFellow({
        ...fellow,
        savedJobs: fellow.savedJobs.filter((id) => id !== jobId),
      });
    } else {
      setFellow({
        ...fellow,
        savedJobs: [...(fellow?.savedJobs || []), jobId],
      });
    }
    hideModal();
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  console.log(fellow?.savedJobs);

  return (
    <div
      className={`SavedJobsPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor} w-[84%] max-w-[1600px] gap-8 self-center`}
    >
      <h1 className="SavedJobsTitle -mb-2 mr-20 self-end">Your Saved Jobs:</h1>
      <div className="JobListings flex flex-wrap items-center justify-center gap-8 self-center">
        {fellow?.savedJobs?.map((savedJobId: any, index: number) => {
          const job = jobListings?.find((job) => job.jobId === savedJobId);
          return job ? (
            <JobPost
              job={job}
              index={index}
              colorArray={colorArray}
              key={savedJobId}
              saveClick={() => saveClick(job.jobId)}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
