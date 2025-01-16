"use client";

import Image from "next/image";
import InfoBox from "../informationDisplayComponents/infoBox";
import SiteButton from "../buttonsAndLabels/siteButton";
import DeleteConfirmationModal from "../modals/deleteConfirmationModal";

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
    if (applied) {
      router.push(`/application/${thisApp}`);
    } else router.push(`/listing/${job.jobId}`);
  };

  const appNumber = job?.job.applications?.length;

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
    <div className="JobListing flex flex-col gap-6" key={job.jobId}>
      <InfoBox
        variant={colorOption === "seasonal" ? "hollow" : "filled"}
        colorScheme={colorArray[index % colorArray.length] as ButtonColorOption}
        aria="jobListing"
        size="jobPost"
      >
        <div className="AppLimitSaveButton -mt-6 flex items-start justify-between pb-8">
          <div className="AppLimit -ml-4 text-xs font-medium italic">
            {appNumber}/{job.job?.applicationLimit} apps
          </div>
          <div className="SaveButton -mr-4 hover:saturate-150">
            {fellow?.savedJobs?.includes(job.jobId) ? (
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
          <h2 className="JobTitle mb-1">{job.job?.jobTitle}</h2>
          <p className="BusinessName font-medium italic">
            with {job.job?.businessName}
          </p>
          <p className="ExperienceLevel text-sm font-normal">
            {capitalizeFirstLetter(job.job?.experienceLevel[0] || "junior")}{" "}
            Level
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
            <p className="LocationOption">On-Site: {job.job?.country}</p>
          )}
          {job.job?.locationOption === "hybrid" && (
            <p className="LocationOption">Hybrid</p>
          )}
          <p className="PositionType font-normal italic">
            {capitalizeFirstLetter(job.job?.positionType || "")} Position
          </p>
          <p className="PayDetails">
            ${new Intl.NumberFormat().format(job.job?.payDetails.payscaleMin)} -{" "}
            ${new Intl.NumberFormat().format(job.job?.payDetails.payscaleMax)}
          </p>
          <p className="PayOption italic">
            {capitalizeFirstLetter(job.job?.payDetails.payOption || "")}
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
        >
          {applied ? "already applied - view application" : "view details"}
        </SiteButton>
      </div>
    </div>
  );
};

export default JobPost;
