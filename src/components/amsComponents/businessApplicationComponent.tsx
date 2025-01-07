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
import { Notification } from "../buttonsAndLabels/notificationButton";
import Application from "@/app/application/[id]/page";
import Link from "next/link";
import InfoBox from "../informationDisplayComponents/infoBox";
import InputComponent from "../inputComponents/inputComponent";
import FormSubmissionButton from "../buttonsAndLabels/formSubmissionButton";

interface BusinessApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
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
  const [appClicked, setAppClicked] = useState(false);
  const [showNote, setShowNote] = useState(false);
  // const currentApplicant = fellows?.find((fellow: any) => {
  //   return fellow.id === app?.applicant;
  // });

  const currentApplicant = fellow;
  const notification = app.message ? true : false;

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const viewApplication = () => {
    router.push(`/application/${id}`);
  };

  const highlight = () => {
    console.log("highlighting app");
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
          addClasses="max-w-[77vw]"
          onClick={() => setAppClicked(!appClicked)}
          isSelected={appClicked}
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
            </p>
          </div>
        </SiteButton>
        {notification && <Notification message="new interview request" />}
      </div>

      {appClicked && (
        <div className="DetailsAndOptions ml-1 mr-10 flex flex-col gap-4">
          <div className="SecondaryButtons mb-1 mt-1 flex justify-end gap-4 align-top">
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[0]}
              onClick={viewApplication}
            >
              view this application
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[1]}
              onClick={() => setShowNote(!showNote)}
              isSelected={showNote}
            >
              {app.businessNote ? "view your notes" : "add a note"}
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[2]}
              onClick={viewApplication}
            >
              messages
            </SiteButton>
            <SiteButton
              aria="viewDetails"
              variant="hollow"
              colorScheme={betterColorArray[3]}
              onClick={highlight}
            >
              highlight
            </SiteButton>
          </div>
          {showNote && (
            <form action="" className="Note">
              <InputComponent
                addClasses="mb-2 self-center w-full"
                type="text"
                size="tall"
                defaultValue={app.businessNote}
                placeholderText="Add Your Note Here..."
              ></InputComponent>
              <SiteButton aria="test" colorScheme="f1" variant="filled">
                testing
              </SiteButton>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessApplication;
