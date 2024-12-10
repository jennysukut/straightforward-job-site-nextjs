"use client";

import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";

import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import SiteLabel from "@/components/siteLabel";
import ShuffleIdealButtonPattern from "@/components/shuffleIdealButtonPattern";

export default function JobListing() {
  const { business, setBusiness } = useBusiness();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const { setPageType } = usePageContext();
  const { showModal } = useModal();

  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [thirdColorArray, setThirdColorArray] = useState(Array<any>);

  const handleEditClick = (url: any) => {
    setBusiness({ ...business, profileIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

  const currentJob = business?.activeJobs[latestArrayIndex];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    ShuffleIdealButtonPattern(setThirdColorArray);
  }, []);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      <div className="JobListingContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%]">
        <div className="ProfileDetails flex gap-8">
          <div className="ProfileLeftColumn mt-24 flex flex-col gap-8">
            {/* Non-Negotiable Parameters */}
            <InfoBox
              variant="hollow"
              aria="nonNegotiableParameters"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step1")}
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
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step1")}
            >
              <h2 className="NonNegotiableParametersTitle text-center">{`Preferred Skills:`}</h2>
              <div className="NonNegotiableParametersContainer -mb-2 mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
                {currentJob?.preferredSkills &&
                currentJob?.preferredSkills.length > 0 ? (
                  currentJob?.preferredSkills.map(
                    (skill: any, index: number) => {
                      return (
                        <SiteLabel
                          aria={skill}
                          variant="display"
                          key={skill}
                          colorScheme={
                            primaryColorArray[index % primaryColorArray.length]
                          }
                        >
                          {skill}
                        </SiteLabel>
                      );
                    },
                  )
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
              editClick={() => handleEditClick("/individual-signup/step2")}
            >
              <h2 className="InterviewProcessTitle mb-4 pl-2">{`Our Interview Process:`}</h2>
              <ul className="InterviewProcessList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {currentJob.interviewProcess.map((int: any, index: number) => {
                  return (
                    <li className="InterviewProcessItem" key={index}>
                      <p className="Stage">
                        {int.stage}:
                        <span className="Step">
                          {` `}
                          {int.step}
                        </span>
                      </p>
                      <p className="Details pt-4 text-jade">{int.details}</p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>

            {/* Edit Buttons */}
            {/* {isOwn && (
            <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
              <SiteButton
                variant="filled"
                colorScheme="b6"
                aria="edit"
                addClasses="px-8"
                onClick={() => setCanEdit(!canEdit)}
              >
                edit
              </SiteButton>
              <SiteButton
                aria="post a job"
                variant="filled"
                colorScheme="f1"
                addClasses="px-8"
                onClick={() => showModal(<PostAJobModal />)}
              >
                post a job
              </SiteButton>
            </div>
          )} */}
          </div>

          <div className="ProfileRightColumn flex flex-col gap-8">
            {/* Job Title, Business Name, & Small Summary */}
            <InfoBox
              aria="business"
              variant="hollow"
              addClasses="gap-8 justify-evenly"
              size="profile"
              canEdit={canEdit}
              editClick={() => handleEditClick("/business-signup/step1")}
            >
              <div className="JobTitleDetailsContainer flex flex-col gap-4 pl-4">
                <h1 className="JobTitle">{currentJob.jobTitle}</h1>
                <p className="BusinessName -mt-6 pt-4 text-lg italic leading-6">
                  {business?.businessName}
                </p>
                <p className="PositionSummary pl-4 pt-4 leading-7 text-olive">
                  {currentJob.positionSummary}
                </p>
              </div>
            </InfoBox>
            {/* Location, LocationType, and Email */}
            <InfoBox
              variant="hollow"
              aria="location"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/business-signup/step1")}
            >
              <div className="LocationWebsiteEmailInfo flex flex-col gap-4">
                <h2 className="InterviewProcessTitle mb-4 pl-2">
                  {`Location:`} {business?.location}, {business?.country}
                </h2>
                <h2 className="InterviewProcessTitle mb-4 pl-2">
                  {`Location Type:`}{" "}
                  {capitalizeFirstLetter(currentJob.locationType)}
                </h2>
                <h2 className="InterviewProcessTitle mb-4 pl-2">
                  {`Pay:`} {currentJob?.payDetails.payscale},{" "}
                  {capitalizeFirstLetter(currentJob?.payDetails.payOption)}
                </h2>
                <h2 className="InterviewProcessTitle mb-0 pl-2">
                  {`Position Type:`}{" "}
                  {capitalizeFirstLetter(currentJob?.positionType)}
                </h2>
              </div>
            </InfoBox>

            {/* More About The Position */}
            <InfoBox
              variant="hollow"
              aria="moreAboutBusiness"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/business-signup/step2")}
            >
              {/* more about the job */}
              <h2 className="AboutJobTitle pb-4 pl-2 pt-2">{`About This Position:`}</h2>
              <p className="AboutJob pl-8 pt-4 font-medium leading-8 text-midnight">
                {currentJob.moreAboutPosition}
              </p>
              {/* responsibilities */}
              <div className="Responsibilities mt-8">
                <h2 className="ResponsibilitiesTitle mb-4 pl-2">{`Responsibilities:`}</h2>
                <ul className="ResponsibilitiesList ml-8 flex list-disc flex-col gap-4 text-jade">
                  {currentJob.responsibilities.map(
                    (resp: any, index: number) => {
                      return (
                        <li className="ResponsibilitiesItem" key={index}>
                          <p className="Responsibility">{resp}</p>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
              {/* perks */}
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
                          primaryColorArray[index % primaryColorArray.length]
                        }
                      >
                        {perk}
                      </SiteLabel>
                    );
                  })}
                </ul>
              </div>
            </InfoBox>
            {/* ideal candidate details */}
            <InfoBox
              variant="hollow"
              aria="idealCandidate"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="PetDetailsTitle mb-4 pl-2">{`Our Ideal Candidate:`}</h2>
              <p className="PetDetails ml-8 font-medium text-olive">
                {currentJob.idealCandidate}
              </p>
            </InfoBox>
          </div>
        </div>
      </div>
    </div>
  );
}
