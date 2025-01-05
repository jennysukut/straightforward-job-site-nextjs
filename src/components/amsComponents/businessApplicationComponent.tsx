"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellow } from "@/contexts/FellowContext";

import SiteButton from "../buttonsAndLabels/siteButton";
import SiteLabel from "../buttonsAndLabels/siteLabel";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";
import Image from "next/image";

interface BusinessApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  app?: any;
}

const BusinessApplication: React.FC<BusinessApplicationProps> = ({
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
  app,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);
  const { fellow } = useFellow();

  // const currentApplicant = fellows?.find((fellow: any) => {
  //   return fellow.id === app?.applicant;
  // });

  const currentApplicant = fellow;
  const notification = true;
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

  const viewApplication = () => {
    router.push(`/application/${id}`);
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
            <p className="TitleAndBusiness flex max-w-[70%] gap-2 text-[1rem]">
              {currentApplicant?.name} |
              <p className="SmallBio max-w-[75%] overflow-hidden truncate">
                {currentApplicant?.smallBio}
              </p>
            </p>
            <p className="Details flex gap-2 self-center text-sm">
              {app.dateOfApp} | {appStatus}
              {notification && (
                <div className="Notification flex gap-2">
                  |{" "}
                  <Image
                    src="/notif-icon.svg"
                    alt="notification"
                    width={15}
                    height={15}
                  ></Image>
                </div>
              )}
            </p>
          </div>
        </SiteButton>
      </div>

      {jobClicked && (
        <div className="SecondaryButtons mb-1 mt-1 flex gap-6 self-center">
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
            onClick={viewCompanyDetails}
          >
            company page
          </SiteButton>
          <SiteButton
            aria="viewDetails"
            variant="hollow"
            colorScheme={betterColorArray[2]}
            onClick={viewApplication}
          >
            your application
          </SiteButton>
        </div>
      )}
    </div>
  );
};

export default BusinessApplication;
