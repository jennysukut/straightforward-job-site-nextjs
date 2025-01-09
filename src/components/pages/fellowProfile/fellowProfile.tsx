import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useColors } from "@/contexts/ColorContext";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { avatarOptions } from "@/lib/stylingData/avatarOptions";
import { ButtonColorOption } from "@/lib/stylingData/buttonColors";
import { useJob } from "@/contexts/JobContext";
import { useModal } from "@/contexts/ModalContext";
import {
  OwnFellowTopButtons,
  OwnFellowBottomButtons,
  OwnFellowAppTopButtons,
  OwnFellowAppBottomButtons,
  OwnAppMessage,
} from "../fellowProfile/ownProfileButtons";
import {
  AppFellowTopButtons,
  AppFellowBottomButtons,
  AppMessage,
  AppFellowNotes,
} from "./applicationProfileOptions";

import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteLabel from "../../buttonsAndLabels/siteLabel";
import SiteButton from "../../buttonsAndLabels/siteButton";
import Avatar from "../../avatarComponent";
import ShuffleIdealButtonPattern from "../../buttonsAndLabels/shuffleIdealButtonPattern";
import ApplicationNoteModal from "@/components/modals/applicationModals/applicationNoteModal";

interface FellowProfile {
  hasId?: boolean;
  id?: string;
  self?: any;
  isOwn?: boolean;
  isApp?: boolean;
  appId?: string;
}

