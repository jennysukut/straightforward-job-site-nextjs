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

  // we use these counters for setting Ids for our education and experience events
  // there might be a better way to do this, because this doesn't facilitate navigating back to the page and adding new data
  const [experienceCounter, setExperienceCounter] = useState(1);
  const [educationCounter, setEducationCounter] = useState(1);

  // handlers for adding, updating, and deleting experiences and education details
  const handleAdd = (type: "experience" | "education", data: any) => {
    const newData = {
      ...data,
      id: type === "experience" ? experienceCounter : educationCounter,
    };
    if (type === "experience") {
      setExperienceCounter((prev) => prev + 1);
      setExperienceDetails((prevDetails) => [...prevDetails, newData]);
    } else {
      setEducationCounter((prev) => prev + 1);
      setEducationDetails((prevDetails) => [...prevDetails, newData]);
    }
  };

  const handleUpdate = (
    type: "experience" | "education",
    updatedData: any,
    id: any,
  ) => {
    if (type === "experience") {
      setExperienceDetails((prevDetails) =>
        prevDetails.map((exp) =>
          exp.id === id ? { ...exp, ...updatedData } : exp,
        ),
      );
    } else {
      setEducationDetails((prevDetails) =>
        prevDetails.map((edu) =>
          edu.id === id ? { ...edu, ...updatedData } : edu,
        ),
      );
    }
  };

  const handleDelete = (type: "experience" | "education", id: any) => {
    if (type === "experience") {
      setExperienceDetails((prevDetails) =>
        prevDetails.filter((exp) => exp.id !== id),
      );
    } else {
      setEducationDetails((prevDetails) =>
        prevDetails.filter((edu) => edu.id !== id),
      );
    }
  };

  const handleSubmit = () => {
    setDisabledButton(true);
    //send this data to the server here?
    //navigate to the next page
    router.push("/individual-signup/step3");
  };

  // update Fellow context when experience or education details are updated
  useEffect(() => {
    //there might be a shorter way to do this, but listing each piece was the only thing I could find.
    setFellow({
      experience: experienceDetails,
      education: fellow?.education,
      firstName: fellow?.firstName,
      lastName: fellow?.lastName,
      email: fellow?.email,
      smallBio: fellow?.smallBio,
      location: fellow?.location,
      accomplishments: fellow?.accomplishments,
      skills: fellow?.skills,
      jobTitles: fellow?.jobTitles,
    });
    console.log(fellow);
  }, [experienceDetails]);

  useEffect(() => {
    setFellow({
      experience: fellow?.experience,
      education: educationDetails,
      firstName: fellow?.firstName,
      lastName: fellow?.lastName,
      email: fellow?.email,
      smallBio: fellow?.smallBio,
      location: fellow?.location,
      accomplishments: fellow?.accomplishments,
      skills: fellow?.skills,
      jobTitles: fellow?.jobTitles,
    });
    console.log(fellow);
  }, [educationDetails]);

  console.log(fellow);

  // Setting Details on page from fellowContext
  useEffect(() => {
    setExperienceDetails(
      Array.isArray(fellow?.experience) ? fellow.experience : [],
    );
    setEducationDetails(
      Array.isArray(fellow?.education) ? fellow.education : [],
    );
  }, []);

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
            showModal(<AddExperienceModal handleAdd={handleAdd} />)
          }
        ></InfoBox>

        {/* experience details */}
        {experienceDetails.length > 0 && (
          <div className="ExperienceDetailsContainer flex flex-col gap-4">
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
                        handleDelete={handleDelete}
                        // deleteExperience={deleteExperience}
                        experienceInfo={experience}
                        handleUpdate={handleUpdate}
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
            showModal(<AddEducationModal handleAdd={handleAdd} />)
          }
        ></InfoBox>

        {/* education details*/}
        {educationDetails.length > 0 && (
          <div className="EducationDetailsContainer flex flex-col gap-4">
            {fellow?.education?.map((education: any) => {
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
                  editClick={() =>
                    showModal(
                      <AddEducationModal
                        canDelete
                        handleDelete={handleDelete}
                        educationInfo={education}
                        handleUpdate={handleUpdate}
                      />,
                    )
                  }
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
