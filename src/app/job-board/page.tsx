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

export default function JobBoard() {
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

  const renderJobListings = () => {
    return jobListings?.map((job) => (
      <JobPost
        job={job}
        index={job.jobId}
        colorArray={colorArray}
        key={job.jobId}
        saveClick={() => saveClick(job.jobId)}
      />
    ));
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      <div className="Searchbar">SearchBar Here</div>
      <div className="JobListings flex flex-wrap justify-center gap-8">
        {renderJobListings()}
      </div>
    </div>
  );
}
