"use client";

import { useRouter } from "next/navigation";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { JobAMSNotificationButton } from "../buttonsAndLabels/notificationButton";
import SiteButton from "../buttonsAndLabels/siteButton";
import InfoBox from "../informationDisplayComponents/infoBox";
import Image from "next/image";

interface PostedJobComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  colorArray: Array<string>;
  index: any;
  jobId?: string;
  dateOfApp?: any;
}

const PostedJobComponent: React.FC<PostedJobComponentProps> = ({
  id,
  colorArray,
  index,
  jobId,
}) => {
  const router = useRouter();
  const { jobListings } = useJobListings();
  const { applications } = useApplications();

  // search through the jobListings to find the job with the matching jobId
  const selectedJob = jobListings?.find((job: any) => job.jobId === jobId)?.job;

  const buttonClick = () => {
    router.push(`/ams/${jobId}`);
  };

  const appNumbers = selectedJob?.applications?.length;

  let viewedApplications: any = [];
  let notification;
  let numberOfInterviews;

  const applicationList = selectedJob?.applications?.map((app) => {
    const relevantApp = applications?.find(
      (application: any) => application.id === app,
    );
    const isViewed = relevantApp?.appStatus !== "submitted";
    if (isViewed) {
      viewedApplications.push(relevantApp);
    }
    if (!isViewed) {
      notification = "unopened applications";
    }

    const hasInterviews = (relevantApp?.appointments?.length || 0) > 0;
    if (hasInterviews) {
      numberOfInterviews = relevantApp?.appointments?.length;
      notification = "new appointment";
    }
  });

  return (
    <div className="PostedJob flex flex-col gap-4" key={id}>
      <InfoBox
        aria="JobListing"
        variant="filled"
        colorScheme={colorArray[index % colorArray.length] as ButtonColorOption}
        size="jobListing"
        width="extraWide"
      >
        <div className="AppInfo mb-4 flex flex-col justify-between gap-2 text-center">
          <div className="AppLimitInfo -mt-4 ml-2 flex items-start justify-between pb-8">
            <div className="AppLimit -ml-4 text-xs font-medium italic">
              {appNumbers}/{selectedJob?.applicationLimit} apps
            </div>
            {notification && (
              <JobAMSNotificationButton
                colorScheme={
                  colorArray[index % colorArray.length] as ButtonColorOption
                }
                message={notification}
              />
            )}
          </div>
          <h1 className="Title">{`${selectedJob?.jobTitle}`}</h1>
          <p className="ExperienceLevel text-md font-normal italic">
            {capitalizeFirstLetter(
              selectedJob?.experienceLevel?.[0] || "junior",
            )}{" "}
            {selectedJob?.experienceLevel?.[0] !== "entry-level" ? "Level" : ""}
          </p>
          {/* divider */}
          <Image
            src="/listing-divider.svg"
            alt="listingDivider"
            width={300}
            height={0}
            className="my-8 self-center opacity-80"
          ></Image>
          <p className="ApplicationDetails self-center text-sm">
            {appNumbers} applications
          </p>
          <p className="ReviewDetails mb-4 text-sm">
            {viewedApplications.length} reviewed | {numberOfInterviews}{" "}
            {`${(numberOfInterviews ?? 0) > 1 ? "interviews" : (numberOfInterviews ?? 0) < 1 ? "no interview" : "interview"} set`}
          </p>
        </div>
      </InfoBox>
      <div className="ManageButton mt-1 flex w-full justify-end">
        <SiteButton
          aria="manageListing"
          variant="filled"
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          onClick={buttonClick}
          addClasses="px-8 py-3"
        >
          view applications | manage listing
        </SiteButton>
      </div>
    </div>
  );
};

export default PostedJobComponent;
