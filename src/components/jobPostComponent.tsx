"use client";

import Image from "next/image";
import InfoBox from "./infoBox";
import SiteButton from "./siteButton";

import { smallShadowColors } from "@/lib/stylingData/smallShadowColors";
import { useColors } from "@/contexts/ColorContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

import {
  LargeShadowColorOption,
  largeShadowColors,
} from "@/lib/stylingData/largeShadowColors";

interface JobPostProps extends React.HTMLAttributes<HTMLDivElement> {
  job: any;
  colorArray: Array<string>;
  index: any;
  saveJob?: any;
}

const JobPost: React.FC<JobPostProps> = ({
  job,
  colorArray,
  index,
  saveJob,
}) => {
  const { colorOption } = useColors();

  const boxOptions =
    colorOption === "highContrast"
      ? "border-cobalt drop-shadow-cobalt text-cobalt"
      : "border-jade drop-shadow-jade text-jade";

  return (
    <div className="JobListing" key={job.jobId}>
      <InfoBox
        variant="filled"
        colorScheme={colorArray[index % colorArray.length] as ButtonColorOption}
        aria="jobListing"
        size="profile"
      >
        <div className="AppLimitSaveButton -mt-6 flex items-start justify-between pb-8">
          <div className="AppLimit -ml-4 text-xs font-medium italic">
            {job.job?.numberOfApps}/{job.job?.appLimit} apps
          </div>
          <button className="SaveButton -mr-4 hover:saturate-150">
            <SiteButton
              aria="addJobsButton"
              size="extraSmallCircle"
              variant="filled"
              onClick={saveJob}
              colorScheme={
                colorArray[index % colorArray.length] as ButtonColorOption
              }
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
            {capitalizeFirstLetter(job.job?.experienceLevel || "junior")} Level
          </p>
          {/* divider */}
          <Image
            src="/listing-divider.svg"
            alt="listingDivider"
            width={240}
            height={0}
            className="my-8 opacity-80"
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
  );
};

export default JobPost;
