"use client";

import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useFellow } from "@/contexts/FellowContext";

import InfoBox from "@/components/infoBox";
import SiteLabel from "@/components/siteLabel";
import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";
import SiteButton from "./siteButton";
import ApplicationLimitModal from "./modals/postAJobModals/applicationLimitModal";
import PaymentModal from "./modals/paymentModal";
import Link from "next/link";
import ApplyModal from "./modals/appyModals/applyModal";

import { capitalizeFirstLetter } from "@/utils/textUtils";

// ADD DETAILS FOR HYBRID SCHEDULE AS WELL
// Make Buttons for current isOwn show up if the job isn't posted yet. If it is, use secondary Business Buttons
// Add Buttons for applications, if isNotOwn? = view company details, apply, and report -- make the apply button disabled if it doesn't meet parameters
// If the listing is active, add Business Button to : view applications or go to application management system

export default function JobListing({ isOwn, hasId, id }: any) {
  // const { business, setBusiness } = useBusiness();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const { setPageType } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { job, setJob } = useJob();
  const { jobListings } = useJobListings();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();

  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [thirdColorArray, setThirdColorArray] = useState(Array<any>);
  const [jobSavedStatus, setJobSavedStatus] = useState(
    fellow?.savedJobs?.includes(id),
  );

  const handleEditClick = (url: any) => {
    setJob({ ...job, jobIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  // define the current job
  let currentJob;
  if (hasId && jobListings) {
    // if the job hasId we'll need to grab it's details from the database here
    currentJob = jobListings.find((job: any) => job.jobId === id)?.job;
  } else {
    // when we're initially loading this page upon job creation, we'll use the jobContext object just created
    currentJob = job;
  }

  const checkNonNegParamsMatch = () => {
    if (!currentJob?.nonNegParams || !fellow) return false;

    const { country, languages = [], skills = [] } = fellow;

    // Check if all non negotiable parameters have a match in country, languages, or skills
    return currentJob.nonNegParams.every(
      (param) =>
        param === country ||
        languages.includes(param) ||
        skills.includes(param),
    );
  };

  //meets minimum requirements to apply
  const hasMatchingNonNegParams = checkNonNegParamsMatch();

  // if it matches parameters, hasn't met applicationLimit, and the dailyApplications
  // for the fellow aren't at it's limit of 5, they can apply!
  const canApply =
    currentJob?.numberOfApps !== currentJob?.applicationLimit &&
    hasMatchingNonNegParams === true &&
    fellow?.dailyApplications !== "5";

  const saveClick = (jobId: any) => {
    if (fellow?.savedJobs?.includes(jobId)) {
      setFellow({
        ...fellow,
        savedJobs: fellow.savedJobs.filter((id) => id !== jobId),
      });
      setJobSavedStatus(false);
    } else {
      setFellow({
        ...fellow,
        savedJobs: [...(fellow?.savedJobs || []), jobId],
      });
      setJobSavedStatus(true);
    }
    hideModal();
  };

  useEffect(() => {
    // if the job is being edited, set the button to stay being pressed
    // in case they'd like to edit other things
    if (job?.jobIsBeingEdited) {
      setCanEdit(true);
    }
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    ShuffleIdealButtonPattern(setThirdColorArray);

    setPageType("jobListing");
  }, []);

  return (
    <div
      className={`JobListingContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%] ${textColor}`}
    >
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn mt-28 flex flex-col gap-8">
          {/* business buttons */}
          {isOwn && (
            <div className="BusinessTopButtons -mb-2 -mt-10 flex flex-col items-end gap-2 self-end">
              <Link href={"/job-board"}>
                <SiteButton aria="job board" colorScheme="d5">
                  go to job board
                </SiteButton>
              </Link>
              <SiteButton
                variant="filled"
                aria="apps"
                colorScheme="b1"
                onClick={() => showModal(<ApplicationLimitModal />)}
              >
                application limit: {currentJob?.applicationLimit}
              </SiteButton>
            </div>
          )}

          {/* fellow buttons */}
          {!isOwn && (
            <div className="FellowTopButtons -mb-2 -mt-14 flex flex-col items-end gap-1 self-end">
              <SiteButton
                aria="saveJob"
                colorScheme="d3"
                onClick={() => saveClick(id)}
                isSelected={jobSavedStatus}
              >
                {jobSavedStatus === true ? "job saved" : "save job"}
              </SiteButton>
              <SiteLabel
                variant="display"
                aria="appLimit"
                addClasses="mt-3"
                colorScheme="f3"
              >
                applications: {currentJob?.numberOfApps}/
                {currentJob?.applicationLimit}
              </SiteLabel>
              <SiteLabel variant="display" aria="roundNumber">
                round: {currentJob?.roundNumber || "1"}
              </SiteLabel>
            </div>
          )}

          {/* Non-Negotiable Parameters */}
          <InfoBox
            variant="hollow"
            aria="nonNegotiableParameters"
            size="profile"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step1")}
          >
            <h2 className="NonNegotiableParametersTitle text-center">{`Non-Negotiable Parameters:`}</h2>
            <div className="NonNegotiableParametersContainer -mb-2 mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
              {currentJob?.nonNegParams &&
              currentJob?.nonNegParams.length > 0 ? (
                currentJob?.nonNegParams.map((skill: any, index: number) => {
                  return (
                    <SiteLabel
                      aria={skill}
                      variant="display"
                      key={skill}
                      addClasses="px-8 py-3"
                      colorScheme={
                        primaryColorArray[index % primaryColorArray.length]
                      }
                    >
                      {skill}
                    </SiteLabel>
                  );
                })
              ) : (
                <p>No non-negotiable parameters available.</p>
              )}
            </div>
          </InfoBox>

          {/* Preferred Skills Field */}
          <InfoBox
            variant="hollow"
            aria="preferredSkills"
            size="thin"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step3")}
          >
            <h2 className="NonNegotiableParametersTitle text-center">{`Preferred Skills:`}</h2>
            <div className="NonNegotiableParametersContainer -mb-2 mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
              {currentJob?.preferredSkills &&
              currentJob?.preferredSkills.length > 0 ? (
                currentJob?.preferredSkills.map((skill: any, index: number) => {
                  return (
                    <SiteLabel
                      aria={skill}
                      variant="display"
                      key={skill}
                      colorScheme={
                        secondaryColorArray[index % secondaryColorArray.length]
                      }
                    >
                      {skill}
                    </SiteLabel>
                  );
                })
              ) : (
                <p>No preferred skills available.</p>
              )}
            </div>
          </InfoBox>

          {/* Interview Process */}
          <InfoBox
            variant="hollow"
            aria="interviewProcess"
            size="profile"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step5")}
          >
            <h2 className="InterviewProcessTitle mb-4 pl-2">{`Our Interview Process:`}</h2>
            <ul
              className={`InterviewProcessList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
            >
              {currentJob?.interviewProcess?.map((int: any, index: number) => {
                return (
                  <li className="InterviewProcessItem" key={index}>
                    <p className="Stage">
                      {int.stage}:
                      <span className="Step">
                        {` `}
                        {int.step}
                      </span>
                    </p>
                    <p className={`Details pt-4 ${textColor}`}>{int.details}</p>
                  </li>
                );
              })}
            </ul>
          </InfoBox>

          {/* Edit Buttons */}
          {isOwn && (
            <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
              <SiteButton
                variant="filled"
                colorScheme="b6"
                aria="edit"
                addClasses="px-8"
                onClick={() => setCanEdit(!canEdit)}
                isSelected={canEdit}
              >
                {canEdit ? "finish editing" : "edit"}
              </SiteButton>
              <SiteButton
                aria="publish"
                variant="filled"
                colorScheme="f1"
                addClasses="px-8"
                onClick={() =>
                  showModal(<PaymentModal subscriptionAmount="400" isJobPost />)
                }
              >
                publish
              </SiteButton>
            </div>
          )}

          {/* Fellow / Apply Buttons */}
          {!isOwn && (
            <div className="FellowButtonsContainer flex flex-col items-end gap-4 self-end">
              <SiteButton
                variant="filled"
                colorScheme="c4"
                aria="edit"
                addClasses="px-8"
                onClick={() => router.push(`/profile/1b23i`)}
              >
                view company details
              </SiteButton>
              <SiteButton
                aria="publish"
                variant="filled"
                colorScheme="f1"
                addClasses="px-8"
                onClick={() =>
                  showModal(
                    <ApplyModal
                      jobTitle={currentJob?.jobTitle}
                      businessName={currentJob?.businessName}
                    />,
                  )
                }
                disabled={canApply === false}
              >
                apply for this job
              </SiteButton>
              <SiteButton
                aria="publish"
                variant="filled"
                colorScheme="e3"
                addClasses="px-8"
                onClick={() => console.log("report clicked")}
              >
                report
              </SiteButton>
            </div>
          )}
        </div>

        <div className="ProfileRightColumn flex flex-col gap-8">
          {/* Job Title, Business Name, & Small Summary */}
          <InfoBox
            aria="business"
            variant="hollow"
            addClasses="gap-8 justify-evenly"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step1")}
          >
            <div className="JobTitleDetailsContainer flex flex-col gap-4 pl-4">
              <h1 className="JobTitle">{currentJob?.jobTitle}</h1>
              <Link href={"/profile"}>
                <p className="BusinessName -mt-6 pt-4 text-lg italic leading-6">
                  {currentJob?.businessName}
                </p>
              </Link>
              <p
                className={`PositionSummary pl-2 pt-4 leading-7 ${secondaryTextColor}`}
              >
                {currentJob?.positionSummary}
              </p>
            </div>
          </InfoBox>
          {/* Location, locationOption, and Email */}
          <InfoBox
            variant="hollow"
            aria="location"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step2")}
          >
            <div className="LocationPayDetailsInfo flex flex-col gap-4">
              <h2 className="LocationPayDetailsTitle mb-4 pl-2">
                {`Location:`} {currentJob?.location}, {currentJob?.country}
              </h2>
              {currentJob?.locationOption && (
                <h2 className="LocationOptionTitle mb-4 pl-2">
                  {`Location Type:`}{" "}
                  {capitalizeFirstLetter(currentJob?.locationOption)}
                </h2>
              )}

              {currentJob?.locationOption === "hybrid" && (
                <div className="HybridDetailsContainer flex gap-4">
                  <h2 className="LocationTypeTitle mb-4 pl-2">
                    {`Hybrid Details:`}
                  </h2>
                  <div className="Details -mt-2">
                    <p className="HybridDetails">
                      {currentJob?.hybridDetails?.daysInOffice}{" "}
                      {`days in office, `}
                    </p>
                    <p className="HybridDetails">
                      {currentJob?.hybridDetails?.daysRemote} {`days remote.`}
                    </p>
                  </div>
                </div>
              )}
              {currentJob?.payDetails && (
                <h2 className="PayDetailsTitle mb-4 pl-2">
                  {`Pay: $${new Intl.NumberFormat().format(currentJob?.payDetails?.payscaleMin || 0)} -
                  $${new Intl.NumberFormat().format(currentJob?.payDetails?.payscaleMax || 0)}`}{" "}
                  {capitalizeFirstLetter(
                    currentJob?.payDetails?.payOption || "",
                  )}
                </h2>
              )}

              {currentJob?.positionType && (
                <h2 className="PositionTypeTitle mb-0 pl-2">
                  {`Position Type: `}
                  {capitalizeFirstLetter(currentJob?.positionType)}
                </h2>
              )}
            </div>
          </InfoBox>

          {/* More About The Position */}
          <InfoBox
            variant="hollow"
            aria="moreAboutBusiness"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step3")}
          >
            {/* More About The Job */}
            <h2 className="AboutJobTitle pb-4 pl-2 pt-2">{`About This Position:`}</h2>
            <p className={`AboutJob pl-8 pt-4 leading-8 ${textColor}`}>
              {currentJob?.moreAboutPosition}
            </p>
            {/* Responsibilities */}
            {currentJob?.responsibilities && (
              <div className="Responsibilities mt-8">
                <h2 className="ResponsibilitiesTitle mb-4 pl-2">{`Responsibilities:`}</h2>
                <ul
                  className={`ResponsibilitiesList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
                >
                  {currentJob?.responsibilities?.map(
                    (resp: { responsibility?: string; id?: number }) => {
                      return (
                        <li className="ResponsibilitiesItem" key={resp.id}>
                          <p className="Responsibility">
                            {resp.responsibility}
                          </p>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
            )}

            {/* Perks */}
            {currentJob?.perks && (
              <div className="Perks mt-8">
                <h2 className="PerksTitle mb-4 pl-2">{`Perks:`}</h2>
                <ul className="PerksList flex flex-wrap justify-center gap-2 text-jade">
                  {currentJob.perks.map((perk: any, index: number) => {
                    return (
                      <SiteLabel
                        key={index}
                        aria={perk}
                        variant="display"
                        addClasses="px-8 py-3"
                        colorScheme={
                          thirdColorArray[index % thirdColorArray.length]
                        }
                      >
                        {perk}
                      </SiteLabel>
                    );
                  })}
                </ul>
              </div>
            )}
          </InfoBox>
          {/* Ideal Candidate Details */}
          <InfoBox
            variant="hollow"
            aria="idealCandidate"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/post-a-job/step2")}
          >
            <h2 className="PetDetailsTitle mb-4 pl-2">{`Our Ideal Candidate:`}</h2>
            <p className={`PetDetails ml-8 font-medium ${secondaryTextColor}`}>
              {currentJob?.idealCandidate}
            </p>
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
