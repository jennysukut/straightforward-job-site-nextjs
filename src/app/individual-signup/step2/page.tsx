"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";

import Image from "next/image";
import InfoBox from "@/components/infoBox";
import SiteButton from "@/components/siteButton";
import AddExperienceModal from "@/components/modals/profilePopulationModals/addExperienceModal";
import AddEducationModal from "@/components/modals/profilePopulationModals/addEducationModal";

export default function IndividualSignupPage2() {
  const { showModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState<any[]>([]);
  const [educationDetails, setEducationDetails] = useState<any[]>([]);
  const [experienceCounter, setExperienceCounter] = useState(1);

  const addExperience = (experience: any) => {
    const newExperience = { ...experience, id: experienceCounter };
    setExperienceCounter((prev) => prev + 1);
    setExperienceDetails((prevDetails) => {
      if (!prevDetails || !Array.isArray(prevDetails)) {
        return [newExperience];
      }
      return [...prevDetails, newExperience];
    });
    console.log("experience id:", newExperience.id);
  };

  // experience handlers
  const updateExperience = (updatedExperience: any, id: any) => {
    setExperienceDetails((prevDetails) => {
      return prevDetails.map((experience) => {
        if (experience.id === id) {
          return { ...experience, ...updatedExperience };
        }
        return experience;
      });
    });
    console.log("Updated experience details:", experienceDetails);
    setFellow({ experience: experienceDetails });
  };

  const deleteExperience = (id: any) => {
    console.log("trying to delete experience with the id:", id);
    setExperienceDetails((prevDetails) =>
      prevDetails.filter((experience) => experience.id !== id),
    );
  };

  // education handlers
  const addEducation = (education: any) => {
    setEducationDetails((prevDetails) => {
      if (!prevDetails || !Array.isArray(prevDetails)) {
        return [education];
      }
      return [...prevDetails, education];
    });
  };

  const handleSubmit = () => {
    setFellow({ experience: experienceDetails, education: educationDetails });
    //send this data to the server as well
    console.log(fellow);
    //navigate to the next page
    router.push("/individual-signup/step3");
  };

  // update Fellow context when experience or education details are updated
  useEffect(() => {
    setFellow({
      experience: experienceDetails,
    });
  }, [experienceDetails]);

  useEffect(() => {
    setFellow({
      education: educationDetails,
    });
  }, [educationDetails]);

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
          addClick={() =>
            showModal(<AddExperienceModal addExperience={addExperience} />)
          }
        ></InfoBox>

        {/* experience details */}
        {experienceDetails.length > 0 && (
          <div className="ExperienceDetailsContainer flex flex-col gap-4">
            {/* {experienceDetails.map((experience) => {
              return (
                <InfoBox
                  key={experience.title}
                  variant="hollow"
                  aria="experienceInfo"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  title={`${experience.title}, ${experience.companyName}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  editClick={() =>
                    showModal(
                      <AddExperienceModal
                        canDelete
                        deleteExperience={deleteExperience}
                        experienceInfo={experience}
                        updateExperience={updateExperience}
                      />,
                    )
                  }
                ></InfoBox>
              );
            })} */}
            {fellow?.experience?.map((experience: any) => {
              return (
                <InfoBox
                  key={experience.title}
                  variant="hollow"
                  aria="experienceInfo"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  title={`${experience.title}, ${experience.companyName}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  editClick={() =>
                    showModal(
                      <AddExperienceModal
                        canDelete
                        deleteExperience={deleteExperience}
                        experienceInfo={experience}
                        updateExperience={updateExperience}
                      />,
                    )
                  }
                ></InfoBox>
              );
            })}
          </div>
        )}

        {/* add education / certificates */}
        <InfoBox
          variant="hollow"
          size="extraSmall"
          aria="education"
          canAdd
          width="extraWide"
          title={`Your Education / Certificates`}
          addClasses="flex justify-between w-full"
          addClick={() =>
            showModal(<AddEducationModal addEducation={addEducation} />)
          }
        ></InfoBox>

        {/* education details*/}
        {educationDetails.length > 0 && (
          <div className="EducationDetailsContainer flex flex-col gap-4">
            {educationDetails.map((education) => {
              return (
                <InfoBox
                  key={education}
                  variant="hollow"
                  aria="educationInfo"
                  size="extraSmall"
                  canEdit
                  width="extraWide"
                  title={`${education.degree}, ${education.school}`}
                  addClasses="flex w-[90%] self-end justify-between"
                  editClick={() => showModal(<AddEducationModal canDelete />)}
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
