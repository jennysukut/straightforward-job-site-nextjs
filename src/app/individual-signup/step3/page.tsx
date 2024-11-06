"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";

import Image from "next/image";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import AddEducationModal from "@/components/modals/profilePopulationModals/addEducationModal";
import AddAwardsModal from "@/components/modals/profilePopulationModals/addAwardsModal";

export default function IndividualSignupPage3() {
  const { showModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [awards, setAwards] = useState<any[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<any[]>([]);
  const [accomplishments, setAccomplishments] = useState<any[]>([]);

  const addAward = (award: any) => {
    setAwards((prevAwards) => {
      if (!prevAwards || !Array.isArray(prevAwards)) {
        return [award];
      }
      return [...prevAwards, award];
    });
  };

  const addExperienceLevel = (experienceLevel: any) => {
    setExperienceLevels((prevExpLev) => {
      if (!prevExpLev || !Array.isArray(prevExpLev)) {
        return [experienceLevel];
      }
      return [...prevExpLev, experienceLevel];
    });
  };

  const addAccomplishments = (accomplishment: any) => {
    setAccomplishments((prevAccomplishment) => {
      if (!prevAccomplishment || !Array.isArray(prevAccomplishment)) {
        return [accomplishment];
      }
      return [...prevAccomplishment, accomplishment];
    });
  };

  const handleSubmit = () => {
    // setFellow({
    //   awards: awards,
    //   experienceLevels: experienceLevels,
    //   accomplishments: accomplishments,
    // });
    //send this data to the server as well
    console.log(fellow);
    //navigate to the next page
    // router.push("/individual-signup/step2");
  };

  return (
    <div className="IndividualSignupPage3 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <Image
          className="AvatarImage -mt-14 justify-end self-end drop-shadow-lime"
          src="/avatars/orange-floral.svg"
          width={75}
          height={75}
          alt="avatar"
        />

        {/* add awards / honors */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="awards"
          canAdd
          width="extraWide"
          title={`Your Awards or Honors`}
          addClasses="flex justify-between w-full"
          addClick={() => showModal(<AddAwardsModal addAward={addAward} />)}
        ></InfoBox>

        {/* awards / honors details */}
        {awards.length > 0 && (
          <div className="AwardsDetailsContainer flex flex-col gap-4">
            {awards.map((award) => {
              return (
                <InfoBox
                  key={award}
                  variant="hollow"
                  aria="awardsInfo"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  title={`${award.title}, ${award.givenBy}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  editClick={() => showModal(<AddAwardsModal canDelete />)}
                ></InfoBox>
              );
            })}
          </div>
        )}

        {/* add experience levels */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="experienceLevels"
          canAdd
          width="extraWide"
          title={`Your Experience Levels`}
          addClasses="flex justify-between w-full"
          addClick={() =>
            showModal(
              <AddEducationModal addExperienceLevel={addExperienceLevel} />,
            )
          }
        ></InfoBox>

        {/* experience level details*/}
        {experienceLevels.length > 0 && (
          <div className="ExperienceLevelDetailsContainer flex flex-col gap-4">
            {experienceLevels.map((level) => {
              return (
                <InfoBox
                  key={level}
                  variant="hollow"
                  aria="experienceLevel"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  // title={`${education.degree}, ${education.school}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  // editClick={() => showModal(<EditEducationModal />)}
                ></InfoBox>
              );
            })}
          </div>
        )}

        {/* add additional accomplishments */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="accomplishments"
          canAdd
          width="extraWide"
          title={`Your Additional Accomplishments`}
          addClasses="flex justify-between w-full"
          addClick={() =>
            showModal(
              <AddEducationModal addExperienceLevel={addExperienceLevel} />,
            )
          }
        ></InfoBox>

        {/* additional accomplishments  details*/}
        {accomplishments.length > 0 && (
          <div className="AccomplishmentDetailsContainer flex flex-col gap-4">
            {accomplishments.map((accomplishment) => {
              return (
                <InfoBox
                  key={accomplishment}
                  variant="hollow"
                  aria="experienceLevel"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  // title={`${education.degree}, ${education.school}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  // editClick={() => showModal(<EditEducationModal />)}
                ></InfoBox>
              );
            })}
          </div>
        )}

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            // onClick={handleSubmit(onSubmit)}
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
