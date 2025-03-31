"use client";

import Image from "next/image";
import InfoBox from "../informationDisplayComponents/infoBox";
import SiteButton from "../buttonsAndLabels/siteButton";
import DeleteConfirmationModal from "../modals/deleteConfirmationModal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useColors } from "@/contexts/ColorContext";
import { capitalizeFirstLetter } from "@/utils/textUtils";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { useApplications } from "@/contexts/ApplicationsContext";

interface JobPostProps extends React.HTMLAttributes<HTMLDivElement> {
  job: any;
  colorArray: Array<string>;
  index: any;
  saveClick?: any;
}

const JobPost: React.FC<JobPostProps> = ({
  job,
  colorArray,
  index,
  saveClick,
}) => {
  const router = useRouter();
  const { colorOption } = useColors();
  const { fellow } = useFellow();
  const { showModal, hideModal } = useModal();
  const { applications } = useApplications();
  const [viewMoreClicked, setViewMoreClicked] = useState(false);
  const removeSavedJob = () => {
    showModal(
      <DeleteConfirmationModal
        item="this saved job"
        continueDelete={saveClick}
      />,
    );
  };

  let thisApp: string;
  const applied = job.job?.applicants?.includes(fellow?.id);
  if (applied) {
    const currentApp: any = applications?.find((app: any) => {
      return app.jobId === job.jobId && app.applicant === fellow?.id;
    });
    console.log(currentApp);
    if (currentApp) {
      thisApp = currentApp.id;
    }
  }

  // here, we need to be able to access the listing via Id I believe?
  const viewDetails = () => {
    setViewMoreClicked(true);
    if (applied) {
      router.push(`/application/${thisApp}`);
    } else router.push(`/listing/${job.id}`);
  };

  // const appNumber = job?.job.applications?.length;
  const appNumber = 2;

  const saveButton = (() => {
    switch (colorOption) {
      case "highContrast":
        return (
          <SiteButton
            aria="addJobsButton"
            size="extraSmallCircle"
            variant="filled"
            onClick={saveClick}
            colorScheme={
              colorArray[index % colorArray.length] as ButtonColorOption
            }
            addClasses="bg-center"
            addImage="bg-[url('/hc-save-job-icon.svg')]"
          ></SiteButton>
        );
      default:
        return (
          <SiteButton
            aria="addJobsButton"
            size="extraSmallCircle"
            variant="filled"
            onClick={saveClick}
            colorScheme={
              colorArray[index % colorArray.length] as ButtonColorOption
            }
            addClasses="bg-center"
            addImage="bg-[url('/save-job-icon.svg')]"
          ></SiteButton>
        );
    }
  })();
  return (
    <div className="JobListing flex flex-col gap-6" key={job.id}>
      <InfoBox
        variant={colorOption === "seasonal" ? "hollow" : "filled"}
        colorScheme={colorArray[index % colorArray.length] as ButtonColorOption}
        aria="jobListing"
        size="jobPost"
      >
        <div className="AppLimitSaveButton -mt-6 flex items-start justify-between pb-8">
          <div className="AppLimit -ml-4 text-xs font-medium italic">
            {/* {appNumber}/{job?.applicationLimit} apps */}
            {appNumber}/25 apps
          </div>
          <div className="SaveButton -mr-4 hover:saturate-150">
            {job.isSaved ? (
              <SiteButton
                aria="addJobsButton"
                size="extraSmallCircle"
                variant="filled"
                onClick={removeSavedJob}
                colorScheme={
                  colorArray[index % colorArray.length] as ButtonColorOption
                }
                isSelected
                addClasses="bg-center"
                addImage="bg-[url('/saved-job-icon.svg')]"
              ></SiteButton>
            ) : (
              saveButton
            )}
          </div>
        </div>
        <div className="JobDetails flex flex-col gap-1 text-center">
          <h2 className="JobTitle mb-1">{job.jobTitle}</h2>
          <p className="BusinessName font-medium italic">
            with {job.business.name}
          </p>
          <p className="ExperienceLevel text-sm font-normal">
            {capitalizeFirstLetter(job.experienceLevel[0] || "junior")} Level
          </p>
          {/* divider */}
          <Image
            src="/listing-divider.svg"
            alt="listingDivider"
            width={240}
            height={0}
            className="my-8 opacity-80"
          ></Image>
          {job.locationOption === "remote" && (
            <p className="LocationOption">100% Remote</p>
          )}
          {job.locationOption === "on-site" && (
            <p className="LocationOption">
              On-Site: {job.business.businessProfile.country}
            </p>
          )}
          {job.locationOption === "hybrid" && (
            <p className="LocationOption">Hybrid</p>
          )}
          <p className="PositionType font-normal italic">
            {capitalizeFirstLetter(job.positionType || "")} Position
          </p>
          <p className="PayDetails">
            ${new Intl.NumberFormat().format(job.payscaleMin)} - $
            {new Intl.NumberFormat().format(job.payscaleMax)}
          </p>
          <p className="PayOption italic">
            {capitalizeFirstLetter(job.payOption || "")}
          </p>
        </div>
      </InfoBox>
      <div className="ViewDetailsButton self-end">
        <SiteButton
          aria="viewDetails"
          variant={colorOption === "seasonal" ? "hollow" : "filled"}
          colorScheme={
            colorArray[index % colorArray.length] as ButtonColorOption
          }
          onClick={viewDetails}
          isSelected={viewMoreClicked}
        >
          {applied ? "already applied - view application" : "view details"}
        </SiteButton>
      </div>
    </div>
  );
};

export default JobPost;
