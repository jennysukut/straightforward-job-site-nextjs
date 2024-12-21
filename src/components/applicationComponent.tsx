"use client";

import SiteButton from "./siteButton";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import ButtonOptionsComponent from "./buttonOptionsComponent";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";

interface ApplicationProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  business?: string;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
  selectedApps?: Array<string>;
  handleAdd?: any;
  handleDelete?: any;
  appOptions?: Array<string>;
}

const Application: React.FC<ApplicationProps> = ({
  id,
  colorArray,
  index,
  business,
  jobId,
  dateOfApp,
  appStatus,
  selectedApps,
  handleAdd,
  handleDelete,
  appOptions,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const [jobClicked, setJobClicked] = useState(false);
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const buttonClick = (id: string) => {
    if (selectedApps?.includes(id)) {
      handleDelete("selectedApps", id);
    } else {
      handleAdd("selectedApps", id);
    }
  };

  const viewDetails = () => {
    router.push(`/listing/${jobId}`);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className="Application flex w-full flex-col gap-3" key={id}>
      <div className="MainAppButtons flex items-center gap-4">
        <SiteButton
          size="smallCircle"
          colorScheme="f1"
          aria="selectButton"
          variant="hollow"
          isSelected={selectedApps?.includes(id)}
          onClick={() => buttonClick(id)}
        ></SiteButton>
        <SiteButton
          aria="JobApplication"
          variant="hollow"
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          size="wide"
          onClick={() => setJobClicked(!jobClicked)}
        >
          <div className="AppInfo flex justify-between">
            <p className="TitleAndBusiness">
              {`${selectedJob?.jobTitle} | ${business}`}
            </p>
            <p className="Details">{`${dateOfApp} | ${appStatus}`}</p>
          </div>
        </SiteButton>
      </div>

      {jobClicked && (
        <div className="SecondaryButtons ml-14 mt-2 flex gap-4">
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[0]}
          >
            view listing
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[1]}
          >
            go to company page
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[2]}
          >
            review application
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[3]}
          >
            message business
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[4]}
          >
            retract
          </SiteButton>
        </div>
      )}
    </div>
  );
};

export default Application;
