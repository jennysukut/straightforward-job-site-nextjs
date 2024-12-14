"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";

export default function SavedJobs() {
  const { accountType } = usePageContext();
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { jobListings } = useJobListings();

  const [colorArray, setColorArray] = useState<[]>([]);

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
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
