"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import AddExperienceModal from "@/components/modals/profilePopulationModals/addExperienceModal";
import AddEducationModal from "@/components/modals/profilePopulationModals/addEducationModal";
import PopulateDisplayField from "@/components/populateDisplayField";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import UpdateHandler from "@/components/updateHandler";

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
  //try setting the ID to using the array index?

  // handlers for adding, updating, and deleting experiences and education details
  const handleAdd = (type: "experience" | "education", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
      hasId: true,
      counterFunctions: {
        experience: setExperienceCounter,
        education: setEducationCounter,
      },
      counterDetails: {
        experience: experienceCounter,
        education: educationCounter,
      },
    });
  };

  const handleUpdate = (
    type: "experience" | "education",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
    });
  };

  const handleDelete = (type: "experience" | "education", id: number) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
      hasId: true,
    });
  };

  const handleSubmit = () => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      experience: experienceDetails,
      education: educationDetails,
      profileIsBeingEdited: false,
    });
    if (fellow?.profileIsBeingEdited) {
      router.push("/iprofile");
    } else {
      router.push("/individual-signup/step3");
    }
  };

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
        <Avatar addClasses="self-end -mt-14" />

        {/* Add + Display Experience */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          selectedArray={experienceDetails}
          aria="experienceInfo"
          title={`Your Experience`}
          addModal={<AddExperienceModal />}
          displayOption1="title"
          displayOption2="companyName"
        />

        {/* Add + Display Education */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          selectedArray={educationDetails}
          aria="educationInfo"
          title={`Your Education / Certificates`}
          addModal={<AddEducationModal />}
          displayOption1="degree"
          displayOption2="school"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
