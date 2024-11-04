"use client";

import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import Image from "next/image";
import { useModal } from "@/contexts/ModalContext";
import AddExperienceModal from "@/components/modals/profilePopulationModals/addExperienceModal";
import { useState } from "react";

export default function IndividualSignupPage2() {
  const { showModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);

  const EduTitle = "Educational Title";
  const EduYears = "2015-2020";

  return (
    <div className="IndividualSignupPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <Image
          className="AvatarImage -mt-14 justify-end self-end drop-shadow-lime"
          src="/avatars/orange-floral.svg"
          width={75}
          height={75}
          alt="avatar"
        />

        {/* add experience */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="experience"
          canAdd
          width="extraWide"
          title={`Your Experience`}
          addClasses="flex justify-between w-full"
          addClick={() => showModal(<AddExperienceModal />)}
        ></InfoBox>

        {/* if there's experience, display them in an info box here, with a little pencil for editing */}

        {/* add education / certificates */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="education"
          canAdd
          width="extraWide"
          title={`Your Education / Certificates`}
          addClasses="flex justify-between w-full"
          addClick={() => showModal(<AddExperienceModal />)}
        ></InfoBox>

        <div className="EducationDetailsContainer flex flex-col">
          {/* if there's education, display them in an info box here, with a little pencil for editing */}
          <InfoBox
            variant="hollow"
            aria="educationInfo"
            size="extraSmall"
            canEdit
            width="extraWide"
            title={`${EduTitle}, ${EduYears}`}
            addClasses="flex w-[90%] self-end justify-between"
          ></InfoBox>
        </div>

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            // onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
