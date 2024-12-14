"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { jobListings } = useJobListings();

  const [colorArray, setColorArray] = useState<[]>([]);

  const saveJob = (jobId: any) => {
    console.log("saving this job:", jobId);
    setFellow({
      ...fellow,
      savedJobs: [...(fellow?.savedJobs || []), jobId],
    });
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  console.log(fellow?.savedJobs);

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      <div className="Searchbar">SearchBar Here</div>
      <div className="JobListings flex gap-8">
        {jobListings?.map((job) => (
          <JobPost
            job={job}
            index={job.jobId}
            colorArray={colorArray}
            key={job.jobId}
            saveJob={() => saveJob(job.jobId)}
          />
        ))}
      </div>
    </div>
  );
}
