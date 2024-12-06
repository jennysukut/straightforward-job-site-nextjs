import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";

import InfoBox from "./infoBox";
import SiteLabel from "./siteLabel";
import SiteButton from "./siteButton";
import Avatar from "./avatarComponent";
import ShuffleIdealButtonPattern from "./shuffleIdealButtonPattern";

export default function FellowProfile({ fellow }: any, isOwn: boolean) {
  const { setFellow } = useFellow();
  const router = useRouter();

  const [primaryColorArray, setPrimaryColorArray] = useState(Array<any>);
  const [secondaryColorArray, setSecondaryColorArray] = useState(Array<any>);
  const [canEdit, setCanEdit] = useState(false);

  const handleEditClick = (url: any) => {
    setFellow({ ...fellow, profileIsBeingEdited: true });
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setPrimaryColorArray);
    ShuffleIdealButtonPattern(setSecondaryColorArray);
  }, []);

  // WE NEED TO ADD LINKS IN A SEPARATE BOX AND ADD LOCATION OPTIONS TO THE LOCATION BOX

  return (
    <div className="ProfileContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%]">
      {/* NAME AND SMALL BIO */}
      <div className="FellowName self-end">
        <InfoBox
          aria="fellow"
          variant="hollow"
          addClasses="gap-8 justify-between"
          size="profile"
          canEdit={canEdit}
          editClick={() => handleEditClick("/individual-signup/step1")}
        >
          <div className="NameBioAvatarContainer flex justify-between gap-8">
            <Avatar addClasses="self-center" />
            <div className="NameBioContainer">
              <h1 className="Name">{fellow?.name}</h1>
              <p className="SmallBio pt-4 leading-6">
                {fellow?.smallBio ||
                  "Small Bio Placeholder - When filled out, the small bio & details for the fellow will go here!"}
              </p>
            </div>
          </div>
        </InfoBox>
      </div>
      {/* PROFILE DETAILS */}
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn flex flex-col gap-8">
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
              {fellow?.skills && fellow.skills.length > 0 ? (
                fellow.skills.map((skill: any, index: number) => {
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
          {fellow?.education && (
            <InfoBox
              variant="hollow"
              aria="education"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step2")}
            >
              <h2 className="EducationTitle mb-4 pl-2">{`My Education:`}</h2>
              <ul className="EducationList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.education.map((edu: any, index: number) => {
                  return (
                    <li className="EducationItem" key={index}>
                      <p className="DegreeFOS">
                        {edu.degree},
                        <span className="FieldOfStudy">
                          {` `}
                          {edu.fieldOfStudy}
                        </span>
                      </p>
                      <p className="School italic text-jade">{edu.school}</p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.experience && (
            <InfoBox
              variant="hollow"
              aria="experience"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step2")}
            >
              <h2 className="ExperienceTitle mb-4 pl-2">{`My Experience:`}</h2>
              <ul className="ExperienceList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.experience.map((exp: any, index: number) => {
                  return (
                    <li className="ExperienceItem" key={index}>
                      <p className="JobTitle pr-4">
                        {exp.title},
                        <span className="Company italic">
                          {` `}
                          {exp.companyName}
                        </span>
                        {exp.yearDetails && (
                          <span className="Years italic text-jade">
                            {` - `}
                            {exp.yearDetails}
                          </span>
                        )}
                      </p>
                      {exp.details && (
                        <p className="Details mt-2 text-sm font-medium text-olive">
                          {exp.details}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.awards && (
            <InfoBox
              variant="hollow"
              aria="awards"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="AwardsTitle mb-4 pl-2">{`Awards / Honors:`}</h2>
              <ul className="AwardsList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.awards.map((award: any, index: number) => {
                  return (
                    <li className="AwardItem" key={index}>
                      <p className="AwardTitle pr-4">{award.awardTitle},</p>
                      <p className="GivenBy italic">{award.givenBy}</p>
                      {award.awardDetails && (
                        <p className="Details mt-2 text-sm font-medium text-jade">
                          {award.awardDetails}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.experienceLevels && (
            <InfoBox
              variant="hollow"
              aria="expLevels"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="ExperienceLevelTitle mb-4 pl-2">{`Experience Levels:`}</h2>
              <ul className="ExperienceLevelList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.experienceLevels.map((exp: any, index: number) => {
                  return (
                    <li className="ExperienceLevelItem" key={index}>
                      <p className="ExperienceLevelAndSkill pr-4">
                        {exp.experienceLevel}: {exp.expLevelSkill}
                      </p>
                      {exp.skillYears && (
                        <p className="Details mt-2 font-medium italic text-olive">
                          {exp.skillYears}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.bookOrQuote && (
            <InfoBox
              variant="hollow"
              aria="bookOrQuote"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="BookOrQuoteTitle mb-4 pl-2">{`Books / Quotes I Enjoy:`}</h2>
              <ul className="BookOrQuoteList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.bookOrQuote.map((bq: any, index: number) => {
                  return (
                    <li className="BookOrQuoteItem" key={index}>
                      <p className="BookOrQuote">{bq.bookOrQuote}</p>
                      <p className="Author italic text-jade">- {bq.author}</p>
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.petDetails && (
            <InfoBox
              variant="hollow"
              aria="petInfo"
              size="profile"
              width="small"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="PetDetailsTitle mb-4 pl-2">{`Pertaining To Pets:`}</h2>
              <p className="PetDetails ml-8 text-olive">{fellow.petDetails}</p>
            </InfoBox>
          )}
        </div>
        <div className="ProfileRightColumn flex flex-col gap-8">
          <InfoBox
            variant="hollow"
            aria="location"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/individual-signup/step1")}
          >
            <div className="LocationAndLinks flex flex-col gap-2">
              <p className="Location text-emerald">
                Location: {fellow?.location}, {fellow?.country}
              </p>
              {fellow?.links && (
                <div className="LinksList mt-2 flex flex-col gap-2">
                  {fellow.links.map((link: any, index: number) => {
                    return (
                      <div className="Link" key={index}>
                        <p className="Link text-emerald">
                          {link.linkType} {`: `}
                        </p>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium italic text-olive"
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
              {fellow?.jobTitles && fellow.jobTitles.length > 0 ? (
                fellow.jobTitles.map((title: any, index: number) => {
                  return (
                    <SiteLabel
                      aria={title}
                      variant="display"
                      key={index}
                      addClasses="px-8"
                      colorScheme={
                        secondaryColorArray[index % secondaryColorArray.length]
                      }
                    >
                      {title}
                    </SiteLabel>
                  );
                })
              ) : (
                <p>No skills available.</p>
              )}
            </div>
          </InfoBox>
          {fellow?.passions && (
            <InfoBox
              variant="hollow"
              aria="passionateAbout"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step4")}
            >
              <h2 className="PassionateAboutTitle mb-4 pl-2 text-emerald">{`What I'm Passionate About:`}</h2>
              <p className="PassionateAbout text-md px-6 font-medium">
                {fellow.passions}
              </p>
            </InfoBox>
          )}
          {fellow?.lookingFor && (
            <InfoBox
              variant="hollow"
              aria="lookingFor"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step4")}
            >
              <h2 className="LookingForTitle mb-4 pl-2 text-emerald">{`What I'm Looking For:`}</h2>
              <p className="LookingForSubtitle -mt-4 px-3 italic">{`in a job/company`}</p>
              <p className="LookingFor text-md mt-4 px-6 font-medium text-olive">
                {fellow.lookingFor}
              </p>
            </InfoBox>
          )}
          {fellow?.hobbies && (
            <InfoBox
              variant="hollow"
              aria="hobbies"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step5")}
            >
              <h2 className="HobbiesTitle mb-4 pl-2">{`My Hobbies / Pastimes:`}</h2>
              <ul className="BookOrQuoteList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.hobbies.map((hobby: any, index: number) => {
                  return (
                    <li className="HobbyItem text-jade" key={index}>
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
          {fellow?.accomplishments && (
            <InfoBox
              variant="hollow"
              aria="accomplishments"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step3")}
            >
              <h2 className="AccomplishmentsTitle mb-4 pl-2">{`Other Accomplishments:`}</h2>
              <ul className="BookOrQuoteList ml-8 flex list-disc flex-col gap-4 text-emerald">
                {fellow.accomplishments.map((acc: any, index: number) => {
                  return (
                    <li className="AccomplishmentItem text-jade" key={index}>
                      <p className="Accomplishment">{acc.accTitle}</p>
                      {acc.accDetails && (
                        <p className="AccomplishmentDetails mt-2 font-medium italic text-olive">
                          {acc.accDetails}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </InfoBox>
          )}
          {fellow?.aboutMe && (
            <InfoBox
              variant="hollow"
              aria="moreAboutMe"
              size="profile"
              width="medium"
              canEdit={canEdit}
              editClick={() => handleEditClick("/individual-signup/step6")}
            >
              <h2 className="AboutMeTitle mb-4 pl-2 text-emerald">{`More About Me:`}</h2>
              <p className="AboutMe text-md px-6 font-medium">
                {fellow.aboutMe}
              </p>
            </InfoBox>
          )}
          {isOwn && (
            <SiteButton
              variant="filled"
              colorScheme="b6"
              aria="edit"
              addClasses="px-8"
              onClick={() => setCanEdit(!canEdit)}
            >
              edit details
            </SiteButton>
          )}
        </div>
      </div>
    </div>
  );
}
