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

  const handleDelete = (type: "experience" | "education", id: number) => {
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
    setFellow({
      ...fellow,
      experience: experienceDetails,
      education: educationDetails,
    });
    //send this data to the server here?
    //navigate to the next page
    router.push("/individual-signup/step3");
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
        <Avatar />

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
          required
        />
        {/* not sure if this experience field should be required? */}

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
            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
