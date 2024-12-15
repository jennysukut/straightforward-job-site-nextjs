"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";

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
      className={`SavedJobsPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      <div className="Searchbar">Saved Jobs</div>
      <div className="JobListings flex gap-8">
        {fellow?.savedJobs?.map((savedJobId: any) => {
          const job = jobListings?.find((job) => job.jobId === savedJobId);
          return job ? (
            <JobPost
              job={job}
              index={savedJobId}
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
