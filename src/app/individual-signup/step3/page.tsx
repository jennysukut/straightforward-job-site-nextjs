"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";

import Image from "next/image";
import SiteButton from "@/components/siteButton";
import AddAwardModal from "@/components/modals/profilePopulationModals/addAwardModal";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddExperienceLevelModal from "@/components/modals/profilePopulationModals/addExperienceLevels";
import AddAccomplishmentModal from "@/components/modals/profilePopulationModals/addAccomplishmentsModal";
import Avatar from "@/components/avatarComponent";

export default function IndividualSignupPage3() {
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [awards, setAwards] = useState<any[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<any[]>([]);
  const [accomplishments, setAccomplishments] = useState<any[]>([]);
  const [awardCounter, setAwardCounter] = useState(1);
  const [experienceLevelCounter, setExperienceLevelCounter] = useState(1);
  const [accomplishmentCounter, setAccomplishmentCounter] = useState(1);

  console.log(experienceLevels);

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type: "award" | "experienceLevel" | "accomplishment",
    data: any,
  ) => {
    const newData = {
      ...data,
      id:
        type === "experienceLevel"
          ? experienceLevelCounter
          : type === "award"
            ? awardCounter
            : accomplishmentCounter,
    };
    if (type === "experienceLevel") {
      setExperienceLevelCounter((prev) => prev + 1);
      setExperienceLevels((prevExpLev) => [...prevExpLev, newData]);
    } else if (type === "award") {
      setAwardCounter((prev) => prev + 1);
      setAwards((prevAwards) => [...prevAwards, newData]);
    } else {
      setAccomplishmentCounter((prev) => prev + 1);
      setAccomplishments((prevAccomplishment) => [
        ...prevAccomplishment,
        newData,
      ]);
    }
  };

  const handleUpdate = (
    type: "award" | "experienceLevel" | "accomplishment",
    updatedData: any,
    id: any,
  ) => {
    console.log("trying to update");
    if (type === "experienceLevel") {
      setExperienceLevels((prevDetails) =>
        prevDetails.map((exp) =>
          exp.id === id ? { ...exp, ...updatedData } : exp,
        ),
      );
    } else if (type === "award") {
      setAwards((prevDetails) =>
        prevDetails.map((award) =>
          award.id === id ? { ...award, ...updatedData } : award,
        ),
      );
    } else if (type === "accomplishment") {
      setAccomplishments((prevDetails) =>
        prevDetails.map((accomplishment) =>
          accomplishment.id === id
            ? { ...accomplishment, ...updatedData }
            : accomplishment,
        ),
      );
    }
  };

  const handleDelete = (
    type: "award" | "experienceLevel" | "accomplishment",
    id: any,
  ) => {
    console.log("trying to delete");
    if (type === "experienceLevel") {
      setExperienceLevels((prevDetails) =>
        prevDetails.filter((exp) => exp.id !== id),
      );
    } else if (type === "award") {
      setAwards((prevDetails) =>
        prevDetails.filter((award) => award.id !== id),
      );
    } else if (type === "accomplishment") {
      setAccomplishments((prevDetails) =>
        prevDetails.filter((accomplishment) => accomplishment.id !== id),
      );
    }
  };

  const handleSubmit = () => {
    setFellow({
      ...fellow,
      awards: awards,
      experienceLevels: experienceLevels,
      accomplishments: accomplishments,
    });
    router.push("/individual-signup/step4");
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setAwards(Array.isArray(fellow?.awards) ? fellow.awards : []);
    setExperienceLevels(
      Array.isArray(fellow?.experienceLevels) ? fellow.experienceLevels : [],
    );
    setAccomplishments(
      Array.isArray(fellow?.accomplishments) ? fellow.accomplishments : [],
    );
  }, []);

  return (
    <div className="IndividualSignupPage3 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <Avatar />

        {/* Add + Display Awards / Honors */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Awards or Honors`}
          aria="awardsInfo"
          addModal={<AddAwardModal />}
          selectedArray={awards}
          displayOption1="awardTitle"
          displayOption2="givenBy"
          displayPunct=": given by"
        />

        {/* Add + Display ExperienceLevels */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Experience Levels`}
          aria="experienceLevelsInfo"
          addModal={<AddExperienceLevelModal />}
          selectedArray={experienceLevels}
          displayOption1="experienceLevel"
          displayOption2="expLevelSkill"
          displayPunct=":"
        />

        {/* Add + Display AdditionalAccomplishments */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Additional Accomplishments`}
          aria="experienceLevelsInfo"
          addModal={<AddAccomplishmentModal />}
          selectedArray={accomplishments}
          displayOption1="accTitle"
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
