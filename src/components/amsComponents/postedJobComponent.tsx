"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import SiteButton from "../buttonsAndLabels/siteButton";
import ShuffleIdealButtonPattern from "../buttonsAndLabels/shuffleIdealButtonPattern";

interface PostedJobComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  jobId?: string;
  dateOfApp?: any;
  appStatus?: string;
  selectedJobs?: Array<string>;
  handleAdd?: any;
  handleDelete?: any;
  setCurrentJob?: any;
  setSelectedColor?: any;
  viewCompanyDetails?: any;
}

const PostedJobComponent: React.FC<PostedJobComponentProps> = ({
  id,
  colorArray,
  index,
  jobId,
  appStatus,
  selectedJobs,
  handleAdd,
  handleDelete,
  setCurrentJob,
  setSelectedColor,
  viewCompanyDetails,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const { applications } = useApplications();
  const [betterColorArray, setBetterColorArray] = useState(Array<any>);

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const buttonClick = (id: string) => {
    if (selectedJobs?.includes(id)) {
      handleDelete("selectedJobs", id);
      setCurrentJob("");
      setSelectedColor("");
    } else {
      handleAdd("selectedJobs", id);
      setCurrentJob(selectedJob);
      setSelectedColor(colorArray[index % colorArray.length]);
    }
  };

  const jobClicked = selectedJobs?.includes(id);
  const appNumbers = selectedJob?.applications?.length;

  let viewedApplications: any = [];

  const applicationList = selectedJob?.applications?.map((app) => {
    const relevantApp = applications?.find(
      (application: any) => application.id === app,
    );
    const isViewed = relevantApp?.appStatus !== "submitted";
    if (isViewed) {
      viewedApplications.push(relevantApp);
    }
  });

  console.log(viewedApplications);

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
    <div className="PostedJob flex w-full flex-col gap-3" key={id}>
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
          aria="JobListings"
          variant="hollow"
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          size="wide"
          onClick={() => buttonClick(id)}
          isSelected={selectedJobs?.includes(id)}
        >
          <div className="AppInfo flex justify-between">
            <p className="TitleAndBusiness text-md">
              {`${selectedJob?.jobTitle}`}
            </p>
            <p className="Details self-center text-sm">
              {appNumbers} applicants | {viewedApplications.length} reviewed | 1
              interview set
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

export default PostedJobComponent;
