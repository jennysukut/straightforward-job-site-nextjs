"use client";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";

import Image from "next/image";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import AddExperienceModal from "@/components/modals/profilePopulationModals/addExperienceModal";
import EditExperienceModal from "@/components/modals/profilePopulationModals/editExperienceModal";
import AddEducationModal from "@/components/modals/profilePopulationModals/addEducationModal";
import EditEducationModal from "@/components/modals/profilePopulationModals/editEducationModal";

export default function IndividualSignupPage2() {
  const { showModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);

  const EduTitle = "Educational Title";
  const EduYears = "2015-2020";

  const ExpTitle = "My Experience";
  const ExpCompany = "Company Name";

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
        <div className="ExperienceDetailsContainer flex flex-col">
          {/* loop through an experience list here and return info boxes with details */}
          <InfoBox
            variant="hollow"
            aria="experienceInfo"
            size="extraSmall"
            canEdit
            width="extraWide"
            title={`${ExpTitle}, ${ExpCompany}`}
            addClasses="flex w-[90%] self-end justify-between"
            editClick={() => showModal(<EditExperienceModal />)}
          ></InfoBox>
        </div>

        {/* add education / certificates */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="education"
          canAdd
          width="extraWide"
          title={`Your Education / Certificates`}
          addClasses="flex justify-between w-full"
          addClick={() => showModal(<AddEducationModal />)}
        ></InfoBox>

        {/* if there's education, display them in an info box here, with a little pencil for editing */}
        <div className="EducationDetailsContainer flex flex-col">
          {/* loop through an education list here and return info boxes with details */}
          <InfoBox
            variant="hollow"
            aria="educationInfo"
            size="extraSmall"
            canEdit
            width="extraWide"
            title={`${EduTitle}, ${EduYears}`}
            addClasses="flex w-[90%] self-end justify-between"
            editClick={() => showModal(<EditEducationModal />)}
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
