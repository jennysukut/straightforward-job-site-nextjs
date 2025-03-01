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
import { useApplication } from "@/contexts/ApplicationContext";
import { useApplications } from "@/contexts/ApplicationsContext";

import InfoBox from "@/components/informationDisplayComponents/infoBox";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import SiteButton from "../../buttonsAndLabels/siteButton";
import Link from "next/link";

import {
  OwnListingTopButtons,
  OwnJobBottomButtons,
  ListingTopButtons,
  ListingBottomButtons,
  AppFellowNotes,
  AmsTopButtons,
} from "./jobListingButtons";

import { capitalizeFirstLetter } from "@/utils/textUtils";

// ADD DETAILS FOR HYBRID SCHEDULE AS WELL
// Make Buttons for current isOwn show up if the job isn't posted yet. If it is, use secondary Business Buttons
// Add Buttons for applications, if isNotOwn? = view company details, apply, and report -- make the apply button disabled if it doesn't meet parameters
// If the listing is active, add Business Button to : view applications or go to application management system

export default function JobListing({
  isOwn,
  hasId,
  id,
  inAms,
  setAltViewChoice,
}: any) {
  const router = useRouter();

  const { setPageType } = usePageContext();
  const { showModal, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { job, setJob } = useJob();
  const { jobListings } = useJobListings();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { application } = useApplication();
  const { applications } = useApplications();

  const [canEdit, setCanEdit] = useState(false);
  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [thirdColorArray, setThirdColorArray] = useState(Array<any>);
  const [jobSavedStatus, setJobSavedStatus] = useState(
    fellow?.savedJobs?.includes(id),
  );

  let currentApp;
  if (inAms || !isOwn) {
    // Filter applications for the current jobId
    const currentApps = applications?.filter((app) => app.jobId === id);
    console.log(currentApps);
    // Find the application where the applicant matches the fellow's id
    currentApp = currentApps?.find((app) => app.applicant === fellow?.id);
  }

  // define the current job
  let currentJob;
  if (hasId && jobListings) {
    // if the job hasId we'll need to grab it's details from the database here
    currentJob = jobListings.find((job: any) => job.jobId === id)?.job;
  } else {
    // when we're initially loading this page upon job creation, we'll use the jobContext object just created
    currentJob = job;
  }

  const appNumber = currentJob?.applications?.length;

  const handleEditClick = (url: any) => {
    setJob({ ...job, jobIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

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
  const matchingIds =
    currentJob?.applicants &&
    !currentJob?.applicants?.some(
      (applicant: any) => applicant.id === fellow?.id,
    );

  // if it matches parameters, hasn't met applicationLimit, if the fellow has applied, and the dailyApplications
  // for the fellow aren't at it's limit of 5, they can apply!
  const canApply = false;
  // currentJob?.numberOfApps !== currentJob?.applicationLimit &&
  // hasMatchingNonNegParams === true &&
  // fellow?.dailyApplications?.count !== 5 &&
  // matchingIds;

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
    // if (job?.jobIsBeingEdited) {
    //   setCanEdit(true);
    // }
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    ShuffleIdealButtonPattern(setThirdColorArray);

    // setPageType("jobListing");
  }, []);

  return (
    <div
      className={`JobListingContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%] ${textColor}`}
    >
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn mt-28 flex flex-col gap-8">
          {/* TOP BUTTONS */}

          {/* business buttons - not ams */}
          {isOwn && !inAms && <OwnListingTopButtons currentJob={currentJob} />}

          {/* business buttons - in ams */}
          {isOwn && inAms && <AmsTopButtons currentJob={currentJob} />}

          {/* fellow buttons */}
          {!isOwn && (
            <ListingTopButtons
              id={id}
              saveClick={saveClick}
              jobSavedStatus={jobSavedStatus}
              matchingIds={matchingIds}
              appNumber={appNumber}
              currentJob={currentJob}
              canApply={canApply}
              app={currentApp ? currentApp : "no current app here"}
            />
          )}

          {!isOwn && <AppFellowNotes currentApp={currentApp} />}

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

          {/* BOTTOM BUTTONS */}

          {/* business buttons - not in ams */}
          {isOwn && !inAms && (
            <OwnJobBottomButtons canEdit={canEdit} setCanEdit={setCanEdit} />
          )}

          {/* business buttons - in ams */}
          {isOwn && inAms && (
            <div className="ListingAmsBottomButtons flex flex-col items-end gap-3 self-end">
              <SiteButton aria="closeListing" variant="filled" colorScheme="c1">
                settings / history
              </SiteButton>
              <SiteButton aria="closeListing" variant="filled" colorScheme="f1">
                close listing
              </SiteButton>
              <SiteButton aria="closeListing" variant="filled" colorScheme="b3">
                message us?
              </SiteButton>
            </div>
          )}

          {/* fellow / apply buttons */}
          {!isOwn && (
            <ListingBottomButtons
              matchingIds={matchingIds}
              canApply={canApply}
              currentJob={currentJob}
              id={id}
              currentApp={currentApp}
            />
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
              <div className="TitleBusinessButtonContainer flex justify-between">
                <div className="TitleBusiness flex flex-col gap-4">
                  <h1 className="JobTitle">{currentJob?.jobTitle}</h1>
                  <Link href={"/profile"}>
                    <p className="BusinessName -mt-6 pt-4 text-lg italic leading-6">
                      {currentJob?.businessName}
                    </p>
                  </Link>
                </div>
                {isOwn && inAms && (
                  <SiteButton
                    variant="hollow"
                    aria="back to apps"
                    colorScheme="b3"
                    onClick={() => setAltViewChoice("")}
                  >
                    back to apps
                  </SiteButton>
                )}
              </div>
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
            <p className={`AboutJob pl-8 pt-4 italic leading-8 ${titleColor}`}>
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
