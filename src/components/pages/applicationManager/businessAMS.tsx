"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useModal } from "@/contexts/ModalContext";
import { Job } from "@/contexts/JobContext";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJobListings } from "@/contexts/JobListingsContext";

import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import PostedJobComponent from "@/components/amsComponents/postedJobComponent";

export default function BusinessAMS() {
  const { textColor } = useColorOptions();
  const { business } = useBusiness();
  const { jobListings } = useJobListings();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<string[]>([]);

  const filterJobs = (jobList: any) => {
    const filteredJobs = jobList.filter((job: any) => {
      const matchesBusiness = job.job.businessId === business?.id;

      return matchesBusiness;
    });
    setFilteredJobs(filteredJobs);
  };

  const renderJobs = () => {
    return filteredJobs?.map((job: any, index: number) => (
      <PostedJobComponent
        key={job.jobId}
        id={job.jobId}
        colorArray={colorArray}
        index={index}
        jobId={job.jobId}
      />
    ));
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
    filterJobs(jobListings);
  }, [jobListings, filterJobs]);

  return (
    <div
      className={`FellowAMSPage flex w-[84%] gap-8 self-center ${textColor} max-w-[1600px]`}
    >
      <div className="ApplicationList flex w-full flex-col gap-4">
        <div className="TitleDetails -mb-2 mr-14 text-right">
          <h1 className="AMSTitle">Your Job Listings</h1>
          <p className="Details font-semibold italic text-olive">
            Total Active Jobs: {filteredJobs.length}
          </p>
        </div>
        <div className="JobListings m-4 flex w-full flex-wrap items-center justify-center gap-14">
          {renderJobs()}
        </div>
      </div>
    </div>
  );
}
