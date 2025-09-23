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
import { useMutation } from "@apollo/client";
import {
  SAVE_JOB,
  EDIT_JOB_LISTING,
  DELETE_JOB_LISTING,
} from "@/graphql/mutations";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTING_BY_ID } from "@/graphql/queries";

import FinishListingModal from "@/components/modals/postAJobModals/finishListingModal";
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
  OtherBusinessTopButtons,
} from "./jobListingButtons";

import { capitalizeFirstLetter } from "@/utils/textUtils";
import { Job } from "@/contexts/JobContext";
import DeleteConfirmationModal from "@/components/modals/deleteConfirmationModal";

export default function JobListing({
  hasId,
  id,
  inAms,
  setAltViewChoice,
  newPost,
}: any) {
  const router = useRouter();

  const { setPageType, isLoggedIn, accountType, setCurrentPage } =
    usePageContext();
  const { showModal, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { job, setJob } = useJob();
  const { jobListings } = useJobListings();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { application } = useApplication();
  const { applications } = useApplications();
  const { business } = useBusiness();

  const [isOwn, setIsOwn] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [thirdColorArray, setThirdColorArray] = useState(Array<any>);
  const [saveJobListing, { loading, error }] = useMutation(SAVE_JOB);
  const [starOrStopEditingJobListing] = useMutation(EDIT_JOB_LISTING);
  const [deleteJobListing] = useMutation(DELETE_JOB_LISTING);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [currentJob, setCurrentJob] = useState({} as Job);
  const [savingForLater, setSavingForLater] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingData, setLoadingData] = useState(
    job?.beingEdited ? false : true,
  );
  const [gotJob, setGotJob] = useState(false);

  const appNumber =
    currentJob?.applications === null ? 0 : currentJob?.applications?.length;

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_JOB_LISTING_BY_ID, {
    variables: { id: id },
    skip: !isLoggedIn || gotJob || isBeingDeleted,
    onCompleted: (data) => {
      console.log(data);
      setGotJob(true);
      setCurrentJob(data.jobListing);
      setLoadingData(false);
      if (data.jobListing.saved === true) {
        setIsSaved(true);
      }
      if (data.jobListing.published === false) {
        setIsPublished(false);
        if (!isBeingDeleted && isOwn) {
          setTimeout(() => {
            showModal(
              <FinishListingModal completed={data.jobListing.completed} />,
            );
          }, 2000);
        }
      }
      if (
        accountType === "Business" &&
        data.jobListing.business.id === business?.id
      ) {
        setIsOwn(true);
      }
    },
  });

  useEffect(() => {
    setJob(currentJob);
  }, [setJob, currentJob]);

  const editJob = async () => {
    try {
      const response = await starOrStopEditingJobListing({
        variables: {
          jobId: job?.id,
          beingEdited: canEdit,
          completed: "step5",
        },
      });
      // when successful
      console.log(
        "edit job successful, details:",
        response.data.starOrStopEditingJobListing,
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // identify the related application
  let currentApp;
  if (inAms && !isOwn) {
    // Filter a fellow's applications for the current jobId
    const thisApp = fellow?.jobApplications?.find(
      (app: any) => app?.jobListing?.id === id,
    );
    console.log(currentApp);
    currentApp = thisApp.id;
  }

  const handleEditClick = (url: any) => {
    setJob({ ...job, beingEdited: true });
    setCanEdit(true);
    router.push(url);
  };

  const checkNonNegParamsMatch = () => {
    if (!fellow) return false;
    if (!currentJob.nonNegParams) return true;

    const { country, languages = [], skills = [] } = fellow?.profile || {};

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

  // make sure they haven't applied before
  const matchingIds = fellow?.jobApplications?.some(
    (app: any) => app.jobListing.id === currentJob.id,
  );

  const canApply =
    hasMatchingNonNegParams === true &&
    (fellow?.dailyApplications?.length || 0) < 5 &&
    !matchingIds;

  const deleteClick = () => {
    setIsBeingDeleted(true);
    showModal(
      <DeleteConfirmationModal
        continueDelete={deleteListing}
        item={"this job listing"}
      />,
    );
  };

  const deleteListing = async () => {
    try {
      const response = await deleteJobListing({
        variables: {
          id: job?.id,
        },
      });
      console.log(
        "save job successful, details:",
        response.data.deleteJobListing,
      );
      hideModal();
      router.push(`/ams`);
    } catch (error) {
      console.error("application error:", error);
    }
  };

  const saveClick = async () => {
    try {
      const response = await saveJobListing({
        variables: {
          jobId: job?.id,
        },
      });
      // when successful
      console.log(
        "save job successful, details:",
        response.data.saveJobListing,
      );
    } catch (error) {
      console.error("application error:", error);
    }
    setIsSaved(true);

    hideModal();
  };

  // USE EFFECTS
  useEffect(() => {
    if (isOwn && newPost && job && !id) {
      setCurrentJob(job);
    }
  }, [isOwn, id, job, newPost]);

  console.log("currentJob:", currentJob);

  useEffect(() => {
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    ShuffleIdealButtonPattern(setThirdColorArray);
    setPageType("jobListing");
    setCurrentPage("jobListing");
  }, [setCurrentPage, setPageType]);

  useEffect(() => {
    if (job?.beingEdited) {
      setCanEdit(true);
    }
  }, [job]);

  useEffect(() => {
    if (currentJob.saved) {
      setIsSaved(true);
    }
  }, [currentJob]);

  // RENDERING FUNCTIONS
  const renderJobListingLeftColumn = () => {
    return (
      <div className="LeftColumn flex flex-col gap-8">
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
            {currentJob?.nonNegParams && currentJob?.nonNegParams.length > 0 ? (
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
              <p className="OpenJob italic text-olive">This is an open job!</p>
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
      </div>
    );
  };

  const renderJobListingRightColumn = () => {
    return (
      <div className="RightColumn flex flex-col gap-8">
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
                    {currentJob?.business?.name}
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
            {currentJob.locationOption !== "remote" ? (
              <h2 className="LocationPayDetailsTitle mb-2 pl-2 leading-8">
                {`Location:`} {currentJob?.city}, {currentJob?.state}
              </h2>
            ) : (
              <h2 className="LocationPayDetailsTitle mb-4 pl-2">
                {`Location:`} {currentJob?.business?.businessProfile?.location},{" "}
                {currentJob?.business?.businessProfile?.country}
              </h2>
            )}

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
                    {currentJob?.daysInOffice} {`days in office, `}
                  </p>
                  <p className="HybridDetails">
                    {currentJob?.daysRemote} {`days remote.`}
                  </p>
                </div>
              </div>
            )}

            <h2 className="PayDetailsTitle mb-4 pl-2">
              {`Pay: $${new Intl.NumberFormat().format(currentJob?.payscaleMin || 0)} -
                  $${new Intl.NumberFormat().format(currentJob?.payscaleMax || 0)}`}{" "}
              {capitalizeFirstLetter(currentJob?.payOption || "")}
            </h2>

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
                {currentJob?.responsibilities?.map((responsibility, index) => {
                  return (
                    <li className="ResponsibilitiesItem" key={index}>
                      <p className="Responsibility text-jade"></p>
                      {responsibility}
                    </li>
                  );
                })}
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
    );
  };

  return (
    <div
      className={`JobListingContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%] ${textColor}`}
    >
      {loadingData ? (
        <div className="LoadingScreen flex h-[80vh] justify-center align-middle">
          <div className="LoadingText text-center text-olive">Loading...</div>
        </div>
      ) : (
        <div className="ProfileDetails flex gap-8">
          <div className="ProfileLeftColumn mt-28 flex flex-col gap-8">
            {/* TOP BUTTONS */}

            {/* business buttons - not ams // pre-published state */}
            {isOwn && !inAms && (
              <OwnListingTopButtons
                currentJob={currentJob}
                canEdit={canEdit}
                setCanEdit={setCanEdit}
                completed={currentJob.completed}
                deleteClick={deleteClick}
                isPublished={isPublished}
                setIsPublished={setIsPublished}
              />
            )}

            {/* business buttons - in ams */}
            {isOwn && inAms && <AmsTopButtons currentJob={currentJob} />}

            {/* fellow buttons */}
            {!isOwn && accountType === "Fellow" && (
              <ListingTopButtons
                id={id}
                saveClick={saveClick}
                jobSavedStatus={isSaved}
                matchingIds={matchingIds}
                appNumber={appNumber}
                currentJob={currentJob}
                canApply={canApply}
                hasMatchingNonNegParams={hasMatchingNonNegParams}
                app={currentApp ? currentApp : "no current app here"}
              />
            )}

            {/* other business buttons */}
            {!isOwn && accountType === "Business" && (
              <OtherBusinessTopButtons currentJob={currentJob} />
            )}

            {!isOwn && <AppFellowNotes currentApp={currentApp} />}

            {renderJobListingLeftColumn()}

            {/* BOTTOM BUTTONS */}

            {/* business buttons - not in ams */}
            {isOwn && !inAms && (
              <OwnJobBottomButtons
                canEdit={canEdit}
                setCanEdit={setCanEdit}
                completed={currentJob.completed}
                currentJob={currentJob}
                isPublished={isPublished}
                setIsPublished={setIsPublished}
              />
            )}

            {/* TODO: Finish these business Buttons */}
            {/* business buttons - in ams */}
            {isOwn && inAms && (
              <div className="ListingAmsBottomButtons flex flex-col items-end gap-3 self-end">
                <SiteButton
                  aria="closeListing"
                  variant="filled"
                  colorScheme="c1"
                >
                  settings / history
                </SiteButton>
                <SiteButton
                  aria="closeListing"
                  variant="filled"
                  colorScheme="f1"
                >
                  close listing
                </SiteButton>
                <SiteButton
                  aria="closeListing"
                  variant="filled"
                  colorScheme="b3"
                >
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
            {renderJobListingRightColumn()}
          </div>
        </div>
      )}
    </div>
  );
}
