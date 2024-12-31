"use client";

import SiteButton from "../buttonsAndLabels/siteButton";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import ButtonOptionsComponent from "../buttonsAndLabels/buttonOptionsComponent";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";

interface ApplicationProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
  selectedApps?: Array<string>;
  handleAdd?: any;
  handleDelete?: any;
  setCurrentJob?: any;
  setSelectedColor?: any;
}

const Application: React.FC<ApplicationProps> = ({
  id,
  colorArray,
  index,
  jobId,
  appStatus,
  selectedApps,
  handleAdd,
  handleDelete,
  setCurrentJob,
  setSelectedColor,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const buttonClick = (id: string) => {
    if (selectedApps?.includes(id)) {
      handleDelete("selectedApps", id);
      setCurrentJob("");
      setSelectedColor("");
    } else {
      handleAdd("selectedApps", id);
      setCurrentJob(selectedJob);
      setSelectedColor(colorArray[index % colorArray.length]);
    }
  };

  const jobClicked = selectedApps?.includes(id);

  const viewListing = () => {
    router.push(`/listing/${jobId}`);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className="Application flex w-full flex-col gap-3" key={id}>
      <div className="MainAppButtons flex items-center gap-4">
        {/* <SiteButton
          size="smallCircle"
          colorScheme="f1"
          aria="selectButton"
          variant="hollow"
          isSelected={selectedApps?.includes(id)}
          onClick={() => buttonClick(id)}
        ></SiteButton> */}
        <SiteButton
          aria="JobApplication"
          variant="hollow"
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          size="wide"
          onClick={() => buttonClick(id)}
          isSelected={selectedApps?.includes(id)}
        >
          <div className="AppInfo flex justify-between">
            <p className="TitleAndBusiness text-md">
              {`${selectedJob?.jobTitle} | ${selectedJob?.businessName}`}
            </p>
            <p className="Details self-center text-sm">{`${appStatus}`}</p>
          </div>
        </SiteButton>
      </div>

      {jobClicked && (
        <div className="SecondaryButtons mb-1 ml-6 mt-1 flex flex-wrap gap-4">
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[0]}
            onClick={viewListing}
          >
            view listing
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[1]}
          >
            company page
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[2]}
          >
            your app
          </SiteButton>
        </div>
      )}
    </div>
  );
};

export default Application;
