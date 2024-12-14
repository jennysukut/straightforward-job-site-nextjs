"use client";

import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import JobPost from "@/components/jobPostComponent";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { textColor } = useColorOptions();
  const { jobListings } = useJobListings();

  const [colorArray, setColorArray] = useState<[]>([]);

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
  }, []);

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      <div className="Searchbar">SearchBar Here</div>
      <div className="JobListings flex gap-8">
        {jobListings?.map((job, jobId) => (
          <JobPost
            job={job}
            index={jobId}
            colorArray={colorArray}
            key={jobId}
          />
        ))}
      </div>
    </div>
  );
}