const FellowProfile: React.FC<FellowProfile> = ({
  hasId,
  id,
  self,
  isOwn,
  isApp,
  appId,
}) => {
  const { fellow, setFellow } = useFellow();
  const { setPageType, setAccountType } = usePageContext();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { applications } = useApplications();
  const { jobListings } = useJobListings();
  const { showModal } = useModal();
  const router = useRouter();

  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [thirdColorArray, setThirdColorArray] = useState(Array<any>);
  const [canEdit, setCanEdit] = useState(false);

  // define the current fellow
  let currentFellow;
  if (hasId) {
    //if the fellow has an Id, it's being accessed by a business, so we'll need to take the id from the parameters and find the fellow who's information we're using
    currentFellow = fellow;
  } else {
    //if it's just the currentFellow, we'll pass the fellow parameter through here?
    currentFellow = self || fellow;
  }

  let currentApp: any;
  let currentJob: any;
  if (isApp) {
    currentApp = applications?.find((app) => app.id === appId);
    currentJob = jobListings?.find((job) => job.jobId === currentApp.jobId);
  }

  let avatarDetails;
  if (fellow) {
    avatarDetails = avatarOptions.find(
      (option) => option.title === fellow?.avatar,
    );
  }

  const viewJobDetails = () => {
    router.push(`/listing/${currentApp.jobId}`);
  };

  const handleEditClick = (url: any) => {
    setFellow({ ...fellow, profileIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  const addMoreInfo = () => {
    setFellow({ ...fellow, addMoreInfo: true });
    router.push("/individual-signup/step1");
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
    ShuffleIdealButtonPattern(setThirdColorArray);
  }, []);

  return (
    <div
      className={`ProfileContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%] ${textColor}`}
    >
      {/* PROFILE DETAILS */}
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn mt-36 flex flex-col gap-8">
          {/* TOP BUTTON OPTIONS */}
          {isOwn && !isApp && (
            <OwnFellowTopButtons
              setCanEdit={setCanEdit}
              canEdit={canEdit}
              addMoreInfo={addMoreInfo}
            />
          )}

          {isOwn && isApp && (
            <OwnFellowAppTopButtons
              currentApp={currentApp}
              currentJob={currentJob}
            />
          )}

          {!isOwn && isApp && (
            <AppFellowTopButtons
              app={currentApp}
              applicant={currentFellow.name}
            />
          )}

          {/* Business Note On App */}
          {!isOwn && isApp && currentApp.businessNote.length > 0 && (
            <AppFellowNotes currentApp={currentApp} />
          )}

          {/* SKILLS DETAILS */}
          <InfoBox
            variant="hollow"
            aria="skills"
            size="profile"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/individual-signup/step1")}
          >
            <h2 className="SkillsTitle text-center">{`My Skills:`}</h2>
            <div className="SkillsContainer -mb-2 mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
              {currentFellow?.skills && currentFellow.skills.length > 0 ? (
                currentFellow.skills.map((skill: any, index: number) => {
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
                })
              ) : (
                <p>No skills available.</p>
              )}
            </div>
          </InfoBox>
          {currentFellow?.education && (
            <InfoBox
              variant="hollow"
              aria="education"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step2")}
            >
              <h2 className="EducationTitle mb-4 pl-2">{`My Education:`}</h2>
              <ul
                className={`EducationList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.education.map((edu: any, index: number) => {
                  return (
                    <li className="EducationItem" key={index}>
                      <p className="DegreeFOS">
                        {edu.degree},
                        <span className="FieldOfStudy">
                          {` `}
                          {edu.fieldOfStudy}
                        </span>
                      </p>
                      <p className={`School italic ${textColor}`}>
                        {edu.school}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.experience && (
            <InfoBox
              variant="hollow"
              aria="experience"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step2")}
            >
              <h2 className="ExperienceTitle mb-4 pl-2">{`My Experience:`}</h2>
              <ul
                className={`ExperienceList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.experience.map((exp: any, index: number) => {
                  return (
                    <li className="ExperienceItem" key={index}>
                      <p className="JobTitle pr-4">
                        {exp.title},
                        <span className="Company italic">
                          {` `}
                          {exp.companyName}
                        </span>
                        {exp.yearDetails && (
                          <span className={`Years italic ${textColor}`}>
                            {` - `}
                            {exp.yearDetails}
                          </span>
                        )}
                      </p>
                      {exp.details && (
                        <p
                          className={`Details mt-2 text-sm font-medium ${secondaryTextColor}`}
                        >
                          {exp.details}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.awards.length >= 1 && (
            <InfoBox
              variant="hollow"
              aria="awards"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="AwardsTitle mb-4 pl-2">{`Awards / Honors:`}</h2>
              <ul
                className={`AwardsList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.awards.map((award: any, index: number) => {
                  return (
                    <li className="AwardItem" key={index}>
                      <p className="AwardTitle pr-4">{award.awardTitle},</p>
                      <p className="GivenBy italic">{award.givenBy}</p>
                      {award.awardDetails && (
                        <p
                          className={`Details mt-2 text-sm font-medium ${textColor}`}
                        >
                          {award.awardDetails}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.experienceLevels && (
            <InfoBox
              variant="hollow"
              aria="expLevels"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="ExperienceLevelTitle mb-4 pl-2">{`Experience Levels:`}</h2>
              <ul
                className={`ExperienceLevelList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.experienceLevels.map(
                  (exp: any, index: number) => {
                    return (
                      <li className="ExperienceLevelItem" key={index}>
                        <p className="ExperienceLevelAndSkill pr-4">
                          {exp.experienceLevel}: {exp.expLevelSkill}
                        </p>
                        {exp.skillYears && (
                          <p
                            className={`Details mt-2 font-medium italic ${secondaryTextColor}`}
                          >
                            {exp.skillYears}
                          </p>
                        )}
                      </li>
                    );
                  },
                )}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.bookOrQuote && (
            <InfoBox
              variant="hollow"
              aria="bookOrQuote"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="BookOrQuoteTitle mb-4 pl-2">{`Books / Quotes I Enjoy:`}</h2>
              <ul
                className={`BookOrQuoteList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.bookOrQuote.map((bq: any, index: number) => {
                  return (
                    <li className="BookOrQuoteItem" key={index}>
                      <p className="BookOrQuote">{bq.bookOrQuote}</p>
                      <p className={`Author italic ${textColor}`}>
                        - {bq.author}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.petDetails && (
            <InfoBox
              variant="hollow"
              aria="petInfo"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="PetDetailsTitle mb-4 pl-2">{`Pertaining To Pets:`}</h2>
              <p
                className={`PetDetails ml-8 font-medium ${secondaryTextColor}`}
              >
                {currentFellow.petDetails}
              </p>
            </InfoBox>
          )}

          {/* BOTTOM BUTTON OPTIONS */}
          {isOwn && !isApp && (
            <OwnFellowBottomButtons
              setCanEdit={setCanEdit}
              canEdit={canEdit}
              addMoreInfo={addMoreInfo}
            />
          )}
          {isOwn && isApp && (
            <OwnFellowAppBottomButtons
              avatarDetails={avatarDetails}
              router={router}
              viewJobDetails={viewJobDetails}
            />
          )}
          {!isOwn && isApp && (
            <AppFellowBottomButtons
              app={currentApp}
              applicant={currentFellow.name}
            />
          )}
        </div>
        <div className="ProfileRightColumn flex flex-col gap-8">
          {/* NAME AND SMALL BIO */}
          <div className="FellowName mr-8">
            <InfoBox
              aria="fellow"
              variant="hollow"
              size="profile"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step1")}
            >
              <div className="NameBioAvatarContainer flex items-center gap-8">
                {/* need to make option for the avatar to show a not-self avatar based off the person's avatar choice */}
                <Avatar
                  addClasses="self-start min-w-[60px]"
                  avatarType="Fellow"
                  fellow={currentFellow}
                />
                <div className="NameBioContainer">
                  <h1 className="Name">{currentFellow?.name}</h1>
                  <p className="SmallBio min-w-[20vw] pt-4 leading-6">
                    {currentFellow?.smallBio ||
                      "Small Bio Placeholder - When filled out, the small bio & details for the fellow will go here!"}
                  </p>
                </div>
              </div>
            </InfoBox>
          </div>

          {/* APP MESSAGE FOR REVIEW */}
          {isApp && isOwn && (
            <OwnAppMessage
              avatarDetails={avatarDetails}
              currentApp={currentApp}
            />
          )}

          {/* APP MESSAGE TO BUSINESS */}
          {isApp && !isOwn && (
            <AppMessage
              avatarDetails={avatarDetails}
              currentFellow={currentFellow}
              currentApp={currentApp}
            />
          )}

          <InfoBox
            variant="hollow"
            aria="location"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/individual-signup/step1")}
          >
            <div className="LocationInfo flex flex-col gap-2">
              <p className={`Location ml-2 ${titleColor}`}>
                Location: {currentFellow?.location}, {currentFellow?.country}
              </p>
            </div>
          </InfoBox>

          <InfoBox
            variant="hollow"
            aria="locationTypes"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/individual-signup/step4")}
          >
            <div className="LocationTypesInfo flex flex-col gap-2">
              <h2 className="LocationTitle text-center">{`My Work Location Types:`}</h2>
              <div className="LocationTypes -mb-2 mt-4 flex items-center justify-evenly gap-2 self-center">
                {currentFellow?.locationOptions.map(
                  (opt: any, index: number) => {
                    return (
                      <SiteLabel
                        variant="display"
                        aria="locationOption"
                        key={index}
                        size="medium"
                        colorScheme={
                          thirdColorArray[index % thirdColorArray.length]
                        }
                      >
                        {opt}
                      </SiteLabel>
                    );
                  },
                )}
              </div>
            </div>
          </InfoBox>

          {currentFellow?.links && (
            <InfoBox
              variant="hollow"
              aria="links"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step6")}
            >
              <h2 className="LinksTitle mb-4 pl-2">{`${currentFellow.name}'s Links:`}</h2>
              <div className="Links ml-8 flex flex-col gap-2">
                {currentFellow?.links && (
                  <div className="LinksList mt-2 flex flex-col gap-2">
                    {currentFellow.links.map((link: any, index: number) => {
                      return (
                        <div className="Link" key={index}>
                          <p className={`Link ${titleColor}`}>
                            {link.linkType} {`: `}
                          </p>
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium italic ${secondaryTextColor}`}
                          >
                            {link.link}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </InfoBox>
          )}

          <InfoBox
            variant="hollow"
            aria="jobTitles"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/individual-signup/step1")}
          >
            <h2 className="JobTitlesTitle text-center">{`My Job Titles:`}</h2>
            <div className="JobTitlesContainer -mb-2 mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1">
              {currentFellow?.jobTitles &&
              currentFellow.jobTitles.length > 0 ? (
                currentFellow.jobTitles.map((title: any, index: number) => {
                  return (
                    <SiteLabel
                      aria={title}
                      variant="display"
                      key={index}
                      size="medium"
                      colorScheme={
                        secondaryColorArray[index % secondaryColorArray.length]
                      }
                    >
                      {title}
                    </SiteLabel>
                  );
                })
              ) : (
                <p>No job titles available.</p>
              )}
            </div>
          </InfoBox>
          {currentFellow?.passions && (
            <InfoBox
              variant="hollow"
              aria="passionateAbout"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step4")}
            >
              <h2
                className={`PassionateAboutTitle mb-4 pl-2 ${titleColor}`}
              >{`What I'm Passionate About:`}</h2>
              <p className="PassionateAbout text-md px-6 font-medium">
                {currentFellow.passions}
              </p>
            </InfoBox>
          )}
          {currentFellow?.lookingFor && (
            <InfoBox
              variant="hollow"
              aria="lookingFor"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step4")}
            >
              <h2
                className={`LookingForTitle mb-4 pl-2 ${titleColor}`}
              >{`What I'm Looking For:`}</h2>
              <p className="LookingForSubtitle -mt-4 px-3 italic">{`in a job/company`}</p>
              <p
                className={`LookingFor text-md mt-4 px-6 font-medium ${secondaryTextColor}`}
              >
                {currentFellow.lookingFor}
              </p>
            </InfoBox>
          )}
          {currentFellow?.hobbies && (
            <InfoBox
              variant="hollow"
              aria="hobbies"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="HobbiesTitle mb-4 pl-2">{`My Hobbies / Pastimes:`}</h2>
              <ul
                className={`BookOrQuoteList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.hobbies.map((hobby: any, index: number) => {
                  return (
                    <li className={`HobbyItem ${textColor}`} key={index}>
                      <p className="Hobby">
                        {hobby.hobbyTitle}
                        {hobby.howLong && (
                          <span className="HobbyTimeline">
                            {", "}
                            {hobby.howLong}
                          </span>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.accomplishments.length >= 1 && (
            <InfoBox
              variant="hollow"
              aria="accomplishments"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="AccomplishmentsTitle mb-4 pl-2">{`Other Accomplishments:`}</h2>
              <ul
                className={`BookOrQuoteList ml-8 flex list-disc flex-col gap-4 ${titleColor}`}
              >
                {currentFellow.accomplishments.map(
                  (acc: any, index: number) => {
                    return (
                      <li
                        className={`AccomplishmentItem ${textColor}`}
                        key={index}
                      >
                        <p className="Accomplishment">{acc.accTitle}</p>
                        {acc.accDetails && (
                          <p
                            className={`AccomplishmentDetails mt-2 font-medium italic ${secondaryTextColor}`}
                          >
                            {acc.accDetails}
                          </p>
                        )}
                      </li>
                    );
                  },
                )}
              </ul>
            </InfoBox>
          )}
          {currentFellow?.aboutMe && (
            <InfoBox
              variant="hollow"
              aria="moreAboutMe"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step6")}
            >
              <h2
                className={`AboutMeTitle mb-4 pl-2 ${titleColor}`}
              >{`More About Me:`}</h2>
              <p className="AboutMe text-md px-6 font-medium">
                {currentFellow.aboutMe}
              </p>
            </InfoBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default FellowProfile;
