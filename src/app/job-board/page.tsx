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
            <InfoBox
              variant="filled"
              colorScheme="b1"
              aria="jobListing"
              size="profile"
            >
              <div className="AppLimitSaveButton -mt-6 flex items-start justify-between pb-8">
                <div className="AppLimit -ml-4 text-xs font-medium italic">
                  {job.job?.numberOfApps}/{job.job?.appLimit} apps
                </div>
                <button className="SaveButton -mr-4 opacity-100 hover:opacity-80">
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
              <div className="JobDetails flex flex-col gap-1 text-center">
                <h2 className="JobTitle mb-1">{job.job?.jobTitle}</h2>
                <p className="BusinessName font-medium italic leading-8">
                  with {job.job?.businessName}
                </p>
                <p className="ExperienceLevel text-sm font-normal">
                  {capitalizeFirstLetter(job.job?.experienceLevel || "junior")}{" "}
                  Level
                </p>
                <Image
                  src="/listing-divider.svg"
                  alt="listingDivider"
                  width={240}
                  height={0}
                  className="my-8"
                ></Image>
                {job.job?.locationOption === "remote" && (
                  <p className="LocationOption">100% Remote</p>
                )}
                {job.job?.locationOption === "on-site" && (
                  <p className="LocationOption">On-Site</p>
                )}
                {/* {job.job?.locationOption === "hybrid" && (
                  <p className="LocationOption">{job.job?.hybridDetails}</p>
                )} */}
                <p className="PositionType font-normal italic">
                  {capitalizeFirstLetter(job.job?.positionType || "")} Position
                </p>
                <p className="PayDetails">
                  {job.job?.payDetails.payscaleMin} -{" "}
                  {job.job?.payDetails.payscaleMax}
                </p>
                <p className="PayOption italic">
                  {capitalizeFirstLetter(job.job?.payDetails.payOption || "")}
                </p>
              </div>
            </InfoBox>
          </div>
        ))}
      </div>
    </div>
  );
}
