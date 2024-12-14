"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";

import JobListing from "@/components/jobListing";
import SiteButton from "@/components/siteButton";
import InfoBox from "@/components/infoBox";
import Image from "next/image";

import { capitalizeFirstLetter } from "@/utils/textUtils";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { textColor } = useColorOptions();
  const { jobListings } = useJobListings();

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      Job Board Here
      <div className="JobListings flex gap-8">
        {jobListings?.map((job) => (
          <div className="JobListing" key={job.jobId}>
            <InfoBox variant="filled" colorScheme="b1" aria="jobListing">
              <div className="AppLimitSaveButton -mt-8 flex items-start justify-between">
                <div className="AppLimit -ml-10 mb-4 text-xs font-medium italic">
                  {job.job?.numberOfApps}/{job.job?.appLimit} apps
                </div>
                <button className="SaveButton -mr-10 opacity-100 hover:opacity-80">
                  {/* <Image
                    src="/save-job-icon.svg"
                    alt="editButton"
                    width={20}
                    height={20}
                  ></Image> */}
                  <SiteButton
                    aria="addJobsButton"
                    size="extraSmallCircle"
                    variant="filled"
                    colorScheme="b1"
                    addClasses="bg-center"
                    addImage="bg-[url('/save-job-icon.svg')]"
                  ></SiteButton>
                </button>
              </div>
              <div className="JobDetails text-center">
                <p className="JobTitle">{job.job?.jobTitle}</p>
                <p className="BusinessName font-medium italic">
                  {job.job?.businessName}
                </p>
                <p className="ExperienceLevel text-sm font-normal">
                  {capitalizeFirstLetter(job.job?.experienceLevel || "junior")}{" "}
                  Level
                </p>
              </div>
            </InfoBox>
          </div>
        ))}
      </div>
    </div>
  );
}
