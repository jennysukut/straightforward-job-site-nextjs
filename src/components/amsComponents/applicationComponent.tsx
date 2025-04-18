"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";

import SiteButton from "../buttonsAndLabels/siteButton";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";

interface ApplicationProps extends React.HTMLAttributes<HTMLDivElement> {
  app: any;
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
  viewCompanyDetails?: any;
  appDate?: any;
  currentJob?: any;
}

const Application: React.FC<ApplicationProps> = ({
  app,
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
  viewCompanyDetails,
  dateOfApp,
  currentJob,
}) => {
  const router = useRouter();
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const [clickedButton, setClickedButton] = useState("");

  // search through the jobListings to find the job with the matching jobId
  const jobClicked = selectedApps?.includes(id);

  const buttonClick = (id: string) => {
    if (selectedApps?.includes(id)) {
      handleDelete("selectedApps", id);
      setCurrentJob("");
      setSelectedColor("");
    } else {
      handleAdd("selectedApps", id);
      setCurrentJob(app.jobListing);
      setSelectedColor(colorArray[index % colorArray.length]);
    }
  };

  const viewListing = () => {
    setClickedButton("viewListing");
    router.push(`/ams/listing/${jobId}`);
  };

  // const viewApplication = () => {
  //   setClickedButton("viewApplication");
  //   router.push(`/application/${id}`);
  // };

  console.log("app:", app);
  const viewCompany = () => {
    setClickedButton("viewCompanyDetails");
    // viewCompanyDetails();
    router.push(`/business/${app.jobListing.business.id}`);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setBetterColorArray);
  }, []);

  return (
    <div className="Application flex w-full flex-col gap-3" key={id}>
      <div className="MainAppButtons flex items-center gap-4">
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
              {`${app?.jobListing.jobTitle} | ${app?.jobListing.business.name}`}
            </p>
            <p className="Details self-center text-sm">
              {currentJob ? `${app.status}` : `${dateOfApp} | ${app.status}`}
            </p>
          </div>
        </SiteButton>
      </div>

      {jobClicked && (
        <div className="SecondaryButtons mb-1 mt-1 flex gap-6 self-end pr-4">
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[0]}
            onClick={viewListing}
            isSelected={clickedButton === "viewListing"}
          >
            view listing
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[1]}
            onClick={viewCompany}
            isSelected={clickedButton === "viewCompanyDetails"}
          >
            go to company page
          </SiteButton>
          {/* <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[2]}
            onClick={viewApplication}
            isSelected={clickedButton === "viewApplication"}
          >
            your application
          </SiteButton> */}
        </div>
      )}
    </div>
  );
};

export default Application;
